import Link from "next/link";
import { AlertCircle } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";

interface HubVisaGuidanceSectionProps {
  intro: string;
}

export function HubVisaGuidanceSection({ intro }: HubVisaGuidanceSectionProps) {
  return (
    <Section aria-labelledby="visa-guidance-heading">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="Visa and documents"
          heading="Visa-document guidance"
          headingId="visa-guidance-heading"
        />
        <p className="text-muted-foreground mt-4 text-base">{intro}</p>

        <div className="border-border bg-muted/60 mt-6 flex gap-3 rounded-xl border p-4">
          <AlertCircle
            aria-hidden="true"
            className="text-muted-foreground mt-0.5 size-5 shrink-0"
          />
          <p className="text-muted-foreground text-sm">
            Janan is not an immigration authority and does not decide visa
            outcomes. Each destination page links to the relevant official
            government source for current, binding requirements.
          </p>
        </div>

        <Button asChild className="mt-6">
          <Link href="/services/visa-guidance">
            Explore Visa Guidance Support
          </Link>
        </Button>
      </Container>
    </Section>
  );
}
