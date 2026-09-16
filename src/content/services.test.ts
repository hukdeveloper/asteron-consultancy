import { describe, expect, it } from "vitest";

import {
  honestScopeLimitations,
  howSupportWorks,
  serviceCategories,
  services,
  servicesFaqItems,
} from "./services";

// Affirmative-claim forms only — several FAQ answers and SEO descriptions
// legitimately contain "guarantee(d)" as part of an honest negation (e.g.
// "no invented or guaranteed scholarships"), same convention as home.test.ts.
const PROHIBITED_PHRASES = [
  "we guarantee admission",
  "we guarantee visa",
  "100% visa",
  "visa success rate",
  "we guarantee selection",
  "we guarantee funding",
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

describe("service content", () => {
  it("has unique ids and slugs", () => {
    const ids = services.map((service) => service.id);
    const slugs = services.map((service) => service.slug);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("uses URL-safe slugs", () => {
    for (const service of services) {
      expect(service.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("assigns every service to a known category", () => {
    const categoryIds = new Set(
      serviceCategories.map((category) => category.id),
    );
    for (const service of services) {
      expect(categoryIds.has(service.category)).toBe(true);
    }
  });

  it("populates every required field with non-empty content", () => {
    for (const service of services) {
      expect(service.title.length).toBeGreaterThan(0);
      expect(service.shortTitle.length).toBeGreaterThan(0);
      expect(service.summary.length).toBeGreaterThan(0);
      expect(service.heroTitle.length).toBeGreaterThan(0);
      expect(service.heroDescription.length).toBeGreaterThan(0);
      expect(service.icon.length).toBeGreaterThan(0);
      expect(service.overview.length).toBeGreaterThan(0);
      expect(service.whoItMayHelp.length).toBeGreaterThan(0);
      expect(service.benefits.length).toBeGreaterThan(0);
      expect(service.includedSupport.length).toBeGreaterThan(0);
      expect(service.processSteps.length).toBeGreaterThan(0);
      expect(service.requiredInformation.length).toBeGreaterThan(0);
      expect(service.limitations.length).toBeGreaterThan(0);
      expect(service.faqItems.length).toBeGreaterThan(0);
      expect(service.primaryCta.label.length).toBeGreaterThan(0);
      expect(service.primaryCta.href.startsWith("/")).toBe(true);
      expect(service.seo.metaTitle?.length).toBeGreaterThan(0);
      expect(service.seo.metaDescription?.length).toBeGreaterThan(0);
      expect(service.lastReviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("only references related services that actually exist, are published, and never self-references", () => {
    for (const service of services) {
      expect(service.relatedServiceSlugs).not.toContain(service.slug);
      const unique = new Set(service.relatedServiceSlugs);
      expect(unique.size).toBe(service.relatedServiceSlugs.length);
      for (const slug of service.relatedServiceSlugs) {
        expect(serviceSlugs.has(slug)).toBe(true);
      }
    }
  });

  it("marks every service as published", () => {
    for (const service of services) {
      expect(service.contentStatus).toBe("published");
    }
  });

  it("includes the required academic-integrity statement on Application Assistance", () => {
    const service = services.find((s) => s.slug === "application-assistance");
    expect(service?.importantNotice).toBe(
      "Asteron may guide applicants in presenting their own experience clearly, but applicants remain responsible for the truthfulness and originality of submitted material.",
    );
  });

  it("includes the required visa notice on Student Visa Guidance", () => {
    const service = services.find((s) => s.slug === "visa-guidance");
    expect(service?.importantNotice).toBe(
      "Visa rules, documentation requirements, fees and processing times can change. Final decisions are made solely by the relevant government authority.",
    );
  });

  it("includes the required scholarship disclaimer on Scholarship Guidance", () => {
    const service = services.find((s) => s.slug === "scholarship-guidance");
    expect(service?.importantNotice).toBe(
      "Scholarships are awarded by the relevant institution or funding body. Guidance does not guarantee selection or funding.",
    );
  });

  it("does not invent named scholarships on the Scholarship Guidance service", () => {
    const service = services.find((s) => s.slug === "scholarship-guidance");
    const text = collectStrings(service).join(" \n ").toLowerCase();
    expect(text).toMatch(/directory is planned for a later phase/);
  });

  it("includes the required accommodation limitation statement", () => {
    const service = services.find((s) => s.slug === "accommodation-support");
    expect(service?.limitations).toContain(
      "Asteron may provide general guidance or referral assistance but does not guarantee property availability, condition or landlord performance.",
    );
  });

  it("contains no prohibited guarantee language anywhere in service content", () => {
    const allText = collectStrings([
      services,
      howSupportWorks,
      honestScopeLimitations,
      servicesFaqItems,
    ])
      .join(" \n ")
      .toLowerCase();

    for (const phrase of PROHIBITED_PHRASES) {
      expect(allText).not.toContain(phrase.toLowerCase());
    }
  });

  it("does not publish university rankings or claim a universal best university", () => {
    const service = services.find(
      (s) => s.slug === "university-course-selection",
    );
    const text = collectStrings(service).join(" \n ").toLowerCase();
    // Affirmative-claim forms only — the FAQ legitimately asks "the best
    // university for my subject?" as a question it then answers "no" to.
    expect(text).not.toMatch(
      /ranked #\d|is the best university|is the top university/,
    );
    expect(text).toMatch(/does not publish university rankings/);
  });

  it("keeps exactly one featured service per originally-featured slug (scholarship guidance stays off the homepage teaser)", () => {
    const scholarship = services.find((s) => s.slug === "scholarship-guidance");
    expect(scholarship?.isFeatured).toBe(false);

    const featuredCount = services.filter((s) => s.isFeatured).length;
    expect(featuredCount).toBe(6);
  });
});
