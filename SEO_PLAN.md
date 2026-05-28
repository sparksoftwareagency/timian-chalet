# SEO Improvement Plan

A staged plan to bring the Timian Chalet website in line with Google's [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide). Items are ordered by impact and grouped into PR-sized batches.

---

## Stage 1 — Page metadata foundations

**Goal:** Every URL serves a unique, accurate `<title>`, `<meta description>`, canonical, and hreflang set. This is the single biggest unlock — right now every page on the site shares the same title and description.

### 1.1 Add `metadataBase` and fix the placeholder root metadata
- **Where:** [app/layout.tsx](app/layout.tsx)
- **What:** Set `metadata.metadataBase = new URL('https://<prod-domain>')` so Open Graph image URLs resolve correctly and Next stops warning. Replace the hardcoded `"Mountain retreat website"` description.
- **Why:** Without `metadataBase`, relative OG image paths break on social shares. The placeholder description currently shows on `/` and any unmatched route.

### 1.2 Move `<html lang>` into the locale layout
- **Where:** [app/layout.tsx](app/layout.tsx) → [app/[lang]/layout.tsx](app/[lang]/layout.tsx)
- **What:** Render `<html lang={lang}>` and `<body>` inside the `[lang]` layout. The root layout becomes minimal (or passes through). Romanian and Hungarian pages will then correctly serve `lang="ro"` / `lang="hu"`.
- **Why:** `<html lang="en">` is currently hardcoded for all 30+ pages. Google uses this signal for language targeting and accessibility tools rely on it.

### 1.3 Add `generateMetadata` to every subpage
- **Where:** `page.tsx` in each of:
  - [about](app/[lang]/about/page.tsx)
  - [rooms](app/[lang]/rooms/page.tsx)
  - [rooms/[slug]](app/[lang]/rooms/[slug]/page.tsx)
  - [wellness](app/[lang]/wellness/page.tsx)
  - [experiences](app/[lang]/experiences/page.tsx)
  - [restaurant](app/[lang]/restaurant/page.tsx)
  - [culinary](app/[lang]/culinary/page.tsx)
  - [book-now](app/[lang]/book-now/page.tsx)
  - [local-cheese](app/[lang]/local-cheese/page.tsx)
- **What:** Each function reads the page document (already fetched anyway) and returns `title`, `description`, `alternates`, and `openGraph` from the `seoTitle`/`seoDescription` fields that already exist in [sanity/lib/queries.ts](sanity/lib/queries.ts).
- **Why:** Editors are already filling those fields in Sanity; they're just not wired to the page. Today every page is "Timian Chalet" / "Mountain retreat website" to Google.

### 1.4 Add canonical URLs and hreflang alternates
- **Where:** All `generateMetadata` functions (1.3) plus [app/[lang]/layout.tsx](app/[lang]/layout.tsx)
- **What:** For every page, set:
  ```ts
  alternates: {
    canonical: `/${lang}${path}`,
    languages: {
      en: `/en${path}`,
      ro: `/ro${path}`,
      hu: `/hu${path}`,
      'x-default': `/en${path}`,
    },
  }
  ```
- **Why:** Google needs hreflang to cluster the three locale versions of each page. Without it the locales compete with each other instead of reinforcing.

### 1.5 Add Open Graph image
- **Where:** Sanity schema ([siteSettings.ts](sanity/schemaTypes/siteSettings.ts)) + `generateMetadata` in [app/[lang]/layout.tsx](app/[lang]/layout.tsx)
- **What:** Add an `ogImage` image field to `siteSettings` (1200×630). Wire it through `openGraph.images` and `twitter.images`. Optionally allow per-page override later.
- **Why:** Layout currently sets OG title/description but no image, so social shares render with a blank preview card.

---

## Stage 2 — Discoverability

### 2.1 Add `sitemap.ts`
- **Where:** new file [app/sitemap.ts](app/sitemap.ts)
- **What:** Generate entries for `SITE_LOCALES × { '', '/about', '/rooms', '/wellness', '/experiences', '/restaurant', '/culinary', '/book-now', '/local-cheese' }` plus dynamic room slugs via `fetchRoomSlugs`. Include `alternates.languages` on each entry so the sitemap declares the hreflang cluster.
- **Why:** With 3 locales and ~10 routes per locale plus rooms, an explicit sitemap helps Google crawl efficiently and is the cleanest place to declare hreflang relationships.

### 2.2 Add `robots.ts`
- **Where:** new file [app/robots.ts](app/robots.ts)
- **What:** Allow all crawling, point to the sitemap, disallow `/admin` and `/api` and `/pdf-viewer` if not meant for indexing.
- **Why:** Explicit robots is cheap and prevents accidental indexing of the Sanity Studio at `/admin`.

### 2.3 Locale-aware root redirect
- **Where:** [app/page.tsx](app/page.tsx) → middleware
- **What:** Replace the static `redirect('/en')` with middleware that reads `Accept-Language` and routes `/` to the matching `SITE_LOCALE` (default `en`). Use a 308 (permanent) redirect.
- **Why:** Currently Romanian and Hungarian visitors land on English regardless of browser preference. A 307 also signals to Google that this might change, which is wrong.

---

## Stage 3 — Structured data

### 3.1 `LodgingBusiness` JSON-LD on every page
- **Where:** [app/[lang]/layout.tsx](app/[lang]/layout.tsx)
- **What:** Render `<script type="application/ld+json">` with `@type: "LodgingBusiness"` (or `Hotel`) populated from `siteSettings`: name, address, phone, email, geo coords, image, priceRange, sameAs (social profiles).
- **Why:** This is the highest-leverage single SEO improvement after meta tags. Unlocks rich results in Google: knowledge panel, map, contact info. Without it the chalet looks like a generic webpage to Google.

### 3.2 Per-room `Accommodation` schema
- **Where:** [app/[lang]/rooms/[slug]/page.tsx](app/[lang]/rooms/[slug]/page.tsx)
- **What:** Emit `@type: "Accommodation"` (or `HotelRoom`) JSON-LD with name, description, image, occupancy, amenityFeature.
- **Why:** Lets room pages show up in hotel-specific rich results.

### 3.3 `BreadcrumbList` on room detail pages
- **Where:** [app/[lang]/rooms/[slug]/page.tsx](app/[lang]/rooms/[slug]/page.tsx)
- **What:** JSON-LD with Home → Rooms → Room Name.
- **Why:** Google replaces the URL in search results with a breadcrumb trail when this is present.

---

## Stage 4 — Content semantics

### 4.1 Fix hero "headings" that aren't headings
- **Where:** [app/components/Hero.tsx](app/components/Hero.tsx) — `SvgWordmarkHeading` and `SvgTextHeading`
- **What:** Replace `<div role="img" aria-label="...">` with real `<h2>` (or `<p>` for the small lines). Keep the dynamic font-fitting JS — apply it to semantic tags instead. The currently-hidden phrases ("THE TIMIAN FEELING", "WHERE THE HEART FINDS HOME") become real indexable text.
- **Why:** These are the most visually prominent phrases on the homepage but crawlers see them as images. They're prime keyword-bearing content being thrown away.

### 4.2 Require alt text in Sanity image schema
- **Where:** [sanity/schemaTypes/shared.ts](sanity/schemaTypes/shared.ts) (or wherever image objects are defined)
- **What:** Add a validation rule on the `alt` field — required unless an explicit `decorative: true` flag is set. [SanityImage.tsx](app/components/SanityImage.tsx) already falls back to `""`, which is right for decorative images but means missing alts get silently swallowed today.
- **Why:** Google uses alt text to understand images. Accessibility benefit too.

### 4.3 Hero video poster + LCP
- **Where:** [app/components/Hero.tsx](app/components/Hero.tsx)
- **What:** Add `poster={heroSecondaryImage.url}` and `preload="metadata"` to the `<video>`. Consider lazy-mounting the video after first paint so the image (not the video) is the LCP element.
- **Why:** Core Web Vitals (LCP especially) is a confirmed Google ranking factor. The autoplaying video without a poster is almost certainly the LCP element today and is heavy.

### 4.4 Clean up dead links
- **Where:** [app/components/Footer.tsx:89](app/components/Footer.tsx:89)
- **What:** Replace `href="#"` social placeholders with real URLs or remove them until the profiles exist.
- **Why:** Empty/anchor-only links are flagged by SEO audits and erode trust.

---

## Out of scope for this plan

- Performance audit beyond LCP (Lighthouse pass, font preloading, third-party script audit)
- Internal linking strategy / anchor text review
- Backlink and off-page SEO
- Analytics/Search Console verification (assumed already in place; if not, add a separate task)
- Content optimization (writing better titles/descriptions in Sanity — that's editor work, not engineering)

---

## Suggested PR breakdown

1. **PR 1 — Metadata foundations** (Stage 1.1–1.5): one logical change, easiest to review, biggest ranking impact.
2. **PR 2 — Discoverability** (Stage 2): sitemap, robots, locale redirect middleware.
3. **PR 3 — Structured data** (Stage 3): JSON-LD for site, rooms, breadcrumbs.
4. **PR 4 — Semantics & performance** (Stage 4): hero headings, alt validation, video LCP, footer cleanup.

Stages can ship independently; later stages don't depend on earlier ones, but each builds on the previous in terms of quality of signal.
