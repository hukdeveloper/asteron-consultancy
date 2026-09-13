import type { ServiceSummary } from "@/types/content";

/**
 * Minimal service records — enough to drive navigation and generate a
 * "coming soon" static page per service (src/app/(public)/services/[slug]).
 * Full service content (descriptions, icons, etc. — see
 * docs/CONTENT_MODEL.md §8) is out of scope until Phase 3.
 */
export const services: ServiceSummary[] = [
  {
    id: "university-selection",
    slug: "university-selection",
    title: "University Selection",
    summary:
      "Guidance choosing universities and programmes that fit your goals.",
    status: "published",
  },
  {
    id: "application-assistance",
    slug: "application-assistance",
    title: "Application Assistance",
    summary:
      "Support preparing and submitting a strong admissions application.",
    status: "published",
  },
  {
    id: "visa-guidance",
    slug: "visa-guidance",
    title: "Visa Guidance",
    summary:
      "Documentation and process guidance for student visa applications.",
    status: "published",
  },
  {
    id: "accommodation-support",
    slug: "accommodation-support",
    title: "Accommodation Support",
    summary: "Help finding suitable student accommodation ahead of your move.",
    status: "published",
  },
  {
    id: "pre-departure-guidance",
    slug: "pre-departure-guidance",
    title: "Pre-departure Guidance",
    summary: "Practical preparation guidance before you travel.",
    status: "published",
  },
];
