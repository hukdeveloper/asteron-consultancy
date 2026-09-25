# Janan Consultancy — Website

**Tagline:** Guidance Beyond Borders

## Project Status

> **Not production-ready.** This is a **static website** — see the roadmap below. Phase 7 (static forms, validation and enquiry experience) is complete: every planned public page has real content, and all four lead-generation forms (Consultation, Eligibility, Insurance Quote, Contact) are built on one shared, explicitly-labelled demo form architecture. There is **no database, no authentication, no admin dashboard, no CMS, and no persistent form storage — none of these are planned for the current track.** See [docs/IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md) for the phased plan and current status.

### Roadmap

1. **Static website** (current) — statically generated Next.js site, local typed content, client-side-only forms behind a demo submission adapter.
2. **Form-service integration** (future) — connect the form adapter to a real external submission/email service.
3. **Strapi CMS integration** (future) — replace the local content layer's implementation with a Strapi-backed API; content is managed in Strapi's own admin, not a custom-built one.
4. **Advanced portal features** (future, only if ever required) — student accounts, application tracking, payments, etc.

### Current routes

| Route                                                                                                                                                                                                  | Purpose                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                                                                                                                                                                                                    | The real, complete marketing homepage — see "Homepage" below.                                                                                                  |
| `/study-abroad`, `/study-abroad/undergraduate`, `/study-abroad/postgraduate`, `/study-abroad/[destination]` (6 destinations), `/check-eligibility`                                                     | Real content built in Phase 4, plus a real `EligibilityForm` added in Phase 7 — see "Study Abroad and Check Eligibility" and "Forms" below.                    |
| `/services`, `/services/[slug]` (7 services), `/insurance`, `/insurance/[slug]` (3 insurance types), `/insurance-quote`                                                                                | Real content built in Phase 5; `/insurance-quote`'s form was refactored onto the shared Phase 7 architecture — see "Services and Insurance" and "Forms" below. |
| `/about`, `/team`, `/success-stories`, `/resources`, `/resources/[slug]` (6 articles), `/events`, `/events/[slug]`, `/faq`, `/contact`, `/scholarships`, `/scholarships/[slug]`, `/legal/*` (4 drafts) | Real content built in Phase 6; `/contact`'s form was refactored onto the shared Phase 7 architecture — see "Remaining Public Content Pages" and "Forms" below. |
| `/book-consultation`                                                                                                                                                                                   | Real `ConsultationForm`, built in Phase 7 (previously a "coming soon" stub) — see "Forms" below.                                                               |
| `/universities`                                                                                                                                                                                        | Still renders the shared "coming soon" placeholder (`src/components/shared/ComingSoon.tsx`) — university detail pages are a later phase.                       |

Custom `not-found` (404) and error boundaries are also in place.

### Homepage

The homepage (`src/app/(public)/page.tsx`) is a full, conversion-focused
page composed from 12 section components under `src/components/home/`, in
this order: Hero (with a `UniversitySlider` visual — real, well-known
universities named as illustrative examples, not a partnership, see
docs/DECISIONS.md C-073), Trust strip, Study Abroad intro, Popular
destinations, How it works, Main services, Scholarship guidance, Insurance
services, Success stories (demo), Resources, FAQ, Final CTA. Every section
reads its content through `src/lib/content/home.ts` (backed by
`src/content/home.ts`) — see "Content Architecture" below. No photographs
are used (see [docs/MEDIA_ATTRIBUTIONS.md](docs/MEDIA_ATTRIBUTIONS.md) for
why and what remains to be replaced); the hero and cards use original
CSS/SVG compositions and Lucide icons instead.

### Study Abroad and Check Eligibility

Built in Phase 4, all statically generated, all reading content exclusively through `src/lib/content/{destinations,study-abroad,eligibility,services}.ts`:

- **`/study-abroad` (hub)** — hero, intro, a destination selector (plain server-rendered links — no client-side filtering, since six destinations doesn't need it), links to the two study-level pages, "how Janan supports the journey", the shared generic application process, scholarship guidance, visa-document guidance, a qualitative-only destination comparison table (no rankings/scores), a parent/family reassurance section, FAQ, and a final CTA.
- **`/study-abroad/[destination]`** — **one shared template** (composed in `src/app/(public)/study-abroad/[destination]/page.tsx` from components under `src/components/study-abroad/`) rendering all 6 destinations (`united-kingdom`, `australia`, `canada`, `united-states`, `germany`, `ireland`) from typed content in `src/content/destinations.ts` — there is no per-destination page file. An invalid slug calls `notFound()` → the site's custom 404 page. See "How to add another destination" below.
- **`/study-abroad/undergraduate`** and **`/study-abroad/postgraduate`** — **one shared component**, `StudyLevelTemplate`, rendering both from `StudyLevelPageContent` records in `src/content/study-abroad.ts` — there is no second, duplicated implementation for the other study level.
- **`/check-eligibility`** — informative content (Phase 4) plus a real `EligibilityForm` (Phase 7) — see "Forms" below.

**Content-accuracy policy** (enforced by `src/content/destinations.test.ts` and `src/content/study-abroad.test.ts`): every destination record avoids precise visa fees, guaranteed processing times, fixed financial thresholds, promised work rights, universal deadlines, and invented scholarships/university partnerships; every visa/cost/scholarship field uses "general guidance"/"may change" language and points to the relevant official government or institution source; every destination carries a `lastReviewed` date. See "Content Accuracy" in [docs/DECISIONS.md](docs/DECISIONS.md) for the full policy and its sourcing constraints.

#### How to add another destination

1. Add one `Destination` record to the `destinations` array in `src/content/destinations.ts` (see existing records for the required shape and content-accuracy expectations above).
2. That's it — `generateStaticParams` in `src/app/(public)/study-abroad/[destination]/page.tsx` picks it up automatically, as does the hub's destination selector/comparison table and the header/footer navigation (both derived from `src/content/destinations.ts`, per "Navigation configuration" below).
3. Add its `relatedServices` slugs only if they already exist in `src/content/services.ts`, and add photography only per the process in [docs/MEDIA_ATTRIBUTIONS.md](docs/MEDIA_ATTRIBUTIONS.md) — otherwise leave `image`/`imageAlt` unset to use the existing icon/gradient treatment.

### Services and Insurance

Built in Phase 5, all statically generated, all reading content exclusively through `src/lib/content/{services,insurance,site}.ts`:

- **`/services` (hub)** — hero, three primary service categories (Study Planning, Application Preparation, Journey Preparation — the last also links out to `/insurance` rather than duplicating it as a `Service` record), a complete 7-card service grid, "how support works", the shared Study Abroad application journey (reused from Phase 4, not re-authored), the homepage's insurance teaser (reused component), an honest "what we don't control or guarantee" section, FAQ, and a consultation CTA.
- **`/services/[slug]`** — **one shared template** (`ServiceTemplate`, composed from components under `src/components/services/`) rendering all 7 services (`study-abroad-counselling`, `university-course-selection`, `application-assistance`, `visa-guidance`, `scholarship-guidance`, `accommodation-support`, `pre-departure-guidance`) from typed content in `src/content/services.ts` — there is no per-service page file. Services with a required regulatory/integrity notice (Application Assistance, Student Visa Guidance, Scholarship Guidance) render it as a prominent callout via `Service.importantNotice`, never small print. An invalid slug calls `notFound()` → the site's custom 404 page.
- **`/insurance` (hub)** — hero, three insurance-category cards, "why insurance may be required", general comparison considerations, the quote-assistance process, coverage/exclusions and claims-support explanations, the required global insurance disclosure, FAQ, and a quote CTA. Clearly states insurance guidance is related to, but separate from, education consulting.
- **`/insurance/[slug]`** — **one shared template** (`InsuranceTemplate`) rendering all 3 insurance types (`student-health-insurance`, `travel-insurance`, `visitor-insurance`) from `src/content/insurance.ts` — no per-type page file.
- **`/insurance-quote`** — the **first real form** in this codebase (Phase 5), refactored onto the shared form architecture in Phase 7. React Hook Form + Zod (`src/lib/validation/insuranceQuote.ts`), client-side only, labelled as a development/demo form. On a valid submission it calls the shared `notConfiguredAdapter` and shows the required "not connected yet" message with real phone/email/WhatsApp links — it never simulates success, makes a network request, logs field values, or writes to storage. Does not collect passport numbers or medical history. See "Forms" below.

**Content-accuracy policy** (enforced by `src/content/services.test.ts` and `src/content/insurance.test.ts`): no invented named scholarships, no university rankings, no guaranteed visa/admission/scholarship outcomes, no claim that Janan is an insurer/underwriter, no fabricated providers. See "Content Accuracy" in [docs/DECISIONS.md](docs/DECISIONS.md).

#### How to add another service

1. Add one `Service` record to the `services` array in `src/content/services.ts` (see existing records for the required shape, and add its `category` to route it into the right hub section).
2. That's it — `generateStaticParams` in `src/app/(public)/services/[slug]/page.tsx` picks it up automatically, as does the hub's category section, card grid, and header/footer navigation.
3. Only reference `relatedServiceSlugs` that already exist elsewhere in the same array — a schema test (`src/content/services.test.ts`) enforces no broken, self-, or duplicate references.

#### Form behavior (current track)

See "Forms" below for the full, Phase 7-consolidated architecture shared by all four forms (Consultation, Eligibility, Insurance Quote, Contact).

### Remaining Public Content Pages

Built in Phase 6, all statically generated, all reading content exclusively through `src/lib/content/{team,about,success-stories,resources,events,scholarships,faq,contact,legal}.ts`. Every page follows the site-wide Content Accuracy policy — no invented company history, staff, testimonials, events, or scholarships:

- **`/about`** — mission, values, "how Janan supports clients", the Study Abroad/Insurance service distinction, guidance principles, and a team preview linking to `/team`. Displays a clearly-labelled temporary-content note wherever company history will later go.
- **`/team`** — five role-based placeholder cards (Senior Education Counsellor, Admissions Adviser, Visa Documentation Adviser, Insurance Support Adviser, Student Support Coordinator), each labelled "Profile to be added." — no real or fictional name, photo, or credential exists anywhere in this codebase.
- **`/success-stories`** — an empty-state explanation that verified stories require student permission, plus three "Demo content"-labelled example-journey cards. No offer letters, passport information, or private records; no `Review`/`AggregateRating` structured data.
- **`/resources`** (hub) and **`/resources/[slug]`** — 6 genuinely useful articles across 5 categories, one shared `ResourceArticleTemplate` (breadcrumbs, reading time, table of contents, structured sections, related articles, general-information notice). No specific legal, immigration, medical or financial claims.
- **`/events`** and **`/events/[slug]`** — one sample entry, clearly labelled, with "Schedule to be announced" rather than an invented date. No registration flow, no fake urgency, and no `Event` JSON-LD is emitted for it.
- **`/faq`** — 8 categorized, keyboard-accessible accordions (General, Study Abroad, University Applications, Visa Guidance, Scholarships, Insurance, Accommodation, Consultations) covering every required topic honestly.
- **`/contact`** — contact methods, general location, an office-hours placeholder, a static map placeholder, and a real `ContactForm` (see "Forms" below).
- **`/scholarships`** (hub) and **`/scholarships/[slug]`** — a polished empty state explaining no active scholarship is published yet, plus two records explicitly named "Content Template — ..." (`isTemplate: true`) demonstrating the intended structure. No deadline or opening date is ever published without official verification.
- **`/legal/privacy-policy`, `/legal/terms-of-service`, `/legal/cookie-policy`, `/legal/disclaimer`** — four temporary drafts, each displaying the required verbatim notice: _"Temporary draft—professional legal review required before production launch."_ See [docs/DECISIONS.md](docs/DECISIONS.md) "Legal Draft Status".

#### How to add another resource article

1. Add one `ResourceArticle` record to `src/content/resources.ts` (assign an existing `categoryId`, or add a new `ResourceCategory` first).
2. That's it — `generateStaticParams` in `src/app/(public)/resources/[slug]/page.tsx` picks it up automatically, as does the hub's category grouping and `relatedArticleSlugs` resolution.

#### How to add a verified event

Replace or add to the `events` array in `src/content/events.ts`. Once a date is genuinely confirmed, set `eventStatus: "scheduled"` and populate `startAt`/`endAt`/`timeZone`/`location` — only then does `/events/[slug]` emit `Event` JSON-LD (see the `canEmitEventJsonLd` check in that page). Leave `isSampleContent: true` off real records.

#### How to add a verified scholarship

Replace or add to the `scholarships` array in `src/content/scholarships.ts`. Once eligibility, provider, and dates are officially verified, remove `isTemplate: true` and rename away from the "Content Template — ..." naming convention (this requires a `Scholarship` type/policy update, not just a content edit — see docs/DECISIONS.md "Scholarship Directory Policy").

#### How to replace team placeholders

Edit `src/content/team.ts`: replace a record's `roleSummary`/`icon` with real content once available, remove `isPlaceholder`/`placeholderNote`, and add real fields (photo, bio, credentials) — this requires extending the `TeamMember` type first, since no such fields exist locally today (deliberately, per docs/DECISIONS.md "Team Placeholders").

### Forms

Built in Phase 5 (`/insurance-quote`) and Phase 6 (`/contact`), completed in Phase 7 (`/book-consultation`, `/check-eligibility`, and consolidation of all four onto one shared architecture). All four forms are client-side only — no database, no API route, no real submission provider exists in this track.

- **`/book-consultation`** — `ConsultationForm` (`src/components/consultation/ConsultationForm.tsx`, schema at `src/lib/validation/consultation.ts`). Personal details, study interests, and a consultation preference (date, time of day, meeting method — phone call, WhatsApp call, video, or in-person) with the required notice that the selected date/time are preferences, not a confirmed booking.
- **`/check-eligibility`** — `EligibilityForm` (`src/components/eligibility/EligibilityForm.tsx`, schema at `src/lib/validation/eligibility.ts`), a single grouped page (not a multi-step wizard — see docs/DECISIONS.md C-046) covering personal details, academic background, English language (test type/score fields appear only once "I have taken an English language test" is checked), study preferences (a native-checkbox multi-select of preferred destinations), and additional comments. Never produces an eligibility result — the required notice states this explicitly.
- **`/insurance-quote`** — `InsuranceQuoteForm`, refactored onto the shared architecture; gained a coverage-start-date-not-in-past check and a "not sure yet" insurance type in Phase 7.
- **`/contact`** — `ContactForm`, refactored onto the shared architecture; its enquiry-type list expanded from 5 to 8 options in Phase 7.

**Shared architecture** (`src/types/forms.ts`, `src/lib/forms/`, `src/components/forms/`) — see docs/TECHNICAL_ARCHITECTURE.md §5 and docs/DECISIONS.md C-043 for full detail:

- `SubmissionAdapter`/`SubmissionResult` is the interface every form submits through. `notConfiguredAdapter` (`src/lib/forms/adapters/notConfiguredAdapter.ts`) is the only Track 1 implementation — it always resolves `{ status: "not-configured" }`, and makes no network request, writes nothing to storage, and logs nothing.
- `src/lib/forms/messages.ts` centralizes every verbatim string (demo notice, not-connected message, consent label, sensitive-data warning, consultation preference-only note) so wording can't drift between forms.
- Shared components `FormField`, `FormErrorSummary`, `FormDemoNotice`, `FormSubmittedNotice`, `ConsentField`, and the `useDemoFormSubmit` hook replace what used to be duplicated per-form code.
- **To connect a real submission service (Track 2):** implement a new `SubmissionAdapter` and have each form call it instead of `notConfiguredAdapter` — no other form code should need to change. Add the server-side protections documented in "Form Security Preparation" (docs/TECHNICAL_ARCHITECTURE.md §5) at that boundary first; none of them exist today because no form makes a request.

### Public site shell

Every route under `(public)` is wrapped by one shared shell (`src/app/(public)/layout.tsx`): an announcement bar, sticky header (logo, navigation, primary CTA, mobile menu), the page's own `<main>` content, footer, and a mobile-only quick-actions bar. See "Shared Website Shell" in [docs/TECHNICAL_ARCHITECTURE.md](docs/TECHNICAL_ARCHITECTURE.md) for how it's composed and how to build a future page that opts out of it.

## Overview

Janan Consultancy is a study-abroad consultancy. This repository holds the source for its public marketing website (currently a static Next.js site; content management moves to Strapi in a later phase), covering:

- University and course selection guidance
- Admission application assistance
- Scholarship guidance
- Student visa guidance
- Travel and student health insurance
- Accommodation assistance
- Pre-departure guidance
- Events and webinars
- General consultation booking

The site is English-only for Version 1, mobile-first, and designed to read as a trustworthy international consultancy rather than a generic template.

## Documentation Index

| Document                                                         | Purpose                                                                                  |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [docs/PRODUCT_REQUIREMENTS.md](docs/PRODUCT_REQUIREMENTS.md)     | Goals, audiences, functional/non-functional requirements, scope, acceptance criteria     |
| [docs/SITEMAP.md](docs/SITEMAP.md)                               | Planned static-site routes, URL patterns, navigation and footer structure                |
| [docs/USER_JOURNEYS.md](docs/USER_JOURNEYS.md)                   | End-to-end journeys per audience segment                                                 |
| [docs/TECHNICAL_ARCHITECTURE.md](docs/TECHNICAL_ARCHITECTURE.md) | Application architecture, security, SEO, accessibility, performance, testing, deployment |
| [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)                   | Brand foundations, colour/typography, components, motion, temporary-content rules        |
| [docs/CONTENT_MODEL.md](docs/CONTENT_MODEL.md)                   | Content entities, fields, relationships, publishing and lead-management workflows        |
| [docs/IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md)       | Phased delivery plan with deliverables, dependencies, tests, exit criteria               |
| [docs/DECISIONS.md](docs/DECISIONS.md)                           | Architecture decision log: confirmed, proposed, and unresolved                           |
| [docs/MEDIA_ATTRIBUTIONS.md](docs/MEDIA_ATTRIBUTIONS.md)         | Source/creator/licence log for any non-original media, and the replacement procedure     |

Engineering rules for anyone (human or agent) working in this repository are in [CLAUDE.md](CLAUDE.md).

## Technical Stack

Scaffolded in Phase 1 with these current-stable versions (see [docs/DECISIONS.md](docs/DECISIONS.md) for rationale on notable choices):

- **Framework:** Next.js 16.3.5 (App Router, Turbopack, static generation), React 19.2.8, TypeScript 5
- **Styling / UI:** Tailwind CSS 4, shadcn/ui (Radix-based, used where genuinely useful), Lucide React
- **Content:** local typed TypeScript content (`src/content/`, `src/types/content.ts`), read through a content-access layer (`src/lib/content/`) — see "Content Architecture" below
- **Validation / forms:** Zod 4, React Hook Form 7, `@hookform/resolvers` — client-side only, one shared architecture across all four forms since Phase 7 (see "Forms" above)
- **Testing:** Vitest 5 + Testing Library (unit/component), Playwright (E2E)
- **Tooling:** ESLint 9 (flat config), Prettier 3 + `prettier-plugin-tailwindcss`

**Explicitly not part of the current static-website track** (see the roadmap above): PostgreSQL, Prisma, any other ORM/database, Auth.js or any auth library, a custom admin dashboard, an API server, and any persistent storage of form submissions. These belong to later tracks (form-service integration, Strapi CMS integration) and must not be introduced ahead of that work.

## Content Architecture

- `src/types/content.ts` — shared TypeScript types for content, designed to match the target Strapi content model in [docs/CONTENT_MODEL.md](docs/CONTENT_MODEL.md) so a later Strapi-backed implementation needs no UI changes.
- `src/content/` — local typed content objects (the current "database"): `site.ts` (identity + contact), `navigation.ts` (header/footer/legal links), `destinations.ts` (full `Destination` records), `services.ts` (full `Service` records + Services-hub-only content), `insurance.ts` (full `InsuranceService` records + Insurance-hub content + the global insurance disclosure), `social-links.ts`, `announcement.ts`, `home.ts` (all homepage-specific copy: hero, trust points, process steps, why-choose reasons, featured-university placeholders, scholarship highlights, success-story demos, insurance highlights, sample event, resource summaries, FAQ, final CTA), `study-abroad.ts` (Study Abroad hub + undergraduate/postgraduate study-level content, and the shared generic application process — see "Study Abroad and Check Eligibility" above), `eligibility.ts` (`/check-eligibility` page content).
- `src/lib/validation/` — Zod schemas for form input (`consultation.ts`, `eligibility.ts`, `insuranceQuote.ts`, `contactForm.ts`); `src/types/forms.ts` + `src/lib/forms/` — the shared, replaceable form architecture (`SubmissionAdapter`/`notConfiguredAdapter`, centralized messages, shared field/error/consent components) every form calls instead of making its own network request. See "Forms" above.
- `src/lib/content/` — the content-access layer. **Pages and components must read content through this layer**, not by importing `src/content/*` directly, so the local implementation can later be swapped for Strapi API calls without touching any page.
- `src/config/site.ts` — structural feature toggles (announcement bar, mobile quick actions), distinct from marketing content and from environment variables.
- `public/images/`, `public/videos/` — local placeholder media.

### Contact-data configuration

All contact details (phone, WhatsApp, email, address) live in **one place**: `ContactInfo` inside `src/content/site.ts`. Every place that shows a phone/WhatsApp/email link (header mobile menu, mobile quick-actions bar, footer, and every form's shared `FormSubmittedNotice` "not connected yet" contact links since Phase 7) reads it via `getSiteContent()` — update the one object to change it everywhere. Current values are obvious, non-production placeholders (`+92 300 0000000`, `hello@example.com`, "Islamabad, Pakistan").

### Navigation configuration

Header and footer navigation are entirely data-driven from `src/content/navigation.ts`:

- `headerNavigation` — top-level items; an item with `children` renders as an accessible dropdown (desktop) or an expandable `<details>` group (mobile). The Destinations, Services, and Insurance dropdowns are generated from `src/content/{destinations,services,insurance}.ts` rather than duplicated by hand.
- `headerPrimaryCta` — the "Book Free Consultation" button shown in the header and mobile menu.
- `footerLinkGroups` — the footer's link columns.
- `legalLinks` — the footer's legal-page links.

Add a destination, service, or insurance type by adding one entry to `destinations.ts`, `services.ts`, or `insurance.ts` — its nav entry and static, fully-rendered detail page are all generated automatically (see "How to add another destination"/"How to add another service" above).

### Logo replacement procedure

The brand mark is one component, `src/components/shared/SiteLogo.tsx` — an original, code-based SVG (no downloaded asset). To swap in a commissioned logo later, edit only this file's SVG markup; every call site (`SiteHeader`, `SiteFooter`, the homepage, the mobile menu) picks up the change automatically via the existing `variant="compact" | "full"` prop.

### Mobile quick-actions behavior

`src/components/shared/MobileQuickActions.tsx` renders a fixed Call/WhatsApp/Book bar below the `md` breakpoint only, respecting the device safe-area inset. It sits below the footer on every page, so the compensating bottom padding lives on `SiteFooter.tsx`'s own closing legal row (not `<main>` — a footer-covering bug found via a real Hostinger test deploy, see docs/DECISIONS.md C-059) so the bar never covers page content. **To disable it**, set `mobileQuickActionsEnabled: false` in `src/config/site.ts` — both the bar and the compensating padding disappear together.

## Getting Started

### Prerequisites

- Node.js 20.9+ (Next.js 16 minimum) — this project was built and verified on Node 24
- npm (the project's package manager; do not introduce a second lockfile)

### Installation

```bash
npm install
```

### Environment setup

```bash
cp .env.example .env.local
```

`NEXT_PUBLIC_SITE_URL` is the only variable currently used (for absolute URLs in metadata). The app falls back to `http://localhost:3000` in development if it's unset, so a missing `.env.local` will not crash `next dev`. See [src/lib/env.ts](src/lib/env.ts) for the validated accessor — never read `process.env` directly elsewhere in the app.

### Development

```bash
npm run dev
```

Serves the app at `http://localhost:3000` with the full header/footer shell and every planned route reachable (see "Current routes" above). A custom 404 page renders for any unmapped URL.

### Validation commands

```bash
npm run lint          # ESLint
npm run typecheck     # TypeScript, no emit
npm run format        # Prettier — write
npm run format:check  # Prettier — check only
npm run test          # Vitest unit/component tests
npm run test:watch    # Vitest in watch mode
npm run test:e2e      # Playwright E2E (requires: npx playwright install)
npm run build         # Production build
```

## Current Temporary Content

The following are deliberately obvious placeholders, centralized so they're easy to replace (see "Content Architecture" above for where each lives):

- **Contact details** (`src/content/site.ts`): phone/WhatsApp `+92 300 0000000`, email `hello@example.com`, address "Islamabad, Pakistan".
- **Social links** (`src/content/social-links.ts`): all four platforms point at `#` and render visibly disabled — no real profile exists yet.
- **Announcement bar message** (`src/content/announcement.ts`): generic, no fake deadlines or urgency.
- **`/universities`**: still renders the shared "coming soon" placeholder — every other route now has real content.
- **Featured universities** (`src/content/home.ts`, `featuredUniversityPlaceholders`): four neutral, unnamed placeholder cards, visibly labelled "Sample university discovery experience" — no real institution names or logos.
- **Success stories** (`src/content/home.ts`, `successStoryDemos`, and `src/content/success-stories.ts`): demonstration profiles/example journeys only (initials or alias, no real names/photos), each visibly labelled "Demo content" — no real, consented testimonial exists yet.
- **Upcoming event** (`src/content/events.ts`): one sample entry with schedule "Schedule to be announced" — no invented date.
- **Hero/section imagery**: original CSS/SVG compositions, not photographs — see [docs/MEDIA_ATTRIBUTIONS.md](docs/MEDIA_ATTRIBUTIONS.md).
- **All four forms** (`/book-consultation`, `/check-eligibility`, `/insurance-quote`, `/contact`): real, validated, but not-yet-connected demo forms — labelled on every form, and on a valid submission all four show a message directing visitors to contact Janan directly instead of a fake success state. See "Forms" above.
- **`/team`** (`src/content/team.ts`): five role-based placeholder cards, each labelled "Profile to be added." — no real staff information exists yet.
- **`/scholarships`** (`src/content/scholarships.ts`): two records explicitly named "Content Template — ..." — no active, verified scholarship exists yet.
- **The four `/legal/*` pages** (`src/content/legal.ts`): temporary drafts, each displaying "Temporary draft—professional legal review required before production launch." — not reviewed by a qualified professional and not production-approved.

No fabricated statistics, testimonials, partnerships, or accreditations exist anywhere in the current content — see [CLAUDE.md](CLAUDE.md) "Content and Business-Claim Rules". For the full, launch-blocker-classified version of this list, see [docs/PRODUCTION_CONTENT_CHECKLIST.md](docs/PRODUCTION_CONTENT_CHECKLIST.md).

## Brand Reference (Temporary)

| Token                           | Value                               |
| ------------------------------- | ----------------------------------- |
| Ink                             | `#14213D`                           |
| Primary blue                    | `#3157F6`                           |
| Deep blue                       | `#173B8F`                           |
| Teal                            | `#12A594`                           |
| Coral (accent, background only) | `#FF7A59`                           |
| Pale surfaces                   | `#EEF4FF` / `#EAF9F5` / `#FFF7F1`   |
| Background                      | `#FFFFFF` (page) / `#F7F9FC` (soft) |
| Text                            | `#172033`                           |

Full brand and design guidance: [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md).
