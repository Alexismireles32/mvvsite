#!/usr/bin/env python3
"""
seo-check.py — MVV Natural post-build SEO gate.

Run AFTER `npm run build`, BEFORE you deploy:

    npm run build && python3 scripts/seo-check.py

Exit code 0 = all mechanical checks pass. Exit code 1 = at least one FAIL.
Wire it into package.json as:  "verify": "astro build && python3 scripts/seo-check.py"

This script asserts MECHANICAL facts only. It cannot judge E-E-A-T, content
quality, or whether Google will index anything. A green run means "nothing is
provably broken", not "this will rank".

No third-party dependencies. Python 3.8+.
"""

import json
import os
import re
import sys
from collections import defaultdict
from html.parser import HTMLParser

# ---------------------------------------------------------------- config ----

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST = os.path.join(ROOT, "dist")
SITE = "https://www.mvvnaturales.com"

# Routes that are intentionally meta-refresh stubs (astro.config.mjs `redirects`).
# They are noindex + non-canonical by design and are exempt from h1/title/desc rules.
REDIRECT_STUBS = {
    "/primerose",
    "/slimcoffe",
    "/ashawandha",
    "/sosburnclear",
    "/sosburnsensitive",
}

# Substrings that must never appear in shipped HTML.
LOREM_MARKERS = [
    "lorem ipsum",
    "dolor sit amet",
    "consectetur adipiscing",
    "Lorem ipsum",
]

# Hard fail: these are unmistakably unfinished-template artefacts.
PLACEHOLDER_IMAGE_MARKERS = [
    "relume-assets",                # Relume UI kit placeholder CDN
    "placehold.co",
    "placeholder.com",
    "via.placeholder",
    "d22po4pjz3o32e.cloudfront.net",  # Relume placeholder CDN
]

# Warn only: licensed stock photography is not broken, but on a YMYL health
# site it is a weak E-E-A-T signal. Replace with original photography as it
# becomes available — this should not block a deploy.
STOCK_IMAGE_MARKERS = [
    "images.unsplash.com",
    "images.pexels.com",
]

TITLE_MIN, TITLE_MAX = 25, 65
DESC_MIN, DESC_MAX = 70, 165

# ------------------------------------------------------------- reporting ----

RESULTS = []          # (level, check, message)
LEVELS = {"FAIL": 0, "WARN": 1, "PASS": 2}

USE_COLOR = sys.stdout.isatty() and os.environ.get("NO_COLOR") is None
def _c(code, s):
    return f"\033[{code}m{s}\033[0m" if USE_COLOR else s

def fail(check, msg):
    RESULTS.append(("FAIL", check, msg))

def warn(check, msg):
    RESULTS.append(("WARN", check, msg))

def ok(check, msg):
    RESULTS.append(("PASS", check, msg))

def report(check, bad, total, noun, limit=12):
    """Emit PASS if `bad` is empty, else FAIL listing up to `limit` offenders."""
    if not bad:
        ok(check, f"{total} {noun} clean")
        return
    detail = "\n".join("      - " + str(b) for b in bad[:limit])
    more = f"\n      ... and {len(bad) - limit} more" if len(bad) > limit else ""
    fail(check, f"{len(bad)}/{total} {noun} failing:\n{detail}{more}")

# ----------------------------------------------------------- html loading ----

class Extract(HTMLParser):
    """Minimal, dependency-free extraction of the SEO-relevant bits."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.titles = []
        self._in_title = False
        self.description = None
        self.robots = None
        self.canonical = None
        self.h1_count = 0
        self.h1_texts = []
        self._in_h1 = False
        self._h1_buf = []
        self.hreflangs = []          # (hreflang, href)
        self.imgs = []               # dict of attrs
        self.hrefs = []
        self.ldjson_raw = []
        self._in_ld = False
        self._ld_buf = []
        self.og = {}

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "title":
            self._in_title = True
            self.titles.append("")
        elif tag == "h1":
            self._in_h1 = True
            self.h1_count += 1
            self._h1_buf = []
        elif tag == "meta":
            name = (a.get("name") or "").lower()
            prop = (a.get("property") or "").lower()
            if name == "description":
                self.description = a.get("content", "")
            elif name == "robots":
                self.robots = (a.get("content") or "").lower()
            elif prop.startswith("og:"):
                self.og[prop] = a.get("content", "")
        elif tag == "link":
            rel = (a.get("rel") or "").lower()
            if rel == "canonical":
                self.canonical = a.get("href", "")
            elif rel == "alternate" and a.get("hreflang"):
                self.hreflangs.append((a["hreflang"], a.get("href", "")))
        elif tag == "img":
            self.imgs.append(a)
        elif tag == "a":
            if a.get("href"):
                self.hrefs.append(a["href"])
        elif tag == "script":
            if (a.get("type") or "").lower() == "application/ld+json":
                self._in_ld = True
                self._ld_buf = []

    def handle_endtag(self, tag):
        if tag == "title":
            self._in_title = False
        elif tag == "h1" and self._in_h1:
            self._in_h1 = False
            self.h1_texts.append(" ".join("".join(self._h1_buf).split()))
        elif tag == "script" and self._in_ld:
            self._in_ld = False
            self.ldjson_raw.append("".join(self._ld_buf))

    def handle_data(self, data):
        if self._in_title and self.titles:
            self.titles[-1] += data
        if self._in_h1:
            self._h1_buf.append(data)
        if self._in_ld:
            self._ld_buf.append(data)


def route_for(path):
    rel = os.path.relpath(path, DIST).replace(os.sep, "/")
    rel = rel[:-len("index.html")] if rel.endswith("index.html") else rel
    r = "/" + rel.strip("/")
    return r if r != "/" else "/"


def load_pages():
    pages = {}
    for dirpath, _dirnames, filenames in os.walk(DIST):
        for fn in filenames:
            if not fn.endswith(".html"):
                continue
            p = os.path.join(dirpath, fn)
            with open(p, encoding="utf-8", errors="replace") as fh:
                raw = fh.read()
            ex = Extract()
            try:
                ex.feed(raw)
            except Exception as e:                    # noqa: BLE001
                fail("html-parse", f"{route_for(p)}: parser error {e}")
            pages[route_for(p)] = {"path": p, "raw": raw, "ex": ex}
    return pages


# ------------------------------------------------------------ the checks ----

def check_build_present(pages):
    if not os.path.isdir(DIST):
        fail("build-present", f"{DIST} does not exist — run `npm run build` first")
        return False
    if not pages:
        fail("build-present", f"no .html files under {DIST}")
        return False
    ok("build-present", f"{len(pages)} HTML files found in dist/")
    return True


def check_ds_store():
    hits = []
    for dirpath, _d, filenames in os.walk(DIST):
        for fn in filenames:
            if fn == ".DS_Store" or fn.startswith("._"):
                hits.append(os.path.relpath(os.path.join(dirpath, fn), ROOT))
    report("no-ds-store", hits, 1, "macOS junk files (expected 0)")


def check_single_h1(pages):
    bad = []
    for route, pg in sorted(pages.items()):
        if route in REDIRECT_STUBS:
            continue
        n = pg["ex"].h1_count
        if n != 1:
            bad.append(f"{route} has {n} h1 (expected exactly 1): {pg['ex'].h1_texts[:3]}")
    report("exactly-one-h1", bad, len(pages) - len(REDIRECT_STUBS), "pages")


def check_titles(pages):
    bad = []
    by_title = defaultdict(list)
    for route, pg in sorted(pages.items()):
        if route in REDIRECT_STUBS:
            continue
        ex = pg["ex"]
        if not ex.titles or not ex.titles[0].strip():
            bad.append(f"{route}: missing <title>")
            continue
        if len(ex.titles) > 1:
            bad.append(f"{route}: {len(ex.titles)} <title> tags")
        t = ex.titles[0].strip()
        by_title[t].append(route)
        if not (TITLE_MIN <= len(t) <= TITLE_MAX):
            bad.append(f"{route}: title {len(t)} chars (want {TITLE_MIN}-{TITLE_MAX}): {t!r}")
    for t, routes in by_title.items():
        if len(routes) > 1:
            bad.append(f"DUPLICATE title on {routes}: {t!r}")
    report("unique-sane-titles", bad, len(by_title), "titles")


def check_descriptions(pages):
    bad = []
    by_desc = defaultdict(list)
    for route, pg in sorted(pages.items()):
        if route in REDIRECT_STUBS:
            continue
        d = (pg["ex"].description or "").strip()
        if not d:
            bad.append(f"{route}: missing meta description")
            continue
        by_desc[d].append(route)
        if not (DESC_MIN <= len(d) <= DESC_MAX):
            bad.append(f"{route}: description {len(d)} chars (want {DESC_MIN}-{DESC_MAX})")
    for d, routes in by_desc.items():
        if len(routes) > 1:
            bad.append(f"DUPLICATE description on {len(routes)} routes {routes[:5]}: {d[:60]!r}...")
    report("unique-descriptions", bad, len(by_desc), "descriptions")


def check_canonical(pages):
    bad = []
    for route, pg in sorted(pages.items()):
        if route in REDIRECT_STUBS:
            continue
        # /404 is served under every unmatched URL, so a self-canonical is
        # meaningless there. It is noindex, which is the signal that matters.
        if "noindex" in (pg["ex"].robots or ""):
            continue
        c = pg["ex"].canonical
        if not c:
            bad.append(f"{route}: no rel=canonical")
            continue
        if not c.startswith(SITE):
            bad.append(f"{route}: canonical not absolute on {SITE}: {c!r}")
            continue
        if "undefined" in c or "//" in c[len("https://"):]:
            bad.append(f"{route}: malformed canonical {c!r}")
            continue
        # Self-referential: canonical path must equal this route (slash-insensitive).
        cpath = c[len(SITE):] or "/"
        if cpath.rstrip("/") != route.rstrip("/"):
            bad.append(f"{route}: canonical points elsewhere -> {cpath!r}")
    report("valid-self-canonical", bad, len(pages) - len(REDIRECT_STUBS), "canonicals")


def check_jsonld(pages):
    """Every JSON-LD block must parse, and must contain no 'undefined' / 'null' / empty URLs."""
    bad = []
    total = 0
    for route, pg in sorted(pages.items()):
        for i, raw in enumerate(pg["ex"].ldjson_raw):
            total += 1
            snippet = raw.strip()
            try:
                data = json.loads(snippet)
            except json.JSONDecodeError as e:
                bad.append(f"{route} block#{i}: invalid JSON ({e.msg} at pos {e.pos})")
                continue
            flat = json.dumps(data, ensure_ascii=False)
            if "undefined" in flat:
                m = re.search(r'"[^"]*undefined[^"]*"', flat)
                bad.append(f"{route} block#{i}: contains 'undefined' -> {m.group(0) if m else ''}")
            if '"null"' in flat or ": null" in flat:
                bad.append(f"{route} block#{i}: contains a null value")
            if re.search(r'"(url|item|@id)"\s*:\s*""', flat):
                bad.append(f"{route} block#{i}: empty url/item/@id")
            # Unrendered template expressions that leaked into the serialized JSON.
            # (Do NOT test for bare "{{"/"}}" — nested JSON objects produce those legitimately.)
            for tok in ("[object Object]", "$%7B", "${", "{{ ", " }}"):
                if tok in flat:
                    bad.append(f"{route} block#{i}: template leftover {tok!r}")
    report("jsonld-parses-and-is-clean", bad, total, "JSON-LD blocks")


def check_no_lorem(pages):
    bad = []
    for route, pg in sorted(pages.items()):
        low = pg["raw"].lower()
        for marker in LOREM_MARKERS:
            if marker.lower() in low:
                bad.append(f"{route}: contains {marker!r}")
                break
    report("no-lorem-ipsum", bad, len(pages), "pages")


def check_no_placeholder_images(pages):
    bad, stock = [], []
    for route, pg in sorted(pages.items()):
        for marker in PLACEHOLDER_IMAGE_MARKERS:
            if marker in pg["raw"]:
                bad.append(f"{route}: placeholder image source {marker!r}")
                break
        for marker in STOCK_IMAGE_MARKERS:
            if marker in pg["raw"]:
                stock.append(route)
                break
    report("no-placeholder-images", bad, len(pages), "pages")
    if stock:
        warn("stock-photography",
             f"{len(stock)} page(s) use licensed stock photos "
             f"({', '.join(stock[:4])}{'...' if len(stock) > 4 else ''}) — on a YMYL "
             f"health site, original photography is a materially stronger E-E-A-T signal")


def check_img_attrs(pages):
    """alt on every img; width+height on every img (CLS)."""
    missing_alt, missing_dims, total = [], 0, 0
    for route, pg in sorted(pages.items()):
        for a in pg["ex"].imgs:
            total += 1
            if "alt" not in a or not (a.get("alt") or "").strip():
                missing_alt.append(f"{route}: <img src={a.get('src', '?')[:70]!r}> has no alt")
            if not a.get("width") or not a.get("height"):
                missing_dims += 1
    report("img-alt", missing_alt, total, "img tags")
    if missing_dims:
        warn("img-dimensions",
             f"{missing_dims}/{total} <img> lack explicit width+height — CLS risk (target CLS <= 0.1)")
    else:
        ok("img-dimensions", f"{total} img tags carry width+height")


def check_internal_links(pages):
    """No internal href may 404, and none may point at a known redirect stub."""
    routes = {r.rstrip("/") or "/" for r in pages}
    static_ext = (".xml", ".json", ".txt", ".svg", ".pdf", ".png", ".jpg",
                  ".jpeg", ".webp", ".ico", ".css", ".js", ".avif", ".gif", ".webmanifest")

    broken = defaultdict(set)
    to_stub = defaultdict(set)
    checked = 0

    for route, pg in sorted(pages.items()):
        for href in pg["ex"].hrefs:
            if not href.startswith("/") or href.startswith("//"):
                continue
            target = href.split("#")[0].split("?")[0]
            if not target or target.lower().endswith(static_ext):
                continue
            if target.startswith("/_astro/"):
                continue
            checked += 1
            norm = target.rstrip("/") or "/"
            if norm not in routes:
                broken[target].add(route)
            elif norm in REDIRECT_STUBS:
                to_stub[target].add(route)

    bad = [f"{t} -> 404, linked from {len(s)} page(s) e.g. {sorted(s)[:4]}"
           for t, s in sorted(broken.items())]
    report("no-broken-internal-links", bad, checked, "internal links")

    bad2 = [f"{t} is a redirect stub, linked from {len(s)} page(s) e.g. {sorted(s)[:4]}"
            for t, s in sorted(to_stub.items())]
    report("no-links-to-redirect-stubs", bad2, checked, "internal links")


def check_trailing_slash_consistency(pages):
    """Internal hrefs must use the same slash form as the canonical/sitemap.

    Both /foo and /foo/ currently return 200 on this host, so a mismatch means
    Googlebot discovers two indexable URLs per page and burns crawl budget.
    """
    mismatches = defaultdict(set)
    total = 0
    for route, pg in sorted(pages.items()):
        canon = pg["ex"].canonical or ""
        canon_slashed = canon.endswith("/") and canon != SITE + "/"
        for href in pg["ex"].hrefs:
            if not href.startswith("/") or href.startswith("//") or href.startswith("/_astro/"):
                continue
            t = href.split("#")[0].split("?")[0]
            if not t or t == "/" or "." in t.rsplit("/", 1)[-1]:
                continue
            total += 1
            if canon_slashed and not t.endswith("/"):
                mismatches[t].add(route)
    if mismatches:
        sample = sorted(mismatches)[:8]
        warn("trailing-slash-consistency",
             f"{len(mismatches)} distinct internal targets are linked WITHOUT a trailing slash "
             f"while canonicals/sitemap use one (e.g. {sample}). "
             f"Both forms return 200 -> duplicate crawl paths.")
    else:
        ok("trailing-slash-consistency", f"{total} internal links match the canonical slash form")


def check_hreflang(pages):
    """hreflang set must not point every locale at the same URL."""
    bad = []
    for route, pg in sorted(pages.items()):
        hl = pg["ex"].hreflangs
        if not hl:
            continue
        targets = {href for _lang, href in hl}
        langs = [lang for lang, _href in hl]
        if len(langs) > 1 and len(targets) == 1:
            bad.append(f"{route}: {len(langs)} hreflang tags ({','.join(langs)}) all point at one URL")
    report("hreflang-not-self-collapsed", bad, len(pages), "pages")


def check_og(pages):
    """og:type must not be 'website' on articles/products; og:image must not be one shared logo."""
    bad = []
    images = defaultdict(list)
    for route, pg in sorted(pages.items()):
        if route in REDIRECT_STUBS:
            continue
        og = pg["ex"].og
        t = og.get("og:type", "")
        if route.startswith("/blog/") and route != "/blog/" and t != "article":
            bad.append(f"{route}: og:type={t!r}, expected 'article'")
        if og.get("og:image"):
            images[og["og:image"]].append(route)
    report("open-graph", bad, len(pages), "pages")
    # Shared OG art is a real weakness but needs new design assets, so it is a
    # warning rather than a deploy blocker.
    if images:
        biggest, routes = max(images.items(), key=lambda kv: len(kv[1]))
        if len(routes) > 5:
            warn("og-image-shared",
                 f"{len(routes)} pages share one og:image ({biggest[:60]}...) — "
                 f"commission per-section OG art to improve social and AI previews")


def check_noindex_leak(pages):
    """Nothing in the sitemap may be noindex; every redirect stub must be noindex."""
    bad = []
    for stub in REDIRECT_STUBS:
        pg = pages.get(stub)
        if pg and "noindex" not in (pg["ex"].robots or ""):
            bad.append(f"{stub}: redirect stub is NOT noindex")
    report("redirect-stubs-noindex", bad, len(REDIRECT_STUBS), "stubs")


def check_sitemap(pages):
    sm_path = os.path.join(DIST, "sitemap-0.xml")
    idx_path = os.path.join(DIST, "sitemap-index.xml")
    if not os.path.exists(sm_path):
        fail("sitemap-exists", "dist/sitemap-0.xml missing")
        return
    if not os.path.exists(idx_path):
        fail("sitemap-exists", "dist/sitemap-index.xml missing (robots.txt points at it)")
    xml = open(sm_path, encoding="utf-8").read()
    locs = re.findall(r"<loc>(.*?)</loc>", xml)
    ok("sitemap-exists", f"sitemap-0.xml lists {len(locs)} URLs")

    # A page carrying meta robots=noindex (e.g. /404) is correctly absent from
    # the sitemap — it is not an indexable page.
    indexable = {
        r for r in pages
        if r not in REDIRECT_STUBS
        and "noindex" not in (pages[r]["ex"].robots or "")
    }
    sm_routes = set()
    bad = []
    for loc in locs:
        if not loc.startswith(SITE):
            bad.append(f"sitemap <loc> off-site: {loc}")
            continue
        p = loc[len(SITE):] or "/"
        sm_routes.add(p.rstrip("/") or "/")

    norm_indexable = {r.rstrip("/") or "/" for r in indexable}
    missing = sorted(norm_indexable - sm_routes)
    extra = sorted(sm_routes - norm_indexable)
    for m in missing:
        bad.append(f"indexable page NOT in sitemap: {m}")
    for e in extra:
        bad.append(f"sitemap lists a URL with no built page: {e}")
    if len(locs) != len(indexable):
        bad.append(f"count mismatch: sitemap={len(locs)} vs indexable built pages={len(indexable)}")
    report("sitemap-matches-indexable-pages", bad, len(locs), "sitemap URLs")

    lastmods = set(re.findall(r"<lastmod>(.*?)</lastmod>", xml))
    if len(lastmods) == 1 and len(locs) > 5:
        warn("sitemap-lastmod",
             f"all {len(locs)} URLs share one identical <lastmod> ({lastmods.pop()}) — "
             f"this is `new Date()` in astro.config.mjs, not real content dates; Google discounts it")
    else:
        ok("sitemap-lastmod", f"{len(lastmods)} distinct lastmod values")


def check_404_page():
    if os.path.exists(os.path.join(DIST, "404.html")):
        ok("404-page", "dist/404.html present")
    else:
        fail("404-page", "no dist/404.html — create src/pages/404.astro "
                         "(host serves an unbranded default with no nav or WhatsApp CTA)")


def check_robots():
    p = os.path.join(DIST, "robots.txt")
    if not os.path.exists(p):
        fail("robots-txt", "dist/robots.txt missing")
        return
    txt = open(p, encoding="utf-8").read()
    bad = []
    if "Sitemap:" not in txt:
        bad.append("no Sitemap: directive")
    sm = re.search(r"Sitemap:\s*(\S+)", txt)
    if sm:
        want = os.path.join(DIST, sm.group(1).split("/")[-1])
        if not os.path.exists(want):
            bad.append(f"Sitemap: points at {sm.group(1)} but {want} was not built")
    # Only a `Disallow: /` inside the `User-agent: *` group is catastrophic.
    # Scoped blocks (AhrefsBot, SemrushBot, ...) are deliberate and fine.
    for block in re.split(r"\n\s*\n", txt):
        uas = [u.lower() for u in re.findall(r"User-agent:\s*(\S+)", block)]
        if "*" in uas and re.search(r"^\s*Disallow:\s*/\s*$", block, re.M):
            bad.append("robots.txt blocks the whole site for 'User-agent: *'")
    # A UA group with Crawl-delay but no Disallow blocks nothing.
    for block in re.split(r"\n\s*\n", txt):
        if "User-agent:" in block and "Crawl-delay:" in block and "Disallow:" not in block:
            uas = re.findall(r"User-agent:\s*(\S+)", block)
            bad.append(f"UA group {uas} sets Crawl-delay but no Disallow — it blocks nothing")
    report("robots-txt", bad, 1, "robots.txt")


def check_disclaimer(pages):
    """YMYL: every page that makes a health claim needs the medical disclaimer."""
    pat = re.compile(
        r"no sustituy|consulte a su m|no es un medicamento|resultados pueden variar",
        re.I)
    have, lack = 0, []
    for route, pg in sorted(pages.items()):
        if route in REDIRECT_STUBS:
            continue
        if pat.search(pg["raw"]):
            have += 1
        else:
            lack.append(route)
    total = len(pages) - len(REDIRECT_STUBS)
    report("ymyl-medical-disclaimer", lack, total, "pages carrying a disclaimer")


def check_fabricated_reviews(pages):
    """Reviews/ratings in schema must correspond to real, on-page, attributable reviews."""
    bad = []
    for route, pg in sorted(pages.items()):
        for raw in pg["ex"].ldjson_raw:
            if "aggregateRating" not in raw and '"Review"' not in raw:
                continue
            try:
                d = json.loads(raw)
            except json.JSONDecodeError:
                continue
            flat = json.dumps(d, ensure_ascii=False)
            ar = re.search(r'"reviewCount"\s*:\s*"?(\d+)"?', flat)
            if ar and int(ar.group(1)) <= 2:
                bad.append(f"{route}: aggregateRating with reviewCount={ar.group(1)} "
                           f"(Google policy: ratings must reflect real collected reviews)")
            for generic in ("Cliente MVV Natural", "Anonymous", "Usuario"):
                if f'"name": "{generic}"' in flat or f'"name":"{generic}"' in flat:
                    bad.append(f"{route}: review author {generic!r} is not a real identifiable person")
            body = re.search(r'"reviewBody"\s*:\s*"([^"]*)"', flat)
            if body and body.group(1) in (
                    "Producto de alta calidad, 100% natural. Recomendado.",):
                bad.append(f"{route}: hardcoded identical reviewBody across products")
    bad = sorted(set(bad))
    report("no-fabricated-reviews", bad, len(bad) or len(pages), "review/rating assertions")


def check_price_integrity(pages):
    """Offer.price '0' with InStock on a site that shows no prices is a mismatch."""
    bad = []
    for route, pg in sorted(pages.items()):
        for raw in pg["ex"].ldjson_raw:
            if '"Offer"' not in raw:
                continue
            try:
                d = json.loads(raw)
            except json.JSONDecodeError:
                continue
            flat = json.dumps(d, ensure_ascii=False)
            if re.search(r'"price"\s*:\s*"?0(\.0+)?"?', flat):
                bad.append(f"{route}: Offer.price is 0 while no price is shown on the page — "
                           f"drop `offers` or ship a real price")
    report("offer-price-integrity", sorted(set(bad)), len(pages), "pages")


# ------------------------------------------------------------------ main ----

def main():
    pages = load_pages()
    if not check_build_present(pages):
        print_summary()
        return 1

    check_ds_store()
    check_single_h1(pages)
    check_titles(pages)
    check_descriptions(pages)
    check_canonical(pages)
    check_jsonld(pages)
    check_no_lorem(pages)
    check_no_placeholder_images(pages)
    check_img_attrs(pages)
    check_internal_links(pages)
    check_trailing_slash_consistency(pages)
    check_hreflang(pages)
    check_og(pages)
    check_noindex_leak(pages)
    check_sitemap(pages)
    check_404_page()
    check_robots()
    check_disclaimer(pages)
    check_fabricated_reviews(pages)
    check_price_integrity(pages)

    return print_summary()


def print_summary():
    RESULTS.sort(key=lambda r: LEVELS[r[0]])
    print()
    print("=" * 72)
    print("  MVV Natural — post-build SEO gate")
    print("=" * 72)
    for level, check, msg in RESULTS:
        tag = {"FAIL": _c("31;1", "FAIL"),
               "WARN": _c("33;1", "WARN"),
               "PASS": _c("32", "PASS")}[level]
        print(f"  [{tag}] {check}: {msg}")
    fails = sum(1 for r in RESULTS if r[0] == "FAIL")
    warns = sum(1 for r in RESULTS if r[0] == "WARN")
    passes = sum(1 for r in RESULTS if r[0] == "PASS")
    print("-" * 72)
    print(f"  {passes} passed, {warns} warnings, {fails} failed")
    print("=" * 72)
    if fails:
        print(_c("31;1", "  DO NOT DEPLOY — fix the FAIL items above.\n"))
        return 1
    print(_c("32;1", "  Mechanical checks clean. (This does not mean it will rank.)\n"))
    return 0


if __name__ == "__main__":
    sys.exit(main())
