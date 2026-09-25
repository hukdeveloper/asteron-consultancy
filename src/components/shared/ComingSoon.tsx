import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { PageHeader } from "@/components/shared/PageHeader";

interface ComingSoonProps {
  /** Page title — used as both the h1 and the breadcrumb's current item. */
  title: string;
}

/**
 * Shared placeholder for planned routes that don't have real content yet
 * (docs/IMPLEMENTATION_PLAN.md Track 1, Phase 3). Every stub page under
 * src/app/(public)/* renders this instead of duplicating placeholder
 * markup per route.
 */
export function ComingSoon({ title }: ComingSoonProps) {
  return (
    <Section className="py-12 sm:py-16">
      <Container className="max-w-2xl">
        <Breadcrumbs items={[{ label: title }]} className="mb-6" />
        <PageHeader
          heading={title}
          description="This page is coming in a later phase of the Janan Consultancy website. In the meantime, get in touch and we'll help directly."
        />
        <Button asChild className="mt-8">
          <Link href="/book-consultation">Book a Free Consultation</Link>
        </Button>
      </Container>
    </Section>
  );
}
