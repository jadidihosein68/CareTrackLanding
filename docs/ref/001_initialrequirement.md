# PRD: CareTrack Landing (Existing Solution)

## 1) Document purpose

This PRD captures the current implemented solution (reverse-engineered from code) for the CareTrack landing web application.

## 2) Product summary

CareTrack Landing is a content-rich marketing and education web app that promotes the CareTrack Android application and supports user self-service.

Primary website outcomes:
- communicate value of offline reptile care tracking
- drive Google Play downloads
- provide species guidance and workflow articles
- provide support, FAQ, and legal pages

## 3) Problem statement

Reptile keepers and breeders need a single, reliable place to:
- understand CareTrack value quickly
- access species-specific husbandry references
- follow practical logging/reminder workflows
- get product support and legal trust information

## 4) Target users

- Reptile keepers (beginner to intermediate)
- Gecko-focused hobbyists
- Multi-animal keepers and breeders
- Users evaluating CareTrack before install

## 5) Product goals

1. Convert visitors into app installers.
2. Build trust through clear educational content and legal transparency.
3. Increase retention and repeat visits through species and guide content.
4. Support SEO discoverability across species and workflow-intent queries.

## 6) Non-goals

- Full web-based care tracker (the app is the product for tracking)
- Veterinary diagnosis or medical advice
- Account-based or cloud-synced dashboard experience on web

## 7) Implemented information architecture

Top-level pages:
- Home (`/`)
- Learn (`/learn`)
- Guides (`/guides`)
- Playground Gecko (`/playground/gecko`)
- Playground Snake (`/playground/snake`)
- FAQ (`/faq`)
- Support (`/support`)
- Privacy (`/privacy`)
- Terms (`/terms`)

Programmatic detail pages:
- Learn category pages (`/learn/category/:categoryId`)
- Learn species pages (`/learn/species/:speciesId`)
- Guide article pages (`/guides/:guideId`)

Fallback:
- 404 page for unknown routes

## 8) Functional requirements (existing)

### 8.1 Landing page

- Show product value proposition and primary CTA to Google Play.
- Present feature cards for core benefits.
- Explain “how it works” in simple steps.
- Link to guides/species pages for SEO and user education depth.
- Include repeated CTA near bottom.

### 8.2 Learn library

- Show category cards and optional recently viewed species.
- Provide species pages with structured care sections:
  - overview
  - feeding behavior
  - important considerations
  - supplements/habitat
  - setup recommendations
  - when to seek professional help

### 8.3 Guides library

- List practical workflow articles.
- Allow deep article routes by slug.
- Associate related species links per article.

### 8.4 Playground

- Allow morph selection and visual preview.
- Explain educational/demo intent and non-predictive nature.
- Link users back into product value and guides.

### 8.5 FAQ and Support

- FAQ page with structured common answers.
- Support form with success/error states.
- Netlify-compatible form posting and fallback contact email.

### 8.6 Legal pages

- Privacy policy page.
- Terms of service page.

### 8.7 Navigation and shared shell

- Persistent top nav.
- Persistent footer with legal/help links.
- Cross-linking across core page groups.

## 9) Content requirements (existing)

- Species categories currently implemented: 4
- Species detail pages currently implemented: 7
- Guide article pages currently implemented: 10
- Content is source-controlled in TS data files.

## 10) SEO requirements (existing)

- Per-page metadata via `usePageMeta`.
- Canonical, OG, Twitter tags.
- JSON-LD structured data per page type.
- Build-time sitemap generation from data files.
- Route-level static HTML generation for indexed routes.
- Robots and sitemap discovery via `public/robots.txt`.

## 11) Analytics requirements (existing)

- Pageview tracking on route changes.
- GA support through env-configurable measurement ID.
- Additional hardcoded GA snippet present in base HTML template.

## 12) Non-functional requirements (existing)

- Static-host friendly SPA with fallback routing.
- Docker + Nginx deployability.
- `/health` endpoint for container health checks.
- Responsive behavior for mobile/desktop breakpoints.
- Motion-reduced support for decorative animations.

## 13) UX expectations (existing)

- Clean, card-based content with high readability.
- Emerald/slate brand treatment.
- Hero-first narrative and repeated CTA flow.
- Education + trust + conversion layered in one visit.

## 14) Constraints and assumptions

- Site promotes Android app via Google Play URL.
- Website states offline-first value, while tracking actions occur in app.
- Content pages include medical disclaimer language.
- Data model currently code-first (not CMS-driven).

## 15) Known gaps and opportunities

1. Playground traits system exists in code but not active in current page UX.
2. Multiple analytics/script entry points may cause duplicate tracking.
3. Some metadata and legal/footer dates are static and may drift over time.
4. Large embedded image strings in data file can impact maintainability/performance.

## 16) Success indicators (recommended for next iteration)

- CTR from landing CTA to Google Play.
- Organic traffic growth on species and guide routes.
- Support form completion rate and error rate.
- Engagement depth: pages/session across Learn + Guides + Playground.
