import { describe, expect, it } from "vitest";

import { insuranceGlobalDisclosure, insuranceServices } from "./insurance";
import { services } from "./services";

const PROHIBITED_PHRASES = [
  "guaranteed coverage",
  "we guarantee",
  "guaranteed claim",
  "guaranteed reimbursement",
  "asteron is an insurer",
  "asteron underwrites",
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

const serviceSlugs = new Set(services.map((service) => service.slug));

describe("insurance content", () => {
  it("defines exactly the three required insurance types", () => {
    expect(insuranceServices).toHaveLength(3);
    const types = insuranceServices.map((i) => i.insuranceType).sort();
    expect(types).toEqual(["student-health", "travel", "visitor"]);
  });

  it("has unique ids and slugs", () => {
    const ids = insuranceServices.map((i) => i.id);
    const slugs = insuranceServices.map((i) => i.slug);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("uses the exact required slugs", () => {
    const slugs = insuranceServices.map((i) => i.slug).sort();
    expect(slugs).toEqual(
      [
        "student-health-insurance",
        "travel-insurance",
        "visitor-insurance",
      ].sort(),
    );
  });

  it("populates every required field with non-empty content", () => {
    for (const insurance of insuranceServices) {
      expect(insurance.title.length).toBeGreaterThan(0);
      expect(insurance.summary.length).toBeGreaterThan(0);
      expect(insurance.heroTitle.length).toBeGreaterThan(0);
      expect(insurance.heroDescription.length).toBeGreaterThan(0);
      expect(insurance.visualIcon.length).toBeGreaterThan(0);
      expect(insurance.overview.length).toBeGreaterThan(0);
      expect(insurance.possibleCoverageAreas.length).toBeGreaterThan(0);
      expect(insurance.commonExclusionsNote.length).toBeGreaterThan(0);
      expect(insurance.eligibilityNote.length).toBeGreaterThan(0);
      expect(insurance.informationNeededForQuote.length).toBeGreaterThan(0);
      expect(insurance.processSteps.length).toBeGreaterThan(0);
      expect(insurance.providerDisclosure.length).toBeGreaterThan(0);
      expect(insurance.claimsSupportDescription.length).toBeGreaterThan(0);
      expect(insurance.faqItems.length).toBeGreaterThan(0);
      expect(insurance.seo.metaTitle?.length).toBeGreaterThan(0);
      expect(insurance.seo.metaDescription?.length).toBeGreaterThan(0);
      expect(insurance.lastReviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(insurance.contentStatus).toBe("published");
    }
  });

  it("only references related services that actually exist", () => {
    for (const insurance of insuranceServices) {
      for (const slug of insurance.relatedServiceSlugs) {
        expect(serviceSlugs.has(slug)).toBe(true);
      }
    }
  });

  it("uses 'may include' style language, never claiming universal coverage", () => {
    for (const insurance of insuranceServices) {
      const text = collectStrings(insurance.possibleCoverageAreas)
        .join(" \n ")
        .toLowerCase();
      expect(text).not.toMatch(
        /\ball coverage\b|\bfully covers\b|\bguaranteed cover/,
      );
    }
  });

  it("does not present visitor insurance as immigration advice", () => {
    const visitor = insuranceServices.find(
      (i) => i.slug === "visitor-insurance",
    );
    const text = collectStrings(visitor).join(" \n ").toLowerCase();
    expect(text).toMatch(
      /not immigration advice|general information, not immigration advice/,
    );
  });

  it("includes the required global insurance disclosure verbatim", () => {
    expect(insuranceGlobalDisclosure).toBe(
      "Asteron Global Consultancy provides general information and quotation assistance. Insurance coverage, premiums, eligibility, exclusions, claims and policy issuance are determined by the relevant insurance provider. Always review the provider's official policy wording before purchase.",
    );
  });

  it("never implies Asteron is the insurer, sets premiums, or guarantees claims", () => {
    const allText = collectStrings([
      insuranceServices,
      insuranceGlobalDisclosure,
    ])
      .join(" \n ")
      .toLowerCase();

    for (const phrase of PROHIBITED_PHRASES) {
      expect(allText).not.toContain(phrase.toLowerCase());
    }
  });

  it("does not state precise premiums or currency figures", () => {
    for (const insurance of insuranceServices) {
      expect(insurance.overview).not.toMatch(/[$£€]\s?\d/);
      expect(insurance.providerDisclosure).not.toMatch(/[$£€]\s?\d/);
    }
  });
});
