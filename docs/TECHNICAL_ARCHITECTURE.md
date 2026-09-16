# Technical Architecture — Asteron Global Consultancy

> **Scope correction (2026-09-12):** the initial release is a **static website** — no database, no ORM, no authentication, no admin dashboard, no API server. This document was rewritten accordingly; the previous Prisma/PostgreSQL/Auth.js-based architecture is preserved conceptually in the "Future Tracks" sections as the target for later phases, not as current-track work. See [docs/DECISIONS.md](DECISIONS.md).

## Roadmap Tracks (context for every section below)

1. **Static website** (current) — everything in Sections 1–14 describes this track unless a section says otherwise.
2. **Form-service integration** (future) — Section 15.
3. **Strapi CMS integration** (future) — Section 16.
4. **Advanced portal features** (future, speculative, not designed) — Section 17.

## 1. Application Architecture

- **Framework:** Next.js App Router, TypeScript throughout, statically generated (SSG) — no server-side database queries, no server-side sessions.
- **Rendering strategy:** Server Components by default. Client Components only where interactivity is required (forms, menus, any small interactive widget). Nearly the entire site can be static HTML with minimal client JS.
- **Route groups:** A single `(public)` route group holds all pages (see [docs/SITEMAP.md](SITEMAP.md)). There is no `(admin)` route group and none is planned — content management happens outside the Next.js app (Track 3, via Strapi's own admin).
- **Content layer** (replaces the "data access layer" from the original database-backed design):
  - `src/types/content.ts` — shared content types, shaped to match the target Strapi content model in [docs/CONTENT_MODEL.md](CONTENT_MODEL.md).
  - `src/content/` — local typed TypeScript content objects; the current "source of truth."
  - `src/lib/content/` — the content-access layer. Every function here is `async` and returns a `Promise`, even though the current implementation is synchronous local data — this is what lets Track 3 swap in real Strapi API calls without changing a single call site.
  - **Rule:** pages and components import from `src/lib/content/*`, never from `src/content/*` directly.
- **Component layers:**
  - `components/ui/` — low-level, reusable, presentation-only components (shadcn/ui primitives).
  - `components/layout/`, `components/shared/` — composed, feature-level components (e.g., `Container`, `PageHeader`, future `DestinationCard`).
  - Route-level `page.tsx`/`layout.tsx` files compose components and fetch content via the content-access layer.

### Shared Website Shell (Phase 2)

`src/app/(public)/layout.tsx` wraps every public route in one shell, composed top to bottom:

1. `AnnouncementBar` — a server component; renders `null` (nothing) if `siteConfig.announcementBarEnabled` is `false` or the current `AnnouncementContent.enabled` is `false`. No dismiss state — see docs/DECISIONS.md for why a persisted-dismiss control was deliberately not built.
2. `SiteHeader` — a server component that fetches nav/CTA/site content once, then renders:
   - `HeaderDesktopNav` (Client Component; needs `usePathname` for active-link state) — hidden below `xl`. Items with `children` open an accessible Radix `DropdownMenu` (click/keyboard-triggered, not hover-only).
   - `HeaderMobileMenu` (Client Component; owns the Sheet's open state) — hidden at `xl` and above. Built on shadcn's `Sheet` (Radix `Dialog`), so focus trapping, `Escape`-to-close, and focus return on close are handled by the library. Grouped items use native `<details>/<summary>` — keyboard-operable and exposed to assistive tech with no extra ARIA wiring.
   - The **`xl` breakpoint (1280px), not `lg` (1024px), is load-bearing**: with 9 top-level items plus a CTA and logo, `lg` measured 185px of horizontal overflow at exactly 1024px width in manual testing. Do not lower this breakpoint without re-checking for overflow at 1024–1279px.
3. `<main>` — the page's own content. This is the **only** `<main>` on any public page; the root layout (`src/app/layout.tsx`) intentionally renders no `<main>` of its own so nested route groups don't duplicate the landmark. A future route group with a different shell (e.g. a standalone campaign landing page) defines its own `<main>` without conflicting with this one.
4. `SiteFooter` — a server component: brand summary + social links, data-driven link groups (`getFooterLinkGroups()`), contact details (`getSiteContent().contact`), legal links (`getLegalLinks()`), and a disclaimer paragraph.
5. `MobileQuickActions` — a server component; renders `null` if `siteConfig.mobileQuickActionsEnabled` is `false`. Fixed to the viewport bottom, `md:hidden`, respects `env(safe-area-inset-bottom)`. When enabled, the same layout adds `pb-16 md:pb-0` to `<main>` so the bar never overlaps page content or the footer.

## 2. Route Organization

```
app/
  layout.tsx                         # root layout: html/body, fonts, metadata, skip link
  not-found.tsx                      # implemented
  error.tsx                          # implemented
  global-error.tsx                   # implemented
  (public)/
    layout.tsx                       # the shared shell — see above
    page.tsx                         # real homepage (Phase 3)
    about/                           # real (Phase 6)
    team/                            # real (Phase 6) — role-based placeholders only
    study-abroad/
      page.tsx                       # real hub (Phase 4)
      undergraduate/page.tsx         # real, shared StudyLevelTemplate (Phase 4)
      postgraduate/page.tsx          # real, shared StudyLevelTemplate (Phase 4)
      [destination]/page.tsx         # real, one shared template; generateStaticParams from src/content/destinations.ts (Phase 4, 6 destinations)
    universities/                    # ComingSoon
    services/
      page.tsx                       # real hub (Phase 5)
      [slug]/page.tsx                # real, one shared ServiceTemplate; generateStaticParams from src/content/services.ts (Phase 5, 7 services)
    scholarships/
      page.tsx                       # real hub (Phase 6) — polished empty state, content-template records only
      [slug]/page.tsx                # real, one shared template; generateStaticParams from src/content/scholarships.ts (Phase 6, 2 template records)
    insurance/
      page.tsx                       # real hub (Phase 5)
      [slug]/page.tsx                # real, one shared InsuranceTemplate; generateStaticParams from src/content/insurance.ts (Phase 5, 3 insurance types)
    success-stories/                 # real (Phase 6) — empty state + demo example journeys
    resources/
      page.tsx                       # real hub (Phase 6)
      [slug]/page.tsx                # real, one shared ResourceArticleTemplate; generateStaticParams from src/content/resources.ts (Phase 6, 6 articles)
    events/
      page.tsx                       # real (Phase 6) — one sample entry, schedule to be announced
      [slug]/page.tsx                # real, one shared template; generateStaticParams from src/content/events.ts (Phase 6)
    faq/                             # real (Phase 6) — 8 categories; replaces the never-built resources/faqs stub
    contact/                         # real (Phase 6, refactored Phase 7) — ContactForm on the shared form architecture
    book-consultation/               # real, client-side-only demo form (Phase 7) — ConsultationForm
    check-eligibility/               # real, informative-only content (Phase 4) + EligibilityForm (Phase 7)
    insurance-quote/                 # real, client-side-only demo form (Phase 5, refactored Phase 7)
    legal/
      privacy-policy/                # real draft (Phase 6) — see docs/DECISIONS.md "Legal Draft Status"
      terms-of-service/              # real draft (Phase 6)
      cookie-policy/                 # real draft (Phase 6)
      disclaimer/                    # real draft (Phase 6)
```

Every remaining `ComingSoon` route renders `src/components/shared/ComingSoon.tsx` — one shared placeholder component, not duplicated markup per route — with a route-specific title and breadcrumb. Each later phase replaces a batch of these with real content, one at a time, without needing to touch the shell or the other routes.

No `api/` directory and no `(admin)` group exist or are planned for this track — there is nothing server-side to expose an API for yet.

## 3. Content Access Approach (current track)

- Every content type gets a local typed object under `src/content/` and a corresponding `async` accessor under `src/lib/content/`. Implemented so far: `getSiteContent()` (identity + contact), `getHeaderNavigation()` / `getHeaderPrimaryCta()` / `getFooterLinkGroups()` / `getLegalLinks()` (navigation), `getAnnouncement()`, `getSocialLinks()`, `getDestinations()` / `getDestinationBySlug(slug)`, `getServices()` / `getFeaturedServices()` / `getServiceBySlug(slug)` / `getServicesByCategory()` / `getRelatedServices()` / `getServicesHubContent()`, `getInsuranceServices()` / `getInsuranceServiceBySlug(slug)` / `getInsuranceHubContent()` / `getInsuranceGlobalDisclosure()`, `getStudyAbroadHubContent()` / `getStudyLevelPageContent(slug)`, `getEligibilityContent()`, `getTeamMembers()`, `getAboutContent()`, `getSuccessStories()` / `getSuccessStoriesIntro()`, `getResourceArticles()` / `getResourceArticleBySlug(slug)` / `getFeaturedResourceArticle()` / `getResourceCategories()` / `getRelatedResourceArticles()` / `getResourcesHubContent()`, `getEvents()` / `getEventBySlug(slug)` / `getEventsIntro()`, `getScholarships()` / `getScholarshipBySlug(slug)` / `getScholarshipsIntro()`, `getFaqCategories()`, `getContactMethods()` / `getOfficeLocation()` / `getContactPageContent()`, `getLegalPages()` / `getLegalPageBySlug(slug)` / `getLegalDraftNotice()`.
- Dynamic routes (e.g., `study-abroad/[destination]`, `services/[slug]`, `insurance/[slug]`) use `generateStaticParams()` reading from the content-access layer to enumerate all pages at build time — everything is prerendered, nothing is fetched at request time. An unknown slug (one not returned by `generateStaticParams`) calls `notFound()` rather than rendering a generic placeholder, so a truly unmapped URL still reaches the real 404 page.
- Destination/service/insurance navigation entries (dropdown children) are generated from `src/content/{destinations,services,insurance}.ts` in `src/content/navigation.ts` rather than duplicated by hand — adding a destination/service/insurance type automatically updates the header, and its `[slug]`/`[destination]` route picks it up via `generateStaticParams` without further wiring.
- `src/config/site.ts` holds structural feature toggles (`announcementBarEnabled`, `mobileQuickActionsEnabled`) — distinct from both `src/content/*` (marketing content) and `src/lib/env.ts` (environment variables). This is where "disable the announcement bar" or "disable mobile quick actions" is implemented.
- No pagination/filtering infrastructure is needed while content volume is small and hand-authored; add it only if a listing page's content volume genuinely requires it, and implement it client-side over the already-static dataset (no server-side query layer exists to filter in).

## 4. Authentication and Authorization

**Not applicable to the current track.** There is no admin surface, no staff login, and no authenticated area anywhere in the static website. Do not add Auth.js, sessions, or any auth-adjacent code until Track 3 (Strapi) introduces a real need for it — and even then, Strapi ships its own admin authentication; this project would not build its own.

## 5. Forms and Validation (current track: UI only)

- **Client-side:** React Hook Form + Zod resolvers for all four forms — Consultation (`src/components/consultation/ConsultationForm.tsx`, schema at `src/lib/validation/consultation.ts`), Check Eligibility (`src/components/eligibility/EligibilityForm.tsx`, schema at `src/lib/validation/eligibility.ts`), Insurance Quote (`src/components/insurance/InsuranceQuoteForm.tsx`, schema at `src/lib/validation/insuranceQuote.ts`), and Contact (`src/components/contact/ContactForm.tsx`, schema at `src/lib/validation/contactForm.ts`) — all implemented (Phase 5 for Insurance Quote, Phase 6 for Contact, Phase 7 for the remaining two and for consolidating all four onto one shared architecture).
- **No server-side persistence exists in this track.** There is no database and no API route to submit to.
- **Shared form architecture (Phase 7), under `src/types/forms.ts`, `src/lib/forms/`, and `src/components/forms/`:**
  - `SubmissionAdapter`/`SubmissionResult`/`SubmissionStatus` (`src/types/forms.ts`) is the interface every form's submission goes through: `submit(payload: unknown): Promise<SubmissionResult>`, where `SubmissionResult` is a discriminated union of `success` / `validation-error` / `not-configured` / `service-error`.
  - `notConfiguredAdapter` (`src/lib/forms/adapters/notConfiguredAdapter.ts`) is the only Track 1 implementation. It makes **no network request, writes nothing to any storage, and logs nothing** — verified by unit tests spying on `fetch`/`console.log`/`Storage.prototype.setItem` — and always resolves `{status: "not-configured"}`. It replaces the earlier Phase 5 `submitDemoForm()` (see docs/DECISIONS.md C-043).
  - `src/lib/forms/messages.ts` centralizes every verbatim string shown to the user (demo notice, not-connected message, consent label, sensitive-data warning, consultation preference-only note, error-summary heading), so the required wording is defined once and cannot drift between forms.
  - Shared components (`src/components/forms/`): `FormField` (label/required-indicator/description/error wrapper), `FormErrorSummary` (`role="alert"` summary linking to each invalid field), `FormDemoNotice` (the demo-mode badge + notice + sensitive-data warning shown at the top of every form), `FormSubmittedNotice` (the not-connected message plus real `tel:`/`mailto:`/`wa.me` links, replacing the form after a valid submission), and `ConsentField` (the unchecked-by-default consent checkbox linking to `/legal/privacy-policy`).
  - `useDemoFormSubmit(submitCount, hasErrors)` (`src/lib/forms/useDemoFormSubmit.ts`) is the shared hook every form calls: it owns the submitted-state flag, calls `notConfiguredAdapter.submit()` on a valid submission, and moves focus to the error summary on every failed submit attempt via `formState.submitCount` (so assistive technology re-announces it even when the same fields are still invalid).
  - `describedBy()` (`src/lib/forms/describedBy.ts`) and `dateUtils.ts`'s `todayIsoDate()`/`isBeforeToday()`/`isAfterToday()` are the remaining shared utilities — the date helpers compare `YYYY-MM-DD` strings built from a `Date`'s local year/month/day parts rather than `toISOString()`, deliberately avoiding the UTC-conversion date-shift bug that a naive "reject past dates" check would have near local midnight.
  - This is deliberately a small set of composable pieces, not a schema-driven form-builder — a form still writes its own field layout and its own Zod schema; only the cross-cutting concerns (submission, messaging, error display, consent, focus management) are shared.
- **Conditional fields (Eligibility form, Phase 7):** English-test fields (`englishTestType`/`englishTestScore`) and study-gap details (`studyGapDetails`) are hidden in the UI until their toggle checkbox is checked, and validated conditionally via one `.superRefine()` on `eligibilitySchema` — never unconditionally required, never silently ignored. `cleanEligibilityPayload()` clears a hidden field's stale value before a valid payload would reach an adapter, so a value typed and then hidden again cannot leak into any future processing.
- **Accessible error handling:** inline field-level errors tied via `aria-describedby`, an `aria-invalid` flag per field, a `role="alert"` error summary linking to each invalid field, and `formState.submitCount`-driven focus management so a screen reader re-announces the summary on every failed submit attempt (not just the first). Required-field indicators are never color-only (an explicit `*` plus label text, not a red asterisk alone).
- **Form Security Preparation (documented now, not implemented — no form makes any request yet):** once Track 2 wires a real submission adapter, that boundary will need — mirroring each Zod schema server-side (client-side validation is never trusted alone), rate limiting per IP/session, bot protection (honeypot field and/or a timing heuristic; CAPTCHA only if abuse is actually observed), CSRF protection appropriate to the chosen transport, spam filtering, request-size limits, TLS-only transport, data minimization (store only the fields each form actually needs), a documented retention period (see docs/DECISIONS.md U-006), role-based access controls over stored submissions, an audit trail of who accessed/actioned a submission, and redaction of personal fields from any application logs. None of this exists today because there is nothing to protect — no form transmits data — but the requirement is recorded here so Track 2 does not ship without it. See docs/DECISIONS.md U-015.
- **Track 2 will:** implement a real adapter body behind the same `SubmissionAdapter`/`SubmissionResult` interface (e.g., posting to a third-party form/email service or a small serverless function), implement the Form Security Preparation items above at that boundary, and remove the demo-mode messaging — no form component should need to change beyond swapping which adapter it calls.
- **Track 3 will:** optionally route submissions into Strapi as content entries if that becomes the chosen lead-storage mechanism, superseding whatever Track 2 adapter was used.

## 6. Media (current track)

- Local placeholder media only, under `public/images/` and `public/videos/`, served via Next.js image optimization (`next/image`) with responsive sizing and lazy loading (excluding above-the-fold hero media).
- No media storage abstraction/provider is needed yet since there is no dynamic upload path — all media ships with the repository.
- Every media file must be appropriately licensed placeholder content per [docs/DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) §11; track attribution in a comment or a lightweight local manifest if a file requires it.

## 7. Email

**Not applicable to the current track** — there is nothing server-side to send email from. An email-provider abstraction becomes relevant only once Track 2 needs to notify staff of a real submission.

## 8. Security (current track)

- Input validation on every form via Zod, client-side (no server boundary exists yet to also validate at).
- Output encoding handled by React/Next defaults.
- Standard security headers set in `next.config.ts`: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`.
- **Content-Security-Policy is intentionally deferred**, not implemented. A meaningful CSP needs per-request nonces (via a `proxy.ts`, Next 16's renamed middleware) and dynamic rendering on nonce-consuming pages — that architecture isn't needed yet for a static site and would add complexity without a corresponding attack surface to protect. Revisit once Track 2/3 introduce dynamic behavior worth protecting with a nonce-based CSP. Re-confirmed still the right call in the Phase 8 audit — see docs/DEPLOYMENT.md §6.
- No secrets exist in the current track beyond `NEXT_PUBLIC_SITE_URL` (not sensitive); environment-variable validation (`src/lib/env.ts`, Zod-backed) still applies as a general discipline. Verified in Phase 8 that no other `process.env` access exists anywhere in `src/`.
- No database, no admin, no server-side personal-data handling — the attack surface is deliberately minimal in this track.
- **Dependency audit (Phase 8):** `npm audit` reports 0 vulnerabilities. `npm outdated` lists 8 packages behind latest, none of them a security advisory — see docs/DECISIONS.md's Phase 8 changelog entry for the full classification (patch/minor bumps considered low-risk; major-version bumps for `eslint`, `@vitejs/plugin-react`, `@types/node`, and `typescript` deferred pending dedicated compatibility testing, not performed as a side effect of this audit).

## 9. SEO

- Centralized metadata via the Next.js Metadata API (`generateMetadata`), sourced from content's SEO fields (`metaTitle`, `metaDescription`) via the content-access layer, with a unique title/description and `alternates.canonical` on every route.
- **Structured data (implemented, Phase 8):** `Organization` + `WebSite` JSON-LD rendered once, site-wide, in the root layout (`src/app/layout.tsx`, built by `buildOrganizationJsonLd`/`buildWebSiteJsonLd` in `src/lib/structuredData.ts`); `BreadcrumbList` on every page (`buildBreadcrumbListJsonLd`) and `FAQPage` wherever a page's visible FAQ content matches exactly (`buildFaqPageJsonLd`). No `Review`/`AggregateRating`, no `Event` JSON-LD for the sample/schedule-tbd event, no fabricated `PriceRange`/opening hours/registration numbers — only fields that are actually true are ever included. Every JSON-LD `<script>` is serialized via `serializeJsonLd()` (`src/lib/structuredData.ts`), which escapes every `<` character so a content field can never prematurely close the script tag or inject markup — required before any content is interpolated into a `<script>` body, and the only sanctioned way to do so in this codebase (enforced by convention via the shared `JsonLd` component).
- **Sitemap/robots (implemented, Phase 8):** `src/app/sitemap.ts` and `src/app/robots.ts`, Next.js's built-in conventions, generated entirely from local content (no hand-maintained URL list). Drafts (`LegalPage.isDraft`), templates (`Scholarship.isTemplate`), and sample detail pages (`Event.isSampleContent`) are excluded from the sitemap — see the file's own doc comment and docs/ROUTE_INVENTORY.md for the exact policy. `lastModified` is set only from a genuine `lastReviewed`/`lastUpdated` content field, never today's date used as a stand-in for "this was checked."
- **Default Open Graph image (implemented, Phase 8):** `src/app/opengraph-image.tsx`, a code-generated (`next/og` `ImageResponse`) 1200×630 image using brand colours and the real site name/tagline — no stock photography, no fabricated claims. `src/app/icon.tsx` generates the favicon the same way, reusing the same compass-star/open-book mark as `SiteLogo`. Per-page `openGraph`/`twitter` metadata (already set on every route) still overrides the title/description a link preview shows; this image is only the shared visual fallback.
- Canonical URLs via `metadataBase` (configured in the root layout) plus per-page `alternates.canonical` on every route.

## 10. Accessibility

- Target: **WCAG 2.2 AA**.
- Semantic HTML landmarks, correct heading hierarchy, accessible form labels/error associations (`aria-describedby`, `aria-invalid`), visible focus states, full keyboard operability.
- Color contrast for all brand tokens checked against WCAG AA at the component level (see [docs/DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)).
- No motion-only or color-only signaling of state.
- Skip-to-content link, accessible mobile menu (`aria-expanded`/focus trapping via Radix `Sheet`/`DropdownMenu`).
- **Automated axe-based sweep (implemented, Phase 8):** `e2e/accessibility.spec.ts` runs `@axe-core/playwright` (tags `wcag2a`, `wcag2aa`, `wcag22aa`) against one representative page per route family, plus all four forms with their validation-error state visible (error-state markup is checked separately since it's new DOM the clean-state sweep never renders) — zero violations as of Phase 8. This automated sweep catches only what axe's ruleset can detect; it does **not** replace manual verification of focus order, screen-reader announcement quality, or zoom/reflow behaviour — see docs/DEPLOYMENT.md "Post-deploy verification" for what to check by hand.
- **Responsive QA matrix (implemented, Phase 8):** `e2e/responsive.spec.ts` checks 6 representative viewport widths (320/375/768/1024/1280/1920) across 13 representative pages for zero horizontal overflow and exactly one `<h1>`. This matrix caught and led to fixing a real overflow bug at exactly 1280px in the site header (see docs/DECISIONS.md C-047).

## 11. Performance

- Targets (audit targets, not something to game): Lighthouse Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+; Core Web Vitals LCP ≤ 2.5s, CLS < 0.1, INP < 200ms on representative pages.
- Fully static generation gives every page a strong performance baseline by default — confirmed in the Phase 8 audit: `next build` marks every route `○` (static) or `●` (SSG via `generateStaticParams`), none `ƒ` (dynamic/server-rendered).
- Image optimization, self-hosted fonts (`next/font`, `Inter`, `display: "swap"`), route-level code-splitting via App Router defaults.
- Avoid heavy client-side libraries for non-essential motion/carousels (no carousels unless strongly justified) — none exist today.
- **Server/client component balance (reviewed, Phase 8):** every page component is a server component (`async function Page()`); `"use client"` is scoped to genuinely interactive leaves — forms, the mobile menu/`Sheet`, dropdown navigation, and the FAQ `Accordion` — not whole pages. No unnecessary client-side data fetching exists since all content access already happens server-side via `src/lib/content/`.
- **JSON-LD duplication (checked, Phase 8):** `Organization`/`WebSite` JSON-LD is rendered exactly once, in the root layout, not repeated per page; `BreadcrumbList`/`FAQPage` are page-specific and appear once per page that needs them. No page emits the same JSON-LD type twice.
- **Bundle size:** no heavy third-party runtime libraries beyond React Hook Form + Zod (form pages only) and Radix primitives (already tree-shaken per-component via `radix-ui`'s package structure) — no chart/carousel/animation library is installed.
- **Layout shift:** no images are rendered yet (see docs/MEDIA_ATTRIBUTIONS.md), so there is no image-related CLS risk today; revisit sizing/`priority` once real photography is added.

## 12. Testing

- **Unit/component:** Vitest + Testing Library for components, the content-access layer, and utility functions (`src/lib/`) — 385+ tests as of Phase 8, including `src/content/integrity.test.ts` (cross-cutting content-integrity checks, run standalone via `npm run validate:content`).
- **End-to-end:** Playwright for critical journeys — homepage, navigation, every page template, and each form's client-side happy-path and validation-error path (`e2e/*.spec.ts`).
- **Accessibility testing (implemented, Phase 8):** `e2e/accessibility.spec.ts`, `@axe-core/playwright` against representative pages and all four forms' error states — see §10.
- **Responsive testing (implemented, Phase 8):** `e2e/responsive.spec.ts`, a 6-viewport × 13-page overflow/heading matrix — see §10.
- Tests are required for new behavior per [CLAUDE.md](../CLAUDE.md); run `format:check`, `lint`, `typecheck`, `test`, `test:e2e`, and `validate:content` before considering any change complete (see docs/DEPLOYMENT.md §16 for the full pre-build command list).

## 13. Deployment (current track)

See [docs/DEPLOYMENT.md](DEPLOYMENT.md) (Phase 8) for the complete, platform-neutral deployment guide — build/start commands, environment variables, security headers, the CSP decision, forms-security prerequisites for Track 2, cookies/analytics status, and a post-deploy verification checklist. In summary: any platform with Next.js server support (not a plain static file host — `output: "export"` is not set) works; no database or persistent runtime is required; environment separation is about `NEXT_PUBLIC_SITE_URL` only; no migrations or backup strategy are needed until Track 3 introduces Strapi's own database.

## 14. Operational Considerations (current track)

- No structured server-side logging is needed yet — there is no server-side logic beyond static rendering and (later) a thin form-submission adapter. Add structured logging when Track 2 introduces a real submission endpoint worth logging.
- **Privacy-aware analytics**, if added, must be cookieless/aggregated or consent-gated, and must not degrade Core Web Vitals — provider TBD, see [docs/DECISIONS.md](DECISIONS.md).
- Basic uptime monitoring for the deployed static site is a reasonable launch-readiness item; no error-rate/APM tooling is needed without a server.

## 15. Future Track: Form-Service Integration

- Replace the demo-mode submission adapter (Section 5) with a call to a real external service (e.g., a transactional email API, a hosted form-backend service, or a small serverless function written specifically for this purpose).
- Add spam/bot mitigation (honeypot + timing heuristic, optional CAPTCHA behind a swappable interface) and rate limiting at whatever boundary receives the submission.
- Decide at that time whether submissions are (a) emailed directly to staff with no storage, (b) stored by the third-party service's own dashboard, or (c) proxied into Strapi (Section 16) as content entries — record the decision in [docs/DECISIONS.md](DECISIONS.md) when made.
- This track does **not** require introducing a database into this Next.js codebase merely to receive form submissions — prefer a managed service or a minimal stateless function first.

## 16. Future Track: Strapi CMS Integration

- Stand up Strapi as a **separate application** (not inside this Next.js codebase) with content types matching [docs/CONTENT_MODEL.md](CONTENT_MODEL.md): Destinations, Universities, Programmes, Services, Insurance information, Scholarships, Success Stories, Articles, Events, FAQs, Team Members, Site Settings, Navigation, and reusable SEO fields/Media.
- Re-implement each function in `src/lib/content/` to call the Strapi API instead of returning local data — the function signatures (already `async`, already returning the shapes in `src/types/content.ts`) should not need to change, and neither should any page or component that calls them.
- Decide on-demand revalidation strategy at that point (e.g., Incremental Static Regeneration triggered by a Strapi webhook) vs. rebuilding on every content change.
- Content management happens in **Strapi's own admin UI** — this project does not build a custom admin dashboard in this track or any other.
- Staff roles/permissions (currently an open question, U-005 in [docs/DECISIONS.md](DECISIONS.md)) are configured in Strapi's own role system, not designed bespoke here.

## 17. Future Track: Advanced Portal Features (speculative)

Not designed, not scoped, not committed to. Would cover things like authenticated student accounts, application-lifecycle tracking, online payments, and insurance policy issuance — each of which would need its own architecture decision (very likely reintroducing a database and authentication) if and when the business actually commits to building it. Do not build toward this speculatively.

## 18. Phase 1 Implementation Notes

Recorded when the project was scaffolded (see [docs/DECISIONS.md](DECISIONS.md) for the full decision log):

- **Framework versions:** Next.js 16.3.5 (App Router, Turbopack — stable and default as of v16, no manual `--turbopack` flag needed), React 19.2.8, TypeScript 5. Next.js 16 changed several APIs from prior versions (fully async `params`/`searchParams`, `middleware` → `proxy`, `next lint` removed in favor of the ESLint CLI, ESLint flat config as default). Anyone extending this codebase should treat pre-2026 Next.js knowledge as potentially stale and check `node_modules/next/dist/docs/` (or `AGENTS.md`) for the installed version's actual behavior before assuming an API.
- **shadcn/ui uses the Radix primitive library** (`-b radix`), not the newer Base UI default, specifically so `class-variance-authority`, `clsx`, and `tailwind-merge` remain first-class direct dependencies with a hand-written `cn()` in `src/lib/utils.ts`, per this project's explicit stack requirements — the shadcn CLI's own current default otherwise generates code against its own bundled `cn` package instead.
- **No `loading.tsx` yet** — there are no async data boundaries to show a fallback for on a fully static site with local content; add one only if a future route introduces genuine runtime waiting.
- **The original Phase 1 scope briefly included a `/admin` placeholder route, PostgreSQL/Prisma, and Auth.js.** The lead architect corrected this mid-phase: the initial release is static-only. The admin route was deleted before this phase completed; no database or auth packages were ever installed. See [docs/DECISIONS.md](DECISIONS.md) for the full record.

## 19. Phase 2 Implementation Notes

Recorded when the shared shell and content architecture were built (see [docs/DECISIONS.md](DECISIONS.md) for the full decision log):

- **Header/mobile-nav breakpoint is `xl` (1280px), not `lg` (1024px).** Measured 185px of horizontal overflow at exactly 1024px with 9 top-level nav items + CTA + logo under `lg`. Widening the breakpoint to `xl` fixed it with no other layout changes. Re-check for overflow at 1024–1279px before ever lowering this.
- **No brand icons (Facebook/Instagram/LinkedIn/YouTube) are available in the installed `lucide-react` version** — the package dropped bundled brand/social glyphs. Footer social links render as neutral two-letter initial badges ("Fb", "Ig", "In", "Yt") instead, avoiding both a new icon dependency and any risk of reproducing a trademarked logo.
- **Vitest needed explicit `afterEach(cleanup)`.** With `globals: false` in `vitest.config.mts`, `@testing-library/react`'s automatic cleanup (which looks for a _global_ `afterEach`) never registered, so multiple `render()` calls across `it` blocks in one file accumulated in the same document. Fixed once, centrally, in `vitest.setup.ts` — no per-file workaround needed.
- **A stray leftover `next dev` process on port 3000 caused a real-looking Playwright failure** (the mobile-menu click appeared to do nothing) because Playwright's `webServer.reuseExistingServer` silently reused it instead of running the configured `build && start`. Symptom: HMR WebSocket connection attempts in browser console logs on a supposedly-production server. If a Playwright test behaves inexplicably, check for and kill anything already listening on port 3000 before assuming a code bug.
- **`Button` (shadcn-generated) is not wrapped in `React.forwardRef`.** This did not block any interaction actually needed in this phase (Radix `Trigger`/`asChild` composition worked correctly for both `DropdownMenu` and `Sheet` once tested against a real, freshly-built server), but keep it in mind if a future Radix primitive's `asChild` composition needs ref forwarding for measurement/positioning and behaves unexpectedly.
- Added the `accent` Button variant (`bg-brand-gold text-brand-gold-foreground`) to `src/components/ui/button.tsx` for the "Book a Consultation" CTA family, matching the Accent colour role already documented in docs/DESIGN_SYSTEM.md §2 — this is a normal edit to a shadcn-generated file, not a fork to avoid maintaining.
- `docs/SITEMAP.md` gained one route not in the original list: a dedicated `/faq` page (Phase 2 originally added `/resources/faqs` for this purpose; Phase 6 consolidated it into the standalone `/faq` the later brief specifically asked for — see docs/DECISIONS.md C-037).
