import { test, expect } from "@playwright/test";

const DESTINATION_SLUGS = [
  "united-kingdom",
  "australia",
  "canada",
  "united-states",
  "germany",
  "ireland",
];

test("study abroad hub loads with hero and destination links", async ({
  page,
}) => {
  await page.goto("/study-abroad");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /Find the study destination that fits your goals/i,
    }),
  ).toBeVisible();
  await expect(page.getByRole("banner")).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();

  const main = page.getByRole("main");
  for (const label of ["United Kingdom", "Australia", "Canada"]) {
    await expect(main.getByRole("link", { name: label }).first()).toBeVisible();
  }
});

test("destination navigation from the hub reaches a real destination page", async ({
  page,
}) => {
  await page.goto("/study-abroad");

  await page
    .getByRole("main")
    .getByRole("link", { name: "United Kingdom" })
    .first()
    .click();
  await expect(page).toHaveURL(/\/study-abroad\/united-kingdom$/);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /Study in the United Kingdom/i,
    }),
  ).toBeVisible();
});

for (const slug of DESTINATION_SLUGS) {
  test(`destination route /study-abroad/${slug} loads`, async ({ page }) => {
    const response = await page.goto(`/study-abroad/${slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
}

test("United Kingdom destination page shows the expected template sections", async ({
  page,
}) => {
  await page.goto("/study-abroad/united-kingdom");

  for (const heading of [
    /Why consider United Kingdom/i,
    /Study levels and popular subject areas/i,
    /A general application process/i,
    /Intakes and cost planning/i,
    /Scholarship and visa-document guidance/i,
    /Work, lifestyle and planning notes/i,
    /Frequently asked questions/i,
  ]) {
    const section = page.getByRole("heading", { name: heading });
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
  }

  await expect(page.getByText(/last reviewed on/i)).toBeVisible();
});

test("invalid destination slug renders the custom 404 page", async ({
  page,
}) => {
  const response = await page.goto("/study-abroad/atlantis");

  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { level: 1, name: "Page not found" }),
  ).toBeVisible();
});

test("undergraduate study-level page loads", async ({ page }) => {
  await page.goto("/study-abroad/undergraduate");
  await expect(
    page.getByRole("heading", { level: 1, name: "Undergraduate Study Abroad" }),
  ).toBeVisible();
});

test("postgraduate study-level page loads", async ({ page }) => {
  await page.goto("/study-abroad/postgraduate");
  await expect(
    page.getByRole("heading", { level: 1, name: "Postgraduate Study Abroad" }),
  ).toBeVisible();
});

test("destination FAQ accordion can be expanded", async ({ page }) => {
  await page.goto("/study-abroad/united-kingdom");

  const question = page.getByRole("button", {
    name: "Do I need to prove English proficiency to study in the UK?",
  });
  await question.scrollIntoViewIfNeeded();
  await expect(question).toHaveAttribute("aria-expanded", "false");

  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");
});

test("consultation CTA is visible and accessible on a destination page", async ({
  page,
}) => {
  await page.goto("/study-abroad/united-kingdom");

  const cta = page.getByRole("link", { name: "Book a Consultation" }).first();
  await expect(cta).toBeVisible();
  await cta.focus();
  await expect(cta).toBeFocused();
  await expect(cta).toHaveAttribute("href", "/book-consultation");
});

test.describe("mobile viewport", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("study abroad hub has no horizontal overflow at 320px width", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto("/study-abroad");

    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow).toBe(0);
  });

  test("destination page has no horizontal overflow at 320px width", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto("/study-abroad/germany");

    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow).toBe(0);
  });
});
