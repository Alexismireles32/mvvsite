# MVV Natural — SEO Action Plan

**Companion to:** `SEO-AUDIT-2026.md` · **Generated:** 2026-07-27
**Repo:** `/Users/alexismireles/final-site1` · **Live:** https://www.mvvnaturales.com
**Baseline:** SEO Health Score 22/100 · ~14 of 70 pages indexed · 141 clicks/3mo, 42% own brand · 0 clicks from ~11,000 words of content

**Ordering rule applied throughout:** `unlocks-indexing` > `risk-removal` > `direct-traffic` > `ctr` > `rich-result` > `hygiene`, then effort ascending within each band. Do not reorder to do the fun work first. Every task below has: what to change, exact file paths, concrete before/after, a verification command, and the expected outcome.

---

## SPRINT 0 — DO NOT SHIP (blocks every deploy)

These three items are in the working tree right now and are already baked into `dist/`. **No deploy may happen until they are resolved.**

### 0.1 — Strip the fabricated aggregateRating and invented review

| | |
|---|---|
| **Why** | Google spam policy: reviews marked up but not available to users; ratings not sourced from users; spammy structured markup. Aggravated by identical boilerplate across 40 URLs on a YMYL health site. Risk is a manual action suppressing all rich results site-wide. |
| **File** | `src/components/product-seo.jsx` (lines 29–50, uncommitted) |
| **Priority** | risk-removal · **effort: trivial** |

The uncommitted diff **deletes** the guard comment `// Note: aggregateRating removed - add back when you have 5+ verified reviews` and adds:

```jsonc
// BEFORE (production, clean — offers ends here):
"eligibleRegion": ["US","MX"]}}

// AFTER (working tree — DO NOT SHIP):
"aggregateRating": { "@type":"AggregateRating", "ratingValue":"4.5",
                     "reviewCount":"1", "bestRating":"5", "worstRating":"1" },
"review": [{ "@type":"Review", "reviewRating":{"ratingValue":"5"},
             "author":{"@type":"Person","name":"Cliente MVV Natural"},
             "reviewBody":"Producto de alta calidad, 100% natural. Recomendado." }]
```

It is self-evidently fabricated: `reviewCount` is 1, that one review is rated 5, and the aggregate is 4.5. Verified invisible in the rendered page (`"Cliente MVV Natural"` → False, `"4.5"` → False).

**Do:**
```bash
cd /Users/alexismireles/final-site1
git checkout -- src/components/product-seo.jsx
npm run build
```

**Verify:**
```bash
grep -rl "aggregateRating" dist --include="*.html" | wc -l   # must be 0 (currently 40)
grep -rl "Cliente MVV Natural" dist --include="*.html" | wc -l # must be 0 (currently 40)
```

**Outcome:** removes a manual-action vector before it reaches production. *(This `git checkout` also reverts 0.2 and 0.3 below — do all three in one command, then re-apply the legitimate parts of the sitemap fix in task 1.3.)*

### 0.2 — Strip the fabricated shipping rate and return policy

Same file, lines 70–115 of the uncommitted diff. It declares `shippingRate {value:"0"}` and `merchantReturnDays:30` + `FreeReturn`. These **directly contradict terms the site publishes live**:

| Fabricated schema claim | What the live site actually says |
|---|---|
| `shippingRate: {value:"0"}` (free shipping) | `src/components/legal-aviso.jsx:103` — *"Costos de envío según su ubicación"* |
| `merchantReturnDays: 30`, `FreeReturn` | `src/components/legal-aviso.jsx:143` — *"NO aceptamos devoluciones ni reembolsos"* |
| `transitTime` 1–3 days (incl. US) | Site FAQ — *"USA: 3-5 días hábiles con USPS"* |
| `handlingTime` 1–2 days | `/aviso-legal/` — *"Envío el mismo día si el pedido se realiza antes de las 2 PM"* |

The one accurate field is `cutoffTime: "14:00"`. Reverted by the same `git checkout`.

**Verify:** `grep -rc "hasMerchantReturnPolicy" dist --include="*.html" | grep -v ':0' | wc -l` → 0

### 0.3 — Confirm the sitemap filter is not deployed as-is

`astro.config.mjs` line 40 currently reads `!page.includes('/slimcoffe')`. Because `'/slimcoffe'` is a substring of `'/slimcoffee/'`, deploying the working tree would **delete a real product page from the sitemap**.

**Verify the damage exists:**
```bash
grep -c "slimcoffee" dist/sitemap-0.xml   # currently 0 — the bug
grep -c "<loc>" dist/sitemap-0.xml        # 69 local vs 70 live
```
The permanent fix is task 1.3. Until then, do not deploy `astro.config.mjs`.

---

## SPRINT 1 — Weeks 1–2: Stop the bleeding + unlock indexing

**Goal:** every page reachable, every link canonical, every crawl signal honest, every fabricated or lorem-ipsum liability gone. This sprint is almost entirely trivial/small mechanical edits and should move Indexing 11→40 and Internal Linking 17→65.

**Expected outcome by end of Sprint 1:** 0 orphans, 0 links to stubs, 0 links to 404s, 16 `/recursos` pages linked from outside their folder, real per-URL `lastmod`, and a sitemap that is honest about what changed.

### Band A — unlocks-indexing

#### 1.1 — Repoint 133 internal links off the noindex redirect stubs *(trivial)*

The single highest-leverage change in the audit. Three canonical product pages currently have **one** inbound link each — from their own `noindex` meta-refresh stub — while 120 links go to the stubs.

| File | Line | Before | After |
|---|---:|---|---|
| `src/components/product-carousel.jsx` | 11 | `url: "/sosburnclear"` | `url: "/sosburn-clear"` |
| `src/components/product-carousel.jsx` | 12 | `url: "/sosburnsensitive"` | `url: "/sosburn-sensitive"` |
| `src/components/product-carousel.jsx` | 23 | `url: "/slimcoffe"` | `url: "/slimcoffee"` |
| `src/components/product-04.jsx` | 147, 154, 166 | `href="/sosburnsensitive"` | `href="/sosburn-sensitive"` |
| `src/components/product-04.jsx` | 174, 181, 193 | `href="/primerose"` | `href="/primrose"` |
| `src/components/header-76.jsx` | 134 | `href="/primerose"` | `href="/primrose"` |

While in `product-carousel.jsx`, also fix `url: "/applecyder"` → `/applecidervingar` (see 1.7) and remove the duplicated `Duo-60 Fusion` entry.

**Verify:**
```bash
npm run build
for s in sosburnclear sosburnsensitive slimcoffe primerose; do
  echo -n "$s: "; grep -rl "href=\"/$s\"" dist --include=index.html | wc -l   # each must be 0
done
grep -rl 'href="/sosburn-clear"' dist --include=index.html | wc -l  # must be ~40 (currently 1)
```

**Outcome:** `/sosburn-clear/`, `/sosburn-sensitive/`, `/slimcoffee/` go from 1 inbound link to ~40 each. `/sosburn-clear/` already earns 4 clicks (+100%) on that single link.

#### 1.2 — Delete `/articulo-de-blog` *(trivial)*

1,123 words of Latin lorem ipsum, body rendered twice, 32 dead `href="#"`, six fabricated prices (`$30 $35 $38 $40 $45 $50` — the only prices on a deliberately price-free site), fabricated byline, live and sitemapped on a YMYL domain. Zero inbound links, zero clicks.

```bash
rm /Users/alexismireles/final-site1/src/pages/articulo-de-blog.astro
npm run build
```

Add the 301 to `vercel.json` (created in 1.4):
```json
{ "source": "/articulo-de-blog", "destination": "/blog/como-acelerar-metabolismo-naturalmente/", "permanent": true }
```

**Verify:** `ls dist/articulo-de-blog 2>/dev/null | wc -l` → 0 · `grep -c articulo-de-blog dist/sitemap-0.xml` → 0

**Then:** submit `https://www.mvvnaturales.com/articulo-de-blog/` to GSC → Removals for immediate suppression.

**Outcome:** removes the strongest site-level negative quality signal. This page plausibly depresses the index-eligibility of the other 56.

#### 1.3 — Fix the sitemap filter and the uniform `lastmod` *(trivial)*

`astro.config.mjs`, two changes.

**(a) Exact-match the exclusions** (line 40 currently substring-matches `/slimcoffee/` out of existence):
```js
// BEFORE
return !page.includes('/admin') && !page.includes('/primerose')
    && !page.includes('/slimcoffe') && !page.includes('/ashawandha')
    && !page.includes('/sosburnclear') && !page.includes('/sosburnsensitive');

// AFTER
const EXCLUDE = new Set(['/primerose/','/slimcoffe/','/ashawandha/','/sosburnclear/','/sosburnsensitive/']);
return !page.includes('/admin') && !EXCLUDE.has(new URL(page).pathname);
```

**(b) Emit a real per-URL `lastmod`.** Currently `lastmod: new Date()` stamps one value on all 70 URLs — live it reads `2025-11-03T00:28:59.892Z` for every URL, ~267 days stale, while the documents' HTTP `last-modified` is current. Replace with a git-derived date inside the existing `serialize(item)`:
```js
import { execSync } from 'node:child_process';
const gitDate = (file) => {
  try { return execSync(`git log -1 --format=%cI -- "${file}"`).toString().trim() || undefined; }
  catch { return undefined; }
};
```
If per-page mapping is impractical, **omit `lastmod` entirely** — an absent lastmod is strictly better than a false one. Also delete the `changefreq` and `priority` blocks: Google ignores `<priority>` and 58 of 70 URLs share the value 0.8, so it carries zero information.

**Verify:**
```bash
npm run build
grep -c "slimcoffee" dist/sitemap-0.xml                        # must be ≥1
grep -o '<lastmod>[^<]*</lastmod>' dist/sitemap-0.xml | sort -u | wc -l  # must be >1 (currently 1)
grep -c "<loc>" dist/sitemap-0.xml                             # must be 70
```

**Outcome:** restores `/slimcoffee/` to the only discovery channel it has, and gives Google a per-URL recrawl trigger. **This is the task that governs how fast every other fix registers** — without it, remediation may take months to be noticed.

#### 1.4 — Replace the fake 301s with real server redirects *(small)*

Astro static output cannot emit a 301. The five configured "redirects" are HTTP **200** pages with `<meta http-equiv="refresh">` **plus** `noindex` **plus** `canonical` — a documented conflicting-signal anti-pattern. There is currently **no `vercel.json`, `netlify.toml`, `_redirects` or `_headers` file in the repo at all.**

Create `/Users/alexismireles/final-site1/vercel.json`:
```json
{
  "trailingSlash": true,
  "redirects": [
    { "source": "/primerose",        "destination": "/primrose/",         "permanent": true },
    { "source": "/slimcoffe",        "destination": "/slimcoffee/",       "permanent": true },
    { "source": "/ashawandha",       "destination": "/ashwagandha/",      "permanent": true },
    { "source": "/sosburnclear",     "destination": "/sosburn-clear/",    "permanent": true },
    { "source": "/sosburnsensitive", "destination": "/sosburn-sensitive/","permanent": true },
    { "source": "/applecyder",       "destination": "/applecidervingar/", "permanent": true },
    { "source": "/articulo-de-blog", "destination": "/blog/como-acelerar-metabolismo-naturalmente/", "permanent": true }
  ]
}
```
Then delete the `redirects:` block from `astro.config.mjs` (and the comment at line 121 claiming *"GSC may report 'Page with redirect' - this is expected and correct behavior"* — it documents a bug as intended behaviour).

**Verify (after deploy):**
```bash
curl -sI https://www.mvvnaturales.com/slimcoffe | head -2   # expect 308, not 200
curl -sI https://www.mvvnaturales.com/productos | head -2   # expect 308 → /productos/
```

**Outcome:** real permanent redirects that pass equity reliably, and GSC's "Page with redirect: 3" resolves correctly.

#### 1.5 — Fix the 9 internal links pointing at hard 404s *(trivial)*

Every conversion CTA out of the `/recursos` silo is currently a 404. All confirmed `HTTP/2 404` + `x-vercel-error: NOT_FOUND`.

| File | Lines | Before | After |
|---|---|---|---|
| `src/pages/recursos/guias/controlar-apetito.astro` | 223, 428 | `/body-shape` | `/cmpushup` |
| `src/pages/recursos/guias/controlar-apetito.astro` | 252 | `/prim-rose` | `/primrose` |
| `src/pages/recursos/guias/quemar-grasa-abdominal.astro` | 229 | `/sos-burn-clear` | `/sosburn-clear` |
| `src/pages/recursos/comparativas/mejor-quemador-grasa.astro` | 161 | `/sos-burn-clear` | `/sosburn-clear` |
| `src/pages/recursos/comparativas/mejor-quemador-grasa.astro` | 207 | `/body-shape` | `/cmpushup` |
| `src/pages/recursos/comparativas/sos-burn-vs-body-shape.astro` | 142 | `/sos-burn-clear` | `/sosburn-clear` |
| `src/pages/recursos/comparativas/sos-burn-vs-body-shape.astro` | 215 | `/body-shape` | `/cmpushup` |
| `src/pages/catalogo.astro` | — | `/Catalogo-Mvvnatural.pdf` | upload the PDF to `public/`, or remove the CTA **and** the "Descarga PDF" promise from the meta description |

*(`/cmpushup` is the Body Shape product route — the homepage already anchors "Ver Body Shape →" there.)*

**Verify:**
```bash
npm run build
python3 - <<'EOF'
import re,glob,os
routes={('/'+os.path.relpath(os.path.dirname(f),'dist')+'/').replace('/./','/') for f in glob.glob('dist/**/index.html',recursive=True)}
bad=set()
for f in glob.glob('dist/**/index.html',recursive=True):
    for h in re.findall(r'href="(/[^"#?]*)"',open(f,encoding='utf8',errors='ignore').read()):
        t=h if h.endswith('/') else h+'/'
        if t not in routes and not h.startswith(('/_','/sitemap','/robots')): bad.add(h)
print("BROKEN:",sorted(bad))   # must be empty
EOF
```

**Outcome:** the `/recursos` cluster starts passing equity to product pages instead of dead-ending, and 6 thin pages lose a low-quality signal.

#### 1.6 — Un-orphan the 4 hard orphans *(small)*

`/30fusion/`, `/hflex/`, `/applecidervingar/` and `/articulo-de-blog/` receive **zero** inbound anchors across all 3,234 internal links, yet all four sit in the sitemap. `/articulo-de-blog/` is handled by 1.2.

- Add `/30fusion` and `/hflex` to the `allProducts` array in `src/components/product-carousel.jsx` (gives each ~40 inbound links immediately) **and** to the grid in `src/pages/productos.astro`.
- `/applecidervingar/` is handled by 1.7.

**Verify:**
```bash
for p in 30fusion hflex applecidervingar; do
  echo -n "$p: "; grep -rl "href=\"/$p\"" dist --include=index.html | wc -l   # each must be >0
done
```

**Outcome:** removes 3 of the 16 "Discovered – currently not indexed" pages from the zero-signal state.

#### 1.7 — Resolve the `/applecyder` ↔ `/applecidervingar` duplicate *(trivial)*

Same product, two self-canonicalising URLs, both in the sitemap. `/applecidervingar/` is the richer page (229 unique words, 8 ingredients) but has **0** inbound links; `/applecyder/` is weaker (87 unique words, 4 ingredients) but has **42**.

1. Keep `/applecidervingar/`. Delete `src/pages/applecyder.astro`.
2. Add the 308 in `vercel.json` (already included in 1.4).
3. Update `src/components/product-carousel.jsx`: `url: "/applecyder"` → `"/applecidervingar"`.

*(Note: `/applecyder` is the only product page rendering through `home-wrapper.jsx`, so removing it also eliminates that one-off code path.)*

**Verify:** `ls dist/applecyder 2>/dev/null | wc -l` → 0 · `grep -rl 'href="/applecidervingar"' dist --include=index.html | wc -l` → ~40

#### 1.8 — Break open the `/recursos` silo *(medium)*

**All 16 `/recursos/*` pages have zero inbound links from outside the folder.** `grep -rl 'href="/recursos/' --include=index.html dist/` returns 13 files, every one of them inside `/recursos`. This maps 1:1 onto GSC's "Discovered – currently not indexed: 16".

**(a)** `src/pages/recursos.astro` currently defines **7** child cards (lines 10, 17, 24, 34, 41, 48, 55). Extend to all 16 — 3 comparativas + 13 guías — grouped under headings that carry topic: *Metabolismo*, *Control de apetito*, *Grasa abdominal*. This moves 9 guides from click-depth 3 to depth 2.

**(b)** Add a persistent "Recursos" block to `src/components/footer-02.jsx` (used by all 40 product pages and all 3 blog posts) linking the 4 strongest guides. This single change takes them from 1–3 inbound links to 40+.

**(c)** Add a contextual "Guía relacionada" block to `src/components/product-page-wrapper.jsx` so each product links 2–3 topically matched guides:

| Product | Links to |
|---|---|
| `/sosburn-clear` | `/recursos/guias/quemar-grasa-abdominal`, `/recursos/comparativas/mejor-quemador-grasa` |
| `/chupapanza` | `/recursos/guias/dieta-grasa-abdominal`, `/recursos/guias/grasa-visceral-vs-subcutanea` |
| `/serenity` | `/recursos/guias/hambre-emocional`, `/recursos/guias/ansiedad-por-comer` |
| `/alphaglow` | `/recursos/guias/controlar-apetito`, `/recursos/guias/alimentos-saciantes` |
| `/duo-60-fusion` | `/recursos/comparativas/duo-60-vs-lida`, `/recursos/guias/acelerar-metabolismo` |

**Verify:**
```bash
npm run build
for f in dist/recursos/guias/*/index.html dist/recursos/comparativas/*/index.html; do
  u="/${f#dist/}"; u="${u%index.html}"
  echo -n "$u "; grep -rl "href=\"${u%/}\"" dist --include=index.html | grep -vc '/recursos/'
done   # every line must be ≥4 (currently 0)
```

**Outcome:** the highest-value structural fix for the 16 "Discovered" pages. Nothing gets indexed on this site unless it is linked from outside its own folder.

#### 1.9 — Add homepage links to content *(small)*

The homepage absorbs 38 of 53 clicks and links to **zero** blog posts and **zero** resource pages. It links only 9 canonical products of 40 (2 of its 11 product links are redirect stubs, fixed in 1.1).

In `src/pages/index.astro`, add two sections above the footer:
- **"Guías"** — the 5 strongest: `acelerar-metabolismo`, `quemar-grasa-abdominal`, `controlar-apetito`, `elegir-suplemento`, `mejor-quemador-grasa`, with descriptive anchors.
- **"Últimos artículos"** — all 3 real `/blog/*` posts by their **real** titles.

**Verify:** `grep -o 'href="/blog/[^"]*"' dist/index.html | sort -u | wc -l` → 3 · `grep -o 'href="/recursos/[^"]*"' dist/index.html | sort -u | wc -l` → ≥5

**Outcome:** moves the content cluster from 2 hops to 1 hop from the only page Google trusts.

#### 1.10 — Normalise trailing slashes *(medium)*

**100% of internal hrefs are slash-less; 100% of canonicals are slash-terminated; both forms return 200 with an empty `redirect_url`.** The crawlable URL space is ~140, not 70. Every internal hop lands on a URL Google must fetch, parse, then discard.

1. Add `trailingSlash: 'always'` to `astro.config.mjs` (top level, alongside `output: 'static'`).
2. `"trailingSlash": true` in `vercel.json` (already in 1.4) so Vercel 308s `/x` → `/x/`.
3. Rewrite internal hrefs to include the trailing slash across `src/components/*.jsx` and `src/pages/*.astro`.

**Verify (after deploy):**
```bash
curl -o /dev/null -w "%{http_code} %{redirect_url}\n" https://www.mvvnaturales.com/productos
# expect: 308 https://www.mvvnaturales.com/productos/
```

**Outcome:** halves the crawlable URL space and makes every internal link point at a canonical URL.

### Band B — risk-removal

#### 1.11 — Move the medical disclaimer to all 75 pages *(trivial)*

The safety disclaimer lives in `src/components/Footer.astro` and reaches **18 of 75 built pages and 0 of 40 product pages**. `src/components/footer-02.jsx` — used by all 40 product pages and all 3 blog posts, precisely the pages making product claims — does not have it.

Move the disclaimer out of `Footer.astro` and into the shared `src/layouts/Layout.astro` so it renders on every page regardless of which footer component is used.

**Verify:**
```bash
npm run build
grep -rl "no sustituye\|consulte a su médico\|no son medicamentos" dist --include=index.html -i | wc -l   # must be 75 (currently 18)
```

**Outcome:** widest YMYL coverage gain available from a one-file change.

#### 1.12 — Remove `offers` from Product schema *(trivial)*

All 40 pages ship `"price":"0"` + `"priceCurrency":"USD"` + `"availability":"InStock"` from **committed** code, on a site that displays no price anywhere and whose own CTA says *"Cotiza precio de menudeo o mayoreo por WhatsApp"*. The source comment admits it: `// Pricing kept in schema for internal use but not displayed to users (price: "0")`.

In `src/components/product-seo.jsx`, replace the whole `productSchema` object:
```js
const productSchema = {
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": productName,
  "image": [productImage, "https://res.cloudinary.com/dsulhqvza/image/upload/v1761550208/mvvnatural_pbzwrl.png"],
  "description": description || `${productName} - Suplemento natural de MVV Natural.`,
  "category": "Health & Beauty > Health Care > Vitamins & Supplements",
  "brand": { "@type": "Brand", "name": "MVV Natural" },
  "manufacturer": { "@type": "Organization", "name": "MVV Natural", "url": "https://www.mvvnaturales.com" }
};
```

**Do NOT** substitute a placeholder price. **Do NOT** emit `offers` with the price omitted — Google reports `Missing field "price"` and you gain nothing over having no `offers` node. Expect Rich Results Test **warnings** for missing `offers`/`review`/`aggregateRating` — that is correct and acceptable for a no-price catalog.

**Verify:** `grep -rc '"price":"0"' dist --include=index.html | grep -v ':0' | wc -l` → 0 (currently 40)

#### 1.13 — Fix the 32 `undefined` schema URLs *(small)*

16 live product pages emit `https://www.mvvnaturales.comundefined` in `offers.url` and BreadcrumbList item 3 — 2 occurrences per page, verified on **production**. The host is NXDOMAIN.

Pass `Astro.url.pathname` down from each page rather than relying on the hand-maintained `productUrl` prop, and normalise the trailing slash so schema URLs match the canonical by construction:
```js
const canonical = `https://www.mvvnaturales.com${path.replace(/\/?$/, '/')}`;
```

**Do NOT** use a `typeof window === 'undefined'` fallback — the island is server-rendered by Astro SSG despite `client:load`, so that branch would strip JSON-LD entirely from the served HTML and create a hydration mismatch.

Add a build-time guard that fails the build if any emitted JSON-LD contains the literal string `undefined`.

**Verify:** `grep -rc "comundefined" dist --include=index.html | grep -v ':0' | wc -l` → 0 (currently 16)

#### 1.14 — Remove disease-treatment claims *(medium)*

14 pages make claims the site's own legal page explicitly disclaims. `src/components/legal-aviso.jsx:75`: *"Los productos… NO son medicamentos. No están destinados a diagnosticar, tratar, curar o prevenir ninguna enfermedad."*

| File:line | Before | After |
|---|---|---|
| `src/pages/sosburn-sensitive.astro:11,17,35` | *"Indicado para diabéticos, hipertensos e hipotiroidismo"* | *"Fórmula suave, sin estimulantes fuertes. Si vives con diabetes, hipertensión o hipotiroidismo, consulta a tu médico antes de usarlo."* |
| `src/pages/floryva.astro:17` | *"Elimina candidiasis y vaginosis de raíz"* | *"Contribuye a mantener la flora vaginal e intestinal"* |
| `src/pages/floryva.astro:36` | *"Previene infecciones urinarias, candidiasis, vaginosis"* | delete |
| `src/pages/applecidervingar.astro:14` | *"Controla niveles de azúcar en sangre (ideal diabéticos)"* | *"Complemento de una dieta equilibrada"* |
| `src/pages/serenity.astro:11` | *"Alternativa natural a medicamentos ansiolíticos sin efectos secundarios ni adicción"* | delete; add *"No sustituye ningún tratamiento psiquiátrico. No suspendas medicación recetada."* |
| `src/pages/alphaglow.astro:11,15,35` | *"Especial para sobrepeso y obesidad mórbida"* | delete *"obesidad mórbida"* |
| `src/pages/recursos/comparativas/sos-burn-vs-body-shape.astro:201,329` | *"Especialmente útil para mujeres con PCOS"* | delete or requalify as *"Consulta a tu médico si tienes SOP."* |
| `src/pages/recursos/guias/acelerar-metabolismo.astro:190` | *"Acelera metabolismo de personas con hipotiroidismo subclínico"* | delete |

**Also reconcile the direct internal contradiction:** `meizitang-soft-gel.astro:34` says *"No apto para hipertensos, diabéticos"* while `sosburn-sensitive.astro:17` says *"Indicado para diabéticos, hipertensos"* — same brand, opposite safety guidance. Pick one consistent answer.

**Verify:** `grep -rliE "diabétic|hipertens|hipotiroidismo|PCOS|candidiasis|vaginosis|ansiolític|obesidad mórbida" dist --include=index.html | wc -l` → should drop from 14 to ~2 (remaining hits should be consult-your-doctor qualifiers only, checked by hand)

#### 1.15 — Remove unsubstantiated quantified claims *(small)*

Strip site-wide: *"10-15 kilos en 30 días"*, *"Eficacia 90%"*, *"pierden en promedio 15-25 kilos en 2-3 meses"* (appears on both `/` and `/preguntas-frecuentes/`), *"Adelgaza 8-15 kilos en 1 mes"* (`/duo-60-fusion/` meta description), *"quemador de grasa #1 en México"*, *"la mayoría bajó entre 15 y 25 kilos en 3-6 meses"* (`/testimonios/`), *"sin efectos secundarios"*, *"100% naturales y seguros"*, *"sin rebote"*.

Also fix the FAQ schema, which **deletes the safety caveat that is visible on the page**: the rendered answer to *"¿Son seguros los quemadores de grasa naturales?"* ends *"No recomendamos para embarazadas o personas con condiciones cardíacas sin consultar a su médico."* — absent from `acceptedAnswer.text`, which instead retains *"Nuestros productos son 100% naturales y seguros."*

**Rule to enforce:** every `acceptedAnswer.text` must be a verbatim substring of the visible answer. Add a build assertion in `scripts/seo-check.py`.

**Verify:** `grep -rlE "15-25 kilos|8-15 kilos|Eficacia 90|#1 en México|sin efectos secundarios" dist --include=index.html | wc -l` → 0

#### 1.16 — Fix the h1 defects *(trivial)*

Four pages deviate from exactly one h1. Note `/productos` and `/testimonios` each have exactly **1** h1 in production, contrary to the pre-audit assumption.

| Page | h1s | Fix |
|---|---:|---|
| `/` | 2 | Parameterise the heading level in `src/components/faq-07.jsx:26` (h2 on `/`, h1 on `/preguntas-frecuentes`). **Do not remove the FAQ from the homepage** — it is 24% of the content on the page earning 72% of clicks and it drives WhatsApp conversion. |
| `/blog` | 3 | Delete one listing component from `src/pages/blog.astro:21-22`; demote *"Descubre salud natural"* and *"Explora tu camino hacia la salud"* to h2; keep *"Todo Lo Que Necesitas Saber Para Bajar de Peso (Sin Mentiras)"* |
| `/contacto` | 0 | Add `<h1>Dónde Comprar Productos MVV Natural</h1>` |
| `/articulo-de-blog` | 2 | Resolved by 1.2 |

**Verify:** `for f in dist/index.html dist/blog/index.html dist/contacto/index.html; do echo -n "$f "; grep -o '<h1' $f | wc -l; done` → all 1

#### 1.17 — Fix the dead `sameAs` and invalid `PostalAddress` *(trivial)*

`src/layouts/Layout.astro`:
- **`sameAs` (lines ~142-145):** `https://www.facebook.com/mvvnatural` returns HTTP 400 as `facebookexternalhit` (body: *"This content isn't available right now"*). **It responds HTTP 200, so a naive link checker will not catch it.** Replace with the real profiles surfaced in SERP — facebook.com/sbeltips (25,197 likes) — or ship Instagram only. Confirm each with a body-text check.
- **`address` (lines 102-113):** two `PostalAddress` objects each containing only `addressCountry` plus `areaServed`, which is **not a valid property of PostalAddress** (it belongs to Organization/ContactPoint and is already correctly declared at lines 114-123). Delete lines 102-113. Reinstate only with a real address. Consider deleting `numberOfEmployees` (`minValue:5, maxValue:50`) — unverifiable and produces no feature.
- **`hreflang` (lines 45-47):** delete the `en-US` alternate. It asserts an English variant that does not exist and whose declared URL serves Spanish with `lang="es-MX"`. Keep self-referencing `es-MX` + `x-default`.

#### 1.18 — Fix the `dateModified` build-time bump *(trivial)*

All 3 blog `.astro` files, line 29: `"dateModified": new Date().toISOString().split('T')[0]` — every rebuild, including CSS-only deploys, falsely claims all three posts were updated today. Replace with a literal a human edits when content actually changes, driven from frontmatter.

**Verify:** `grep -c "new Date()" src/pages/blog/*.astro` → 0

### Band C — direct-traffic

#### 1.19 — Fix the brand-name misspellings *(trivial)*

On the exact pages earning the site's only non-brand clicks.

| File | Before | After | Why |
|---|---|---|---|
| `src/pages/lida-slimming-tea.astro:8,36-37` | *"Daidahua"* (×15 site-wide) | *"Daidaihua"* | The site spells it *"Daidaihua"* **zero** times. This is the market and search spelling — the page cannot match the canonical brand string at all |
| `src/pages/sosburn-clear.astro` | *"SOS Burn Clean"* (×9 on this page) | *"SOS Burn Clear"* | The URL says `clear`; the rest of the site says *"Clear"* ×81, including the image alt and the related-product card **on the same page**. Google sees an entity called "Clean" at a URL called "clear" — on the site's #3 traffic page |
| `src/pages/duo-60-fusion.astro` | *"Duo 60 Fusion Xtreme"* | *"Duo-60 Fusion Xtreme"* | GSC records the query hyphenated; `/productos` already renders the H3 hyphenated |

Retain *"Daidahua"* once in body copy as a misspelling catch if desired.

#### 1.20 — Add descriptive anchor text *(small)*

**1,461 internal anchors point at product pages and not one contains a commercial keyword.** Every product page is described to Google by exactly one string: its own brand name. 277 anchors (8.6%) have no text at all.

- Add a `descriptor` field to each entry in `src/components/product-carousel.jsx` and render it inside the anchor: `<a href="/sosburn-clear/">SOS Burn Clear — quemador de grasa natural</a>`, `<a href="/chupapanza/">Chupa Panza — reduce grasa abdominal</a>`, `<a href="/maxi-fibra/">Maxi Fibra — fibra para controlar el apetito</a>`.
- Replace the 42 `Ver Producto` anchors (35 of them on `/productos` alone) with `<Nombre> — <beneficio>`.
- Give the 277 image-wrapping anchors real `alt` + `aria-label` — Google uses image alt as anchor text when an `<a>` wraps only an `<img>` (`product-04.jsx:147,174`, `product-carousel.jsx`).

**Verify:**
```bash
grep -o 'Ver Producto' dist/productos/index.html | wc -l   # must be 0 (currently 35)
grep -c 'href="/[a-z0-9-]*"><img\|href="/[a-z0-9-]*" class="[^"]*"><img' dist/productos/index.html
```

### Band D — hygiene (Sprint 1 tail)

#### 1.21 — Create a real 404 page *(trivial)*

404s currently return Vercel's plain-text default: `content-type: text/plain`, 79 bytes, no navigation, no branding, no WhatsApp CTA. The status code is correct so there is no indexing harm — the cost is that anyone hitting a broken link lands on a dead end on a site whose only conversion is a WhatsApp tap.

Create `src/pages/404.astro` using the standard Layout with Navbar, Footer, an h1, a link to `/productos/`, both WhatsApp CTAs, and `<meta name="robots" content="noindex">`. Astro emits `dist/404.html` and Vercel serves it automatically with a 404 status.

#### 1.22 — Fix `robots.txt` and the apex redirect *(trivial)*

- `public/robots.txt`: the "block bot crawlers" section has three `User-agent` lines and **no `Disallow`**, so it blocks nothing. Add `Disallow: /` under the grouped agents if blocking is actually wanted, or delete the section. **Never add a `Disallow` to the `User-agent: *` group.**
- Vercel → Domains: change the apex `mvvnaturales.com` → `www` redirect from **307 temporary** to **308 permanent**. Verify with `curl -sI https://mvvnaturales.com/ | head -2`.

#### 1.23 — Fix the three trivial performance wins *(trivial)*

Do these because they are one-liners, then stop. Performance is not why this site is unindexed.

1. **`src/components/product-04.jsx:33`** — the LCP image on `/productos` is `loading="lazy"` (Lighthouse `lcp-lazy-loaded` score **0**), adding **2,016 ms of pure Load Delay = 42% of LCP**. Change the **first grid tile only** to `loading="eager" fetchpriority="high"`; leave the other 7 lazy. Add a matching `<link rel="preload" as="image" fetchpriority="high">` in `productos.astro`.
2. **The 172 KiB logo** ships with no Cloudinary transform on **70 of 75 pages** — the #1 largest resource on `/`, larger than the main JS chunk, ~92% waste. Insert `f_auto,q_auto,w_240/` into the URL in the 5 rendered `<img>` uses: `navbar-06.jsx:51`, `footer-02.jsx:15`, `Footer.astro:12`, `content-29.jsx:171`, `content-30.jsx:223`; use `w_180` for the apple-touch-icon at `Layout.astro:36`. **Do NOT add the transform to the JSON-LD `logo`/`image` values** — schema.org logo should stay a full-resolution canonical asset.
3. **`astro.config.mjs`** — change `defaultStrategy: 'viewport'` to `'hover'`. `prefetchAll: true` currently pulls 41 KB of extra HTML on first load, including a useless 468-byte fetch of the `/primerose` redirect stub.

**Then read the Vercel Speed Insights tab.** It already reports real-user LCP, INP and CLS by route and device — the field data PSI would not return (`HTTP 429`, `"quota_limit_value": "0"`). Confirm or refute the 4.87 s simulated mobile LCP before investing anything further. At 1,360 impressions/quarter this origin very likely falls below CrUX's minimum traffic threshold, in which case Google has no field data for it and CWV is not influencing its rankings at all.

---

## SPRINT 2 — Weeks 3–6: Make pages worth indexing

**Goal:** Sprint 1 made every page reachable. Sprint 2 makes them worth an index slot. This is content work and there is no technical substitute for it. Target: Duplicate/Thin 26→70, E-E-A-T 11→65, Indexing 40→65.

**Precondition:** do not start Sprint 2 until the Sprint 1 verification suite is green. Adding content to an unreachable page changes nothing.

### Band A — unlocks-indexing

#### 2.1 — Cut product-page boilerplate from 48.2% to ~30% *(small)*

Every product page is 400 words of which **193 (48.2%) is identical chrome**, leaving a median of 215 unique words. Two edits remove ~110 words of boilerplate from all 40 pages at once:

1. **`src/components/product-simple.jsx`** — delete the "Precios de Mayoreo" block (~24 words of price scaffolding that displays no prices: *"💼 Precios de Mayoreo / 🛒 1-9 piezas / Precio Menudeo / Ideal para uso personal / 📦 10+ piezas / Precio Mayoreo / Descuentos especiales / ✨ Mejor precio"*) and collapse the duplicated WhatsApp CTA copy.
2. **`src/components/product-carousel.jsx`** — cut the 34-item "Más Productos" list to **4–6 genuinely related products chosen by category**. It currently injects an identical 71–75-word product-name list into all 40 pages (~2,940 words site-wide, 18% of a typical page's text) and spreads identical anchor text everywhere so no product receives a stronger internal signal than any other.

**Verify:** `python3 scripts/seo-check.py` — chrome ratio should drop below 32%.

#### 2.2 — Merge the 6 thin guides and enrich the survivors *(medium)*

Six guides are under 460 rendered words (≈370 body words after chrome): hambre-emocional 304, ansiedad-por-comer 348, rutina-ejercicios-abdomen 393, dieta-grasa-abdominal 433, grasa-visceral-vs-subcutanea 440, alimentos-saciantes 453.

| Merge | Into | Result |
|---|---|---|
| `hambre-emocional` + `ansiedad-por-comer` | `controlar-apetito` (1,298 words, 14 h2 — already the strongest) | 1 substantial URL |
| `rutina-ejercicios-abdomen` + `dieta-grasa-abdominal` | `quemar-grasa-abdominal` (948 words, 9 h2) | 1 substantial URL |

301 the merged URLs in `vercel.json`. Six thin URLs become two strong ones.

**Also resolve the one real topic collision** (the only genuine duplication in the resource corpus — measured 5-gram Jaccard between the six metabolismo pages is 0.009–0.034, so **do not** de-duplicate the rest): `/recursos/guias/acelerar-metabolismo/` (1,205 words) vs `/blog/como-acelerar-metabolismo-naturalmente/` (744 words), title similarity 0.703. Consolidate into the richer guide and 301 the blog URL, or narrow the blog post to a distinct angle.

Retitle `/recursos/guias/alimentos-saciantes/` away from the shared *"15 Alimentos… \| Guía 2025"* pattern it shares with `alimentos-acelerar-metabolismo` (title similarity 0.742).

**Verify:** `python3 scripts/seo-check.py` — 0 sitemap URLs under 600 body words.

#### 2.3 — Rewrite `/testimonios/` as real content *(medium)*

The page receives **207 internal links** — one of the four most-linked URLs on the site — and renders 255 words with **zero testimonial text**, only images, while claiming *"Cada testimonio incluye la historia completa: qué producto usaron, cuánto tiempo…"* and *"la mayoría bajó entre 15 y 25 kilos en 3-6 meses"*.

Transcribe every testimonial into HTML: name, product used, duration, starting situation, outcome, date. Target 1,200+ words. Add a per-testimonial link to the product that customer used — this converts 207 wasted inbound links into 40 outbound product links with descriptive anchor text.

This is **the strongest E-E-A-T asset a YMYL supplement site can own** and the only content on this site a competitor cannot copy. Remove the unsubstantiated *"15 y 25 kilos"* aggregate claim (per 1.15) unless every transcribed testimonial supports it individually.

**Verify:** body words ≥1,200 · outbound product links ≥20 · `grep -c "15 y 25 kilos" dist/testimonios/index.html` → 0

#### 2.4 — Rewrite `/catalogo/` and `/contacto/` *(small)*

Both are submitted in the sitemap with essentially no crawlable text.

**`/catalogo/`** — 40 body words, **1.4% text-to-HTML**, 157 inbound links (3rd most-linked page), and it emits **zero** links to any of the 40 product pages. `src/components/catalog-image-gallery.jsx` is a flat array of 39 Cloudinary `.webp` URLs with no `<a>` wrappers, so the entire catalog is invisible to a crawler.
- Wrap each catalog image in an `<a>` to its product route; add real alt text.
- Render the product list as HTML alongside the gallery — the data already exists as the `allProducts` array in `product-carousel.jsx`. 40 names + one-line descriptions + links.
- Converts a 40-word terminal node into a 400+ word hub feeding all 40 product pages.

**`/contacto/`** — 16 body words; full text after chrome is *"Haz tu pedido — Comprar por WhatsApp"*. It is the **only** one of 70 pages omitting a `description=` prop (`src/pages/contacto.astro:11` is `<Layout title="Contacto">`), so it inherits the site-wide default from `Layout.astro:14`.
```astro
<!-- BEFORE -->
<Layout title="Contacto">
<!-- AFTER -->
<Layout title="Dónde Comprar MVV Natural | Pedidos por WhatsApp MX y USA"
        description="¿Dónde lo compro? Pide tus suplementos MVV Natural por WhatsApp: México +52 631 298 2043 o USA +1 520 216 1443. Envío 1-3 días con rastreo.">
```
Add an h1 plus real content: both numbers as tappable text, hours, service areas MX/USA, shipping origin, response time, and a real street address once the client provides one.

**Verify:** `/catalogo/` outbound product links ≥40 · `/contacto/` body words ≥250, h1 count 1

#### 2.5 — De-duplicate `/preguntas-frecuentes/` from the homepage *(small)*

555 of 595 8-grams (93.5%) and all 12 headings appear on `/`. Both pages render the same `<Faq7 />`; the h1 is hardcoded at `src/components/faq-07.jsx:26`.

1. Parameterise the heading level (done in 1.16) — h2 on `/`, h1 on the FAQ page. Zero content loss.
2. Give `/preguntas-frecuentes/` genuinely distinct **operational** content the homepage does not carry: shipping carriers and transit times MX/USA, payment rails (OXXO, Mercado Pago, Kueski, Zelle, PayPal, CashApp), how to verify product originality, how to order via WhatsApp, what happens after ordering.
3. Retire the duplicated weight-loss Q&As from this page so the two stop overlapping.
4. Retitle off the head term it shares with `/blog/funcionan-pastillas-para-bajar-de-peso/` — both currently open with the byte-identical 43-char string *"¿Funcionan Las Pastillas Para Bajar de Peso?"*:

| | Before | After |
|---|---|---|
| Title | *"¿Funcionan Las Pastillas Para Bajar de Peso? Preguntas Frecuentes"* (65) | *"Preguntas Frecuentes \| Envíos, Pagos y Dudas \| MVV Natural"* (58) |
| Desc | *"Todas tus dudas respondidas: ¿Cuánto peso voy a perder?…"* (159) | *"Resolvemos tus dudas sobre MVV Natural: tiempos de envío a México y USA, formas de pago, originalidad de los productos y cómo hacer tu pedido."* (142) |

**Verify:** 8-gram overlap with `/` below 30% (currently 93.5%)

#### 2.6 — Fix the `/blog` hub *(small)*

`/blog` renders 327 body words, 3 h1s, and six **fabricated** headlines that describe no real article. Verified anchor→destination mapping:

| Fabricated anchor | Actually links to |
|---|---|
| *"Cómo eliminar toxinas de tu cuerpo naturalmente"* | `/blog/funcionan-pastillas-para-bajar-de-peso` |
| *"Beneficios de los suplementos naturales para tu sistema inmunológico"* | `/blog/como-acelerar-metabolismo-naturalmente` |
| *"Alimentación consciente para un cuerpo saludable"* | `/blog/mejores-suplementos-naturales-bajar-peso-mexico` |
| *"Estrategias naturales para equilibrar tu metabolismo"* | `/blog/como-acelerar-metabolismo-naturalmente` |
| *"Mindfulness y suplementación para reducir el estrés"* | `/blog/funcionan-pastillas-para-bajar-de-peso` |
| *"Protege tu sistema inmunológico con remedios naturales"* | `/blog/mejores-suplementos-naturales-bajar-peso-mexico` |

**Zero of six anchors describes its destination.** Each post is also linked 5× from this one page because `src/pages/blog.astro:21-22` renders both `blog-32.jsx` and `blog-44.jsx`.

- Delete one listing component so each post is listed once.
- Replace all six headlines and the invented read-times ("5 min de lectura", "7 min") with the real titles, real excerpts and real publication dates.
- Keep one h1; remove the 2 dead `href="#"`.
- **Pair with genuine hub prose** — de-duplicating alone would take a 371-word page lower, worsening the thin-content signal.

#### 2.7 — Enrich the Tier-1 product pages *(large)*

Ten pages to 600+ unique words each: the 3 with proven demand (`/meizitang-soft-gel`, `/sosburn-clear`, `/duo-60-fusion`) plus `/sosburn`, `/lipohd`, `/lidabooster`, `/chupapanza`, `/30fusion`, `/alphaglow`, `/applecidervingar`.

Add to each `productData` object fields the template renders:
- A 150–250 word *"Quién debería usarlo / quién no"* section
- A dosage-timing table
- An ingredient-by-ingredient mechanism paragraph
- 2–3 real customer Q&As

**Critically, eliminate the description/benefits echo.** 82 of 264 benefit bullets (31.1%) are verbatim substrings of the same page's own description; on `meizitang-soft-gel.astro:10`, `colit6.astro` and `cmpushupmen.astro` it is **100%** (all 9 Meizitang bullets appear word-for-word inside the `description` string). On `/meizitang-soft-gel` this means effective unique content is ~175 words, not the measured 222. Rewrite `benefits[]` to carry what the description does not: who it is for and not for, timeline to results, how it differs from the adjacent product in the range, what the ingredient dosages actually deliver.

Start with the 7 total-overlap pages: `meizitang-soft-gel` (9/9), `colit6` (8/8), `cmpushupmen` (6/6), `slim24` (8/12), `lida-slimming-tea` (6/10), `protein-body` (6/9), `maxi-fibra` (5/7).

### Band B — risk-removal

#### 2.8 — Create a real author entity *(medium)*

**0 of 19 health-content pages carry an author, a bio, a credential or a visible date.** The only `Person` entity in the entire build is the fabricated *"Cliente MVV Natural"* (removed in 0.1). `/sobre-nosotros/` currently returns **404**.

1. Create `/sobre-nosotros` with real named people, their actual role, years in the business, and any nutrition or health qualifications. Mark up as `Person` / `Organization` JSON-LD. Link from every page.
2. Add visible `Escrito por <name>` and `Actualizado: <date>` to all 13 guías, 3 comparativas and 3 blog posts.
3. Back it with `BlogPosting` JSON-LD carrying `author` (a `Person`, not an Organization), `datePublished`, `dateModified`, `publisher`, `mainEntityOfPage`, `inLanguage: "es-MX"`.

**The Person must be a real, named human with a visible bio.** Inventing one repeats the fake-review mistake at higher stakes. Ship the visible byline and bio content **first**, then let the JSON-LD describe what is actually on the page — never the reverse.

**Verify:** `grep -rli "Escrito por\|Actualizado" dist/recursos/*/*/index.html dist/blog/*/index.html | wc -l` → 19 (currently 0)

#### 2.9 — Add citations to the health content *(medium)*

**Zero outbound citations across ~11,000 words** — on pages that self-grade *"Nivel de Evidencia: MÁXIMO (Centenares de estudios)"* and tell readers *"Si no hay estudios científicos sólidos, es marketing, no ciencia."*

Cite the actual research for every physiological claim, linking to PubMed or journal sources — **not** to product pages. Prioritise the guides making mechanism claims: metabolism, thermogenesis, appetite regulation, visceral fat.

**Verify:** ≥3 external citations per guide making a physiological claim.

### Band C — ctr

#### 2.10 — Fix titles and descriptions *(medium)*

30 titles exceed 60 chars in `dist` (59 of 70 live); 15–16 descriptions exceed 155. Zero missing, zero duplicates — that part is already clean.

Priority order: the 5 pages that already earn clicks, then everything else.

| Page | Before | After |
|---|---|---|
| `/` | *"Pastillas Para Bajar de Peso México \| Suplementos Naturales MVV"* (63) | *"MVV Natural \| Pastillas Para Bajar de Peso en México y USA"* (58) |
| `/` desc | *"Pierde 15-25 kilos con pastillas naturales…"* (165) | *"MVV Natural: suplementos naturales para bajar de peso. Meizitang, Lida, Chupa Panza y Duo-60 Fusion originales. Pide por WhatsApp, envío MX y USA."* (146) |
| `/meizitang-soft-gel/` | *"Meizitang Soft Gel - Botanical Slimming 100% Natural \| 36 Cápsulas"* (66) | *"Meizitang Soft Gel Original \| Botanical Slimming 36 Cápsulas"* (60) |
| `/meizitang-soft-gel/` desc | *"…36 cápsulas. No apto hipertensos/diabéticos."* (150) — **terminates on a disqualifier** | *"Meizitang Soft Gel original (Botanical Slimming), 36 cápsulas. Cotiza precio de menudeo o mayoreo por WhatsApp. Envío 1-3 días a México y USA."* (142) |
| `/sosburn-clear/` | *"SOS Burn Clean 30 Cápsulas - 24 HR PURIFIC SLIM \| Para Él y Para Ella"* (69) | *"SOS Burn Clear 30 Cápsulas \| Quemador y Detox \| MVV Natural"* (59) |
| `/duo-60-fusion/` | (68) | *"Duo-60 Fusion Xtreme Original \| Comprar en México y USA"* (55) |
| `/chupapanza/` | *"Chupa Panza Cápsulas - Elimina Vientre Abultado \| Quema Grasa Difícil"* (69) | *"Chupa Panza Original \| Cápsulas Quema Grasa México y USA"* (56) |
| `/lidabooster/` | (61) | *"Lida Booster Original \| Pastilla Rosa Daidaihua México y USA"* (60) |
| `/cmpushupmen/` | *"CM Push Up MEN 90 Cápsulas - Aumento de Glúteos, Pectorales y Masa Muscular"* (75) | *"CM Push Up MEN - Aumento de Glúteos y Masa Muscular \| 90 Cáps"* (60) |

**General pattern:** drop packaging descriptors ("30 Cápsulas", "24 HR PURIFIC SLIM", "90 Cápsulas") from the title into the description, freeing 10–15 chars for "Original" and "México y USA". Only 2 of 70 titles currently contain "México" while **83% of clicks come from Mexico**; 62 of 70 pages carry no geographic token at all.

Also fix the 15 titles hardcoding "2025" (zero say 2026) — either bump **and genuinely refresh**, or remove the year from the template so titles stop decaying. The latter is safer given these pages are not on a maintenance schedule.

**Verify:** `python3 scripts/seo-check.py` — 0 titles >60, 0 descriptions >155.

#### 2.11 — Per-page OG images and types *(small)*

All 70 pages share one `og:image` (the padded logo) and `og:type="website"`. **WhatsApp is the site's only conversion channel and every shared product link renders the same grey logo card**, when the product pages already carry real Cloudinary photography in their `Product.image` array that is never surfaced.

In `src/layouts/Layout.astro`: add an `ogType` prop defaulting to `'website'`; use the existing but never-supplied `image` prop. Pass each product's Cloudinary image (already in frontmatter) and each post's hero. Set `og:type` to `product` on product routes and `article` on the 3 blog posts. Add `twitter:card=summary_large_image` + title/description/image.

**Verify:** `grep -h 'og:image' dist/*/index.html | sort -u | wc -l` → >1 (currently 1)

### Band D — rich-result

#### 2.12 — Add BreadcrumbList and BlogPosting to the 19 content pages *(medium)*

All 16 `/recursos/*` pages plus `/blog`, `/catalogo`, `/testimonios`, `/contacto` and the legal pages carry **only** the site-wide Organization block — no page-type schema, no breadcrumbs, despite `/recursos/comparativas/duo-60-vs-lida/` sitting three levels deep.

Breadcrumbs are **the one SERP enhancement this site can legitimately earn** — they require no price, no reviews and no authority tier.

Create a shared `src/components/BreadcrumbSchema.astro` taking `{name, url}[]` and emitting trailing-slash-normalised absolute URLs, plus a visible breadcrumb `<nav>` with real `<a>` elements. Add `BlogPosting` to the 16 resource pages per 2.8.

**Do not add `BlogPosting` to the six thin guides until 2.2 has raised their word count** — declaring a 304-word page an Article invites the comparison.

**Verify:** `grep -rl "BreadcrumbList" dist/recursos --include=index.html | wc -l` → 16

---

## SPRINT 3 — Weeks 7–12: Grow non-brand traffic

**Goal:** with pages reachable (Sprint 1) and worth indexing (Sprint 2), build the structures that can actually capture non-brand demand. Target: Indexing 65→85, Indexation 50→70, non-brand share 25%→45%.

**Precondition:** GSC "Discovered – currently not indexed" must have fallen below 8. If it has not, the constraint is not link-graph — it is site-level quality or the duplicate-domain problem, and effort should return to Sprint 2 and to 3.1.

### Band A — unlocks-indexing

#### 3.1 — Resolve the five-domain brand fragmentation *(large — start with a client conversation, not code)*

**This is the largest single finding in the audit and the largest unknown in the forecast.** MVV Natural operates on at least five live domains. On Bing (via DuckDuckGo), for the site's own #1 query `mvv natural`, mvvnaturales.com ranks **5th**, behind mvvnatural.mx (#1, #2) and mvvnatural.com (#3, #4). For `meizitang soft gel`, `mvvnatural.com/meizitang-soft-gel/` ranks #3 on the **identical slug** while mvvnaturales.com does not appear in the top 10 at all.

13 of 19 products on the legacy domain have a near-duplicate page here: `/lidabooster/`, `/fatblazer/`, `/lipohd/`, `/15day-detox-tea/`, `/30daydetox/`, `/ashwagandha/`, `/hflex/`, `/floryva/`, `/alphaglow/`, `/lida-slimming-tea/`, `/edetox/`, `/slim24/`, Body Shape. Both sites even share verbatim copy (*"15 años de experiencia"*).

**Step 1 — establish ownership with the client.** The answer branches completely:

| If… | Then |
|---|---|
| **The client owns mvvnatural.com and mvvnatural.mx** | Pick mvvnaturales.com as canonical. 301 every legacy URL to its equivalent here (slugs already align). Verify both legacy domains in GSC and submit **Change of Address**. Retire mvvnatural.weebly.com. |
| **They are distributor-run and cannot be redirected** | mvvnaturales.com **cannot win as a duplicate storefront** and must be differentiated — different content, different angle, different products emphasised. Add cross-domain `rel=canonical` where possible. |

**Either way:** add the legacy domains and the real social profiles to `Organization.sameAs`, reconcile the NAP conflict (legacy publishes 6621200412 / 6622264764 in Hermosillo, Sonora; this site's schema declares +52-631-298-2043 and +1-520-216-1443), and create + verify a **Google Business Profile** for the Hermosillo location listing www.mvvnaturales.com as the website. **Do not fabricate an address** — get the real one from the client first.

**Verify:** search `mvv natural` — mvvnaturales.com should move to position 1–2. A knowledge panel appearing is the strongest confirmation.

#### 3.2 — Build 5 category hubs and silo the link graph *(large)*

There are currently **no category routes at all**, and the link graph is a flat mesh: 40 product pages each link the same 33 undifferentiated siblings, so no product can accumulate enough internal PageRank to out-compete the others, and Google gets no topical grouping signal.

| New route | Members | Target query |
|---|---|---|
| `/productos/quemadores-de-grasa` | sosburn, sosburn-clear, sosburn-sensitive, duo-60-fusion, lidabooster, fatblazer, lipohd, 30fusion | `quemador de grasa natural` |
| `/productos/detox` | 15day-detox-tea, 30daydetox, 3day-reset, edetox, applecidervingar | `té detox para bajar de peso` |
| `/productos/colageno-y-belleza` | colageno-biotina, blueberry-colageno, alphaglow, magic-booty-up | `colágeno con biotina` |
| `/productos/control-de-apetito` | chupapanza, maxi-fibra, slim24, cmpushup, primrose | `inhibidor de apetito natural` |
| `/productos/salud-y-bienestar` | ashwagandha, serenity, thyroide-support, higa2, colit6, macapremium, hflex | `suplementos naturales bienestar` |

Each hub: 800–1,000 words describing 5–7 products, with keyword-bearing anchors. Each product page links its own category plus 4 in-category siblings instead of 33 random ones.

This is also where the **Tier-2 consolidation** lands: 301 the ~27 weakest SKUs into their category page. Net effect ~70 routes → ~35, median body words 380 → ~700.

#### 3.3 — Cross-link `/blog` and `/recursos` *(small)*

The two content silos share **zero** contextual links. All 16 `/recursos/*` pages contain 0 `href="/blog/…"`. The 3 posts have 5 inbound links each, all from `/blog` itself. The 3 comparativas link zero sibling guías.

Add a "Sigue leyendo" block to each post and guide:

| Post | ↔ |
|---|---|
| `como-acelerar-metabolismo-naturalmente` | `guias/acelerar-metabolismo`, `guias/metabolismo-lento-causas`, `guias/ejercicios-metabolismo` |
| `funcionan-pastillas-para-bajar-de-peso` | `guias/elegir-suplemento`, `comparativas/mejor-quemador-grasa` |
| `mejores-suplementos-naturales-bajar-peso-mexico` | `comparativas/duo-60-vs-lida`, `guias/elegir-suplemento` |

Also give the 3 comparativas outbound links to their 2–3 most relevant guías.

### Band B — direct-traffic

#### 3.4 — Claim the third-party brand pool *(medium)*

The **only** demand pool with proven conversion on this site. Meizitang/Botanical Slimming already yields 65 impressions and 5 clicks at ~position 11 on an unoptimised page.

| Priority | Page | Action |
|---:|---|---|
| 1 | `/meizitang-soft-gel/` | Retitle + rewrite description (2.10). Expand to 800+ words with the `Meizitang` and `Botanical Slimming` entities used naturally throughout. Add `precio`, `original`, `menudeo`, `mayoreo` framing |
| 2 | `/lidabooster/`, `/lida-slimming-tea/` | Fix `Daidahua` → `Daidaihua` (1.19), then expand. These earn **zero** clicks today despite being real branded products with independent demand |
| 3 | `/chupapanza/` | *"Chupa Panza"* is one of the highest-demand slimming queries in Mexico and this page earns zero. Expand and retitle |

**Competitive reality check:** for `meizitang soft gel` the top 10 is mercadolibre.com.mx (#1, #2), mvvnatural.com (#3), semasbella.com (#4), meizitangmexico.com.mx (#5, #9), mvvnatural.mx (#6), eligetupeso.com (#8), armonianaturaldietshop.com (#10). **All of them show prices.** MVV cannot match on price display, so it must win on originality guarantees, wholesale pricing, and WhatsApp responsiveness — put that in the description, not a price.

#### 3.5 — Add `ItemList` to `/productos` and `/catalogo` *(medium)*

Generate from the same array that renders the cards so it can never drift. **Be clear about the ceiling:** `ItemList` of Products does **not** produce a carousel rich result (Google's carousel support covers Course, Movie, Recipe and Restaurant). The payoff is crawl discovery and collection comprehension.

This is only half the fix — also add real `<a href>` links for the 10 products currently linked from **neither** hub: `/30fusion`, `/applecidervingar`, `/cmpushup`, `/fatblazer`, `/hflex`, `/higa2`, `/primrose`, `/slimcoffee`, `/sosburn-clear`, `/sosburn-sensitive`. Structured data supplements internal links; it does not replace them.

#### 3.6 — Complete the entity graph *(small)*

- Add a `WebSite` node to **the homepage only** (Google's guidance is homepage-scoped): `name`, `url`, `inLanguage: "es-MX"`, `publisher` referencing Organization. Brand queries are 42% of clicks, so this is where entity work pays.
- **Give Organization an `@id` first.** Zero `@id` values currently exist anywhere in the built output, so a `publisher` reference would dangle and would be *worse* than the current inline objects.
- Keep `alternateName` to `["MVV Naturales", "MVV Natural México"]`. **Do not seed the misspelling "MV Natural"** — Google may select `alternateName` as the displayed label and would render the typo as the brand.
- **Do NOT add `potentialAction` / `SearchAction`** — the sitelinks searchbox rich result was retired in November 2024 and this site has no on-site search anyway.
- Add `legalName: "MVV Natural USA"` to Organization (it is the declared *"Denominación social"* at `/aviso-legal/` and the footer copyright holder) rather than deleting the correct `offers.seller`.
- Add a `brandName` prop so `Product.brand` names the **real** brand — "Meizitang", "Lida", "Chupa Panza", "MVV Natural" for own-label. Delete `manufacturer` (Google does not consume it and MVV does not manufacture these). **Do not add `seller` at Product level** — it is not a valid Product property.
- Add `sku` (stable internal, e.g. `MVV-MEIZITANG-36`), `category`, `mainEntityOfPage` and `@id`. **Do not invent `gtin` or `mpn`.**

### Band C — hygiene

#### 3.7 — Trim the shared JS bundle *(large — only if Vercel Speed Insights confirms a real problem)*

~227 KB of identical JS ships on every page and is 52–83% unused. `index.DR-NyFWh.js` is 128 KB with **106 KB (83%) unused** — the bundled Relume/Radix surface.

1. Switch barrel imports (`import { X } from '@relume_io/relume-ui'`) to deep path imports so Rollup can tree-shake.
2. `product-04.jsx` and its 4 siblings render only `<img>` and `<a>` with CSS-only hover — convert to `.astro` and remove them from the hydration graph entirely.
3. Downgrade `client:load` (144 uses vs 14 `client:visible`) for WhatsApp float, Footer2, Faq7 and all Cta* to `client:visible`/`client:idle`.
4. Delete the dead `manualChunks` block in `astro.config.mjs` — it produces **no chunks** (`ls dist/_astro/ | grep -E 'react-vendor|ui-vendor'` returns nothing) and gives a false impression that vendor splitting exists.

**Do NOT chase per-route CSS splitting.** The 112 KB stylesheet compresses to 17 KB and costs a measured 337–360 ms; the build complexity is not justified relative to the indexing work this site needs.

---

## Do NOT Do These

Explicit anti-recommendations. Each of these is a plausible-sounding action that would waste budget or cause harm on this specific site.

| # | Do not | Why |
|---:|---|---|
| 1 | **Add `HowTo` schema** — to the exercise guides, the dosage sections, or anywhere | Google **deprecated HowTo rich results in September 2023**. It renders nothing on any surface. Adding it produces markup that will never surface, on a site that already has 32 invalid URL values in its JSON-LD. |
| 2 | **Expect FAQ rich results from `/preguntas-frecuentes/`, or add `FAQPage` to more pages** | Since August 2023 FAQ rich results are **restricted to authoritative government and health-authority sites**. A commercial supplement retailer will not qualify — now or later. The existing `FAQPage` is already inert. Keep it (it is valid and clean for answer-engine ingestion) but **budget zero SERP value against it**, and never present it as a deliverable. |
| 3 | **Chase head terms like `pastillas para bajar de peso` or `bajar de peso rápido`** | The site has **1,360 impressions per quarter and ~14 indexed pages**. It ranks for these terms nowhere and cannot win against Mercado Libre and established Mexican supplement retailers. Target the proven pools instead: third-party brands (Meizitang, Lida, Botanical Slimming, Chupa Panza), brand-adjacent queries (`mvv natural opiniones`, `testimonios`), and category terms **only after** the category hubs exist with 800–1,000 words each. |
| 4 | **Publish more thin content before indexation is fixed** | 54 of 70 existing routes are already under 500 body words and 56 pages are unindexed. Adding a 400-word guide to a site Google has judged not worth indexing makes the site-level quality signal worse, not better. **Every new URL must clear 600 body words.** Fix what exists before adding anything. |
| 5 | **Mention or optimise for FID** | FID was removed from Core Web Vitals in **March 2024**. The responsiveness metric is **INP** (≤200 ms good). This site's TBT of 0–23 ms suggests INP is already comfortably passing. |
| 6 | **Ship any fabricated review, rating, shipping rate or return policy** | Beyond Sprint 0: never add `aggregateRating` until there are real, verified, per-product reviews rendered as **visible text on the page**. Never add `shippingDetails` or `hasMerchantReturnPolicy` until a real published policy exists — the current fabrications directly contradict `/aviso-legal/`, which says *"NO aceptamos devoluciones ni reembolsos"*. |
| 7 | **Add `LocalBusiness`, `Store`, or `HealthAndBeautyBusiness` schema** | No street address, city, hours or map exists anywhere on the site. `LocalBusiness` requires a real address matched against a verified GBP. **Inventing one would be a fabricated business-location claim on a YMYL site — more serious than a bad rating.** `Organization` is correct for a cross-border mail-order operation. Revisit only after 3.1 produces a real address and a verified GBP. |
| 8 | **Add `VideoObject`** | `grep -rniE "youtube\|vimeo\|<video" src` finds only a prose mention. There is no video asset to mark up. |
| 9 | **Remove the FAQ block from the homepage to fix the duplicate h1** | It is ~24% of the content on the page earning **72% of all site clicks**, and on a WhatsApp-only lead-gen model it is load-bearing for conversion. Parameterise the heading level in `faq-07.jsx` instead — zero content loss. |
| 10 | **Remove the product grid from the homepage** | It supplies **8 of the homepage's 11 product-page internal links**. With 16 pages in "Discovered – not indexed", stripping links from the highest-authority page is exactly backwards. |
| 11 | **Retarget `/productos/`'s title to chase `donde comprar`** | `/productos/` is one of the ~14 indexed pages and is earning clicks (+100%). The queries in question total **3 impressions per quarter**. Narrowing to "en México" would also hurt the 13% US audience, and inserting "Pastillas" contradicts the brand's own copy (*"A diferencia de pastillas químicas"*). |
| 12 | **Move the `SeoIntro` block above the product grid to fix h1 order** | It would push all 35 products below a full screen of prose on a mobile-dominant, 83%-Mexico audience and change the LCP candidate to a text block. Multiple h1s and heading order are **not Google ranking factors**. Promote the existing top h2 to h1 instead — zero layout change. |
| 13 | **De-duplicate the `/recursos/guias/*` pages** | Measured 5-gram body overlap between the six "metabolismo" pages is **0.009–0.034 Jaccard (0.7–3.4%)**. They are a correct pillar-and-cluster architecture, not cannibalization. They earn zero clicks because they are **not indexed**, not because they compete. Rewriting them for uniqueness would produce nothing. |
| 14 | **Strip "Quemador de Grasa" from product titles** | It is the only non-brand relevance signal those pages carry, on a site whose traffic is already ~100% brand. |
| 15 | **Change `client:load` to `client:only` anywhere** | The site's crawlability currently depends on Astro server-rendering every island. `client:only` would remove those hrefs from the static HTML entirely. Add a CI guard rejecting it. |
| 16 | **Add an `x-robots-tag` header** | The header's absence is currently *confirming* that the indexing problem is not header-driven. Adding one risks introducing the very failure mode that has been ruled out. |
| 17 | **Add `Disallow` to the `User-agent: *` group in robots.txt** | It currently correctly reads `Allow: /`. The broken bot-block section is a separate, harmless no-op. |
| 18 | **Invest in Core Web Vitals beyond the three trivial fixes in 1.23** | Simulated mobile LCP of 4.87 s drops to **1.6 s with applied throttling** — the failure is substantially a Lantern artifact. At 1,360 impressions/quarter the origin very likely has **no CrUX record at all**, meaning CWV is not currently influencing rankings. Check Vercel Speed Insights first. |
| 19 | **Chase per-route CSS splitting** | 337 ms saving on a 17 KB gzipped bundle. Not worth the build complexity against an 80% non-indexation crisis. |
| 20 | **Add `@id` references to nodes that do not exist** | Zero `@id` values currently exist anywhere in the build. Referencing `#organization`, `#brand` or `#webpage` before defining them produces dangling references that strip data Google currently receives — strictly worse than the inline objects. Define the `@id`s first. |

---

## Weekly Verification Routine

`scripts/seo-check.py` (658 lines, no third-party dependencies, Python 3.8+) is the mechanical gate. Per its own docstring: *"A green run means 'nothing is provably broken', not 'this will rank'."* It asserts mechanical facts only — it cannot judge E-E-A-T, content quality, or whether Google will index anything.

### Every build, before every deploy

```bash
cd /Users/alexismireles/final-site1
npm run build && python3 scripts/seo-check.py
echo "exit=$?"   # 0 = pass, 1 = at least one FAIL
```

Wire it in so it cannot be skipped — add to `package.json`:
```json
"verify": "astro build && python3 scripts/seo-check.py"
```

### Pre-deploy hard gate (must all be zero)

```bash
grep -rl "aggregateRating"        dist --include="*.html" | wc -l   # fabricated ratings
grep -rl "Cliente MVV Natural"    dist --include="*.html" | wc -l   # fabricated reviewer
grep -rl "comundefined"           dist --include="*.html" | wc -l   # broken schema URLs
grep -rl "tincidunt"              dist --include="*.html" | wc -l   # lorem ipsum
grep -rlc '"price":"0"'           dist --include="*.html" | grep -vc ':0'  # fake offers
```

### Weekly (every Monday, ~15 minutes)

| Check | Command / source | Target |
|---|---|---|
| Index coverage | GSC → Pages → "Crawled/Discovered – currently not indexed" | Trending **down** week over week |
| Impressions | GSC → Performance, 28d rolling | Trending **up** — this is the primary metric, not clicks |
| Non-brand share | GSC → Queries, filter out `mvv`/`mvvnatural`/`mv natural` | Trending up from 58% toward 60%+ |
| New queries | GSC → Queries, count distinct | Rising from 64 |
| Orphans & broken links | `python3 scripts/seo-check.py` | 0 |
| Sitemap lastmod diversity | `grep -o '<lastmod>[^<]*' dist/sitemap-0.xml \| sort -u \| wc -l` | >1 |
| Field CWV | Vercel dashboard → Speed Insights | LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1 |
| Live redirect sanity | `curl -sI https://www.mvvnaturales.com/slimcoffe \| head -2` | 308, not 200 |

### Monthly

- Re-run the full route census (words, inbound links, title length, h1 count) and diff against the audit appendix.
- Re-check `Organization.sameAs` targets by **body content**, not status code — the dead Facebook URL returns HTTP 200.
- Re-check the brand SERP for `mvv natural`: has mvvnaturales.com moved above mvvnatural.mx and mvvnatural.com?
- Spot-check 3 product pages in the Rich Results Test. Expect Product **warnings** for missing `offers`/`review`/`aggregateRating` — that is correct and intended for a no-price catalog. Expect **zero errors**.

### The one number that matters

**GSC "Discovered – currently not indexed".** It is 16 today and it maps 1:1 onto the 16 `/recursos/*` pages. If Sprint 1 ships correctly it should approach zero within 4–6 weeks. If it does not, stop and re-diagnose before spending Sprint 2's content budget — the constraint would then be site-level quality or the five-domain duplicate, not the link graph.
