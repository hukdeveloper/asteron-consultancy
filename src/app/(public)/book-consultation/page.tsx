import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageHeader } from "@/components/shared/PageHeader";
import { ConsultationForm } from "@/components/consultation/ConsultationForm";
import { getSiteContent } from "@/lib/content/site";
import { env } from "@/lib/env";
import { buildBreadcrumbListJsonLd } from "@/lib/structuredData";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContent();
  const title = "Book a Consultation";
  const description =
    "Request a free consultation with Janan. This is a development demo form — it is not yet connected to a submission service.";

  return {
    title,
    description,
    alternates: { canonical: "/book-consultation" },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: `${env.siteUrl}/book-consultation`,
      siteName: site.name,
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}

export default async function BookConsultationPage() {
  const site = await getSiteContent();

  return (
    <>
      <JsonLd
        data={buildBreadcrumbListJsonLd([{ label: "Book a Consultation" }])}
      />

      <Section>
        <Container className="max-w-2xl">
          <Breadcrumbs
            items={[{ label: "Book a Consultation" }]}
            className="mb-6"
          />
          <PageHeader
            heading="Book a Free Consultation"
            description="Tell us a little about your plans and your preferred time — we'll get in touch to confirm."
          />

          <div className="mt-8">
            <ConsultationForm contact={site.contact} />
          </div>
        </Container>
      </Section>
    </>
  );
}
