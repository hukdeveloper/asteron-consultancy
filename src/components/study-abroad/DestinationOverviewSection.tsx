import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { KeyPointGrid } from "@/components/study-abroad/KeyPointGrid";
import type { Destination } from "@/types/content";

interface DestinationOverviewSectionProps {
  destination: Destination;
}

export function DestinationOverviewSection({
  destination,
}: DestinationOverviewSectionProps) {
  return (
    <Section aria-labelledby="destination-overview-heading">
      <Container>
        <SectionHeading
          eyebrow="Overview"
          heading={`Why consider ${destination.name}?`}
          headingId="destination-overview-heading"
          className="max-w-3xl"
        />
        <p className="text-muted-foreground mt-4 max-w-3xl text-base">
          {destination.overview}
        </p>

        <KeyPointGrid items={destination.highlights} className="mt-8" />
      </Container>
    </Section>
  );
}
