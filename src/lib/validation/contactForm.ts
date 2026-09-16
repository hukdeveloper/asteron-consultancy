import { z } from "zod";

/**
 * Validation for the /contact demo form. Static, no-backend (see
 * docs/DECISIONS.md "Form Architecture (Phase 7)") — this schema only
 * validates input shape before showing the not-connected message; it is
 * never sent anywhere.
 */

export const CONTACT_ENQUIRY_TYPES = [
  "study-abroad",
  "university-applications",
  "visa-guidance",
  "scholarships",
  "insurance",
  "accommodation",
  "pre-departure-support",
  "general",
] as const;

export const contactFormSchema = z.object({
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
  enquiryType: z.enum(CONTACT_ENQUIRY_TYPES, {
    message: "Select an enquiry type.",
  }),
  message: z
    .string()
    .trim()
    .min(10, "Enter a short message (at least 10 characters).")
    .max(2000, "Keep your message under 2000 characters."),
  consent: z.boolean().refine((value) => value === true, {
    message: "You must agree before submitting.",
  }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const contactFormDefaultValues: ContactFormValues = {
  fullName: "",
  email: "",
  phoneOrWhatsapp: "",
  enquiryType: "general",
  message: "",
  consent: false,
};
