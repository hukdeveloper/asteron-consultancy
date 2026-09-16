import { z } from "zod";

import { isBeforeToday } from "@/lib/forms/dateUtils";

/**
 * Validation for the /insurance-quote demo form. This is a static, no-backend
 * form (docs/DECISIONS.md "Form Architecture (Phase 7)" — Track 1
 * client-side-only demo per docs/TECHNICAL_ARCHITECTURE.md §5) — this schema
 * exists purely to validate input shape before showing the not-connected
 * message; it is never sent anywhere.
 *
 * Deliberately excludes passport numbers, payment-card details, and
 * detailed medical history — the form must not collect that data even for
 * a demo (see the privacy notice rendered alongside the form).
 */

const dateSchema = z.iso.date({ message: "Enter a valid date." });

export const insuranceQuoteSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Enter your full name.")
      .max(120, "Full name is too long."),
    email: z.email("Enter a valid email address."),
    phone: z
      .string()
      .trim()
      .min(7, "Enter a valid phone number.")
      .max(20, "Phone number is too long.")
      .regex(/^[+0-9()\-\s]+$/, "Use only digits, spaces and + ( ) -."),
    whatsapp: z
      .string()
      .trim()
      .max(20, "WhatsApp number is too long.")
      .regex(/^[+0-9()\-\s]*$/, "Use only digits, spaces and + ( ) -.")
      .optional()
      .or(z.literal("")),
    insuranceType: z.enum(["student-health", "travel", "visitor", "not-sure"], {
      message: "Select an insurance type.",
    }),
    destination: z
      .string()
      .trim()
      .min(2, "Enter your destination.")
      .max(120, "Destination is too long."),
    startDate: dateSchema,
    endDate: dateSchema,
    dateOfBirth: dateSchema,
    numberOfTravellers: z.coerce
      .number({ message: "Enter the number of travellers." })
      .int("Enter a whole number.")
      .min(1, "At least one traveller is required.")
      .max(10, "For more than 10 travellers, please contact us directly."),
    studentStatus: z
      .enum(["yes", "no", "not-applicable"])
      .optional()
      .or(z.literal("")),
    additionalRequirements: z
      .string()
      .trim()
      .max(1000, "Keep additional requirements under 1000 characters.")
      .optional()
      .or(z.literal("")),
    consent: z.boolean().refine((value) => value === true, {
      message: "You must agree before submitting.",
    }),
  })
  .refine((data) => !isBeforeToday(data.startDate), {
    message: "Coverage start date cannot be in the past.",
    path: ["startDate"],
  })
  .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    message: "End date must be on or after the start date.",
    path: ["endDate"],
  })
  .refine((data) => new Date(data.dateOfBirth) <= new Date(), {
    message: "Date of birth cannot be in the future.",
    path: ["dateOfBirth"],
  })
  .refine(
    (data) => {
      const age =
        (new Date().getTime() - new Date(data.dateOfBirth).getTime()) /
        (1000 * 60 * 60 * 24 * 365.25);
      return age <= 120;
    },
    { message: "Enter a valid date of birth.", path: ["dateOfBirth"] },
  );

/** Post-validation shape (numberOfTravellers coerced to a real number) — what `onValid` receives. */
export type InsuranceQuoteFormValues = z.output<typeof insuranceQuoteSchema>;
/** Pre-validation shape (numberOfTravellers as the raw, uncoerced input) — what react-hook-form actually manages. */
export type InsuranceQuoteFormInput = z.input<typeof insuranceQuoteSchema>;

export const insuranceQuoteDefaultValues: InsuranceQuoteFormInput = {
  fullName: "",
  email: "",
  phone: "",
  whatsapp: "",
  insuranceType: "student-health",
  destination: "",
  startDate: "",
  endDate: "",
  dateOfBirth: "",
  numberOfTravellers: 1,
  studentStatus: "",
  additionalRequirements: "",
  consent: false,
};
