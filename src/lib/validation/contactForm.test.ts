import { describe, expect, it } from "vitest";

import { contactFormSchema } from "./contactForm";

const validPayload = {
  fullName: "Jordan Smith",
  email: "jordan@example.com",
  phoneOrWhatsapp: "+92 300 1234567",
  enquiryType: "general" as const,
  message: "I'd like some guidance on studying in Canada.",
  consent: true,
};

describe("contactFormSchema", () => {
  it("accepts a fully valid payload", () => {
    expect(contactFormSchema.safeParse(validPayload).success).toBe(true);
  });

  it("rejects a missing full name", () => {
    expect(
      contactFormSchema.safeParse({ ...validPayload, fullName: "" }).success,
    ).toBe(false);
  });

  it("rejects an invalid email", () => {
    expect(
      contactFormSchema.safeParse({ ...validPayload, email: "nope" }).success,
    ).toBe(false);
  });

  it("rejects a phone number with letters", () => {
    expect(
      contactFormSchema.safeParse({
        ...validPayload,
        phoneOrWhatsapp: "call-me",
      }).success,
    ).toBe(false);
  });

  it("rejects an invalid enquiry type", () => {
    expect(
      contactFormSchema.safeParse({ ...validPayload, enquiryType: "unknown" })
        .success,
    ).toBe(false);
  });

  it("rejects a message that is too short", () => {
    expect(
      contactFormSchema.safeParse({ ...validPayload, message: "Hi" }).success,
    ).toBe(false);
  });

  it("requires consent to be true", () => {
    expect(
      contactFormSchema.safeParse({ ...validPayload, consent: false }).success,
    ).toBe(false);
  });

  it("rejects a whitespace-only full name", () => {
    expect(
      contactFormSchema.safeParse({ ...validPayload, fullName: "   " }).success,
    ).toBe(false);
  });

  it("rejects a whitespace-only message", () => {
    expect(
      contactFormSchema.safeParse({ ...validPayload, message: "          " })
        .success,
    ).toBe(false);
  });

  it.each([
    "study-abroad",
    "university-applications",
    "visa-guidance",
    "scholarships",
    "insurance",
    "accommodation",
    "pre-departure-support",
    "general",
  ] as const)("accepts the %s enquiry type", (enquiryType) => {
    expect(
      contactFormSchema.safeParse({ ...validPayload, enquiryType }).success,
    ).toBe(true);
  });

  it("accepts international phone formats with +, spaces, hyphens and parentheses", () => {
    expect(
      contactFormSchema.safeParse({
        ...validPayload,
        phoneOrWhatsapp: "+1 (555) 123-4567",
      }).success,
    ).toBe(true);
  });
});
