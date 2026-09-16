"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ConsentField } from "@/components/forms/ConsentField";
import { FormDemoNotice } from "@/components/forms/FormDemoNotice";
import { FormErrorSummary } from "@/components/forms/FormErrorSummary";
import { FormField } from "@/components/forms/FormField";
import { FormSubmittedNotice } from "@/components/forms/FormSubmittedNotice";
import { describedBy } from "@/lib/forms/describedBy";
import { useDemoFormSubmit } from "@/lib/forms/useDemoFormSubmit";
import {
  contactFormDefaultValues,
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validation/contactForm";
import type { ContactInfo } from "@/types/content";

interface ContactFormProps {
  contact: ContactInfo;
}

const ENQUIRY_TYPES: {
  value: ContactFormValues["enquiryType"];
  label: string;
}[] = [
  { value: "study-abroad", label: "Study Abroad" },
  { value: "university-applications", label: "University Applications" },
  { value: "visa-guidance", label: "Visa Guidance" },
  { value: "scholarships", label: "Scholarships" },
  { value: "insurance", label: "Insurance" },
  { value: "accommodation", label: "Accommodation" },
  { value: "pre-departure-support", label: "Pre-departure Support" },
  { value: "general", label: "General Enquiry" },
];

/**
 * Static demo form — no backend exists yet (docs/DECISIONS.md "Form
 * Architecture (Phase 7)"). Never logs field values, never writes to
 * storage, never makes a network request, never simulates success.
 */
export function ContactForm({ contact }: ContactFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, submitCount },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: contactFormDefaultValues,
  });

  const errorEntries = Object.entries(errors) as [
    keyof ContactFormValues,
    { message?: string },
  ][];

  const { submitted, errorSummaryId, errorSummaryRef, handleValidSubmit } =
    useDemoFormSubmit(submitCount, errorEntries.length > 0);

  if (submitted) {
    return <FormSubmittedNotice contact={contact} />;
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(handleValidSubmit)}
      className="space-y-6"
    >
      <FormDemoNotice />

      <FormErrorSummary
        id={errorSummaryId}
        summaryRef={errorSummaryRef}
        errors={errorEntries.map(([field, error]) => ({
          field,
          message: error.message,
        }))}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          label="Full name"
          htmlFor="fullName"
          required
          error={errors.fullName?.message}
        >
          <Input
            id="fullName"
            autoComplete="name"
            aria-invalid={!!errors.fullName}
            aria-describedby={describedBy("fullName", false, !!errors.fullName)}
            {...register("fullName")}
          />
        </FormField>

        <FormField
          label="Email"
          htmlFor="email"
          required
          error={errors.email?.message}
        >
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email", false, !!errors.email)}
            {...register("email")}
          />
        </FormField>

        <FormField
          label="Phone or WhatsApp"
          htmlFor="phoneOrWhatsapp"
          required
          error={errors.phoneOrWhatsapp?.message}
        >
          <Input
            id="phoneOrWhatsapp"
            type="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phoneOrWhatsapp}
            aria-describedby={describedBy(
              "phoneOrWhatsapp",
              false,
              !!errors.phoneOrWhatsapp,
            )}
            {...register("phoneOrWhatsapp")}
          />
        </FormField>

        <FormField
          label="Enquiry type"
          htmlFor="enquiryType"
          required
          error={errors.enquiryType?.message}
        >
          <Controller
            control={control}
            name="enquiryType"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="enquiryType"
                  className="w-full"
                  aria-invalid={!!errors.enquiryType}
                  aria-describedby={describedBy(
                    "enquiryType",
                    false,
                    !!errors.enquiryType,
                  )}
                >
                  <SelectValue placeholder="Select an enquiry type" />
                </SelectTrigger>
                <SelectContent>
                  {ENQUIRY_TYPES.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormField>
      </div>

      <FormField
        label="Message"
        htmlFor="message"
        required
        error={errors.message?.message}
      >
        <Textarea
          id="message"
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={describedBy("message", false, !!errors.message)}
          {...register("message")}
        />
      </FormField>

      <ConsentField
        control={control}
        name="consent"
        error={errors.consent?.message}
      />

      <Button type="submit" variant="accent" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
