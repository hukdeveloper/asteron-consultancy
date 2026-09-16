import { describe, expect, it } from "vitest";

import {
  cleanEligibilityPayload,
  eligibilitySchema,
  type EligibilityFormValues,
} from "./eligibility";

const validPayload: EligibilityFormValues = {
  fullName: "Jordan Smith",
  email: "jordan@example.com",
  phoneOrWhatsapp: "+92 300 1234567",
  countryOfResidence: "Pakistan",
  nationality: "Pakistani",
  ageRange: "18-24" as const,
  highestQualification: "BSc Computer Science",
  institution: "Example University",
  graduationYear: "2024",
  gradeFormat: "percentage" as const,
  grade: "78%",
  hasStudyGap: false,
  studyGapDetails: "",
  englishTestTaken: false,
  englishTestType: "",
  englishTestScore: "",
  preferredDestinations: ["United Kingdom" as const],
  intendedStudyLevel: "postgraduate" as const,
  intendedSubject: "Data Science",
  preferredIntake: "Fall 2027",
  budgetRange: "15000-30000" as const,
  fundingSource: "self-funded" as const,
  comments: "",
  consent: true,
};

describe("eligibilitySchema", () => {
  it("accepts a fully valid payload", () => {
    const result = eligibilitySchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it("rejects a whitespace-only full name", () => {
    expect(
      eligibilitySchema.safeParse({ ...validPayload, fullName: "   " }).success,
    ).toBe(false);
  });

  it("rejects an invalid email", () => {
    expect(
      eligibilitySchema.safeParse({ ...validPayload, email: "nope" }).success,
    ).toBe(false);
  });

  it("accepts international phone formats with +, spaces, hyphens and parentheses", () => {
    expect(
      eligibilitySchema.safeParse({
        ...validPayload,
        phoneOrWhatsapp: "+1 (555) 123-4567",
      }).success,
    ).toBe(true);
  });

  it("rejects a non-4-digit graduation year", () => {
    expect(
      eligibilitySchema.safeParse({ ...validPayload, graduationYear: "24" })
        .success,
    ).toBe(false);
  });

  it("rejects an unrealistic graduation year", () => {
    expect(
      eligibilitySchema.safeParse({
        ...validPayload,
        graduationYear: "1900",
      }).success,
    ).toBe(false);
  });

  it("requires at least one preferred destination", () => {
    expect(
      eligibilitySchema.safeParse({
        ...validPayload,
        preferredDestinations: [],
      }).success,
    ).toBe(false);
  });

  it("accepts multiple preferred destinations", () => {
    expect(
      eligibilitySchema.safeParse({
        ...validPayload,
        preferredDestinations: ["United Kingdom", "Canada", "Australia"],
      }).success,
    ).toBe(true);
  });

  it("rejects an unknown destination value", () => {
    expect(
      eligibilitySchema.safeParse({
        ...validPayload,
        preferredDestinations: ["Narnia"],
      }).success,
    ).toBe(false);
  });

  it("requires consent to be true", () => {
    expect(
      eligibilitySchema.safeParse({ ...validPayload, consent: false }).success,
    ).toBe(false);
  });

  describe("conditional English-test fields", () => {
    it("does not require test type/score when no test was taken", () => {
      expect(
        eligibilitySchema.safeParse({
          ...validPayload,
          englishTestTaken: false,
          englishTestType: "",
          englishTestScore: "",
        }).success,
      ).toBe(true);
    });

    it("requires test type and score when a test was taken", () => {
      const result = eligibilitySchema.safeParse({
        ...validPayload,
        englishTestTaken: true,
        englishTestType: "",
        englishTestScore: "",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        const paths = result.error.issues.map((issue) => issue.path.join("."));
        expect(paths).toContain("englishTestType");
        expect(paths).toContain("englishTestScore");
      }
    });

    it("accepts a fully filled English test section", () => {
      expect(
        eligibilitySchema.safeParse({
          ...validPayload,
          englishTestTaken: true,
          englishTestType: "ielts",
          englishTestScore: "7.0",
        }).success,
      ).toBe(true);
    });
  });

  describe("conditional study-gap field", () => {
    it("does not require gap details when there is no gap", () => {
      expect(
        eligibilitySchema.safeParse({
          ...validPayload,
          hasStudyGap: false,
          studyGapDetails: "",
        }).success,
      ).toBe(true);
    });

    it("requires gap details when a gap is indicated", () => {
      const result = eligibilitySchema.safeParse({
        ...validPayload,
        hasStudyGap: true,
        studyGapDetails: "",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(
          result.error.issues.some((issue) =>
            issue.path.includes("studyGapDetails"),
          ),
        ).toBe(true);
      }
    });

    it("accepts gap details when a gap is indicated and described", () => {
      expect(
        eligibilitySchema.safeParse({
          ...validPayload,
          hasStudyGap: true,
          studyGapDetails: "Took a year to work and save for tuition.",
        }).success,
      ).toBe(true);
    });
  });
});

describe("cleanEligibilityPayload", () => {
  it("clears English-test fields when no test was taken, even if populated", () => {
    const cleaned = cleanEligibilityPayload({
      ...validPayload,
      englishTestTaken: false,
      englishTestType: "ielts",
      englishTestScore: "7.0",
    });
    expect(cleaned.englishTestType).toBe("");
    expect(cleaned.englishTestScore).toBe("");
  });

  it("clears study-gap details when no gap is indicated, even if populated", () => {
    const cleaned = cleanEligibilityPayload({
      ...validPayload,
      hasStudyGap: false,
      studyGapDetails: "Should be cleared.",
    });
    expect(cleaned.studyGapDetails).toBe("");
  });

  it("keeps relevant conditional fields when their toggle is on", () => {
    const cleaned = cleanEligibilityPayload({
      ...validPayload,
      englishTestTaken: true,
      englishTestType: "ielts",
      englishTestScore: "7.0",
      hasStudyGap: true,
      studyGapDetails: "A gap year.",
    });
    expect(cleaned.englishTestType).toBe("ielts");
    expect(cleaned.englishTestScore).toBe("7.0");
    expect(cleaned.studyGapDetails).toBe("A gap year.");
  });
});
