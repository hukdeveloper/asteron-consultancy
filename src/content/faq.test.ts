import { describe, expect, it } from "vitest";

import { faqCategories } from "./faq";

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

describe("faq content", () => {
  it("defines the eight required categories", () => {
    const labels = faqCategories.map((category) => category.label);
    expect(labels).toEqual([
      "General",
      "Study Abroad",
      "University Applications",
      "Visa Guidance",
      "Scholarships",
      "Insurance",
      "Accommodation",
      "Consultations",
    ]);
  });

  it("has unique category ids and unique item ids across all categories", () => {
    const categoryIds = faqCategories.map((category) => category.id);
    expect(new Set(categoryIds).size).toBe(categoryIds.length);

    const itemIds = faqCategories.flatMap((category) =>
      category.items.map((item) => item.id),
    );
    expect(new Set(itemIds).size).toBe(itemIds.length);
  });

  it("gives every category at least one question", () => {
    for (const category of faqCategories) {
      expect(category.items.length).toBeGreaterThan(0);
    }
  });

  it("covers every required topic", () => {
    const text = collectStrings(faqCategories).join(" \n ").toLowerCase();
    for (const topic of [
      "when should i start planning",
      "how does university selection work",
      "commonly needed for an application",
      "guarantee admission",
      "guarantee visa approval",
      "scholarship",
      "responsible for my insurance coverage",
      "book a consultation",
      "how much do your services cost",
      "how will my personal information be handled",
    ]) {
      expect(text).toContain(topic);
    }
  });

  it("does not invent exact service prices", () => {
    const text = collectStrings(faqCategories).join(" \n ");
    expect(text).not.toMatch(/[$£€]\s?\d/);
  });

  it("never claims a guaranteed admission or visa outcome", () => {
    const text = collectStrings(faqCategories).join(" \n ").toLowerCase();
    expect(text).not.toContain("we guarantee");
  });
});
