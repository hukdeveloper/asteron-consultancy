# Asteron Global Consultancy — Website

**Tagline:** Guidance Beyond Borders

## Project Status

> **Not production-ready.** This is a **static website** — see the roadmap below. Phase 2 (design system, static content architecture, and shared website shell) is complete: a working, statically-generated Next.js site now has a full header/footer/navigation shell, a data-driven content layer, and every planned route reachable (most as a temporary "coming soon" placeholder). There is **no database, no authentication, no admin dashboard, no CMS, and no persistent form storage — none of these are planned for the current track.** See [docs/IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md) for the phased plan and current status.

### Roadmap

1. **Static website** (current) — statically generated Next.js site, local typed content, client-side-only forms behind a demo submission adapter.
2. **Form-service integration** (future) — connect the form adapter to a real external submission/email service.
3. **Strapi CMS integration** (future) — replace the local content layer's implementation with a Strapi-backed API; content is managed in Strapi's own admin, not a custom-built one.
4. **Advanced portal features** (future, only if ever required) — student accounts, application tracking, payments, etc.

### Current routes

| Route                                                                                                                                                                                                                                                                                             | Purpose                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                                                                                                                                                                                                                                                                                               | Temporary development homepage — demonstrates brand identity, typography, colour tokens, and shared components. Not the final marketing homepage.                                                                                                   |
| `/about`, `/study-abroad`, `/study-abroad/[destination]`, `/universities`, `/services`, `/services/[slug]`, `/scholarships`, `/insurance`, `/success-stories`, `/resources`, `/resources/faqs`, `/events`, `/contact`, `/book-consultation`, `/check-eligibility`, `/insurance-quote`, `/legal/*` | Every route in [docs/SITEMAP.md](docs/SITEMAP.md) exists and is reachable from the header/footer navigation, but renders a shared "coming soon" placeholder (`src/components/shared/ComingSoon.tsx`) until Phase 3 replaces each with real content. |

Custom `not-found` (404) and error boundaries are also in place.

### Public site shell

Every route under `(public)` is wrapped by one shared shell (`src/app/(public)/layout.tsx`): an announcement bar, sticky header (logo, navigation, primary CTA, mobile menu), the page's own `<main>` content, footer, and a mobile-only quick-actions bar. See "Shared Website Shell" in [docs/TECHNICAL_ARCHITECTURE.md](docs/TECHNICAL_ARCHITECTURE.md) for how it's composed and how to build a future page that opts out of it.

## Overview

Asteron Global Consultancy is a study-abroad consultancy. This repository holds the source for its public marketing website (currently a static Next.js site; content management moves to Strapi in a later phase), covering:

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

Engineering rules for anyone (human or agent) working in this repository are in [CLAUDE.md](CLAUDE.md).

## Technical Stack

Scaffolded in Phase 1 with these current-stable versions (see [docs/DECISIONS.md](docs/DECISIONS.md) for rationale on notable choices):

- **Framework:** Next.js 16.3.5 (App Router, Turbopack, static generation), React 19.2.8, TypeScript 5
- **Styling / UI:** Tailwind CSS 4, shadcn/ui (Radix-based, used where genuinely useful), Lucide React
- **Content:** local typed TypeScript content (`src/content/`, `src/types/content.ts`), read through a content-access layer (`src/lib/content/`) — see "Content Architecture" below
- **Validation / forms:** Zod 4, React Hook Form 7, `@hookform/resolvers` (client-side only for now — see roadmap)
- **Testing:** Vitest 5 + Testing Library (unit/component), Playwright (E2E)
- **Tooling:** ESLint 9 (flat config), Prettier 3 + `prettier-plugin-tailwindcss`

**Explicitly not part of the current static-website track** (see the roadmap above): PostgreSQL, Prisma, any other ORM/database, Auth.js or any auth library, a custom admin dashboard, an API server, and any persistent storage of form submissions. These belong to later tracks (form-service integration, Strapi CMS integration) and must not be introduced ahead of that work.

## Content Architecture

- `src/types/content.ts` — shared TypeScript types for content, designed to match the target Strapi content model in [docs/CONTENT_MODEL.md](docs/CONTENT_MODEL.md) so a later Strapi-backed implementation needs no UI changes.
- `src/content/` — local typed content objects (the current "database"): `site.ts` (identity + contact), `navigation.ts` (header/footer/legal links), `destinations.ts`, `services.ts`, `social-links.ts`, `announcement.ts`.
- `src/lib/content/` — the content-access layer. **Pages and components must read content through this layer**, not by importing `src/content/*` directly, so the local implementation can later be swapped for Strapi API calls without touching any page.
- `src/config/site.ts` — structural feature toggles (announcement bar, mobile quick actions), distinct from marketing content and from environment variables.
- `public/images/`, `public/videos/` — local placeholder media.

### Contact-data configuration

All contact details (phone, WhatsApp, email, address) live in **one place**: `ContactInfo` inside `src/content/site.ts`. Every place that shows a phone/WhatsApp/email link (header mobile menu, mobile quick-actions bar, footer) reads it via `getSiteContent()` — update the one object to change it everywhere. Current values are obvious, non-production placeholders (`+92 300 0000000`, `hello@example.com`, "Islamabad, Pakistan").

### Navigation configuration

Header and footer navigation are entirely data-driven from `src/content/navigation.ts`:

- `headerNavigation` — top-level items; an item with `children` renders as an accessible dropdown (desktop) or an expandable `<details>` group (mobile). The Destinations and Services dropdowns are generated from `src/content/destinations.ts` / `services.ts` rather than duplicated by hand.
- `headerPrimaryCta` — the "Book Free Consultation" button shown in the header and mobile menu.
- `footerLinkGroups` — the footer's link columns.
- `legalLinks` — the footer's legal-page links.

Add a destination or service by adding one entry to `destinations.ts`/`services.ts` — its nav entry, footer visibility (if applicable), and static "coming soon" route are generated automatically (see `src/app/(public)/study-abroad/[destination]/page.tsx` and `.../services/[slug]/page.tsx`).

### Logo replacement procedure

The brand mark is one component, `src/components/shared/SiteLogo.tsx` — an original, code-based SVG (no downloaded asset). To swap in a commissioned logo later, edit only this file's SVG markup; every call site (`SiteHeader`, `SiteFooter`, the homepage, the mobile menu) picks up the change automatically via the existing `variant="compact" | "full"` prop.

### Mobile quick-actions behavior

`src/components/shared/MobileQuickActions.tsx` renders a fixed Call/WhatsApp/Book bar below the `md` breakpoint only, respecting the device safe-area inset. When enabled, `src/app/(public)/layout.tsx` adds matching bottom padding to `<main>` so it never covers page content. **To disable it**, set `mobileQuickActionsEnabled: false` in `src/config/site.ts` — both the bar and the compensating padding disappear together.

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
- **Every non-home route**: renders the shared "coming soon" placeholder, not real page content.

No fabricated statistics, testimonials, partnerships, or accreditations exist anywhere in the current content — see [CLAUDE.md](CLAUDE.md) "Content and Business-Claim Rules".

## Brand Reference (Temporary)

| Token      | Value     |
| ---------- | --------- |
| Primary    | `#0B1F3A` |
| Secondary  | `#0E9384` |
| Accent     | `#E5A93D` |
| Background | `#F7F9FC` |
| Text       | `#182230` |

Full brand and design guidance: [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md).
