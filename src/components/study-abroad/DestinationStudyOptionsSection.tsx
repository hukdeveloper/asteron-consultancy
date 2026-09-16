import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Badge } from "@/components/ui/badge";
import type { Destination } from "@/types/content";

interface DestinationStudyOptionsSectionProps {
  destination: Destination;
}

export function DestinationStudyOptionsSection({
  destination,
}: DestinationStudyOptionsSectionProps) {
  return (
    <Section
      className="bg-muted/50"
      aria-labelledby="destination-study-options-heading"
    >
      <Container>
        <SectionHeading
          eyebrow="Study options"
          heading="Study levels and popular subject areas"
          headingId="destination-study-options-heading"
          className="max-w-3xl"
        />

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="text-foreground text-sm font-semibold tracking-wide">
              Study levels available
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {destination.studyLevels.map((level) => (
                <li key={level}>
                  <Badge variant="secondary">{level}</Badge>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-foreground text-sm font-semibold tracking-wide">
              Popular subject areas
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {destination.popularSubjectAreas.map((subject) => (
                <li key={subject}>
                  <Badge variant="outline">{subject}</Badge>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground mt-3 text-sm">
              These categories are a general starting point, not a ranking —
              programme availability varies by institution.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
