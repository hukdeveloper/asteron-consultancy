import { createElement } from "react";
import Link from "next/link";
import { Compass, FileText, Plane } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { ServiceCategoryInfo } from "@/content/services";
import type { Service } from "@/types/content";

interface ServiceCategoriesSectionProps {
  categories: ServiceCategoryInfo[];
  services: Service[];
}

/** No icon field on `ServiceCategoryInfo` yet — small local lookup for the 3 fixed categories rather than expanding the content model for a single presentational use. */
const CATEGORY_ICONS: Record<string, typeof Compass> = {
  "study-planning": Compass,
  "application-preparation": FileText,
  "journey-preparation": Plane,
};

/**
 * The site's single "browse services" section — previously paired with a
 * separate, fully redundant flat grid of all 7 services below it
 * (`ServiceCardGrid`, now unused/removed from this page). Since every
 * service already appears here under its category, showing the same 7
 * titles again immediately below added length without adding
 * information — see docs/DECISIONS.md "Visual Language Reset, Phase B".
 * Each category is now a richer, icon-led panel rather than a plain
 * bordered card, and links use each service's full `title` (not
 * `shortTitle`) so the accessible link name matches the rest of the site.
 */
export function ServiceCategoriesSection({
  categories,
  services,
}: ServiceCategoriesSectionProps) {
  return (
    <Section aria-labelledby="service-categories-heading">
      <Container>
        <SectionHeading
          eyebrow="How services are organised"
          heading="Every service, by category"
          headingId="service-categories-heading"
          className="max-w-3xl"
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {categories.map((category) => {
            const members = services.filter(
              (service) => service.category === category.id,
            );
            const Icon = CATEGORY_ICONS[category.id] ?? Compass;
            return (
              <div
                key={category.id}
                className="bg-surface-pale-blue rounded-3xl p-6"
              >
                <span className="bg-background text-brand-blue flex size-11 items-center justify-center rounded-full shadow-sm">
                  {createElement(Icon, {
                    "aria-hidden": "true",
                    className: "size-5",
                  })}
                </span>
                <h3 className="text-foreground mt-4 text-base font-semibold">
                  {category.label}
                </h3>
                <p className="text-muted-foreground mt-1.5 text-sm">
                  {category.description}
                </p>
                <ul className="border-border/60 mt-4 space-y-2.5 border-t pt-4">
                  {members.map((service) => (
                    <li key={service.id}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="text-foreground focus-visible:ring-ring hover:text-brand-blue rounded-sm text-sm font-medium outline-none hover:underline focus-visible:ring-2"
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
                  {category.id === "journey-preparation" ? (
                    <li>
                      <Link
                        href="/insurance"
                        className="text-foreground focus-visible:ring-ring hover:text-brand-blue rounded-sm text-sm font-medium outline-none hover:underline focus-visible:ring-2"
                      >
                        Insurance Guidance
                      </Link>
                    </li>
                  ) : null}
                </ul>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
