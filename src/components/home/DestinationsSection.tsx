import { createElement } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { resolveIcon } from "@/lib/icons";
import type { Destination } from "@/types/content";

interface DestinationsSectionProps {
  destinations: Destination[];
}

/**
 * Image-led destination gallery (redesigned Phase 10B) — one large
 * featured destination plus smaller tiles, not a uniform 6-card grid. No
 * photography exists yet (see docs/MEDIA_ATTRIBUTIONS.md), so each tile
 * uses a distinct-icon gradient panel as its visual, scaled to its tile
 * size rather than repeating identically.
 */
export function DestinationsSection({
  destinations,
}: DestinationsSectionProps) {
  const [featured, ...rest] = destinations;
  if (!featured) return null;
  const FeaturedIcon = resolveIcon(featured.visualIcon);

  return (
    <Section aria-labelledby="destinations-heading">
      <Container>
        <SectionHeading
          eyebrow="Where you could study"
          heading="Popular study destinations"
          headingId="destinations-heading"
          description="A starting point for exploring where your studies could take you."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <Link
            href={`/study-abroad/${featured.slug}`}
            aria-label={featured.name}
            className="group from-brand-blue to-brand-teal focus-visible:ring-brand-blue relative flex min-h-64 flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-br p-6 outline-none focus-visible:ring-2 lg:col-span-2 lg:row-span-2"
          >
            {createElement(FeaturedIcon, {
              "aria-hidden": "true",
              className:
                "absolute top-6 right-6 size-20 text-white/15 transition-transform duration-300 group-hover:scale-110",
              strokeWidth: 1,
            })}
            <span className="text-xl font-semibold text-white">
              {featured.name}
            </span>
            <span className="mt-1 text-sm text-white/80">
              {featured.studyLevels.join(" & ")}
            </span>
          </Link>

          {rest.map((destination) => {
            const Icon = resolveIcon(destination.visualIcon);
            return (
              <Link
                key={destination.id}
                href={`/study-abroad/${destination.slug}`}
                aria-label={destination.name}
                className="group border-border bg-card focus-visible:ring-brand-blue relative flex items-center gap-4 rounded-2xl border p-4 transition-shadow outline-none hover:shadow-md focus-visible:ring-2"
              >
                <span className="from-brand-blue to-brand-teal flex size-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br">
                  <Icon
                    aria-hidden="true"
                    className="size-6 text-white"
                    strokeWidth={1.5}
                  />
                </span>
                <div>
                  <p className="text-foreground text-sm font-semibold">
                    {destination.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {destination.studyLevels.join(" & ")}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8">
          <Link
            href="/study-abroad"
            className="text-foreground inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
          >
            View All Destinations
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
