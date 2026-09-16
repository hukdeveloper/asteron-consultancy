# Changelog

All notable changes to the Asteron Global Consultancy website are recorded here. This project has not yet had a versioned release — see the `Unreleased` section below for everything built so far. No release date or version number is set until the lead architect decides to cut one; entries move out of `Unreleased` at that point.

Format loosely follows [Keep a Changelog](https://keepachangelog.com/), adapted for a phase-based engineering log (see [docs/IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md) and [docs/DECISIONS.md](docs/DECISIONS.md) for the detailed, per-phase record this summarizes).

## [Unreleased]

### Public website

- Statically generated Next.js (App Router) site, English-only, typed local content — no database, no authentication, no admin dashboard, no CMS (Strapi deferred to a future track).
- Shared site shell: sticky header with accessible dropdown navigation (desktop) and a Sheet-based mobile menu, footer, skip-to-content link, mobile quick-actions bar (Call/WhatsApp/Book Consultation).
- Full homepage: hero, trust strip, services/destinations/insurance/resources teasers, "how it works," "why choose us," featured universities (placeholder), scholarship highlights, sample success stories (demo-labelled), a sample event, FAQ, final CTA.
- `/about`, `/team` (role-based placeholder profiles), `/success-stories` (empty-state + demo examples), `/faq` (8 categories), `/contact`.

### Study Abroad

- `/study-abroad` hub, `/study-abroad/undergraduate`, `/study-abroad/postgraduate`, and `/study-abroad/[destination]` (6 destinations: UK, Australia, Canada, United States, Germany, Ireland) — one shared template, general-guidance content with a documented content-accuracy policy.
- `/check-eligibility` — informative content plus a real, validated `EligibilityForm` (no automated eligibility determination is ever shown).

### Services and Insurance

- `/services` hub and `/services/[slug]` (7 services, one shared template).
- `/insurance` hub, `/insurance/[slug]` (3 insurance types), and `/insurance-quote` with a real, validated `InsuranceQuoteForm`.
- Required regulatory/integrity disclaimers (visa guidance, scholarships, insurance) rendered as prominent callouts, never small print.

### Resources and Events

- `/resources` hub and `/resources/[slug]` (6 articles across 5 categories).
- `/events` and `/events/[slug]` (one sample entry, clearly labelled, no invented date).
- `/scholarships` and `/scholarships/[slug]` (two explicit content-template records — no active scholarship published).
- `/legal/privacy-policy`, `/legal/terms-of-service`, `/legal/cookie-policy`, `/legal/disclaimer` — four drafts, each displaying a required "professional legal review required" notice.

### Forms

- One shared, replaceable form architecture (`SubmissionAdapter`, `notConfiguredAdapter`, centralized copy, shared accessible components) powering all four forms: Consultation (`/book-consultation`), Eligibility (`/check-eligibility`), Insurance Quote (`/insurance-quote`), and Contact (`/contact`).
- Every form validates entirely client-side (React Hook Form + Zod); no form makes a network request, writes to `localStorage`/`sessionStorage`, logs field values, or places values in the URL. A valid submission always shows an explicit not-connected message with real contact links — never a fake success state.

### SEO

- Unique title/description and canonical URL on every route; `sitemap.xml`/`robots.txt` generated from local content, excluding drafts/templates/sample-detail pages.
- Site-wide `Organization`/`WebSite` JSON-LD plus per-page `BreadcrumbList`/`FAQPage`, all through one safe, script-injection-resistant serialization helper.
- Code-generated default Open Graph image and favicon (brand colours, real name/tagline, no stock photography).

### Accessibility

- WCAG 2.2 AA target: semantic landmarks, accessible form labels/error associations, visible focus states, full keyboard operability, no colour-only or motion-only signalling.
- Automated axe-based checks across every representative page and all four forms' error states.

### Testing

- 385+ Vitest unit/component tests (content schemas, content-accuracy policy, components, utilities) and a dedicated content-integrity suite (`npm run validate:content`).
- 190+ Playwright end-to-end tests: every page family, all four forms, accessibility, a 6-viewport × 13-page responsive matrix, and a full internal-link crawl.

### Documentation

- Complete architecture, content-model, sitemap, route-inventory, design-system, product-requirements, and decisions documentation, kept in sync with the implementation phase by phase.
- Deployment guide, production content checklist (every placeholder classified by launch-blocker severity), and this changelog.

### Known limitations (by design, current track)

- All business contact details, legal pages, and several content areas (team, testimonials, scholarships, events, social links) remain clearly labelled placeholders — see [docs/PRODUCTION_CONTENT_CHECKLIST.md](docs/PRODUCTION_CONTENT_CHECKLIST.md).
- Forms do not transmit or store data — real form delivery is a separate, later track.
- No analytics, no cookie consent system (none needed — nothing non-essential is set today).
- Not yet deployed to any hosting platform.
