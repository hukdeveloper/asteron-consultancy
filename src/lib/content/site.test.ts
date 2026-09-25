import { describe, expect, it } from "vitest";

import { getSiteContent } from "./site";

describe("getSiteContent", () => {
  it("resolves the site's name, tagline, and description", async () => {
    const site = await getSiteContent();

    expect(site.name).toBe("Janan Consultancy");
    expect(site.tagline).toBe("Guidance Beyond Borders");
    expect(site.description.length).toBeGreaterThan(0);
  });
});
