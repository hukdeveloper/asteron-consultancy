import Link from "next/link";
import { Award, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { ScholarshipHighlight } from "@/types/content";

interface ScholarshipSectionProps {
  highlights: ScholarshipHighlight[];
}

/** Homepage shows only the top 3 highlights as a compact checklist — the full list lives on /scholarships. */
const HOMEPAGE_HIGHLIGHT_LIMIT = 3;

/**
 * Warm, image-led horizontal feature (Phase 10B visual reset) — replaces
 * the earlier neutral-grey "icon + 4-card grid" layout, which read as just
 * another repeated card grid. No real photography is available yet (see
 * docs/DECISIONS.md), so the visual side is an original warm-toned
 * composition rather than a stock photo.
 */
export function ScholarshipSection({ highlights }: ScholarshipSectionProps) {
  const priorityHighlights = highlights.slice(0, HOMEPAGE_HIGHLIGHT_LIMIT);

  return (
    <Section className="bg-surface-warm" aria-labelledby="scholarships-heading">
      <Container className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div
          aria-hidden="true"
          className="border-border/50 from-brand-coral/15 relative aspect-4/3 overflow-hidden rounded-3xl border bg-gradient-to-br to-white"
        >
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,122,89,0.35) 1.5px, transparent 1.5px)",
              backgroundSize: "22px 22px",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-brand-coral flex size-24 items-center justify-center rounded-full text-white shadow-lg">
              <Award aria-hidden="true" className="size-11" />
            </span>
          </div>
        </div>

        <div>
          <SectionHeading
            className="max-w-none"
            eyebrow="Funding your studies"
            heading="Scholarship guidance"
            headingId="scholarships-heading"
            description="We can't promise a scholarship will be secured, but we help you find realistic opportunities and put together the strongest possible case."
          />

          <ul className="mt-6 space-y-3">
            {priorityHighlights.map((highlight) => (
              <li key={highlight.id} className="flex items-start gap-2.5">
                <CheckCircle2
                  aria-hidden="true"
                  className="text-brand-teal mt-0.5 size-5 shrink-0"
                />
                <span className="text-foreground text-sm font-medium">
                  {highlight.title}
                </span>
              </li>
            ))}
          </ul>

          <Button asChild variant="accent" className="mt-7">
            <Link href="/scholarships">Explore Scholarship Guidance</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
