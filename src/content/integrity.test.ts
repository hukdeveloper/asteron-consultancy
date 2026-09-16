import { describe, expect, it } from "vitest";

import { destinations } from "./destinations";
import { events } from "./events";
import { faqCategories } from "./faq";
import { insuranceServices } from "./insurance";
import { legalPages } from "./legal";
import { resourceArticles, resourceCategories } from "./resources";
import { scholarships } from "./scholarships";
import { services } from "./services";
import { successStories } from "./success-stories";
import { teamMembers } from "./team";

/**
 * Cross-cutting content-integrity checks (Phase 8 production-readiness
 * audit) — `npm run validate:content`. These complement, rather than
 * duplicate, each content file's own per-type schema/policy tests
 * (`src/content/*.test.ts`): this file checks things that only make sense
 * to verify *across* content types — global slug uniqueness, broken
 * cross-references, orphaned records, invalid dates, missing alt text,
 * and leftover authoring placeholders.
 */

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function expectNoDuplicates(label: string, values: string[]) {
  const seen = new Set<string>();
  const duplicates: string[] = [];
  for (const value of values) {
    if (seen.has(value)) duplicates.push(value);
    seen.add(value);
  }
  expect(duplicates, `duplicate ${label}: ${duplicates.join(", ")}`).toEqual(
    [],
  );
}

function expectValidIsoDateIfSet(label: string, value: string | undefined) {
  if (value === undefined) return;
  expect(value, `${label} is not a valid ISO date: "${value}"`).toMatch(
    ISO_DATE,
  );
  expect(
    Number.isNaN(new Date(value).getTime()),
    `${label} does not parse as a real date: "${value}"`,
  ).toBe(false);
}

const PROHIBITED_PLACEHOLDER_MARKERS = [
  "lorem ipsum",
  "TODO:",
  "FIXME",
  "XXX",
  "PLACEHOLDER TEXT",
];

function collectStrings(value: unknown, into: string[]): void {
  if (typeof value === "string") {
    into.push(value);
  } else if (Array.isArray(value)) {
    for (const item of value) collectStrings(item, into);
  } else if (value && typeof value === "object") {
    for (const item of Object.values(value)) collectStrings(item, into);
  }
}

describe("content integrity — global slug uniqueness", () => {
  it("has no duplicate slugs within each routed content type", () => {
    expectNoDuplicates(
      "destination slugs",
      destinations.map((d) => d.slug),
    );
    expectNoDuplicates(
      "service slugs",
      services.map((s) => s.slug),
    );
    expectNoDuplicates(
      "insurance slugs",
      insuranceServices.map((i) => i.slug),
    );
    expectNoDuplicates(
      "resource article slugs",
      resourceArticles.map((r) => r.slug),
    );
    expectNoDuplicates(
      "resource category slugs",
      resourceCategories.map((c) => c.slug),
    );
    expectNoDuplicates(
      "event slugs",
      events.map((e) => e.slug),
    );
    expectNoDuplicates(
      "scholarship slugs",
      scholarships.map((s) => s.slug),
    );
    expectNoDuplicates(
      "legal page slugs",
      legalPages.map((l) => l.slug),
    );
    expectNoDuplicates(
      "team member ids",
      teamMembers.map((t) => t.id),
    );
    expectNoDuplicates(
      "success story ids",
      successStories.map((s) => s.id),
    );
  });

  it("has no duplicate ids within each content type (id and slug must not silently diverge)", () => {
    expectNoDuplicates(
      "destination ids",
      destinations.map((d) => d.id),
    );
    expectNoDuplicates(
      "service ids",
      services.map((s) => s.id),
    );
    expectNoDuplicates(
      "insurance ids",
      insuranceServices.map((i) => i.id),
    );
    expectNoDuplicates(
      "resource article ids",
      resourceArticles.map((r) => r.id),
    );
    expectNoDuplicates(
      "event ids",
      events.map((e) => e.id),
    );
    expectNoDuplicates(
      "scholarship ids",
      scholarships.map((s) => s.id),
    );
  });
});

describe("content integrity — cross-references resolve", () => {
  const serviceSlugs = new Set(services.map((s) => s.slug));
  const resourceArticleSlugs = new Set(resourceArticles.map((r) => r.slug));
  const resourceCategoryIds = new Set(resourceCategories.map((c) => c.id));

  it("every Destination.relatedServices slug exists in services", () => {
    for (const destination of destinations) {
      for (const slug of destination.relatedServices) {
        expect(
          serviceSlugs.has(slug),
          `Destination "${destination.slug}" references missing service "${slug}"`,
        ).toBe(true);
      }
    }
  });

  it("every Service.relatedServiceSlugs entry exists, is not a duplicate, and is not self-referencing", () => {
    for (const service of services) {
      expectNoDuplicates(
        `Service "${service.slug}" relatedServiceSlugs`,
        service.relatedServiceSlugs,
      );
      for (const slug of service.relatedServiceSlugs) {
        expect(
          slug,
          `Service "${service.slug}" lists itself as a related service`,
        ).not.toBe(service.slug);
        expect(
          serviceSlugs.has(slug),
          `Service "${service.slug}" references missing service "${slug}"`,
        ).toBe(true);
      }
    }
  });

  it("every InsuranceService.relatedServiceSlugs entry exists in services", () => {
    for (const insurance of insuranceServices) {
      for (const slug of insurance.relatedServiceSlugs) {
        expect(
          serviceSlugs.has(slug),
          `InsuranceService "${insurance.slug}" references missing service "${slug}"`,
        ).toBe(true);
      }
    }
  });

  it("every ResourceArticle.categoryId exists in resourceCategories", () => {
    for (const article of resourceArticles) {
      expect(
        resourceCategoryIds.has(article.categoryId),
        `ResourceArticle "${article.slug}" references missing category "${article.categoryId}"`,
      ).toBe(true);
    }
  });

  it("every ResourceArticle.relatedArticleSlugs entry exists, is not a duplicate, and is not self-referencing", () => {
    for (const article of resourceArticles) {
      expectNoDuplicates(
        `ResourceArticle "${article.slug}" relatedArticleSlugs`,
        article.relatedArticleSlugs,
      );
      for (const slug of article.relatedArticleSlugs) {
        expect(
          slug,
          `ResourceArticle "${article.slug}" lists itself as a related article`,
        ).not.toBe(article.slug);
        expect(
          resourceArticleSlugs.has(slug),
          `ResourceArticle "${article.slug}" references missing article "${slug}"`,
        ).toBe(true);
      }
    }
  });

  it("every resource category is actually used by at least one article (no orphaned category)", () => {
    const usedCategoryIds = new Set(resourceArticles.map((a) => a.categoryId));
    for (const category of resourceCategories) {
      expect(
        usedCategoryIds.has(category.id),
        `ResourceCategory "${category.id}" has no articles`,
      ).toBe(true);
    }
  });
});

describe("content integrity — dates", () => {
  it("every set lastReviewed/lastUpdated date is a valid, real ISO date", () => {
    for (const d of destinations)
      expectValidIsoDateIfSet(
        `Destination "${d.slug}" lastReviewed`,
        d.lastReviewed,
      );
    for (const s of services)
      expectValidIsoDateIfSet(
        `Service "${s.slug}" lastReviewed`,
        s.lastReviewed,
      );
    for (const i of insuranceServices)
      expectValidIsoDateIfSet(
        `InsuranceService "${i.slug}" lastReviewed`,
        i.lastReviewed,
      );
    for (const r of resourceArticles)
      expectValidIsoDateIfSet(
        `ResourceArticle "${r.slug}" lastReviewed`,
        r.lastReviewed,
      );
    for (const s of scholarships)
      expectValidIsoDateIfSet(
        `Scholarship "${s.slug}" lastReviewed`,
        s.lastReviewed,
      );
    for (const l of legalPages)
      expectValidIsoDateIfSet(
        `LegalPage "${l.slug}" lastUpdated`,
        l.lastUpdated,
      );
  });

  it("every optional event/scholarship date, when set, is a valid ISO date (never invented if unset)", () => {
    for (const e of events) {
      expectValidIsoDateIfSet(`Event "${e.slug}" startAt`, e.startAt);
      expectValidIsoDateIfSet(`Event "${e.slug}" endAt`, e.endAt);
    }
    for (const s of scholarships) {
      expectValidIsoDateIfSet(
        `Scholarship "${s.slug}" openingDate`,
        s.openingDate,
      );
      expectValidIsoDateIfSet(`Scholarship "${s.slug}" deadline`, s.deadline);
    }
  });
});

describe("content integrity — images", () => {
  it("never sets an image without matching alt text", () => {
    for (const d of destinations) {
      if (d.image) {
        expect(
          d.imageAlt,
          `Destination "${d.slug}" has an image with no alt text`,
        ).toBeTruthy();
      }
    }
    for (const s of services) {
      if (s.image) {
        expect(
          s.imageAlt,
          `Service "${s.slug}" has an image with no alt text`,
        ).toBeTruthy();
      }
    }
    for (const story of successStories) {
      if (story.image) {
        expect(
          story.imageAlt,
          `SuccessStory "${story.id}" has an image with no alt text`,
        ).toBeTruthy();
      }
    }
  });
});

describe("content integrity — no leftover authoring placeholders", () => {
  it("contains no Lorem ipsum / TODO / FIXME markers anywhere in content strings", () => {
    const allStrings: string[] = [];
    for (const collection of [
      destinations,
      services,
      insuranceServices,
      resourceArticles,
      resourceCategories,
      events,
      scholarships,
      legalPages,
      teamMembers,
      successStories,
      faqCategories,
    ]) {
      collectStrings(collection, allStrings);
    }

    const offenders = allStrings.filter((str) =>
      PROHIBITED_PLACEHOLDER_MARKERS.some((marker) =>
        str.toLowerCase().includes(marker.toLowerCase()),
      ),
    );
    expect(
      offenders,
      `leftover placeholder text found: ${offenders.join(" | ")}`,
    ).toEqual([]);
  });
});

describe("content integrity — demo/template/draft labelling is internally consistent", () => {
  it("every scholarship is labelled isTemplate (no active scholarship is accidentally published)", () => {
    for (const scholarship of scholarships) {
      expect(
        scholarship.isTemplate,
        `Scholarship "${scholarship.slug}" is not labelled isTemplate`,
      ).toBe(true);
    }
  });

  it("every legal page is labelled isDraft (no page accidentally claims to be final)", () => {
    for (const page of legalPages) {
      expect(
        page.isDraft,
        `LegalPage "${page.slug}" is not labelled isDraft`,
      ).toBe(true);
    }
  });

  it("every success story is labelled isSampleContent (no fabricated testimonial passes as real)", () => {
    for (const story of successStories) {
      expect(
        story.isSampleContent,
        `SuccessStory "${story.id}" is not labelled isSampleContent`,
      ).toBe(true);
    }
  });
});
