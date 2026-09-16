import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { FaqItem } from "@/types/content";

interface FaqSectionProps {
  items: FaqItem[];
}

/** Homepage shows only the top priority questions — the rest live on /faq. */
const HOMEPAGE_FAQ_LIMIT = 5;

/**
 * The Accordion primitive (src/components/ui/accordion.tsx) is a Client
 * Component, but this section itself stays a Server Component — it just
 * renders the client subtree, the same pattern used for DropdownMenu/Sheet
 * elsewhere in the app.
 */
export function FaqSection({ items }: FaqSectionProps) {
  const priorityItems = items.slice(0, HOMEPAGE_FAQ_LIMIT);

  return (
    <Section className="bg-muted/40" aria-labelledby="faq-heading">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="Common questions"
          heading="Frequently asked questions"
          headingId="faq-heading"
          className="max-w-none"
        />

        <Accordion
          type="single"
          collapsible
          className="bg-card border-border mt-8 rounded-2xl border px-5"
        >
          {priorityItems.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-6">
          <Link
            href="/faq"
            className="text-foreground inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
          >
            View All FAQs
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
