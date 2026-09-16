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
import { NoticeCallout } from "@/components/shared/NoticeCallout";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { describedBy } from "@/lib/forms/describedBy";
import { FORM_PREFERENCE_ONLY_NOTE } from "@/lib/forms/messages";
import { useDemoFormSubmit } from "@/lib/forms/useDemoFormSubmit";
import {
  consultationDefaultValues,
  consultationSchema,
  MEETING_METHODS,
  STUDY_LEVEL_OPTIONS,
  TIME_PERIOD_OPTIONS,
  type ConsultationFormValues,
} from "@/lib/validation/consultation";
import type { ContactInfo } from "@/types/content";

interface ConsultationFormProps {
  contact: ContactInfo;
}

const MEETING_METHOD_LABELS: Record<(typeof MEETING_METHODS)[number], string> =
  {
    "phone-call": "Phone call",
    "whatsapp-call": "WhatsApp call",
    "video-consultation": "Video consultation",
    "in-person-consultation": "In-person consultation",
  };

const STUDY_LEVEL_LABELS: Record<(typeof STUDY_LEVEL_OPTIONS)[number], string> =
  {
    undergraduate: "Undergraduate",
    postgraduate: "Postgraduate",
    "not-sure": "Not sure yet",
  };

const TIME_PERIOD_LABELS: Record<(typeof TIME_PERIOD_OPTIONS)[number], string> =
  {
    morning: "Morning",
    afternoon: "Afternoon",
    evening: "Evening",
  };

/**
 * Static demo form — no backend exists yet (docs/DECISIONS.md "Form
 * Architecture (Phase 7)"). On a valid submission this shows the required
 * not-connected message rather than confirming a booking: the selected
 * date/time are only preferences (see FORM_PREFERENCE_ONLY_NOTE below).
 */
export function ConsultationForm({ contact }: ConsultationFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, submitCount },
  } = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: consultationDefaultValues,
  });

  const errorEntries = Object.entries(errors) as [
    keyof ConsultationFormValues,
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
      className="space-y-8"
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

      <div className="space-y-5">
        <SectionHeading eyebrow="Step 1" heading="Personal details" />
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
              aria-describedby={describedBy(
                "fullName",
                false,
                !!errors.fullName,
              )}
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
              aria-describedby={describedBy(
                "whatsapp",
                true,
                !!errors.whatsapp,
              )}
              {...register("whatsapp")}
            />
          </FormField>
        </div>
      </div>

      <div className="space-y-5">
        <SectionHeading eyebrow="Step 2" heading="Study interests" />
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label="Current or most recent qualification"
            htmlFor="currentQualification"
            required
            error={errors.currentQualification?.message}
          >
            <Input
              id="currentQualification"
              aria-invalid={!!errors.currentQualification}
              aria-describedby={describedBy(
                "currentQualification",
                false,
                !!errors.currentQualification,
              )}
              {...register("currentQualification")}
            />
          </FormField>

          <FormField
            label="Preferred destination"
            htmlFor="preferredDestination"
            description="Optional. Country or region you're considering."
            error={errors.preferredDestination?.message}
          >
            <Input
              id="preferredDestination"
              autoComplete="country"
              aria-describedby={describedBy(
                "preferredDestination",
                true,
                !!errors.preferredDestination,
              )}
              {...register("preferredDestination")}
            />
          </FormField>

          <FormField
            label="Intended study level"
            htmlFor="intendedStudyLevel"
            required
            error={errors.intendedStudyLevel?.message}
          >
            <Controller
              control={control}
              name="intendedStudyLevel"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="intendedStudyLevel"
                    className="w-full"
                    aria-invalid={!!errors.intendedStudyLevel}
                    aria-describedby={describedBy(
                      "intendedStudyLevel",
                      false,
                      !!errors.intendedStudyLevel,
                    )}
                  >
                    <SelectValue placeholder="Select a study level" />
                  </SelectTrigger>
                  <SelectContent>
                    {STUDY_LEVEL_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {STUDY_LEVEL_LABELS[option]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>

          <FormField
            label="Area of interest"
            htmlFor="areaOfInterest"
            description="Optional. Subject area or field of study."
            error={errors.areaOfInterest?.message}
          >
            <Input
              id="areaOfInterest"
              aria-describedby={describedBy(
                "areaOfInterest",
                true,
                !!errors.areaOfInterest,
              )}
              {...register("areaOfInterest")}
            />
          </FormField>
        </div>
      </div>

      <div className="space-y-5">
        <SectionHeading eyebrow="Step 3" heading="Consultation preference" />
        <NoticeCallout>{FORM_PREFERENCE_ONLY_NOTE}</NoticeCallout>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label="Preferred date"
            htmlFor="preferredDate"
            required
            error={errors.preferredDate?.message}
          >
            <Input
              id="preferredDate"
              type="date"
              aria-invalid={!!errors.preferredDate}
              aria-describedby={describedBy(
                "preferredDate",
                false,
                !!errors.preferredDate,
              )}
              {...register("preferredDate")}
            />
          </FormField>

          <FormField
            label="Preferred time of day"
            htmlFor="preferredTimePeriod"
            required
            error={errors.preferredTimePeriod?.message}
          >
            <Controller
              control={control}
              name="preferredTimePeriod"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="preferredTimePeriod"
                    className="w-full"
                    aria-invalid={!!errors.preferredTimePeriod}
                    aria-describedby={describedBy(
                      "preferredTimePeriod",
                      false,
                      !!errors.preferredTimePeriod,
                    )}
                  >
                    <SelectValue placeholder="Select a time of day" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_PERIOD_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {TIME_PERIOD_LABELS[option]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>

          <FormField
            label="Meeting method"
            htmlFor="meetingMethod"
            required
            error={errors.meetingMethod?.message}
          >
            <Controller
              control={control}
              name="meetingMethod"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="meetingMethod"
                    className="w-full"
                    aria-invalid={!!errors.meetingMethod}
                    aria-describedby={describedBy(
                      "meetingMethod",
                      false,
                      !!errors.meetingMethod,
                    )}
                  >
                    <SelectValue placeholder="Select a meeting method" />
                  </SelectTrigger>
                  <SelectContent>
                    {MEETING_METHODS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {MEETING_METHOD_LABELS[option]}
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
          description="Optional. Anything you'd like us to know before the consultation."
          error={errors.message?.message}
        >
          <Textarea
            id="message"
            rows={4}
            aria-describedby={describedBy("message", true, !!errors.message)}
            {...register("message")}
          />
        </FormField>
      </div>

      <ConsentField
        control={control}
        name="consent"
        error={errors.consent?.message}
      />

      <Button type="submit" variant="accent" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Submitting…" : "Request Consultation"}
      </Button>

      <p className="text-muted-foreground text-xs">
        Prefer to talk instead?{" "}
        <a href={`tel:${contact.phone}`} className="hover:underline">
          Call {contact.phoneDisplay}
        </a>
        .
      </p>
    </form>
  );
}
