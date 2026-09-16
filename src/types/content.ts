/**
 * Shared typing for the local, file-based content layer (src/content,
 * accessed via src/lib/content).
 *
 * These shapes intentionally mirror the entities documented in
 * docs/CONTENT_MODEL.md (the target Strapi CMS content model for a later
 * phase) so that swapping a local content-access function for a Strapi API
 * call later doesn't require changing anything that consumes it. Records
 * that will eventually map to a Strapi content type carry a stable `id`
 * and `slug` now, even while nothing "publishes" them but a pull request.
 */

export type PublicationStatus = "draft" | "published";

export interface SeoFields {
  metaTitle?: string;
  metaDescription?: string;
}

export interface ContactInfo {
  /** E.164-ish value for `tel:`/`https://wa.me/` links, digits only after the leading +. */
  phone: string;
  /** Human-readable phone for display. */
  phoneDisplay: string;
  whatsapp: string;
  whatsappDisplay: string;
  email: string;
  /** Single display line — intentionally not a detailed/verified office address. */
  address: string;
}

export interface SiteContent extends SeoFields {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  contact: ContactInfo;
}

export interface AnnouncementContent {
  id: string;
  message: string;
  linkLabel?: string;
  linkHref?: string;
  /** Central on/off switch — set false to hide the bar without deleting content. */
  enabled: boolean;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface NavItem extends NavLink {
  /** Short supporting copy shown under the label in a dropdown column. */
  description?: string;
  children?: NavLink[];
}

export interface FooterLinkGroup {
  id: string;
  heading: string;
  links: NavLink[];
}

export type SocialPlatform =
  "facebook" | "instagram" | "linkedin" | "youtube" | "twitter";

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  platform: SocialPlatform;
  /** True while href is a placeholder — rendered as visibly inactive rather than linking anywhere misleading. */
  disabled?: boolean;
}

/** Lucide icon export name (e.g. "Compass") — kept as a plain string so content files don't import React/lucide. */
export type IconName = string;

/** Reusable {label, href} shape for buttons/links — used by Service/CTA content so it isn't retyped inline everywhere. */
export interface CtaLink {
  label: string;
  href: string;
}

/** Reusable {title, description} shape — used for highlights, reasons, etc. */
export interface KeyPoint {
  id: string;
  title: string;
  description: string;
}

/**
 * Full destination content — see docs/CONTENT_MODEL.md §3 for the target
 * Strapi shape this is designed to match. Country-specific education/visa
 * information changes over time, so every record carries `lastReviewed`
 * and every visa/cost/scholarship field is deliberately general — see
 * "Content Accuracy" in docs/DECISIONS.md for the policy this enforces.
 */
export interface Destination {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  /** e.g. "Europe", "Oceania" — broad classification, not a claim of coverage. */
  region: string;
  /**
   * Short text badge (e.g. "UK") used alongside an icon/gradient visual —
   * never the sole or primary country identifier (no flag-grid appearance;
   * see docs/DESIGN_SYSTEM.md and docs/MEDIA_ATTRIBUTIONS.md).
   */
  flagLabel: string;
  /** Lucide icon name for this destination's hero/card visual treatment (see src/lib/icons.ts). */
  visualIcon: IconName;
  heroTitle: string;
  heroDescription: string;
  overview: string;
  /** Optional local path under public/images/ — falls back to a CSS/SVG gradient + icon treatment when absent. */
  image?: string;
  imageAlt?: string;
  highlights: KeyPoint[];
  studyLevels: string[];
  popularSubjectAreas: string[];
  /**
   * Destination-specific note that sits alongside the shared, generic
   * 10-step process in src/content/study-abroad.ts — not a duplicate list.
   */
  applicationProcess: string;
  /** General intake labels only (e.g. "September") — never specific deadlines. */
  typicalIntakes: string[];
  /** A short qualifier alongside the shared, figure-free cost-category framework in src/content/study-abroad.ts. */
  generalCostGuidance: string;
  /** General guidance only — never a specific named scholarship or amount. */
  scholarshipGuidance: string;
  /** General guidance only — never a fee, processing time, or work-rights promise. Must direct readers to the official immigration authority. */
  visaGuidance: string;
  workAndLifestyleNote: string;
  faqItems: FaqItem[];
  /** Service slugs (src/content/services.ts) relevant to this destination. */
  relatedServices: string[];
  /** Short qualitative fields powering the hub's destination-comparison table — not a ranking or score. */
  languageConsiderations: string;
  lifestyleSetting: string;
  planningConsiderations: string;
  seo: SeoFields;
  /** ISO date (YYYY-MM-DD) this content was last checked against primary sources. */
  lastReviewed: string;
  contentStatus: PublicationStatus;
  isFeatured: boolean;
}

/** A single step in a general application sequence — reused across the hub, undergraduate, and postgraduate pages. */
export interface StudyAbroadProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
}

/** Content shared by both study-level pages, so they render from one template. */
export interface StudyLevelPageContent {
  id: string;
  slug: "undergraduate" | "postgraduate";
  heading: string;
  intro: string;
  whoItsFor: string;
  qualificationConsiderations: KeyPoint[];
  planningTimeline: KeyPoint[];
  documentChecklist: string[];
  courseSelectionGuidance: string;
  fundingConsiderations: string;
  faqItems: FaqItem[];
  seo: SeoFields;
}

// --- Homepage-specific content -------------------------------------------------

export interface HomeHeroContent {
  eyebrow: string;
  heading: string;
  description: string;
  /** 2-3 short reassurance phrases shown beneath the CTAs (e.g. "Personal guidance") — never a statistic or outcome guarantee. Optional: only the homepage hero currently renders it. */
  reassuranceItems?: string[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  tertiaryLink: { label: string; href: string };
}

export interface TrustPoint {
  id: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
}

export interface WhyChooseReason {
  id: string;
  title: string;
  description: string;
}

export interface FeaturedUniversityPlaceholder {
  id: string;
  label: string;
}

export interface ScholarshipHighlight {
  id: string;
  title: string;
  description: string;
}

/** Demonstration-only profile — never a real, identifiable student. */
export interface SuccessStoryDemo {
  id: string;
  initials: string;
  displayName: string;
  destinationName: string;
  quote: string;
  outcomeSummary: string;
  isSampleContent: true;
}

export interface InsuranceHighlight {
  id: string;
  title: string;
  description: string;
}

/** A single sample event — real events replace this record, not the component. */
export interface HomeEventSummary {
  id: string;
  title: string;
  format: string;
  scheduleLabel: string;
  description: string;
  isSampleContent: true;
}

export interface ResourceSummary {
  id: string;
  slug: string;
  title: string;
  summary: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FinalCtaContent {
  heading: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

// --- Services and Insurance (Phase 5) --------------------------------------

/** Groups the Services hub into the three sections required by docs/SITEMAP.md. */
export type ServiceCategory =
  "study-planning" | "application-preparation" | "journey-preparation";

/**
 * Full service content — see docs/CONTENT_MODEL.md §8 for the target Strapi
 * shape this is designed to match. Replaces the Phase 2/3 lightweight
 * `ServiceSummary` (removed — see docs/DECISIONS.md), the same
 * unify-rather-than-duplicate move made for `Destination` in Phase 4.
 */
export interface Service {
  id: string;
  slug: string;
  title: string;
  /** Short label for nav/cards where the full title is too long. */
  shortTitle: string;
  category: ServiceCategory;
  summary: string;
  heroTitle: string;
  heroDescription: string;
  icon: IconName;
  /** Optional local path under public/images/ — falls back to an icon/gradient treatment when absent, per the site's no-photography precedent (see docs/MEDIA_ATTRIBUTIONS.md). */
  image?: string;
  imageAlt?: string;
  overview: string;
  /** Justified addition alongside `includedSupport` — mirrors `StudyLevelPageContent.whoItsFor` from Phase 4, needed for the template's "Who this service may help" section. */
  whoItMayHelp: string;
  benefits: KeyPoint[];
  includedSupport: KeyPoint[];
  processSteps: ProcessStep[];
  /** Documents/information commonly needed — plain strings, not a duplicated document-checklist type. */
  requiredInformation: string[];
  /** Plain-language limits on what this service does NOT do/guarantee. */
  limitations: string[];
  /**
   * Justified addition: a required, verbatim regulatory/integrity notice for
   * services where the phase brief mandates specific wording (e.g. the
   * academic-integrity statement, the visa notice). Rendered as a
   * prominent callout, not folded into `limitations`, so it can't end up
   * "hidden in tiny text". Optional — most services don't need one.
   */
  importantNotice?: string;
  faqItems: FaqItem[];
  /** Other service slugs (this same array) — resolved and validated at render time, never duplicated objects. */
  relatedServiceSlugs: string[];
  primaryCta: CtaLink;
  seo: SeoFields;
  /** ISO date (YYYY-MM-DD) this content was last checked against the Content Accuracy policy (docs/DECISIONS.md). */
  lastReviewed: string;
  contentStatus: PublicationStatus;
  isFeatured: boolean;
}

/** The three insurance product pages under /insurance/[slug]. */
export type InsuranceType = "student-health" | "travel" | "visitor";

/**
 * Full insurance content — see docs/CONTENT_MODEL.md §9 for the target
 * Strapi `InsuranceProduct` shape this is designed to match. Insurance
 * stays a distinct entity from `Service` (not a category of it), per
 * docs/DECISIONS.md C-004.
 */
export interface InsuranceService {
  id: string;
  slug: string;
  title: string;
  summary: string;
  heroTitle: string;
  heroDescription: string;
  insuranceType: InsuranceType;
  /** Justified addition, mirroring `Destination.visualIcon` (C-027) — gives each insurance page a distinct hero/card identity without photography. */
  visualIcon: IconName;
  overview: string;
  /** General coverage categories only — "may include" language, never a guarantee of universal coverage. */
  possibleCoverageAreas: KeyPoint[];
  commonExclusionsNote: string;
  eligibilityNote: string;
  /** Plain strings — the information a visitor should have ready before requesting a quote. */
  informationNeededForQuote: string[];
  processSteps: ProcessStep[];
  /** States the actual (or, while unresolved — see docs/DECISIONS.md U-002 — deliberately general) underwriting/provider relationship. Must never imply Asteron is the insurer. */
  providerDisclosure: string;
  claimsSupportDescription: string;
  faqItems: FaqItem[];
  /** Justified addition for the reusable related-services component, consistent with `Service.relatedServiceSlugs`. */
  relatedServiceSlugs: string[];
  seo: SeoFields;
  lastReviewed: string;
  contentStatus: PublicationStatus;
}

// --- Remaining public content pages (Phase 6) ------------------------------

/**
 * Local implementation of the target Strapi `TeamMember` entity — see
 * docs/CONTENT_MODEL.md §16. Every current record is a role-based
 * placeholder (`isPlaceholder: true`, no real name/bio/credentials) —
 * see docs/DECISIONS.md "Team Placeholders".
 */
export interface TeamMember {
  id: string;
  roleTitle: string;
  /** Short, generic description of what this role does — never a fabricated bio. */
  roleSummary: string;
  /** True for every current record — no real staff information exists yet. */
  isPlaceholder: true;
  /** Shown on the card instead of a name/photo while `isPlaceholder` is true. */
  placeholderNote: string;
  /** Lucide icon name used for the neutral avatar treatment (no photography). */
  icon: IconName;
  displayOrder: number;
}

export type ConsentStatus = "not-applicable" | "pending" | "given";

/**
 * Full success-story shape — see docs/CONTENT_MODEL.md §11. Distinct from
 * the lighter `SuccessStoryDemo` (homepage teaser, unchanged) — this is
 * the richer shape the /success-stories hub uses, still demo-only today
 * (`isSampleContent: true` on every current record).
 */
export interface SuccessStory {
  id: string;
  slug: string;
  /** First name or an approved display alias only — never a full real name without consent. */
  displayName: string;
  destinationName: string;
  studyLevel: string;
  subject: string;
  /** Optional — omitted unless a real, consented story names a specific institution. */
  institution?: string;
  summary: string;
  quote: string;
  /** Optional local image path — omitted for every current (demo) record; see docs/MEDIA_ATTRIBUTIONS.md. */
  image?: string;
  imageAlt?: string;
  consentStatus: ConsentStatus;
  isSampleContent: true;
  contentStatus: PublicationStatus;
  seo: SeoFields;
}

/** Groups resource articles for the /resources hub — see docs/CONTENT_MODEL.md §13 (`BlogCategory`). */
export interface ResourceCategory {
  id: string;
  slug: string;
  label: string;
  description: string;
}

/** A single section of structured article body content — avoids one giant unstructured string. */
export interface ArticleSection {
  id: string;
  heading: string;
  /** Paragraphs only — no rich-text/HTML, so content stays plain and safe to render. */
  paragraphs: string[];
}

/**
 * Local implementation of the target Strapi `BlogPost` entity — see
 * docs/CONTENT_MODEL.md §12. Named `ResourceArticle` locally since the
 * site calls this section "Resources", not a blog.
 */
export interface ResourceArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  categoryId: string;
  /** Minutes — supplied consistently rather than computed from word count, so it never drifts from the rendered content. */
  readingTimeMinutes: number;
  sections: ArticleSection[];
  /** Other article slugs — resolved and validated at render time, consistent with `Service.relatedServiceSlugs`. */
  relatedArticleSlugs: string[];
  isFeatured: boolean;
  lastReviewed: string;
  contentStatus: PublicationStatus;
  seo: SeoFields;
}

export type EventFormat = "in-person" | "online" | "hybrid";
export type EventStatus = "schedule-tbd" | "scheduled" | "past";

/**
 * Local implementation of the target Strapi `Event` entity — see
 * docs/CONTENT_MODEL.md §14. `eventStatus` is separate from
 * `contentStatus` (draft/published) — a published event can still have no
 * confirmed date (`schedule-tbd`).
 */
export interface Event {
  id: string;
  slug: string;
  title: string;
  type: string;
  description: string;
  /** ISO date/time — omitted while `eventStatus` is "schedule-tbd". Never invented. */
  startAt?: string;
  endAt?: string;
  timeZone?: string;
  format: EventFormat;
  /** Physical address (in-person/hybrid) or platform name (online) — never a fabricated address. */
  location?: string;
  /** Role/title only (e.g. "Asteron education counsellor") — never a fabricated named speaker. */
  speaker?: string;
  capacity?: number;
  /** Omitted while there is no real registration flow — see docs/DECISIONS.md. */
  registrationUrl?: string;
  eventStatus: EventStatus;
  isSampleContent: boolean;
  icon: IconName;
  contentStatus: PublicationStatus;
  seo: SeoFields;
}

export type FundingType = "full" | "partial" | "unspecified";

/**
 * Local implementation of the target Strapi `Scholarship` entity — see
 * docs/CONTENT_MODEL.md §10. Every current record is a content template,
 * not an active scholarship (`isTemplate: true`) — see docs/DECISIONS.md
 * "Scholarship Directory".
 */
export interface Scholarship {
  id: string;
  slug: string;
  name: string;
  provider: string;
  destinationNames: string[];
  studyLevels: string[];
  subjectAreas: string[];
  fundingType: FundingType;
  eligibilitySummary: string;
  applicationProcessSummary: string;
  /** ISO dates — omitted entirely unless officially verified. Never invented. */
  openingDate?: string;
  deadline?: string;
  officialUrl?: string;
  /** ISO date this record's information was last checked — distinct from `lastReviewed` elsewhere, kept named identically for consistency. */
  lastReviewed: string;
  /** True for every current record — no verified, active scholarship exists yet. */
  isTemplate: true;
  contentStatus: PublicationStatus;
  seo: SeoFields;
}

/** One category grouping for the /faq page's accordions — the underlying `FaqItem` shape is unchanged and reused site-wide. */
export interface FaqCategoryGroup {
  id: string;
  label: string;
  items: FaqItem[];
}

export type ContactMethodType = "phone" | "email" | "whatsapp";

/** UI-shaping type for the contact page's method list — values are always derived from `ContactInfo`, never duplicated content. */
export interface ContactMethod {
  id: string;
  type: ContactMethodType;
  label: string;
  value: string;
  href: string;
}

/** Local implementation of the target Strapi office/location concept — one record today, all values sourced from `ContactInfo.address`. */
export interface OfficeLocation {
  id: string;
  label: string;
  addressLine: string;
  isPrimary: boolean;
}

/** One section of a legal draft page — heading + plain paragraphs, consistent with `ArticleSection`. */
export interface LegalSection {
  id: string;
  heading: string;
  paragraphs: string[];
}

/**
 * Local implementation of a Strapi-mappable legal-page entity. Every
 * current record is an unreviewed draft (`isDraft: true`) — see
 * docs/DECISIONS.md "Legal Draft Status".
 */
export interface LegalPage {
  id: string;
  slug: string;
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
  isDraft: true;
  seo: SeoFields;
}
