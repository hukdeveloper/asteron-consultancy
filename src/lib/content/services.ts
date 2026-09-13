import { services } from "@/content/services";
import type { ServiceSummary } from "@/types/content";

export async function getServices(): Promise<ServiceSummary[]> {
  return services.filter((service) => service.status === "published");
}

export async function getServiceBySlug(
  slug: string,
): Promise<ServiceSummary | undefined> {
  const all = await getServices();
  return all.find((service) => service.slug === slug);
}
