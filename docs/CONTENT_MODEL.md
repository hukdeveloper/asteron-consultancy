# Content Model — Asteron Global Consultancy

> **Scope correction (2026-09-12):** the initial release is a static website with no database. This document now serves two purposes: (1) the **target Strapi CMS content model** for a later integration phase (Track 3), and (2) the shape that the **current local typed content** (`src/types/content.ts`, `src/content/`, read via `src/lib/content/`) is designed to match, so that swapping in Strapi later requires no UI rewrite. Every entity below is labelled with which track actually implements it today. See [docs/DECISIONS.md](DECISIONS.md).

This document defines entities, fields, relationships, statuses, and lifecycle concerns. It is implementation-ready guidance for a future Strapi content-type design — **no Strapi application and no database exist yet**. Field lists are illustrative of intent and completeness, not necessarily final column-for-column.

## 0. Current Track (Local Typed Content)

In the current static-website track, most entities below are implemented as local TypeScript objects rather than database/CMS records:

- **Implemented today (Phase 1–6):**
  - `SiteContent` (name, tagline, description, and `contact: ContactInfo` — phone, WhatsApp, email, address) — `src/content/site.ts` / `src/lib/content/site.ts`.
  - `AnnouncementContent` (message, optional link, `enabled` flag) — `src/content/announcement.ts` / `src/lib/content/announcement.ts`.
  - `NavItem`/`NavLink`/`FooterLinkGroup` (header nav with dropdown children, footer link groups, legal links) — `src/content/navigation.ts` / `src/lib/content/navigation.ts`.
  - `SocialLink` (platform, href, `disabled` flag for not-yet-real profiles) — `src/content/social-links.ts` / `src/lib/content/social-links.ts`.
  - `Destination` (full shape — see Section 3 below; **replaces** the Phase 2/3 lightweight `DestinationSummary`, which has been removed: the homepage destinations section, header/footer navigation, and the `/study-abroad` hub/destination pages all now read the same `Destination` records, so there is exactly one destination content shape instead of a summary/full split).
  - `Service` (full shape — see Section 8 below; **replaces** the Phase 2–4 lightweight `ServiceSummary`, removed in Phase 5 for the same reason `DestinationSummary` was unified in Phase 4) — `src/content/services.ts` / `src/lib/content/services.ts`. 7 records.
  - `InsuranceService` (full shape — see Section 9 below; the local implementation of the target `InsuranceProduct` entity, kept as its own distinct type/name to avoid clashing with the target-shape section number while mapping onto it field-for-field) — `src/content/insurance.ts` / `src/lib/content/insurance.ts`. 3 records.
  - **Homepage-only content (Phase 3), all in `src/content/home.ts` / `src/lib/content/home.ts`:** `HomeHeroContent`, `TrustPoint`, `ProcessStep`, `WhyChooseReason`, `FeaturedUniversityPlaceholder`, `ScholarshipHighlight`, `SuccessStoryDemo` (a lighter-weight, demo-only cousin of the full `SuccessStory` entity below — `initials`/`displayName` instead of a real name or photo, and `isSampleContent` is a literal `true`, not a boolean, so a demo record can never accidentally be mistaken for real), `InsuranceHighlight` (a curated subset of `InsuranceService` fields shown only on the homepage teaser — the full entity lives at `/insurance`), `HomeEventSummary` (same relationship to the full `Event` entity as `SuccessStoryDemo` has to `SuccessStory` — a single sample record today, replaceable by a real one without changing the component), `ResourceSummary` (a minimal subset of `BlogPost`), `FaqItem`, `FinalCtaContent`.
  - **Study Abroad hub and study-level content (Phase 4), in `src/content/study-abroad.ts` / `src/lib/content/study-abroad.ts`:** `StudyAbroadProcessStep` (the shared, general 10-step application sequence — authored once, rendered on the hub, every destination page, and now the Services hub too, rather than duplicated), `StudyLevelPageContent` (one record each for `undergraduate` and `postgraduate`, rendered by the single shared `StudyLevelTemplate` component), plus hub-only content (hero, intro, "how Asteron supports", visa-guidance intro, parent-reassurance points, FAQ, final CTA, and figure-free `costPlanningCategories`).
  - **Check-eligibility content (Phase 4), in `src/content/eligibility.ts` / `src/lib/content/eligibility.ts`:** intro copy, general eligibility factors, and FAQ for `/check-eligibility`'s informative content, alongside the `EligibilityForm` added in Phase 7 (Section 18) — see [docs/DECISIONS.md](DECISIONS.md) C-045/C-046.
  - **Services and Insurance content (Phase 5)** — see Sections 8/9 below for the `Service`/`InsuranceService` shapes, and "Services and Insurance (Phase 5)" further down for the hub-only content (categories, "how support works", honest scope/limitations, hub FAQs) and the `/insurance-quote` form's validation schema (`src/lib/validation/insuranceQuote.ts`).
  - **Remaining public content pages (Phase 6):** `TeamMember` (Section 16, 5 role-based placeholder records, `src/content/team.ts`), `SuccessStory` (Section 11, richer than the homepage's `SuccessStoryDemo`, 3 demo records, `src/content/success-stories.ts`), `ResourceArticle`/`ResourceCategory` (Sections 12/13, 6 full articles across 5 categories, `src/content/resources.ts`), `Event` (Section 14, 1 sample record, `src/content/events.ts`), `Scholarship` (Section 10, 2 explicit content-template records, `src/content/scholarships.ts`), `FaqCategoryGroup` (Section 15, 8 categories wrapping the existing `FaqItem` shape, `src/content/faq.ts`), `ContactMethod`/`OfficeLocation` (UI-shaping types always derived from `ContactInfo`, never duplicated content, `src/lib/content/contact.ts`), and `LegalPage` (4 draft records — Privacy Policy, Terms and Conditions, Cookie Policy, Disclaimer — `src/content/legal.ts`). See "Remaining Public Content Pages (Phase 6)" further down for the demo-content and legal-draft policy this content follows.
  - **Form architecture (Phase 7):** all four forms' client-side validation shapes are now implemented — see Sections 17–20 below (`ConsultationRequest`, `EligibilityAssessment`, `InsuranceQuoteRequest`, `GeneralEnquiry`) and the shared `SubmissionAdapter`/`notConfiguredAdapter`/messages/components documented in docs/TECHNICAL_ARCHITECTURE.md §5.
  - None of the above are staff-editable through any UI yet — engineers edit the TypeScript files directly and open a pull request. This remains true until Track 3.
- **Target shape for upcoming static-site content work** (not yet built beyond the above; will follow the same local-content pattern before any CMS exists): the full University, Programme, SiteSetting, MediaAsset shapes below (`Destination`, `Service`, `InsuranceService`, `StudyLevel`, `TeamMember`, `SuccessStory`, `BlogPost`/`BlogCategory`, `Event`, `Scholarship`, and `FAQ`-equivalent content are now implemented — see above). Each becomes a typed object under `src/content/`, exposed through an `async` function in `src/lib/content/`, and statically rendered.
- **Client-side validation implemented (Phase 5–7); persistence and lifecycle remain Track 2/3 only:** ConsultationRequest, EligibilityAssessment, InsuranceQuoteRequest, GeneralEnquiry. Their field lists below define what each form's Zod schema validates today and what would eventually be sent to whatever external service Track 2 integrates — nothing is persisted by this application, and the "Lead-management fields" on each are not implemented.
- **Track 3 (Strapi) only — no local-content equivalent, because these require persistent storage and a staff-facing surface that Strapi's own admin provides:** User, Role, FormInternalNote, and the status/assignment/notes lifecycle of the four lead-capture entities above.

## Conventions Used Throughout

- **Slug:** lowercase, hyphenated, unique per entity, used in public URLs.
- **Publishing state:** most content entities use a `status` of `DRAFT | PUBLISHED | ARCHIVED`. Public queries only ever return `PUBLISHED`.
- **SEO fields:** `metaTitle`, `metaDescription`, and (implicitly) the canonical URL derived from `slug`, present on every publicly-routable entity.
- **Audit fields:** `createdAt`, `updatedAt` on every entity; `createdBy`/`updatedBy` (reference to `User`) recommended on staff-managed content entities for accountability.
- **Sample/demo flag:** entities affected by the temporary content policy (see below) carry an `isSampleContent: boolean` so the UI can render the required visible label.

---

## 1. User (staff/admin account) — _Track 3 (Strapi) only_

- `id`, `name`, `email` (unique), `passwordHash` (if credentials-based auth) or provider-linked identity fields, `roleId` (→ Role), `isActive`, `lastLoginAt`, `createdAt`, `updatedAt`.
- Relationships: has one `Role`; may be `assignedTo` many lead records (ConsultationRequest, EligibilityAssessment, InsuranceQuoteRequest, GeneralEnquiry); may be `authorOf` many BlogPosts.

## 2. Role — _Track 3 (Strapi) only_

- `id`, `name` (e.g., `SUPER_ADMIN`, `STAFF` — exact set is an open question, see Decisions), `permissions` (structured, e.g., JSON or a separate permission-mapping table — exact mechanism TBD).
- Relationships: has many `User`.
- **Open question:** whether V1 needs more than one role. Modeled now so it isn't a breaking change later.

## 3. Destination — _implemented today (Phase 4), local content_

Current local shape (`src/types/content.ts` `Destination`, `src/content/destinations.ts` — 6 records: United Kingdom, Australia, Canada, United States, Germany, Ireland), designed to map onto the target Strapi shape below without a call-site rewrite:

- `id`, `slug`, `name`, `shortName`, `region`, `flagLabel` (short text badge, e.g. "UK" — never the sole/primary identifier, see [docs/MEDIA_ATTRIBUTIONS.md](MEDIA_ATTRIBUTIONS.md)), `visualIcon` (Lucide icon name, resolved via `src/lib/icons.ts` — the current no-photography visual treatment), `heroTitle`, `heroDescription`, `overview`, optional `image`/`imageAlt` (falls back to the icon/gradient treatment when absent — no destination currently sets these), `highlights` (`KeyPoint[]`), `studyLevels` (`string[]`), `popularSubjectAreas` (`string[]`, drawn from the shared non-ranked category list), `applicationProcess` (a short destination-specific note that sits alongside the shared, generic 10-step `StudyAbroadProcessStep[]` sequence — not a duplicate list), `typicalIntakes` (general month labels only), `generalCostGuidance` (a qualifier alongside the shared, figure-free `costPlanningCategories`), `scholarshipGuidance`, `visaGuidance` (must direct readers to the official immigration authority), `workAndLifestyleNote`, `faqItems` (`FaqItem[]`), `relatedServices` (`ServiceSummary` slugs), `languageConsiderations`/`lifestyleSetting`/`planningConsiderations` (short qualitative fields powering the hub's comparison table — no rankings/scores), `seo` (`SeoFields`), `lastReviewed` (ISO date — see "Content Accuracy" in [docs/DECISIONS.md](DECISIONS.md)), `contentStatus` (`draft | published`), `isFeatured`.
- Differences from the target Strapi shape below are intentional simplifications for the current no-database track: `heroMediaId`/`flagIconId` become the optional `image`/`imageAlt` strings plus `visualIcon`; `costOfLivingNote`/`climateNote` are folded into `generalCostGuidance`/`workAndLifestyleNote`; `status` is named `contentStatus` to avoid a naming clash if a future `PublicationStatus`-typed field is added elsewhere.
- Relationships (target/future): has many `University`; has many `Programme` (via University, or directly if a programme can be destination-scoped without a specific university — see open question below); referenced by `Scholarship`, `ConsultationRequest.preferredDestination`, `EligibilityAssessment.preferredDestinations`, `InsuranceQuoteRequest.destination`.
- **Open question:** should `Programme` link directly to `Destination` for filtering, or only transitively via `University`? Recommend a direct optional `destinationId` denormalization on `Programme` for simpler filtering — flagged as a proposed decision.

## 4. University

- `id`, `name`, `slug`, `destinationId` (→ Destination), `summary`, `description` (rich text), `logoMediaId` (→ MediaAsset), `heroMediaId` (→ MediaAsset), `websiteUrl` (optional, external, informational only), `rankingNote` (optional, plain text — must be sourced/verifiable if published as fact, otherwise flagged sample content), `isPartner` (boolean — **must not be set true without verified partnership confirmation**; drives the "university partnerships" sample-content labelling requirement when unverified), `metaTitle`, `metaDescription`, `status`, `isFeatured`, `createdAt`, `updatedAt`.
- Relationships: belongs to one `Destination`; has many `Programme`.

## 5. Programme (Course)

- `id`, `title`, `slug`, `universityId` (→ University), `studyLevelId` (→ StudyLevel), `subjectAreaId` (→ SubjectArea), `destinationId` (optional denormalized, see open question above), `summary`, `description` (rich text), `durationNote` (e.g., "1 year full-time" — plain text), `tuitionFeeNote` (plain text, explicitly must not imply a guaranteed/current price without verification), `intakeMonths` (e.g., array of month labels), `entryRequirementsNote` (plain text), `metaTitle`, `metaDescription`, `status`, `createdAt`, `updatedAt`.
- Relationships: belongs to one `University`; belongs to one `StudyLevel`; belongs to one `SubjectArea`; may relate to `Scholarship` (many-to-many, optional) where a scholarship targets specific programmes.

## 6. StudyLevel

- `id`, `name` (e.g., "Undergraduate", "Postgraduate", "Foundation", "Diploma"), `slug`, `description` (short, for the study-level landing page), `metaTitle`, `metaDescription`, `status`, `createdAt`, `updatedAt`.
- Relationships: has many `Programme`; referenced by `EligibilityAssessment.intendedDegreeLevel`, `ConsultationRequest.intendedStudyLevel`.

## 7. SubjectArea

- `id`, `name` (e.g., "Computer Science", "Business", "Health Sciences"), `slug`, `description` (optional), `status`, `createdAt`, `updatedAt`.
- Relationships: has many `Programme`; referenced by `EligibilityAssessment.intendedSubject` and `ConsultationRequest.areaOfInterest` (either as a free-text field or a reference — recommend reference with an "Other, please specify" free-text fallback).

## 8. Service — _implemented today (Phase 5), local content_

Current local shape (`src/types/content.ts` `Service`, `src/content/services.ts` — 7 records grouped into three categories: Study Planning, Application Preparation, Journey Preparation):

- `id`, `slug`, `title`, `shortTitle` (short label for nav/cards), `category` (`ServiceCategory`: `study-planning | application-preparation | journey-preparation`), `summary`, `heroTitle`, `heroDescription`, `icon` (Lucide icon name, resolved via `src/lib/icons.ts`), optional `image`/`imageAlt` (unset on every current record — no photography, see docs/MEDIA_ATTRIBUTIONS.md), `overview`, `whoItMayHelp` (justified addition mirroring `StudyLevelPageContent.whoItsFor`), `benefits` (`KeyPoint[]`), `includedSupport` (`KeyPoint[]`), `processSteps` (`ProcessStep[]`), `requiredInformation` (`string[]`), `limitations` (`string[]`), optional `importantNotice` (justified addition — a required verbatim regulatory/integrity notice for specific services, e.g. the academic-integrity statement on Application Assistance and the visa notice on Student Visa Guidance; rendered as a prominent callout, never small print), `faqItems` (`FaqItem[]`), `relatedServiceSlugs` (`string[]`, resolved and de-duplicated at render time — never a duplicated object), `primaryCta` (`CtaLink`), `seo` (`SeoFields`), `lastReviewed`, `contentStatus`, `isFeatured` (6 of 7 records are featured on the homepage teaser; Scholarship Guidance is not, since the homepage already has its own dedicated scholarship section).
- Differences from the field list originally sketched above are intentional simplifications for the current no-database track: `iconOrMediaId`/`description`/`displayOrder` become `icon`/`overview`/array order; `category` is a closed union rather than a free string.
- Relationships (target/future): standalone; may be cross-linked from Homepage "Main Services" section by `isFeatured`.
- Covers: Study Abroad Counselling, University and Course Selection, Scholarship Guidance, Application Assistance, Student Visa Guidance, Accommodation Support, Pre-departure Guidance. **Insurance is explicitly modeled as its own entity, `InsuranceService` (Section 9), not a `Service` record** — the Services hub links out to `/insurance` from its Journey Preparation category rather than duplicating an "Insurance" `Service` record with a nonexistent `/services/insurance` route.

## 9. InsuranceProduct — _implemented today (Phase 5) as `InsuranceService`, local content_

Insurance is deliberately **not** a `Service` record — it is modeled as its own entity to satisfy the "separate and clearly labelled" requirement (docs/DECISIONS.md C-004).

Current local shape (`src/types/content.ts` `InsuranceService`, `src/content/insurance.ts` — 3 records: Student Health Insurance, Travel Insurance, Visitor Insurance):

- `id`, `slug`, `title`, `summary`, `heroTitle`, `heroDescription`, `insuranceType` (`student-health | travel | visitor`), `visualIcon` (justified addition, mirroring `Destination.visualIcon` — gives each page a distinct hero identity without photography), `overview`, `possibleCoverageAreas` (`KeyPoint[]`, "may include" language only — never a claim of universal coverage), `commonExclusionsNote`, `eligibilityNote`, `informationNeededForQuote` (`string[]`), `processSteps` (`ProcessStep[]`), `providerDisclosure` (states the general, deliberately non-committal underwriting/provider relationship pending U-002), `claimsSupportDescription`, `faqItems` (`FaqItem[]`), `relatedServiceSlugs` (justified addition, consistent with `Service.relatedServiceSlugs`), `seo`, `lastReviewed`, `contentStatus`.
- The single **global insurance disclosure** (`insuranceGlobalDisclosure` in `src/content/insurance.ts`) is a separate, page-agnostic string rendered on the hub, every insurance detail page, and the quote page — it is not a per-record field, since it must read identically everywhere per the phase brief. It is distinct from (but consistent with) the shorter `insuranceDisclaimer` used only as the Phase 3 homepage teaser.
- Differences from the field list originally sketched above: `name`→`title`, `insuranceCategory`→`insuranceType` (a closed union), `coverageSummary`→`overview`/`possibleCoverageAreas`, `exclusionsSummary`→`commonExclusionsNote`, `requiredDocuments`→`informationNeededForQuote`, `disclaimer` is the shared global disclosure described above rather than a per-record field, `isSampleContent` is not used (no fabricated/sample insurance content exists — every field is deliberately general rather than invented).
- Relationships: referenced by the `/insurance-quote` form's `insuranceType` select, populated from these records (`src/components/insurance/InsuranceQuoteForm.tsx`) rather than a hardcoded option list.

## 10. Scholarship

- `id`, `name`, `slug`, `summary`, `description` (rich text), `eligibilityCriteria` (rich text), `awardAmountNote` (plain text, must avoid fabricated/guaranteed figures), `applicationDeadline` (date, optional), `destinationId` (optional → Destination), `studyLevelId` (optional → StudyLevel), `metaTitle`, `metaDescription`, `status`, `isFeatured`, `createdAt`, `updatedAt`.
- Relationships: optionally belongs to `Destination` and/or `StudyLevel`; optionally many-to-many with `Programme`.

## 11. SuccessStory

- `id`, `studentFirstNameOrAlias` (must respect privacy — real students require consent; alias used for demo content), `photoMediaId` (→ MediaAsset, optional), `destinationId` (optional → Destination), `universityId` (optional → University), `quote` (rich text), `outcomeSummary` (plain text), `isSampleContent` (boolean, default true), `metaTitle`, `metaDescription`, `status`, `createdAt`, `updatedAt`.
- Relationships: optionally references `Destination`/`University`.
- **Privacy note:** any real testimonial requires documented consent from the student before `isSampleContent` is set to false — consent record-keeping mechanism is an open question (see Decisions).

## 12. BlogPost

- `id`, `title`, `slug`, `excerpt`, `body` (rich text), `coverMediaId` (→ MediaAsset), `categoryId` (→ BlogCategory), `authorId` (→ User, optional if written by staff, or a free-text `authorName` for guest/external authorship), `metaTitle`, `metaDescription`, `status`, `publishedAt`, `createdAt`, `updatedAt`.
- Relationships: belongs to one `BlogCategory`; optionally authored by a `User`.

## 13. BlogCategory

- `id`, `name`, `slug`, `description` (optional), `status`, `createdAt`, `updatedAt`.
- Relationships: has many `BlogPost`.

## 14. Event

- `id`, `title`, `slug`, `summary`, `description` (rich text), `format` (`IN_PERSON | ONLINE | HYBRID`), `locationOrLink` (plain text — physical address or online link, depending on format), `startAt`, `endAt`, `coverMediaId` (→ MediaAsset), `destinationId` (optional → Destination, for destination-specific fairs), `metaTitle`, `metaDescription`, `status`, `createdAt`, `updatedAt`.
- Relationships: optionally references `Destination`.
- **Open question:** V1 required entity list does not include a dedicated `EventRegistration` entity. Registration intent should be captured via `GeneralEnquiry` (with a reference/tag to the `Event`) unless the lead architect wants a dedicated registration entity — flagged in Decisions.

## 15. FAQ

- `id`, `question`, `answer` (rich text), `category` (optional grouping, e.g., "Visas", "Fees", "Process"), `displayOrder`, `status`, `createdAt`, `updatedAt`.
- Relationships: standalone; optionally cross-referenced from Service/Insurance pages by category.

## 16. TeamMember

- `id`, `name`, `roleTitle`, `bio` (rich text, optional), `photoMediaId` (→ MediaAsset, optional), `credentialsNote` (plain text — must be verifiable, not fabricated), `displayOrder`, `status`, `createdAt`, `updatedAt`.
- Relationships: standalone; displayed on About Us.

## 17. ConsultationRequest — _form validation implemented (Phase 7); storage/lifecycle is Track 2/3_

Fields per specification:

- `id`, `fullName`, `email`, `phoneNumber`, `whatsappNumber` (optional, only if different from phone), `currentQualification`, `preferredDestinationId` (→ Destination, or free text with "Other"), `intendedStudyLevelId` (→ StudyLevel), `areaOfInterest` (→ SubjectArea or free text), `preferredAppointmentAt` (date/time), `preferredMeetingMethod` (e.g., `PHONE | VIDEO_CALL | IN_PERSON`), `message` (optional free text), `consentGiven` (boolean, required true).
- **Lead-management fields:** `status` (`NEW | IN_PROGRESS | CONTACTED | QUALIFIED | CONVERTED | CLOSED_LOST`), `assignedToUserId` (→ User, optional), `internalNotes` (→ FormInternalNote, one-to-many), `source` (e.g., page/campaign the form was submitted from), `createdAt`, `updatedAt` — **not implemented**; these require persistent storage (Track 2/3).
- **Implemented today (Phase 7):** the client-side validation shape at `src/lib/validation/consultation.ts` (`consultationSchema`, a Zod schema; `preferredAppointmentAt` split into separate `preferredDate` (date-only, rejects past dates via the shared `isBeforeToday()` helper) and `preferredTimePeriod` (`morning | afternoon | evening`) fields to match the form's two distinct inputs; `preferredMeetingMethod` implemented as `MEETING_METHODS` = `phone-call | whatsapp-call | video-consultation | in-person-consultation`). The `/book-consultation` form (`src/components/consultation/ConsultationForm.tsx`) validates every field client-side, shows the required "selected date and time are preferences, not a confirmed booking" notice, and on a valid submission calls the shared `notConfiguredAdapter` (`src/lib/forms/adapters/notConfiguredAdapter.ts`) — no network request, no console logging, no `localStorage`/`sessionStorage`, no values in the URL. See docs/DECISIONS.md C-043.

## 18. EligibilityAssessment — _form validation implemented (Phase 7); storage/lifecycle is Track 2/3_

Fields per specification:

- `id`, `fullName`, `email`, `phoneWhatsapp`, `nationality`, `countryOfResidence`, `dateOfBirthOrAgeRange`, `highestQualification`, `institution`, `graduationYear`, `gradesOrCgpaOrPercentage`, `englishTestType`, `englishTestScore`, `preferredDestinations` (many, → Destination or free text list), `intendedDegreeLevelId` (→ StudyLevel), `intendedSubjectId` (→ SubjectArea or free text), `budgetRange` (enum or free text range, e.g., "Under $10,000", "$10,000–$25,000", etc. — exact bands TBD), `preferredIntake` (e.g., month/year), `studyGapInfo` (free text, optional), `fundingSource` (e.g., `SELF_FUNDED | FAMILY | SCHOLARSHIP | LOAN | SPONSOR | OTHER`), `additionalComments` (optional), `consentGiven` (boolean, required true).
- **Lead-management fields:** same pattern as `ConsultationRequest` — `status`, `assignedToUserId`, `internalNotes`, `source`, `createdAt`, `updatedAt` — **not implemented**; these require persistent storage (Track 2/3).
- **Implemented today (Phase 7):** the client-side validation shape at `src/lib/validation/eligibility.ts` (`eligibilitySchema`, a Zod schema; `dateOfBirthOrAgeRange` implemented as a closed `ageRange` union rather than a birth date, since the brief's field list asked for an age range; `englishTestType`/`englishTestScore` and `studyGapInfo` (`studyGapDetails`) are conditionally required only when their toggle checkbox — `englishTestTaken`/`hasStudyGap` — is checked, via one `.superRefine()`; `preferredDestinations` is a native-checkbox multi-select over the 6 destinations already published under `/study-abroad`; `budgetRange` is a closed `BUDGET_RANGE_OPTIONS` union with a `"not-sure"` option rather than open free text). The `/check-eligibility` form (`src/components/eligibility/EligibilityForm.tsx`) validates every field client-side, shows the required "does not determine admission, scholarship or visa eligibility" notice, clears any hidden conditional field's value via `cleanEligibilityPayload()` before a valid payload would reach an adapter, and on a valid submission calls the shared `notConfiguredAdapter` — no network request, no console logging, no `localStorage`/`sessionStorage`, no values in the URL, and never an eligibility result of any kind. See docs/DECISIONS.md C-043, C-045, C-046.

## 19. InsuranceQuoteRequest — _form validation implemented (Phase 5); storage/lifecycle is Track 2/3_

Fields per specification:

- `id`, `fullName`, `email`, `phoneWhatsapp`, `insuranceTypeId` (→ InsuranceProduct or categorical enum), `destinationId` (→ Destination or free text), `travelStartDate`, `travelEndDateOrDuration`, `dateOfBirth`, `numberOfTravellers`, `studentStatus` (boolean/enum, where relevant), `additionalRequirements` (optional free text), `consentGiven` (boolean, required true).
- **Lead-management fields:** same pattern — `status`, `assignedToUserId`, `internalNotes`, `source`, `createdAt`, `updatedAt` — **not implemented**; these require persistent storage (Track 2/3).
- **Implemented today (Phase 5, refactored onto the shared form architecture in Phase 7):** the client-side validation shape at `src/lib/validation/insuranceQuote.ts` (`insuranceQuoteSchema`, a Zod schema; `phoneWhatsapp` split into separate `phone` + optional `whatsapp` fields to match the form's two distinct inputs; `insuranceTypeId` implemented as the closed `InsuranceType` union, extended in Phase 7 with a `"not-sure"` option, rather than a free reference; a Phase 7 refinement rejects a coverage `startDate` before today; deliberately **excludes** passport numbers and detailed medical history, which the specification above never asked for and the phase brief explicitly prohibited collecting). The `/insurance-quote` form (`src/components/insurance/InsuranceQuoteForm.tsx`) validates every field client-side and, on a valid submission, calls the shared `notConfiguredAdapter` (`src/lib/forms/adapters/notConfiguredAdapter.ts`, superseding the Phase 5 `submitDemoForm()`), which resolves `{ status: "not-configured" }` — no network request, no console logging, no `localStorage`/`sessionStorage`, no values in the URL. See docs/DECISIONS.md C-043.

## 20. GeneralEnquiry — _form validation implemented (Phase 6, refactored Phase 7); storage/lifecycle is Track 2/3_

- `id`, `fullName`, `email`, `phoneNumber` (optional), `subject` (optional), `message`, `relatedEventId` (optional → Event, to support event-registration-intent capture per the open question in Section 14), `consentGiven` (boolean, required true).
- **Lead-management fields:** `status`, `assignedToUserId`, `internalNotes`, `source`, `createdAt`, `updatedAt` — **not implemented**; these require persistent storage (Track 2/3).
- **Implemented today:** the client-side validation shape at `src/lib/validation/contactForm.ts` (`contactFormSchema`; `subject` implemented as a closed `enquiryType` union — `CONTACT_ENQUIRY_TYPES`, expanded to 8 options in Phase 7 — rather than free text; no `relatedEventId` field, since the `/contact` form is general-purpose and event registration intent is not yet captured anywhere). The `/contact` form (`src/components/contact/ContactForm.tsx`) validates every field client-side and, on a valid submission, calls the shared `notConfiguredAdapter` — no network request, no console logging, no `localStorage`/`sessionStorage`, no values in the URL. See docs/DECISIONS.md C-043.

## 21. MediaAsset

- `id`, `url`, `altText` (required for accessibility), `width`, `height`, `mimeType`, `licenseType` (e.g., `LICENSED_STOCK | ASTERON_OWNED | CREATIVE_COMMONS | OTHER`), `attributionText` (optional, required if license requires attribution), `uploadedByUserId` (→ User), `createdAt`, `updatedAt`.
- Relationships: referenced by nearly every content entity's media fields.

## 22. SiteSetting

- Key-value structured settings, e.g., `id`, `key` (unique), `value` (structured/JSON or typed per known key), `description` (admin-facing explanation of what the setting controls), `updatedAt`.
- Covers: contact phone/WhatsApp numbers, office address(es), primary contact email, social media links, default SEO fallback, sample-content disclosure text, business hours.

## 23. NavigationItem

- `id`, `label`, `url` (internal path or external URL), `parentId` (self-referential, for dropdown/mega-menu structure), `location` (`HEADER | FOOTER`), `displayOrder`, `openInNewTab` (boolean), `status`, `createdAt`, `updatedAt`.
- Relationships: self-referential parent/child for nested menus.

## 24. FormInternalNote — _Track 3 (Strapi) only_

- `id`, `noteText`, `authorUserId` (→ User), `relatedEntityType` (`CONSULTATION_REQUEST | ELIGIBILITY_ASSESSMENT | INSURANCE_QUOTE_REQUEST | GENERAL_ENQUIRY`), `relatedEntityId` (polymorphic reference), `createdAt`.
- Relationships: many notes belong to one lead record of any of the four lead-generating types (polymorphic association — implementation detail, e.g., separate join tables or a discriminated `relatedEntityType`/`relatedEntityId` pair, to be finalized at schema time).

---

## Remaining Public Content Pages (Phase 6)

Local shapes for Sections 10–16 above, all in `src/types/content.ts` / `src/content/*.ts` / `src/lib/content/*.ts`, following the same demo-content and content-accuracy conventions established in earlier phases:

- **TeamMember** (§16): `id`, `roleTitle`, `roleSummary`, `isPlaceholder` (literal `true` on every current record), `placeholderNote` (always `"Profile to be added."`), `icon`, `displayOrder`. No name, photo, bio, or credential field exists locally — the target Strapi shape's `bio`/`photoMediaId`/`credentialsNote` are simply unpopulated until real staff information is approved (see "Team Placeholders" in docs/DECISIONS.md).
- **SuccessStory** (§11): `id`, `slug`, `displayName` (initials-based, never a full real name), `destinationName`, `studyLevel`, `subject`, optional `institution`, `summary`, `quote`, optional `image`/`imageAlt`, `consentStatus` (`not-applicable | pending | given`), `isSampleContent` (literal `true` today), `contentStatus`, `seo`. No offer letters, passport information, or private records are ever stored in this shape.
- **ResourceArticle** / **ResourceCategory** (§12/§13, named to match the site's "Resources" section rather than "Blog"): `ResourceCategory` is `id`, `slug`, `label`, `description`. `ResourceArticle` is `id`, `slug`, `title`, `summary`, `categoryId`, `readingTimeMinutes` (authored, not computed, so it never drifts from the rendered content), `sections` (`ArticleSection[]` — `{id, heading, paragraphs}`, so body content stays structured rather than one HTML blob), `relatedArticleSlugs`, `isFeatured`, `lastReviewed`, `contentStatus`, `seo`.
- **Event** (§14): `id`, `slug`, `title`, `type`, `description`, optional `startAt`/`endAt`/`timeZone`/`location`/`speaker`/`capacity`/`registrationUrl` (all omitted while unconfirmed — never invented), `format` (`in-person | online | hybrid`), `eventStatus` (`schedule-tbd | scheduled | past`, distinct from `contentStatus`), `isSampleContent`, `icon`, `seo`.
- **Scholarship** (§10): `id`, `slug`, `name`, `provider`, `destinationNames`, `studyLevels`, `subjectAreas`, `fundingType`, `eligibilitySummary`, `applicationProcessSummary`, optional `openingDate`/`deadline`/`officialUrl` (omitted on every current record — no deadline is published without official verification), `lastReviewed`, `isTemplate` (literal `true` on every current record), `contentStatus`, `seo`.
- **FaqCategoryGroup** (§15): `id`, `label`, `items` (`FaqItem[]` — the existing, unchanged, site-wide `FaqItem` shape). A thin grouping wrapper, not a new base FAQ shape, since `FaqItem` is already reused across Study Abroad, Services and Insurance content.
- **ContactMethod** / **OfficeLocation**: UI-shaping types for `/contact`, not stored content — `getContactMethods()`/`getOfficeLocation()` (`src/lib/content/contact.ts`) derive them from `ContactInfo` (`src/content/site.ts`) every time, so contact values are never duplicated.
- **LegalPage**: `id`, `slug`, `title`, `lastUpdated`, `sections` (`LegalSection[]`), `isDraft` (literal `true` on every current record), `seo`. Every record's page also renders the required verbatim notice ("Temporary draft—professional legal review required before production launch.") from a separate `legalDraftNotice` constant, not a per-record field, since it must read identically on all four pages.

---

## Publishing Workflows

- Content entities (Destination, University, Programme, StudyLevel, SubjectArea, Service, InsuranceProduct, Scholarship, SuccessStory, BlogPost, BlogCategory, Event, FAQ, TeamMember) follow: `DRAFT → PUBLISHED → ARCHIVED`.
  - `DRAFT`: visible only in admin; excluded from public queries, sitemap, and search.
  - `PUBLISHED`: visible publicly; included in sitemap/SEO structured data.
  - `ARCHIVED`: removed from public listings but URL may optionally return a "no longer available" state rather than a hard 404, to preserve inbound links where reasonable (exact behavior TBD per entity — flagged as an implementation detail, not a blocking decision).
- `NavigationItem` and `SiteSetting` use a simpler `ACTIVE/INACTIVE` toggle rather than the full draft/publish lifecycle.

## Lead-Management Statuses

Applies uniformly to `ConsultationRequest`, `EligibilityAssessment`, `InsuranceQuoteRequest`, and `GeneralEnquiry`:

`NEW → IN_PROGRESS → CONTACTED → QUALIFIED → CONVERTED` (success path), with `CLOSED_LOST` reachable from any non-terminal state.

- `NEW`: just submitted, unreviewed.
- `IN_PROGRESS`: a staff member is actively working the lead.
- `CONTACTED`: initial outreach has occurred.
- `QUALIFIED`: confirmed as a genuine, actionable prospect.
- `CONVERTED`: became a paying/engaged client (of the consultancy's own services — not an admissions outcome guarantee).
- `CLOSED_LOST`: no longer being pursued.

Every status transition should be attributable (`assignedToUserId` at minimum); a full status-change history log is noted as a nice-to-have and flagged in Decisions rather than assumed as required for V1.

## Data Retention and Privacy Considerations

- Personal data fields (contact details, DOB, nationality, financial/budget range, health-adjacent insurance fields) are collected only for the stated lead-generation purpose and must be visibly disclosed via the consent checkbox copy at submission time.
- **Retention period** for lead records (how long `CLOSED_LOST` or `CONVERTED` records are retained before deletion/anonymization) is not specified by the business yet — flagged as an unresolved question in [docs/DECISIONS.md](DECISIONS.md).
- Access to lead records (all four lead entities) is restricted to authenticated staff; no personal data from these entities is ever exposed via public routes or public APIs.
- Export functionality (CSV) must be restricted to authenticated staff and should be treated as a sensitive operation (consider audit logging of export actions).
- `SuccessStory` testimonials from real students require documented consent before publication with real names/photos — mechanism for recording that consent is an open question.
- Structured logs must exclude raw personal-data field values (see [docs/TECHNICAL_ARCHITECTURE.md](TECHNICAL_ARCHITECTURE.md) Section 15).
