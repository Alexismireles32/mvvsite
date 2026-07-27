// @ts-check
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Legacy misspelled slugs. These are now real 308 redirects served by Vercel
// (see vercel.json) instead of Astro meta-refresh stubs, so they must never
// appear in the sitemap. Matched on the exact pathname — substring matching
// previously deleted the real /slimcoffee/ page from the sitemap.
const EXCLUDED_PATHS = new Set([
  '/primerose/',
  '/slimcoffe/',
  '/ashawandha/',
  '/sosburnclear/',
  '/sosburnsensitive/',
  '/applecyder/',
  '/articulo-de-blog/',
]);

// Per-URL lastmod derived from git history. Previously every URL shared one
// build-time timestamp, which gave Google no per-page recrawl trigger — the
// live sitemap stamped all 70 URLs with 2025-11-03T00:28:59.892Z.
// On Vercel, file mtimes are all checkout time, so git is the only real source.
const lastmodCache = new Map();

function sourceFileForPath(pathname) {
  const clean = pathname.replace(/^\/|\/$/g, '');
  const candidates = clean
    ? [`src/pages/${clean}.astro`, `src/pages/${clean}/index.astro`]
    : ['src/pages/index.astro'];
  return candidates.find((c) => existsSync(c));
}

function lastmodFor(pathname) {
  if (lastmodCache.has(pathname)) return lastmodCache.get(pathname);
  let iso;
  const file = sourceFileForPath(pathname);
  if (file) {
    try {
      const out = execSync(`git log -1 --format=%cI -- "${file}"`, {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim();
      if (out) iso = new Date(out).toISOString();
    } catch {
      // git unavailable (e.g. shallow clone) — omit rather than emit a false date
    }
  }
  lastmodCache.set(pathname, iso);
  return iso;
}

// https://astro.build/config
export default defineConfig({
  site: 'https://www.mvvnaturales.com',
  output: 'static',

  // Canonicals are slash-terminated; keep every internal URL in the same shape
  // so the crawlable URL space is 70, not ~140. Vercel 308s /x -> /x/.
  trailingSlash: 'always',

  // Build optimizations
  build: {
    inlineStylesheets: 'auto', // Inline small CSS for faster load
  },

  // Prefetch on hover rather than for every link in the viewport — prefetchAll
  // + viewport pulled every linked page on grid-heavy pages over mobile data.
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },

  // Vite optimizations
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'ui-vendor': ['framer-motion', 'clsx'],
          },
        },
      },
    },
  },

  // Integrations
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      filter: (page) => {
        const { pathname } = new URL(page);
        return !pathname.startsWith('/admin') && !EXCLUDED_PATHS.has(pathname);
      },
      // No `changefreq` and no `priority`: Google ignores both, and 58 of 70
      // URLs previously shared priority 0.8, so the field carried no signal.
      serialize(item) {
        const { pathname } = new URL(item.url);
        const lastmod = lastmodFor(pathname);
        return lastmod ? { url: item.url, lastmod } : { url: item.url };
      },
    }),
  ],

  // NOTE: redirects are no longer declared here. Astro's static output can only
  // emit HTTP 200 meta-refresh stubs (which additionally carried conflicting
  // noindex + canonical signals). Real 308 redirects now live in vercel.json.

  // HTML compression
  compressHTML: true,
});
