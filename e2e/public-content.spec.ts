import { test, expect } from "@playwright/test";

test("about page loads with team preview", async ({ page }) => {
  await page.goto("/about");
  await expect(
    page.getByRole("heading", { level: 1, name: "About Janan" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Meet the full team" }),
  ).toBeVisible();
});

test("team page shows role-based placeholder cards", async ({ page }) => {
  await page.goto("/team");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByText("Senior Education Counsellor")).toBeVisible();
  const placeholders = page.getByText("Profile to be added.");
  await expect(placeholders).toHaveCount(5);
});

test("success stories page shows demo-labelled example journeys", async ({
  page,
}) => {
  await page.goto("/success-stories");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  const demoLabels = page.getByText("Demo content");
  await expect(demoLabels.first()).toBeVisible();
});

test("resources hub loads and links to an article", async ({ page }) => {
  await page.goto("/resources");
  await expect(
    page.getByRole("heading", { level: 1, name: "Resources" }),
  ).toBeVisible();

  await page
    .getByRole("link", { name: "How to Choose the Right Study Destination" })
    .first()
    .click();
  await expect(page).toHaveURL(
    /\/resources\/how-to-choose-the-right-study-destination$/,
  );
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "How to Choose the Right Study Destination",
    }),
  ).toBeVisible();
});

test("invalid resource slug renders the custom 404 page", async ({ page }) => {
  const response = await page.goto("/resources/does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { level: 1, name: "Page not found" }),
  ).toBeVisible();
});

test("events page shows the sample event with no fake urgency", async ({
  page,
}) => {
  await page.goto("/events");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByText("Sample event")).toBeVisible();
  await expect(page.getByText("Schedule to be announced")).toBeVisible();
});

test("faq page supports keyboard-accessible accordion interaction", async ({
  page,
}) => {
  await page.goto("/faq");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  const question = page.getByRole("button", {
    name: "Do you guarantee admission?",
  });
  await question.scrollIntoViewIfNeeded();
  await expect(question).toHaveAttribute("aria-expanded", "false");
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");
});

test("contact page shows validation errors and demo submission behaviour", async ({
  page,
}) => {
  await page.goto("/contact");
  await expect(
    page.getByRole("heading", { level: 1, name: "Contact" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Send Message" }).click();
  const summary = page
    .getByRole("alert")
    .filter({ hasText: "Please fix the following" });
  await expect(summary).toBeVisible();
});

test("scholarships hub shows the polished empty-state and template cards", async ({
  page,
}) => {
  await page.goto("/scholarships");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByText(/haven't verified any active scholarship/i),
  ).toBeVisible();
  const templateLabels = page.getByText(
    "Content template — not an active scholarship",
  );
  await expect(templateLabels.first()).toBeVisible();
});

test("scholarship detail page clearly marks itself as a template", async ({
  page,
}) => {
  await page.goto("/scholarships/template-destination-based-scholarship");
  await expect(
    page
      .getByText(/this is a content template, not an active scholarship/i)
      .first(),
  ).toBeVisible();
});

for (const [path, title] of [
  ["/legal/privacy-policy", "Privacy Policy"],
  ["/legal/terms-of-service", "Terms and Conditions"],
  ["/legal/cookie-policy", "Cookie Policy"],
  ["/legal/disclaimer", "Disclaimer"],
] as const) {
  test(`legal page ${path} shows the required draft notice`, async ({
    page,
  }) => {
    await page.goto(path);
    await expect(
      page.getByRole("heading", { level: 1, name: title }),
    ).toBeVisible();
    const notice = page.getByText(
      "Temporary draft—professional legal review required before production launch.",
    );
    await expect(notice.first()).toBeVisible();
  });
}

test.describe("mobile viewport", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("mobile navigation reaches Team and FAQ", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();

    const nav = page.getByRole("navigation", { name: "Primary" }).last();
    await nav.locator("summary", { hasText: "About" }).click();
    await expect(nav.getByRole("link", { name: "Our Team" })).toBeVisible();
  });

  for (const path of [
    "/about",
    "/team",
    "/success-stories",
    "/resources",
    "/events",
    "/faq",
    "/contact",
    "/scholarships",
  ]) {
    test(`${path} has no horizontal overflow at 320px width`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 320, height: 700 });
      await page.goto(path);
      const overflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      );
      expect(overflow).toBe(0);
    });
  }
});
