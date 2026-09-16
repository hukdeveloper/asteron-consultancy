import { createElement } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { resolveIcon } from "@/lib/icons";
import type { Service } from "@/types/content";

interface ServicesSectionProps {
  services: Service[];
}

/**
 * Asymmetric service composition (redesigned Phase 10) — one large
 * featured tile plus five compact supporting tiles, rather than a
 * repeating grid of identically-sized cards. Each tile's whole surface is
 * clickable via `after:absolute after:inset-0` on the title link, but the
 * link's accessible name stays just the service title (not the full
 * summary + "Learn more") — same pattern the original card grid used.
 * See docs/DECISIONS.md "Homepage Section Rhythm".
 */
export function ServicesSection({ services }: ServicesSectionProps) {
  const [featured, ...rest] = services;
  if (!featured) return null;

  return (
    <Section aria-labelledby="services-heading">
      <Container>
        <SectionHeading
          eyebrow="What we help with"
          heading="Main services"
          headingId="services-heading"
          description="End-to-end support across the parts of the process that matter most."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <div className="group from-brand-ink to-brand-teal relative flex flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-br p-7 sm:p-8 lg:col-span-2 lg:row-span-2 lg:min-h-80">
            {createElement(resolveIcon(featured.icon), {
              "aria-hidden": "true",
              className:
                "absolute top-7 right-7 size-24 text-white/10 transition-transform duration-300 group-hover:scale-110 sm:size-28",
              strokeWidth: 1,
            })}
            <span className="bg-brand-blue mb-5 flex size-11 shrink-0 items-center justify-center rounded-full text-white">
              {createElement(resolveIcon(featured.icon), {
                "aria-hidden": "true",
                className: "size-5",
              })}
            </span>
            <h3 className="text-xl font-semibold text-white sm:text-2xl">
              <Link
                href={`/services/${featured.slug}`}
                className="focus-visible:ring-ring rounded-sm outline-none after:absolute after:inset-0 focus-visible:ring-2"
              >
                {featured.title}
              </Link>
            </h3>
            <p className="mt-2 max-w-md text-sm text-white/80">
              {featured.summary}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-white">
              Learn more
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </div>

          {rest.map((service) => {
            const Icon = resolveIcon(service.icon);
            return (
              <div
                key={service.id}
                className="group border-border bg-card relative flex items-start gap-3.5 rounded-2xl border p-5 transition-shadow hover:shadow-md"
              >
                <span className="bg-secondary text-secondary-foreground flex size-9 shrink-0 items-center justify-center rounded-full">
                  <Icon aria-hidden="true" className="size-4.5" />
                </span>
                <div>
                  <h3 className="text-foreground text-sm font-semibold">
                    <Link
                      href={`/services/${service.slug}`}
                      className="focus-visible:ring-ring rounded-sm outline-none after:absolute after:inset-0 focus-visible:ring-2"
                    >
                      {service.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                    {service.summary}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8">
          <Link
            href="/services"
            className="text-foreground inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
          >
            Explore All Services
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
