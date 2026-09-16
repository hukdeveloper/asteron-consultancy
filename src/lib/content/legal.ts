import { legalDraftNotice, legalPages } from "@/content/legal";
import type { LegalPage } from "@/types/content";

export async function getLegalPages(): Promise<LegalPage[]> {
  return legalPages;
}

export async function getLegalPageBySlug(
  slug: string,
): Promise<LegalPage | undefined> {
  const all = await getLegalPages();
  return all.find((page) => page.slug === slug);
}

export async function getLegalDraftNotice(): Promise<string> {
  return legalDraftNotice;
}
