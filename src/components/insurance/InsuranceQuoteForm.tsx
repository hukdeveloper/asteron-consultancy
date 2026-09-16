"use client";

import Link from "next/link";
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
  insuranceQuoteDefaultValues,
  insuranceQuoteSchema,
  type InsuranceQuoteFormInput,
  type InsuranceQuoteFormValues,
} from "@/lib/validation/insuranceQuote";
import type { ContactInfo, InsuranceService } from "@/types/content";

interface InsuranceQuoteFormProps {
  contact: ContactInfo;
  insuranceServices: InsuranceService[];
}

/**
 * Static demo form — no backend exists yet (docs/DECISIONS.md "Form
 * Architecture (Phase 7)"). On a valid submission this shows the required
 * not-connected message rather than simulating success. Never logs field
 * values, never writes to storage, never makes a network request, and
 * never puts values in the URL.
 */
export function InsuranceQuoteForm({
  contact,
  insuranceServices,
}: InsuranceQuoteFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, submitCount },
  } = useForm<InsuranceQuoteFormInput, unknown, InsuranceQuoteFormValues>({
    resolver: zodResolver(insuranceQuoteSchema),
    defaultValues: insuranceQuoteDefaultValues,
  });

  const errorEntries = Object.entries(errors) as [
    keyof InsuranceQuoteFormInput,
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
          label="Phone number"
          htmlFor="phone"
          required
          error={errors.phone?.message}
        >
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy("phone", false, !!errors.phone)}
            {...register("phone")}
          />
        </FormField>

        <FormField
          label="WhatsApp number"
          htmlFor="whatsapp"
          description="Only if different from your phone number."
          error={errors.whatsapp?.message}
        >
          <Input
            id="whatsapp"
            type="tel"
            aria-invalid={!!errors.whatsapp}
            aria-describedby={describedBy("whatsapp", true, !!errors.whatsapp)}
            {...register("whatsapp")}
          />
        </FormField>

        <FormField
          label="Insurance type"
          htmlFor="insuranceType"
          required
          error={errors.insuranceType?.message}
        >
          <Controller
            control={control}
            name="insuranceType"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="insuranceType"
                  className="w-full"
                  aria-invalid={!!errors.insuranceType}
                  aria-describedby={describedBy(
                    "insuranceType",
                    false,
                    !!errors.insuranceType,
                  )}
                >
                  <SelectValue placeholder="Select an insurance type" />
                </SelectTrigger>
                <SelectContent>
                  {insuranceServices.map((service) => (
                    <SelectItem
                      key={service.slug}
                      value={service.insuranceType}
                    >
                      {service.title}
                    </SelectItem>
                  ))}
                  <SelectItem value="not-sure">Not sure yet</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </FormField>

        <FormField
          label="Destination"
          htmlFor="destination"
          required
          error={errors.destination?.message}
        >
          <Input
            id="destination"
            aria-invalid={!!errors.destination}
            aria-describedby={describedBy(
              "destination",
              false,
              !!errors.destination,
            )}
            {...register("destination")}
          />
        </FormField>

        <FormField
          label="Travel or coverage start date"
          htmlFor="startDate"
          required
          error={errors.startDate?.message}
        >
          <Input
            id="startDate"
            type="date"
            aria-invalid={!!errors.startDate}
            aria-describedby={describedBy(
              "startDate",
              false,
              !!errors.startDate,
            )}
            {...register("startDate")}
          />
        </FormField>

        <FormField
          label="End date or expected duration"
          htmlFor="endDate"
          required
          description="Enter the date your cover should end."
          error={errors.endDate?.message}
        >
          <Input
            id="endDate"
            type="date"
            aria-invalid={!!errors.endDate}
            aria-describedby={describedBy("endDate", true, !!errors.endDate)}
            {...register("endDate")}
          />
        </FormField>

        <FormField
          label="Date of birth"
          htmlFor="dateOfBirth"
          required
          error={errors.dateOfBirth?.message}
        >
          <Input
            id="dateOfBirth"
            type="date"
            autoComplete="bday"
            aria-invalid={!!errors.dateOfBirth}
            aria-describedby={describedBy(
              "dateOfBirth",
              false,
              !!errors.dateOfBirth,
            )}
            {...register("dateOfBirth")}
          />
        </FormField>

        <FormField
          label="Number of travellers"
          htmlFor="numberOfTravellers"
          required
          error={errors.numberOfTravellers?.message}
        >
          <Input
            id="numberOfTravellers"
            type="number"
            min={1}
            max={10}
            aria-invalid={!!errors.numberOfTravellers}
            aria-describedby={describedBy(
              "numberOfTravellers",
              false,
              !!errors.numberOfTravellers,
            )}
            {...register("numberOfTravellers")}
          />
        </FormField>

        <FormField
          label="Student status"
          htmlFor="studentStatus"
          description="Where relevant to your insurance type."
          error={errors.studentStatus?.message}
        >
          <Controller
            control={control}
            name="studentStatus"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="studentStatus"
                  className="w-full"
                  aria-describedby={describedBy(
                    "studentStatus",
                    true,
                    !!errors.studentStatus,
                  )}
                >
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes, I&apos;m a student</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="not-applicable">Not applicable</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </FormField>
      </div>

      <FormField
        label="Additional requirements"
        htmlFor="additionalRequirements"
        description="Optional. Do not include passport numbers or detailed medical history — see the privacy notice above."
        error={errors.additionalRequirements?.message}
      >
        <Textarea
          id="additionalRequirements"
          rows={4}
          aria-describedby={describedBy(
            "additionalRequirements",
            true,
            !!errors.additionalRequirements,
          )}
          {...register("additionalRequirements")}
        />
      </FormField>

      <ConsentField
        control={control}
        name="consent"
        error={errors.consent?.message}
      />

      <Button type="submit" variant="accent" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Submitting…" : "Request Quote"}
      </Button>

      <p className="text-muted-foreground text-xs">
        Prefer to talk instead?{" "}
        <a href={`tel:${contact.phone}`} className="hover:underline">
          Call {contact.phoneDisplay}
        </a>{" "}
        or{" "}
        <Link href="/book-consultation" className="hover:underline">
          book a free consultation
        </Link>
        .
      </p>
    </form>
  );
}
