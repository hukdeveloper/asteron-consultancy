import { scholarships, scholarshipsIntro } from "@/content/scholarships";
import type { Scholarship } from "@/types/content";

export async function getScholarships(): Promise<Scholarship[]> {
  return scholarships.filter(
    (scholarship) => scholarship.contentStatus === "published",
  );
}

export async function getScholarshipBySlug(
  slug: string,
): Promise<Scholarship | undefined> {
  const all = await getScholarships();
  return all.find((scholarship) => scholarship.slug === slug);
}

export async function getScholarshipsIntro(): Promise<string> {
  return scholarshipsIntro;
}
