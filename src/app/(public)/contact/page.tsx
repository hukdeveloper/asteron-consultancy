import { createElement } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { JsonLd } from "@/components/shared/JsonLd";
import { NoticeCallout } from "@/components/shared/NoticeCallout";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getContactMethods,
  getContactPageContent,
  getOfficeLocation,
} from "@/lib/content/contact";
import { getSiteContent } from "@/lib/content/site";
import { resolveIcon } from "@/lib/icons";
import { env } from "@/lib/env";
import { buildBreadcrumbListJsonLd } from "@/lib/structuredData";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContent();
  const title = "Contact";
  const description =
    "Get in touch by phone, email or WhatsApp, or book a free consultation.";

  return {
    title,
    description,
    alternates: { canonical: "/contact" },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: `${env.siteUrl}/contact`,
      siteName: site.name,
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}

const METHOD_ICON = {
  phone: "Phone",
  email: "Mail",
  whatsapp: "MessageCircle",
} as const;

export default async function ContactPage() {
  const [methods, office, content, site] = await Promise.all([
    getContactMethods(),
    getOfficeLocation(),
    getContactPageContent(),
    getSiteContent(),
  ]);

  return (
    <>
      <JsonLd data={buildBreadcrumbListJsonLd([{ label: "Contact" }])} />

      <Section>
        <Container className="max-w-3xl">
          <Breadcrumbs items={[{ label: "Contact" }]} className="mb-6" />
          <PageHeader heading="Contact" description={content.intro} />
          <NoticeCallout className="mt-6">
            {content.temporaryValuesNote}
          </NoticeCallout>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="accent" size="lg">
              <Link href="/book-consultation">Book Free Consultation</Link>
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="bg-muted/50">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div>
              <SectionHeading
                eyebrow="Reach us directly"
                heading="Contact details"
              />
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {methods.map((method) => (
                  <li key={method.id}>
                    <Card className="h-full">
                      <CardContent className="flex items-start gap-3">
                        {createElement(resolveIcon(METHOD_ICON[method.type]), {
                          "aria-hidden": "true",
                          className:
                            "text-brand-teal-text mt-0.5 size-5 shrink-0",
                        })}
                        <div>
                          <p className="text-foreground text-sm font-semibold">
                            {method.label}
                          </p>
                          <a
                            href={method.href}
                            className="text-muted-foreground text-sm hover:underline"
                          >
                            {method.value}
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  </li>
                ))}
              </ul>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin
                    aria-hidden="true"
                    className="text-brand-teal-text mt-0.5 size-5 shrink-0"
                  />
                  <div>
                    <p className="text-foreground text-sm font-semibold">
                      {office.label}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {office.addressLine}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  {content.officeHoursPlaceholder}
                </p>
              </div>

              <div
                aria-hidden="true"
                className="border-border bg-card mt-6 flex h-40 items-center justify-center rounded-xl border border-dashed"
              >
                <p className="text-muted-foreground text-sm">
                  Map placeholder — {content.mapPlaceholderNote}
                </p>
              </div>
            </div>

            <div>
              <SectionHeading eyebrow="Send a message" heading="Contact form" />
              <div className="mt-6">
                <ContactForm contact={site.contact} />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
