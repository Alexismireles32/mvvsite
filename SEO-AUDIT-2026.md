# MVV Natural — SEO Audit 2026

**Property:** `sc-domain:mvvnaturales.com` · **Site:** https://www.mvvnaturales.com
**Audited:** 2026-07-27 · **Stack:** Astro 5.15.1 (`output: 'static'`), React 19 islands, Relume UI, Tailwind, Vercel
**Business model:** Spanish-language (es-MX) natural weight-loss supplement catalog, lead-gen only. No cart, no checkout, no prices. Every conversion is a WhatsApp tap (MX +52 631 298 2043 / US +1 520 216 1443).
**Scope:** 75 built HTML files, 70 indexable routes, 69 sitemap URLs, 5 redirect stubs. 12 audit streams with adversarial verification; refuted findings removed.

---

## 1. Executive Summary

### SEO Health Score: **22 / 100**

| Dimension | Weight | Score | Weighted |
|---|---:|---:|---:|
| Indexing & Crawl Diagnosis | 20% | 11 | 2.20 |
| Indexation & SERP Presence | 15% | 16 | 2.40 |
| E-E-A-T & YMYL Content Quality | 15% | 11 | 1.65 |
| Duplicate / Near-Duplicate / Thin Content | 12% | 26 | 3.12 |
| Internal Linking & Crawl Equity | 12% | 17 | 2.04 |
| Live-Site Technical Recon | 10% | 41 | 4.10 |
| On-Page & SERP Appearance | 8% | 34 | 2.72 |
| Structured Data / Schema.org | 5% | 27 | 1.35 |
| Core Web Vitals & Performance | 3% | 72 | 2.16 |
| **Total** | **100%** | | **21.7 → 22** |

The weighting is deliberate. Hosting, TLS, compression and Core Web Vitals are the healthiest parts of this site and are worth 13% combined, because none of them is why the site fails. Indexing, indexation, E-E-A-T and content quality carry 62% because that is where the entire problem lives.

### The two facts that define this audit

**Fact 1 — roughly 80% of the site is not in Google's index.**

| GSC page-indexing state | Pages |
|---|---:|
| Crawled – currently not indexed | 40 |
| Discovered – currently not indexed | 16 |
| Page with redirect | 3 |
| Not found (404) | 0 |
| Alternate page with proper canonical tag | 0 |
| **Not indexed (total)** | **~56** |
| **Indexed (inferred)** | **~14** |

"Crawled – currently not indexed" is not a technical block. Googlebot fetched those 40 pages, evaluated them, and decided they were not worth an index slot. "Discovered – currently not indexed" is worse: Google knows the URL exists and will not even spend crawl budget on it. Content that is not indexed cannot rank, cannot earn an impression, and cannot be improved by any amount of on-page optimization.

**Fact 2 — the traffic that does exist is almost entirely the brand's own name.**

| Query | Clicks | Impressions | Type |
|---|---:|---:|---|
| mvv natural | 48 | 136 | own brand |
| mv natural | 10 | 86 | own brand (misspelling) |
| meizitang soft gel | 3 | 37 | **third-party brand MVV resells** |
| mvvnatural | 1 | 20 | own brand |
| botanical slimming soft gel | 1 | 15 | **third-party brand** |
| botanical slimming soft gel precio | 1 | 13 | **third-party brand** |
| si | 1 | 2 | noise |
| donde las puedo comprar | 1 | 2 | purchase intent |
| duo-60 fusion xtreme | 1 | 2 | own SKU (navigational) |
| donde lo compro | 1 | 1 | purchase intent |

Own-brand queries = 59 of 141 clicks (**42%**). In the last 28 days the homepage alone took **38 of 53 clicks (72%)**. The only non-brand queries earning clicks — `meizitang soft gel`, `botanical slimming soft gel` — are a **third-party Chinese product brand MVV resells**, not MVV's own content or SKU names.

And the decisive number: **zero clicks from ~11,000 words of blog / guías / comparativas content.** 3 blog posts, 13 guides and 3 comparisons produce nothing, because none of them is in the index.

### What that means strategically

This is not a ranking problem, a CTR problem, or a Core Web Vitals problem. It is an **index-eligibility problem stacked on a demand-targeting problem**:

1. Google will not index 56 pages because they are near-duplicate templates (median 215 unique words per product page, 48.1% identical chrome), link-starved (16 `/recursos/*` pages have zero inbound links from outside their own folder), or actively low-quality (a live 1,123-word lorem-ipsum page with fabricated prices).
2. The 40 product pages are named after invented house SKUs ("Alpha Glow", "Bikini Strong", "Lipo HD 360") that nobody searches. The pages that do earn non-brand clicks earn them by borrowing a third-party brand's existing demand.
3. On top of both, a duplicate-entity problem: **at least five live domains carry the MVV Natural brand** (mvvnatural.com, mvvnatural.mx, mvvnaturales.com, mvvnatural.weebly.com, mvvnaturalbykarlatorres.com), and mvvnaturales.com is the newest and weakest while carrying 13 of the same 19 SKUs.

**One thing must be blocked before anything else:** an uncommitted change in `src/components/product-seo.jsx` adds a fabricated `aggregateRating` (4.5 stars, reviewCount 1) and an invented review by "Cliente MVV Natural" to all 40 product pages. It is already baked into `dist/` (verified: 40 files) and is one deploy away from production. Fabricated reviews on a YMYL health site are a Google spam-policy violation. See Sprint 0 in the action plan.

---

## 2. What Is Actually Working

Honest accounting. These are real assets, not consolation prizes.

| # | What works | Evidence | Why it matters |
|---|---|---|---|
| 1 | **`/meizitang-soft-gel/` ranks and converts on a non-brand term** | 3 clicks / 37 impressions on `meizitang soft gel`; 1/15 on `botanical slimming soft gel`; 1/13 on `botanical slimming soft gel precio`. 4 clicks (+300%) in 28d. | **The single most important positive signal in the dataset.** It proves the site *can* rank for a commercial product query when the query has pre-existing demand. It is 424 words — shorter than `/duo-60-fusion/` (500 words) which earns nothing. The differentiator is demand, not quality. This is the entire growth thesis in one data point. |
| 2 | **10.4% average CTR at average position 11.3** | 141 clicks / 1,360 impressions. Page-2 CTR is normally 1–2%. | Snippets are over-performing their positions. Titles and descriptions are doing real work. The constraint is impressions (~15/day), not click-through. |
| 3 | **+61% clicks month-over-month** | 28d: 53 clicks (+61%), 415 impressions (+12%). Homepage +90%, `/meizitang-soft-gel/` +300%, `/sosburn-clear/` +100%. | Direction is right. Brand awareness is growing faster than impressions, which is consistent with offline/social demand generation working while organic supply stays capped by indexing. |
| 4 | **Delivery infrastructure is genuinely good** | HTTP/2, Google Trust Services cert, HSTS `max-age=63072000`, brotli on HTML, `cache-control: public, max-age=31536000, immutable` on `/_astro/*`, TTFB 0.165s, total 0.308s for an 89 KB homepage (19.7 KB over the wire). | Delivery is **not** why 56 pages are unindexed. No time should be spent here. |
| 5 | **Real 404s, no cloaking, no accidental noindex** | `/nonexistent` → `HTTP/2 404` + `x-vercel-error: NOT_FOUND`. Identical etag `2b4042d582330829a16a7c0d560dc8cb` for Googlebot UA and default UA. `x-robots-tag` header absent site-wide. 0 pages carry `noindex` except the 5 intentional stubs. | Rules out the entire class of "something is blocking Google" hypotheses. |
| 6 | **robots.txt and sitemap are correctly wired** | `robots.txt` 200, `User-agent: * / Allow: /`, `Sitemap: https://www.mvvnaturales.com/sitemap-index.xml` (200). All 70 sitemap URLs return 200. **0 of 70 canonical mismatches.** | Discovery plumbing works. The sitemap's problem is signal quality (uniform lastmod), not correctness. |
| 7 | **React islands are server-rendered — hydration is NOT the cause** | `grep -rn "client:only" src/` → **zero matches**. All directives are `client:load` / `client:visible` / `client:idle`, all of which Astro SSRs at build time. `dist/productos/index.html` contains 32 product hrefs in raw HTML. | **Verified negative.** Rules out the one hypothesis that would have explained everything with a single fix. Do not spend effort on SSR/prerender changes. |
| 8 | **CLS and INP are healthy** | CLS 0–0.076 (threshold ≤0.1) on all 4 URLs tested. TBT 0 ms on `/productos` and `/duo-60-fusion`, 12.5 ms on `/`, 23 ms on the blog post — so INP is almost certainly well inside the ≤200 ms "good" band. Desktop Lighthouse 93–96. | Two of three Core Web Vitals pass outright. |
| 9 | **Titles and descriptions are unique** | 70 distinct titles / 70 pages. 70 distinct meta descriptions / 70 pages. Zero missing, zero exact duplicates. | Mechanical on-page hygiene is done. The problem is targeting and length, not duplication. |
| 10 | **Vercel Speed Insights is already installed and collecting real-user data** | `@vercel/speed-insights ^1.2.0` in package.json, imported at `src/layouts/Layout.astro:2`, `/_vercel/speed-insights/script.js` loads on every page. | Real field LCP/INP/CLS already exists in the Vercel dashboard. The PSI API is quota-blocked (`"quota_limit_value": "0"`) and CrUX returns 403, so this is the only field data available — and it is free. |
| 11 | **Organization schema skeleton is well-formed** | Name, alternateName, 500×500 logo ImageObject, foundingDate 2010, two ContactPoints (MX + US), areaServed MX/US. Valid JSON on 70/70 pages, zero parse errors across 156 JSON-LD blocks. | The entity foundation exists. It needs `@id`, a `WebSite` node, and a live Facebook URL — additive fixes, not a rebuild. |
| 12 | **`/sosburn-clear/` earns 4 clicks (+100%) on ONE inbound internal link** | Its only internal referrer is its own meta-refresh redirect stub `/sosburnclear/`. | Demonstrates latent headroom: repointing 40 links at it costs one line and should compound immediately. |

---

## 3. The Indexing Crisis: Root Causes Ranked by Pages Explained

56 pages are not indexed. Below, each root cause is quantified by how many of those 56 it accounts for. Causes overlap — several pages fail for two or three reasons at once — so the column sums past 56 by design. What matters is which causes explain the most pages for the least work.

| # | Root cause | Pages explained | Bucket | Evidence | Effort |
|---:|---|---:|---|---|---|
| 1 | **Product-template mass duplication** — 40 product pages are one template; 48.1% of every page is byte-identical chrome, leaving a **median of 215 unique words** | **33** | Crawled–not indexed | 16,008 total words across 40 pages, of which 4,711 are chrome present verbatim on all 40, plus 2,996 in the identical 34-item carousel. 8,301 unique words ÷ 40 = 208 mean. Worst: `/primrose/` 70 unique words (73.2% chrome), `/slimcoffee/` 79, `/applecyder/` 87. 41.0% of all 5-gram shingles appear on ≥90% of the 40 pages. | Large |
| 2 | **`/recursos/*` silo is sealed** — all 16 pages have zero inbound links from outside the folder | **16** | Discovered–not indexed | `grep -rl 'href="/recursos/' --include=index.html dist/` returns 13 files, **all of them inside `/recursos`**. Zero product pages, zero blog posts, zero links from `/` or `/productos`. 9 of 13 guides are absent from the `/recursos` hub entirely (`src/pages/recursos.astro` defines only 7 child cards) and sit at click-depth 3 with 1–3 inbound links. **16 `/recursos/*` pages = 16 "Discovered – not indexed". Exact match.** | Medium |
| 3 | **Duplicate entity across five live domains** — mvvnaturales.com is the newest and weakest MVV Natural property | **up to 40** (systemic) | Crawled–not indexed | DDG/Bing for `mvv natural`: mvvnaturales.com ranks **5th**, behind mvvnatural.mx (#1, #2) and mvvnatural.com (#3, #4). 13 of 19 SKUs on legacy mvvnatural.com have a near-duplicate page here (`/lidabooster/`, `/fatblazer/`, `/lipohd/`, `/15day-detox-tea/`, `/30daydetox/`, `/ashwagandha/`, `/hflex/`, `/floryva/`, `/alphaglow/`, `/lida-slimming-tea/`, `/edetox/`, `/slim24/`, Body Shape). For `meizitang soft gel`, `mvvnatural.com/meizitang-soft-gel/` ranks #3 on the **identical slug** while mvvnaturales.com does not appear in the top 10. | Large |
| 4 | **Link equity routed into noindex meta-refresh stubs** — 122–133 internal links terminate on `noindex` pages | **3 directly, 5 stubs** | Crawled/Discovered | `src/components/product-carousel.jsx:11,12,23` hardcode `/sosburnclear`, `/sosburnsensitive`, `/slimcoffe`. Rendered on all 40 product pages. Inbound counts: `/sosburnsensitive` 46, `/sosburnclear` 40, `/slimcoffe` 40, `/primerose` 7. The canonical destinations `/slimcoffee/`, `/sosburn-clear/`, `/sosburn-sensitive/` get **1 inbound link each — from the stub itself** (anchor text: `Redirecting from /sosburnclear/ to /sosburn-clear`). `curl -sI /slimcoffe` → **HTTP/2 200**, not 301. | Trivial |
| 5 | **Thin corpus** — 54 of 70 indexable routes are under 500 body words | **~54** (overlaps 1 & 2) | Crawled–not indexed | Median body words 379.5. Under 200: `/contacto/` 16, `/catalogo/` 40. Under 300: 8 pages. **Under 500: 54 of 70 (77%).** Only 12 routes clear 700. The two longest non-homepage pages are `/politica-de-privacidad/` (1,265) and `/aviso-legal/` (1,067) — legal boilerplate. | Large |
| 6 | **YMYL E-E-A-T vacuum** — zero authors, zero dates, zero citations on all 19 health-content pages | **19** (quality multiplier on all 56) | Crawled–not indexed | `grep -ilE 'datePublished\|dateModified\|Actualizado\|Publicado' dist/recursos/*/*/index.html` → **0 of 16**. JSON-LD on every `/recursos/*` page returns exactly `['Organization']` — no Article, no author, no BreadcrumbList. Zero outbound citations across ~11,000 words, on pages that themselves grade "Nivel de Evidencia: MÁXIMO (Centenares de estudios)". Medical disclaimer reaches 18 of 75 built pages and **0 of 40 product pages** (`footer-02.jsx` lacks it). | Medium |
| 7 | **Disease-treatment claims contradicting the site's own legal page** | **14** (site-wide quality drag) | Crawled–not indexed | `src/components/legal-aviso.jsx:75`: *"NO son medicamentos. No están destinados a diagnosticar, tratar, curar o prevenir ninguna enfermedad."* Contradicted by `src/pages/sosburn-sensitive.astro:17` *"Indicado para diabéticos, hipertensos e hipotiroidismo"*, `floryva.astro:17` *"Elimina candidiasis y vaginosis de raíz"*, `serenity.astro:11` *"Alternativa natural a medicamentos ansiolíticos sin efectos secundarios ni adicción"*. 14 files match. | Medium |
| 8 | **`/articulo-de-blog/` — 1,123 words of Latin lorem ipsum, live, indexable, sitemapped** | **1 direct, site-wide contaminant** | Crawled–not indexed | HTTP 200, 62,894 bytes, in `sitemap-0.xml`, no noindex. 883 of 1,117 words (79.1%) are Latin filler under English Relume headings "Introduction"/"Conclusion" on a Spanish site. Body rendered **twice** (0.847 self-similarity). 32× `href="#"`. Six fabricated prices — `$30 $35 $38 $40 $45 $50` — the **only prices anywhere on the 70-page site**. Fabricated byline "Por Equipo MVV 15 ene 2024". | Trivial |
| 9 | **Four hard orphans in the sitemap** — zero inbound anchors anywhere | **4** | Discovered–not indexed | Full anchor extraction over 3,234 internal links: `/30fusion/`, `/hflex/`, `/applecidervingar/`, `/articulo-de-blog/` receive **zero**. All four are in `sitemap-0.xml` with no noindex. Verified independently in this session. | Small |
| 10 | **Sitemap sends zero recrawl signal** — all 70 URLs share one 9-month-stale `lastmod` | **all 70** (blocks recovery) | — | `sitemap-0.xml` lastmod distribution: `Counter({'2025-11-03T00:28:59.892Z': 70})`. One value, all 70 URLs, ~267 days stale. Meanwhile HTTP `last-modified` on the documents is current. Cause: `astro.config.mjs` `lastmod: new Date()`. 58 of 70 URLs also share `priority` 0.8. | Small |
| 11 | **100% of internal links use the non-canonical no-slash form; both serve 200** | **all 70** (2× crawl cost) | — | Every href is `href="/sosburn"`; every canonical is `https://www.mvvnaturales.com/sosburn/`. Both return **200 with an empty `redirect_url`**. Crawlable URL space is ~140, not 70. Zero internal links point at a canonical URL. | Medium |
| 12 | **`/slimcoffee/` is invisible through both discovery channels** | **1** | Discovered–not indexed | `astro.config.mjs` filter `!page.includes('/slimcoffe')` substring-matches `/slimcoffee/` and drops it from the sitemap (live sitemap 70 URLs, local dist 69, diff = exactly `/slimcoffee/`). Its only internal link is from the `/slimcoffe` noindex stub. **No path exists by which Google can enqueue this URL.** | Trivial |
| 13 | **Nine internal links point at hard 404s — every conversion CTA out of `/recursos`** | **6 source pages** | Crawled–not indexed | All confirmed `HTTP/2 404` + `x-vercel-error: NOT_FOUND`: `/body-shape` (4 links), `/sos-burn-clear` (3), `/prim-rose` (1), `/Catalogo-Mvvnatural.pdf` (1). Every one sits on a `/recursos/*` page. `/catalogo/`'s meta description promises "Descarga PDF" and the download CTA 404s. | Small |
| 14 | **`/preguntas-frecuentes/` is 93.5% verbatim homepage** | **1** | Crawled–not indexed | 555 of 595 8-grams appear on `/`. All 12 headings appear on `/`. H1 byte-identical. Root cause: both `src/pages/index.astro:65` and `src/pages/preguntas-frecuentes.astro` render the same `<Faq7 />` component whose H1 is hardcoded at `src/components/faq-07.jsx:26`. | Trivial |
| 15 | **`/applecidervingar/` vs `/applecyder/` — same product, two self-canonical URLs, both sitemapped** | **2** | Crawled–not indexed | Both HTTP 200 (62,930 and 61,566 bytes), each self-canonicalising, both in the sitemap. `/applecyder` has 42 inbound links; `/applecidervingar` has 0. 61.4% of `/applecyder`'s 5-grams also appear on `/applecidervingar`. | Small |

### The arithmetic that reconciles to GSC

The indexing stream classified all 75 built HTML files and the total closes exactly:

```
 13  Indexed        = 10 header/footer-linked hub pages + 3 product pages earning clicks
 40  Crawled – not indexed   = 33 product pages + /articulo-de-blog + 3 blog posts + 3 hubs
 16  Discovered – not indexed = 13 /recursos/guias + 3 orphan product pages
  3  Page with redirect      = the 3 stubs with 40+ inbound links (/slimcoffe, /sosburnclear,
                                /sosburnsensitive) — the other 2 stubs have 7 and 0 inbound
                                links, which is exactly why GSC reports 3 and not 5
  3  Invisible to Google     = /slimcoffee/ (filtered from sitemap AND only linked from a
                                noindex stub) + 2 zero-signal stubs
────
 75  built HTML files
```

The 13 indexed pages are precisely the 10 pages in the site-wide header/footer plus the 3 product pages GSC shows earning clicks. **Nothing gets indexed on this site unless it is linked from every page.** That is the whole diagnosis in one sentence.

### Sequencing implication

Causes 4, 8, 9, 12, 13, 14 are trivial-to-small and mechanical — they can all ship in week 1 and they unblock discovery for ~12 pages. Causes 1, 5 and 3 are large and strategic, and no amount of technical work substitutes for them. Cause 10 is the one that governs how fast Google notices anything you fix: **if `lastmod` is not repaired, remediation may take months to register.** Fix it in the first commit.

---

## 4. Dimension Reports

Severity legend: **C** critical · **H** high · **M** medium · **L** low. Effort: trivial (<30 min) · small (<half day) · medium (1–3 days) · large (>1 week).

### 4.1 Indexing & Crawl Diagnosis — **11 / 100**

Nothing is blocking Googlebot. robots.txt is `Allow: /`, every page has a self-referential canonical, zero pages carry `noindex`, and all 69 sitemap URLs return 200. Google is fetching these pages and rejecting them on quality and duplication grounds, or refusing to spend crawl budget on them at all. The single highest-leverage mechanical defect is that `src/components/product-carousel.jsx` points 122 site-wide links at three HTTP-200 `noindex` meta-refresh pages.

| Sev | Finding | Evidence | Fix | Effort |
|:--:|---|---|---|---|
| **C** | 40 product pages are one template with median 215 unique words; 48.1% byte-identical chrome | 16,008 words total, 4,711 chrome on all 40 + 2,996 identical carousel. 8,301 unique ÷ 40 = 208 mean. `/primrose/` 70 unique words. 41.0% of 5-grams on ≥90% of pages. Text-to-HTML `/sosburn-clear/` = 3.5%. 82 of 264 benefit bullets (31.1%) restate the page's own description verbatim — 100% on `meizitang-soft-gel.astro:10`, `colit6.astro`, `cmpushupmen.astro` | Tier the work. Cut the 34-item carousel to 4–6 related products (drops chrome 48.1%→~30%). Expand top-10 products to ≥600 unique words. Rewrite `benefits[]` so it stops echoing `description`. Consolidate the ~20 weakest SKUs into category pages | Large |
| **C** | 122 internal links point at 3 noindex meta-refresh stubs; the real pages get 1 inbound link each — from the stub | `product-carousel.jsx:11,12,23` = `/sosburnclear`, `/sosburnsensitive`, `/slimcoffe`. Inbound: 40 / 42 / 40. Canonicals get 1 each. `/sosburn-clear/`'s only anchor is `Redirecting from /sosburnclear/ to /sosburn-clear`. `curl -sI /slimcoffe` → **200**. No `vercel.json`/`_redirects` exists | Change 3 URLs in `product-carousel.jsx`, 3 in `product-04.jsx` (147,154,166), 3 more (174,181,193), 1 in `header-76.jsx:134`. Add real 308s in `vercel.json` | Trivial |
| **C** | All 13 `/recursos/guias/*` are Discovered–not indexed: 9 unlinked from the hub, click-depth 3, 1–3 inbound links | `dist/recursos/index.html` links only 7 children (3 comparativas + 4 guides). Inbound counts: alimentos-saciantes 1, ejercicios-metabolismo 2, hambre-emocional 3. vs 69 inbound for anything in the footer. **0 of 16 carry any date or author** | Link all 16 from `src/pages/recursos.astro`. Add a "Recursos" block to `footer-02.jsx` (gives 40+ inbound). Merge the 6 sub-400-word guides into thematic parents and 301 them | Medium |
| **C** | `/articulo-de-blog/` is 79.1% Latin lorem ipsum, rendered twice, indexable, sitemapped | 883 of 1,117 words are Latin. "Introduction" appears at char 311 and 3652 — body emitted twice, 0.847 self-similarity, 309-word LCS. 6 fabricated prices. 32× `href="#"`. Fabricated byline. 5-gram Jaccard vs the real metabolism post: 0.024 | **Delete** `src/pages/articulo-de-blog.astro`. Zero inbound links, zero clicks. 301 to `/blog/como-acelerar-metabolismo-naturalmente/`. Submit to GSC Removals | Trivial |
| **H** | 4 pages have zero inbound anchors site-wide yet sit in the sitemap | 3,234 anchors extracted; `/30fusion/`, `/hflex/`, `/applecidervingar/`, `/articulo-de-blog/` receive none. BFS from `/` never reaches them. `/30fusion/`'s own meta description says *"versión 30 cápsulas del Duo 60 Fusion. Misma fórmula potente."* | Add `/30fusion/` + `/hflex/` to `productos.astro` and the carousel array. Canonicalise `/applecidervingar/` → `/applecyder/` (40 inbound). Delete `/articulo-de-blog/` | Small |
| **H** | Sitemap filter drops `/slimcoffee/`; all 69 URLs share one build-time `lastmod` | `astro.config.mjs` `!page.includes('/slimcoffe')` matches `/slimcoffee/`. `grep -o '<lastmod>' \| sort -u` → **one value**, `2026-07-27T20:59:26.861Z` | Exact-match the filter (`!/\/slimcoffe\/?$/.test(page)`). Replace `lastmod: new Date()` with `git log -1 --format=%cI -- <file>`, or omit it — an absent lastmod beats a false one. Delete `changefreq` and `priority` | Small |
| **H** | The 3 most-linked pages render 76, 52 and 255 words; `/catalogo/` has a 1.4% text-to-HTML ratio and `/testimonios/` contains zero testimonials | `/catalogo/` 157 links from 69 pages, 631 text bytes in 44,494 HTML. `/testimonios/` 207 links from 69 pages, no testimonial text at all — only images — while asserting *"la mayoría bajó entre 15 y 25 kilos en 3-6 meses"*. `/contacto/`'s entire body: *"Haz tu pedido — Comprar por WhatsApp"* | Transcribe testimonials into HTML with per-testimonial product links (converts 207 wasted inbound links into 40 outbound). Render `/catalogo/` as an HTML product grid alongside the gallery. Add NAP + hours + shipping to `/contacto/` | Medium |
| **H** | Every internal link to a product uses the bare product name or "Ver Producto" — 35× on `/productos` alone; 8.6% of anchors are empty | `/meizitang-soft-gel/` has 42 inbound anchors, 3 distinct texts. `/duo-60-fusion/` has 100 anchors, 80 of them "Duo-60 Fusion", 6 empty. 277 of 3,234 anchors (8.6%) have no text — image-wrapping `<a>` in `product-carousel.jsx` and `product-04.jsx:147` | Add a `descriptor` field: `Chupa Panza — reduce grasa abdominal`. Replace the 42 "Ver Producto". Give the 277 image anchors `alt` + `aria-label`. Link guides→products with commercial phrasing | Small |
| **H** | Zero authorship, credentials or dates on 16 of 16 resource pages while the site makes disease and quantified-outcome claims | 0 of 16 match any date pattern. JSON-LD returns exactly `['Organization']` on every one. Only expertise claim is the unattributed *"15 años de experiencia"*. Disclaimer is in `Footer.astro` but **not** `footer-02.jsx` — which is used by all 40 product pages and all 3 blog posts | Create a real named author entity + `/sobre-nosotros`. Add visible `Escrito por` / `Actualizado` + Article JSON-LD. Cite sources. Move the disclaimer into the shared Layout so it reaches all 75 pages | Medium |
| **M** | `/blog` renders 6 fabricated headlines pointing at the same 3 real posts, and ships 3 h1 elements | Each real post is linked exactly 5× from this one page. Headlines: *"Cómo eliminar toxinas de tu cuerpo naturalmente"* → the **pastillas** post. Zero of 6 anchors describes its destination. `blog-32.jsx` + `blog-44.jsx` both render. h1s: *"Descubre salud natural"*, *"Explora tu camino hacia la salud"*, *"Todo Lo Que Necesitas Saber…"* | Delete one listing component from `src/pages/blog.astro:21-22`. Replace all 6 headlines with the real titles/excerpts/dates. Keep one h1. Link the 3 posts from `/recursos` and the product footer | Small |

### 4.2 Indexation & SERP Presence — **16 / 100**

The non-indexation crisis is not purely a content problem — it is a **duplicate-entity problem**. MVV Natural operates on at least five domains simultaneously, and mvvnaturales.com is the newest and weakest while carrying a near-identical catalog. *Note: Bing/Google `site:` queries were CAPTCHA-blocked; SERP data below comes from the DuckDuckGo HTML endpoint, which serves the Bing index — directional for Google, not identical.*

| Sev | Finding | Evidence | Fix | Effort |
|:--:|---|---|---|---|
| **C** | Site ranks **5th for its own brand name**, behind four results from two sibling MVV domains | DDG `mvv natural` top 10: 1–2 mvvnatural.mx, 3–4 mvvnatural.com, **5 www.mvvnaturales.com**, 6 mvvnatural.weebly.com, 7 mvvnaturalbykarlatorres.com, 8 facebook.com/profile.php?id=100067918490145 (1,336 likes), 9 shop365mx.com, 10 facebook.com/sbeltips (25,197 likes). Five domains carry the brand | Establish ownership first. **(A)** If the client owns them: 301 every mvvnatural.com/.mx URL to its mvvnaturales.com equivalent (slugs already align), verify both in GSC, submit Change of Address. **(B)** If distributor-run: mvvnaturales.com must be differentiated — it cannot win as a duplicate storefront. Either way, add the legacy domains to `Organization.sameAs` | Large |
| **C** | 13 of 19 products on legacy mvvnatural.com have a near-duplicate page here | Slug-matched against `sitemap-0.xml`: `/lidabooster/`, `/fatblazer/`, `/lipohd/`, `/15day-detox-tea/`, `/30daydetox/`, `/ashwagandha/`, `/hflex/`, `/floryva/`, `/alphaglow/`, `/lida-slimming-tea/`, `/edetox/`, `/slim24/`, Body Shape. Shared verbatim copy: *"15 años de experiencia"* on both. mvvnatural.com sells Body Shape; this site has 4 internal links to `/body-shape` which 404s — proof the catalog was ported and left unbuilt | Pick one canonical URL per SKU and 301 the legacy one to it, or add cross-domain `rel=canonical`. Build or remove the 6 missing SKUs so the catalog stops looking like a partial copy | Large |
| **C** | The one page earning non-brand clicks wins on **borrowed third-party demand**, and is outranked by the legacy domain on the identical slug | `/meizitang-soft-gel/` is 424 words vs `/duo-60-fusion/` 500 and `/productos/` 440, both of which earn no non-brand clicks. Both click-earning non-brand queries are exact substrings of its title, H1 and opening sentence. DDG `meizitang soft gel`: mercadolibre.com.mx #1/#2, **mvvnatural.com/meizitang-soft-gel/ #3**, meizitangmexico.com.mx #5, mvvnatural.mx #6 — mvvnaturales.com absent from the top 10 | Resolve the duplicate first. Then stop titling on SKU name alone: lead with the demand-carrying category term. `/sosburn-clear/`'s title *"SOS Burn Clean 30 Cápsulas - 24 HR PURIFIC SLIM"* contains nothing anyone searches. Target proven pools only: `pastillas para bajar de peso`, `quemador de grasa`, and the resold brands (Meizitang, Lida, Botanical Slimming) | Medium |
| **H** | `Organization.sameAs` points to a Facebook URL returning **HTTP 400**; the real high-engagement profiles are unreferenced; no GBP exists | `sameAs: [facebook.com/mvvnatural, instagram.com/mvvnatural]`. With a browser UA: Facebook → **400**, Instagram → 200. Real profiles: facebook.com/sbeltips (25,197 likes) and facebook.com/profile.php?id=100067918490145 (1,336) — neither in sameAs. **NAP conflict:** mvvnatural.com publishes 6621200412 / 6622264764 (Hermosillo, Sonora); this site's schema declares +52-631-298-2043 and +1-520-216-1443. PostalAddress objects contain only `addressCountry`. No GBP, no Maps listing, no knowledge panel | Replace the dead URL with the real profiles. Add the legacy domains to sameAs. Add a complete PostalAddress (Hermosillo, Sonora) — **get the real address from the client, do not invent one**. Reconcile the phone numbers to one primary. Create and verify a GBP | Small |
| **H** | 16 live product pages emit `https://www.mvvnaturales.comundefined` in `offers.url` and BreadcrumbList item 3 | Verified on **production**, not just dist: `/sosburn-clear/` contains exactly 2 occurrences. 32 broken URLs across 16 pages. `/sosburn-clear/` is a top-5 traffic page (4 clicks, +100%). Host is NXDOMAIN | Guard the URL construction in `src/components/product-seo.jsx` — derive from `Astro.url.pathname` when `productUrl` is absent. Verify `grep -rl 'comundefined' dist/` → 0 | Small |
| **H** | `/articulo-de-blog/` live, indexable, sitemapped, unmodified Relume boilerplate | HTTP 200, no robots meta, in sitemap. 32× `href="#"`, prices $30–$50 that appear nowhere else on a deliberately price-free site | Delete the page; 301 to the real post. Do not merely noindex — it has zero earned equity | Trivial |
| **M** | 60 of 76 built pages have titles longer than the ~60-char SERP limit | Worst 75 chars: `/cmpushupmen` *"CM Push Up MEN 90 Cápsulas - Aumento de Glúteos, Pectorales y Masa Muscular"*, `/recursos` *"Recursos Para Bajar de Peso Naturalmente \| Guías y Comparativas MVV Natural"*, `/recursos/guias/elegir-suplemento` 75. Click-earning pages also over: `/sosburn-clear` 69, `/duo-60-fusion` 68, `/meizitang-soft-gel` 66 | Trim to ≤60, front-loading the demand term and dropping the redundant `\| MVV Natural` on product pages (the brand is already in the displayed domain). Prioritise the 5 click-earning URLs | Medium |
| **M** | 16 meta descriptions exceed the ~155-char limit, truncating the shipping reassurance | Worst: controlar-apetito 176, `/alphaglow` 173, `/duo-60-fusion` 170. The clause dropped from `/duo-60-fusion` and `/` is *"Envío rápido México y USA"* — the reassurance most likely to convert against Mercado Libre listings that show prices inline. The 5 pages with no description are the redirect stubs, which is correct | Trim to ≤155, moving shipping/WhatsApp reassurance to the front. Remove unsubstantiated claims in the same pass (*"Adelgaza 8-15 kilos en 1 mes"*, *"#1 en México"*) | Small |
| **M** | The 5 "301 redirects" serve **HTTP 200** with meta-refresh **plus** `noindex` **and** `canonical` | `dist/slimcoffe/index.html`: `<meta http-equiv="refresh" content="0;url=/slimcoffee"><meta name="robots" content="noindex"><link rel="canonical" href=".../slimcoffee">`. `noindex` + canonical is a documented conflicting-signal anti-pattern — Google cannot honour both and consolidation is typically lost | Replace with real server-side 301/308s in `vercel.json`. Delete the stub pages from `src/pages`. A true 301 needs neither noindex nor canonical | Small |
| **M** | `/slimcoffee/` is a live 200 page excluded from the sitemap while 40 internal links point at its stub | `grep -c slimcoffee dist/sitemap-0.xml` = 0 — the only one of 70 built indexable pages absent. 40 pages use `href="/slimcoffe"`, only 6 reference `/slimcoffee` directly. Slim Coffee is also a SKU the legacy domain sells | Fix the 40 links at source in the shared product array; ensure it lands in the sitemap. Verify `grep -c slimcoffee dist/sitemap-0.xml` ≥ 1 | Trivial |
| **L** | Every page shares one OG image (the logo) and declares `og:type` `"website"`, including 40 product pages | All 5 live pages fetched return byte-identical `og:image` (padded logo) and `og:type: website`. `og:title` correctly mirrors `<title>` | Pass a per-page `image` prop (the Layout prop exists but is never supplied). Set `og:type` to `product` on product routes and `article` on the 3 blog posts | Medium |

### 4.3 E-E-A-T & YMYL Content Quality — **11 / 100**

Scored against the four pillars, 25 points each. This is an anonymous, uncited, unattributable weight-loss supplement catalog making disease-treatment and quantified-efficacy claims — the exact profile Google's quality raters are instructed to score Lowest. Weight-loss supplements are the canonical YMYL category and attract the strictest tier of scrutiny.

| Pillar | Score | Why |
|---|---:|---|
| Experience | 4 / 25 | Zero first-person narrative. All editorial imagery is Unsplash stock (20 stock URLs across 3 blog posts). The 13 "before/after" testimonials are unlabeled WhatsApp screenshots with no name, date, product or duration — while the page text on the same screen promises *"la historia completa: qué producto usaron, cuánto tiempo…"* |
| Expertise | 2 / 25 | 19 health-content pages: **0 author bylines, 0 bios, 0 credentials, 0 medical reviewer, 0 visible dates.** The only `Person` entity in the entire 75-page build is the fabricated reviewer *"Cliente MVV Natural"* injected into 40 product pages by the uncommitted diff |
| Authoritativeness | 2 / 25 | **0 outbound citations across ~11,000 words** — on pages that grade themselves *"Nivel de Evidencia: MÁXIMO (Centenares de estudios)"* and tell readers *"Si no hay estudios científicos sólidos, es marketing, no ciencia."* |
| Trustworthiness | 3 / 25 | `/contacto` renders 59 visible words: no address, phone, email or form. No physical address anywhere on the site. Safety disclaimer reaches **18 of 75 built pages and 0 of 40 product pages**. 14 pages make disease claims the site's own `/aviso-legal` explicitly disclaims |

| Sev | Finding | Evidence | Fix | Effort |
|:--:|---|---|---|---|
| **C** | 14 pages make disease treatment/prevention claims that the site's own legal page explicitly disclaims | `src/components/legal-aviso.jsx:75`: *"Los productos… NO son medicamentos. No están destinados a diagnosticar, tratar, curar o prevenir ninguna enfermedad."* Contradicted by `sosburn-sensitive.astro:17` *"Indicado para diabéticos, hipertensos e hipotiroidismo"* (also :11, :35); `floryva.astro:17` *"Elimina candidiasis y vaginosis de raíz"*, :36 *"Previene infecciones urinarias…"*; `applecidervingar.astro:14` *"Controla niveles de azúcar en sangre (ideal diabéticos)"*; `serenity.astro:11` *"Alternativa natural a medicamentos ansiolíticos sin efectos secundarios ni adicción"*; `alphaglow.astro:15` *"Especial para sobrepeso y obesidad mórbida"*; `sos-burn-vs-body-shape.astro:201` *"Especialmente útil para mujeres con PCOS"*; `acelerar-metabolismo.astro:190` hipotiroidismo subclínico. **Direct internal contradiction:** `meizitang-soft-gel.astro:34` *"No apto para hipertensos, diabéticos"* vs `sosburn-sensitive.astro:17` *"Indicado para diabéticos, hipertensos"* — same brand, opposite safety guidance. `grep -rliE` matches **14** files | Rewrite every claim to a structure/function statement with the required qualifier. E.g. `sosburn-sensitive.astro:17` → *"Fórmula suave, sin estimulantes fuertes. Si vives con diabetes, hipertensión o hipotiroidismo, consulta a tu médico antes de usarlo."* Delete the ansiolítico, candidiasis/vaginosis, PCOS, obesidad mórbida and hipotiroidismo lines. Reconcile the diabetics/hypertensives guidance to one consistent answer | Medium |
| **C** | Zero author attribution across 19 health-content pages; the only `Person` on the site is a fabricated reviewer | 0 of 16 `/recursos/*` pages carry `datePublished`, `dateModified`, `Actualizado` or `Publicado`. All 3 blog posts declare `"author":{"@type":"Organization","name":"MVV Natural"}`. No bio page exists — `/sobre-nosotros/` returns **404**. The only `Person` node in the build is *"Cliente MVV Natural"* from the uncommitted `product-seo.jsx` diff | Create one real, named author with a visible bio, stated role and years in the business at `/sobre-nosotros`. Add visible `Escrito por` / `Actualizado` bylines to all 19 pages, backed by `BlogPosting` JSON-LD with a `Person` author. **Never invent the person** — that repeats the fake-review mistake at higher stakes | Medium |
| **H** | Zero outbound citations across ~11,000 words of health content, on pages that demand citations of others | No external reference on any of the 13 guides, 3 comparativas or 3 blog posts. `/recursos/guias/*` self-grades *"Nivel de Evidencia: MÁXIMO (Centenares de estudios)"* without citing one | Cite the actual research for every physiological claim — link to PubMed/journal sources, not to product pages. Prioritise the pages making mechanism claims (metabolism, thermogenesis, appetite) | Medium |
| **H** | The medical/safety disclaimer reaches 18 of 75 built pages and **0 of 40 product pages** | `Footer.astro` carries it; `footer-02.jsx` does not. `footer-02.jsx` is used by all 40 product pages and all 3 blog posts — precisely the pages making product claims | Move the disclaimer out of `Footer.astro` into the shared `Layout` so it reaches all 75 pages. This is a one-file change with the widest YMYL coverage gain available | Trivial |
| **H** | `/testimonios/` promises full stories and delivers unlabeled screenshots, while asserting a quantified outcome | Page states *"Cada testimonio incluye la historia completa: qué producto usaron, cuánto tiempo…"* and *"la mayoría bajó entre 15 y 25 kilos en 3-6 meses"*. The page contains **no testimonial text whatsoever** — only images. 255 rendered words, 5.2% text-to-HTML, 207 inbound internal links | Transcribe every testimonial into HTML: name, product, duration, starting point, outcome, date. Target 1,200+ words. This is the strongest E-E-A-T asset a YMYL supplement site can own and the only content a competitor cannot copy. Remove or substantiate the *"15 y 25 kilos"* claim | Medium |
| **M** | `/contacto/` is a 59-word page with no NAP, no form, no h1 | Full body after chrome: *"Haz tu pedido — Comprar por WhatsApp 🇲🇽🇺🇸"*. 1.7% text-to-HTML. Zero `<h1>`. Inherits the site-wide default description. No street address exists anywhere on the site | Add real business information: both WhatsApp numbers as text, hours, service areas, shipping origin, response time, and a real address once the client provides one. Add an h1 | Small |

**Cross-cutting quantified claims to remove or substantiate site-wide:** *"10-15 kilos en 30 días"*, *"Eficacia 90%"*, *"pierden en promedio 15-25 kilos en 2-3 meses"*, *"Adelgaza 8-15 kilos en 1 mes"*, *"quemador de grasa #1 en México"*, *"sin efectos secundarios"*, *"100% naturales y seguros"*, *"sin rebote"*.

### 4.4 Duplicate, Near-Duplicate & Thin Content — **26 / 100**

**The duplicate-content hypothesis is largely disproven and this matters for sequencing.** Across 780 product-page pairs, whole-page difflib maxes at 0.745 and only 2 pairs clear 0.70; with template chrome stripped, **zero of 780 pairs reach even 0.50** (max 0.157). Guías max 0.373; comparativas max 0.188. All 70 titles and all 70 descriptions are distinct. These pages are not copies of each other — they are individually too small. Four genuine duplication defects do exist and are severe.

| Sev | Finding | Evidence | Fix | Effort |
|:--:|---|---|---|---|
| **C** | Product pages: 48.2% template chrome, mean 208 unique words | Fixed chrome per page: navbar 24w + footer 23w + carousel 71–75w + WhatsApp float 4w + 25 template strings inside the product section 65–68w = mean 192.7. Under 250 unique words: **35 of 40**. Under 300: **39 of 40**. The 25 chrome strings are literals in `src/components/product-simple.jsx`, incl. *"💼 Precios de Mayoreo / 🛒 1-9 piezas / Precio Menudeo / 📦 10+ piezas / Precio Mayoreo"* — 24 words of price scaffolding that displays no prices | Delete the "Precios de Mayoreo" block and collapse the duplicated WhatsApp CTA (~35 words of chrome off all 40 pages at once). Rewrite `benefits[]` to add new information. Target 500+ unique words — or consolidate instead | Large |
| **C** | `/preguntas-frecuentes/` is 93.5% verbatim homepage and shares a byte-identical H1 | 555 of 595 8-grams appear on `/`. All 12 headings appear on `/`. Root cause: `src/pages/index.astro:65` and `src/pages/preguntas-frecuentes.astro` both render `<Faq7 />`, whose h1 is hardcoded at `src/components/faq-07.jsx:26`. This is also why `/` has 2 h1s. The duplicated answers carry *"pierden en promedio 15-25 kilos en 2-3 meses"* on both URLs | Parameterise the heading level in `faq-07.jsx` (h2 on `/`, h1 on the FAQ page) — zero content loss. Then give `/preguntas-frecuentes/` genuinely distinct operational content (shipping, payment rails, ordering, originality) and retire the duplicated weight-loss Q&As from it. **Do not strip the FAQ from the homepage** — it is 24% of the content on the page earning 72% of clicks | Small |
| **C** | `/articulo-de-blog/` — 78.6% lorem ipsum, body rendered twice, 6 fabricated prices | 878 of 1,117 words Latin. Block 1 (477w) vs block 2 (592w) = difflib 0.847, 2,154-char LCS = 27.7% of the page duplicated against itself. Lorem ipsum exists on **exactly one page site-wide** (`grep -c tincidunt` = 9 here, 0 everywhere else) | Delete the file. Do not noindex — a noindexed page still consumes crawl budget and retains the liability | Trivial |
| **H** | `/applecidervingar/` and `/applecyder/` — same product, two self-canonical URLs, both sitemapped, cross-linked | difflib 0.536, 5-gram Jaccard 0.324, 61.4% directional coverage. `/applecyder/` is weaker: 282 total / 87 unique words, 4-item ingredient list; `/applecidervingar/` 423 / 229, 8 ingredients. `/applecyder/` is also the only product page built on `home-wrapper.jsx` so it ships no `<footer>` island | Keep the richer `/applecidervingar/`, 301 `/applecyder/` to it, update the carousel entry. Note `/applecidervingar/` currently has 0 inbound links and `/applecyder/` has 42, so the link fix must ship with the redirect | Trivial |
| **H** | `/catalogo/` (40 body words) and `/contacto/` (16) are submitted in the sitemap with essentially no crawlable text | The two thinnest indexable routes. `/catalogo/`'s catalog is a PDF/image gallery — **zero product names, ingredients or descriptions in the HTML.** Source files are 21 and 17 lines | Render the product list as HTML on `/catalogo/` — the data already exists as the `allProducts` array in `product-carousel.jsx`. Converts a 40-word page into a 400+ word hub with 40 internal links | Small |
| **H** | 40 product URLs carry 8,301 words total and compete for 64 site-wide queries | 208 words/URL. Redistributed into 12 pages = 692 words each; into 8 = 1,038. Only 3 of 40 earn clicks, all three on third-party brand names. The other 37 use MVV-invented names with no search demand: Alpha Glow, Chupa Panza, Higa2, Colit6, Encimax, Floryva, Hflex, Cmpushup, Bikini Strong, Magic Booty Up, Mens Exotic | **Tier 1 keep and enrich (~10):** the 3 with proven demand + `/sosburn`, `/lipohd`, `/lidabooster`, `/chupapanza`, `/30fusion`, `/alphaglow`, `/applecidervingar` → 600+ unique words each. **Tier 2 consolidate (~27 into ~5 category pages):** quemadores termogénicos, detox y digestión, colágeno y belleza, proteínas y batidos, bienestar y energía — 800–1,000 words each at URLs targeting real category queries. Net ~70 routes → ~35, median body words 380 → ~700 | Large |
| **H** | `/blog` lists 3 real posts twice under 6 fabricated headlines and ships 3 h1 elements in 327 body words | Each post URL appears exactly 5× on the page. Six invented headlines with invented read-times ("5 min de lectura", "7 min"). `src/pages/blog.astro` renders both `blog-32.jsx` and `blog-44.jsx`. 2× `href="#"` | Remove one listing component, replace the 6 headlines with real titles/excerpts, demote 2 h1s, remove the dead links | Small |
| **H** | 54 of 70 indexable routes are under 500 body words; median 379.5 | Under 200: 2. Under 300: 8. **Under 500: 54 (77%).** Under 700: 58 (83%). Only 12 clear 700. Thin guides: hambre-emocional 304, ansiedad-por-comer 348, rutina-ejercicios-abdomen 393, dieta-grasa-abdominal 433, grasa-visceral-vs-subcutanea 440, alimentos-saciantes 453 | Set a 600-body-word floor for sitemap inclusion. Raise the 6 thin guides to 900+ — these target real informational queries and are the cheapest indexing wins available | Medium |
| **M** | Guías and comparativas are **not** near-duplicates — ruled out | 78 guía pairs: mean difflib 0.208, max 0.373. 3 comparativa pairs: max 0.188. Zero pairs ≥0.70. One real topic collision: `/recursos/guias/acelerar-metabolismo/` (1,205w) vs `/blog/como-acelerar-metabolismo-naturalmente/` (744w), title similarity 0.703 | **Do not spend rewrite budget de-duplicating the guías.** Consolidate the one real collision into the richer guide and 301. Retitle `/recursos/guias/alimentos-saciantes/` away from the shared "15 Alimentos… \| Guía 2025" pattern. Put remaining effort into word count and internal linking | Small |
| **M** | The "Más Productos" carousel injects an identical 71–75-word product-name list into all 40 pages | ~2,940 words of repeated name list site-wide, 18% of a typical page's total text. "Duo-60 Fusion" is emitted twice. 4 of its URLs point at redirect sources and one at the duplicate `/applecyder` | Limit to 4–6 genuinely related products chosen by category. Cuts ~2,400 words site-wide and creates a relevance gradient in the link graph. Fix the 4 bad URLs while editing | Small |
| **M** | 31.1% of benefit bullets are verbatim substrings of the same page's own description | 82 of 264 bullets. Total overlap on 7 pages: `/meizitang-soft-gel` 9/9 (difflib 0.556), `/colit6` 8/8, `/cmpushupmen` 6/6, `/slim24` 8/12, `/lida-slimming-tea` 6/10, `/protein-body` 6/9, `/maxi-fibra` 5/7. On `/meizitang-soft-gel` this means the page's effective unique content is ~175 words, not the measured 222 | Rewrite `benefits[]` to carry what the description does not: who it is for and not for, timeline to results, how it differs from the adjacent product, what the ingredient dosages deliver. Start with the 7 total-overlap pages | Medium |
| **L** | `/slimcoffee/` is built and indexable but absent from `sitemap-0.xml`, and is the 2nd-thinnest product page | 227 body words, 79 unique. Only the redirect stub `/slimcoffe` is correctly excluded; the real page is caught by the same substring | Fold into the consolidation plan, or fix the carousel link and confirm it enters the sitemap | Trivial |

### 4.5 Internal Linking & Crawl Equity — **17 / 100**

The one thing that works: every React island uses `client:load` / `client:visible` / `client:idle`, never `client:only`, so all product-grid and nav hrefs **are** server-rendered into `dist/` and are fully crawlable. Everything else is broken. The site is small (max depth 3) and every defect is a config or data-file edit — this is the highest-yield-per-hour dimension in the audit.

| Sev | Finding | Evidence | Fix | Effort |
|:--:|---|---|---|---|
| **C** | All 16 `/recursos/*` pages have zero inbound links from outside the folder — this **is** the 16 "Discovered – not indexed" | `grep -rl 'href="/recursos/' --include=index.html dist/` → 13 files, every one inside `/recursos`. Per-page unique inbound sources: duo-60-vs-lida 1, mejor-quemador-grasa 1, sos-burn-vs-body-shape 1, elegir-suplemento 1, alimentos-saciantes 1. `src/pages/recursos.astro` lines 10,17,24,34,41,48,55 define exactly 7 child cards; 9 of 13 guías are absent | Extend the card array to all 16 children (depth 3 → 2). Add a "Guía relacionada" block to `src/components/product-page-wrapper.jsx` so each product links 2–3 topically matched guías (`/sosburn-clear` → quemar-grasa-abdominal + mejor-quemador-grasa; `/chupapanza` → dieta-grasa-abdominal; `/serenity` → hambre-emocional). Takes 16 pages from 1 inbound to 4–6 | Medium |
| **C** | 3 canonical product pages have exactly ONE inbound link each — from their own redirect stub | `grep -rl 'href="/sosburn-clear"' --include=index.html dist/` → 1 file: `dist/sosburnclear/index.html`, which is `<meta http-equiv="refresh"><meta name="robots" content="noindex">`. Same for `/slimcoffee` and `/sosburn-sensitive`. Meanwhile the carousel sends 120 links to the stubs. `/sosburn-clear` is the #3 traffic page (4 clicks, +100%) | `product-carousel.jsx:11` → `/sosburn-clear`, `:12` → `/sosburn-sensitive`, `:23` → `/slimcoffee`. Moves all three from 1 inbound link to 40, in one commit | Trivial |
| **C** | Sitemap filter substring-matches and silently drops the canonical `/slimcoffee/` | `astro.config.mjs:40` `!page.includes('/slimcoffe')` — `'/slimcoffe' in '.../slimcoffee/'` → True. 69 URLs in the sitemap; the missing set is the 5 intended stubs **plus** `/slimcoffee/` | Replace substring tests with an exact-path Set check | Trivial |
| **H** | 4 pages have zero inbound internal links yet are indexable and in the sitemap | `/30fusion/`, `/applecidervingar/`, `/hflex/`, `/articulo-de-blog/`. Each of the first three emits 58 outbound internal links while receiving none | Add `/30fusion` and `/hflex` to the carousel array and `/productos` grid. Redirect `/applecidervingar` ↔ `/applecyder`. Delete `/articulo-de-blog` | Small |
| **H** | 133 internal links across 45 pages point at meta-refresh stubs | `/sosburnsensitive/` 46 links from 42 pages; `/sosburnclear/` 40 from 40; `/slimcoffe/` 40 from 40; `/primerose/` 7 from 2. Sources: `product-carousel.jsx:11,12,23`, `product-04.jsx:147,154,166` and `:174,181,193`, `header-76.jsx:134`. **No `vercel.json`, `netlify.toml`, `_redirects` or `_headers` exists in the repo** — so no real HTTP 301 exists anywhere | Rewrite the four source references to canonical paths, then add real 308s at the host layer for external backlinks | Small |
| **H** | `/catalogo/` receives 157 internal links (3rd most-linked page) and emits **zero** links to any of the 40 product pages | 70 files link to it, 157 anchor instances, anchor text "Catálogo" ×156. Its full href inventory is nav + footer + 4 `wa.me` links + `href="#"`. `src/components/catalog-image-gallery.jsx` is a flat array of 39 Cloudinary `.webp` URLs with **no `<a>` wrappers** | Wrap each catalog image in an `<a>` to its product route and add real alt text. Minimum viable: append a text grid of all 40 products as descriptive anchors. Converts the site's 3rd-most-linked page from a terminal node into its strongest product hub | Medium |
| **H** | 8 internal links across 5 pages point at routes that do not exist — **every conversion CTA out of `/recursos`** | `/body-shape` ×4 (`controlar-apetito.astro:223,428`, `mejor-quemador-grasa.astro:207`, `sos-burn-vs-body-shape.astro:215`), `/sos-burn-clear` ×3 (`quemar-grasa-abdominal.astro:229`, `mejor-quemador-grasa.astro:161`, `sos-burn-vs-body-shape.astro:142`), `/prim-rose` ×1 (`controlar-apetito.astro:252`). No such directories exist in `dist/` | `/body-shape` → `/cmpushup` (the homepage already anchors "Ver Body Shape →" there); `/sos-burn-clear` → `/sosburn-clear`; `/prim-rose` → `/primrose`. Add a CI check diffing extracted hrefs against the route list | Trivial |
| **H** | The homepage — which absorbs 38 of 53 clicks — links to only 9 canonical products of 40, and to **zero** content pages | 63 internal hrefs resolving to 21 unique targets. 11 product routes, 2 of which are redirect stubs. **Zero** links to any `/blog/<post>` or `/recursos/<child>`. Concentration: `/duo-60-fusion` ×8, `/productos` ×5, `/` ×5. By contrast `/productos` emits 124 links across 32 targets | Add a "Guías" block linking the 4–6 strongest guides and an "Últimos artículos" block linking all 3 real posts, with descriptive anchors. Fix the 2 stub links | Small |
| **M** | No siloing: 40 product pages each link the same 33 siblings; 7 real products are in neither the carousel nor `/productos` | `product-carousel.jsx` has 33 `url:` entries rendered on every product page — ~57 outbound links of which 33 are undifferentiated siblings. In neither surface: `/30fusion`, `/applecidervingar`, `/cmpushup`, `/hflex`, `/slimcoffee`, `/sosburn-clear`, `/sosburn-sensitive`. **No category routes exist at all** | Introduce 4–5 category hubs under `/productos` and route the carousel through them. Each product links its category + 4 in-category siblings instead of 33 random ones. Add the 7 unmeshed products | Large |
| **M** | 1,461 internal anchors point at product pages and **not one** contains a commercial keyword | 3,234 anchors total: 1,423 (44%) nav boilerplate, 277 (8%) empty image-only, 60 (1%) generic ("Ver Producto" ×42), 1,474 (45%) bare brand names. Keyword-regex matches on product-page anchors: **0** (5 false positives from brand names containing "detox"/"colágeno") | Add a `descriptor` field rendered inside each anchor. Replace the 42 "Ver Producto". Add `alt`/`aria-label` to the 277 empty anchors — Google uses image alt as anchor text when an `<a>` wraps only an `<img>`. Add contextual guide→product links with natural commercial phrasing | Medium |
| **M** | `/blog` and `/recursos` share zero contextual links | All 16 `/recursos/*` pages contain **0** `href="/blog/…"`. The 3 posts have 5 inbound links each, all from `/blog` itself. `/blog/como-acelerar-metabolismo-naturalmente` does not link any of the 4 metabolism guides. The 3 comparativas link zero sibling guías | Add a "Sigue leyendo" block cross-linking the clusters both ways | Small |
| **L** | **VERIFIED NEGATIVE:** no `client:only` anywhere — JS hydration is NOT the cause | `grep -rn "client:only" src/` → zero matches. `dist/productos/index.html` contains 32 distinct product routes in raw HTML; `dist/index.html` contains 11. 9 `<astro-island>` elements, all with SSR'd children | No change required. Add a CI guard rejecting `client:only` on any component rendering navigational `<a>` elements | Trivial |
| **L** | Zero breadcrumb navigation on the 16 `/recursos/*` and 3 `/blog/*` pages | `dist/recursos/guias/hambre-emocional/index.html` contains `href="/recursos"` ×2 — both from nav/footer boilerplate. No `<nav>` or BreadcrumbList markup. Depth distribution: depth 0 = 1, depth 1 = 22, depth 2 = 38, depth 3 = 9, unreachable = 5 | Add a shared breadcrumb component + BreadcrumbList JSON-LD. Breadcrumbs are one of the few rich results actually available to a commercial supplement retailer | Small |

### 4.6 Live-Site Technical Recon — **41 / 100**

Transport and delivery are genuinely good and are **not** the reason 56 pages are unindexed. The score is dragged down by crawl-signal and link-graph defects. Findings already covered above (fake 301s, undefined schema URLs, lorem page, price zero, sitemap filter, orphans, apple-cider duplicate, 404 links, hreflang, og tags, h1 defects, stale titles, no WebSite node) are not repeated here.

| Sev | Finding | Evidence | Fix | Effort |
|:--:|---|---|---|---|
| **C** | 100% of internal links use the non-canonical no-slash form; **both forms serve 200 with no redirect** | Every homepage href is slash-less (`href="/sosburn"`); every canonical is slash-terminated. `curl -o /dev/null -w "%{http_code} redirect=%{redirect_url}"` gives `200 redirect=` for **both** `/productos` and `/productos/`. Aggregate inbound over 70 live pages: `/productos` 217, `/blog` 214, `/testimonios` 210, `/catalogo` 159, `/recursos` 140 — **every one slash-less. Zero pages carry a trailing-slash internal href** | Add `trailingSlash: 'always'` to `astro.config.mjs` and `{"trailingSlash": true}` to `vercel.json` so Vercel 308s. Rewrite every internal href. Verify `curl -o /dev/null -w "%{http_code}" /productos` → 308 | Medium |
| **C** | All 70 sitemap URLs declare the identical `lastmod` `2025-11-03T00:28:59.892Z`, ~267 days stale | `Counter({'2025-11-03T00:28:59.892Z': 70})`. Meanwhile the documents' HTTP `last-modified` is current (`/articulo-de-blog`: Mon, 27 Jul 2026). Cause: `astro.config.mjs:56` `lastmod: new Date()`. 58 of 70 also share `priority` 0.8 | Delete `lastmod: new Date()`; emit a real per-URL date from frontmatter or `git log -1 --format=%cI`. Drop the `priority` block — Google ignores `<priority>` entirely and the 58-way tie is noise | Small |
| **M** | Apex → www is a **307 temporary** redirect, not a 308 permanent | `curl -sI https://mvvnaturales.com/` → `HTTP/2 307`. The http→https legs are correct 308s, but the full chain from `http://mvvnaturales.com` takes 2 hops (http apex → https apex 308 → https www 307) | Set the apex redirect to Permanent (308) in Vercel Domains settings. Consider collapsing the chain to one hop | Trivial |
| **M** | `og:type` is `"website"` and `og:image` is the same logo on all 70 pages; **zero** `twitter:` tags | 70/70 identical `og:image` (the padded logo). Product pages already have real Cloudinary photography in their `Product.image` array (`/sosburn/` ships `catalogo-mvv-natural-10_vs3aqv.webp`) that is never surfaced. **WhatsApp is the site's only conversion channel and every shared link renders the same grey logo card** | Use the existing unused `image` prop; pass each product's Cloudinary image and each post's hero. Set `og:type` per route. Add `twitter:card=summary_large_image` + title/description/image | Small |
| **M** | hreflang `es-MX`, `en-US` and `x-default` all point at the identical Spanish URL on all 70 pages | Three alternates, one target, on every page, while the document declares `<html lang="es-MX">`. No English version exists | Delete the `en-US` alternate. Keep self-referencing `es-MX` + `x-default` — valid for a single-language site. Reintroduce `en-US` only when real English pages exist at distinct URLs | Trivial |
| **M** | 15 live titles say 2025; zero say 2026 | *"Top 5 Mejores Quemadores de Grasa Naturales 2025"*, *"Catálogo Digital 2025"*, *"Hambre Emocional… \| Guía 2025"*, *"Duo 60 Fusion vs Lida Booster: Comparativa Honesta 2025"*. Today is 2026-07-27. Every one of these 15 pages earns 0 clicks | Bump to 2026 **and** genuinely refresh, or remove the year from the template so titles stop decaying. The latter is safer given these pages are not on a maintenance schedule | Small |
| **M** | Homepage has Organization + BreadcrumbList but **no `WebSite` node**, on a site where brand queries are 42% of clicks | 0 of 70 pages contain a `WebSite` node. `Organization.alternateName` is a single string *"MVV Natural México"* and omits `mv natural`, which alone draws 86 impressions. Both `sameAs` targets were checked: Instagram 200, **Facebook 400** | Add a `WebSite` node to the homepage only (Google's guidance is homepage-scoped) with `name`, `url`, `inLanguage`. Give Organization an `@id` so the two link. Do **not** add `potentialAction`/`SearchAction` — the sitelinks searchbox rich result was retired in Nov 2024 and the site has no on-site search | Trivial |
| **M** | Four live pages have broken h1 structure | `/` has 2 (the second is the duplicated FAQ h1), `/blog` has 3, `/articulo-de-blog` has 2, `/contacto` has **0**. Note: `/productos` and `/testimonios` each have exactly 1 h1 in production, contrary to the pre-audit defect list | Parameterise `faq-07.jsx`'s heading level. Fix `/blog` by deleting a listing component. Add an h1 to `/contacto`. `/articulo-de-blog` resolves by deletion | Trivial |
| **L** | robots.txt "block bot crawlers" section has three `User-agent` lines and **no `Disallow`**, so it blocks nothing | Verbatim tail: `User-agent: AhrefsBot` / `User-agent: SemrushBot` / `User-agent: DotBot` / `Crawl-delay: 10`. No impact on Google (Googlebot ignores `Crawl-delay` and is governed by the correct `User-agent: *` group) | Add `Disallow: /` under the grouped agents if blocking is wanted, or delete the section. **Do not add any Disallow to the `User-agent: *` group** | Trivial |
| **L** | 404s return Vercel's plain-text default: no navigation, branding or HTML | `content-type: text/plain`, 79 bytes, body `The page could not be found / NOT_FOUND`. The status code is correct (a real 404, not a soft-404), so there is no indexing harm — the cost is that anyone hitting one of the 9 broken internal links lands on a dead end with no WhatsApp CTA | Create `src/pages/404.astro` with the standard Layout, an h1, a link to `/productos/` and both WhatsApp CTAs. Astro emits `dist/404.html` and Vercel serves it with a 404 status | Trivial |
| **L** | 59 of 70 titles exceed 60 chars; HSTS lacks `includeSubDomains`/`preload`; 4 standard security headers absent | 12 descriptions exceed 160. `strict-transport-security: max-age=63072000` with neither directive. Zero for `x-frame-options`, `content-security-policy`, `x-content-type-options`, `referrer-policy`. **The absence of `x-robots-tag` is neutral-to-good** — it confirms the indexing problem is not header-driven. Cert: Google Trust Services, valid Jul 2 – Sep 30 2026, auto-renewed | Trim titles/descriptions. Optionally add `x-content-type-options: nosniff`, `referrer-policy: strict-origin-when-cross-origin`, `x-frame-options: SAMEORIGIN`, and extend HSTS. **Do NOT add an `x-robots-tag` header** | Medium |

### 4.7 On-Page & SERP Appearance — **34 / 100**

Mechanical hygiene is real and is the only thing holding this score above 25: all 70 pages carry a unique title, a unique description and a correct self-referencing canonical. Everything above hygiene fails. Two findings in this stream were **refuted** under verification and removed (see §4.10).

| Sev | Finding | Evidence | Fix | Effort |
|:--:|---|---|---|---|
| **M** | `/preguntas-frecuentes/` carries no unique content — 93.5% of its 8-grams and all 12 headings are on `/` | Both pages render the same `Faq7` component; its h1 is hardcoded at `src/components/faq-07.jsx:26`. Confirmed live: `/` returns h1 count 2 | Parameterise the heading level; give the FAQ page distinct operational content. **Do not remove the FAQ from the homepage** | Small |
| **M** | Homepage, `/productos/` and `/catalogo/` overlap, and `/` republishes the FAQ page and 8 product cards | Title+H1 Jaccard: `/` ↔ `/preguntas-frecuentes/` 62%, `/` ↔ `/productos/` 44%. `/catalogo/` has 82 body words (~20 unique) and 21.4% 8-gram overlap with `/`. Note `/productos` at 14.1% overlap is **not** duplicative — 8 shared product-card H3s is normal merchandising | Split intents: `/` owns brand + navigation; `/productos` owns the commercial head term; `/catalogo` owns pricing intent. Homepage description rewrite drops *"Pierde 15-25 kilos"* and surfaces Meizitang/Lida. **Keep the homepage product grid** — it supplies 8 of the homepage's 11 product links | Medium |
| **M** | `/contacto/` ships an 8-char title, zero h1, an inherited site-default description and 58 body words | `src/pages/contacto.astro:11` is `<Layout title="Contacto">` — the **only** one of 70 pages omitting `description=`, so it falls through to the `Layout.astro:14` default, which is byte-identical to the Organization schema description. ~48 of the 58 words are nav/footer chrome | Set a real title and description, add an h1, add real ordering content. The title is a symptom; the absent body is the binding constraint | Trivial |
| **M** | `/blog/` links all 3 posts under 6 fabricated Relume headlines, none of which describes its destination | Verified anchor→destination: *"Cómo eliminar toxinas de tu cuerpo naturalmente"* → the **pastillas** post; *"Mindfulness y suplementación para reducir el estrés"* → also the pastillas post. Zero of 6 anchors match. Source: `blog.astro:21-22`; placeholders at `blog-32.jsx:334,386,418,451` and `blog-44.jsx:14,46,76,106` | Replace all 6 with real titles, drop the duplicate listing, and pair with genuine hub prose — de-duplicating alone would shrink a 371-word page further | Small |
| **M** | All 70 pages share one `og:image` and `og:type="website"` | 1 distinct `og:image` value across 70 pages. `Layout.astro:15` sets the default; `grep -rn 'image=' src/pages/` returns 10 hits, all props on inner content components, **none on the `<Layout>` element**. `twitter:card` is `summary_large_image`, so every WhatsApp share renders a 1200×630 logo on beige | Add an `ogType` prop; pass each product's own Cloudinary image (already in frontmatter for the Product schema) as the Layout `image` prop | Small |
| **M** | 15 titles and 2 descriptions hardcode "2025" | 15 of 70 titles contain "2025", zero contain "2026". Descriptions on `/blog/` and `/blog/mejores-suplementos…` say *"Blog actualizado 2025"*. The `/catalogo/` h1 is *"Catálogo MVV Natural 2025"* | Replace the literal with a build-time expression, or drop the year. Because output is static the year refreshes only on rebuild — pair with a scheduled rebuild or a manual January bump | Small |
| **M** | Only 2 of 70 titles contain "México" while 83% of clicks come from Mexico | 2 titles match `/M[eé]xico/i`; only 1 mentions USA. Descriptions: 8 México, 9 USA. **62 of 70 pages carry no geographic token in either field** — including all 40 product pages | Add "México y USA" to the highest-value commercial titles where it fits in 60 chars. At minimum end every product description with *"Envío 1-3 días a México y USA."* | Medium |
| **M** | Third-party brand names are misspelled or inconsistent on the exact pages earning the site's only non-brand clicks | **Daidaihua:** the site spells it *"Daidahua"* 15× and *"Daidaihua"* **zero** times. **SOS Burn Clear/Clean:** `/sosburn-clear/` calls the product *"SOS Burn Clean"* 9× (title, h1, description) while the URL says `clear` and the rest of the site says *"Clear"* 81× — on a page earning 4 clicks (+100%). **Duo-60:** GSC records *"duo-60 fusion xtreme"* hyphenated; the page title and h1 read *"Duo 60 Fusion Xtreme"* unhyphenated while `/productos` renders *"Duo-60 Fusion"* | Change every *"Daidahua"* → *"Daidaihua"*. Standardise on *"SOS Burn Clear"* to match the URL and the other 81 references. Use the hyphenated *"Duo-60 Fusion Xtreme"* to match the GSC query | Trivial |
| **M** | 30 titles exceed 60 chars and 15 descriptions exceed 155 | Worst titles 75 chars: `/cmpushupmen`, `/recursos/guias/elegir-suplemento`, `/recursos`. Worst descriptions: controlar-apetito 176, `/alphaglow` 173, `/duo-60-fusion` 170. **No description is under 70. Zero missing titles, zero exact duplicates — that part is clean** | Drop packaging descriptors from titles ("30 Cápsulas", "24 HR PURIFIC SLIM", "90 Cápsulas") and move them into the description, freeing 10–15 chars for "Original" and "México y USA" | Medium |
| **M** | `botanical slimming soft gel precio` ranks with 13 impressions against pages that show the word "precio" 44 times but never a number | 44 pages match "precio"; every occurrence is a placeholder. `/meizitang-soft-gel/`'s description carries no price signal and **terminates on a disqualifier**: *"36 cápsulas. No apto hipertensos/diabéticos."* — the last words the searcher reads before deciding | Rewrite to *"Meizitang Soft Gel original (Botanical Slimming), 36 cápsulas. Cotiza precio de menudeo o mayoreo por WhatsApp. Envío 1-3 días a México y USA."* (142 chars). Surfaces `precio`, `menudeo`, `mayoreo`, `original`. Move the contraindication into on-page body copy where it belongs for safety | Trivial |
| **M** | The headline 10.4% CTR is a brand artefact — the constraint is **impressions, not CTR** | Brand queries: 59 clicks from 242 impressions = **24.4% CTR**. Residual: 82 from 1,118 = 7.3%. But 7.3% at position 11.3 is not achievable for genuinely generic queries (page-2 CTR is 1–2%), so the 54 undisclosed queries must themselves be predominantly further brand variants. Confirmed generic non-brand impressions total **65** (Meizitang 37 + Botanical Slimming 15 + 13). Total corpus: 1,360 impressions ÷ 90 days = **~15 impressions/day across 70 pages** | Sequence metadata work **behind** indexing and behind claiming the four third-party brand terms. Re-baseline against GSC **impressions** — not clicks or CTR — as the primary success metric for the first 90 days | Large |
| **L** | `/contacto/` is the natural landing page for `donde lo compro` (1 click / 1 impr) and `donde las puedo comprar` (1/2) but never uses the phrase | `grep -rlio "d[oó]nde ?(lo\|la\|las\|los)? ?(puedo)? ?compr" dist` → **0 files**. Only 1 page has "Comprar" in its title. **Note:** the 50% and 100% CTRs on these queries are only consistent with a top-3 placement, so the site is probably already winning them — this is a thin-content fix, not a ranking opportunity | Rebuild `/contacto/` with real ordering content. **Do not retarget `/productos/`'s title** to chase a 3-impression query — it is an indexed page earning clicks and the proposed narrowing to "en México" would hurt the 13% US audience | Small |
| **L** | `/productos/` and `/testimonios/` place their only h1 after every content h2 and after the conversion CTA | Heading order on `/productos`: H2 *"Productos Destacados"* → 34× H3 → H2 *"Haz tu pedido"* → **H1** → footer H2s. Cause is explicit in source: `productos.astro:57` `{/* Texto SEO al final (sigue indexándose) */}`. **Note:** multiple h1s and heading-order are not Google ranking factors — this is polish, and the low-risk fix is to promote the existing top h2 rather than move a 350-word text block above 35 products on a mobile-dominant site | Promote *"Productos Destacados"* / *"Historias de éxito"* to h1 and demote the bottom h1 to h2. Zero layout change | Trivial |

### 4.8 Structured Data / Schema.org — **27 / 100**

Coverage looks healthy on paper — 156 JSON-LD blocks across 75 files, **zero JSON parse errors**, Organization on 70/75, BreadcrumbList on 42 — but essentially none of it is eligible for a rich result and much of it is factually false. The highest-value action here is to **delete** most of it before adding anything. Several findings were downgraded under adversarial verification; the adjusted severities are shown.

| Sev | Finding | Evidence | Fix | Effort |
|:--:|---|---|---|---|
| **H** | **DO NOT SHIP:** fabricated `aggregateRating` + invented review staged on all 40 product pages | `src/components/product-seo.jsx:29-50` (uncommitted; the diff **deletes** the comment `// Note: aggregateRating removed - add back when you have 5+ verified reviews`). Emits `ratingValue "4.5"`, `reviewCount "1"`, and a review by `"Cliente MVV Natural"`. `grep -rl aggregateRating dist --include="*.html" \| wc -l` → **40**. Live production is currently **clean** (0 occurrences). Internal contradiction proving fabrication: reviewCount 1, that one review rated 5, aggregate 4.5. Verified invisible in the rendered page: "Cliente MVV Natural" False, "4.5" False | `git checkout -- src/components/product-seo.jsx` then `npm run build`. Violations: reviews marked up but not available to users; ratings not sourced from users; spammy structured markup under Search Essentials — aggravated by identical boilerplate across 40 URLs on a YMYL site | Trivial |
| **M** | Product schema declares `price "0"` USD + `InStock` on a catalog that shows no prices | Live on all 40 pages from **committed** code. `"price":"0"` ×80, `"priceCurrency":"USD"` ×80, `"availability":"InStock"` ×40. Source comment admits it: `// Pricing kept in schema for internal use but not displayed to users (price: "0")`. Visible-text scan of the live page returns zero prices; the page says *"Cotiza precio de menudeo o mayoreo por WhatsApp"* | **Remove the entire `offers` object.** A Product node with name, image, description and brand is valid without it. Do NOT substitute a placeholder price, and do NOT emit `offers` with the price omitted — Google reports `Missing field "price"` and you gain nothing. Keep the existing inline `brand` object; do not introduce `@id` references to nodes that do not exist | Trivial |
| **M** | 32 URL values interpolate `undefined` into the host across 16 pages | `product-seo.jsx:56` and `:140` use unguarded template literals. 2 occurrences per page. Confirmed on **live production**, not just dist. Host is NXDOMAIN. **Note:** `offers.url` is recommended, not required, and the RRT does not fetch it — so this is a correctness/hygiene defect, not a demonstrated rich-result loss. All affected routes are one level deep, so the breadcrumb markup only adds the middle "Productos" crumb | Pass `Astro.url.pathname` from each page and normalise the trailing slash to match the canonical. Add a build-time guard failing the build if any emitted JSON-LD contains `undefined`. **Do not** use the `typeof window === 'undefined'` fallback — the island is server-rendered, so it would strip JSON-LD entirely | Small |
| **M** | The same uncommitted diff invents a free-shipping rate and a 30-day free-return policy | `product-seo.jsx:70-115` adds `shippingRate {value:"0"}` and `merchantReturnDays:30` + `FreeReturn`. These **directly contradict** live published terms at `/aviso-legal/`: `legal-aviso.jsx:143` *"NO aceptamos devoluciones ni reembolsos"* and `:103` *"Costos de envío según su ubicación"*. `transitTime` 1-3 days also contradicts the site's own FAQ *"USA: 3-5 días hábiles con USPS"*. The one accurate field is `cutoffTime "14:00"` | Revert with the fabricated reviews. Both sub-nodes disappear when `offers` is dropped | Trivial |
| **M** | `Article.dateModified` is computed at build time, so every rebuild falsely claims all 3 posts were updated today | All 3 blog `.astro` files line 29: `"dateModified": new Date().toISOString().split('T')[0]` while `datePublished` is hardcoded `"2025-01-13"` and identical on all three. dist shows `dateModified: "2026-07-27"` | Replace with a literal a human edits when content actually changes; drive both from frontmatter | Trivial |
| **M** | FAQPage is inert for rich results **and** its machine answers delete the safety caveat visible on the page | The visible answer to *"¿Son seguros los quemadores de grasa naturales?"* ends *"No recomendamos para embarazadas o personas con condiciones cardíacas sin consultar a su médico."* — **absent from the schema**, which stops earlier and retains *"Nuestros productos son 100% naturales y seguros."* Answer 1 asserts *"pierden en promedio 15-25 kilos en 2-3 meses"* | **Keep** the FAQPage — it is valid and is the cleanest format for answer-engine ingestion — but expect zero rich results (restricted to authoritative government and health-authority sites since Aug 2023; a commercial supplement retailer will never qualify). Rewrite every `acceptedAnswer.text` to be a verbatim substring of the visible answer. Add a build assertion | Small |
| **M** | `Organization.address` contains two `PostalAddress` objects with an invalid property and no actual address | `Layout.astro:102-113` puts `areaServed` inside `PostalAddress` — not a valid property of that type (it belongs to Organization/ContactPoint and is **already correctly declared** 10 lines below at :114-123). Neither object has `streetAddress`, `addressLocality`, `addressRegion` or `postalCode` | Delete lines 102-113 and keep the correct `areaServed` array. Reinstate `address` only with a real publishable address. Consider deleting `numberOfEmployees` (`minValue:5,maxValue:50`) — unverifiable, produces no feature | Trivial |
| **M** | `Organization.sameAs` points to a Facebook page returning HTTP 400, on all 70 pages | Fetched as `facebookexternalhit`: body contains *"This content isn't available right now"*; a control (`facebook.com/nike`) does not. **The URL responds HTTP 200, so a naive link checker will not catch it** | Remove or replace the dead URL. Every `sameAs` entry must resolve to real content — verify with a body-text check, not just a status code | Trivial |
| **M** | No `ItemList` on `/productos` or `/catalogo`; 10 product URLs are linked from neither hub | Not linked from either: `/30fusion`, `/applecidervingar`, `/cmpushup`, `/fatblazer`, `/hflex`, `/higa2`, `/primrose`, `/slimcoffee`, `/sosburn-clear`, `/sosburn-sensitive`. `/productos` additionally links 2 redirect sources | Add `ItemList` generated from the same array that renders the cards so it cannot drift. **Be clear about the ceiling:** ItemList of Products does **not** produce a carousel rich result (Google's carousel support covers Course, Movie, Recipe, Restaurant). The payoff is crawl discovery. This is half the fix — also add real `<a href>` links | Medium |
| **M** | Every breadcrumb item and offer URL omits the trailing slash the canonical uses, and both variants serve 200 | `/meizitang-soft-gel/` canonical is slash-terminated; its BreadcrumbList `item` and `Offer.url` are not. Affects all 42 BreadcrumbList blocks and all 40 Offer URLs | Normalise centrally via a helper, or pass `Astro.url.href` — already used to build the canonical at `Layout.astro:19` — so schema and canonical are identical by construction | Small |
| **M** | 24 pages carry only the site-wide Organization block — no page-type schema, no breadcrumbs | All 13 guías, all 3 comparativas, `/recursos`, `/catalogo`, `/blog`, `/testimonios`, `/contacto`, `/articulo-de-blog`, `/aviso-legal`, `/politica-de-privacidad`. None has a BreadcrumbList despite `/recursos/comparativas/duo-60-vs-lida/` being three levels deep | Add a shared BreadcrumbList component + `BlogPosting` on the 16 resource pages. **Do not add this to the six thin guides until the content is substantive** — declaring 304 words an Article invites the comparison. **Never use `HowTo`** on the routine/exercise guides: deprecated Sept 2023, renders nothing | Medium |
| **L** | `Product.brand` and `manufacturer` claim "MVV Natural" for third-party products MVV only resells | Hardcoded on all 40 pages including `Meizitang Soft Gel (Botanical Slimming)`, `Li-Da Daidahua Slimming Tea`, `Lida Booster`, `Chupa Panza`. **Note:** this is a YMYL accuracy/provenance defect, not a ranking blocker — `/meizitang-soft-gel/` already ranks, because the brand IS declared where it counts (Product.name, title, h1, body) | Add a `brandName` prop: "Meizitang", "Lida", "Chupa Panza", "MVV Natural" for own-label. Delete `manufacturer` (Google does not consume it and MVV does not manufacture these). Do **not** add `seller` at Product level — it is not a valid Product property, and `offers.seller` already exists | Medium |
| **L** | No `WebSite` node anywhere, on a site where brand queries are 42% of clicks | Type census across 75 files: `{Organization:70, Product:40, BreadcrumbList:42, Article:3, FAQPage:1}`. **Note:** `og:site_name="MVV Natural"` is already emitted on all 75 pages and is itself a documented site-name signal on a domain literally named mvvnaturales.com — so Google is most likely already rendering the name correctly. Display-label gap, not a ranking one | Add `WebSite` to the **homepage only**. Give Organization an `@id` first — zero `@id` values currently exist anywhere, so a `publisher` reference would dangle. Keep `alternateName` to ["MVV Naturales", "MVV Natural México"]; do **not** seed the misspelling "MV Natural", since Google may select `alternateName` as the displayed label | Trivial |
| **L** | Organization has no `@id`, so `Product.brand`, `Article.publisher` and `Article.author` are disconnected stubs | Five organisation-shaped things per site. **Note:** inline `brand`/`publisher` objects are Google's own documented examples and `@id` is required nowhere — this is graph hygiene, not a rich-result defect. Also: "MVV Natural USA" is **not** a phantom org — `/aviso-legal/` declares it as the *"Denominación social"* and it is the footer copyright holder | Add `@id` and consolidate into a single `@graph`. Add `legalName: "MVV Natural USA"` to Organization rather than deleting the correct `offers.seller`. Schedule after the real product-schema defects | Small |
| **L** | All 3 blog posts declare `author` as an Organization; no `Person` exists on the live site | No visible byline, no `author.url`, no credentials. `/sobre-nosotros/` returns 404. **Note:** `Organization` is an explicitly valid value for `Article.author` and produces no validation error — the real defect is the missing human, not the schema type. `Article` vs `BlogPosting` is a non-issue; Google handles them identically | Ship the visible byline and bio content **first**, then let the `Person` JSON-LD describe what is actually on the page. Never the reverse — that becomes the same class of fabrication as the aggregateRating | Medium |
| **L** | Article `image` hotlinks 1200×800 Unsplash stock; no `ImageObject`, one aspect ratio | 5 distinct Unsplash photo IDs across 3 posts. They resolve and are crawlable, so not a hard error — but they are third-party assets on another domain with no association to mvvnaturales.com in Image Search | Host on the existing Cloudinary account (already preconnected at `Layout.astro:69`) and emit a full `ImageObject`, ideally 16×9 / 4×3 / 1×1 variants. Pass the same URL as the Layout `image` prop | Small |
| **L** | `LocalBusiness` is **not viable** and must not be added | No street address, city, hours or map anywhere. `/contacto/`'s full rendered text is nav + two WhatsApp buttons + footer. `Organization.address` stubs contain only `addressCountry` | **Do not add `LocalBusiness`** (or Store/HealthAndBeautyBusiness). Inventing an address would be a fabricated business-location claim on a YMYL site — worse than a bad rating. Keep `Organization`, correct for a cross-border mail-order operation. Revisit only with a real published address + verified GBP. Likewise no `VideoObject` — `grep -rniE "youtube\|vimeo\|<video" src` finds only a prose mention | Trivial |
| **L** | All 40 Product nodes lack `sku`, `category`, `mainEntityOfPage` and `@id` | `has sku: 0, gtin: 0, mpn: 0`. No `WebPage` node on any of the 75 pages | Add `@id`, `sku` (stable internal, e.g. `MVV-MEIZITANG-36`), `category: "Health & Beauty > Health Care > Vitamins & Supplements"`, `mainEntityOfPage`. **Do not invent `gtin` or `mpn`.** Use the same `sku` on `/applecidervingar/` and `/applecyder/` so Google can see they are one product | Small |

### 4.9 Core Web Vitals & Performance — **72 / 100**

**Read this section last and act on it last.** Performance is not why this site is unindexed, and it is the healthiest dimension in the audit.

Methodology note: the PageSpeed Insights API is hard-quota-blocked for anonymous callers (`HTTP 429`, `"quota_limit_value": "0"`) and the CrUX API returns 403 without a key, so **no CrUX field data could be obtained**. All numbers below are Lighthouse 12 lab runs against production. Crucially, re-running the homepage with **applied (devtools)** throttling instead of **simulated (Lantern)** gives FCP/LCP 1.6 s and a score of 98, versus LCP 4.87 s and score 72 simulated — so the mobile "failure" is substantially a Lantern artifact and real-device LCP is likely near-passing.

| URL | Mobile LCP (sim.) | Desktop LCP | CLS | TBT |
|---|---:|---:|---:|---:|
| `/` | 4.87 s | 1.34–1.61 s | pass | 12.5 ms |
| `/productos` | 4.86 s | pass | pass | 0 ms |
| `/duo-60-fusion` | 4.77 s | pass | pass | 0 ms |
| `/blog/funcionan-pastillas-para-bajar-de-peso` | 6.15 s | pass | pass | 23 ms |

Thresholds: LCP ≤2.5 s good · **INP** ≤200 ms good · CLS ≤0.1 good. TBT of 0–23 ms across all four URLs means INP is almost certainly comfortably inside the good band.

| Sev | Finding | Evidence | Fix | Effort |
|:--:|---|---|---|---|
| **H** | The LCP image on `/productos` is marked `loading="lazy"`, adding **2,016 ms of pure Load Delay** | Lighthouse `lcp-lazy-loaded` audit **score 0 (FAIL)**. LCP element resolves to the Duo-60 Fusion tile, `boundingRect top=233` — above the fold on an 812 px viewport. LCP phases: TTFB 692 ms (14%), **Load Delay 2,016 ms (42%)**, Load Time 241 ms (5%), Render Delay 1,909 ms (39%). Source `src/components/product-04.jsx:33`; the file has 8 `loading="lazy"` and **zero** `eager`/`fetchpriority` | Change the **first grid tile only** to `loading="eager" fetchpriority="high"`; leave the other 7 lazy. Add a matching `<link rel="preload" as="image" fetchpriority="high">` in `productos.astro`. Expected recovery: the full 2,016 ms | Trivial |
| **H** | The 172 KiB site logo ships with **no Cloudinary transform** on all 70 pages | URL has no `f_auto,q_auto,w_` segment, unlike every product image. transferSize 177,004 bytes — the **#1 largest resource on `/`**, larger than the 128 KB main JS chunk. `modern-image-formats` wasted 150,203 bytes; `uses-responsive-images` wasted 162,614 — ~92% waste. Present on **70 of 75** built pages | Insert `f_auto,q_auto,w_240/` into the URL in the 5 rendered `<img>` uses (`navbar-06.jsx:51`, `footer-02.jsx:15`, `Footer.astro:12`, `content-29.jsx:171`, `content-30.jsx:223`); `w_180` for the apple-touch-icon. **Do NOT add the transform to the JSON-LD `logo`/`image` values** — schema.org logo should stay a full-resolution canonical asset. One sed recovers ~150 KiB on all 70 pages | Trivial |
| **H** | Blog posts hotlink 1.3 MB of oversized Unsplash photos, one of which is the LCP element | `/blog/funcionan-pastillas-para-bajar-de-peso`: mobile score 68, LCP 6,153 ms, 1,726,937 bytes total with 1,351,266 in images. LCP element is a 1200×800 JPEG rendered into a **371×209 box** — 15× more pixels than needed. `uses-responsive-images` savings 1,021 KiB; `modern-image-formats` 660 KiB. No `preconnect` to the third-party host | Re-host the 7 images through Cloudinary with the existing `f_auto,q_auto,w_800` pattern. Add `fetchpriority="high"` to the hero. One-line stopgap: change `?w=1200&h=800&fit=crop` → `?w=800&h=534&fit=crop&fm=webp&q=70` on all 29 references. **Also an E-E-A-T cost:** a YMYL health article illustrated entirely with generic stock signals low content investment | Medium |
| **M** | ~227 KB of identical shared JS ships on every page and is 52–83% unused | JS transfer is constant regardless of content (`/` 255,660 B, `/productos` 255,622, `/duo-60-fusion` 257,531). `unused-javascript`, identical on all four: `index.DR-NyFWh.js` 128,325 B total / **106,401 unused (83%)**; `client.Dnh0jofZ.js` 52% unused; `proxy.Bc-1JVk8.js` 60%. Estimated savings 940–1,160 ms. The 83%-unused chunk shows the @radix-ui createContext pattern — it is the bundled Relume/Radix surface | Switch barrel imports (`import { X } from '@relume_io/relume-ui'`) to deep path imports so Rollup can tree-shake. Second lever: `product-04.jsx` and its 4 siblings render only `<img>` and `<a>` with CSS-only hover — convert to `.astro` and remove them from the hydration graph entirely | Large |
| **M** | 144 `client:load` directives vs 14 `client:visible` force eager hydration site-wide | `grep -rho 'client:[a-z]*'` → 144 `client:load`, 66 `client:idle`, 14 `client:visible`. Waterfall on `/` shows 17 scripts all at High priority in two bursts. Homepage LCP element is a plain text `<p>` whose **Render Delay is 4,199 ms — 86% of LCP — with Load Time 0**, so the delay is hydration work, not asset fetching | Downgrade what is not needed for first paint: WhatsApp float, Footer2, Faq7 and all Cta* → `client:visible`/`client:idle`. Highest-value single change: the five `Product4*` islands in `productos.astro:48-52` hold no interactive state — remove hydration entirely | Medium |
| **M** | The `manualChunks` config produces no chunks and is silently inert | `ls dist/_astro/ \| grep -E 'react-vendor\|ui-vendor'` returns **nothing**. Astro applies its own chunking for client islands, so this output-level config never runs. React stays fused into the 83%-unused 453 KB chunk, and any dependency bump invalidates the whole 136 KB gzip chunk for returning visitors | Delete the dead block so the config stops lying, or replace with the function form Astro respects. Then re-run the build and verify `ls dist/_astro \| grep vendor` before claiming the optimization exists | Small |
| **M** | No field data obtainable — yet **Vercel Speed Insights is already installed and collecting real INP/LCP** | PSI refused all 8 requests with `HTTP 429 "quota_limit_value": "0"`; CrUX returned 403. Meanwhile `/_vercel/speed-insights/script.js` loads on every page and `@vercel/speed-insights ^1.2.0` is imported at `Layout.astro:2` | **(1)** Read the Vercel Speed Insights tab — it already reports real-user LCP, INP and CLS by route and device. Use it to confirm or refute the 4.8 s simulated LCP before investing beyond the three trivial fixes above. **(2)** Get a free CrUX API key and check whether an origin record exists at all — at 1,360 impressions/quarter the site very likely falls below CrUX's minimum traffic threshold, in which case **Google has no field data for this site and CWV is not currently influencing its rankings** | Trivial |
| **L** | `prefetchAll: true` pulls 41 KB of extra HTML during first load, including a redirect stub | Four extra document fetches on the homepage: `/productos` 12,796 B, `/duo-60-fusion` 14,127, `/higa2` 13,752, and **`/primerose` 468 B** — a redirect stub, pure waste, and confirmation that internal links still point at redirect sources | Change `defaultStrategy: 'viewport'` → `'hover'`. Separately fix the link that points at `/primerose` — prefetching a redirect is a symptom, not the disease | Trivial |
| **L** | One 112 KB stylesheet named after a random product page render-blocks all 70 pages | Every page loads `/_astro/15day-detox-tea.*.css` at VeryHigh priority: raw 112,603 B, gzip 17,155. `render-blocking-resources` scores 0.5 with wastedMs 337–360. `inlineStylesheets: 'auto'` is set but 17 KB is far above Astro's 4 KB threshold | **Low priority — do not chase per-route CSS splitting**; 337 ms does not justify the build complexity relative to the indexing work this site needs. The useful action is confirming Brotli rather than gzip is served (17,573 B transferred vs 17,155 local gzip suggests gzip) | Small |

### 4.10 Refuted Findings (removed after adversarial verification)

Two findings were investigated, disproven and are recorded here so they are not re-raised.

| Claim | Why it was refuted |
|---|---|
| *"28 of 40 product pages are named after invented house brands with no search demand; the 4 third-party-brand pages produce 100% of non-brand clicks"* | 3 of the 4 third-party-brand pages (`/chupapanza/`, `/lidabooster/`, `/lida-slimming-tea/`) earn **zero** clicks, while house-named `/sosburn-clear/` (4) and `/duo-60-fusion/` (3) out-earn the only productive third-party page 7 to 4 over 28 days. Non-brand clicks are 5 of 9 third-party, not 100%. Also, ~26 of the 28 "house" pages **already** carry a generic category descriptor in the `<title>`. Salvageable residue: the h1s are bare brand strings ("Alpha Glow", "Fat Blazer", "Slim24") while the titles carry the category — adding the category to the h1 is a correct, **low**-severity fix. |
| *"Six pages compete for 'acelerar metabolismo', five for 'grasa abdominal' — four cannibalized clusters"* | Measured 5-gram body overlap between the six metabolismo pages is **0.009–0.034 Jaccard (0.7–3.4%)**. Each has a distinct self-canonical and a distinct meta description targeting a distinct query. This is a textbook pillar-and-cluster architecture, not cannibalization. Two clusters also wrongly folded brand-targeted product pages in with informational guides — `/slimcoffee/` does not contain the string "quemador" even once. Cannibalization requires the URLs to be *in the index* to compete; these earn zero clicks because they are **not indexed**. The proposed fix (301 the siblings into a pillar, strip "Quemador de Grasa" from product titles) would delete working content and remove the only non-brand relevance signal from 40 product pages. |

---

## 5. Traffic Opportunity Model & Forecast

### 5.1 Current baseline

| Metric | Last 3 months | Last 28 days | Notes |
|---|---:|---:|---|
| Clicks | 141 | 53 (+61%) | 42% own brand |
| Impressions | 1,360 | 415 (+12%) | **~15/day across 70 pages** |
| CTR | 10.4% | — | Brand-inflated; residual ≈7.3% |
| Avg position | 11.3 | — | Page 2 |
| Distinct queries | 64 | — | For a 70-page site |
| Indexed pages | ~14 | — | 20% of the site |
| Clicks from content (blog/guías/comparativas) | **0** | **0** | ~11,000 words |

### 5.2 Where the ceiling actually is

The binding constraint is **retrieval, not conversion**. Snippets already over-perform their positions. Impressions are capped because 56 pages cannot generate an impression at all.

| Lever | Mechanism | Realistic ceiling |
|---|---|---:|
| **A. Index the 16 "Discovered" pages** | Link `/recursos/*` from the hub, footer and product pages; fix `lastmod`; fix the 3 stub-routed products | 16 pages × ~5–15 impr/mo once indexed |
| **B. Index the 40 "Crawled" pages** | Requires content depth, not links. Consolidation to ~35 substantive URLs is the honest path | 20–35 pages × ~10–40 impr/mo |
| **C. Claim the third-party brand pool** | The only demand pool with **proven** conversion here. Meizitang/Botanical Slimming already yields 65 impressions and 5 clicks at position ~11 on an unoptimised page | 65 impr/quarter → 250–400/quarter if consolidated and moved to top-5 |
| **D. Resolve the five-domain entity split** | mvvnatural.com ranks #3 for `meizitang soft gel` on the **identical slug** while this site is absent from the top 10 | Largest single upside; entirely gated on client ownership |
| **E. Metadata (titles, descriptions, geo, OG)** | Compounds whatever impressions exist. Cannot create them | +10–20% CTR on already-surfacing pages |
| **F. Core Web Vitals** | CWV is a minor tiebreaker, and CrUX likely has no record for this origin at all | ≈0 in the audit window |

### 5.3 Forecast

Assumptions: Sprints 1–3 executed as sequenced; no paid media; no domain consolidation (lever D excluded, since it depends on facts we do not control); GSC impressions used as the primary metric.

| Horizon | Indexed pages | Impressions / mo | Clicks / mo | Non-brand share | Basis |
|---|---:|---:|---:|---:|---|
| **Today** | ~14 | ~140 | ~18 | ~8 of 47 clicks/mo | Measured |
| **Day 90** | **35–45** | **450–700** | **45–75** | 25–35% | Levers A + C fully; B partially (the ~10 Tier-1 products + 7 consolidated guides). Discovery fixes land in week 1 but Google needs 3–8 weeks to re-evaluate 56 URLs — which is exactly why the `lastmod` fix must be in the first commit |
| **Day 180** | **35–45** (consolidated from 70) | **1,100–1,900** | **110–200** | 40–55% | Lever B complete; category hubs ranking for `quemador de grasa natural`-class terms; testimonials page indexed and earning `testimonios mvv natural`; third-party brand pages in top 5 |

**Confidence:** medium on day 90 (the discovery fixes are mechanical and verifiable), lower on day 180 (depends on content execution actually reaching 600+ unique words per surviving URL, and on Google's quality re-assessment of a domain that currently hosts a lorem-ipsum page).

**Downside scenario to state plainly:** if the fabricated `aggregateRating` ships and triggers a spammy-structured-markup manual action, or if the five-domain duplicate is never resolved, day-180 impressions plateau near 400–600 and non-brand share stays under 20%. Domain consolidation is the single largest unknown in this model.

**What would falsify the model early:** if, 6 weeks after the Sprint 1 fixes deploy, GSC "Discovered – currently not indexed" has not fallen below 8, the constraint is not link-graph — it is site-level quality or the duplicate-entity problem, and effort should shift entirely to Sprint 2 content and to lever D.

### 5.4 Query targets, ranked by evidence

| Priority | Target | Current | Why |
|---:|---|---|---|
| 1 | `meizitang soft gel`, `botanical slimming soft gel`, `+ precio` | 5 clicks / 65 impr, ~pos 11 | **Only proven non-brand demand.** Competitors are Mercado Libre, meizitangmexico.com.mx, semasbella.com — all showing prices |
| 2 | `lida daidaihua`, `chupa panza`, `li-da slimming tea` | 0 clicks | Third-party brands MVV stocks with independent demand; pages exist but the brand is **misspelled** ("Daidahua" ×15, "Daidaihua" ×0) |
| 3 | `testimonios mvv natural`, `mvv natural opiniones`, `mvv natural funciona` | 0 | Brand-adjacent, high intent, and `/testimonios/` has 207 inbound links and zero text |
| 4 | `quemador de grasa natural`, `pastillas para bajar de peso naturales` | 0 | Only viable **after** category hubs exist with 800–1,000 words each. Not winnable by a 208-word product page |
| 5 | `donde comprar <brand>`, `<producto> precio` | 3 impr | Tiny volume, but highest intent; `/contacto/` and product descriptions should carry the phrasing |

---

## 6. The Road to 100/100

| Dimension | Now | Sprint 1 | Sprint 2 | Sprint 3 | Target | Gate |
|---|---:|---:|---:|---:|---:|---|
| Indexing & Crawl | 11 | 40 | 65 | 85 | 90 | ≤5 pages in Discovered–not indexed |
| Indexation & SERP | 16 | 30 | 50 | 70 | 85 | Domain consolidation resolved |
| E-E-A-T & YMYL | 11 | 30 | 65 | 80 | 90 | Named author + citations + disclaimer on 75/75 |
| Duplicate / Thin | 26 | 35 | 70 | 85 | 90 | Median body words ≥600 |
| Internal Linking | 17 | 65 | 80 | 90 | 95 | 0 orphans, 0 stub links, 0 broken links |
| Technical Recon | 41 | 75 | 85 | 90 | 95 | Real 308s, per-URL lastmod, trailing slash |
| On-Page & SERP | 34 | 45 | 70 | 85 | 90 | 0 titles >60, 0 descriptions >155 |
| Structured Data | 27 | 55 | 75 | 85 | 90 | 0 fabricated nodes, 0 `undefined`, Article on 19 pages |
| Core Web Vitals | 72 | 82 | 88 | 90 | 92 | Field LCP ≤2.5 s in Vercel Speed Insights |
| **Weighted total** | **22** | **43** | **67** | **83** | **90** | |

### Checklists

**Indexing & Crawl → 90**
- [ ] 0 pages with zero inbound internal links (currently 4)
- [ ] 0 internal links pointing at redirect stubs (currently 133)
- [ ] 0 internal links returning 404 (currently 9)
- [ ] All 16 `/recursos/*` linked from ≥4 distinct pages outside the folder (currently 0)
- [ ] Per-URL `lastmod` reflecting real modification dates (currently 1 value for 70 URLs)
- [ ] `/slimcoffee/` present in `sitemap-0.xml`
- [ ] Every sitemap URL ≥600 body words (currently 12 of 70 clear 700)

**E-E-A-T & YMYL → 90**
- [ ] One named author with a real bio at `/sobre-nosotros`, linked site-wide
- [ ] Visible `Escrito por` + `Actualizado` on all 19 health-content pages (currently 0)
- [ ] ≥3 outbound citations per guide making a physiological claim (currently 0 site-wide)
- [ ] Medical disclaimer on 75 of 75 built pages (currently 18)
- [ ] 0 disease treatment/prevention claims (currently 14 pages)
- [ ] 0 unsubstantiated quantified outcomes (`15-25 kilos`, `Eficacia 90%`, `sin efectos secundarios`)
- [ ] `/testimonios/` ≥1,200 words of transcribed, attributed testimonials
- [ ] `/contacto/` with full NAP, hours and service areas

**Duplicate / Thin → 90**
- [ ] Product-page chrome ratio ≤30% (currently 48.2%)
- [ ] Median unique product words ≥600 (currently 208)
- [ ] 0 pages under 300 body words (currently 8)
- [ ] 0 duplicate-product URL pairs (currently 1: applecyder/applecidervingar)
- [ ] 0 lorem-ipsum pages (currently 1)
- [ ] `/preguntas-frecuentes/` <30% 8-gram overlap with `/` (currently 93.5%)

**Structured Data → 90**
- [ ] 0 fabricated `aggregateRating` / `review` / shipping / return nodes
- [ ] 0 occurrences of `undefined` in any emitted JSON-LD (currently 32)
- [ ] 0 `offers` nodes with `price: "0"` (currently 40)
- [ ] `BlogPosting` + `BreadcrumbList` on all 19 content pages (currently 0 breadcrumbs there)
- [ ] `WebSite` node on the homepage; `@id` on Organization
- [ ] All schema URLs trailing-slash-matched to the canonical
- [ ] Every `sameAs` URL verified by body content, not status code


---

## 7. Appendix: Route-by-Route Table

All 75 built HTML files. **Index status** is inferred, not read from GSC's per-URL API: `Indexed` = the 10 site-wide header/footer pages plus the 3 product pages GSC shows earning clicks (13 total, matching GSC's arithmetic); `Discovered–not indexed` = zero inbound internal links; `Crawled–not indexed` = has inbound links but is not in the indexed set; `Stub` = intentional `noindex` meta-refresh page. Words = rendered visible text including nav/footer chrome (subtract ~90 for real body text). Inbound = distinct source pages linking to it, measured across all 75 files in `dist/`.

| URL | Index status | In sitemap | Words | Inbound | Title len | H1s | Flags |
|---|---|:--:|---:|---:|---:|---:|---|
| `/` | Indexed | yes | 1683 | 69 | 63 | 2 | title>60, h1=2 |
| `/15day-detox-tea/` | Crawled–not indexed | yes | 394 | 40 | 60 | 1 | thin |
| `/30daydetox/` | Crawled–not indexed | yes | 439 | 2 | 64 | 1 | title>60 |
| `/30fusion/` | Discovered–not indexed | yes | 474 | 0 | 65 | 1 | title>60, ORPHAN |
| `/3day-reset/` | Crawled–not indexed | yes | 408 | 40 | 62 | 1 | title>60 |
| `/alphaglow/` | Crawled–not indexed | yes | 473 | 41 | 72 | 1 | title>60 |
| `/applecidervingar/` | Discovered–not indexed | yes | 434 | 0 | 66 | 1 | title>60, ORPHAN |
| `/applecyder/` | Crawled–not indexed | yes | 292 | 40 | 54 | 1 | thin |
| `/articulo-de-blog/` | Discovered–not indexed | yes | 1123 | 0 | 33 | 2 | h1=2, ORPHAN |
| `/ashawandha/` | Stub (noindex) | NO | 8 | 0 | 28 | 0 | h1=0 |
| `/ashwagandha/` | Crawled–not indexed | yes | 440 | 42 | 69 | 1 | title>60 |
| `/aviso-legal/` | Indexed | yes | 1121 | 69 | 43 | 1 | — |
| `/bikini-strong/` | Crawled–not indexed | yes | 417 | 40 | 62 | 1 | title>60 |
| `/blog/` | Indexed | yes | 383 | 69 | 67 | 3 | title>60, h1=3, thin |
| `/blog/como-acelerar-metabolismo-naturalmente/` | Crawled–not indexed | yes | 794 | 1 | 61 | 1 | title>60 |
| `/blog/funcionan-pastillas-para-bajar-de-peso/` | Crawled–not indexed | yes | 776 | 1 | 68 | 1 | title>60 |
| `/blog/mejores-suplementos-naturales-bajar-peso-mexico/` | Crawled–not indexed | yes | 518 | 1 | 67 | 1 | title>60 |
| `/blueberry-colageno/` | Crawled–not indexed | yes | 403 | 40 | 62 | 1 | title>60 |
| `/catalogo/` | Indexed | yes | 90 | 69 | 57 | 1 | thin |
| `/chupapanza/` | Crawled–not indexed | yes | 432 | 41 | 69 | 1 | title>60 |
| `/cmpushup/` | Crawled–not indexed | yes | 497 | 4 | 63 | 1 | title>60 |
| `/cmpushupmen/` | Crawled–not indexed | yes | 399 | 1 | 75 | 1 | title>60, thin |
| `/colageno-biotina/` | Crawled–not indexed | yes | 388 | 40 | 66 | 1 | title>60, thin |
| `/colit6/` | Crawled–not indexed | yes | 356 | 1 | 72 | 1 | title>60, thin |
| `/contacto/` | Indexed | yes | 59 | 69 | 8 | 0 | h1=0, thin |
| `/duo-60-fusion/` | Indexed | yes | 500 | 51 | 68 | 1 | title>60 |
| `/edetox/` | Crawled–not indexed | yes | 428 | 40 | 60 | 1 | — |
| `/encimax/` | Crawled–not indexed | yes | 419 | 40 | 66 | 1 | title>60 |
| `/fatblazer/` | Crawled–not indexed | yes | 437 | 39 | 68 | 1 | title>60 |
| `/floryva/` | Crawled–not indexed | yes | 421 | 40 | 71 | 1 | title>60 |
| `/hflex/` | Discovered–not indexed | yes | 414 | 0 | 74 | 1 | title>60, ORPHAN |
| `/higa2/` | Crawled–not indexed | yes | 383 | 40 | 68 | 1 | title>60, thin |
| `/lida-slimming-tea/` | Crawled–not indexed | yes | 424 | 40 | 61 | 1 | title>60 |
| `/lidabooster/` | Crawled–not indexed | yes | 452 | 46 | 61 | 1 | title>60 |
| `/lipohd/` | Crawled–not indexed | yes | 453 | 41 | 64 | 1 | title>60 |
| `/macapremium/` | Crawled–not indexed | yes | 322 | 40 | 64 | 1 | title>60, thin |
| `/magic-booty-up/` | Crawled–not indexed | yes | 403 | 40 | 58 | 1 | — |
| `/maxi-fibra/` | Crawled–not indexed | yes | 411 | 40 | 65 | 1 | title>60 |
| `/meizitang-soft-gel/` | Indexed | yes | 424 | 40 | 66 | 1 | title>60 |
| `/mens-exotic/` | Crawled–not indexed | yes | 401 | 40 | 59 | 1 | — |
| `/politica-de-privacidad/` | Indexed | yes | 1317 | 69 | 58 | 1 | — |
| `/preguntas-frecuentes/` | Indexed | yes | 607 | 69 | 65 | 1 | title>60 |
| `/primerose/` | Stub (noindex) | NO | 8 | 2 | 25 | 0 | h1=0 |
| `/primrose/` | Crawled–not indexed | yes | 274 | 41 | 69 | 1 | title>60, thin |
| `/productos/` | Indexed | yes | 440 | 69 | 61 | 1 | title>60 |
| `/protein-body/` | Crawled–not indexed | yes | 408 | 40 | 70 | 1 | title>60 |
| `/recursos/` | Indexed | yes | 356 | 69 | 75 | 1 | title>60, thin |
| `/recursos/comparativas/duo-60-vs-lida/` | Crawled–not indexed | yes | 841 | 1 | 69 | 1 | title>60 |
| `/recursos/comparativas/mejor-quemador-grasa/` | Crawled–not indexed | yes | 742 | 1 | 62 | 1 | title>60 |
| `/recursos/comparativas/sos-burn-vs-body-shape/` | Crawled–not indexed | yes | 897 | 1 | 65 | 1 | title>60 |
| `/recursos/guias/acelerar-metabolismo/` | Crawled–not indexed | yes | 1259 | 4 | 67 | 1 | title>60 |
| `/recursos/guias/alimentos-acelerar-metabolismo/` | Crawled–not indexed | yes | 536 | 2 | 65 | 1 | title>60 |
| `/recursos/guias/alimentos-saciantes/` | Crawled–not indexed | yes | 506 | 1 | 67 | 1 | title>60 |
| `/recursos/guias/ansiedad-por-comer/` | Crawled–not indexed | yes | 402 | 3 | 65 | 1 | title>60 |
| `/recursos/guias/controlar-apetito/` | Crawled–not indexed | yes | 1351 | 4 | 68 | 1 | title>60 |
| `/recursos/guias/dieta-grasa-abdominal/` | Crawled–not indexed | yes | 488 | 3 | 68 | 1 | title>60 |
| `/recursos/guias/ejercicios-metabolismo/` | Crawled–not indexed | yes | 605 | 2 | 69 | 1 | title>60 |
| `/recursos/guias/elegir-suplemento/` | Crawled–not indexed | yes | 804 | 1 | 75 | 1 | title>60 |
| `/recursos/guias/grasa-visceral-vs-subcutanea/` | Crawled–not indexed | yes | 494 | 3 | 69 | 1 | title>60 |
| `/recursos/guias/hambre-emocional/` | Crawled–not indexed | yes | 356 | 3 | 60 | 1 | thin |
| `/recursos/guias/metabolismo-lento-causas/` | Crawled–not indexed | yes | 658 | 3 | 62 | 1 | title>60 |
| `/recursos/guias/quemar-grasa-abdominal/` | Crawled–not indexed | yes | 948 | 4 | 65 | 1 | title>60 |
| `/recursos/guias/rutina-ejercicios-abdomen/` | Crawled–not indexed | yes | 448 | 2 | 66 | 1 | title>60 |
| `/serenity/` | Crawled–not indexed | yes | 451 | 42 | 65 | 1 | title>60 |
| `/slim-shake/` | Crawled–not indexed | yes | 424 | 40 | 63 | 1 | title>60 |
| `/slim24/` | Crawled–not indexed | yes | 408 | 40 | 65 | 1 | title>60 |
| `/slimcoffe/` | Stub (noindex) | NO | 8 | 40 | 27 | 0 | h1=0 |
| `/slimcoffee/` | Crawled–not indexed | NO | 281 | 1 | 62 | 1 | title>60, not in sitemap, thin |
| `/sosburn-clear/` | Indexed | yes | 356 | 1 | 69 | 1 | title>60, thin |
| `/sosburn-sensitive/` | Crawled–not indexed | yes | 374 | 1 | 70 | 1 | title>60, thin |
| `/sosburn/` | Crawled–not indexed | yes | 547 | 45 | 73 | 1 | title>60 |
| `/sosburnclear/` | Stub (noindex) | NO | 8 | 40 | 30 | 0 | h1=0 |
| `/sosburnsensitive/` | Stub (noindex) | NO | 8 | 42 | 34 | 0 | h1=0 |
| `/testimonios/` | Indexed | yes | 273 | 69 | 61 | 1 | title>60, thin |
| `/thyroide-support/` | Crawled–not indexed | yes | 415 | 44 | 72 | 1 | title>60 |
### Appendix summary

| Metric | Value |
|---|---:|
| Built HTML files | 75 |
| Indexable routes | 70 |
| URLs in `sitemap-0.xml` | 69 |
| Redirect stubs (`noindex`) | 5 |
| Inferred indexed | 13 |
| Hard orphans (0 inbound, not a stub) | 4 |
| Routes with title >60 chars | 30 (dist) / 59 (live) |
| Routes with H1 ≠ 1 | 4 (`/` =2, `/blog` =3, `/articulo-de-blog` =2, `/contacto` =0) + 5 stubs =0 |
| Routes under 400 rendered words | 34 |
| Routes under 500 body words | 54 of 70 |
| Median body words | 379.5 |
| Built indexable pages missing from sitemap | 1 (`/slimcoffee/`) |
| Internal links to redirect stubs | 133 |
| Internal links to hard 404s | 9 |
| Internal anchors total | 3,234 |
| Empty (image-only) anchors | 277 (8.6%) |
| Keyword-bearing anchors into product pages | **0** |

---

## 8. Method & Limitations

**Verified in this session:** the uncommitted `product-seo.jsx` diff (`aggregateRating` at line 29), 16 dist files containing `mvvnaturales.comundefined`, the 75-file route census with word counts and H1 counts, inbound-link counts across 3,234 anchors, and the four hard orphans.

**Limitations to state plainly:**
1. **No CrUX field data.** PSI returned `HTTP 429` with `"quota_limit_value": "0"`; CrUX returned 403. All CWV numbers are Lighthouse lab estimates, and the mobile figures use Lantern simulation, which I demonstrated overstates LCP by roughly 3× on this site. Vercel Speed Insights already holds the real answer.
2. **SERP data is Bing-derived.** Google and Bing `site:` queries were CAPTCHA-blocked; competitive positions came from the DuckDuckGo HTML endpoint (Bing index). Directional for Google, not identical.
3. **Index status per URL is inferred**, not read from GSC's URL Inspection API. The bucket totals reconcile exactly to GSC's reported counts, but individual assignments within the Crawled/Discovered split may be wrong for a handful of pages.
4. **Domain ownership is unknown.** Whether MVV controls mvvnatural.com and mvvnatural.mx determines which of two completely different strategies applies to the largest finding in this audit. This must be answered by the client before Sprint 3.
5. **`dist/` was built from a dirty working tree.** Some `dist/` observations (fabricated ratings, the sitemap filter dropping `/slimcoffee/`) reflect uncommitted changes and are **not** live. Where it mattered, live production was checked with `curl` and the distinction is noted inline.
