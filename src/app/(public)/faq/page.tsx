import type { Metadata } from "next";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { DetailHero } from "@/components/shared/DetailHero";
import { JsonLd } from "@/components/shared/JsonLd";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getFaqCategories } from "@/lib/content/faq";
import { getSiteContent } from "@/lib/content/site";
import { env } from "@/lib/env";
import {
  buildBreadcrumbListJsonLd,
  buildFaqPageJsonLd,
} from "@/lib/structuredData";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContent();
  const title = "FAQ";
  const description =
    "Answers to common questions about study abroad, applications, visas, scholarships, insurance, accommodation and consultations.";

  return {
    title,
    description,
    alternates: { canonical: "/faq" },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: `${env.siteUrl}/faq`,
      siteName: site.name,
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}

export default async function FaqPage() {
  const [categories, site] = await Promise.all([
    getFaqCategories(),
    getSiteContent(),
  ]);
  const allItems = categories.flatMap((category) => category.items);

  return (
    <>
      <JsonLd data={buildBreadcrumbListJsonLd([{ label: "FAQ" }])} />
      <JsonLd data={buildFaqPageJsonLd(allItems)} />

      <DetailHero
        breadcrumbItems={[{ label: "FAQ" }]}
        heading="Frequently Asked Questions"
        description="Honest answers, organised by topic. If you can't find what you're looking for, contact us directly."
        primaryCta={{
          label: "Book Free Consultation",
          href: "/book-consultation",
        }}
        secondaryCta={{ label: "Contact Us", href: "/contact" }}
        icons={["HelpCircle", "MessageCircle", "FileQuestion"]}
      />

      <Section className="pt-0">
        <Container className="max-w-3xl">
          <nav
            aria-label="FAQ categories"
            className="mt-6 flex flex-wrap gap-2"
          >
            {categories.map((category) => (
              <a
                key={category.id}
                href={`#faq-${category.id}`}
                className="border-border text-foreground hover:bg-muted focus-visible:ring-ring rounded-full border px-3 py-1.5 text-sm font-medium outline-none focus-visible:ring-2"
              >
                {category.label}
              </a>
            ))}
          </nav>
        </Container>
      </Section>

      {categories.map((category, index) => (
        <Section
          key={category.id}
          id={`faq-${category.id}`}
          className={`scroll-mt-20 ${index % 2 === 1 ? "bg-muted/50" : ""}`}
          aria-labelledby={`faq-${category.id}-heading`}
        >
          <Container className="max-w-3xl">
            <SectionHeading
              heading={category.label}
              headingId={`faq-${category.id}-heading`}
            />
            <Accordion
              type="single"
              collapsible
              className="bg-card border-border mt-6 rounded-2xl border px-5"
            >
              {category.items.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Container>
        </Section>
      ))}

      <FinalCtaSection
        cta={{
          heading: "Still have questions?",
          description: "Book a free consultation and ask us directly.",
          primaryCta: {
            label: "Book Free Consultation",
            href: "/book-consultation",
          },
          secondaryCta: { label: "Contact Us", href: "/contact" },
        }}
        contact={site.contact}
      />
    </>
  );
}
