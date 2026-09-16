import { describe, expect, it } from "vitest";

import { insuranceQuoteSchema } from "./insuranceQuote";

/** YYYY-MM-DD `daysFromNow` days from today, in local time — keeps date-range tests valid regardless of when they run. */
function isoDateDaysFromNow(daysFromNow: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

const futureStartDate = isoDateDaysFromNow(30);
const futureEndDate = isoDateDaysFromNow(200);

const validPayload = {
  fullName: "Jordan Smith",
  email: "jordan@example.com",
  phone: "+92 300 1234567",
  whatsapp: "",
  insuranceType: "student-health" as const,
  destination: "United Kingdom",
  startDate: futureStartDate,
  endDate: futureEndDate,
  dateOfBirth: "2003-05-14",
  numberOfTravellers: 1,
  studentStatus: "yes" as const,
  additionalRequirements: "",
  consent: true,
};

describe("insuranceQuoteSchema", () => {
  it("accepts a fully valid payload", () => {
    const result = insuranceQuoteSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it("rejects a missing full name", () => {
    const result = insuranceQuoteSchema.safeParse({
      ...validPayload,
      fullName: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = insuranceQuoteSchema.safeParse({
      ...validPayload,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a phone number with letters", () => {
    const result = insuranceQuoteSchema.safeParse({
      ...validPayload,
      phone: "call-me-maybe",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an end date before the start date", () => {
    const result = insuranceQuoteSchema.safeParse({
      ...validPayload,
      startDate: futureStartDate,
      endDate: isoDateDaysFromNow(10),
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const endDateIssue = result.error.issues.find((issue) =>
        issue.path.includes("endDate"),
      );
      expect(endDateIssue).toBeDefined();
    }
  });

  it("accepts an end date equal to the start date", () => {
    const result = insuranceQuoteSchema.safeParse({
      ...validPayload,
      startDate: futureStartDate,
      endDate: futureStartDate,
    });
    expect(result.success).toBe(true);
  });

  it("rejects a date of birth in the future", () => {
    const futureYear = new Date().getFullYear() + 1;
    const result = insuranceQuoteSchema.safeParse({
      ...validPayload,
      dateOfBirth: `${futureYear}-01-01`,
    });
    expect(result.success).toBe(false);
  });

  it("rejects an unreasonably old date of birth", () => {
    const result = insuranceQuoteSchema.safeParse({
      ...validPayload,
      dateOfBirth: "1800-01-01",
    });
    expect(result.success).toBe(false);
  });

  it("rejects zero travellers", () => {
    const result = insuranceQuoteSchema.safeParse({
      ...validPayload,
      numberOfTravellers: 0,
    });
    expect(result.success).toBe(false);
  });

  it("rejects more than ten travellers", () => {
    const result = insuranceQuoteSchema.safeParse({
      ...validPayload,
      numberOfTravellers: 11,
    });
    expect(result.success).toBe(false);
  });

  it("rejects a non-integer traveller count", () => {
    const result = insuranceQuoteSchema.safeParse({
      ...validPayload,
      numberOfTravellers: 1.5,
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid insurance type", () => {
    const result = insuranceQuoteSchema.safeParse({
      ...validPayload,
      insuranceType: "dental",
    });
    expect(result.success).toBe(false);
  });

  it("requires consent to be true", () => {
    const result = insuranceQuoteSchema.safeParse({
      ...validPayload,
      consent: false,
    });
    expect(result.success).toBe(false);
  });

  it("allows an empty optional whatsapp/studentStatus/additionalRequirements", () => {
    const result = insuranceQuoteSchema.safeParse({
      ...validPayload,
      whatsapp: "",
      studentStatus: "",
      additionalRequirements: "",
    });
    expect(result.success).toBe(true);
  });

  it("rejects additional requirements over 1000 characters", () => {
    const result = insuranceQuoteSchema.safeParse({
      ...validPayload,
      additionalRequirements: "a".repeat(1001),
    });
    expect(result.success).toBe(false);
  });

  it("rejects a coverage start date in the past", () => {
    const result = insuranceQuoteSchema.safeParse({
      ...validPayload,
      startDate: "2000-01-01",
      endDate: futureEndDate,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const startDateIssue = result.error.issues.find((issue) =>
        issue.path.includes("startDate"),
      );
      expect(startDateIssue).toBeDefined();
    }
  });

  it("accepts today as the coverage start date", () => {
    const result = insuranceQuoteSchema.safeParse({
      ...validPayload,
      startDate: isoDateDaysFromNow(0),
      endDate: futureEndDate,
    });
    expect(result.success).toBe(true);
  });

  it("accepts the not-sure insurance type", () => {
    const result = insuranceQuoteSchema.safeParse({
      ...validPayload,
      insuranceType: "not-sure",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a whitespace-only full name", () => {
    const result = insuranceQuoteSchema.safeParse({
      ...validPayload,
      fullName: "   ",
    });
    expect(result.success).toBe(false);
  });
});
