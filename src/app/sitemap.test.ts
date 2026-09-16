import { describe, expect, it } from "vitest";

import sitemap from "./sitemap";

describe("sitemap", () => {
  it("includes the homepage and core static routes", async () => {
    const entries = await sitemap();
    const urls = entries.map((e) => e.url);

    expect(urls.some((u) => u.endsWith("/"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/about"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/services"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/insurance-quote"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/scholarships"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/events"))).toBe(true);
  });

  it("includes every destination, service, insurance, and resource detail route", async () => {
    const entries = await sitemap();
    const urls = entries.map((e) => e.url);

    expect(urls.some((u) => u.endsWith("/study-abroad/united-kingdom"))).toBe(
      true,
    );
    expect(
      urls.some((u) => u.endsWith("/services/study-abroad-counselling")),
    ).toBe(true);
    expect(
      urls.some((u) => u.endsWith("/insurance/student-health-insurance")),
    ).toBe(true);
    expect(
      urls.some((u) =>
        u.endsWith("/resources/how-to-choose-the-right-study-destination"),
      ),
    ).toBe(true);
  });

  it("excludes draft legal pages, template scholarship detail pages, and the sample event detail page", async () => {
    const entries = await sitemap();
    const urls = entries.map((e) => e.url);

    expect(urls.some((u) => u.includes("/legal/"))).toBe(false);
    expect(urls.some((u) => u.includes("/scholarships/template-"))).toBe(false);
    expect(
      urls.some((u) => u.includes("/events/study-abroad-planning-session")),
    ).toBe(false);
  });

  it("never fabricates a lastModified date for routes with no real review date", async () => {
    const entries = await sitemap();
    const home = entries.find(
      (e) => e.url.endsWith("/") && !e.url.includes("study-abroad"),
    );
    expect(home?.lastModified).toBeUndefined();
  });

  it("sets lastModified from the content's own lastReviewed date for detail routes", async () => {
    const entries = await sitemap();
    const uk = entries.find((e) =>
      e.url.endsWith("/study-abroad/united-kingdom"),
    );
    expect(uk?.lastModified).toBeTruthy();
  });

  it("produces no duplicate URLs", async () => {
    const entries = await sitemap();
    const urls = entries.map((e) => e.url);
    expect(new Set(urls).size).toBe(urls.length);
  });
});
