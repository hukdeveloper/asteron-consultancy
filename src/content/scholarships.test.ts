import { describe, expect, it } from "vitest";

import { scholarships } from "./scholarships";

describe("scholarships content", () => {
  it("has unique ids and slugs", () => {
    const ids = scholarships.map((scholarship) => scholarship.id);
    const slugs = scholarships.map((scholarship) => scholarship.slug);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("marks every current record as a template, not an active scholarship", () => {
    for (const scholarship of scholarships) {
      expect(scholarship.isTemplate).toBe(true);
      expect(scholarship.name.toLowerCase()).toContain("content template");
    }
  });

  it("never publishes an opening date or deadline", () => {
    for (const scholarship of scholarships) {
      expect(scholarship.openingDate).toBeUndefined();
      expect(scholarship.deadline).toBeUndefined();
    }
  });
});
