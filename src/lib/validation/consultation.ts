import { z } from "zod";

import { isBeforeToday } from "@/lib/forms/dateUtils";

/**
 * Validation for the /book-consultation demo form. Static, no-backend
 * (see docs/DECISIONS.md "Form Architecture (Phase 7)") — this schema
 * only validates input shape before showing the not-connected message;
 * it is never sent anywhere.
 */

export const MEETING_METHODS = [
  "phone-call",
  "whatsapp-call",
  "video-consultation",
  "in-person-consultation",
] as const;

export const STUDY_LEVEL_OPTIONS = [
  "undergraduate",
  "postgraduate",
  "not-sure",
] as const;

export const TIME_PERIOD_OPTIONS = ["morning", "afternoon", "evening"] as const;

export const consultationSchema = z
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
    currentQualification: z
      .string()
      .trim()
      .min(2, "Enter your current or most recent qualification.")
      .max(150, "Keep this under 150 characters."),
    preferredDestination: z
      .string()
      .trim()
      .max(120, "Keep this under 120 characters.")
      .optional()
      .or(z.literal("")),
    intendedStudyLevel: z.enum(STUDY_LEVEL_OPTIONS, {
      message: "Select an intended study level.",
    }),
    areaOfInterest: z
      .string()
      .trim()
      .max(150, "Keep this under 150 characters.")
      .optional()
      .or(z.literal("")),
    preferredDate: z.iso.date({ message: "Enter a valid date." }),
    preferredTimePeriod: z.enum(TIME_PERIOD_OPTIONS, {
      message: "Select a preferred time period.",
    }),
    meetingMethod: z.enum(MEETING_METHODS, {
      message: "Select a meeting method.",
    }),
    message: z
      .string()
      .trim()
      .max(2000, "Keep your message under 2000 characters.")
      .optional()
      .or(z.literal("")),
    consent: z.boolean().refine((value) => value === true, {
      message: "You must agree before submitting.",
    }),
  })
  .refine((data) => !isBeforeToday(data.preferredDate), {
    message: "Preferred date cannot be in the past.",
    path: ["preferredDate"],
  });

export type ConsultationFormValues = z.infer<typeof consultationSchema>;

export const consultationDefaultValues: ConsultationFormValues = {
  fullName: "",
  email: "",
  phone: "",
  whatsapp: "",
  currentQualification: "",
  preferredDestination: "",
  intendedStudyLevel: "not-sure",
  areaOfInterest: "",
  preferredDate: "",
  preferredTimePeriod: "morning",
  meetingMethod: "video-consultation",
  message: "",
  consent: false,
};
