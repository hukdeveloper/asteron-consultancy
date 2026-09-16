import {
  honestScopeLimitations,
  howSupportWorks,
  serviceCategories,
  services,
  servicesFaqItems,
  servicesFinalCta,
} from "@/content/services";
import type { Service, ServiceCategory } from "@/types/content";

export async function getServices(): Promise<Service[]> {
  return services.filter((service) => service.contentStatus === "published");
}

export async function getFeaturedServices(): Promise<Service[]> {
  const all = await getServices();
  return all.filter((service) => service.isFeatured);
}

export async function getServiceBySlug(
  slug: string,
): Promise<Service | undefined> {
  const all = await getServices();
  return all.find((service) => service.slug === slug);
}

export async function getServicesByCategory(
  category: ServiceCategory,
): Promise<Service[]> {
  const all = await getServices();
  return all.filter((service) => service.category === category);
}

/** Resolves a service's `relatedServiceSlugs` to real, published `Service` records — skips any that no longer exist and never includes the service itself. */
export async function getRelatedServices(service: Service): Promise<Service[]> {
  const all = await getServices();
  const seen = new Set<string>();
  const related: Service[] = [];

  for (const slug of service.relatedServiceSlugs) {
    if (slug === service.slug || seen.has(slug)) continue;
    const match = all.find((candidate) => candidate.slug === slug);
    if (match) {
      related.push(match);
      seen.add(slug);
    }
  }

  return related;
}

export async function getServicesHubContent() {
  return {
    categories: serviceCategories,
    howSupportWorks,
    honestScopeLimitations,
    faqItems: servicesFaqItems,
    finalCta: servicesFinalCta,
  };
}
