import { test, expect } from "@playwright/test";

test("homepage loads with header and footer", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /Welcome to Asteron Global Consultancy/i,
    }),
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

test("primary consultation CTA is reachable from the header", async ({
  page,
}) => {
  await page.goto("/");

  const cta = page
    .getByRole("link", { name: "Book Free Consultation" })
    .first();
  await expect(cta).toHaveAttribute("href", "/book-consultation");
  await cta.click();
  await expect(page).toHaveURL(/\/book-consultation$/);
});

test("unknown routes render the custom 404 page", async ({ page }) => {
  const response = await page.goto("/this-route-does-not-exist");

  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { level: 1, name: "Page not found" }),
  ).toBeVisible();
});

test.describe("mobile viewport", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("mobile menu opens and exposes navigation and contact actions", async ({
    page,
  }) => {
    await page.goto("/");

    const menuButton = page.getByRole("button", { name: "Open menu" });
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    const nav = page.getByRole("navigation", { name: "Primary" }).last();
    await expect(nav.getByRole("link", { name: "About" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Book Free Consultation" }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Call" })).toBeVisible();
    await expect(page.getByRole("link", { name: "WhatsApp" })).toBeVisible();
  });
});
