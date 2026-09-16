import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { StudyAbroadProcessStep } from "@/types/content";

interface ApplicationJourneySectionProps {
  steps: StudyAbroadProcessStep[];
  /** Short destination-specific note shown alongside the shared, general sequence. */
  destinationNote?: string;
  headingId?: string;
}

/**
 * Connected-journey process visualization, matching the homepage's
 * `HowItWorksSection` grammar (a route line linking numbered steps)
 * instead of the plain bordered-box grid this used before — see
 * docs/DECISIONS.md "Visual Language Reset, Phase B".
 */
export function ApplicationJourneySection({
  steps,
  destinationNote,
  headingId = "application-journey-heading",
}: ApplicationJourneySectionProps) {
  return (
    <Section aria-labelledby={headingId} className="bg-muted/40">
      <Container>
        <SectionHeading
          eyebrow="Application journey"
          heading="A general application process"
          headingId={headingId}
          description="Every institution and destination has its own specific process — this is a general sequence to help you plan."
          className="max-w-3xl"
        />

        <ol className="relative mt-12 grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-5">
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

        {destinationNote ? (
          <p className="text-muted-foreground mt-8 max-w-3xl text-sm">
            {destinationNote}
          </p>
        ) : null}
      </Container>
    </Section>
  );
}
