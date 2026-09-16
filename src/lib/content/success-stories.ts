import { successStories, successStoriesIntro } from "@/content/success-stories";
import type { SuccessStory } from "@/types/content";

export async function getSuccessStories(): Promise<SuccessStory[]> {
  return successStories.filter((story) => story.contentStatus === "published");
}

export async function getSuccessStoriesIntro(): Promise<string> {
  return successStoriesIntro;
}
