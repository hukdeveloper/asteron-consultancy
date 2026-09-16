import type { Scholarship } from "@/types/content";

/**
 * Content for /scholarships and /scholarships/[slug]. No active,
 * verified scholarship is published here — every record is explicitly a
 * content template (`isTemplate: true`), demonstrating the intended
 * structure only. No deadline or opening date is stated anywhere, since
 * none has been officially verified. See docs/DECISIONS.md "Scholarship
 * Directory Policy".
 */

export const scholarshipsIntro =
  "A structured scholarship directory is planned for this section. We haven't verified any active scholarship listings yet, so none are published here — the entries below are content templates showing the intended structure, not real opportunities to apply for.";

export const scholarships: Scholarship[] = [
  {
    id: "template-destination-based",
    slug: "template-destination-based-scholarship",
    name: "Content Template — Destination-Based Scholarship",
    provider: "To be confirmed",
    destinationNames: [],
    studyLevels: [],
    subjectAreas: [],
    fundingType: "unspecified",
    eligibilitySummary:
      "This is a content template, not an active scholarship. A real entry would summarise eligibility criteria here once verified with the awarding institution or funding body.",
    applicationProcessSummary:
      "A real entry would summarise the general application process here once verified — for example, whether it's applied for directly, through an institution, or via a separate portal.",
    lastReviewed: "2026-09-13",
    isTemplate: true,
    contentStatus: "published",
    seo: {
      metaTitle: "Content Template — Destination-Based Scholarship",
      metaDescription:
        "A content template demonstrating the intended structure of a destination-based scholarship listing — not an active scholarship.",
    },
  },
  {
    id: "template-subject-based",
    slug: "template-subject-based-scholarship",
    name: "Content Template — Subject-Based Scholarship",
    provider: "To be confirmed",
    destinationNames: [],
    studyLevels: [],
    subjectAreas: [],
    fundingType: "unspecified",
    eligibilitySummary:
      "This is a content template, not an active scholarship. A real entry would summarise eligibility criteria here once verified with the awarding institution or funding body.",
    applicationProcessSummary:
      "A real entry would summarise the general application process here once verified.",
    lastReviewed: "2026-09-13",
    isTemplate: true,
    contentStatus: "published",
    seo: {
      metaTitle: "Content Template — Subject-Based Scholarship",
      metaDescription:
        "A content template demonstrating the intended structure of a subject-based scholarship listing — not an active scholarship.",
    },
  },
];
