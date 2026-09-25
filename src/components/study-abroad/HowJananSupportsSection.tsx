import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { KeyPointGrid } from "@/components/study-abroad/KeyPointGrid";
import type { KeyPoint } from "@/types/content";

interface HowJananSupportsSectionProps {
  items: KeyPoint[];
}

export function HowJananSupportsSection({
  items,
}: HowJananSupportsSectionProps) {
  return (
    <Section className="bg-muted/50" aria-labelledby="how-we-support-heading">
      <Container>
        <SectionHeading
          eyebrow="How Janan supports the journey"
          heading="Guidance at each stage, not a guarantee of outcomes"
          headingId="how-we-support-heading"
          description="Admission and visa decisions are always made by institutions and government authorities — Janan helps you prepare and stay organised."
          className="max-w-3xl"
        />
        <KeyPointGrid items={items} className="mt-8" />
      </Container>
    </Section>
  );
}
