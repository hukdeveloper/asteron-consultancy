import { describe, expect, it } from "vitest";

import { legalDraftNotice, legalPages } from "./legal";

describe("legal content", () => {
  it("defines the four required legal drafts", () => {
    const slugs = legalPages.map((page) => page.slug).sort();
    expect(slugs).toEqual(
      [
        "privacy-policy",
        "terms-of-service",
        "cookie-policy",
        "disclaimer",
      ].sort(),
    );
  });

  it("marks every page as a draft with the required verbatim notice", () => {
    expect(legalDraftNotice).toBe(
      "Temporary draft—professional legal review required before production launch.",
    );
    for (const page of legalPages) {
      expect(page.isDraft).toBe(true);
    }
  });

  it("gives every page non-empty sections and SEO fields", () => {
    for (const page of legalPages) {
      expect(page.sections.length).toBeGreaterThan(0);
      for (const section of page.sections) {
        expect(section.paragraphs.length).toBeGreaterThan(0);
      }
      expect(page.seo.metaTitle?.length).toBeGreaterThan(0);
      expect(page.seo.metaDescription?.length).toBeGreaterThan(0);
      expect(page.lastUpdated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("does not claim these drafts are legal advice or production-approved", () => {
    const text = JSON.stringify(legalPages).toLowerCase();
    expect(text).not.toContain("this constitutes legal advice");
    expect(text).not.toContain("production-approved");
  });

  it("privacy draft explains current demo-form behaviour and future connected forms", () => {
    const privacy = legalPages.find((page) => page.slug === "privacy-policy");
    const text = JSON.stringify(privacy).toLowerCase();
    expect(text).toContain("not transmitted");
    expect(text).toContain("future");
  });

  it("cookie draft does not claim analytics or consent systems exist today", () => {
    const cookies = legalPages.find((page) => page.slug === "cookie-policy");
    const text = JSON.stringify(cookies).toLowerCase();
    expect(text).toContain("does not use analytics");
  });

  it("terms draft states no guaranteed outcomes", () => {
    const terms = legalPages.find((page) => page.slug === "terms-of-service");
    const text = JSON.stringify(terms).toLowerCase();
    expect(text).toContain("do not guarantee");
  });

  it("disclaimer covers education, visa, insurance, scholarships and external links", () => {
    const disclaimer = legalPages.find((page) => page.slug === "disclaimer");
    const headings =
      disclaimer?.sections.map((section) => section.heading.toLowerCase()) ??
      [];
    expect(headings.some((h) => h.includes("education"))).toBe(true);
    expect(headings.some((h) => h.includes("immigration"))).toBe(true);
    expect(headings.some((h) => h.includes("insurance"))).toBe(true);
    expect(headings.some((h) => h.includes("scholarship"))).toBe(true);
    expect(headings.some((h) => h.includes("external"))).toBe(true);
  });
});
