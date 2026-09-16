"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { useDemoFormSubmit } from "@/lib/forms/useDemoFormSubmit";
import {
  AGE_RANGE_OPTIONS,
  BUDGET_RANGE_OPTIONS,
  cleanEligibilityPayload,
  ELIGIBILITY_DESTINATION_OPTIONS,
  eligibilityDefaultValues,
  eligibilitySchema,
  ENGLISH_TEST_TYPE_OPTIONS,
  FUNDING_SOURCE_OPTIONS,
  GRADE_FORMAT_OPTIONS,
  INTENDED_STUDY_LEVEL_OPTIONS,
  type EligibilityFormValues,
} from "@/lib/validation/eligibility";
import type { ContactInfo } from "@/types/content";

interface EligibilityFormProps {
  contact: ContactInfo;
}

const AGE_RANGE_LABELS: Record<(typeof AGE_RANGE_OPTIONS)[number], string> = {
  "under-18": "Under 18",
  "18-24": "18–24",
  "25-34": "25–34",
  "35-plus": "35 or older",
};

const GRADE_FORMAT_LABELS: Record<
  (typeof GRADE_FORMAT_OPTIONS)[number],
  string
> = {
  gpa: "GPA",
  percentage: "Percentage",
  "division-or-class": "Division / class",
  other: "Other",
};

const ENGLISH_TEST_TYPE_LABELS: Record<
  (typeof ENGLISH_TEST_TYPE_OPTIONS)[number],
  string
> = {
  ielts: "IELTS",
  toefl: "TOEFL",
  pte: "PTE Academic",
  duolingo: "Duolingo English Test",
  other: "Other",
};

const INTENDED_STUDY_LEVEL_LABELS: Record<
  (typeof INTENDED_STUDY_LEVEL_OPTIONS)[number],
  string
> = {
  undergraduate: "Undergraduate",
  postgraduate: "Postgraduate",
  "not-sure": "Not sure yet",
};

const BUDGET_RANGE_LABELS: Record<
  (typeof BUDGET_RANGE_OPTIONS)[number],
  string
> = {
  "under-15000": "Under USD 15,000 / year",
  "15000-30000": "USD 15,000 – 30,000 / year",
  "30000-50000": "USD 30,000 – 50,000 / year",
  "over-50000": "Over USD 50,000 / year",
  "not-sure": "Not sure yet",
};

const FUNDING_SOURCE_LABELS: Record<
  (typeof FUNDING_SOURCE_OPTIONS)[number],
  string
> = {
  "self-funded": "Self-funded",
  family: "Family",
  scholarship: "Scholarship",
  loan: "Education loan",
  sponsor: "Sponsor",
  other: "Other",
};

/**
 * Static demo form — no backend exists yet (docs/DECISIONS.md "Form
 * Architecture (Phase 7)"). This form never produces an eligibility
 * decision — see the required notice below. English-test and study-gap
 * fields are shown only when relevant, and their hidden values are
 * cleared before being handed to the submission adapter
 * (`cleanEligibilityPayload`) so they can never leak into any future
 * processing even though the current adapter discards the payload
 * entirely.
 */
export function EligibilityForm({ contact }: EligibilityFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, submitCount },
  } = useForm<EligibilityFormValues>({
    resolver: zodResolver(eligibilitySchema),
    defaultValues: eligibilityDefaultValues,
  });

  const hasStudyGap = useWatch({ control, name: "hasStudyGap" });
  const englishTestTaken = useWatch({ control, name: "englishTestTaken" });

  const errorEntries = Object.entries(errors) as [
    keyof EligibilityFormValues,
    { message?: string },
  ][];

  const { submitted, errorSummaryId, errorSummaryRef, handleValidSubmit } =
    useDemoFormSubmit(submitCount, errorEntries.length > 0);

  async function onValid(values: EligibilityFormValues) {
    void cleanEligibilityPayload(values);
    await handleValidSubmit();
  }

  if (submitted) {
    return <FormSubmittedNotice contact={contact} />;
  }

  return (
    <form noValidate onSubmit={handleSubmit(onValid)} className="space-y-8">
      <FormDemoNotice />

      <NoticeCallout>
        This initial form does not determine admission, scholarship or visa
        eligibility. Formal requirements are set by universities, funding bodies
        and government authorities.
      </NoticeCallout>

      <FormErrorSummary
        id={errorSummaryId}
        summaryRef={errorSummaryRef}
        errors={errorEntries.map(([field, error]) => ({
          field,
          message: error.message,
        }))}
      />

      <div className="space-y-5">
        <SectionHeading eyebrow="Section 1" heading="Personal details" />
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
            label="Country of residence"
            htmlFor="countryOfResidence"
            required
            error={errors.countryOfResidence?.message}
          >
            <Input
              id="countryOfResidence"
              autoComplete="country-name"
              aria-invalid={!!errors.countryOfResidence}
              aria-describedby={describedBy(
                "countryOfResidence",
                false,
                !!errors.countryOfResidence,
              )}
              {...register("countryOfResidence")}
            />
          </FormField>

          <FormField
            label="Nationality"
            htmlFor="nationality"
            required
            error={errors.nationality?.message}
          >
            <Input
              id="nationality"
              aria-invalid={!!errors.nationality}
              aria-describedby={describedBy(
                "nationality",
                false,
                !!errors.nationality,
              )}
              {...register("nationality")}
            />
          </FormField>

          <FormField
            label="Age range"
            htmlFor="ageRange"
            required
            error={errors.ageRange?.message}
          >
            <Controller
              control={control}
              name="ageRange"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="ageRange"
                    className="w-full"
                    aria-invalid={!!errors.ageRange}
                    aria-describedby={describedBy(
                      "ageRange",
                      false,
                      !!errors.ageRange,
                    )}
                  >
                    <SelectValue placeholder="Select an age range" />
                  </SelectTrigger>
                  <SelectContent>
                    {AGE_RANGE_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {AGE_RANGE_LABELS[option]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>
        </div>
      </div>

      <div className="space-y-5">
        <SectionHeading eyebrow="Section 2" heading="Academic background" />
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label="Highest qualification"
            htmlFor="highestQualification"
            required
            error={errors.highestQualification?.message}
          >
            <Input
              id="highestQualification"
              aria-invalid={!!errors.highestQualification}
              aria-describedby={describedBy(
                "highestQualification",
                false,
                !!errors.highestQualification,
              )}
              {...register("highestQualification")}
            />
          </FormField>

          <FormField
            label="Institution"
            htmlFor="institution"
            required
            error={errors.institution?.message}
          >
            <Input
              id="institution"
              aria-invalid={!!errors.institution}
              aria-describedby={describedBy(
                "institution",
                false,
                !!errors.institution,
              )}
              {...register("institution")}
            />
          </FormField>

          <FormField
            label="Graduation year"
            htmlFor="graduationYear"
            required
            error={errors.graduationYear?.message}
          >
            <Input
              id="graduationYear"
              inputMode="numeric"
              aria-invalid={!!errors.graduationYear}
              aria-describedby={describedBy(
                "graduationYear",
                false,
                !!errors.graduationYear,
              )}
              {...register("graduationYear")}
            />
          </FormField>

          <FormField
            label="Grade format"
            htmlFor="gradeFormat"
            required
            error={errors.gradeFormat?.message}
          >
            <Controller
              control={control}
              name="gradeFormat"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="gradeFormat"
                    className="w-full"
                    aria-invalid={!!errors.gradeFormat}
                    aria-describedby={describedBy(
                      "gradeFormat",
                      false,
                      !!errors.gradeFormat,
                    )}
                  >
                    <SelectValue placeholder="Select a grade format" />
                  </SelectTrigger>
                  <SelectContent>
                    {GRADE_FORMAT_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {GRADE_FORMAT_LABELS[option]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>

          <FormField
            label="Grade, CGPA or percentage"
            htmlFor="grade"
            required
            error={errors.grade?.message}
          >
            <Input
              id="grade"
              aria-invalid={!!errors.grade}
              aria-describedby={describedBy("grade", false, !!errors.grade)}
              {...register("grade")}
            />
          </FormField>
        </div>

        <div>
          <div className="flex items-start gap-2.5">
            <Controller
              control={control}
              name="hasStudyGap"
              render={({ field }) => (
                <Checkbox
                  id="hasStudyGap"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label
              htmlFor="hasStudyGap"
              className="text-foreground text-sm leading-snug font-normal"
            >
              I have a gap in my study history I&apos;d like to mention.
            </Label>
          </div>
          {hasStudyGap ? (
            <div className="mt-3 ml-6.5">
              <FormField
                label="Briefly describe your study gap"
                htmlFor="studyGapDetails"
                required
                error={errors.studyGapDetails?.message}
              >
                <Textarea
                  id="studyGapDetails"
                  rows={3}
                  aria-invalid={!!errors.studyGapDetails}
                  aria-describedby={describedBy(
                    "studyGapDetails",
                    false,
                    !!errors.studyGapDetails,
                  )}
                  {...register("studyGapDetails")}
                />
              </FormField>
            </div>
          ) : null}
        </div>
      </div>

      <div className="space-y-5">
        <SectionHeading eyebrow="Section 3" heading="English language" />
        <div>
          <div className="flex items-start gap-2.5">
            <Controller
              control={control}
              name="englishTestTaken"
              render={({ field }) => (
                <Checkbox
                  id="englishTestTaken"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label
              htmlFor="englishTestTaken"
              className="text-foreground text-sm leading-snug font-normal"
            >
              I have taken an English language test.
            </Label>
          </div>
          {englishTestTaken ? (
            <div className="mt-3 ml-6.5 grid gap-5 sm:grid-cols-2">
              <FormField
                label="Test type"
                htmlFor="englishTestType"
                required
                error={errors.englishTestType?.message}
              >
                <Controller
                  control={control}
                  name="englishTestType"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="englishTestType"
                        className="w-full"
                        aria-invalid={!!errors.englishTestType}
                        aria-describedby={describedBy(
                          "englishTestType",
                          false,
                          !!errors.englishTestType,
                        )}
                      >
                        <SelectValue placeholder="Select a test" />
                      </SelectTrigger>
                      <SelectContent>
                        {ENGLISH_TEST_TYPE_OPTIONS.map((option) => (
                          <SelectItem key={option} value={option}>
                            {ENGLISH_TEST_TYPE_LABELS[option]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormField>

              <FormField
                label="Overall score"
                htmlFor="englishTestScore"
                required
                error={errors.englishTestScore?.message}
              >
                <Input
                  id="englishTestScore"
                  aria-invalid={!!errors.englishTestScore}
                  aria-describedby={describedBy(
                    "englishTestScore",
                    false,
                    !!errors.englishTestScore,
                  )}
                  {...register("englishTestScore")}
                />
              </FormField>
            </div>
          ) : null}
        </div>
      </div>

      <div className="space-y-5">
        <SectionHeading eyebrow="Section 4" heading="Study preferences" />

        <fieldset>
          <legend className="text-foreground text-sm font-medium">
            Preferred destinations
            <span aria-hidden="true" className="text-destructive">
              *
            </span>
          </legend>
          <div
            className="mt-2 grid gap-2.5 sm:grid-cols-2"
            aria-describedby={describedBy(
              "preferredDestinations",
              false,
              !!errors.preferredDestinations,
            )}
          >
            {ELIGIBILITY_DESTINATION_OPTIONS.map((destination) => (
              <div key={destination} className="flex items-center gap-2.5">
                <Controller
                  control={control}
                  name="preferredDestinations"
                  render={({ field }) => {
                    const checked = field.value.includes(destination);
                    return (
                      <Checkbox
                        id={`preferredDestinations-${destination}`}
                        checked={checked}
                        onCheckedChange={(value) => {
                          if (value) {
                            field.onChange([...field.value, destination]);
                          } else {
                            field.onChange(
                              field.value.filter(
                                (item) => item !== destination,
                              ),
                            );
                          }
                        }}
                      />
                    );
                  }}
                />
                <Label
                  htmlFor={`preferredDestinations-${destination}`}
                  className="text-foreground text-sm leading-snug font-normal"
                >
                  {destination}
                </Label>
              </div>
            ))}
          </div>
          {errors.preferredDestinations ? (
            <p
              id="preferredDestinations-error"
              className="text-destructive mt-1.5 text-sm"
            >
              {errors.preferredDestinations.message}
            </p>
          ) : null}
        </fieldset>

        <div className="grid gap-5 sm:grid-cols-2">
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
                    {INTENDED_STUDY_LEVEL_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {INTENDED_STUDY_LEVEL_LABELS[option]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>

          <FormField
            label="Intended subject area"
            htmlFor="intendedSubject"
            required
            error={errors.intendedSubject?.message}
          >
            <Input
              id="intendedSubject"
              aria-invalid={!!errors.intendedSubject}
              aria-describedby={describedBy(
                "intendedSubject",
                false,
                !!errors.intendedSubject,
              )}
              {...register("intendedSubject")}
            />
          </FormField>

          <FormField
            label="Preferred intake"
            htmlFor="preferredIntake"
            description="Optional. E.g. Fall 2027."
            error={errors.preferredIntake?.message}
          >
            <Input
              id="preferredIntake"
              aria-describedby={describedBy(
                "preferredIntake",
                true,
                !!errors.preferredIntake,
              )}
              {...register("preferredIntake")}
            />
          </FormField>

          <FormField
            label="Budget range"
            htmlFor="budgetRange"
            required
            error={errors.budgetRange?.message}
          >
            <Controller
              control={control}
              name="budgetRange"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="budgetRange"
                    className="w-full"
                    aria-invalid={!!errors.budgetRange}
                    aria-describedby={describedBy(
                      "budgetRange",
                      false,
                      !!errors.budgetRange,
                    )}
                  >
                    <SelectValue placeholder="Select a budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    {BUDGET_RANGE_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {BUDGET_RANGE_LABELS[option]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>

          <FormField
            label="Funding source"
            htmlFor="fundingSource"
            required
            error={errors.fundingSource?.message}
          >
            <Controller
              control={control}
              name="fundingSource"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="fundingSource"
                    className="w-full"
                    aria-invalid={!!errors.fundingSource}
                    aria-describedby={describedBy(
                      "fundingSource",
                      false,
                      !!errors.fundingSource,
                    )}
                  >
                    <SelectValue placeholder="Select a funding source" />
                  </SelectTrigger>
                  <SelectContent>
                    {FUNDING_SOURCE_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {FUNDING_SOURCE_LABELS[option]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>
        </div>
      </div>

      <div className="space-y-5">
        <SectionHeading eyebrow="Section 5" heading="Additional information" />
        <FormField
          label="Anything else you'd like to share"
          htmlFor="comments"
          description="Optional."
          error={errors.comments?.message}
        >
          <Textarea
            id="comments"
            rows={4}
            aria-describedby={describedBy("comments", true, !!errors.comments)}
            {...register("comments")}
          />
        </FormField>
      </div>

      <ConsentField
        control={control}
        name="consent"
        error={errors.consent?.message}
      />

      <Button type="submit" variant="accent" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Submitting…" : "Check Eligibility"}
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
