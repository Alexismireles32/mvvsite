#!/usr/bin/env node
/**
 * Generate src/data/lastmod.json — a committed map of route -> last-modified date.
 *
 * WHY THIS EXISTS
 * The sitemap needs a real per-URL <lastmod> so Google has a per-page recrawl
 * trigger. Deriving it from `git log` at build time does not work on Vercel:
 * Vercel builds from a SHALLOW clone, so every file reports the same single
 * commit date and all 68 URLs collapse to one identical timestamp — which is
 * the exact bug this was meant to fix.
 *
 * So we resolve the dates HERE, against full local history, and commit the
 * result. astro.config.mjs reads the committed manifest at build time.
 *
 * USAGE — run before committing any page content change:
 *   npm run lastmod && git add src/data/lastmod.json
 */
import { execSync } from 'node:child_process';
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { globSync } from 'node:fs';
import path from 'node:path';

const OUT = 'src/data/lastmod.json';

function isShallow() {
  try {
    return execSync('git rev-parse --is-shallow-repository', { encoding: 'utf8' }).trim() === 'true';
  } catch {
    return false;
  }
}

if (isShallow()) {
  console.error(
    'refusing to run: this is a shallow clone, so per-file dates would all be identical.\n' +
    'Run `git fetch --unshallow` first, or run this on a full clone.'
  );
  process.exit(1);
}

function routeFor(file) {
  let r = file.replace(/^src\/pages/, '').replace(/\.astro$/, '');
  if (r.endsWith('/index')) r = r.slice(0, -'/index'.length);
  if (r === '/index') r = '';
  return (r || '/').replace(/\/?$/, '/');
}

const files = globSync('src/pages/**/*.astro');
const map = {};
let missing = 0;

for (const file of files) {
  const route = routeFor(file);
  if (route === '/404/') continue; // noindex, never in the sitemap
  let iso;
  try {
    const out = execSync(`git log -1 --format=%cI -- "${file}"`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (out) iso = new Date(out).toISOString();
  } catch {
    /* fall through */
  }
  if (iso) map[route] = iso;
  else missing++;
}

// Deliberately NOT bumped by shared component/layout history. A chrome-only
// change does alter every page's bytes, but rolling all 68 dates forward on
// every layout tweak is exactly the uninformative all-URLs-identical signal
// this file exists to avoid. The date tracks the page's own content.

const sorted = Object.fromEntries(Object.entries(map).sort(([a], [b]) => a.localeCompare(b)));
mkdirSync(path.dirname(OUT), { recursive: true });
const next = JSON.stringify(sorted, null, 2) + '\n';
const prev = existsSync(OUT) ? readFileSync(OUT, 'utf8') : '';
writeFileSync(OUT, next);

const distinct = new Set(Object.values(sorted)).size;
console.log(`${OUT}: ${Object.keys(sorted).length} routes, ${distinct} distinct dates` +
            (missing ? `, ${missing} without git history` : '') +
            (next === prev ? ' (unchanged)' : ' (updated)'));
if (distinct === 1) {
  console.error('WARNING: only one distinct date — the sitemap will give Google no per-page signal.');
}
