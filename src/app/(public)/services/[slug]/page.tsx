import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { ComingSoon } from "@/components/shared/ComingSoon";
import { getServiceBySlug, getServices } from "@/lib/content/services";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  return { title: service?.title ?? "Services" };
}

export default async function ServiceDetailPage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) notFound();

  return <ComingSoon title={service.title} />;
}
