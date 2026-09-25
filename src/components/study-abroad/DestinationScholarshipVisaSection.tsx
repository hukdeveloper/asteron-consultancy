import { AlertCircle } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { Destination } from "@/types/content";

interface DestinationScholarshipVisaSectionProps {
  destination: Destination;
}

export function DestinationScholarshipVisaSection({
  destination,
}: DestinationScholarshipVisaSectionProps) {
  return (
    <Section aria-labelledby="scholarship-visa-heading">
      <Container>
        <SectionHeading
          eyebrow="Scholarships and visas"
          heading="Scholarship and visa-document guidance"
          headingId="scholarship-visa-heading"
          className="max-w-3xl"
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="bg-card border-border rounded-xl border p-5">
            <h3 className="text-foreground text-base font-semibold">
              Scholarship guidance
            </h3>
            <p className="text-muted-foreground mt-2 text-sm">
              {destination.scholarshipGuidance}
            </p>
          </div>

          <div className="bg-card border-border rounded-xl border p-5">
            <h3 className="text-foreground text-base font-semibold">
              Visa guidance
            </h3>
            <p className="text-muted-foreground mt-2 text-sm">
              {destination.visaGuidance}
            </p>
          </div>
        </div>

        <div className="border-border bg-muted/60 mt-6 flex gap-3 rounded-xl border p-4">
          <AlertCircle
            aria-hidden="true"
            className="text-muted-foreground mt-0.5 size-5 shrink-0"
          />
          <p className="text-muted-foreground text-sm">
            Visa and scholarship requirements are set and updated by governments
            and institutions, not by Janan, and can change without notice. Janan
            does not guarantee admission, visa approval or any scholarship
            outcome — always confirm current requirements directly with the
            relevant official source.
          </p>
        </div>
      </Container>
    </Section>
  );
}
