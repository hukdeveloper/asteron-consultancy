import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { KeyPointGrid } from "@/components/study-abroad/KeyPointGrid";
import type { KeyPoint } from "@/types/content";

interface ScopeLimitationsSectionProps {
  items: KeyPoint[];
}

/** Honest, upfront statement of what Janan does not control or guarantee — required by the phase brief, not an afterthought footnote. */
export function ScopeLimitationsSection({
  items,
}: ScopeLimitationsSectionProps) {
  return (
    <Section
      className="bg-muted/50"
      aria-labelledby="scope-limitations-heading"
    >
      <Container>
        <SectionHeading
          eyebrow="Honest about scope"
          heading="What we don't control or guarantee"
          headingId="scope-limitations-heading"
          description="Janan helps you prepare and stay organised — final decisions always rest with institutions, funding bodies and government authorities."
          className="max-w-3xl"
        />
        <KeyPointGrid items={items} columns={2} className="mt-8" />
      </Container>
    </Section>
  );
}
