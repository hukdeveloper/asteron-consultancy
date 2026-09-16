import { test, expect } from "@playwright/test";

/**
 * Proves the header's active-navigation defect is fixed (Phase 10B — see
 * docs/DECISIONS.md "Visual Language Reset"): exactly one top-level nav
 * item (or none, on a route with no owning group) is ever marked
 * `aria-current="page"` — never two at once, which is what the rejected
 * design did on every destination page (Study Abroad and Destinations lit
 * up together, since both used the same `/study-abroad` href prefix).
 */
const CASES: { path: string; expectedActive: string | null }[] = [
  { path: "/", expectedActive: null },
  { path: "/study-abroad", expectedActive: "Study Abroad" },
  { path: "/study-abroad/united-kingdom", expectedActive: "Destinations" },
  { path: "/services", expectedActive: "Services" },
  { path: "/insurance", expectedActive: "Services" },
  { path: "/resources", expectedActive: "Resources" },
  { path: "/about", expectedActive: "About" },
];

test.use({ viewport: { width: 1920, height: 1080 } });

for (const { path, expectedActive } of CASES) {
  test(`${path} marks exactly the correct nav group active`, async ({
    page,
  }) => {
    await page.goto(path);

    const nav = page.getByRole("navigation", { name: "Primary" }).first();
    const currentItems = nav.locator('[aria-current="page"]');
    const count = await currentItems.count();

    if (expectedActive === null) {
      expect(count).toBe(0);
      return;
    }

    expect(count).toBe(1);
    await expect(currentItems.first()).toHaveText(expectedActive);
  });
}
