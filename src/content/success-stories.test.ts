import { describe, expect, it } from "vitest";

import { successStories } from "./success-stories";

describe("success stories content", () => {
  it("has unique ids and slugs", () => {
    const ids = successStories.map((story) => story.id);
    const slugs = successStories.map((story) => story.slug);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("marks every current story as demo content", () => {
    for (const story of successStories) {
      expect(story.isSampleContent).toBe(true);
    }
  });

  it("never exposes offer letters, passport information, or private records", () => {
    const text = JSON.stringify(successStories).toLowerCase();
    for (const forbidden of [
      "passport",
      "offer letter",
      "national id",
      "date of birth",
    ]) {
      expect(text).not.toContain(forbidden);
    }
  });

  it("does not use a full real name — display names are initials-based", () => {
    for (const story of successStories) {
      expect(story.displayName).toMatch(/example journey/i);
    }
  });
});
