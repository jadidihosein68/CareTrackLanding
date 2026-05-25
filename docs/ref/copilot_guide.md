# CareTrack Landing Code Findings (Copilot Guide)

## 1) What this project is

CareTrackLanding is a React + Vite single-page app that behaves like a multi-page marketing/content website for the CareTrack Android app.

It is not the mobile app itself. It is the public web property with:
- landing page
- learn library
- guide articles
- interactive gecko playground
- FAQ/support/legal pages

## 2) Core stack

- Runtime/UI: React 18, React Router
- Build: Vite 6
- Styling: Tailwind CSS v4 + custom CSS animation layer
- Icons: Lucide
- Motion: `motion/react`
- Hosting model: static build served by Nginx or Netlify-style SPA fallback

## 3) High-level architecture

- Entry: `src/main.tsx`
- App shell: `src/app/App.tsx`
- Routing: `src/app/AppRoutes.tsx`
- Page-level components live in `src/app/components/*`
- Content data is code-first in TypeScript:
  - `src/app/data/learn-data.ts`
  - `src/app/data/seo-guides.ts`
- SEO/meta abstraction:
  - `src/app/utils/usePageMeta.ts`
  - `src/app/utils/seo.ts`
- Analytics abstraction:
  - `src/app/utils/analytics.ts`
- Route prerendering and sitemap generation:
  - `scripts/generate-route-html.mjs`
  - `scripts/generate-sitemap.mjs`

## 4) Route inventory

Static routes:
- `/`
- `/learn`
- `/guides`
- `/playground/gecko`
- `/faq`
- `/support`
- `/privacy`
- `/terms`
- `*` -> NotFound

Dynamic routes:
- `/learn/category/:categoryId`
- `/learn/species/:speciesId`
- `/guides/:guideId`

Data-driven counts in current code:
- Categories: 4
- Species pages: 7
- Guide articles: 10

## 5) Shared UI shell patterns

- `TopNav` is fixed (`position: fixed`) and reused across pages.
- `Footer` is reused on all major pages.
- Most pages use large top spacing (`pt-24` or `pt-28`) to offset fixed nav.
- Visual style is mostly slate/emerald palette with card-heavy layout.
- Landing page adds decorative floating SVG animals with custom keyframe animations.

## 6) Content model

### Learn content (`learn-data.ts`)

Defines:
- categories (`gecko`, `spider`, `amphibian`, `snake`)
- species records with:
  - identity fields
  - summary
  - hero/setup images
  - care sections (overview, setup, feeding behavior, considerations, supplement/habitat notes, vet escalation guidance)

### Guide content (`seo-guides.ts`)

Defines long-form SEO/workflow articles with:
- slug `id`
- SEO title/description
- related species ids
- structured sections with paragraphs and optional bullet lists
- updated date string

## 7) SEO/meta system behavior

`usePageMeta` dynamically writes:
- title
- description
- robots
- OG tags
- Twitter tags
- canonical URL
- JSON-LD (by appending scripts to `<head>`)

Important behavior:
- JSON-LD scripts created by hook use `data-caretrack-jsonld="true"` and are cleared/replaced on navigation.
- Page components supply per-route metadata and structured data.

Build-time SEO layer:
- `generate-sitemap.mjs` generates `public/sitemap.xml` from data files.
- `generate-route-html.mjs` post-processes built HTML and prerenders route HTML into `dist/.../index.html`.

## 8) Analytics behavior

- `App.tsx` calls `initializeAnalytics()` on mount.
- `AppRoutes.tsx` tracks route changes with `trackPageView()` after initial route.
- Analytics is env-driven via `VITE_GA_MEASUREMENT_ID`.
- `index.html` also contains a hardcoded GA script (`G-ZRP6W57X8D`).

Copilot caution:
- If env GA is enabled, you may end up with duplicated GA init paths (hardcoded + runtime script loader).

## 9) Playground behavior

Current interactive scope:
- Morph selection is active.
- Trait selection UI component exists but is not wired on page.
- `geckoTraitOptions` and `mergeMorphAndTraitVisuals` are present but currently unused in `Playground.tsx` flow.
- Visual preview currently uses morph-specific images, not generated SVG trait compositing.

## 10) Support form behavior

- Netlify-compatible form attributes are present.
- Form submits via JS `fetch` to `/?submitted=support`.
- Hidden fallback form also exists in `index.html` for static host form processing.
- Error fallback asks user to email `info@osacore.com`.

## 11) Deployment/runtime

- Docker multi-stage build (Node build -> Nginx runtime).
- Nginx serves static assets and SPA fallback to `/index.html`.
- Health endpoint at `/health`.
- `deploy.sh` and compose file support VPS deployment with local port binding.

## 12) Important code findings and risks

1. GA duplication risk
- Hardcoded GA script in `index.html` plus runtime analytics initializer can duplicate tracking setup.

2. Structured-data duplication risk on home
- Landing page renders additional `<script type="application/ld+json">` in component body while metadata hook already injects JSON-LD in `<head>`.

3. Large inline/base64 image payloads in `learn-data.ts`
- Some species hero images are embedded as base64 strings, increasing code file size and bundle weight.

4. Partial playground implementation
- Trait system data/components exist but are not currently exposed in page UX.

5. Content freshness risk
- Footer copyright text is fixed to 2025.
- Some legal pages have static “Last updated” dates.

6. Dependency surface is much larger than active UI usage
- Many shadcn/radix components exist under `src/app/components/ui/*` and are unused by core landing flows.

## 13) Copilot edit playbook

When adding new species:
1. Add species record in `learn-data.ts`.
2. Ensure images exist or URLs are valid.
3. Confirm sitemap generation picks route.
4. Confirm learn/species route renders and metadata is valid.

When adding new guide:
1. Add guide object in `seo-guides.ts`.
2. Verify `/guides` list and `/guides/:id` page.
3. Regenerate sitemap and route HTML during build.

When adding new route/page:
1. Add route in `AppRoutes.tsx`.
2. Add `usePageMeta` in the page.
3. Add route metadata handling in `generate-route-html.mjs` if it needs special SEO/noscript treatment.
4. Verify nav/footer linking and NotFound behavior.

When changing global visuals:
1. Check `src/styles/index.css` animation classes.
2. Check `TopNav` fixed height impact on page top spacing.
3. Validate mobile breakpoints (`sm`, `md`, `lg`) because nav links hide progressively.

## 14) File map for fast orientation

- App boot: `src/main.tsx`
- Router: `src/app/AppRoutes.tsx`
- Home: `src/app/components/LandingPage.tsx`
- Learn index/category/species: `src/app/components/Learn*.tsx`
- Guides list/article: `src/app/components/Guides.tsx`, `GuideArticle.tsx`
- Playground: `src/app/components/Playground.tsx`
- FAQ/Support/Legal: `src/app/components/Faq.tsx`, `Support.tsx`, `PrivacyPolicy.tsx`, `TermsOfService.tsx`
- Shared shell: `src/app/components/shared/TopNav.tsx`, `Footer.tsx`
- Data sources: `src/app/data/learn-data.ts`, `seo-guides.ts`
- Meta/SEO utilities: `src/app/utils/usePageMeta.ts`, `seo.ts`
- Analytics: `src/app/utils/analytics.ts`
- Build SEO scripts: `scripts/generate-sitemap.mjs`, `scripts/generate-route-html.mjs`
