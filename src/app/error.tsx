"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/shared/PageHeader";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section className="py-16 sm:py-24">
      <Container className="max-w-2xl">
        <PageHeader
          eyebrow="Error"
          heading="Something went wrong"
          description="An unexpected error occurred while loading this page. You can try again, or come back later."
        />
        <Button className="mt-8" onClick={() => retry()}>
          Try again
        </Button>
      </Container>
    </Section>
  );
}
