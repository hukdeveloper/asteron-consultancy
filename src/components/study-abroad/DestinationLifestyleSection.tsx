import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { KeyPointGrid } from "@/components/study-abroad/KeyPointGrid";
import type { Destination } from "@/types/content";

interface DestinationLifestyleSectionProps {
  destination: Destination;
}

export function DestinationLifestyleSection({
  destination,
}: DestinationLifestyleSectionProps) {
  return (
    <Section className="bg-muted/50" aria-labelledby="student-life-heading">
      <Container>
        <SectionHeading
          eyebrow="Student life"
          heading="Work, lifestyle and planning notes"
          headingId="student-life-heading"
          className="max-w-3xl"
        />

        <p className="text-muted-foreground mt-4 max-w-3xl text-sm">
          {destination.workAndLifestyleNote}
        </p>

        <KeyPointGrid
          className="mt-6"
          columns={3}
          items={[
            {
              id: "language",
              title: "Language",
              description: destination.languageConsiderations,
            },
            {
              id: "lifestyle",
              title: "Lifestyle setting",
              description: destination.lifestyleSetting,
            },
            {
              id: "planning",
              title: "Planning note",
              description: destination.planningConsiderations,
            },
          ]}
        />
      </Container>
    </Section>
  );
}
