# Implementation Plan — Asteron Global Consultancy

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

### Phase 3 — Content Layer Build-Out and Static Pages

- **Objective:** Populate `src/content/` for every entity needed by the routes in docs/SITEMAP.md §1 (Destinations, Universities, Services, Scholarships, Insurance, Success Stories, Resources/Articles, Events, FAQs, Team Members, Site Settings, Navigation), each with a corresponding `src/lib/content/*` accessor, and build the static pages that consume them.
- **Deliverables:** All routes in docs/SITEMAP.md §1 rendering real (sample/demo, clearly labelled where required) content, statically generated via `generateStaticParams` for dynamic routes; SEO metadata per page via the content layer's SEO fields.
- **Dependencies:** Phases 2 and 3's own content typing (extends `src/types/content.ts` per entity, matching docs/CONTENT_MODEL.md shapes).
- **Tests:** Playwright coverage for navigation between pages; accessibility automated checks on key templates; unit tests for each `src/lib/content/*` accessor.
- **Exit criteria:** Every route in the current sitemap renders, is responsive, passes accessibility checks, and correctly displays required sample-content labels and disclaimers (insurance, testimonials, statistics).

### Phase 4 — Lead-Generation Form UI (Demo-Mode Adapter)

- **Objective:** Build the four forms (Consultation, Check Eligibility, Insurance Quote, Contact) with full client-side validation and a clearly-labelled demo-mode submission adapter — no persistence, no real delivery.
- **Deliverables:** React Hook Form + Zod implementations per docs/CONTENT_MODEL.md field lists; a single swappable submission-adapter interface; accessible success state that visibly states the submission is not yet connected to a real service; accessible error-state handling for client-side validation failures.
- **Dependencies:** Phase 3 complete for the pages hosting these forms.
- **Tests:** Vitest tests for validation schemas; Playwright E2E for each form's happy path (reaching the demo-mode success state) and at least one validation-error path.
- **Exit criteria:** All four forms are fully usable and validated client-side; nothing in the UI or copy implies a submission was saved or delivered.

### Phase 5 — SEO, Performance, and Accessibility Hardening

- **Objective:** Close gaps against the SEO, performance, and accessibility targets in docs/TECHNICAL_ARCHITECTURE.md before launch readiness.
- **Deliverables:** Structured data (JSON-LD) across relevant templates; `sitemap.ts`/`robots.ts`; image/font optimization pass; Core Web Vitals measurement and remediation; full WCAG 2.2 AA audit and remediation.
- **Dependencies:** Phases 2–4 substantially complete.
- **Tests:** Automated accessibility audit suite; Lighthouse/Web Vitals measurement against targets; structured data validation.
- **Exit criteria:** Representative pages meet documented performance targets and pass automated accessibility checks with no critical/serious violations.

### Phase 6 — Static-Website Launch Readiness

- **Objective:** Final pre-launch checks for the static site.
- **Deliverables:** Security review against docs/TECHNICAL_ARCHITECTURE.md §8; hosting/deployment pipeline finalized (any static-hosting-capable platform); confirmation that every sample/demo content instance is labelled or replaced with lead-architect-approved real content; legal pages reviewed.
- **Dependencies:** Phases 1–5 complete.
- **Tests:** Full regression pass of unit/E2E suites; manual accessibility spot-check.
- **Exit criteria:** Lead architect approves launch of the static website. Forms remain in demo mode until Track 2 begins — this is an accepted, clearly-communicated launch state, not a blocker.

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

- Within Track 1, Phases 2 and 3 are sequential (the shell needs to exist before pages are built into it); Phase 4 (forms) can proceed in parallel with the later part of Phase 3 once the content layer pattern is established.
- Track 2 and Track 3 are independent of each other and can be reordered relative to one another; both depend on Track 1 being substantially complete.
- Track 4 has no defined start condition and is not on the committed roadmap.
- No phase or track beyond the current one begins without the lead architect's explicit go-ahead.
