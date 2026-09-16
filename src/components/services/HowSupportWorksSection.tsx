import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { KeyPointGrid } from "@/components/study-abroad/KeyPointGrid";
import type { KeyPoint } from "@/types/content";

interface HowSupportWorksSectionProps {
  items: KeyPoint[];
}

export function HowSupportWorksSection({ items }: HowSupportWorksSectionProps) {
  return (
    <Section aria-labelledby="how-support-works-heading">
      <Container>
        <SectionHeading
          eyebrow="How support works"
          heading="A practical, step-by-step approach"
          headingId="how-support-works-heading"
          className="max-w-3xl"
        />
        <KeyPointGrid items={items} className="mt-8" />
      </Container>
    </Section>
  );
}
