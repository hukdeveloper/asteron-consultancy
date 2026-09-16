import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { ProcessStep } from "@/types/content";

interface ProcessStepsSectionProps {
  eyebrow?: string;
  heading: string;
  description?: string;
  steps: ProcessStep[];
  headingId: string;
  className?: string;
}

/**
 * Generic numbered process-step sequence — reused across Services,
 * Insurance, and anywhere else a step-by-step sequence is shown. Uses the
 * same connected-journey grammar (numbered circle + dashed route line) as
 * the homepage's `HowItWorksSection` and `ApplicationJourneySection`,
 * instead of a plain bordered-box grid — see docs/DECISIONS.md "Visual
 * Language Reset, Phase B".
 */
export function ProcessStepsSection({
  eyebrow = "Process",
  heading,
  description,
  steps,
  headingId,
  className,
}: ProcessStepsSectionProps) {
  return (
    <Section className={className} aria-labelledby={headingId}>
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          heading={heading}
          headingId={headingId}
          description={description}
          className="max-w-3xl"
        />

        <ol className="relative mt-12 grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          <div
            aria-hidden="true"
            className="border-border absolute inset-x-0 top-5 hidden border-t border-dashed lg:block"
          />

          {steps.map((step, index) => (
            <li key={step.id} className="relative pl-14 sm:pl-0">
              <div className="sm:flex sm:flex-col sm:items-start">
                <span className="bg-brand-ink text-primary-foreground border-muted absolute top-0 left-0 flex size-10 items-center justify-center rounded-full border-4 text-sm font-semibold sm:relative sm:mb-4">
                  {step.step}
                </span>
                {index < steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="border-border absolute top-10 left-5 h-[calc(100%+1.25rem)] border-l border-dashed sm:hidden"
                  />
                ) : null}
                <h3 className="text-foreground text-sm font-semibold">
                  {step.title}
                </h3>
                <p className="text-muted-foreground mt-1.5 text-sm">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
