import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

/**
 * Asymmetric editorial introduction to Study Abroad (new, Phase 10B — see
 * docs/DECISIONS.md "Visual Language Reset"). A short, single-purpose
 * section rather than another card grid: one heading, one short
 * paragraph, and two compact pathway links, on a light pale-blue surface.
 */
export function StudyAbroadIntroSection() {
  return (
    <Section
      className="bg-surface-pale-blue"
      aria-labelledby="study-intro-heading"
    >
      <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h2
            id="study-intro-heading"
            className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            A clearer way to plan your study abroad journey.
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg text-base">
            From choosing a destination to preparing your application, we help
            you make sense of the options — one honest conversation at a time.
          </p>
          <Link
            href="/check-eligibility"
            className="text-brand-blue mt-6 inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
          >
            Check Your Eligibility
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/study-abroad/undergraduate"
            className="group border-border bg-card focus-visible:ring-brand-blue relative flex flex-col justify-between gap-6 rounded-2xl border p-6 transition-shadow outline-none hover:shadow-md focus-visible:ring-2"
          >
            <GraduationCap
              aria-hidden="true"
              className="text-brand-blue size-7"
            />
            <span className="text-foreground font-semibold">Undergraduate</span>
          </Link>
          <Link
            href="/study-abroad/postgraduate"
            className="group border-border bg-card focus-visible:ring-brand-blue relative flex flex-col justify-between gap-6 rounded-2xl border p-6 transition-shadow outline-none hover:shadow-md focus-visible:ring-2"
          >
            <GraduationCap
              aria-hidden="true"
              className="text-brand-blue size-7"
            />
            <span className="text-foreground font-semibold">Postgraduate</span>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
