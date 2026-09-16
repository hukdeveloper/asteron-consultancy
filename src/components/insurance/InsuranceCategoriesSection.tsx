import { createElement } from "react";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { resolveIcon } from "@/lib/icons";
import type { InsuranceService } from "@/types/content";

interface InsuranceCategoriesSectionProps {
  insuranceServices: InsuranceService[];
}

export function InsuranceCategoriesSection({
  insuranceServices,
}: InsuranceCategoriesSectionProps) {
  return (
    <Section aria-labelledby="insurance-categories-heading">
      <Container>
        <SectionHeading
          eyebrow="Insurance categories"
          heading="Choose the guidance that fits your situation"
          headingId="insurance-categories-heading"
          className="max-w-3xl"
        />

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {insuranceServices.map((insurance) => (
            <li key={insurance.id}>
              <div className="border-border/60 bg-background relative h-full overflow-hidden rounded-2xl border transition-shadow hover:shadow-md">
                <div className="from-surface-pale-blue to-surface-pale-mint relative flex h-20 items-center justify-center bg-gradient-to-br">
                  <span className="bg-background flex size-11 items-center justify-center rounded-full shadow-sm">
                    {createElement(resolveIcon(insurance.visualIcon), {
                      className: "text-brand-blue size-5",
                      strokeWidth: 1.5,
                    })}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-foreground text-base font-semibold">
                    <Link
                      href={`/insurance/${insurance.slug}`}
                      className="focus-visible:ring-ring rounded-sm outline-none after:absolute after:inset-0 focus-visible:ring-2"
                    >
                      {insurance.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground mt-1.5 text-sm">
                    {insurance.summary}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
