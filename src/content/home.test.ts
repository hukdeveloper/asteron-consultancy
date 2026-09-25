import { describe, expect, it } from "vitest";

import {
  exampleUniversities,
  faqItems,
  homeHero,
  insuranceDisclaimer,
  insuranceHighlights,
  processSteps,
  resourceSummaries,
  sampleEvent,
  scholarshipHighlights,
  successStoryDemos,
  trustPoints,
  whyChooseReasons,
} from "./home";
import { destinations } from "./destinations";
import { services } from "./services";

// Affirmative-claim forms only — not "guarantee" in general, since the
// required FAQ question "Do you guarantee admission or visa approval?"
// legitimately contains that word as part of an honest, negated answer.
const PROHIBITED_PHRASES = [
  "guaranteed admission",
  "we guarantee admission",
  "guaranteed visa",
  "we guarantee visa",
  "100% visa",
  "visa success rate",
  "years of experience",
  "number one",
  "#1",
  "years in business",
];

/** Recursively collects every string value in an object/array so the banned-phrase
 * scan can't miss content nested inside a field we forgot to check by name. */
function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") {
    out.push(value);
  } else if (Array.isArray(value)) {
    for (const item of value) collectStrings(item, out);
  } else if (value && typeof value === "object") {
    for (const item of Object.values(value)) collectStrings(item, out);
  }
  return out;
}

const allHomeContent = [
  homeHero,
  trustPoints,
  processSteps,
  whyChooseReasons,
  exampleUniversities,
  scholarshipHighlights,
  successStoryDemos,
  insuranceHighlights,
  insuranceDisclaimer,
  sampleEvent,
  resourceSummaries,
  faqItems,
  destinations,
  services,
];

describe("homepage content", () => {
  it("contains no prohibited guarantee or fabricated-achievement language", () => {
    const allText = collectStrings(allHomeContent).join(" \n ").toLowerCase();

    for (const phrase of PROHIBITED_PHRASES) {
      expect(allText).not.toContain(phrase.toLowerCase());
    }
  });

  it("marks every success story as sample content", () => {
    for (const story of successStoryDemos) {
      expect(story.isSampleContent).toBe(true);
    }
  });

  it("marks the sample event as sample content", () => {
    expect(sampleEvent.isSampleContent).toBe(true);
  });

  it("gives the sample event a non-fictional schedule label", () => {
    expect(sampleEvent.scheduleLabel).toBe("Schedule to be announced");
  });

  it("includes the required insurance disclaimer text verbatim", () => {
    expect(insuranceDisclaimer).toBe(
      "Janan provides general guidance and quotation assistance. Coverage, eligibility, exclusions and policy issuance are determined by the relevant insurance provider.",
    );
  });

  it("defines exactly six FAQ items covering the required topics", () => {
    expect(faqItems).toHaveLength(6);
    const questions = faqItems.map((item) => item.question);
    expect(questions).toContain("Do you guarantee admission or visa approval?");
  });

  it("does not invent per-destination costs or precise visa rules in the homepage-visible summary", () => {
    for (const destination of destinations) {
      expect(destination.heroDescription.toLowerCase()).not.toMatch(
        /\$|£|€|visa (requires|rule)/,
      );
    }
  });

  it("gives every service an icon and every destination/service a slug", () => {
    for (const service of services) {
      expect(service.icon.length).toBeGreaterThan(0);
      expect(service.slug).toMatch(/^[a-z0-9-]+$/);
    }
    for (const destination of destinations) {
      expect(destination.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });
});
