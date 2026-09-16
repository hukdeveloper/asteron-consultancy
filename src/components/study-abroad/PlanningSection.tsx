import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { KeyPointGrid } from "@/components/study-abroad/KeyPointGrid";
import type { Destination, KeyPoint } from "@/types/content";

interface PlanningSectionProps {
  destination: Destination;
  costPlanningCategories: KeyPoint[];
}

export function PlanningSection({
  destination,
  costPlanningCategories,
}: PlanningSectionProps) {
  return (
    <Section className="bg-muted/50" aria-labelledby="planning-heading">
      <Container>
        <SectionHeading
          eyebrow="Planning"
          heading="Intakes and cost planning"
          headingId="planning-heading"
          className="max-w-3xl"
        />

        <div className="mt-8">
          <h3 className="text-foreground text-sm font-semibold tracking-wide">
            Typical intakes
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {destination.typicalIntakes.map((intake) => (
              <li key={intake}>
                <Badge variant="secondary">{intake}</Badge>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground mt-2 text-sm">
            Intake months are a general guide — confirm exact dates and
            deadlines with each institution.
          </p>
        </div>

        <div className="mt-10">
          <h3 className="text-foreground text-sm font-semibold tracking-wide">
            Cost-planning categories
          </h3>
          <p className="text-muted-foreground mt-2 max-w-3xl text-sm">
            {destination.generalCostGuidance}
          </p>
          <KeyPointGrid items={costPlanningCategories} className="mt-5" />
        </div>
      </Container>
    </Section>
  );
}
