import { test, expect } from "@playwright/test";

/** YYYY-MM-DD `daysFromNow` days from today, in local time. */
function isoDateDaysFromNow(daysFromNow: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

const NOT_CONNECTED_MESSAGE =
  "Online submission is not connected yet. Your information has not been sent or stored. Please contact Janan by phone, email or WhatsApp.";

test.describe("consultation form", () => {
  test("shows validation errors on empty submit", async ({ page }) => {
    await page.goto("/book-consultation");
    await expect(
      page.getByRole("heading", { level: 1, name: "Book a Free Consultation" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Request Consultation" }).click();

    const summary = page
      .getByRole("alert")
      .filter({ hasText: "Please fix the following" });
    await expect(summary).toBeVisible();
    await expect(summary.getByText("Enter your full name.")).toBeVisible();
  });

  test("shows the preference-only notice and the not-connected message on a valid submission", async ({
    page,
  }) => {
    await page.goto("/book-consultation");

    await expect(
      page.getByText(/Your selected date and time are preferences/),
    ).toBeVisible();

    await page.getByLabel(/Full name/).fill("Jordan Smith");
    await page.getByLabel(/^Email/).fill("jordan@example.com");
    await page.getByLabel(/Phone number/).fill("+92 300 1234567");
    await page
      .getByLabel(/Current or most recent qualification/)
      .fill("BSc Computer Science");
    await page.getByLabel(/Preferred date/).fill(isoDateDaysFromNow(14));
    await page.getByRole("checkbox").click();

    await page.getByRole("button", { name: "Request Consultation" }).click();

    await expect(page.getByText(NOT_CONNECTED_MESSAGE)).toBeVisible();
    await expect(page.getByText(/confirmed/i)).toHaveCount(0);
  });

  test("has no horizontal overflow at 320px width", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto("/book-consultation");

    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow).toBe(0);
  });
});

test.describe("eligibility form", () => {
  test("shows the non-eligibility-determination notice", async ({ page }) => {
    await page.goto("/check-eligibility");
    await expect(
      page.getByText(
        /This initial form does not determine admission, scholarship or visa eligibility/,
      ),
    ).toBeVisible();
  });

  test("shows validation errors on empty submit, including at least one destination", async ({
    page,
  }) => {
    await page.goto("/check-eligibility");

    await page.getByRole("button", { name: "Check Eligibility" }).click();

    const summary = page
      .getByRole("alert")
      .filter({ hasText: "Please fix the following" });
    await expect(summary).toBeVisible();
    await expect(summary.getByText("Enter your full name.")).toBeVisible();
    await expect(
      summary.getByText("Select at least one destination."),
    ).toBeVisible();
  });

  test("reveals English-test fields only once a test is indicated", async ({
    page,
  }) => {
    await page.goto("/check-eligibility");

    await expect(page.getByLabel(/Test type/)).toHaveCount(0);
    await page
      .getByRole("checkbox", { name: /I have taken an English language test/ })
      .click();
    await expect(page.getByLabel(/Test type/)).toBeVisible();
    await expect(page.getByLabel(/Overall score/)).toBeVisible();
  });

  test("reveals study-gap details only once a gap is indicated", async ({
    page,
  }) => {
    await page.goto("/check-eligibility");

    await expect(
      page.getByLabel(/Briefly describe your study gap/),
    ).toHaveCount(0);
    await page
      .getByRole("checkbox", { name: /I have a gap in my study history/ })
      .click();
    await expect(
      page.getByLabel(/Briefly describe your study gap/),
    ).toBeVisible();
  });

  test("shows the not-connected message on a valid submission, never an eligibility result", async ({
    page,
  }) => {
    await page.goto("/check-eligibility");

    await page.getByLabel(/Full name/).fill("Jordan Smith");
    await page.getByLabel(/^Email/).fill("jordan@example.com");
    await page.getByLabel(/Phone or WhatsApp/).fill("+92 300 1234567");
    await page.getByLabel(/Country of residence/).fill("Pakistan");
    await page.getByLabel(/Nationality/).fill("Pakistani");
    await page.getByLabel(/Highest qualification/).fill("BSc Computer Science");
    await page.getByLabel(/Institution/).fill("Example University");
    await page.getByLabel(/Graduation year/).fill("2024");
    await page.getByLabel(/Grade, CGPA or percentage/).fill("78%");
    await page.getByLabel("United Kingdom").click();
    await page.getByLabel(/Intended subject area/).fill("Data Science");
    await page.getByRole("checkbox", { name: /I understand/ }).click();

    await page.getByRole("button", { name: "Check Eligibility" }).click();

    await expect(page.getByText(NOT_CONNECTED_MESSAGE)).toBeVisible();
    await expect(page.getByText(/you are eligible/i)).toHaveCount(0);
  });

  test("has no horizontal overflow at 320px width", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto("/check-eligibility");

    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow).toBe(0);
  });
});
