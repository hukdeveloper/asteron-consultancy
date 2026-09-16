import { describe, expect, it } from "vitest";

import {
  eligibilityFactors,
  eligibilityFaqItems,
  eligibilityIntro,
} from "./eligibility";

describe("eligibility content", () => {
  it("has non-empty intro, factors and FAQ content", () => {
    expect(eligibilityIntro.length).toBeGreaterThan(0);
    expect(eligibilityFactors.length).toBeGreaterThan(0);
    expect(eligibilityFaqItems.length).toBeGreaterThan(0);
  });

  it("never claims a guaranteed outcome", () => {
    const allText = [
      eligibilityIntro,
      ...eligibilityFactors.flatMap((f) => [f.title, f.description]),
      ...eligibilityFaqItems.flatMap((f) => [f.question, f.answer]),
    ]
      .join(" \n ")
      .toLowerCase();

    for (const phrase of [
      "guaranteed admission",
      "we guarantee",
      "guaranteed visa",
      "100% eligible",
    ]) {
      expect(allText).not.toContain(phrase);
    }
  });

  it("explicitly answers that no online eligibility form exists yet", () => {
    const formFaq = eligibilityFaqItems.find((item) =>
      item.question.toLowerCase().includes("online eligibility checker"),
    );
    expect(formFaq).toBeDefined();
    expect(formFaq?.answer.toLowerCase()).toMatch(
      /not yet|book a free consultation/,
    );
  });
});
