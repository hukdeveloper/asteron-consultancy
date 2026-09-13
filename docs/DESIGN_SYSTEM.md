# Design System — Asteron Global Consultancy

## 1. Brand Foundations

- **Brand name:** Asteron Global Consultancy
- **Tagline:** Guidance Beyond Borders
- **Positioning:** A trusted international digital consultancy office — premium but approachable, informative rather than salesy, calm rather than "urgent."
- **Logo concept (temporary, implemented as code):** combines an open book (education) and a compass/north star (guidance/direction) as an original inline SVG — `src/components/shared/SiteLogo.tsx`. No downloaded or generated asset. Comes in a `compact` variant (header) and a `full` variant with the tagline (footer, homepage); see README.md "Logo replacement procedure" for how to swap it for a commissioned mark later.
- **Tone of voice:** Clear, reassuring, plain-English, respectful of the seriousness of study-abroad decisions. Avoid hype language, fake urgency ("only 2 spots left!"), or absolute guarantees ("guaranteed visa approval").

## 2. Colour Roles

| Token      | Hex       | Role                                                                                                                                          |
| ---------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Primary    | `#0B1F3A` | Headers, primary buttons, navigation background, footer background — conveys trust/authority                                                  |
| Secondary  | `#0E9384` | Secondary actions, links, highlights, iconography accents                                                                                     |
| Accent     | `#E5A93D` | Sparing use: key CTAs, badges, highlights that need to stand out (e.g., "Book a Consultation") — implemented as the Button `variant="accent"` |
| Background | `#F7F9FC` | Page background, card backgrounds on dark sections inverted appropriately                                                                     |
| Text       | `#182230` | Primary body text                                                                                                                             |

Usage principles:

- Primary and Accent are not used together at high saturation in large areas — Accent stays reserved for calls to action and small highlight moments so it retains impact.
- All text/background pairings must meet WCAG AA contrast (4.5:1 for body text, 3:1 for large text/UI components) — verify Accent-on-Background and Secondary-on-Background combinations specifically before use for text.
- Sample/demo content uses a distinct neutral badge treatment (see Section 10) rather than brand accent colors, so it doesn't read as a "featured" highlight.

## 3. Typography Direction

- Typeface: Inter, self-hosted via `next/font/google` (`src/app/layout.tsx`) — a clean, modern, highly legible sans-serif. No separate serif display face was introduced; revisit only if a specific page genuinely needs it.
- Type scale is Tailwind's default font-size scale, mapped consistently by role rather than introducing new CSS variables:

  | Role               | Tailwind classes                                            | Used by                                                   |
  | ------------------ | ----------------------------------------------------------- | --------------------------------------------------------- |
  | Display            | `text-4xl sm:text-5xl`                                      | Not yet used (reserved for the future real homepage hero) |
  | H1                 | `text-3xl sm:text-4xl`                                      | `PageHeader`                                              |
  | H2                 | `text-2xl sm:text-3xl`                                      | `SectionHeading` (default level)                          |
  | H3                 | `text-xl sm:text-2xl`                                       | `SectionHeading` (`headingLevel="h3"`)                    |
  | Body large         | `text-base sm:text-lg`                                      | `PageHeader` description                                  |
  | Body               | `text-base`                                                 | Default paragraph text                                    |
  | Small / supporting | `text-sm`                                                   | `SectionHeading` description, footer body copy            |
  | Eyebrow            | `text-sm font-semibold tracking-wide uppercase` (teal-text) | `PageHeader`/`SectionHeading` eyebrow                     |
  | Button             | `text-sm font-medium`                                       | `Button` (all variants)                                   |

- Minimum body text size 16px equivalent (`text-base`); avoid text below 14px (`text-sm`) anywhere except non-essential meta labels.

## 4. Spacing Direction

- Consistent spacing scale (e.g., 4px base unit: 4/8/12/16/24/32/48/64) applied uniformly across components rather than ad hoc values.
- Generous whitespace around content blocks to support the "premium, uncluttered" feel — avoid dense template-like stacking of unrelated sections without breathing room.
- Consistent horizontal page gutters at all breakpoints, scaling up on larger viewports rather than letting content stretch edge-to-edge on desktop.

## 5. Layout Principles

- Mobile-first: design and build for narrow viewports first, then progressively enhance layout for tablet/desktop.
- Content-first hierarchy: informational clarity takes priority over decorative elements.
- Consistent page shell: sticky header, main content area, consistent footer — no per-page bespoke chrome.
- Grid-based listing pages (destinations, universities, scholarships, blog, events) with responsive column counts (1 column mobile → 2–3 tablet → 3–4 desktop as appropriate).
- Detail pages use a clear primary content column with supporting sidebar/summary panel on larger viewports (e.g., key facts, CTA) where content warrants it (destination, university, insurance product pages).

## 6. Component Inventory

Implemented (Phase 2), under `src/components/layout/` and `src/components/shared/` unless noted:

- **Shell:** `AnnouncementBar`, `SiteHeader` (+ `HeaderDesktopNav`, `HeaderMobileMenu`), `SiteFooter`, `MobileQuickActions` — see "Shared Website Shell" in docs/TECHNICAL_ARCHITECTURE.md.
- **Navigation:** sticky header with a restrained multi-column dropdown (Radix `DropdownMenu`, not a mega-menu), a Sheet-based mobile menu with `<details>`-based expandable groups, `Breadcrumbs`.
- **Layout primitives:** `Container`, `Section`, `PageHeader` (page h1), `SectionHeading` (in-page h2/h3), `SiteLogo` (`compact`/`full` variants), `SkipLink`, `ComingSoon` (shared placeholder for not-yet-built routes).
- **CTA elements:** shadcn `Button` — `default` (primary/navy), `accent` (gold, for the consultation CTA), `secondary`, `outline`, `ghost`, `destructive`, `link` variants; `MobileQuickActions` (Call, WhatsApp, Book Consultation).

Not yet built — introduced in Phase 3 as real content pages are built:

- **Cards:** DestinationCard, UniversityCard, ScholarshipCard, InsuranceProductCard, SuccessStoryCard, ArticleCard, EventCard, TeamMemberCard.
- **Forms:** text input, select, checkbox (consent), textarea, form section grouping, inline validation message, submit button with loading state — shadcn primitives for these already exist (`input`, `select`, `checkbox`, `textarea`, `label`) but no form is wired up yet.
- **Feedback/status:** toast/inline confirmation, empty-state block, skeleton loaders, sample/demo content badge (shadcn `alert`/`badge` primitives exist; the specific sample-content badge treatment from §12 is not yet applied anywhere since no sample content has been built).
- **Content blocks:** hero section, trust-indicators strip, process stepper, FAQ accordion, testimonial block, stat block, rich text renderer.

There is no admin-specific component inventory — this project does not build a custom admin UI (see docs/DECISIONS.md C-011).

## 7. Form Behavior

- Inline, field-level validation messages tied to inputs via `aria-describedby`; errors announced to assistive technology on submit attempt.
- Required fields clearly marked; consent checkboxes never pre-checked.
- Multi-section long forms (Eligibility Assessment) grouped into logical sections with clear section headings (and optionally a progress indicator) rather than one undifferentiated block.
- Submit buttons show a loading state and are disabled during submission to prevent duplicate submits.
- On success, the form is replaced (or followed) by a clear confirmation state, not just a toast that can be missed.
- On failure, entered data is preserved and a specific, actionable error message is shown.

## 8. Responsive Behavior

- Breakpoint strategy: mobile (base), tablet (~768px+), desktop (~1024px+), wide desktop (~1280px+) — exact breakpoints follow Tailwind defaults unless a business reason requires customization.
- Sticky header collapses to a compact mobile bar with hamburger menu; sticky mobile quick-actions bar (Call/WhatsApp/Book) appears only on mobile viewports, positioned to not obscure primary content or overlap footer CTAs.
- Tables/data-dense admin views adapt to card-based layouts on narrow viewports where a table would require horizontal scrolling.

## 9. Accessibility Rules

- WCAG 2.2 AA as the baseline target for color contrast, focus visibility, keyboard operability, and semantic structure.
- All interactive elements reachable and operable via keyboard alone, in a logical tab order; visible focus ring on all focusable elements (never `outline: none` without an equally visible replacement).
- All images require meaningful `alt` text (or explicit empty `alt=""` for decorative images); video requires captions/transcript where it conveys substantive information.
- Icon-only controls require an accessible name (`aria-label` or visually-hidden text).
- Color is never the sole indicator of state or meaning.

## 10. Motion Principles

- Motion is minimal and purposeful: used to communicate state changes (e.g., menu open/close, form submission feedback) rather than for decoration.
- No carousels/auto-rotating content unless a specific, documented case justifies it (none identified for V1 homepage — all "featured" sections use static grids or curated lists instead, per the homepage content order).
- Respect `prefers-reduced-motion`: any non-essential animation is disabled or reduced for users who request it.
- Avoid parallax, autoplay video backgrounds, and other heavy decorative motion patterns associated with generic templates.
- Implemented: header dropdowns and the mobile Sheet use shadcn/Radix's default short (~100–200ms) fade/slide transitions for open/close only; the global `prefers-reduced-motion: reduce` rule in `globals.css` collapses all animation/transition durations sitewide, including these. The announcement bar has no dismiss animation because it has no dismiss state (see docs/TECHNICAL_ARCHITECTURE.md "Shared Website Shell").

## 11. Image and Video Guidance

- All media in this phase and until real assets exist must be **appropriately licensed placeholder** images/video (no unlicensed stock, no fabricated "real" photos of specific universities/campuses presented as authentic unless verified).
- Every media asset stores attribution/licensing metadata via the `MediaAsset` entity (see [docs/CONTENT_MODEL.md](CONTENT_MODEL.md)).
- Hero and above-the-fold imagery should reflect the study-abroad/travel/education theme generally rather than implying a specific unverified partnership (e.g., avoid a placeholder photo that looks like a specific real university unless that partnership is verified).
- No image or video may be presented in a way that implies a real, verified partnership, campus, or person unless confirmed by the lead architect.

## 12. Temporary-Content Labelling Rules

Applies to: testimonials, student success statistics, visa success rates, university partnerships, certifications, awards, accreditations.

- Every instance of the above content types must display a visible **"Sample content — for illustration only"** (or equivalent approved wording) badge/label directly adjacent to the content, not buried in a footnote only.
- The label must be present in both the visual design and the accessible name/description (i.e., screen reader users must also perceive it, not just sighted users).
- Sample-content badges use a neutral, low-emphasis visual style (e.g., a muted outline tag) distinct from Accent-colored "featured/highlight" treatments, so demo content is never visually promoted as if it were a verified achievement.
- This labelling requirement remains in force until the lead architect explicitly confirms specific content has been replaced with verified, approved information — removal of a label is a content decision, not a styling decision, and should be logged in [docs/DECISIONS.md](DECISIONS.md) when it happens.
