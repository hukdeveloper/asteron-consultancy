import { describe, expect, it } from "vitest";

import { resourceArticles, resourceCategories } from "./resources";

const articleSlugs = new Set(resourceArticles.map((article) => article.slug));
const categoryIds = new Set(resourceCategories.map((category) => category.id));

describe("resources content", () => {
  it("has unique article ids and slugs", () => {
    const ids = resourceArticles.map((article) => article.id);
    const slugs = resourceArticles.map((article) => article.slug);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("defines the six required initial articles", () => {
    const titles = resourceArticles.map((article) => article.title);
    expect(titles).toEqual(
      expect.arrayContaining([
        "How to Choose the Right Study Destination",
        "Documents Commonly Needed for University Applications",
        "Understanding Student Travel and Health Insurance",
        "How to Plan a Study Abroad Budget",
        "Questions to Ask During a University Consultation",
        "Preparing for Your Pre-departure Checklist",
      ]),
    );
    expect(resourceArticles).toHaveLength(6);
  });

  it("assigns every article to a known category", () => {
    for (const article of resourceArticles) {
      expect(categoryIds.has(article.categoryId)).toBe(true);
    }
  });

  it("gives every article structured sections, a reading time and a reviewed date", () => {
    for (const article of resourceArticles) {
      expect(article.sections.length).toBeGreaterThan(0);
      for (const section of article.sections) {
        expect(section.paragraphs.length).toBeGreaterThan(0);
      }
      expect(article.readingTimeMinutes).toBeGreaterThan(0);
      expect(article.lastReviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(article.seo.metaTitle?.length).toBeGreaterThan(0);
      expect(article.seo.metaDescription?.length).toBeGreaterThan(0);
    }
  });

  it("only references related articles that actually exist, and never itself", () => {
    for (const article of resourceArticles) {
      expect(article.relatedArticleSlugs).not.toContain(article.slug);
      for (const slug of article.relatedArticleSlugs) {
        expect(articleSlugs.has(slug)).toBe(true);
      }
    }
  });

  it("marks every article as published", () => {
    for (const article of resourceArticles) {
      expect(article.contentStatus).toBe("published");
    }
  });

  it("does not make specific legal, immigration, medical or financial claims", () => {
    // Affirmative-claim forms only — one article legitimately says a
    // scholarship is "never guaranteed" / "can't guarantee", which is the
    // correct, honest claim, not a prohibited one.
    const text = JSON.stringify(resourceArticles).toLowerCase();
    for (const forbidden of [
      "you will be approved",
      "we guarantee",
      "must pay exactly",
      "this medication",
    ]) {
      expect(text).not.toContain(forbidden);
    }
  });
});
