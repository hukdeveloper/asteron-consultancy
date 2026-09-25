import { describe, expect, it } from "vitest";

import {
  costPlanningCategories,
  genericApplicationProcess,
  howJananSupports,
  parentReassurance,
  popularSubjectAreas,
  postgraduatePageContent,
  studyAbroadFaqItems,
  undergraduatePageContent,
  visaGuidanceIntro,
} from "./study-abroad";

const PROHIBITED_PHRASES = [
  "guaranteed admission",
  "we guarantee admission",
  "guaranteed visa",
  "we guarantee visa",
  "100% visa",
  "visa success rate",
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

describe("shared study abroad content", () => {
  it("defines the required 10-step generic application process, in order", () => {
    expect(genericApplicationProcess).toHaveLength(10);
    expect(genericApplicationProcess.map((step) => step.title)).toEqual([
      "Define your study goals",
      "Review entry requirements",
      "Compare programmes",
      "Prepare your documents",
      "Submit applications",
      "Review offers",
      "Prepare your finances",
      "Follow the official visa process",
      "Arrange insurance and accommodation",
      "Prepare for departure",
    ]);
    expect(genericApplicationProcess.map((step) => step.step)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
  });

  it("defines the required non-ranked subject-area categories", () => {
    expect(popularSubjectAreas).toEqual([
      "Business and Management",
      "Computing and Technology",
      "Engineering",
      "Health and Life Sciences",
      "Social Sciences",
      "Arts and Design",
    ]);
  });

  it("defines cost-planning categories without any figures", () => {
    expect(costPlanningCategories.length).toBeGreaterThan(0);
    for (const category of costPlanningCategories) {
      expect(category.description).not.toMatch(/[$£€]\s?\d/);
    }
  });

  it("keeps hub-level visa guidance general and pointed at official sources", () => {
    expect(visaGuidanceIntro.toLowerCase()).toMatch(/government|official/);
    expect(visaGuidanceIntro).not.toMatch(/[$£€]\s?\d/);
  });

  it("has non-empty how-Janan-supports and parent-reassurance content", () => {
    expect(howJananSupports.length).toBeGreaterThan(0);
    expect(parentReassurance.length).toBeGreaterThan(0);
  });

  for (const [label, content] of [
    ["undergraduate", undergraduatePageContent],
    ["postgraduate", postgraduatePageContent],
  ] as const) {
    describe(`${label} study-level content`, () => {
      it("populates every required field", () => {
        expect(content.heading.length).toBeGreaterThan(0);
        expect(content.intro.length).toBeGreaterThan(0);
        expect(content.whoItsFor.length).toBeGreaterThan(0);
        expect(content.qualificationConsiderations.length).toBeGreaterThan(0);
        expect(content.planningTimeline.length).toBeGreaterThan(0);
        expect(content.documentChecklist.length).toBeGreaterThan(0);
        expect(content.courseSelectionGuidance.length).toBeGreaterThan(0);
        expect(content.fundingConsiderations.length).toBeGreaterThan(0);
        expect(content.faqItems.length).toBeGreaterThan(0);
        expect(content.seo.metaTitle?.length).toBeGreaterThan(0);
        expect(content.seo.metaDescription?.length).toBeGreaterThan(0);
      });

      it("states that requirements vary rather than making a universal claim", () => {
        const allText = collectStrings(content).join(" \n ").toLowerCase();
        expect(allText).toMatch(/vary|varies|varying/);
      });
    });
  }

  it("contains no prohibited guarantee language anywhere in the shared content", () => {
    const allText = collectStrings([
      genericApplicationProcess,
      popularSubjectAreas,
      howJananSupports,
      costPlanningCategories,
      visaGuidanceIntro,
      parentReassurance,
      studyAbroadFaqItems,
      undergraduatePageContent,
      postgraduatePageContent,
    ])
      .join(" \n ")
      .toLowerCase();

    for (const phrase of PROHIBITED_PHRASES) {
      expect(allText).not.toContain(phrase.toLowerCase());
    }
  });
});
