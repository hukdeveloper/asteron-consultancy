import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { ProcessStep } from "@/types/content";

interface HowItWorksSectionProps {
  steps: ProcessStep[];
}

/**
 * Connected-journey process visualization (redesigned Phase 10) — a
 * horizontal route line linking numbered steps on desktop, collapsing to
 * a vertical connected line on mobile, rather than a plain grid of boxed
 * text. The line is purely decorative (`aria-hidden`); the step order and
 * relationships are still conveyed by the semantic `<ol>` for anyone not
 * seeing the line. See docs/DECISIONS.md "Homepage Section Rhythm".
 */
export function HowItWorksSection({ steps }: HowItWorksSectionProps) {
  return (
    <Section aria-labelledby="how-it-works-heading" className="bg-muted/40">
      <Container>
        <SectionHeading
          eyebrow="The process"
          heading="How it works"
          headingId="how-it-works-heading"
          description="A clear, guided journey from first conversation to departure."
        />

        <ol className="relative mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Decorative connecting line — desktop: horizontal per row; mobile: vertical, handled by the per-item line below. */}
          <div
            aria-hidden="true"
            className="border-border absolute inset-x-0 top-5 hidden border-t border-dashed lg:block"
          />

          {steps.map((step, index) => (
            <li key={step.id} className="relative pl-14 sm:pl-0">
              <div className="sm:flex sm:flex-col sm:items-start">
                <span className="bg-brand-ink text-primary-foreground border-brand-soft-white absolute top-0 left-0 flex size-10 items-center justify-center rounded-full border-4 text-sm font-semibold sm:relative sm:mb-4">
                  {step.step}
                </span>
                {index < steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="border-border absolute top-10 left-5 h-[calc(100%+1.5rem)] border-l border-dashed sm:hidden"
                  />
                ) : null}
                <h3 className="text-foreground text-base font-semibold">
                  {step.title}
                </h3>
                <p className="text-muted-foreground mt-1.5 text-sm">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="text-muted-foreground mt-10 max-w-2xl text-sm">
          Admission and visa decisions are made by the relevant institutions and
          government authorities — our role is to guide you through each step,
          not to make those decisions on their behalf.
        </p>
      </Container>
    </Section>
  );
}
