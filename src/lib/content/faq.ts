import { faqCategories } from "@/content/faq";
import type { FaqCategoryGroup } from "@/types/content";

export async function getFaqCategories(): Promise<FaqCategoryGroup[]> {
  return faqCategories;
}
