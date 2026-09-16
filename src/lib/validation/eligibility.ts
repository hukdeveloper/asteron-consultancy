import { z } from "zod";

/**
 * Validation for the /check-eligibility demo form. Static, no-backend
 * (see docs/DECISIONS.md "Form Architecture (Phase 7)") — this schema
 * only validates input shape before showing the not-connected message;
 * it is never sent anywhere. This form never produces an eligibility
 * decision — see the required notice rendered alongside it.
 */

export const AGE_RANGE_OPTIONS = [
  "under-18",
  "18-24",
  "25-34",
  "35-plus",
] as const;
export const GRADE_FORMAT_OPTIONS = [
  "gpa",
  "percentage",
  "division-or-class",
  "other",
] as const;
export const ENGLISH_TEST_TYPE_OPTIONS = [
  "ielts",
  "toefl",
  "pte",
  "duolingo",
  "other",
] as const;
export const INTENDED_STUDY_LEVEL_OPTIONS = [
  "undergraduate",
  "postgraduate",
  "not-sure",
] as const;
export const BUDGET_RANGE_OPTIONS = [
  "under-15000",
  "15000-30000",
  "30000-50000",
  "over-50000",
  "not-sure",
] as const;
export const FUNDING_SOURCE_OPTIONS = [
  "self-funded",
  "family",
  "scholarship",
  "loan",
  "sponsor",
  "other",
] as const;

/** Curated list for the accessible checkbox multi-select — matches the 6 destinations already published under /study-abroad. */
export const ELIGIBILITY_DESTINATION_OPTIONS = [
  "United Kingdom",
  "Australia",
  "Canada",
  "United States",
  "Germany",
  "Ireland",
] as const;

export const eligibilitySchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Enter your full name.")
      .max(120, "Full name is too long."),
    email: z.email("Enter a valid email address."),
    phoneOrWhatsapp: z
      .string()
      .trim()
      .min(7, "Enter a valid phone or WhatsApp number.")
      .max(20, "Phone or WhatsApp number is too long.")
      .regex(/^[+0-9()\-\s]+$/, "Use only digits, spaces and + ( ) -."),
    countryOfResidence: z
      .string()
      .trim()
      .min(2, "Enter your country of residence.")
      .max(80, "Keep this under 80 characters."),
    nationality: z
      .string()
      .trim()
      .min(2, "Enter your nationality.")
      .max(80, "Keep this under 80 characters."),
    ageRange: z.enum(AGE_RANGE_OPTIONS, { message: "Select an age range." }),

    highestQualification: z
      .string()
      .trim()
      .min(2, "Enter your highest qualification.")
      .max(150, "Keep this under 150 characters."),
    institution: z
      .string()
      .trim()
      .min(2, "Enter your institution.")
      .max(150, "Keep this under 150 characters."),
    graduationYear: z
      .string()
      .trim()
      .regex(/^\d{4}$/, "Enter a 4-digit year.")
      .refine((value) => {
        const year = Number(value);
        return year >= 1970 && year <= new Date().getFullYear() + 10;
      }, "Enter a realistic graduation year."),
    gradeFormat: z.enum(GRADE_FORMAT_OPTIONS, {
      message: "Select a grade format.",
    }),
    grade: z
      .string()
      .trim()
      .min(1, "Enter your grade, CGPA or percentage.")
      .max(30, "Keep this under 30 characters."),
    hasStudyGap: z.boolean(),
    studyGapDetails: z
      .string()
      .trim()
      .max(300, "Keep this under 300 characters.")
      .optional()
      .or(z.literal("")),

    englishTestTaken: z.boolean(),
    englishTestType: z
      .enum(ENGLISH_TEST_TYPE_OPTIONS)
      .optional()
      .or(z.literal("")),
    englishTestScore: z
      .string()
      .trim()
      .max(20, "Keep this under 20 characters.")
      .optional()
      .or(z.literal("")),

    preferredDestinations: z
      .array(z.enum(ELIGIBILITY_DESTINATION_OPTIONS))
      .min(1, "Select at least one destination.")
      .max(6, "You can select up to 6 destinations."),
    intendedStudyLevel: z.enum(INTENDED_STUDY_LEVEL_OPTIONS, {
      message: "Select an intended study level.",
    }),
    intendedSubject: z
      .string()
      .trim()
      .min(2, "Enter your intended subject area.")
      .max(150, "Keep this under 150 characters."),
    preferredIntake: z
      .string()
      .trim()
      .max(60, "Keep this under 60 characters.")
      .optional()
      .or(z.literal("")),
    budgetRange: z.enum(BUDGET_RANGE_OPTIONS, {
      message: "Select a budget range.",
    }),
    fundingSource: z.enum(FUNDING_SOURCE_OPTIONS, {
      message: "Select a funding source.",
    }),

    comments: z
      .string()
      .trim()
      .max(1000, "Keep this under 1000 characters.")
      .optional()
      .or(z.literal("")),
    consent: z.boolean().refine((value) => value === true, {
      message: "You must agree before submitting.",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.englishTestTaken) {
      if (!data.englishTestType) {
        ctx.addIssue({
          code: "custom",
          message: "Select the English test you took.",
          path: ["englishTestType"],
        });
      }
      if (!data.englishTestScore || data.englishTestScore.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "Enter your overall score.",
          path: ["englishTestScore"],
        });
      }
    }
    if (
      data.hasStudyGap &&
      (!data.studyGapDetails || data.studyGapDetails.trim() === "")
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Briefly describe your study gap.",
        path: ["studyGapDetails"],
      });
    }
  });

export type EligibilityFormValues = z.infer<typeof eligibilitySchema>;

export const eligibilityDefaultValues: EligibilityFormValues = {
  fullName: "",
  email: "",
  phoneOrWhatsapp: "",
  countryOfResidence: "",
  nationality: "",
  ageRange: "18-24",
  highestQualification: "",
  institution: "",
  graduationYear: "",
  gradeFormat: "percentage",
  grade: "",
  hasStudyGap: false,
  studyGapDetails: "",
  englishTestTaken: false,
  englishTestType: "",
  englishTestScore: "",
  preferredDestinations: [],
  intendedStudyLevel: "not-sure",
  intendedSubject: "",
  preferredIntake: "",
  budgetRange: "not-sure",
  fundingSource: "self-funded",
  comments: "",
  consent: false,
};

/** Strips irrelevant hidden-field values before a valid payload is handed to the submission adapter — never logged, never sent, but kept clean in principle. */
export function cleanEligibilityPayload(
  values: EligibilityFormValues,
): EligibilityFormValues {
  return {
    ...values,
    englishTestType: values.englishTestTaken ? values.englishTestType : "",
    englishTestScore: values.englishTestTaken ? values.englishTestScore : "",
    studyGapDetails: values.hasStudyGap ? values.studyGapDetails : "",
  };
}
