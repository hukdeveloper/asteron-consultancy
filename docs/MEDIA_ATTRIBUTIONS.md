# Media Attributions — Asteron Global Consultancy

Tracks every non-original media asset used on the site: source, creator,
licence, and where it's used. See [docs/DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)
§11 for the image/video policy this log exists to support.

## Current Status (Phase 3 — Homepage; extended in Phase 4 — Study Abroad; extended in Phase 5 — Services and Insurance; hero/footer/section visuals substantially redesigned in Phase 10)

**Phase 10 update:** the mandatory visual redesign re-examined whether real photography could now be sourced. Network access was confirmed available in that session, and Unsplash's keyword-based "Source" endpoint (`source.unsplash.com`) — the only mechanism that could have supplied topically-relevant, properly-licensed images without a paid API key or manual browsing — was tested and returned `503` (confirmed dead/deprecated, not a transient failure). No other reliable image-search path exists in this environment. Per the redesign brief's own explicit fallback ("If network access is unavailable, use strong designed SVG/colour compositions and list the images still required"), the hero, service tiles, and footer were substantially redesigned using richer **original** SVG/CSS compositions instead — see docs/DECISIONS.md C-050. The table below is unchanged in substance from Phase 5, updated only where the placeholder itself changed shape.

**No downloaded photographs or third-party media are used anywhere on the
homepage, the Study Abroad hub/destination/study-level pages, the Services
hub/detail pages, or the Insurance hub/detail pages.** This was a
deliberate choice, not an oversight, and Phases 4 and 5 made the same call
for the same reason (see C-027 in [docs/DECISIONS.md](DECISIONS.md)) —
**no copyrighted insurer/provider logos, no fake university logos, and no
image that could suggest a verified partnership have been added either**:

- This environment has outbound network access to image CDNs (verified
  during Phase 3), but no image-search API — there is no reliable way to
  find, verify the licence of, and correctly attribute a _specific_,
  relevant Unsplash/Pexels photo without guessing at photo IDs from
  memory. Guessing at specific CDN URLs is exactly the "unstable
  random-image URL" hotlinking risk the brief asked to avoid, and a wrong
  guess would either break (404) or — worse — silently show an unrelated
  image with no real attribution trail.
- Per the brief's own fallback instruction ("If downloading is blocked:
  use polished local CSS or SVG placeholders"), the homepage hero and
  every card-based section instead use **original CSS/SVG compositions**:
  a gradient panel extending the `SiteLogo` compass/book motif, a dotted
  SVG travel path, and icon-based cards (Lucide icons, already an
  approved dependency — see `docs/DESIGN_SYSTEM.md` "Icon Use").
- This avoids all licensing/attribution risk while staying visually
  distinctive and on-brand (see `src/components/home/HeroVisual.tsx`).
- **Phase 4 addition:** each of the 6 destinations gets a distinct Lucide
  icon (the `visualIcon` content field — Landmark/Sun/TreePine/Building2/
  Cog/Leaf for UK/Australia/Canada/US/Germany/Ireland) on the same
  navy→teal gradient-panel treatment, rendered on the homepage destination
  cards, the hub's destination selector, and each destination page's hero.
  This deliberately avoids a "flag grid" look — `flagLabel` (e.g. "UK") is
  a small text badge alongside the icon, never the sole or primary
  identifier, per docs/DESIGN_SYSTEM.md.
- **Phase 5 addition:** the same treatment extends to Services (7 distinct
  Lucide icons via the `icon` content field) and Insurance (3 distinct
  icons via `visualIcon`) — no insurer logos, no university logos, and no
  photography, for the same reasoning as above.

## Assets Still To Be Replaced

The following remain **CSS/SVG placeholders**, pending real photography
being sourced, licensed, and attributed by the lead architect:

| Area                       | Current placeholder                                                                                                                                                                                                                                      | File                                                                                                                          |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Hero visual                | Layered gradient panel (ambient glow, compass ring, dotted travel route with destination pins, abstract skyline silhouette) + a floating consultation card — redesigned Phase 10, richer than the earlier single gradient panel but still no photography | `src/components/home/HeroVisual.tsx`                                                                                          |
| Destination cards/hero (6) | Navy→teal gradient band + per-destination Lucide icon (`visualIcon` content field, not a fixed icon)                                                                                                                                                     | `src/components/home/DestinationsSection.tsx`, `src/components/study-abroad/{DestinationHero,DestinationSelectorSection}.tsx` |
| Featured universities (4)  | Dashed neutral card + Lucide `Landmark` icon (explicitly required to stay generic/text-based even once replaced — no real institution logos without confirmed usage rights)                                                                              | `src/components/home/FeaturedUniversitiesSection.tsx`                                                                         |
| Success story avatars (3)  | Initials-in-circle (no photo) — kept even after real testimonials are added, unless a real student explicitly consents to a photo                                                                                                                        | `src/components/home/SuccessStoriesSection.tsx`                                                                               |
| Event card                 | Lucide `CalendarClock` icon                                                                                                                                                                                                                              | `src/components/home/EventSection.tsx`                                                                                        |
| Resource cards (3)         | Lucide `BookOpen` icon                                                                                                                                                                                                                                   | `src/components/home/ResourcesSection.tsx`                                                                                    |
| Service cards/hero (7)     | Navy→teal gradient band + per-service Lucide icon (`icon` content field — `Compass`, `GraduationCap`, `FileCheck2`, `IdCard`, `Award`, `Building2`, `Luggage`)                                                                                           | `src/components/services/{ServiceHero,ServiceCardGrid}.tsx`                                                                   |
| Insurance cards/hero (3)   | Navy→teal gradient band + per-insurance-type Lucide icon (`visualIcon` content field — `HeartPulse`, `Plane`, `Users`)                                                                                                                                   | `src/components/insurance/{InsuranceHero,InsuranceCategoriesSection}.tsx`                                                     |
| Team member cards (5)      | Neutral circular icon badge, no photo (`icon` content field — `Compass`, `FileCheck2`, `IdCard`, `ShieldCheck`, `Users`) — no real or fictional staff photo exists                                                                                       | `src/components/team/TeamGrid.tsx`                                                                                            |
| Success story avatars (3)  | No image at all — text-only cards (destination/study-level/subject/quote), consistent with the homepage's initials-only precedent, extended to omit even initials here                                                                                   | `src/components/success-stories/SuccessStoryCard.tsx`                                                                         |
| Event card icon            | Lucide `CalendarClock` icon (`icon` content field)                                                                                                                                                                                                       | `src/components/events/EventCard.tsx`                                                                                         |

## Image Replacement Procedure

When real photography is approved for a section above:

1. Source it from a properly licensed provider (Unsplash/Pexels licence,
   or a commissioned/owned photo) — never Google Images or an arbitrary
   website.
2. Download an optimized local copy into `public/images/`, using a
   descriptive filename (e.g. `public/images/hero-study-abroad.webp`),
   preferring WebP/AVIF.
3. Record it in the table below: source page URL, creator name, licence,
   and where it's used.
4. Replace the CSS/SVG placeholder in the relevant component with
   `next/image`, with accurate `alt` text and defined dimensions (or a
   fixed `aspect-ratio` wrapper) so no layout shift is introduced.
5. Keep the corresponding `isSampleContent`/sample-content badge (where
   one exists) until the underlying claim — not just the image — is
   verified; a real photo does not by itself make sample statistics or
   testimonials real (see `docs/DESIGN_SYSTEM.md` §12).

## Attribution Log

_Empty — no downloaded media in use yet. Add one row per asset once real
photography is sourced:_

| Asset (local path) | Source page | Creator | Licence | Used on |
| ------------------ | ----------- | ------- | ------- | ------- |
| —                  | —           | —       | —       | —       |
