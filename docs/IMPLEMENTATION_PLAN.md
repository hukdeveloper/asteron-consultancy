# Implementation Plan — Janan Consultancy

> **Scope correction (2026-09-12):** the initial release is a static website. This plan is now organized into four tracks, per the lead architect's explicit direction. Work proceeds phase by phase within Track 1 first; Tracks 2–4 are future work, sketched here for continuity but not started. No phase should be started before the previous phase's exit criteria are met, and no phase should silently expand into the next or borrow from a later track.

## Track 1 — Static Website (current)

### Phase 0 — Repository Inspection and Architecture Documentation ✅ Complete

- **Objective:** Establish shared understanding of scope, architecture, design direction, and content model before any code exists.
- **Deliverables:** CLAUDE.md, README.md, and all files under `docs/`.
- **Dependencies:** None.
- **Tests:** N/A (documentation only).
- **Exit criteria:** All required documents exist and are populated; no application code, dependencies, schema, or committed changes exist; unresolved questions are logged in DECISIONS.md.

### Phase 1 — Application Scaffolding and Engineering Foundation ✅ Complete (scope corrected mid-phase)

- **Objective:** Stand up a working, statically-generated Next.js + TypeScript project with the agreed tooling, with no business logic and no database/auth/admin surface.
- **Deliverables:**
  - ✅ Next.js 16 App Router project (`src/` directory, `@/*` import alias, no Pages Router), TypeScript (strict), Tailwind CSS 4, shadcn/ui (Radix-based) with brand design tokens.
  - ✅ ESLint (flat config) and Prettier (+ `prettier-plugin-tailwindcss`).
  - ✅ Environment-variable validation (`src/lib/env.ts`, Zod) and `.env.example`.
  - ✅ A single `(public)` route group; **no `(admin)` route group** (removed after the scope correction — see docs/DECISIONS.md).
  - ✅ A content-access-layer foundation: `src/types/content.ts`, `src/content/site.ts`, `src/lib/content/site.ts`, all `async` to allow a future Strapi-backed implementation without a signature change.
  - ✅ Vitest + Testing Library and Playwright installed and configured, with foundation tests.
  - ✅ Baseline security headers in `next.config.ts`; CSP explicitly deferred.
  - ✅ Foundational shared components: `SiteLogo`, `Container`, `Section`, `PageHeader`, `SkipLink`.
  - ❌ **Removed mid-phase per scope correction:** the `/admin` placeholder route and page. No PostgreSQL, Prisma, or Auth.js package was ever installed.
- **Dependencies:** Phase 0 documents approved; dependency versions selected and verified at scaffolding time.
- **Tests:** Unit/component tests for `SiteLogo`, `Button`, the homepage's main heading, the content-access layer, and the env fallback helper; a Playwright smoke test covering the homepage heading and the custom 404 page.
- **Exit criteria:** ✅ `npm run dev` serves the app; ✅ lint, typecheck, format:check, unit tests, Playwright E2E, and production build all pass; ✅ no database, auth, admin, or CMS code exists anywhere in the repository.

### Phase 2 — Design Foundations and Shared UI Shell ✅ Complete

- **Objective:** Implement the global page shell (header, footer, navigation) with placeholder/local content, decoupled from any specific page's data.
- **Deliverables:**
  - ✅ Content architecture expanded: `ContactInfo` (on `SiteContent`), `AnnouncementContent`, `NavItem`/`NavLink`/`FooterLinkGroup`, `SocialLink`, `DestinationSummary`, `ServiceSummary` — each with a matching `src/content/*` object and `src/lib/content/*` accessor.
  - ✅ `AnnouncementBar`, `SiteHeader` (+ `HeaderDesktopNav`, `HeaderMobileMenu`), `SiteFooter`, `MobileQuickActions`, composed in `src/app/(public)/layout.tsx` — see "Shared Website Shell" in docs/TECHNICAL_ARCHITECTURE.md.
  - ✅ Sticky header with data-driven navigation (accessible dropdowns via Radix `DropdownMenu`) and a Sheet-based mobile menu (native `<details>` disclosure groups).
  - ✅ Footer with the structure in docs/SITEMAP.md §4, data-driven link groups, contact details, social links, legal links, and a disclaimer.
  - ✅ Mobile-only quick-actions bar (Call, WhatsApp, Book Consultation), disableable via `src/config/site.ts`.
  - ✅ `Breadcrumbs`, `SectionHeading`, `ComingSoon` shared components; `SiteLogo` gained `compact`/`full` variants.
  - ✅ Every route in docs/SITEMAP.md §1 now exists (as a `ComingSoon` placeholder), reachable from real navigation — not built as final content, per this phase's scope.
- **Dependencies:** Phase 1 complete.
- **Tests:** 25 Vitest unit/component tests (content-configuration validity, `SiteLogo`, `HeaderDesktopNav`, `HeaderMobileMenu`, `SiteHeader`, `SiteFooter`, `Breadcrumbs`, `MobileQuickActions`); 5 Playwright E2E tests (homepage shell, skip link, primary CTA reachability, custom 404, mobile menu).
- **Exit criteria:** ✅ A navigable shell exists, meeting the responsive/accessibility behavior in docs/DESIGN_SYSTEM.md, with no page content still hardcoded outside the content layer; ✅ no horizontal overflow at 320/375/768/1024/1440px (verified manually — see docs/TECHNICAL_ARCHITECTURE.md §19 for the 1024px breakpoint fix this required).

### Phase 3 — Complete Static Homepage ✅ Complete (narrowed scope, split from the original plan)

> The lead architect's actual Phase 3 brief scoped this to **the homepage only** — explicitly excluding building out every destination/service/etc. detail page (those remain "coming soon" stubs from Phase 2). This is narrower than this document's original Phase 3 description above, which is superseded by the phase actually delivered; the remaining detail-page work becomes a new, not-yet-scheduled continuation (tentatively "Phase 3B") rather than being silently folded into Phase 4.

- **Objective:** Replace the temporary development homepage with a complete, conversion-focused, fully responsive homepage across all 17 required sections (announcement bar → footer → mobile quick actions), built from typed local content.
- **Deliverables:**
  - ✅ Homepage content architecture: `src/content/home.ts` / `src/lib/content/home.ts` (hero, trust points, process steps, why-choose reasons, featured-university placeholders, scholarship highlights, success-story demos, insurance highlights + disclaimer, sample event, resource summaries, FAQ, final CTA); `ServiceSummary` gained `icon`, `DestinationSummary` gained `tagline`/`studyLevelLabel`; one new service (`study-abroad-counselling`) added so the homepage shows exactly six.
  - ✅ 13 homepage section components under `src/components/home/`, each a Server Component reading content via the access layer; `SampleContentBadge` (finally implementing docs/DESIGN_SYSTEM.md §12) and a hand-written `ui/accordion.tsx` (shadcn registry was unreachable this session — see docs/DECISIONS.md) added as shared primitives.
  - ✅ Homepage-specific SEO: `generateMetadata` (title/description/canonical/OG/Twitter) and non-fictional `ProfessionalService` JSON-LD (name/description/url/email/telephone only — no fabricated ratings, hours, or coordinates).
  - ✅ No photographs — original CSS/SVG hero and card visuals; see docs/MEDIA_ATTRIBUTIONS.md for why and what to replace later.
  - ❌ **Explicitly not built:** individual destination/university/service/scholarship/etc. detail pages (still Phase 2's `ComingSoon` stubs); lead-generation form submission logic (still Phase 4).
- **Dependencies:** Phase 2 complete.
- **Tests:** 19 new Vitest tests (`src/app/(public)/page.test.tsx`, `src/content/home.test.ts` — H1, CTAs, service/destination content, insurance disclaimer, sample/demo labelling, FAQ accordion accessibility, no-prohibited-language scan, structured-data validity); 5 new Playwright tests (insurance section reachable, FAQ expandable, final CTA visible, 320px no-overflow check) alongside the 4 carried over from Phase 2.
- **Exit criteria:** ✅ Homepage renders all 17 sections in the required order; ✅ no horizontal overflow at 320/375/768/1024/1440px (manually verified with screenshots); ✅ format/lint/typecheck/unit/build/e2e/audit all pass; ✅ no database/auth/admin/CMS code introduced; ✅ no fabricated business claims anywhere in homepage content (automated test coverage, not just manual review).

### Phase 4 — Study Abroad Hub and Destination Pages ✅ Complete (this is the "Phase 3B" continuation referenced above, not the form-UI phase originally sketched below)

> The lead architect's actual Phase 4 brief scoped this to the Study Abroad hub, the undergraduate/postgraduate study-level pages, all six destination detail pages, and an informative-only `/check-eligibility` page — i.e., exactly the "remaining detail-page work" Phase 3 flagged as a not-yet-scheduled continuation, not the lead-generation form-UI work this document originally planned as "Phase 4" (renumbered to **Phase 5** below, pushing the two phases after it to Phase 6 and Phase 7).

- **Objective:** Replace the `ComingSoon` stubs for `/study-abroad`, `/study-abroad/undergraduate`, `/study-abroad/postgraduate`, `/study-abroad/[destination]` (6 destinations), and `/check-eligibility` with real, statically-generated content built from typed local content — using one reusable template per repeated page shape, not per-destination/per-study-level duplication.
- **Deliverables:**
  - ✅ `DestinationSummary` removed; unified into one full `Destination` type (26+ fields, see docs/CONTENT_MODEL.md §3) with 6 complete, policy-compliant records in `src/content/destinations.ts` (`src/lib/content/destinations.ts` updated to match). `KeyPoint`, `StudyAbroadProcessStep`, and `StudyLevelPageContent` types added.
  - ✅ `src/content/study-abroad.ts` / `src/lib/content/study-abroad.ts`: the shared generic 10-step application process, hub-only content (hero, intro, "how Janan supports", visa-guidance intro, parent reassurance, FAQ, final CTA, figure-free cost-planning categories), and `undergraduate`/`postgraduate` `StudyLevelPageContent` records.
  - ✅ `src/content/eligibility.ts` / `src/lib/content/eligibility.ts`: informative-only `/check-eligibility` content (general eligibility factors + FAQ) — see "Check-Eligibility Form Deferred" in docs/DECISIONS.md for why there is no form.
  - ✅ ~15 components under `src/components/study-abroad/` (hero, overview, study options, application journey, planning/cost, scholarship/visa, lifestyle, related services, destination selector, qualitative-only comparison table, `StudyLevelTemplate`), all Server Components reading content via the access layer.
  - ✅ `/study-abroad` hub, one shared `/study-abroad/[destination]` template rendering all 6 destinations via `generateStaticParams`, one shared `StudyLevelTemplate` rendering both study-level pages, and the `/check-eligibility` page — each with unique `generateMetadata` (title/description/canonical/OG) and non-fictional `BreadcrumbList`/`FAQPage` JSON-LD matching visible content exactly.
  - ✅ `src/content/navigation.ts` updated so the undergraduate/postgraduate nav entries point at their real routes instead of the `/study-abroad` placeholder.
  - ✅ No photography (extends C-019 — see C-027); each destination gets a distinct Lucide icon instead of a flag-grid.
  - ❌ **Explicitly not built:** an interactive eligibility form (deferred, see C-026); Strapi, a database, authentication, or an admin dashboard; real form submission of any kind.
- **Dependencies:** Phase 3 complete.
- **Tests:** New Vitest coverage — `src/content/destinations.test.ts` (schema/unique-slugs/required-fields/related-service-links/content-accuracy scans), `src/content/study-abroad.test.ts`, `src/content/eligibility.test.ts`, plus page-level tests for the hub, one representative destination (United Kingdom), both study-level pages, and `/check-eligibility` (H1 uniqueness, expected sections, structured data, no-prohibited-language). New Playwright spec `e2e/study-abroad.spec.ts`: hub loads, destination navigation, all 6 destination routes return 200, representative destination's full section set, invalid-slug 404, both study-level pages, FAQ accordion interaction, consultation CTA accessibility, and 320px no-overflow checks for the hub and a destination page.
- **Exit criteria:** ✅ Format/lint/typecheck/unit/build/Playwright/`npm audit` all pass; ✅ no database/auth/admin/CMS/Strapi code introduced; ✅ no duplicated destination or study-level page implementations; ✅ no fabricated or precise immigration/financial claims anywhere in Study Abroad content (automated test coverage); ✅ visual verification at 5 viewports across 5 representative pages with no horizontal overflow.

### Phase 5 — Services, Insurance, and the First Lead-Generation Form ✅ Complete (delivers Services/Insurance content plus one of the four forms originally sketched below; the remaining three forms become "Phase 5B", a new not-yet-scheduled continuation — same pattern as Phase 3→3B→4)

> The lead architect's actual Phase 5 brief scoped this to the Services hub (7 services), the Insurance hub (3 insurance types), and a static `/insurance-quote` demo form — narrower than, but overlapping, this document's original Phase 5 description below (four forms: Consultation, Check Eligibility, Insurance Quote, Contact). Only the Insurance Quote form was built. The original Phase 5 objective is retitled "Phase 5B" and now covers the three remaining forms, reusing the submission-adapter/validation pattern this phase established.

- **Objective:** Replace the `ComingSoon` stubs for `/services`, all 7 `/services/[slug]` pages, `/insurance`, all 3 `/insurance/[slug]` pages, and `/insurance-quote` with real, statically-generated content and — for the first time in this codebase — a real, validated (but not-yet-connected) form, using one reusable template per repeated page shape.
- **Deliverables:**
  - ✅ `ServiceSummary` removed; unified into one full `Service` type (see docs/CONTENT_MODEL.md §8) with 7 records in `src/content/services.ts` (one renamed slug — `university-selection` → `university-course-selection` — and one new record, `scholarship-guidance`, not featured on the homepage). `InsuranceService` implemented for the first time (3 records in `src/content/insurance.ts`), plus the shared global insurance disclosure.
  - ✅ ~14 components under `src/components/{services,insurance}/` (hero, category sections, card grid, shared `ServiceTemplate`/`InsuranceTemplate`, plus new shared `ProcessStepsSection` and `NoticeCallout` reused across both), all Server Components reading content via the access layer.
  - ✅ `/services` hub, one shared `/services/[slug]` template rendering all 7 services via `generateStaticParams`, `/insurance` hub, one shared `/insurance/[slug]` template rendering all 3 insurance types, each with unique `generateMetadata` and non-fictional `BreadcrumbList`/`FAQPage`/`Service` JSON-LD.
  - ✅ `/insurance-quote`: the first real form in this codebase. React Hook Form + Zod (`src/lib/validation/insuranceQuote.ts`), a generic, reusable demo submission adapter (`src/lib/forms/submissionAdapter.ts`) returning `{status: "not-configured"}`, accessible inline errors + error summary, and the required verbatim not-connected message with real contact links. No network request, no console logging, no storage, no URL mutation — verified by dedicated tests.
  - ✅ Required verbatim regulatory/integrity notices (academic-integrity on Application Assistance, visa notice on Student Visa Guidance, scholarship disclaimer on Scholarship Guidance, accommodation limitation) implemented via a new `Service.importantNotice` field rendered as a prominent callout.
  - ✅ `src/content/navigation.ts` updated: Insurance nav item gained `children` (mirroring the Services pattern).
  - ❌ **Explicitly not built:** Consultation, Contact, and full Check-Eligibility forms (built/consolidated in Phase 6/7 respectively — see below); real form submission of any kind; Strapi, a database, authentication, or an admin dashboard.
- **Dependencies:** Phase 4 complete.
- **Tests:** New Vitest coverage — `src/content/services.test.ts`, `src/content/insurance.test.ts` (schema/unique-slugs/required-fields/related-service-links/required-notices/content-accuracy scans), `src/lib/validation/insuranceQuote.test.ts`, `src/lib/forms/submissionAdapter.test.ts`, page-level tests for both hubs and one representative detail page each, and a dedicated `InsuranceQuoteForm.test.tsx` (validation errors, accessible error association, no network/logging, not-connected message). New Playwright spec `e2e/services-insurance.spec.ts`: both hubs load, all 7 service routes and all 3 insurance routes return 200, invalid slugs 404, FAQ accordion interaction, quote-form validation errors and valid-submission message, mobile services navigation, and 320px no-overflow checks.
- **Exit criteria:** ✅ Format/lint/typecheck/unit/build/Playwright/`npm audit` all pass; ✅ no database/auth/admin/CMS/real-submission code introduced; ✅ no duplicated service or insurance page implementations; ✅ every required verbatim notice/disclosure present and tested; ✅ visual verification at 3 viewports across 7 representative pages with no horizontal overflow.

### Phase 6 — Remaining Public Content Pages ✅ Complete (this is the "Phase 5B" continuation referenced above, retitled and renumbered once the lead architect's actual Phase 6 brief arrived)

- **Objective:** Replace the `ComingSoon` stubs for `/about`, `/team`, `/success-stories`, `/resources` (+6 articles), `/events`, `/faq`, `/contact`, `/scholarships`, and the four `/legal/*` pages with real, statically-generated content, standardizing `/contact` with a real demo form along the way.
- **Deliverables:**
  - ✅ New content types/records: `TeamMember` (5 role-based placeholders), `SuccessStory` (3 demo examples), `ResourceArticle`/`ResourceCategory` (6 articles, 5 categories), `Event` (1 sample), `Scholarship` (2 explicit content-template records), `FaqCategoryGroup` (8 categories), `ContactMethod`/`OfficeLocation` (derived from `ContactInfo`, never duplicated), `LegalPage` (4 drafts) — see docs/CONTENT_MODEL.md "Remaining Public Content Pages (Phase 6)".
  - ✅ Shared templates: `ResourceArticleTemplate`, `LegalPageTemplate`, `TeamGrid`, plus one shared FAQ/category-accordion pattern — no per-article/per-legal-page duplicated implementation.
  - ✅ `/contact` standardized with a real `ContactForm` (React Hook Form + Zod), reusing the exact `submitDemoForm()` adapter and accessible error-summary pattern Phase 5 established for `/insurance-quote`.
  - ✅ `/resources/faqs` (never-built stub) removed in favour of a standalone `/faq`; legal content built at the existing `/legal/*` paths rather than a new flat URL set (see docs/DECISIONS.md C-036/C-037).
  - ❌ **Explicitly not built:** `/book-consultation` (still `ComingSoon`); Consultation and Eligibility-assessment forms; any real team member, testimonial, event, or scholarship content.
- **Dependencies:** Phase 5 complete.
- **Tests:** New Vitest coverage across content schema/demo-label/no-fake-guarantee tests for every new content file, page-level tests for all nine new/standardized routes (plus representative detail pages and 404 handling for `/resources/[slug]` and `/scholarships/[slug]`), and a `ContactForm` component test mirroring `InsuranceQuoteForm.test.tsx`. New Playwright spec `e2e/public-content.spec.ts` (23 tests) plus one pre-existing smoke-test update for the new About dropdown.
- **Exit criteria:** ✅ Format/lint/typecheck/unit/build/Playwright/`npm audit` all pass; ✅ no invented company history, team member, testimonial, event, or active scholarship anywhere; ✅ every legal page displays the required verbatim draft notice; ✅ visual spot-check across representative pages at mobile and desktop with no horizontal overflow.

### Phase 7 — Static Forms, Validation and Enquiry Experience ✅ Complete

- **Objective:** Complete `/book-consultation` and `/check-eligibility` with real, validated demo forms, and consolidate all four forms (Consultation, Eligibility, Insurance Quote, Contact) onto one shared, explicitly-documented form architecture (typed values, central Zod schemas, a formal submission-adapter interface with typed results, centralized user-facing messages).
- **Deliverables:**
  - ✅ `src/types/forms.ts` — `SubmissionAdapter`/`SubmissionResult`/`SubmissionStatus` interface, shared by every form.
  - ✅ `src/lib/forms/adapters/notConfiguredAdapter.ts` — the sole Track 1 adapter, replacing the old ad hoc `submitDemoForm()`; always resolves `{status: "not-configured"}`, never networks, stores, or logs.
  - ✅ `src/lib/forms/messages.ts` — centralized verbatim copy (demo notice, not-connected message, consent label, sensitive-data warning, preference-only note, error-summary heading) shared by all four forms instead of being restated per form.
  - ✅ Shared components (`src/components/forms/`): `FormField`, `FormErrorSummary`, `FormDemoNotice`, `FormSubmittedNotice`, `ConsentField`; shared utilities `src/lib/forms/describedBy.ts`, `src/lib/forms/dateUtils.ts` (timezone-safe date-only comparison), and the `useDemoFormSubmit` hook (submit/focus-management behaviour every form reuses).
  - ✅ New Zod schemas: `src/lib/validation/consultation.ts`, `src/lib/validation/eligibility.ts` (conditional English-test/study-gap fields via `superRefine`, multi-select destinations, `cleanEligibilityPayload`); `src/lib/validation/insuranceQuote.ts` gained a coverage-start-date-not-in-past check and a `"not-sure"` insurance type; `src/lib/validation/contactForm.ts`'s enquiry types expanded to 8 options.
  - ✅ `ConsultationForm` (`src/components/consultation/`) wired into `/book-consultation` (previously a `ComingSoon` stub); `EligibilityForm` (`src/components/eligibility/`) wired into `/check-eligibility` as a single-page grouped form alongside the existing informative content (chosen over a multi-step flow per the brief's own robustness fallback).
  - ✅ `InsuranceQuoteForm` and `ContactForm` refactored onto the shared architecture; page-level demo notices that duplicated the new `FormDemoNotice` were removed from `/insurance-quote` and `/contact` to avoid showing the same notice twice (see docs/DECISIONS.md "Form Architecture (Phase 7)").
- **Dependencies:** Phase 6 complete (reuses its `ContactForm` pattern and content).
- **Tests:** Full schema coverage (whitespace-only rejection, permissive international phone, conditional fields, date-ordering, consent, past-date rejection) for every form in `src/lib/validation/*.test.ts`; component tests for all four forms covering error summaries, conditional-field reveal/require behaviour, no-network/no-storage/no-console-logging, and the not-connected message; Playwright coverage in `e2e/forms.spec.ts` (Consultation, Eligibility) and updated coverage in `e2e/services-insurance.spec.ts` (Insurance Quote).
- **Exit criteria:** ✅ All four forms are fully usable, validated, and consistent; ✅ no form transmits, logs, or stores personal data; ✅ nothing implies a submission was saved or delivered; ✅ format/lint/typecheck/unit/build/Playwright all pass.

### Phase 8 — Production-Readiness Audit ✅ Complete

- **Objective:** Audit and prepare the complete site for production deployment without changing approved scope — technical SEO (sitemap/robots/structured data/OG image), accessibility (WCAG 2.2 AA), performance, security headers, content-integrity validation, and deployment documentation.
- **Deliverables:**
  - ✅ `src/app/sitemap.ts`/`robots.ts` generated from local content, excluding draft/template/sample-detail routes (see file doc comments and docs/ROUTE_INVENTORY.md).
  - ✅ `serializeJsonLd()` (`src/lib/structuredData.ts`) — safe JSON-LD serialization escaping every `<` character, wired into the shared `JsonLd` component; site-wide `Organization`/`WebSite` JSON-LD added to the root layout (rendered once, not per-page, avoiding duplication).
  - ✅ `src/app/opengraph-image.tsx` and `src/app/icon.tsx` — code-generated (`next/og`), brand-colour, real-name/tagline OG image and favicon, reusing the `SiteLogo` mark; no stock photography.
  - ✅ `docs/ROUTE_INVENTORY.md` (new) — complete route/slug inventory and sitemap inclusion policy.
  - ✅ `src/content/integrity.test.ts` (`npm run validate:content`) — cross-cutting content-integrity checks: global slug/id uniqueness, cross-reference resolution (relatedServices, relatedArticleSlugs, categoryId), valid ISO dates, image/alt-text pairing, no leftover placeholder markers, and demo/template/draft label consistency. 15 checks, all passing on first run.
  - ✅ `e2e/accessibility.spec.ts` — `@axe-core/playwright` automated WCAG 2.2 AA sweep across 13 representative pages plus all four forms' error states (17 checks, 0 violations).
  - ✅ `e2e/responsive.spec.ts` — 6-viewport × 13-page overflow/heading matrix (78 checks). Caught a real 29px header overflow at exactly 1280px (the `xl` breakpoint from C-015) — fixed by moving the desktop-nav/mobile-menu breakpoint to `2xl` (C-047).
  - ✅ `docs/PRODUCTION_CONTENT_CHECKLIST.md` (new) — every placeholder/demo/template/draft item, classified Blocker/Important/Enhancement/Future integration.
  - ✅ `docs/DEPLOYMENT.md` (new) — platform-neutral deployment guide (build/start, env vars, security headers, the CSP decision, forms-security prerequisites, cookies/analytics status, post-deploy checklist, dependency-audit summary).
  - ✅ Cookie Policy re-verified accurate (no analytics/cookies in use today, no consent banner needed); `.env.example` re-verified as the complete and only environment variable this app reads.
- **Dependencies:** Phases 2–7 substantially complete.
- **Tests:** `npm run validate:content` (content-integrity); `e2e/accessibility.spec.ts` (automated a11y); `e2e/responsive.spec.ts` (viewport matrix); full regression of unit/E2E suites (385 unit + 173 Playwright, all passing).
- **Exit criteria:** ✅ Zero automated accessibility violations on all checked pages/states; ✅ zero horizontal-overflow regressions across the full viewport matrix (one real bug found and fixed); ✅ every remaining content gap is classified (Blocker/Important/Enhancement/Future integration) in docs/PRODUCTION_CONTENT_CHECKLIST.md; ✅ placeholder contact details and draft legal text explicitly flagged as launch blockers. Lead architect reviews this classification before deciding on launch — Track 2 (real form delivery) remains a separate, later decision.

### Phase 9 — Release-Candidate Preparation and Git Review (in progress, interrupted by Phase 10)

- **Objective:** Prepare the repository for the lead architect to safely commit, push, and deploy — repository hygiene, a secret/dependency/source audit, and a proposed commit plan — without performing the commit/push/deploy itself.
- **Status:** Started; explicitly paused by the lead architect ("STOP THE CURRENT RELEASE/DEPLOYMENT WORK") to run the mandatory Phase 10 visual redesign first, since shipping a release candidate of a rejected visual design would not be useful. Resume once Phase 10 is accepted — the repository state Phase 9 needs to review has materially changed (new components, new `Container` variants, expanded footer content), so its audit should re-run against the post-redesign codebase rather than resume from where it left off.

### Phase 10 — Mandatory Visual Redesign ✅ Complete

- **Objective:** Address 9 named visual defects (narrow header/footer width, thin footer link groups, an unremarkable hero, excessive text/card density, poor mobile UI, a dated feel) with a premium, editorial 2026-consultancy visual direction — while preserving content architecture, routing, accessibility, business rules, and test coverage.
- **Deliverables:**
  - ✅ `Container` gained a `variant` system (`content`/`wide`/`reading`/`fullBleed`) and wider responsive padding — see docs/DESIGN_SYSTEM.md §4-5 and docs/DECISIONS.md C-048.
  - ✅ Header rebuilt: `wide` container, larger `SiteLogo`, wider nav spacing, a secondary phone link, a new `StickyHeaderShell` client wrapper giving a subtle scroll-aware shadow.
  - ✅ Footer rebuilt: `wide` container, a decorative route-network motif, icon-led contact details, and every destination/service/non-visitor-insurance-type now linked (`footerLinkGroups` now derives from the same content the header dropdowns use) — see docs/DECISIONS.md C-052.
  - ✅ Homepage hero fully recomposed: new headline and copy, an asymmetric ~45/55 two-column layout, a layered original SVG visual (ambient glow, route/destination pins, abstract skyline, floating consultation card) — see docs/DECISIONS.md C-049.
  - ✅ `ServicesSection` (one featured tile + five compact tiles), `HowItWorksSection` (connected numbered journey with a route line), and `InsuranceSection` (icon-led checklist + shield motif) redesigned to break up repetitive card grids; `WhyChooseSection` removed as a near-duplicate of `TrustStrip` — see docs/DECISIONS.md C-051.
  - ✅ Mobile hero tightened (smaller heading/spacing) so the primary CTA is reachable near-immediately at common mobile viewport heights.
  - ✅ New `scripts/visual-qa-screenshot.mjs` — a manual (non-test-suite) tool for capturing full-page before/after screenshots across 6 breakpoints × 7 representative pages, used to drive this phase's review.
  - ✅ No real photography sourced (Unsplash's keyword-source endpoint is dead; network access confirmed but no viable licensed-image path found) — original SVG/CSS design work used instead, per the brief's own explicit fallback. See docs/DECISIONS.md C-050 and docs/MEDIA_ATTRIBUTIONS.md for what real photography would still add.
- **Dependencies:** Phases 2–8 complete (redesigns the existing implementation; does not change content architecture, routing, or business rules).
- **Tests:** Full regression — 385 unit/component tests, 174 Playwright tests (including the full `e2e/accessibility.spec.ts` and `e2e/responsive.spec.ts` suites), all passing; 3 Playwright tests updated (scoped to the `<main>` landmark) after the expanded footer made some link labels ambiguous at the page level; one component fixed to keep the original title-only-link accessible-name pattern after an initial whole-card-link draft regressed it.
- **Exit criteria:** ✅ Zero horizontal overflow across 6 breakpoints × 7 pages (320×568 through 1920×1080); ✅ zero automated accessibility violations; ✅ before/after screenshots captured and reviewed; ✅ all named primary problems (header/footer width, footer link count, hero design, text/card density, mobile UI) addressed with evidence, not just claimed. **Not exhaustively covered:** inner-page template variety (destination/service/article/form hero patterns) beyond the homepage and shared shell — flagged as a follow-up scope, not attempted as a token gesture.

## Track 2 — Form-Service Integration (future)

- **Objective:** Replace the Track 1 demo-mode submission adapter with a real external submission/email service so enquiries actually reach staff.
- **Deliverables:** A production submission-adapter implementation; spam/bot mitigation (honeypot, timing heuristic, optional CAPTCHA) and rate limiting at whatever boundary receives submissions; removal of demo-mode messaging from the UI.
- **Dependencies:** Track 1 Phase 4 complete; a submission/email service provider chosen (see docs/DECISIONS.md open question).
- **Tests:** Integration tests against the chosen provider (or a mock); Playwright E2E confirming a real (or sandboxed) submission succeeds end-to-end.
- **Exit criteria:** A real form submission reaches staff through the chosen channel; demo-mode messaging is gone from the UI.

## Track 3 — Strapi CMS Integration (future)

- **Objective:** Stand up Strapi as a separate application, migrate the content model in docs/CONTENT_MODEL.md into Strapi content types, and re-implement `src/lib/content/*` to call the Strapi API — with no changes required to any page or component that already consumes those functions.
- **Deliverables:** A running Strapi instance with content types for every entity in docs/CONTENT_MODEL.md §0; a re-implemented content-access layer; an on-demand revalidation strategy (e.g., ISR triggered by a Strapi webhook); staff roles/permissions configured in Strapi's own admin (not a custom-built one).
- **Dependencies:** Track 1 substantially complete (so there's a real UI to point at Strapi); hosting decision for Strapi itself.
- **Tests:** Contract tests confirming the Strapi-backed content layer returns data matching `src/types/content.ts`; full regression of the existing Playwright suite against the Strapi-backed site.
- **Exit criteria:** Non-engineering staff can edit content in Strapi's admin and see it reflected on the live site without an engineer's involvement.

## Track 4 — Advanced Portal Features (future, speculative)

- **Objective:** Not yet defined. Would cover things like authenticated student accounts, application-lifecycle tracking, online payments, and insurance policy issuance.
- **Status:** Not scoped, not designed, not committed to. Do not build toward this speculatively during Tracks 1–3. If the business commits to this track, it starts with its own architecture-decision process (very likely reintroducing a database and authentication), documented from scratch rather than assumed from this plan.

---

## Notes on Sequencing

- Within Track 1, Phases 2 and 3 are sequential (the shell needs to exist before pages are built into it); Phase 4 (Study Abroad) followed directly from Phase 3's content-layer pattern; Phase 5 (Services/Insurance + first form) followed directly from Phase 4's template/content-access conventions; Phase 6 (remaining public content pages) reused Phase 5's `ContactForm` pattern for `/contact`. Phase 7 (remaining forms + form-architecture consolidation) can proceed once Phase 5/6's form foundation exists — which it now does. Phase 8 (production-readiness audit) depends on the site being substantially content-complete.
- Track 2 and Track 3 are independent of each other and can be reordered relative to one another; both depend on Track 1 being substantially complete.
- Track 4 has no defined start condition and is not on the committed roadmap.
- No phase or track beyond the current one begins without the lead architect's explicit go-ahead.
