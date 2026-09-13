import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/shared/PageHeader";

export default function NotFound() {
  return (
    <Section className="py-16 sm:py-24">
      <Container className="max-w-2xl">
        <PageHeader
          eyebrow="404"
          heading="Page not found"
          description="The page you're looking for doesn't exist or may have moved."
        />
        <Button asChild className="mt-8">
          <Link href="/">Return home</Link>
        </Button>
      </Container>
    </Section>
  );
}
