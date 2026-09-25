# User Journeys — Janan Consultancy

Each journey lists: entry points, key steps, decision points, the primary conversion goal, and relevant states (loading/empty/error/success).

## 1. Prospective Student

**Goal:** Understand options and book a consultation or start an eligibility assessment.

1. Arrives via search, ad, or social link → lands on Homepage or a Destination/Programme page.
2. Explores Study Abroad section: browses Destinations → filters/selects a Destination → views Universities within it → views Programmes.
3. Reads a Service page (e.g., Admission Application Assistance) for clarity on what Janan does.
4. Checks Scholarships relevant to their profile.
5. Reviews Success Stories (aware these may be sample/demo content, clearly labelled) for social proof.
6. Converts via one of:
   - **Book a Consultation** (primary CTA, sticky in header and mobile quick actions).
   - **Eligibility Assessment** (for students wanting a tailored read on their chances before booking).
7. Receives on-screen confirmation (success state) and, where email is configured, a confirmation email.
8. Edge cases: incomplete form → inline validation errors; submission failure → clear retry messaging without data loss.

## 2. Parent / Guardian

**Goal:** Validate legitimacy and safety of the consultancy before their child engages further; understand costs/process and insurance/safety considerations.

1. Arrives via a link shared by their child, or direct search for "study abroad consultancy [destination]".
2. Reads About Us for credibility signals (team, mission — avoiding unverified claims).
3. Reviews Visa Guidance and Insurance sections to assess safety/compliance considerations.
4. Reviews FAQ for practical concerns (cost of service, timelines, what's included).
5. Converts via **Contact** (general enquiry) or **Book a Consultation** (often as an accompanying party, captured via the consultation form's fields).
6. May review Pre-Departure and Accommodation content to assess overall support depth.

## 3. Insurance Customer

**Goal:** Understand what insurance coverage is available and request a quotation.

1. Arrives via Insurance nav item, a Service page cross-link, or direct search for student travel/health insurance.
2. Reviews Insurance overview page: category explanation, distinct from other services, with disclaimers visible.
3. Opens an individual Insurance product page: reviews coverage summary, eligibility, exclusions summary, required documents, provider disclosure, and disclaimer.
4. Initiates **Insurance Quotation Request** form: destination, dates, traveller details, student status, additional requirements, consent.
5. Receives confirmation of submission (success state) with expectation-setting copy (e.g., "our team will contact you with a quote — this is not a policy issuance").
6. Edge case: if the customer is not eligible/relevant type not offered, form or content should avoid implying guaranteed coverage or issuance.

## 4. Event Registrant

**Goal:** Discover and register interest in an upcoming event or webinar.

1. Arrives via Events nav item, a homepage "Upcoming Events" section, or a blog cross-link.
2. Browses Events listing (filter by upcoming/past, destination/topic if applicable).
3. Opens an individual Event page: date/time, format (in-person/online), description, host/speakers (if provided and verified), and registration action.
4. Registers interest — V1 assumption: registration routes through the **General Enquiry** or a lightweight event-specific capture tied to `GeneralEnquiry`/`ConsultationRequest` (see [docs/DECISIONS.md](DECISIONS.md) — exact mechanism is an open decision since a dedicated registration entity is not in the required content model list).
5. Receives confirmation state; no ticketing/payment occurs in V1.

## 5. General Enquiry

**Goal:** Ask a question that doesn't fit consultation, eligibility, or insurance forms.

1. Arrives at Contact page from footer, header, or FAQ ("still have questions?" prompt).
2. Reviews contact details (phone, WhatsApp, email, office info — pending real data) and/or fills General Enquiry form (name, email, phone, message, consent).
3. Submits; receives success confirmation.
4. Edge cases: validation errors shown inline; duplicate/spam submissions mitigated by planned bot protection (see [docs/TECHNICAL_ARCHITECTURE.md](TECHNICAL_ARCHITECTURE.md)).

## 6. Staff Administrator

**Goal:** Manage content and respond to incoming leads efficiently and securely.

1. Navigates to `/admin/login`; authenticates via Auth.js-backed credentials (mechanism detail — see Technical Architecture and Decisions).
2. Lands on Dashboard: overview of recent/unread leads across Consultation Requests, Eligibility Submissions, Insurance Quote Requests, and General Enquiries.
3. **Content management path:** selects an entity (e.g., Universities) → views list (with publish status) → creates or edits a record → fills required/SEO fields → saves as Draft or Published.
4. **Lead management path:** opens a submission → reviews submitted fields → adds an internal note → assigns to a staff member → updates status (e.g., New → In Progress → Contacted → Converted/Closed) → optionally exports filtered results.
5. **Site configuration path:** updates Site Settings, Navigation, or Footer content as needed.
6. Edge cases: unauthorized access attempt redirects to login; session expiry prompts re-authentication without losing in-progress admin form data where feasible; concurrent edits are out of scope for V1 (last-write-wins, documented as an assumption).

## Cross-Cutting States (all journeys)

- **Loading:** skeleton/placeholder states for listing and detail pages, form submission spinners with disabled double-submit.
- **Empty:** listings with no matching results show a clear empty state with guidance (e.g., "No scholarships match your filters — clear filters").
- **Error:** form submission failures show a specific, non-technical error message and preserve user input; page-level errors use the custom error boundary.
- **Success:** form submissions show explicit confirmation (on-page and, where configured, via email) without overstating next steps (e.g., do not promise guaranteed visa outcomes or admission).

## Current Track 1 Implementation Status (Phase 7)

All journeys above describe the eventual, Track-2-connected experience. In the current static track, every form referenced above — Book a Consultation, Check Eligibility, Insurance Quote, Contact/General Enquiry — is fully built and validated, but **no submission is transmitted, stored, or logged anywhere.** A valid submission always shows the required not-connected message (`FORM_NOT_CONNECTED_MESSAGE` in `src/lib/forms/messages.ts`) with real phone/email/WhatsApp contact links, never the "explicit confirmation" success state described above — that state is reserved for Track 2, once a real `SubmissionAdapter` replaces `notConfiguredAdapter`. The Eligibility journey in particular never returns an eligibility result of any kind, by design (see docs/DECISIONS.md C-045/C-046) — a decision made under the required accuracy policy that formal eligibility is determined by universities, funding bodies, and government authorities, not this website.
