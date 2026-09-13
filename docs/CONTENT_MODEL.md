# Content Model — Asteron Global Consultancy

> **Scope correction (2026-09-12):** the initial release is a static website with no database. This document now serves two purposes: (1) the **target Strapi CMS content model** for a later integration phase (Track 3), and (2) the shape that the **current local typed content** (`src/types/content.ts`, `src/content/`, read via `src/lib/content/`) is designed to match, so that swapping in Strapi later requires no UI rewrite. Every entity below is labelled with which track actually implements it today. See [docs/DECISIONS.md](DECISIONS.md).

This document defines entities, fields, relationships, statuses, and lifecycle concerns. It is implementation-ready guidance for a future Strapi content-type design — **no Strapi application and no database exist yet**. Field lists are illustrative of intent and completeness, not necessarily final column-for-column.

## 0. Current Track (Local Typed Content)

In the current static-website track, most entities below are implemented as local TypeScript objects rather than database/CMS records:

- **Implemented today (Phase 1–2):**
  - `SiteContent` (name, tagline, description, and now `contact: ContactInfo` — phone, WhatsApp, email, address) — `src/content/site.ts` / `src/lib/content/site.ts`.
  - `AnnouncementContent` (message, optional link, `enabled` flag) — `src/content/announcement.ts` / `src/lib/content/announcement.ts`.
  - `NavItem`/`NavLink`/`FooterLinkGroup` (header nav with dropdown children, footer link groups, legal links) — `src/content/navigation.ts` / `src/lib/content/navigation.ts`.
  - `SocialLink` (platform, href, `disabled` flag for not-yet-real profiles) — `src/content/social-links.ts` / `src/lib/content/social-links.ts`.
  - `DestinationSummary` and `ServiceSummary` — deliberately minimal subsets of the full `Destination`/`Service` shapes below (just `id`, `slug`, `name`/`title`, `status`, plus a short `summary` for services), enough to drive navigation and generate a "coming soon" stub page per item. `src/content/{destinations,services}.ts` / `src/lib/content/{destinations,services}.ts`.
  - None of the above are staff-editable through any UI yet — engineers edit the TypeScript files directly and open a pull request. This remains true until Track 3.
- **Target shape for upcoming static-site content work** (not yet built beyond the summaries above; will follow the same local-content pattern before any CMS exists): the full Destination, University, Programme, StudyLevel, SubjectArea, Service, InsuranceProduct, Scholarship, SuccessStory, BlogPost/Article, BlogCategory, Event, FAQ, TeamMember, SiteSetting, MediaAsset shapes below. Each becomes a typed object under `src/content/`, exposed through an `async` function in `src/lib/content/`, and statically rendered.
- **Not implemented in the current or next static-site phase — Track 2 (form-service integration) only, as a payload shape, not a database table:** ConsultationRequest, EligibilityAssessment, InsuranceQuoteRequest, GeneralEnquiry. Their field lists below define what the corresponding form collects and what gets sent to whatever external service Track 2 integrates — nothing is persisted by this application.
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

## 3. Destination

- `id`, `name`, `slug`, `summary`, `description` (rich text), `heroMediaId` (→ MediaAsset), `flagIconId` (→ MediaAsset, optional), `region` (e.g., Europe, North America — optional classification), `costOfLivingNote` (optional, plain text, must avoid fabricated figures), `climateNote` (optional), `metaTitle`, `metaDescription`, `status`, `isFeatured` (boolean, for homepage "Popular Destinations"), `createdAt`, `updatedAt`.
- Relationships: has many `University`; has many `Programme` (via University, or directly if a programme can be destination-scoped without a specific university — see open question below); referenced by `Scholarship`, `ConsultationRequest.preferredDestination`, `EligibilityAssessment.preferredDestinations`, `InsuranceQuoteRequest.destination`.
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

## 8. Service

- `id`, `title`, `slug`, `summary`, `description` (rich text), `iconOrMediaId` (→ MediaAsset, optional), `category` (e.g., to distinguish general services from Visa Guidance if modeled as a Service subtype — see Sitemap note), `metaTitle`, `metaDescription`, `status`, `displayOrder`, `createdAt`, `updatedAt`.
- Relationships: standalone; may be cross-linked from Homepage "Main Services" section by `displayOrder`/`isFeatured`.
- Covers: University and course selection, Admission application assistance, Scholarship guidance, Student visa guidance, Accommodation assistance, Pre-departure guidance (each may be its own `Service` record, or Visa/Insurance may instead be modeled as their own first-class sections — **Insurance is explicitly modeled as its own entity, `InsuranceProduct`, not a `Service`, per the requirement that insurance be a separate, clearly labelled category**).

## 9. InsuranceProduct

Insurance is deliberately **not** a `Service` record — it is modeled as its own entity to satisfy the "separate and clearly labelled" requirement.

- `id`, `name`, `slug`, `insuranceCategory` (e.g., "Student Health Insurance", "Travel Insurance"), `summary`, `coverageSummary` (rich text), `eligibility` (rich text), `exclusionsSummary` (rich text), `requiredDocuments` (list/rich text), `providerDisclosure` (rich text — states the actual underwriting/provider relationship; must not imply Asteron is the insurer unless verified), `disclaimer` (rich text, required, non-empty), `claimsSupportInfo` (rich text — describes how Asteron assists with claims, without implying claims-handling authority it doesn't have), `metaTitle`, `metaDescription`, `status`, `isSampleContent` (default true until provider details are verified), `createdAt`, `updatedAt`.
- Relationships: referenced by `InsuranceQuoteRequest.insuranceType` (either a direct reference or a categorical enum — recommend reference for consistency with published products, with an "Other" fallback).

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

## 17. ConsultationRequest — _field shape used in Track 1 form validation; storage/lifecycle is Track 2/3_

Fields per specification:

- `id`, `fullName`, `email`, `phoneNumber`, `whatsappNumber` (optional, only if different from phone), `currentQualification`, `preferredDestinationId` (→ Destination, or free text with "Other"), `intendedStudyLevelId` (→ StudyLevel), `areaOfInterest` (→ SubjectArea or free text), `preferredAppointmentAt` (date/time), `preferredMeetingMethod` (e.g., `PHONE | VIDEO_CALL | IN_PERSON`), `message` (optional free text), `consentGiven` (boolean, required true).
- **Lead-management fields:** `status` (`NEW | IN_PROGRESS | CONTACTED | QUALIFIED | CONVERTED | CLOSED_LOST`), `assignedToUserId` (→ User, optional), `internalNotes` (→ FormInternalNote, one-to-many), `source` (e.g., page/campaign the form was submitted from), `createdAt`, `updatedAt`.

## 18. EligibilityAssessment — _field shape used in Track 1 form validation; storage/lifecycle is Track 2/3_

Fields per specification:

- `id`, `fullName`, `email`, `phoneWhatsapp`, `nationality`, `countryOfResidence`, `dateOfBirthOrAgeRange`, `highestQualification`, `institution`, `graduationYear`, `gradesOrCgpaOrPercentage`, `englishTestType`, `englishTestScore`, `preferredDestinations` (many, → Destination or free text list), `intendedDegreeLevelId` (→ StudyLevel), `intendedSubjectId` (→ SubjectArea or free text), `budgetRange` (enum or free text range, e.g., "Under $10,000", "$10,000–$25,000", etc. — exact bands TBD), `preferredIntake` (e.g., month/year), `studyGapInfo` (free text, optional), `fundingSource` (e.g., `SELF_FUNDED | FAMILY | SCHOLARSHIP | LOAN | SPONSOR | OTHER`), `additionalComments` (optional), `consentGiven` (boolean, required true).
- **Lead-management fields:** same pattern as `ConsultationRequest` — `status`, `assignedToUserId`, `internalNotes`, `source`, `createdAt`, `updatedAt`.

## 19. InsuranceQuoteRequest — _field shape used in Track 1 form validation; storage/lifecycle is Track 2/3_

Fields per specification:

- `id`, `fullName`, `email`, `phoneWhatsapp`, `insuranceTypeId` (→ InsuranceProduct or categorical enum), `destinationId` (→ Destination or free text), `travelStartDate`, `travelEndDateOrDuration`, `dateOfBirth`, `numberOfTravellers`, `studentStatus` (boolean/enum, where relevant), `additionalRequirements` (optional free text), `consentGiven` (boolean, required true).
- **Lead-management fields:** same pattern — `status`, `assignedToUserId`, `internalNotes`, `source`, `createdAt`, `updatedAt`.

## 20. GeneralEnquiry — _field shape used in Track 1 form validation; storage/lifecycle is Track 2/3_

- `id`, `fullName`, `email`, `phoneNumber` (optional), `subject` (optional), `message`, `relatedEventId` (optional → Event, to support event-registration-intent capture per the open question in Section 14), `consentGiven` (boolean, required true).
- **Lead-management fields:** `status`, `assignedToUserId`, `internalNotes`, `source`, `createdAt`, `updatedAt`.

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
