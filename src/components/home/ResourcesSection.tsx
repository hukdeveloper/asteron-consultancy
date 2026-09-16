import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { ResourceSummary } from "@/types/content";

interface ResourcesSectionProps {
  resources: ResourceSummary[];
}

/**
 * Editorial resource cards (redesigned Phase 10B) — one larger featured
 * article plus smaller supporting cards, not three identical cards.
 */
export function ResourcesSection({ resources }: ResourcesSectionProps) {
  const [featured, ...rest] = resources;
  if (!featured) return null;

  return (
    <Section aria-labelledby="resources-heading">
      <Container>
        <SectionHeading
          eyebrow="Learn more"
          heading="Resources and guides"
          headingId="resources-heading"
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <div className="border-border bg-card relative flex flex-col gap-4 rounded-2xl border p-7 lg:col-span-2">
            <BookOpen aria-hidden="true" className="text-brand-blue size-7" />
            <div>
              <h3 className="text-foreground text-xl font-semibold">
                <Link
                  href={`/resources/${featured.slug}`}
                  className="focus-visible:ring-ring rounded-sm outline-none after:absolute after:inset-0 focus-visible:ring-2"
                >
                  {featured.title}
                </Link>
              </h3>
              <p className="text-muted-foreground mt-2 max-w-lg text-sm">
                {featured.summary}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {rest.map((resource) => (
              <div
                key={resource.id}
                className="border-border bg-card relative flex-1 rounded-2xl border p-5"
              >
                <h3 className="text-foreground text-sm font-semibold">
                  <Link
                    href={`/resources/${resource.slug}`}
                    className="focus-visible:ring-ring rounded-sm outline-none after:absolute after:inset-0 focus-visible:ring-2"
                  >
                    {resource.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">
                  {resource.summary}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/resources"
            className="text-foreground inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
          >
            Explore All Resources
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
