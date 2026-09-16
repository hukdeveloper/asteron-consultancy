import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { resolveIcon } from "@/lib/icons";
import type { Service } from "@/types/content";

interface RelatedServicesSectionProps {
  services: Service[];
  headingId?: string;
}

export function RelatedServicesSection({
  services,
  headingId = "related-services-heading",
}: RelatedServicesSectionProps) {
  if (services.length === 0) return null;

  return (
    <Section aria-labelledby={headingId}>
      <Container>
        <SectionHeading
          eyebrow="How we can help"
          heading="Related services"
          headingId={headingId}
          className="max-w-3xl"
        />

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = resolveIcon(service.icon);
            return (
              <li key={service.id}>
                <Card className="relative h-full transition-shadow focus-within:shadow-md hover:shadow-md">
                  <CardContent className="flex items-start gap-3">
                    <Icon
                      aria-hidden="true"
                      className="text-brand-teal-text mt-0.5 size-5 shrink-0"
                    />
                    <div>
                      <h3 className="text-foreground text-sm font-semibold">
                        <Link
                          href={`/services/${service.slug}`}
                          className="focus-visible:ring-ring rounded-sm outline-none after:absolute after:inset-0 focus-visible:ring-2"
                        >
                          {service.title}
                        </Link>
                      </h3>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {service.summary}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
