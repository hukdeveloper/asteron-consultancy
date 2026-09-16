import type { FaqItem, KeyPoint, SeoFields } from "@/types/content";

/**
 * Content for /check-eligibility. This is deliberately an informative page
 * only — no interactive eligibility form. See docs/DECISIONS.md
 * "Check-Eligibility Form Deferred" for why: the project has no form
 * foundation yet (no React Hook Form/Zod-based form component exists
 * anywhere in the codebase), and a form-service integration is a separate,
 * later track (docs/IMPLEMENTATION_PLAN.md Track 2). Building one bespoke
 * form here would duplicate that future work rather than reuse it.
 */

export const eligibilityIntro =
  "There's no single, universal eligibility test for studying abroad — what you'll need depends on the destination, institution, programme and study level you're considering, and requirements can change. This page explains the general factors institutions and visa authorities typically consider, so you know what to prepare before a consultation.";

export const eligibilityFactors: KeyPoint[] = [
  {
    id: "academic-record",
    title: "Academic record",
    description:
      "Your previous qualifications and grades, assessed against each institution's own entry requirements.",
  },
  {
    id: "english-proficiency",
    title: "English-language proficiency",
    description:
      "Many institutions and visa categories require evidence of English proficiency, with accepted tests and required scores varying by institution and destination.",
  },
  {
    id: "finances",
    title: "Financial readiness",
    description:
      "Most visa categories require evidence you can cover tuition and living costs — specific thresholds are set and updated by each government.",
  },
  {
    id: "programme-fit",
    title: "Programme-specific criteria",
    description:
      "Some programmes have their own prerequisites, portfolios, tests or interviews in addition to general entry requirements.",
  },
  {
    id: "immigration-history",
    title: "Immigration and documentation history",
    description:
      "Prior visa history and documentation can be relevant to some applications — official sources set how this is assessed.",
  },
];

export const eligibilityFaqItems: FaqItem[] = [
  {
    id: "eligibility-faq-guarantee",
    question: "Can you tell me if I'm guaranteed to be accepted or get a visa?",
    answer:
      "No — admission and visa decisions are made solely by institutions and government authorities. We can help you understand general requirements and prepare a stronger application, but we cannot guarantee any outcome.",
  },
  {
    id: "eligibility-faq-how",
    question:
      "How can I find out if I meet the requirements for a specific programme?",
    answer:
      "The most reliable source is the institution's own published entry requirements for that specific programme, alongside the relevant government's official immigration guidance. A consultation can help you interpret these against your own background.",
  },
  {
    id: "eligibility-faq-form",
    question: "Is there an online eligibility checker I can fill in?",
    answer:
      "Not yet — eligibility depends on too many destination-, institution- and programme-specific factors to reduce to a simple online form. Book a free consultation instead for guidance tailored to your situation.",
  },
];

export const eligibilitySeo: SeoFields = {
  metaTitle: "Check Your Study Abroad Eligibility",
  metaDescription:
    "Understand the general factors that affect study-abroad eligibility — academic record, English proficiency, finances and programme-specific criteria — before booking a consultation.",
};
