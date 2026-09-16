import { test, expect } from "@playwright/test";

/**
 * Responsive visual QA matrix (Phase 8 production-readiness audit): 6
 * representative viewport widths (small mobile through desktop) across 13
 * representative pages — one per route family, covering every page
 * template in the site plus all four forms. Checks are structural
 * (no horizontal overflow, exactly one H1, page renders successfully)
 * rather than pixel-diff visual regression, which this project does not
 * have a baseline-image workflow for. See docs/DEPLOYMENT.md "Responsive
 * QA" for the manual visual spot-check this automated sweep complements.
 */
const VIEWPORTS = [
  { name: "small-mobile", width: 320, height: 700 },
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "small-laptop", width: 1024, height: 768 },
  { name: "laptop", width: 1280, height: 800 },
  { name: "desktop", width: 1920, height: 1080 },
];

const REPRESENTATIVE_PAGES = [
  "/",
  "/about",
  "/study-abroad",
  "/study-abroad/united-kingdom",
  "/services",
  "/services/visa-guidance",
  "/insurance",
  "/resources",
  "/faq",
  "/contact",
  "/book-consultation",
  "/check-eligibility",
  "/insurance-quote",
];

for (const viewport of VIEWPORTS) {
  test.describe(`${viewport.name} (${viewport.width}x${viewport.height})`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const path of REPRESENTATIVE_PAGES) {
      test(`${path} has no horizontal overflow and exactly one H1`, async ({
        page,
      }) => {
        const response = await page.goto(path);
        expect(response?.status()).toBe(200);

        const overflow = await page.evaluate(
          () =>
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth,
        );
        expect(
          overflow,
          `${path} overflows horizontally at ${viewport.width}px`,
        ).toBe(0);

        await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      });
    }
  });
}
