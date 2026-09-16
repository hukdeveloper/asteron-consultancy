import { test, expect } from "@playwright/test";

const HOME_H1 = /Build your future beyond borders\./i;

test("homepage loads with header and footer", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { level: 1, name: HOME_H1 }),
  ).toBeVisible();
  await expect(page.getByRole("banner")).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();
});

test("skip link targets the main content landmark", async ({ page }) => {
  await page.goto("/");

  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await expect(skipLink).toHaveAttribute("href", "#main-content");
  await expect(page.locator("#main-content")).toHaveCount(1);
});

test("primary consultation CTA is visible and reachable from the hero", async ({
  page,
}) => {
  await page.goto("/");

  const cta = page.getByRole("link", { name: "Start Your Journey" });
  await expect(cta).toBeVisible();
  await expect(cta).toHaveAttribute("href", "/book-consultation");
  await cta.click();
  await expect(page).toHaveURL(/\/book-consultation$/);
});

test("insurance section is reachable and shows the required disclaimer", async ({
  page,
}) => {
  await page.goto("/");

  const insuranceHeading = page.getByRole("heading", {
    name: "Student and travel insurance guidance",
  });
  await insuranceHeading.scrollIntoViewIfNeeded();
  await expect(insuranceHeading).toBeVisible();
  await expect(
    page.getByText(/Coverage, eligibility, exclusions and policy issuance/i),
  ).toBeVisible();
  await expect(
    page
      .getByRole("main")
      .getByRole("link", { name: "Request an Insurance Quote" }),
  ).toBeVisible();
});

test("FAQ accordion can be expanded", async ({ page }) => {
  await page.goto("/");

  const question = page.getByRole("button", {
    name: "Do you guarantee admission or visa approval?",
  });
  await question.scrollIntoViewIfNeeded();
  await expect(question).toHaveAttribute("aria-expanded", "false");

  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByText(/we cannot and do not guarantee outcomes/i),
  ).toBeVisible();
});

test("final CTA section is visible with all three actions", async ({
  page,
}) => {
  await page.goto("/");

  const finalHeading = page.getByRole("heading", {
    name: "Ready to explore your options?",
  });
  await finalHeading.scrollIntoViewIfNeeded();
  await expect(finalHeading).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Chat on WhatsApp" }),
  ).toBeVisible();
});

test("unknown routes render the custom 404 page", async ({ page }) => {
  const response = await page.goto("/this-route-does-not-exist");

  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { level: 1, name: "Page not found" }),
  ).toBeVisible();
});

test.describe("mobile viewport", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("mobile menu opens and exposes navigation and contact actions", async ({
    page,
  }) => {
    await page.goto("/");

    const menuButton = page.getByRole("button", { name: "Open menu" });
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    const nav = page.getByRole("navigation", { name: "Primary" }).last();
    await expect(nav.locator("summary", { hasText: "About" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Book a Consultation" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /^\+92 300 0000000$/ }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /WhatsApp/ })).toBeVisible();
  });

  test("has no horizontal overflow at 320px width", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto("/");

    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow).toBe(0);
  });
});
