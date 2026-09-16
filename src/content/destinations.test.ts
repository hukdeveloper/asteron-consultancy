import { describe, expect, it } from "vitest";

import { destinations } from "./destinations";
import { services } from "./services";

const serviceSlugs = new Set(services.map((service) => service.slug));

// Affirmative-claim forms only — a legitimate FAQ answer may contain the
// word "guarantee" as part of an honest, negated statement.
const PROHIBITED_PHRASES = [
  "guaranteed admission",
  "we guarantee admission",
  "guaranteed visa",
  "we guarantee visa",
  "100% visa",
  "visa success rate",
  "processing time is",
  "will take exactly",
];

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

describe("destination content", () => {
  it("defines exactly the six required destinations", () => {
    expect(destinations).toHaveLength(6);
    const names = destinations.map((d) => d.name).sort();
    expect(names).toEqual(
      [
        "Australia",
        "Canada",
        "Germany",
        "Ireland",
        "United Kingdom",
        "United States",
      ].sort(),
    );
  });

  it("has unique ids and slugs", () => {
    const ids = destinations.map((d) => d.id);
    const slugs = destinations.map((d) => d.slug);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("uses URL-safe slugs", () => {
    for (const destination of destinations) {
      expect(destination.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("populates every required field with non-empty content", () => {
    for (const destination of destinations) {
      expect(destination.name.length).toBeGreaterThan(0);
      expect(destination.shortName.length).toBeGreaterThan(0);
      expect(destination.region.length).toBeGreaterThan(0);
      expect(destination.flagLabel.length).toBeGreaterThan(0);
      expect(destination.visualIcon.length).toBeGreaterThan(0);
      expect(destination.heroTitle.length).toBeGreaterThan(0);
      expect(destination.heroDescription.length).toBeGreaterThan(0);
      expect(destination.overview.length).toBeGreaterThan(0);
      expect(destination.highlights.length).toBeGreaterThan(0);
      expect(destination.studyLevels.length).toBeGreaterThan(0);
      expect(destination.popularSubjectAreas.length).toBeGreaterThan(0);
      expect(destination.applicationProcess.length).toBeGreaterThan(0);
      expect(destination.typicalIntakes.length).toBeGreaterThan(0);
      expect(destination.generalCostGuidance.length).toBeGreaterThan(0);
      expect(destination.scholarshipGuidance.length).toBeGreaterThan(0);
      expect(destination.visaGuidance.length).toBeGreaterThan(0);
      expect(destination.workAndLifestyleNote.length).toBeGreaterThan(0);
      expect(destination.faqItems.length).toBeGreaterThan(0);
      expect(destination.languageConsiderations.length).toBeGreaterThan(0);
      expect(destination.lifestyleSetting.length).toBeGreaterThan(0);
      expect(destination.planningConsiderations.length).toBeGreaterThan(0);
      expect(destination.seo.metaTitle?.length).toBeGreaterThan(0);
      expect(destination.seo.metaDescription?.length).toBeGreaterThan(0);
      expect(destination.lastReviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("only references related services that actually exist", () => {
    for (const destination of destinations) {
      for (const slug of destination.relatedServices) {
        expect(serviceSlugs.has(slug)).toBe(true);
      }
    }
  });

  it("marks every destination as published", () => {
    for (const destination of destinations) {
      expect(destination.contentStatus).toBe("published");
    }
  });

  it("contains no prohibited guarantee or precise-figure language", () => {
    const allText = collectStrings(destinations).join(" \n ").toLowerCase();
    for (const phrase of PROHIBITED_PHRASES) {
      expect(allText).not.toContain(phrase.toLowerCase());
    }
  });

  it("does not state precise visa fees or costs with currency symbols", () => {
    for (const destination of destinations) {
      expect(destination.visaGuidance).not.toMatch(/[$£€]\s?\d/);
      expect(destination.generalCostGuidance).not.toMatch(/[$£€]\s?\d/);
    }
  });

  it("every destination's visa guidance directs readers to an official source", () => {
    for (const destination of destinations) {
      expect(destination.visaGuidance.toLowerCase()).toMatch(
        /official|government/,
      );
    }
  });
});
