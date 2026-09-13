# Sitemap — Asteron Global Consultancy

> **Scope correction (2026-09-12):** the initial release is a static website with no admin dashboard. This document now describes (1) the current/planned static-site routes, all statically generated from local content, and (2) how content is edited today vs. in the future Strapi phase. There is no `/admin` route in this codebase and none is planned — see [docs/DECISIONS.md](DECISIONS.md).

## 1. Static Site Routes (Track 1)

Only `/` is implemented so far (Phase 1 foundation). Everything else below is planned, to be built out with local typed content in the next phase, then statically generated.

```
/
├── about
├── study-abroad
│   └── study-abroad/[destination]
├── universities
│   └── universities/[slug]
├── services
│   └── services/[slug]
├── scholarships
│   └── scholarships/[slug]
├── insurance
├── success-stories
├── resources
│   └── resources/[slug]
├── events
├── contact
├── book-consultation
├── check-eligibility
├── insurance-quote
├── legal
│   ├── legal/privacy-policy
│   ├── legal/terms-of-service
│   └── legal/cookie-policy
├── 404 (not-found) — implemented
└── error (runtime error boundary) — implemented
```

## 2. Proposed URL Patterns

| Content type       | Pattern                       | Example                                  |
| ------------------ | ----------------------------- | ---------------------------------------- |
| Destination        | `/study-abroad/[destination]` | `/study-abroad/united-kingdom`           |
| University         | `/universities/[slug]`        | `/universities/university-of-manchester` |
| Service            | `/services/[slug]`            | `/services/visa-guidance-support`        |
| Scholarship        | `/scholarships/[slug]`        | `/scholarships/asteron-merit-award`      |
| Article / resource | `/resources/[slug]`           | `/resources/how-to-choose-a-destination` |

Slugs are lowercase, hyphen-separated, and defined directly in the local content objects (`src/content/`) for Track 1. Once Strapi is integrated (Track 3), slug uniqueness/validation moves into Strapi.

Every dynamic route above must be statically generated (`generateStaticParams`) from local content in Track 1 — no runtime data fetching to a database.

## 3. Header Navigation Structure (target, once pages exist)

- **Logo / Home**
- **Study Abroad** → destinations, universities
- **Services**
- **Scholarships**
- **Insurance**
- **Success Stories**
- **Resources**
- **Events**
- **About**
- **Contact**
- Persistent CTA button: **Book a Consultation**
- Mobile: condensed menu + sticky quick actions (Call, WhatsApp, Book Consultation)

## 4. Footer Structure (target)

- **Column 1 — Brand:** Logo, tagline ("Guidance Beyond Borders"), short mission statement.
- **Column 2 — Study Abroad:** Study Abroad, Universities, Scholarships.
- **Column 3 — Services:** Services overview, Insurance.
- **Column 4 — Company:** About, Success Stories, Resources, Events, Contact.
- **Column 5 — Get Started:** Book a Consultation, Check Eligibility, Insurance Quote.
- **Bottom bar:** Copyright, Privacy Policy, Terms of Service, Cookie Policy, sample-content disclosure link where applicable.

## 5. Content Editing — Current vs. Future

|                                   | Track 1 (current)                           | Track 3 (future)                                      |
| --------------------------------- | ------------------------------------------- | ----------------------------------------------------- |
| Where content lives               | `src/content/*.ts` (local typed TypeScript) | Strapi                                                |
| Who edits it                      | Engineers, via a pull request               | Non-engineering staff, via Strapi's own admin UI      |
| How pages read it                 | `src/lib/content/*` functions               | Same functions, re-implemented to call the Strapi API |
| Any custom-built admin dashboard? | No                                          | No — Strapi's own admin is used, not a bespoke one    |

## 6. Notes

- The richer information architecture originally sketched for this project (separate `destinations`/`universities`/`programmes`/`study-levels` hierarches under `/study-abroad`, a `visa-guidance` top-level page, an `insurance/quote` sub-route, etc.) is superseded by the flatter route list above per the lead architect's explicit correction. Revisit if content volume later justifies a deeper hierarchy — log any such change in [docs/DECISIONS.md](DECISIONS.md) rather than drifting silently.
- No admin sitemap exists. When Strapi is integrated (Track 3), staff use Strapi's own admin UI at whatever URL that deployment defines — this project does not build or document a custom admin route tree.
