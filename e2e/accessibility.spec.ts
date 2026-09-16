import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";

/**
 * Automated WCAG 2.2 AA sweep (Phase 8 production-readiness audit) across
 * one representative page per route family — every static page, one
 * example of each dynamic template, and all four forms (checked once
 * clean, once with validation errors showing, since error states add new
 * markup that could introduce its own violations). This does not replace
 * manual keyboard/screen-reader verification — see docs/DEPLOYMENT.md
 * "Accessibility" for the manual checklist this automated sweep cannot
 * cover (focus order, screen-reader announcement quality, zoom/reflow).
 */
const REPRESENTATIVE_PAGES = [
  "/",
  "/about",
  "/team",
  "/study-abroad",
  "/study-abroad/united-kingdom",
  "/services",
  "/services/visa-guidance",
  "/insurance",
  "/insurance/student-health-insurance",
  "/resources",
  "/resources/how-to-choose-the-right-study-destination",
  "/faq",
  "/contact",
];

for (const path of REPRESENTATIVE_PAGES) {
  test(`${path} has no automatically detectable WCAG 2.2 AA violations`, async ({
    page,
  }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
      .analyze();

    expect(
      results.violations,
      JSON.stringify(results.violations, null, 2),
    ).toEqual([]);
  });
}

test.describe("forms — accessibility with validation errors visible", () => {
  const FORMS: { path: string; submitButtonName: string }[] = [
    { path: "/book-consultation", submitButtonName: "Request Consultation" },
    { path: "/check-eligibility", submitButtonName: "Check Eligibility" },
    { path: "/insurance-quote", submitButtonName: "Request Quote" },
    { path: "/contact", submitButtonName: "Send Message" },
  ];

  for (const { path, submitButtonName } of FORMS) {
    test(`${path} has no violations once validation errors are shown`, async ({
      page,
    }) => {
      await page.goto(path);
      await page.getByRole("button", { name: submitButtonName }).click();
      await expect(page.getByRole("alert").first()).toBeVisible();

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
        .analyze();

      expect(
        results.violations,
        JSON.stringify(results.violations, null, 2),
      ).toEqual([]);
    });
  }
});
