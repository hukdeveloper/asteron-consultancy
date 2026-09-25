import Link from "next/link";
import { Check, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { InsuranceHighlight } from "@/types/content";

interface InsuranceSectionProps {
  highlights: InsuranceHighlight[];
  disclaimer: string;
}

/**
 * Clean, light split section (redesigned Phase 10B — replaces the earlier
 * dark navy card grid, explicitly rejected: "Do not use a dark navy card
 * grid"). Pale-mint surface, a large soft shield motif standing in for
 * photography, and a concise icon-led checklist — three coverage
 * categories, not six. Must never imply Janan is the insurer — see the
 * required disclaimer, sourced from src/content/home.ts, not hardcoded
 * here.
 */
export function InsuranceSection({
  highlights,
  disclaimer,
}: InsuranceSectionProps) {
  const categories = highlights.slice(0, 3);

  return (
    <Section
      className="bg-surface-pale-mint relative overflow-hidden"
      aria-labelledby="insurance-heading"
    >
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="relative flex aspect-square max-w-sm items-center justify-center">
          <div
            aria-hidden="true"
            className="border-brand-teal/25 absolute inset-6 rounded-full border-[3px]"
          />
          <div
            aria-hidden="true"
            className="bg-card flex size-28 items-center justify-center rounded-full shadow-sm"
          >
            <ShieldCheck
              aria-hidden="true"
              className="text-brand-teal size-14"
              strokeWidth={1.25}
            />
          </div>
        </div>

        <div>
          <p className="text-brand-teal-text text-sm font-semibold tracking-wide">
            Insurance services
          </p>
          <h2
            id="insurance-heading"
            className="text-foreground mt-2 text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Student and travel insurance guidance
          </h2>
          <p className="text-muted-foreground mt-3 max-w-md text-sm">
            A separate, clearly labelled service — not bundled quietly into
            general advice.
          </p>

          <ul className="mt-6 space-y-3">
            {categories.map((highlight) => (
              <li key={highlight.id} className="flex items-start gap-3">
                <span className="bg-card mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full shadow-sm">
                  <Check
                    aria-hidden="true"
                    className="text-brand-teal size-3.5"
                  />
                </span>
                <div>
                  <p className="text-foreground text-sm font-semibold">
                    {highlight.title}
                  </p>
                  <p className="text-muted-foreground mt-0.5 text-sm">
                    {highlight.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-7">
            <Button asChild variant="accent">
              <Link href="/insurance-quote">Request an Insurance Quote</Link>
            </Button>
          </div>

          <p className="text-muted-foreground mt-5 max-w-md text-xs">
            {disclaimer}
          </p>
        </div>
      </Container>
    </Section>
  );
}
