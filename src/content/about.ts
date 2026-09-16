import type { CtaLink, KeyPoint } from "@/types/content";

/**
 * Content for /about. No founding year, office count, accreditation,
 * award, success rate, formal university representation, or regulatory
 * licence is stated anywhere here — none of that information is
 * available or verified. See docs/DECISIONS.md "About-Page Scope".
 */

export const aboutIntro =
  "Asteron Global Consultancy helps students and families plan international education with clearer information and practical, step-by-step support.";

export const aboutMission =
  "To make international education planning clearer by giving students and families practical guidance, transparent next steps and dependable support throughout their journey.";

export const aboutHistoryNote =
  "Asteron's company history and background will be added here once finalised. This section is a placeholder — no founding date, office locations, accreditations or awards are stated until they can be verified.";

export const aboutValues: KeyPoint[] = [
  {
    id: "student-focused",
    title: "Student-focused guidance",
    description:
      "Advice shaped around each student's own goals and circumstances, not a fixed script.",
  },
  {
    id: "clarity",
    title: "Clarity",
    description:
      "Plain-language explanations of options and next steps, without unnecessary jargon.",
  },
  {
    id: "integrity",
    title: "Integrity",
    description:
      "Honest about what we can and cannot influence — including admissions, visa and scholarship decisions.",
  },
  {
    id: "respect",
    title: "Respect",
    description:
      "Treating every student and family's circumstances, questions and pace with respect.",
  },
  {
    id: "responsible-communication",
    title: "Responsible communication",
    description:
      "No exaggerated promises or invented statistics — just straightforward information.",
  },
  {
    id: "continuous-learning",
    title: "Continuous learning",
    description:
      "Keeping our own general knowledge current as destinations, processes and guidance evolve.",
  },
];

export const aboutHowWeSupport: KeyPoint[] = [
  {
    id: "clarify-goals",
    title: "Clarifying your goals",
    description:
      "Starting conversations with your background, priorities and constraints, not a generic checklist.",
  },
  {
    id: "compare-options",
    title: "Comparing your options",
    description:
      "Structured help comparing destinations, study levels, universities and courses.",
  },
  {
    id: "prepare-applications",
    title: "Preparing applications",
    description:
      "Practical support organising documents and presenting your own experience clearly.",
  },
  {
    id: "navigate-process",
    title: "Navigating the process",
    description:
      "General guidance through visa documentation, insurance and pre-departure preparation.",
  },
];

export const aboutServiceDistinction =
  "Study Abroad services (counselling, university and course selection, application assistance, visa guidance, scholarship guidance, accommodation and pre-departure support) and Insurance guidance are related but distinct: insurance is general information and quotation assistance, provided separately from education consulting — see our Services and Insurance pages for the full distinction.";

export const aboutGuidancePrinciples: KeyPoint[] = [
  {
    id: "no-guarantees",
    title: "We don't guarantee outcomes",
    description:
      "Admission, visa and scholarship decisions are made solely by institutions and government authorities.",
  },
  {
    id: "general-guidance",
    title: "Guidance is general, applied to you",
    description:
      "We explain general processes and help you apply them to your own situation.",
  },
  {
    id: "official-sources-first",
    title: "Official sources always take priority",
    description:
      "For binding requirements, we always point you to the relevant institution or government authority.",
  },
  {
    id: "your-decisions",
    title: "The decisions stay yours",
    description:
      "We help you compare options — the final choices about where and what to study remain yours to make.",
  },
];

export const aboutTeamPreviewIntro =
  "Our team supports students across counselling, applications, visa documentation, insurance guidance and ongoing coordination.";

export const aboutFinalCta: {
  heading: string;
  description: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
} = {
  heading: "Ready to talk through your goals?",
  description:
    "Book a free consultation to see how we can help with your specific situation.",
  primaryCta: { label: "Book Free Consultation", href: "/book-consultation" },
  secondaryCta: { label: "Meet the Team", href: "/team" },
};
