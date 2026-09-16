import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageHeader } from "@/components/shared/PageHeader";
import { InsuranceQuoteForm } from "@/components/insurance/InsuranceQuoteForm";
import { getInsuranceServices } from "@/lib/content/insurance";
import { getSiteContent } from "@/lib/content/site";
import { env } from "@/lib/env";
import { buildBreadcrumbListJsonLd } from "@/lib/structuredData";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContent();
  const title = "Insurance Quote";
  const description =
    "Share a few details and we'll help you request an insurance quotation suited to your situation. This is a development demo form — it is not yet connected to a submission service.";

  return {
    title,
    description,
    alternates: { canonical: "/insurance-quote" },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: `${env.siteUrl}/insurance-quote`,
      siteName: site.name,
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}

export default async function InsuranceQuotePage() {
  const [site, insuranceServices] = await Promise.all([
    getSiteContent(),
    getInsuranceServices(),
  ]);

  return (
    <>
      <JsonLd
        data={buildBreadcrumbListJsonLd([{ label: "Insurance Quote" }])}
      />

      <Section>
        <Container className="max-w-2xl">
          <Breadcrumbs
            items={[{ label: "Insurance Quote" }]}
            className="mb-6"
          />

          <div className="flex flex-wrap items-center gap-3">
            <PageHeader
              className="max-w-none"
              heading="Request an Insurance Quote"
              description="Share a few details and we'll help you request a quotation suited to your situation."
            />
          </div>

          <div className="mt-8">
            <InsuranceQuoteForm
              contact={site.contact}
              insuranceServices={insuranceServices}
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
