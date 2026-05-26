# CareTrack UI/UX Guideline (Current UI Documentation)

## 1) Scope

This guideline documents the currently implemented UI for the CareTrack landing website.

It covers:
- layout and visual system
- navigation model
- page-by-page UI structure
- component behavior
- responsive and accessibility rules

## 2) Visual direction

- Brand tone: clean, practical, trustworthy, educational.
- Primary palette style: slate neutrals + emerald action color.
- Surface style: white/slate backgrounds with soft borders and rounded cards.
- UI density: medium; content-first and readable.

Common styling patterns:
- card corners: `rounded-xl` / `rounded-2xl`
- border emphasis: `border-slate-200`
- hover lift: `hover:shadow-lg` / `hover:shadow-xl`
- body gradient wrappers: `bg-gradient-to-b from-slate-50 to-white`

## 3) Typography model

- Heading scale is large on hero pages (`text-4xl` to `text-6xl`).
- Section headings commonly use `text-2xl` to `text-4xl`.
- Body copy commonly uses `text-slate-600` or `text-slate-700`.
- Italic treatment is used for scientific names and selective metadata.

## 4) Global layout structure

### 4.1 Shared shell

- `TopNav` is fixed to top with backdrop blur.
- `Footer` appears on all main routes.
- Main content applies top padding to clear fixed nav (`pt-24` / `pt-28`).

### 4.2 Navigation behavior

Top navigation links:
- Home
- Learn
- Playground dropdown with `Gecko`, `Snake`, and disabled `Coming soon` options for additional species
- Guides (hidden below `sm`)
- FAQ (hidden below `sm`)
- Support (hidden below `md`)

Back links:
- Many pages show contextual “Back to Home” or “Back to …” via `rightSlot`.
- `rightSlot` is hidden on small screens (`hidden lg:flex`).

### 4.3 Footer layout

Four-column structure on desktop:
- Brand summary
- Product links
- Help links
- Legal links

## 5) Primary interaction patterns

- Main conversion CTA: “Get it on Google Play” / “Download CareTrack”.
- Secondary exploration CTAs: Learn, Guides, FAQ, Support.
- Cards are often fully clickable via wrapped `Link`.
- Form interactions in support page include loading/success/error states.

## 6) Motion and decorative visuals

Landing page decorative motion:
- floating icons: `float-slow`, `float-medium`, `float-sway`
- blinking eyes for gecko/turtle/spider SVG details

Accessibility fallback:
- `prefers-reduced-motion: reduce` disables these animations.

## 7) Page-by-page UI documentation

## 7.1 Home (`/`)

Sections in order:
1. Hero with main value proposition, primary download CTA, trust line.
2. Feature grid (6 cards).
3. How-it-works 3-step block.
4. Practical article highlights (4 cards).
5. Offline-care rationale (3 cards + explanatory block).
6. Species exploration grid (data-driven cards).
7. Popular internal links (species links + guide links).
8. Final CTA block on emerald background.

Notable UI traits:
- Heaviest use of motion/decorative SVG elements.
- Repeated CTA strategy for conversion reinforcement.
- Large internal-link density for SEO and user pathing.

## 7.2 Learn Index (`/learn`)

Sections in order:
1. Page hero/title.
2. Warning/disclaimer callout.
3. “How to use Learn library” explanatory section.
4. Recently viewed species (conditional).
5. Category browsing grid (Gecko/Spider/Amphibian/Snake).
6. “About this content” trust section.

UI notes:
- Recently viewed cards are compact and image-led.
- Category cards use image overlay with gradient + text at bottom.

## 7.3 Learn Category (`/learn/category/:categoryId`)

Sections:
1. Back to Learn link + category hero title.
2. Category-wide hero image.
3. Species cards list for that category.

Missing category behavior:
- Centered “Category Not Found” fallback with return link.

## 7.4 Learn Species (`/learn/species/:speciesId`)

Sections:
1. Header with species common/scientific name.
2. Veterinary disclaimer.
3. Two-column main content:
   - species image
   - overview + multiple bullet sections
4. “Best Setup” split section (image + bullet list).
5. “When to seek professional help” warning section.

Missing species behavior:
- Centered “Species Not Found” fallback.

## 7.5 Guides Index (`/guides`)

Sections:
1. Hero title/description.
2. Article cards grid (data-driven).
3. Optional species chips per article.
4. Product-help box linking to FAQ/Support.

## 7.6 Guide Article (`/guides/:guideId`)

Sections:
1. Article header (updated date, title, summary).
2. Multi-section article body (paragraphs + optional bullet lists).
3. Footer with related species chips and continuation links.

Missing guide behavior:
- Centered “Guide Not Found” fallback.

## 7.7 Playground (`/playground/gecko`)

Sections:
1. Hero title and explanatory paragraph.
2. Two-column interaction area:
   - left: morph selector, selected profile panel, CTA block
   - right: sticky morph visualization (desktop)
3. Explanatory block about demo intent.

Responsive behavior:
- On mobile, visualizer appears in left flow and sticky panel is hidden.

Additional playground route:
- `/playground/snake` mirrors this layout with placeholder snake morph options and placeholder image mapping.

## 7.8 FAQ (`/faq`)

Sections:
1. Hero title/description.
2. FAQ item card list.
3. Help box linking to Support/Guides.

## 7.9 Support (`/support`)

Sections:
1. Hero/title copy.
2. Form fields:
   - Name
   - Email
   - Context textarea
3. Submit CTA and status messages.
4. Additional links to Learn/Guides/FAQ/Privacy/Terms.

Validation/feedback:
- Required fields.
- Submit disabled while sending.
- Success and error text states.

## 7.10 Privacy (`/privacy`) and Terms (`/terms`)

Shared characteristics:
- long-form legal text in readable `prose` style
- prominent last-updated date near top
- contact details section
- back-to-home link near bottom

## 7.11 NotFound (`*`)

- Centered message.
- Quick action buttons to Home, Learn, and Support.

## 8) Shared component behavior

### 8.1 Buttons/links

Primary styles:
- dark solid (`bg-slate-900 text-white`)
- emerald solid (`bg-emerald-600 text-white`)
- white or outlined alternatives for secondary actions

### 8.2 Cards

- Border-first style with subtle elevation on hover.
- Frequently used to encapsulate feature points and article summaries.

### 8.3 Imagery

- `ImageWithFallback` is used across most content images.
- Species/category cards rely heavily on large visual thumbnails.
- Alt text is descriptive and SEO-oriented.

## 9) Responsive rules observed

- Layouts shift between 1/2/3/4 column grids using `sm`, `md`, `lg` breakpoints.
- Top nav hides lower-priority links at smaller widths.
- Sticky right panel in Playground only activates on desktop.
- Hero sections remain readable on small screens via large spacing and stacked CTA layout.

## 10) Accessibility rules currently present

- Reduced-motion support for animated decorative elements.
- ARIA labels/landmarks on nav and some section components.
- Adequate contrast in most button/link combinations.
- Form labels explicitly connected to inputs in Support page.

## 11) UI consistency rules for future changes

1. Keep TopNav fixed and preserve top padding on all main pages.
2. Preserve card/border/radius system (`rounded-xl`, `border-slate-200`, light shadows).
3. Use emerald as primary action color and slate as structural neutral.
4. Keep section rhythm with generous vertical spacing (`py-16` to `py-20`).
5. Maintain explicit internal links between Learn, Guides, FAQ, and Support.
6. Continue disclaimer treatment on educational species content.
7. Keep CTA placement at both top and bottom for conversion-focused pages.

## 12) Content and UI quality checklist

Before shipping UI changes:
- Verify desktop/mobile layout for each updated section.
- Verify fixed nav does not overlap first content block.
- Verify links are discoverable without hover-only cues.
- Verify support form success and error states still render.
- Verify NotFound route remains accessible and useful.
- Verify reduced-motion mode for any newly added animation.
