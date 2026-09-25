# CLAUDE.md — Engineering Rules for Janan Consultancy

This file governs how Claude Code (or any engineering agent) works on this repository. It applies to every phase of the project, from documentation through implementation, testing, and deployment.

## Project Purpose

Janan Consultancy ("Janan") is building a modern, trustworthy, English-only marketing website for a study-abroad consultancy. The site presents services (university/course selection, admissions support, scholarships, visa guidance, insurance, accommodation, pre-departure support, events, and general consultation).

The roadmap is deliberately staged into four tracks (see [docs/IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md)):

1. **Static website** (current track) — a statically generated Next.js site backed by local typed content, with client-side-only lead-generation forms behind a replaceable, clearly-labelled demo submission adapter. No database, no authentication, no admin dashboard, no persistent storage of any kind.
2. **Form-service integration** (future) — wire the form adapter to a real external submission/email service.
3. **Strapi CMS integration** (future) — replace the local content layer's implementation with a Strapi-backed API so non-engineers can manage content; Strapi's own admin UI is used rather than a custom-built one.
4. **Advanced portal features** (future, only if ever required) — student accounts, application tracking, payments, etc.

Do not build ahead of the current track. In particular: do not add a database, an ORM, an authentication library, a custom admin area, or code that pretends a form submission was durably saved when no submission provider exists. See [docs/PRODUCT_REQUIREMENTS.md](docs/PRODUCT_REQUIREMENTS.md) for full scope boundaries per track.

## Before You Start Work

1. **Read the relevant documentation first.** Before making any change, consult the documents under [docs/](docs/) that relate to the area you are touching:
   - Product scope questions → [docs/PRODUCT_REQUIREMENTS.md](docs/PRODUCT_REQUIREMENTS.md)
   - Page structure / routing → [docs/SITEMAP.md](docs/SITEMAP.md)
   - User flows → [docs/USER_JOURNEYS.md](docs/USER_JOURNEYS.md)
   - System design, stack, security, SEO, testing → [docs/TECHNICAL_ARCHITECTURE.md](docs/TECHNICAL_ARCHITECTURE.md)
   - Visual/brand/component rules → [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)
   - Data entities and relationships → [docs/CONTENT_MODEL.md](docs/CONTENT_MODEL.md)
   - Phase sequencing → [docs/IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md)
   - Confirmed/open decisions → [docs/DECISIONS.md](docs/DECISIONS.md)
2. **Do not skip ahead of the current phase.** Work proceeds phase by phase as defined in [docs/IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md). Do not scaffold, install dependencies, or write application code earlier than the plan specifies unless the lead architect explicitly instructs otherwise for that session.
3. **Produce a plan before major implementation.** For any non-trivial feature, schema change, or architectural change, present a short plan (approach, files touched, risks) before writing code. Small, obviously-scoped fixes do not require this.

## Content and Business-Claim Rules

- **Never invent or present fictional information as verified fact.** No real statistics, partnership names, accreditation claims, visa success rates, or testimonials may be fabricated.
- Any statistic, testimonial, partnership, certification, award, or accreditation used before verified data is supplied must be visibly and unambiguously labelled as **sample/demo content** in the UI, not just in code comments.
- Never state or imply that Janan is a licensed immigration adviser, an insurer, a university representative, or an immigration authority, unless the lead architect supplies verified information authorizing that claim.
- Insurance content must always be presented as a distinct, clearly labelled service category with appropriate disclaimers (see [docs/CONTENT_MODEL.md](docs/CONTENT_MODEL.md)).
- When a genuine business decision (pricing, legal wording, real partnerships, verified stats) is unavailable, record it as an **unresolved question** in [docs/DECISIONS.md](docs/DECISIONS.md) instead of inventing an answer.

## Engineering Standards

- Strong TypeScript typing; avoid `any`. Validate all external input (forms, query params, env vars) with Zod schemas defined centrally.
- Server components by default; use client components only where interactivity requires them.
- Pages and components read content through the content-access layer (`src/lib/content/`), never by importing files under `src/content/` directly — this is what lets a later phase swap in a Strapi API without touching any page.
- Preserve accessibility (WCAG 2.2 AA target) and security posture (input validation, output encoding) in every change — do not regress these for convenience.
- Write or update tests (unit/integration/E2E as appropriate) for behavior you add or change, and run relevant validation (typecheck, lint, tests) before considering work complete.
- Do not add speculative abstractions, feature flags, or backwards-compatibility shims for scenarios that do not exist yet.

## Documentation Maintenance

- If a decision changes (scope, stack, data model, design direction), update the relevant document in [docs/](docs/) and log the change in [docs/DECISIONS.md](docs/DECISIONS.md) in the same session as the change.
- Documentation and code must not drift silently — a change that invalidates a documented assumption requires a documentation update.

## Reporting

- After completing each phase of work, produce a **concise completion report** covering: what was done, what was intentionally deferred, assumptions made, and unresolved questions for the lead architect.
- Do not bundle unrelated work into a phase without flagging it.

## Precedence

The lead architect's supplied phase prompt for a given session is the **primary source of truth for that session** and overrides general implementation preferences or defaults described in this file where the two conflict. This file governs behavior when the phase prompt is silent on a topic.
