import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { JsonLd } from "@/components/shared/JsonLd";
import { ServiceTemplate } from "@/components/services/ServiceTemplate";
import { serviceCategories } from "@/content/services";
import {
  getRelatedServices,
  getServiceBySlug,
  getServices,
  getServicesHubContent,
} from "@/lib/content/services";
import { getSiteContent } from "@/lib/content/site";
import { env } from "@/lib/env";
import {
  buildBreadcrumbListJsonLd,
  buildFaqPageJsonLd,
} from "@/lib/structuredData";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) return { title: "Services" };

  const title = service.seo.metaTitle ?? service.heroTitle;
  const description = service.seo.metaDescription ?? service.heroDescription;
  const path = `/services/${service.slug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: `${env.siteUrl}${path}`,
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}

export default async function ServiceDetailPage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) notFound();

  const [relatedServices, hub, site] = await Promise.all([
    getRelatedServices(service),
    getServicesHubContent(),
    getSiteContent(),
  ]);

  const categoryLabel =
    serviceCategories.find((category) => category.id === service.category)
      ?.label ?? service.category;

  return (
    <>
      <JsonLd
        data={buildBreadcrumbListJsonLd([
          { label: "Services", path: "/services" },
          { label: service.title },
        ])}
      />
      <JsonLd data={buildFaqPageJsonLd(service.faqItems)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.summary,
          provider: { "@type": "Organization", name: site.name },
          areaServed: "Worldwide",
        }}
      />

      <ServiceTemplate
        service={service}
        categoryLabel={categoryLabel}
        relatedServices={relatedServices}
        finalCta={hub.finalCta}
        contact={site.contact}
      />
    </>
  );
}
