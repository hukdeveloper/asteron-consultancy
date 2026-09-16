import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { KeyPointGrid } from "@/components/study-abroad/KeyPointGrid";
import type { KeyPoint } from "@/types/content";

interface ParentReassuranceSectionProps {
  items: KeyPoint[];
}

export function ParentReassuranceSection({
  items,
}: ParentReassuranceSectionProps) {
  return (
    <Section
      className="bg-muted/50"
      aria-labelledby="parent-reassurance-heading"
    >
      <Container>
        <SectionHeading
          eyebrow="For parents and families"
          heading="Supporting the whole family through the decision"
          headingId="parent-reassurance-heading"
          description="Choosing to study abroad is a family decision as much as a personal one — here's what to expect from working with us."
          className="max-w-3xl"
        />
        <KeyPointGrid items={items} columns={2} className="mt-8" />
      </Container>
    </Section>
  );
}
