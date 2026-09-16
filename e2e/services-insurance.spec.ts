import { test, expect } from "@playwright/test";

const SERVICE_SLUGS = [
  "study-abroad-counselling",
  "university-course-selection",
  "application-assistance",
  "visa-guidance",
  "scholarship-guidance",
  "accommodation-support",
  "pre-departure-guidance",
];

const INSURANCE_SLUGS = [
  "student-health-insurance",
  "travel-insurance",
  "visitor-insurance",
];

test("services hub loads with hero and category links", async ({ page }) => {
  await page.goto("/services");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Practical support for every stage of your international journey.",
    }),
  ).toBeVisible();
  await expect(page.getByRole("banner")).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();
});

for (const slug of SERVICE_SLUGS) {
  test(`service route /services/${slug} loads`, async ({ page }) => {
    const response = await page.goto(`/services/${slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
}

test("invalid service slug renders the custom 404 page", async ({ page }) => {
  const response = await page.goto("/services/does-not-exist");

  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { level: 1, name: "Page not found" }),
  ).toBeVisible();
});

test("service FAQ accordion can be expanded", async ({ page }) => {
  await page.goto("/services/visa-guidance");

  const question = page.getByRole("button", {
    name: "Can you guarantee my visa will be approved?",
  });
  await question.scrollIntoViewIfNeeded();
  await expect(question).toHaveAttribute("aria-expanded", "false");

  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");
});

test("insurance hub loads with hero and disclosure", async ({ page }) => {
  await page.goto("/insurance");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Understand your insurance options before you travel.",
    }),
  ).toBeVisible();

  const disclosure = page.getByText(
    /Insurance coverage, premiums, eligibility, exclusions/,
  );
  await disclosure.scrollIntoViewIfNeeded();
  await expect(disclosure).toBeVisible();
});

for (const slug of INSURANCE_SLUGS) {
  test(`insurance route /insurance/${slug} loads`, async ({ page }) => {
    const response = await page.goto(`/insurance/${slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
}

test("invalid insurance slug renders the custom 404 page", async ({ page }) => {
  const response = await page.goto("/insurance/dental-insurance");

  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { level: 1, name: "Page not found" }),
  ).toBeVisible();
});

test("insurance quote form shows validation errors on empty submit", async ({
  page,
}) => {
  await page.goto("/insurance-quote");

  await page.getByRole("button", { name: "Request Quote" }).click();

  const summary = page
    .getByRole("alert")
    .filter({ hasText: "Please fix the following" });
  await expect(summary).toBeVisible();
  await expect(summary.getByText("Enter your full name.")).toBeVisible();
});

/** YYYY-MM-DD `daysFromNow` days from today, in local time. */
function isoDateDaysFromNow(daysFromNow: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

test("insurance quote form rejects a coverage start date in the past", async ({
  page,
}) => {
  await page.goto("/insurance-quote");

  await page.getByLabel(/Full name/).fill("Jordan Smith");
  await page.getByLabel(/^Email/).fill("jordan@example.com");
  await page.getByLabel(/Phone number/).fill("+92 300 1234567");
  await page.getByLabel(/Destination/).fill("United Kingdom");
  await page.getByLabel(/Travel or coverage start date/).fill("2000-01-01");
  await page
    .getByLabel(/End date or expected duration/)
    .fill(isoDateDaysFromNow(200));
  await page.getByLabel(/Date of birth/).fill("2003-05-14");
  await page.getByLabel(/Number of travellers/).fill("1");
  await page.getByRole("checkbox").click();

  await page.getByRole("button", { name: "Request Quote" }).click();

  await expect(
    page.getByText("Coverage start date cannot be in the past.").first(),
  ).toBeVisible();
});

test("insurance quote form shows the not-connected message on a valid submission", async ({
  page,
}) => {
  await page.goto("/insurance-quote");

  await page.getByLabel(/Full name/).fill("Jordan Smith");
  await page.getByLabel(/^Email/).fill("jordan@example.com");
  await page.getByLabel(/Phone number/).fill("+92 300 1234567");
  await page.getByLabel(/Destination/).fill("United Kingdom");
  await page
    .getByLabel(/Travel or coverage start date/)
    .fill(isoDateDaysFromNow(30));
  await page
    .getByLabel(/End date or expected duration/)
    .fill(isoDateDaysFromNow(200));
  await page.getByLabel(/Date of birth/).fill("2003-05-14");
  await page.getByLabel(/Number of travellers/).fill("1");
  await page.getByRole("checkbox").click();

  await page.getByRole("button", { name: "Request Quote" }).click();

  await expect(
    page.getByText(
      "Online submission is not connected yet. Your information has not been sent or stored. Please contact Asteron by phone, email or WhatsApp.",
    ),
  ).toBeVisible();
  await expect(page.getByText(/successfully submitted/i)).toHaveCount(0);
});

test.describe("mobile viewport", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("mobile services navigation is reachable via the menu", async ({
    page,
  }) => {
    await page.goto("/");

    const menuButton = page.getByRole("button", { name: "Open menu" });
    await menuButton.click();

    const nav = page.getByRole("navigation", { name: "Primary" }).last();
    await nav.locator("summary", { hasText: "Services" }).click();
    await expect(nav.getByRole("link", { name: "All Services" })).toBeVisible();
    await expect(
      nav.getByRole("link", { name: "Visa Guidance" }),
    ).toBeVisible();
  });

  test("services hub has no horizontal overflow at 320px width", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto("/services");

    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow).toBe(0);
  });

  test("insurance quote page has no horizontal overflow at 320px width", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto("/insurance-quote");

    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow).toBe(0);
  });
});
