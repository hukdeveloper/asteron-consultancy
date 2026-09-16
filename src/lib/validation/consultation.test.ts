import { describe, expect, it } from "vitest";

import { consultationSchema } from "./consultation";

/** YYYY-MM-DD `daysFromNow` days from today, in local time — keeps date tests valid regardless of when they run. */
function isoDateDaysFromNow(daysFromNow: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

const validPayload = {
  fullName: "Jordan Smith",
  email: "jordan@example.com",
  phone: "+92 300 1234567",
  whatsapp: "",
  currentQualification: "BSc Computer Science",
  preferredDestination: "Canada",
  intendedStudyLevel: "postgraduate" as const,
  areaOfInterest: "Data Science",
  preferredDate: isoDateDaysFromNow(14),
  preferredTimePeriod: "morning" as const,
  meetingMethod: "video-consultation" as const,
  message: "",
  consent: true,
};

describe("consultationSchema", () => {
  it("accepts a fully valid payload", () => {
    expect(consultationSchema.safeParse(validPayload).success).toBe(true);
  });

  it("rejects a missing full name", () => {
    expect(
      consultationSchema.safeParse({ ...validPayload, fullName: "" }).success,
    ).toBe(false);
  });

  it("rejects a whitespace-only full name", () => {
    expect(
      consultationSchema.safeParse({ ...validPayload, fullName: "   " })
        .success,
    ).toBe(false);
  });

  it("rejects an invalid email", () => {
    expect(
      consultationSchema.safeParse({ ...validPayload, email: "nope" }).success,
    ).toBe(false);
  });

  it("accepts international phone formats with +, spaces, hyphens and parentheses", () => {
    expect(
      consultationSchema.safeParse({
        ...validPayload,
        phone: "+1 (555) 123-4567",
      }).success,
    ).toBe(true);
  });

  it("rejects a phone number with letters", () => {
    expect(
      consultationSchema.safeParse({ ...validPayload, phone: "call-me" })
        .success,
    ).toBe(false);
  });

  it("allows an empty optional whatsapp/preferredDestination/areaOfInterest/message", () => {
    expect(
      consultationSchema.safeParse({
        ...validPayload,
        whatsapp: "",
        preferredDestination: "",
        areaOfInterest: "",
        message: "",
      }).success,
    ).toBe(true);
  });

  it("rejects a preferred date in the past", () => {
    const result = consultationSchema.safeParse({
      ...validPayload,
      preferredDate: "2000-01-01",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((issue) =>
          issue.path.includes("preferredDate"),
        ),
      ).toBe(true);
    }
  });

  it("accepts today as the preferred date", () => {
    expect(
      consultationSchema.safeParse({
        ...validPayload,
        preferredDate: isoDateDaysFromNow(0),
      }).success,
    ).toBe(true);
  });

  it("rejects an invalid preferred date", () => {
    expect(
      consultationSchema.safeParse({
        ...validPayload,
        preferredDate: "not-a-date",
      }).success,
    ).toBe(false);
  });

  it("rejects an invalid intended study level", () => {
    expect(
      consultationSchema.safeParse({
        ...validPayload,
        intendedStudyLevel: "phd",
      }).success,
    ).toBe(false);
  });

  it("rejects an invalid meeting method", () => {
    expect(
      consultationSchema.safeParse({
        ...validPayload,
        meetingMethod: "carrier-pigeon",
      }).success,
    ).toBe(false);
  });

  it("requires consent to be true", () => {
    expect(
      consultationSchema.safeParse({ ...validPayload, consent: false }).success,
    ).toBe(false);
  });

  it("rejects a message over 2000 characters", () => {
    expect(
      consultationSchema.safeParse({
        ...validPayload,
        message: "a".repeat(2001),
      }).success,
    ).toBe(false);
  });

  it("rejects a whitespace-only current qualification", () => {
    expect(
      consultationSchema.safeParse({
        ...validPayload,
        currentQualification: "   ",
      }).success,
    ).toBe(false);
  });
});
