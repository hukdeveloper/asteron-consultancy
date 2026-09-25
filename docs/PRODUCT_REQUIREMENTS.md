# Product Requirements — Janan Consultancy

> **Scope correction (2026-09-12):** the lead architect confirmed the initial release is a **static marketing website** with no database, authentication, admin dashboard, or persistent form storage. The roadmap is staged into four tracks; this document is organized around them. See [docs/DECISIONS.md](DECISIONS.md) for the decision record.

## 0. Roadmap Tracks

1. **Static website** (current) — statically generated Next.js site, local typed content, client-side-only lead-generation forms behind a replaceable, clearly-labelled demo submission adapter.
2. **Form-service integration** (future) — connect the form adapter to a real external submission/email service so enquiries actually reach staff.
3. **Strapi CMS integration** (future) — replace the local content layer's implementation with a Strapi-backed API; non-engineers manage content in Strapi's own admin.
4. **Advanced portal features** (future, only if ever required) — student accounts, application tracking, online payments, etc.

Requirements below are labelled by track. Do not implement a later-track requirement while working on an earlier track.

## 1. Goals

- Establish Janan as a credible, trustworthy digital presence for study-abroad consultancy services.
- Provide prospective students and parents with clear, well-organized information on destinations, universities, programmes, scholarships, visas, and insurance to support their decision-making.
- Present lead-generation forms (consultation booking, eligibility check, insurance quote, general enquiry) that work end-to-end from the visitor's point of view (validation, accessible success/error states) even before a real backend exists — without ever claiming a submission was saved when it wasn't (Track 1).
- Once a submission service is connected (Track 2), actually deliver those enquiries to staff.
- Once Strapi is integrated (Track 3), let non-engineering staff manage content without engineering involvement.
- Avoid making the site "feel like a template" — prioritize clarity, restraint, and a premium-but-approachable tone appropriate to an international consultancy.

## 2. Audiences

- Prospective undergraduate students
- Prospective postgraduate students
- Parents and guardians
- Students seeking scholarships
- Students needing visa assistance
- Customers seeking student health or travel insurance
- Existing applicants seeking contact or assistance
- Consultancy staff and administrators (Track 3+ — no staff-facing surface exists in Track 1)

## 3. Functional Requirements

### 3.1 Public Website (Track 1 — current)

- Informational pages: Homepage, **About (✅ built, Phase 6)**, **Team (✅ built, Phase 6 — role-based placeholders only, see docs/DECISIONS.md "Team Placeholders")**, Study Abroad overview, **Services overview and individual service pages (✅ built, Phase 5 — 7 services, one shared template)**, **Success Stories (✅ built, Phase 6 — empty-state + demo examples)**, **Resources/articles (✅ built, Phase 6 — 6 articles, one shared template)**, **FAQ (✅ built, Phase 6 — 8 categories at `/faq`)**, **Contact (✅ built/standardized, Phase 6)**, **legal pages (✅ built as drafts, Phase 6, at the existing `/legal/*` paths — see docs/DECISIONS.md "Legal Draft Status")**, custom 404/error states.
- Destination and university content: destination pages (`/study-abroad/[destination]`, ✅ built, Phase 4), university listing and individual university pages, course/programme information where applicable.
- **Scholarship listing and detail pages (✅ built, Phase 6 — polished empty state + explicitly-labelled content-template records only; no active scholarship published, see docs/DECISIONS.md "Scholarship Directory Policy").**
- **Insurance overview page (✅ built, Phase 5) plus individual insurance-type pages (`/insurance/[slug]`, ✅ built, Phase 5 — 3 types, one shared template) — exceeds this section's original "overview page" scope, added per the Phase 5 brief.**
- **Events listing (✅ built, Phase 6 — one sample entry, "schedule to be announced", plus `/events/[slug]`).**
- Lead-generation pages: **Book a Consultation (✅ built, Phase 7)**, **Check Eligibility (✅ built, Phase 7 — form added alongside the existing Phase 4 informative content)**, **Insurance Quote (✅ built, Phase 5, refactored Phase 7 — the first real form in this codebase; see §3.2)**, and general enquiry via **Contact (✅ built, Phase 6, refactored Phase 7 — `ContactForm`)**.
- All content statically generated from local typed content (see [docs/CONTENT_MODEL.md](CONTENT_MODEL.md)) — no runtime database queries.
- Search/filtering on listing pages is a nice-to-have only if volume and static-generation constraints make it useful; not a hard requirement while content volume is small and hand-authored.

### 3.2 Forms (Track 1 — UI only; Track 2 — real delivery)

- **Consultation request**, **Eligibility check**, **Insurance quote**, and **General enquiry** forms as specified in [docs/CONTENT_MODEL.md](CONTENT_MODEL.md), each with:
  - Track 1: client-side validation (Zod + React Hook Form), an accessible success state and an accessible error state, and a **replaceable submission adapter** whose current implementation is an explicitly-labelled demo/development mode — it must never claim to staff or visitors that an enquiry was saved or delivered when no real submission provider is connected.
  - Track 2: the adapter is pointed at a real external submission/email service; spam/bot mitigation, rate limiting, CSRF protection and the other items in the "Form Security Preparation" section of docs/TECHNICAL_ARCHITECTURE.md §5 are added at that point.
  - **Status: ✅ All four forms are built (Phase 5: Insurance Quote; Phase 6: General Enquiry via Contact; Phase 7: Consultation request, Eligibility check, plus consolidation of all four onto one shared architecture — `SubmissionAdapter`/`notConfiguredAdapter`, centralized messages, shared field/error/consent components; see docs/TECHNICAL_ARCHITECTURE.md §5 and docs/DECISIONS.md C-043).**
- Internal lead-management concerns from the original brief — submission status lifecycle, internal staff notes, assignment, CSV export — require persistent storage and a staff-facing surface. They are **Track 3 (Strapi) concerns**, documented for forward reference in [docs/CONTENT_MODEL.md](CONTENT_MODEL.md), and are explicitly **not** built in Track 1 or Track 2.

### 3.3 Content Management (Track 3 — future)

- Non-engineer content management for: destinations, universities, programmes, services, insurance information, scholarships, success stories, articles, events, FAQs, team members, reusable site settings, navigation, and SEO fields — via **Strapi's own admin UI**, not a custom-built dashboard.
- Lead/enquiry management (status, assignment, internal notes, export) once submissions are persisted.
- This project does not build a bespoke admin application at any point in the currently planned roadmap; if that changes, it will be recorded as a new decision in [docs/DECISIONS.md](DECISIONS.md) rather than assumed.

### 3.4 Advanced Portal Features (Track 4 — future, speculative)

- Student accounts, authenticated dashboards, application-lifecycle tracking, online payments, insurance policy issuance, automated visa/admission decisions. None of this is scoped, designed, or committed to — see Section 6.

## 4. Non-Functional Requirements

- **Language:** English only; no multilingual functionality planned.
- **Responsiveness:** Mobile-first, fully responsive across common breakpoints.
- **Accessibility:** WCAG 2.2 AA target.
- **Performance:** Good Core Web Vitals — a fully static site should make this easier to hit than a database-backed one.
- **Security:** Secure handling of any personal data a visitor types into a form client-side; no server-side attack surface to secure in Track 1 since there is no server-side data handling beyond static rendering.
- **SEO:** Metadata, structured data, sitemap/robots strategy sufficient for organic discoverability — see Technical Architecture.
- **Content integrity:** No fabricated business claims; sample/demo content clearly and visibly labelled until replaced with verified information.
- **Maintainability:** Clear separation of UI, content data, and the content-access layer; strongly typed codebase; local content shaped to match the future Strapi content model so Track 3 doesn't require a UI rewrite.

## 5. Current Track Scope (Track 1 — Static Website)

- Static, content-driven public pages per Section 3.1.
- Form UI per Section 3.2 (client-side only, demo-mode adapter).
- No database, no authentication, no admin dashboard, no API server, no persistent storage of any kind.

## 6. Out of Scope for the Current Track

Out of scope for Track 1 (some become in-scope in a later track, as noted):

- Database, ORM, or any persistent storage (Track 2/3).
- Authentication, staff login, or an admin dashboard (Track 3, via Strapi's own admin).
- Actually delivering form submissions to staff (Track 2).
- Lead status tracking, internal notes, assignment, CSV export (Track 3).
- Full student portal, authenticated student accounts (Track 4, speculative — not committed).
- Application lifecycle tracking, online application submission to universities (Track 4, speculative).
- Online payments, insurance policy issuance (Track 4, speculative — may never be required).
- Automated visa decisions, AI-driven admission decisions (out of scope indefinitely; not on any current track).
- Native mobile application.
- Multilingual functionality.

Nothing above may be silently introduced while working on an earlier track.

## 7. Acceptance Criteria (Track 1 — Static Website)

- A visitor can browse the pages listed in Section 3.1 without authentication, all statically generated from local content.
- A visitor can fill in and submit each of the four forms; each shows working client-side validation, an accessible success state (clearly indicating demo/development mode until Track 2 lands), and an accessible error state. **Met for Insurance Quote as of Phase 5; the other three forms are pending (Phase 5B).**
- No UI, copy, or code implies a form submission was saved or will reach staff unless a real submission provider is actually connected.
- All sample/demo statistics, testimonials, partnerships, certifications, awards, and accreditations are visibly labelled as such in the rendered UI.
- No page implies Janan is a licensed immigration adviser, insurer, university representative, or immigration authority.
- Public pages meet the accessibility and performance targets defined in [docs/TECHNICAL_ARCHITECTURE.md](TECHNICAL_ARCHITECTURE.md).
- No database, auth, or admin-dashboard code exists anywhere in the repository.

## 8. Assumptions

- Janan does not currently have real, verified statistics, testimonials, partnerships, or accreditations to publish; placeholder/demo content will be used and labelled until supplied.
- No existing brand guidelines beyond the temporary identity supplied at project start; the temporary palette/tagline are placeholders subject to change by the lead architect.
- No existing legacy system or content to migrate (repository was empty at project start).
- Hosting/deployment target and analytics provider are not yet chosen (Track 1 doesn't strictly need either to function, but both affect launch — see [docs/DECISIONS.md](DECISIONS.md)).
- A real form-submission/email service, and the eventual Strapi hosting environment, are Track 2/3 decisions and not required to complete Track 1.

## 9. Unresolved Questions

See [docs/DECISIONS.md](DECISIONS.md) for the authoritative running list. Key items:

- What is the legal/company registration status of Janan, and what disclosures are required on legal pages (Terms, Privacy Policy, Cookie Policy)?
- Which jurisdictions'/countries' data protection law applies to form submissions once they're actually collected (Track 2)?
- Will Janan provide its own insurance quotes, or broker/refer to third-party insurers? This materially affects the "provider disclosure" and "claims-support" content fields.
- What form-submission/email service (Track 2) and hosting platform (Track 1 launch) are approved for use?
- Is there a real logo/brand guideline in progress, or should the temporary identity be treated as final for launch?
- What staff roles/permission levels will be needed once Strapi (Track 3) introduces an admin surface?
