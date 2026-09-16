import { describe, expect, it } from "vitest";

import { getActiveNavGroupId } from "./navigation-active";

describe("getActiveNavGroupId", () => {
  it("activates no group on the homepage", () => {
    expect(getActiveNavGroupId("/")).toBeNull();
  });

  it("activates only Study Abroad for /study-abroad", () => {
    expect(getActiveNavGroupId("/study-abroad")).toBe("study-abroad");
  });

  it("activates only Study Abroad for undergraduate/postgraduate", () => {
    expect(getActiveNavGroupId("/study-abroad/undergraduate")).toBe(
      "study-abroad",
    );
    expect(getActiveNavGroupId("/study-abroad/postgraduate")).toBe(
      "study-abroad",
    );
  });

  it("activates only Destinations for a destination detail page, not Study Abroad", () => {
    const result = getActiveNavGroupId("/study-abroad/united-kingdom");
    expect(result).toBe("destinations");
    expect(result).not.toBe("study-abroad");
  });

  it("activates Study Abroad for universities, scholarships, and check-eligibility", () => {
    expect(getActiveNavGroupId("/universities")).toBe("study-abroad");
    expect(getActiveNavGroupId("/scholarships")).toBe("study-abroad");
    expect(getActiveNavGroupId("/check-eligibility")).toBe("study-abroad");
  });

  it("activates only Services for /services and any service detail page", () => {
    expect(getActiveNavGroupId("/services")).toBe("services");
    expect(getActiveNavGroupId("/services/visa-guidance")).toBe("services");
  });

  it("activates only Services for /insurance and any insurance detail page", () => {
    expect(getActiveNavGroupId("/insurance")).toBe("services");
    expect(getActiveNavGroupId("/insurance/travel-insurance")).toBe("services");
  });

  it("does not treat /insurance-quote as an /insurance/ subroute", () => {
    // A route that merely starts with the same string must not collide.
    expect(getActiveNavGroupId("/insurance-quote")).toBeNull();
  });

  it("activates Resources for resources, events, faq, and success-stories", () => {
    expect(getActiveNavGroupId("/resources")).toBe("resources");
    expect(
      getActiveNavGroupId(
        "/resources/how-to-choose-the-right-study-destination",
      ),
    ).toBe("resources");
    expect(getActiveNavGroupId("/events")).toBe("resources");
    expect(getActiveNavGroupId("/faq")).toBe("resources");
    expect(getActiveNavGroupId("/success-stories")).toBe("resources");
  });

  it("activates only About for /about and /team", () => {
    expect(getActiveNavGroupId("/about")).toBe("about");
    expect(getActiveNavGroupId("/team")).toBe("about");
  });

  it("activates only Contact for /contact", () => {
    expect(getActiveNavGroupId("/contact")).toBe("contact");
  });

  it("never returns more than one group for any single route (mutual exclusivity)", () => {
    const routes = [
      "/",
      "/study-abroad",
      "/study-abroad/undergraduate",
      "/study-abroad/united-kingdom",
      "/universities",
      "/scholarships",
      "/check-eligibility",
      "/services",
      "/services/visa-guidance",
      "/insurance",
      "/insurance/travel-insurance",
      "/insurance-quote",
      "/resources",
      "/events",
      "/faq",
      "/success-stories",
      "/about",
      "/team",
      "/contact",
      "/book-consultation",
    ];
    for (const route of routes) {
      const result = getActiveNavGroupId(route);
      // A function returning a single value can never violate mutual
      // exclusivity by construction, but assert the return type stays a
      // single id (or null) — this test exists to make that guarantee
      // explicit and to fail loudly if the function is ever changed to
      // return an array/set.
      expect(typeof result === "string" || result === null).toBe(true);
    }
  });
});
