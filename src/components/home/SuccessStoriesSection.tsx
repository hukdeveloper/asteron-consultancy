import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SampleContentBadge } from "@/components/shared/SampleContentBadge";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { SuccessStoryDemo } from "@/types/content";

interface SuccessStoriesSectionProps {
  stories: SuccessStoryDemo[];
}

/**
 * One elegant, compact placeholder panel (redesigned Phase 10B) rather
 * than several demo story cards — real, verified student stories will
 * replace this once available, with permission. Still shows a single
 * representative example so the intended structure is visible, but
 * doesn't repeat the pattern three times.
 */
export function SuccessStoriesSection({ stories }: SuccessStoriesSectionProps) {
  const [example] = stories;

  return (
    <Section className="bg-muted/40" aria-labelledby="success-stories-heading">
      <Container className="max-w-3xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <SectionHeading
            eyebrow="Student journeys"
            heading="Success stories"
            headingId="success-stories-heading"
            className="max-w-2xl"
          />
          <SampleContentBadge label="Demo content" />
        </div>

        <p className="text-muted-foreground mt-4 text-sm">
          Verified student stories will be added here with permission — until
          then, here is one example of the kind of journey we hope to share.
        </p>

        {example ? (
          <div className="bg-card border-border mt-6 rounded-2xl border p-7">
            <Quote aria-hidden="true" className="text-brand-teal size-6" />
            <p className="text-foreground mt-3 text-lg italic">
              “{example.quote}”
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="bg-secondary text-secondary-foreground flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
                {example.initials}
              </span>
              <p className="text-muted-foreground text-sm">
                {example.destinationName}
              </p>
            </div>
          </div>
        ) : null}

        <Link
          href="/success-stories"
          className="text-foreground mt-6 inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
        >
          Read More Stories
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </Container>
    </Section>
  );
}
