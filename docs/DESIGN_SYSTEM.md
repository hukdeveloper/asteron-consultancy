# Design System — Asteron Global Consultancy

## 1. Brand Foundations

- **Brand name:** Asteron Global Consultancy
- **Tagline:** Guidance Beyond Borders
- **Positioning:** A trusted international digital consultancy office — premium but approachable, informative rather than salesy, calm rather than "urgent."
- **Logo concept (temporary, implemented as code):** combines an open book (education) and a compass/north star (guidance/direction) as an original inline SVG — `src/components/shared/SiteLogo.tsx`. No downloaded or generated asset. Comes in a `compact` variant (header) and a `full` variant with the tagline (footer, homepage); see README.md "Logo replacement procedure" for how to swap it for a commissioned mark later.
- **Tone of voice:** Clear, reassuring, plain-English, respectful of the seriousness of study-abroad decisions. Avoid hype language, fake urgency ("only 2 spots left!"), or absolute guarantees ("guaranteed visa approval").

## 2. Colour Roles

**Palette reset (Phase 10B, 2026-09-14 — see docs/DECISIONS.md C-053/C-054).** The original navy/gold palette below was rejected as part of the "MANDATORY RESET" — replaced with a lighter, more editorial palette where white/soft neutrals dominate and deep color is reserved for emphasis only, not whole-page surfaces.

| Token                                 | Hex                                      | Role                                                                                                                                                                                                                                              |
| ------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ink (`brand-ink`)                     | `#14213D`                                | Deep-emphasis surfaces used sparingly — the footer, the Final CTA band's neighbor — not the whole-site background it was in Phase 10.                                                                                                             |
| Primary blue (`brand-blue`)           | `#3157F6`                                | Primary CTAs (`Button variant="accent"`), active nav state, links — the site's main call-to-action color. ~5.6:1 on white; safe for text/UI.                                                                                                      |
| Deep blue (`brand-blue-dark`)         | `#173B8F`                                | Hover state for primary blue; the Final CTA band's gradient end.                                                                                                                                                                                  |
| Teal (`brand-teal`)                   | `#12A594`                                | Eyebrow labels, secondary accents, checklist icons.                                                                                                                                                                                               |
| Coral (`brand-coral`)                 | `#FF7A59`                                | Controlled accent — background tint only (e.g. the Scholarship section motif). ~2.6:1 on white either direction: **never used as text/icon color directly on white or as white-on-coral text** — background tint behind dark ink text/icons only. |
| Pale-blue / pale-mint / warm surfaces | `#EEF4FF` / `#EAF9F5` / `#FFF7F1`        | Section background tints (Study Abroad intro, Insurance, Scholarships) — the mechanism for visual rhythm between sections instead of repeating the same white/gray band.                                                                          |
| Background                            | `#FFFFFF` (page), `#F7F9FC` (soft/muted) | Page background is pure white; the old soft off-white is now the `muted`/`soft-background` role only.                                                                                                                                             |
| Text                                  | `#172033`                                | Primary body text (`--foreground`)                                                                                                                                                                                                                |

Usage principles:

- White and soft neutrals dominate the page; ink/blue/teal/coral are used for emphasis, not as whole-section backgrounds by default — see the homepage section rhythm in Section 6 below.
- Coral is a controlled accent only: background tint behind dark text, never CTA fill color or text/icon color on white (fails WCAG AA either direction; verified by manual contrast calculation, not just visual judgment).
- Avoid gold/yellow as a primary CTA color (a Phase 10 defect); avoid excessive gradients or glassmorphism — the one intentional gradient in the current design (`FinalCtaSection`, `brand-blue` → `brand-blue-dark`) is used once, deliberately, to read as a bold closing moment distinct from the ink footer that follows it.
- All text/background pairings must meet WCAG AA contrast (4.5:1 for body text, 3:1 for large text/UI components) — verify any new accent-on-background combination specifically before use for text, not just for decorative shapes.
- Sample/demo content uses a distinct neutral badge treatment (see Section 10) rather than brand accent colors, so it doesn't read as a "featured" highlight.

## 3. Typography Direction

- Typeface: Inter, self-hosted via `next/font/google` (`src/app/layout.tsx`) — a clean, modern, highly legible sans-serif. No separate serif display face was introduced; revisit only if a specific page genuinely needs it.
- Type scale is Tailwind's default font-size scale, mapped consistently by role rather than introducing new CSS variables:

  | Role               | Tailwind classes                                                 | Used by                                                   |
  | ------------------ | ---------------------------------------------------------------- | --------------------------------------------------------- |
  | Display            | `text-4xl sm:text-5xl`                                           | Not yet used (reserved for the future real homepage hero) |
  | H1                 | `text-3xl sm:text-4xl`                                           | `PageHeader`                                              |
  | H2                 | `text-2xl sm:text-3xl`                                           | `SectionHeading` (default level)                          |
  | H3                 | `text-xl sm:text-2xl`                                            | `SectionHeading` (`headingLevel="h3"`)                    |
  | Body large         | `text-base sm:text-lg`                                           | `PageHeader` description                                  |
  | Body               | `text-base`                                                      | Default paragraph text                                    |
  | Small / supporting | `text-sm`                                                        | `SectionHeading` description, footer body copy            |
  | Eyebrow            | `text-sm font-semibold tracking-wide` (teal-text, sentence case) | `PageHeader`/`SectionHeading` eyebrow                     |
  | Button             | `text-sm font-medium`                                            | `Button` (all variants)                                   |

- Minimum body text size 16px equivalent (`text-base`); avoid text below 14px (`text-sm`) anywhere except non-essential meta labels.
- Avoid `uppercase`/all-caps text anywhere, including eyebrow labels — a sitewide `uppercase` transform on `SectionHeading`'s eyebrow was identified as a typography-rule violation and removed in Phase 10B (docs/DECISIONS.md C-059); write eyebrow content in sentence case and let `tracking-wide`/color/weight carry the "kicker" styling instead.

## 4. Spacing Direction

- Consistent spacing scale (e.g., 4px base unit: 4/8/12/16/24/32/48/64) applied uniformly across components rather than ad hoc values.
- Generous whitespace around content blocks to support the "premium, uncluttered" feel — avoid dense template-like stacking of unrelated sections without breathing room.
- Consistent horizontal page gutters at all breakpoints, scaling up on larger viewports: `px-4` (16px) mobile → `sm:px-6` (24px) tablet → `lg:px-10` (40px) desktop → `2xl:px-16` (64px) wide desktop — implemented once in `Container` (`src/components/layout/Container.tsx`), not repeated per section.

## 5. Layout Principles (Container variants — redesigned Phase 10, see docs/DECISIONS.md C-048)

- **`Container` is not one fixed width.** It takes a `variant` prop:
  - `content` (default, ~1152px / `max-w-6xl`) — most page sections, card grids, standard content blocks. Every pre-Phase-10 `<Container>` usage needed no change, since this is the default.
  - `wide` (~1600px / `max-w-[1600px]`) — the header, footer, announcement bar, and large full-bleed marketing bands (the homepage hero, the insurance section). Confident use of the available width at 1440px+ instead of the same narrow ceiling as body content — this is the fix for "header/footer content width too narrow."
  - `reading` (~720px / `max-w-3xl`) — reserved for long-form prose (article bodies, legal pages) where a narrower measure aids readability; not yet applied to existing article/legal templates (a follow-up opportunity, not done in Phase 10).
  - `fullBleed` (no max width) — an element whose own background/layout already controls edge-to-edge behaviour.
- Mobile-first: design and build for narrow viewports first, then progressively enhance layout for tablet/desktop.
- Content-first hierarchy: informational clarity takes priority over decorative elements.
- Consistent page shell: sticky header (`StickyHeaderShell`, a subtle scroll-aware shadow — see §6), main content area, consistent footer — no per-page bespoke chrome.
- **Section rhythm should vary, not repeat the same card-grid pattern section after section** (Phase 10 principle, in direct response to the "pages feel like stacks of text and cards" defect) — see `ServicesSection` (one large featured tile + compact supporting tiles), `HowItWorksSection` (a connected numbered journey with a route line), and `InsuranceSection` (icon-led checklist + a large decorative motif, not another bordered-card grid) for the patterns now in use on the homepage.
- Grid-based listing pages (destinations, universities, scholarships, blog, events) with responsive column counts (1 column mobile → 2–3 tablet → 3–4 desktop as appropriate).
- Detail pages use a clear primary content column with supporting sidebar/summary panel on larger viewports (e.g., key facts, CTA) where content warrants it (destination, university, insurance product pages).

## 6. Component Inventory

As of Phase 9 (release-candidate review). Every route now has a real implementation — see docs/ROUTE_INVENTORY.md for the complete route list and docs/IMPLEMENTATION_PLAN.md for which phase built what.

- **Shell** (`src/components/layout/`): `AnnouncementBar`, `SiteHeader` (+ `HeaderDesktopNav`, `HeaderMobileMenu`, `StickyHeaderShell` — a small client wrapper adding a subtle scroll-aware shadow, redesigned Phase 10), `SiteFooter` (redesigned Phase 10 — see docs/DECISIONS.md C-052), `MobileQuickActions` — see "Shared Website Shell" in docs/TECHNICAL_ARCHITECTURE.md.
- **Navigation:** sticky header with a restrained multi-column dropdown (Radix `DropdownMenu`, not a mega-menu), a Sheet-based mobile menu with `<details>`-based expandable groups (hidden below `2xl` — see docs/DECISIONS.md C-015/C-047), `Breadcrumbs`.
- **Layout primitives** (`src/components/layout/`, `src/components/shared/`): `Container`, `Section`, `PageHeader` (page h1), `SectionHeading` (in-page h2/h3, accepts `headingId`), `SiteLogo` (`compact`/`full` variants), `SkipLink`, `ComingSoon` (shared placeholder — only `/universities` still uses it), `SampleContentBadge`, `NoticeCallout` (prominent regulatory/integrity notices), `JsonLd` (safe JSON-LD serialization — see docs/TECHNICAL_ARCHITECTURE.md §9), `ProcessStepsSection`.
- **CTA elements:** shadcn `Button` — `default` (primary/navy), `accent` (gold, for consultation/insurance-quote CTAs), `secondary`, `outline`, `ghost`, `destructive`, `link` variants; `MobileQuickActions` (Call, WhatsApp, Book Consultation).
- **Homepage sections** (`src/components/home/`, one component per section, each a Server Component reading its content via `src/lib/content/home.ts`): `Hero` (redesigned Phase 10 — an asymmetric editorial composition, `Container variant="wide"`, not a plain image-beside-paragraph layout; see docs/DECISIONS.md C-049) + `HeroVisual` (an original, layered SVG/CSS composition — ambient glow, compass ring, dotted route with destination pins, an abstract skyline silhouette, a floating consultation card — no photography, see docs/MEDIA_ATTRIBUTIONS.md), `TrustStrip`, `ServicesSection` (redesigned Phase 10 — one large featured tile + five compact tiles, not six identical cards), `DestinationsSection`, `HowItWorksSection` (redesigned Phase 10 — a connected numbered journey with a decorative route line), `FeaturedUniversitiesSection`, `ScholarshipSection`, `SuccessStoriesSection`, `InsuranceSection` (redesigned Phase 10 — an icon-led checklist and a large decorative shield motif, not a bordered-card grid), `EventSection`, `ResourcesSection`, `FaqSection`, `FinalCtaSection`. `WhyChooseSection` was removed in Phase 10 (near-duplicate of `TrustStrip` — see docs/DECISIONS.md C-051); its content (`whyChooseReasons`) remains in the content layer, unused, for possible future reuse.
- **Study Abroad** (`src/components/study-abroad/`): `DestinationSelectorSection`, `KeyPointGrid`, `StudyLevelTemplate` (shared by undergraduate/postgraduate).
- **Services and Insurance** (`src/components/services/`, `src/components/insurance/`): `ServiceTemplate`, `ServiceCardGrid`, `InsuranceTemplate`, `InsuranceQuoteForm`.
- **Remaining public content** (`src/components/{team,success-stories,resources,events,scholarships,legal}/`): `TeamGrid`, `SuccessStoryCard`, `ResourceCard`, `ResourceArticleTemplate`, `EventCard`, `ScholarshipCard`, `LegalPageTemplate`.
- **Forms** (`src/components/{forms,consultation,contact,eligibility,insurance}/`): shared architecture — `FormField`, `FormErrorSummary`, `FormDemoNotice`, `FormSubmittedNotice`, `ConsentField` (`src/components/forms/`) — plus one component per form: `ConsultationForm`, `ContactForm`, `EligibilityForm`, `InsuranceQuoteForm`. shadcn primitives in use: `input`, `select`, `checkbox`, `textarea`, `label`, `button`. See docs/TECHNICAL_ARCHITECTURE.md §5 for the full architecture.
- **Icon resolution:** `src/lib/icons.ts` maps a plain icon-name string stored in content (e.g. `"Compass"`) to the actual Lucide component, with a safe fallback — content files never import React/Lucide directly.
- **Still not built:** a real `UniversityCard`/university detail template (no verified institution data exists — `/universities` remains the shared `ComingSoon` placeholder); toast/skeleton-loader primitives (not needed — every page is statically generated, so there is no client-side loading state to show); a rich-text renderer (article/legal body content is authored as plain paragraphs by design, not rich text — see `ArticleSection`/`LegalSection` in docs/CONTENT_MODEL.md).

There is no admin-specific component inventory — this project does not build a custom admin UI (see docs/DECISIONS.md C-011).

## 7. Form Behavior

- Inline, field-level validation messages tied to inputs via `aria-describedby`; errors announced to assistive technology on submit attempt (implemented via the shared `FormErrorSummary` + `useDemoFormSubmit` — see docs/TECHNICAL_ARCHITECTURE.md §5).
- Required fields clearly marked; consent checkboxes never pre-checked (`ConsentField`).
- Multi-section long forms (Eligibility Assessment) grouped into logical sections with clear section headings, implemented as a single page rather than a step-by-step wizard (docs/DECISIONS.md C-046).
- Submit buttons show a loading state and are disabled during submission to prevent duplicate submits.
- **On a valid submission (current track), the form is replaced by the required not-connected message** (`FormSubmittedNotice`), never a fake success/confirmation state — no submission provider exists yet in this track, and implying otherwise would misrepresent what happened to the visitor's information. A real success confirmation is a Track 2 concern, once a real `SubmissionAdapter` exists.
- On failure, entered data is preserved and a specific, actionable error message is shown.

## 8. Responsive Behavior

- Breakpoint strategy: mobile (base), tablet (~768px+), desktop (~1024px+), wide desktop (~2xl/1536px+, where the full desktop navigation appears — see docs/DECISIONS.md C-047) — exact breakpoints follow Tailwind defaults unless a business reason requires customization.
- Sticky header collapses to a compact mobile bar with hamburger menu below `2xl`; sticky mobile quick-actions bar (Call/WhatsApp/Book) appears only on mobile viewports, positioned to not obscure primary content or overlap footer CTAs.
- Tables/data-dense admin views adapt to card-based layouts on narrow viewports where a table would require horizontal scrolling. (No admin views exist in this track — this line describes the general principle for if/when Track 3 introduces one.)

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
- **Implemented (Phase 3):** `src/components/shared/SampleContentBadge.tsx` renders exactly this — an `outline`-variant `Badge`, so it never shares the accent-gold "featured" treatment. Applied to the Featured Universities section ("Sample university discovery experience"), every Success Story card ("Demo content"), and the sample Event card ("Demo content").

## 13. Phase 3 Implementation Notes

Recorded when the homepage was built (see [docs/DECISIONS.md](DECISIONS.md) for the full decision log):

- **No photographs are used anywhere on the homepage.** See [docs/MEDIA_ATTRIBUTIONS.md](MEDIA_ATTRIBUTIONS.md) for the full rationale (no reliable way to search/verify/attribute a specific stock photo in this environment) and what to do when real photography is approved. The hero and every card-based section instead use original CSS/SVG compositions and Lucide icons — this turned out to reinforce the brand's compass/path motif more directly than a generic stock photo would have.
- **Accent gold is used for exactly two CTA families**: "Book Free Consultation" (everywhere it appears — header, hero, mobile menu, final CTA) and "Request an Insurance Quote". Every other action uses `default` (navy), `outline`, or `secondary` — keeping gold rare and meaningful, per §2's usage principle.
- **Teal appears only as supportive emphasis**, never as a large fill: the trust-strip checkmarks, the "why choose" icon badges, section eyebrows (`text-brand-teal-text`), and the resources section's icon — consistent with the brief's "Teal primarily for supportive emphasis."
- **The Insurance section is the one homepage section with an inverted (navy) background.** `SectionHeading` hardcodes light-mode-oriented tokens (`text-foreground`, `text-brand-teal-text`) that don't adapt to a dark surface, so this section hand-rolls its own heading markup instead of reusing `SectionHeading` — a deliberate, narrow exception rather than a change to the shared component (which every other section still uses correctly on light/tinted backgrounds).
- **`SectionHeading` gained a `headingId` prop** so sections using `aria-labelledby` on their `<section>` element have something valid to point at — every homepage section's heading now carries a matching `id`.
- Sections alternate `bg-background` and `bg-muted/50` for the "alternating light and soft-tinted backgrounds" requirement; the Insurance section (`bg-primary`) is the one deliberate exception, functioning as a visual anchor partway down the page.
- The `ui/accordion.tsx` primitive could not be fetched from the shadcn registry (the CDN timed out repeatedly during this phase) and was hand-written directly against `radix-ui`'s `Accordion` export, matching the exact conventions of the other hand-maintained files in `src/components/ui/`. `tw-animate-css` (already a dependency) already ships the `animate-accordion-down`/`-up` keyframes this needed, so no new dependency was added.
