import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { ContactInfo, FinalCtaContent } from "@/types/content";

interface FinalCtaSectionProps {
  cta: FinalCtaContent;
  contact: ContactInfo;
}

/**
 * Full-width closing band on a bold brand-blue gradient — deliberately the
 * boldest moment on the page (brief: "bold, memorable"), and a break from
 * the run of plain-white sections above it (Success stories / Resources /
 * FAQ). Uses blue rather than ink specifically so it stays visually
 * distinct from the ink footer that immediately follows it — two
 * back-to-back near-black sections would read as one undifferentiated
 * block instead of a deliberate closing moment.
 */
export function FinalCtaSection({ cta, contact }: FinalCtaSectionProps) {
  const whatsappHref = `https://wa.me/${contact.whatsapp.replace(/[^\d]/g, "")}`;

  return (
    <Section
      aria-labelledby="final-cta-heading"
      className="from-brand-blue to-brand-blue-dark relative overflow-hidden bg-gradient-to-br"
    >
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 size-64 rounded-full border-[3px] border-white/20 opacity-60 sm:size-80"
      />
      <div
        aria-hidden="true"
        className="bg-brand-teal/25 absolute -bottom-20 -left-20 size-56 rounded-full blur-2xl"
      />

      <Container className="relative max-w-2xl text-center">
        <h2
          id="final-cta-heading"
          className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
        >
          {cta.heading}
        </h2>
        <p className="mt-3 text-base text-white/75 sm:text-lg">
          {cta.description}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="text-brand-blue-dark bg-white hover:bg-white/90"
          >
            <Link href={cta.primaryCta.href}>{cta.primaryCta.label}</Link>
          </Button>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="border-border/0 bg-white/10 text-white hover:bg-white/20"
          >
            <Link href={cta.secondaryCta.href}>{cta.secondaryCta.label}</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="text-white hover:bg-white/10 hover:text-white"
          >
            <a href={whatsappHref} target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" className="size-4" />
              Chat on WhatsApp
            </a>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
