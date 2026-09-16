# Sitemap — Asteron Global Consultancy

> **Scope correction (2026-09-12):** the initial release is a static website with no admin dashboard. This document now describes (1) the current/planned static-site routes, all statically generated from local content, and (2) how content is edited today vs. in the future Strapi phase. There is no `/admin` route in this codebase and none is planned — see [docs/DECISIONS.md](DECISIONS.md).

## 1. Static Site Routes (Track 1)

✅ = real content exists (Phases 1–6). Everything else below still renders the shared `ComingSoon` placeholder, reachable from real navigation, until a later phase.

```
/                                    ✅
├── about                            ✅
├── team                             ✅ (role-based placeholders only, see docs/DECISIONS.md "Team Placeholders")
├── study-abroad                     ✅
│   ├── study-abroad/undergraduate   ✅
│   ├── study-abroad/postgraduate    ✅
│   └── study-abroad/[destination]   ✅ (6 destinations — one shared template, see docs/CONTENT_MODEL.md §3)
├── universities
│   └── universities/[slug]
├── services                         ✅
│   └── services/[slug]              ✅ (7 services — one shared template, see docs/CONTENT_MODEL.md §8)
├── scholarships                     ✅ (empty-state + content-template records only, see docs/DECISIONS.md "Scholarship Directory Policy")
│   └── scholarships/[slug]          ✅
├── insurance                        ✅
│   └── insurance/[slug]             ✅ (3 insurance types — one shared template, see docs/CONTENT_MODEL.md §9)
├── success-stories                  ✅ (empty-state + demo example journeys, see docs/DECISIONS.md "Success Stories Policy")
├── resources                        ✅
│   └── resources/[slug]             ✅ (6 articles — one shared template, see docs/CONTENT_MODEL.md §12)
├── events                           ✅
│   └── events/[slug]                ✅ (1 sample entry — schedule to be announced, see docs/DECISIONS.md "Events Policy")
├── faq                              ✅ (8 categories — replaces the never-built resources/faqs stub, see docs/DECISIONS.md C-037)
├── contact                          ✅ (real ContactForm, consolidated onto the shared form architecture in Phase 7)
├── book-consultation                ✅ (real ConsultationForm, Phase 7 — previously a ComingSoon stub)
├── check-eligibility                ✅ (informative content, Phase 4 + real EligibilityForm, Phase 7)
├── insurance-quote                 ✅ (real, validated, not-yet-connected demo form — see docs/DECISIONS.md C-043)
├── legal                           ✅ (all four are temporary drafts — see docs/DECISIONS.md "Legal Draft Status")
│   ├── legal/privacy-policy        ✅
│   ├── legal/terms-of-service      ✅
│   ├── legal/cookie-policy         ✅
│   └── legal/disclaimer            ✅
├── sitemap.xml                      ✅ (Phase 8 — generated from local content, see src/app/sitemap.ts)
├── robots.txt                       ✅ (Phase 8)
├── 404 (not-found) — implemented
└── error (runtime error boundary) — implemented
```

`universities` and `universities/[slug]` remain the only real-navigation route still rendering the shared `ComingSoon` placeholder. See [docs/ROUTE_INVENTORY.md](ROUTE_INVENTORY.md) (Phase 8) for the complete, currently-accurate route inventory including every dynamic slug and the sitemap's own inclusion/exclusion policy.

## 2. Proposed URL Patterns

| Content type       | Pattern                                       | Example                                                |
| ------------------ | --------------------------------------------- | ------------------------------------------------------ |
| Destination        | `/study-abroad/[destination]`                 | `/study-abroad/united-kingdom`                         |
| Study level        | `/study-abroad/[undergraduate\|postgraduate]` | `/study-abroad/undergraduate`                          |
| University         | `/universities/[slug]`                        | `/universities/university-of-manchester`               |
| Service            | `/services/[slug]`                            | `/services/visa-guidance`                              |
| Insurance type     | `/insurance/[slug]`                           | `/insurance/travel-insurance`                          |
| Scholarship        | `/scholarships/[slug]`                        | `/scholarships/asteron-merit-award`                    |
| Article / resource | `/resources/[slug]`                           | `/resources/how-to-choose-the-right-study-destination` |
| Event              | `/events/[slug]`                              | `/events/study-abroad-planning-session`                |

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
- **Column 4 — Company:** About, Team, Success Stories, Resources, Events, FAQ, Contact.
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
