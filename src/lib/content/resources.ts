import {
  newsletterPlaceholderNote,
  resourceArticles,
  resourceCategories,
  resourcesIntro,
} from "@/content/resources";
import type { ResourceArticle, ResourceCategory } from "@/types/content";

export async function getResourceArticles(): Promise<ResourceArticle[]> {
  return resourceArticles.filter(
    (article) => article.contentStatus === "published",
  );
}

export async function getResourceArticleBySlug(
  slug: string,
): Promise<ResourceArticle | undefined> {
  const all = await getResourceArticles();
  return all.find((article) => article.slug === slug);
}

export async function getFeaturedResourceArticle(): Promise<
  ResourceArticle | undefined
> {
  const all = await getResourceArticles();
  return all.find((article) => article.isFeatured);
}

export async function getResourceCategories(): Promise<ResourceCategory[]> {
  return resourceCategories;
}

/** Resolves an article's `relatedArticleSlugs` to real, published records — skips missing/self/duplicate references. */
export async function getRelatedResourceArticles(
  article: ResourceArticle,
): Promise<ResourceArticle[]> {
  const all = await getResourceArticles();
  const seen = new Set<string>();
  const related: ResourceArticle[] = [];

  for (const slug of article.relatedArticleSlugs) {
    if (slug === article.slug || seen.has(slug)) continue;
    const match = all.find((candidate) => candidate.slug === slug);
    if (match) {
      related.push(match);
      seen.add(slug);
    }
  }

  return related;
}

export async function getResourcesHubContent() {
  return {
    intro: resourcesIntro,
    newsletterPlaceholderNote,
  };
}
