import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { resolveIcon } from "@/lib/icons";
import type { Destination } from "@/types/content";

interface DestinationSelectorSectionProps {
  destinations: Destination[];
}

/**
 * Every destination is a plain server-rendered link — the selector works
 * fully without JavaScript. No client-side filtering: with only six
 * destinations, filtering wouldn't materially improve the experience.
 */
export function DestinationSelectorSection({
  destinations,
}: DestinationSelectorSectionProps) {
  return (
    <Section
      id="destinations"
      className="scroll-mt-20"
      aria-labelledby="destinations-heading"
    >
      <Container>
        <SectionHeading
          eyebrow="Destinations"
          heading="Compare study destinations"
          headingId="destinations-heading"
          description="Six destinations to start comparing — each page covers study levels, application steps, costs to plan for, and visa-document guidance."
          className="max-w-3xl"
        />

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => {
            const Icon = resolveIcon(destination.visualIcon);
            return (
              <li key={destination.id}>
                <div className="border-border/60 bg-background relative h-full overflow-hidden rounded-2xl border transition-shadow hover:shadow-md">
                  <div className="from-surface-pale-blue to-surface-pale-mint relative flex h-20 items-center justify-center bg-gradient-to-br">
                    <span className="bg-background flex size-11 items-center justify-center rounded-full shadow-sm">
                      <Icon
                        className="text-brand-blue size-5"
                        strokeWidth={1.5}
                      />
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{destination.region}</Badge>
                    </div>
                    <h3 className="text-foreground mt-2 text-base font-semibold">
                      <Link
                        href={`/study-abroad/${destination.slug}`}
                        className="focus-visible:ring-ring rounded-sm outline-none after:absolute after:inset-0 focus-visible:ring-2"
                      >
                        {destination.name}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground mt-1.5 text-sm">
                      {destination.heroDescription}
                    </p>
                    <p className="text-muted-foreground mt-3 text-xs font-medium tracking-wide">
                      {destination.studyLevels.join(" & ")}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
