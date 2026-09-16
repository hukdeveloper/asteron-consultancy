import type { SuccessStory } from "@/types/content";

/**
 * Content for /success-stories. No fictional testimonial is presented as
 * genuine — every current record is explicitly labelled demo content
 * (`isSampleContent: true`) and exists only to demonstrate the intended
 * card structure. See docs/DECISIONS.md "Success Stories Policy".
 *
 * None of these expose offer letters, passport information, or private
 * records — only a general destination/study-level/subject and a short,
 * generic quote.
 */

export const successStoriesIntro =
  "Verified success stories will be published here once students give their permission to share their journey. Until then, the example journeys below demonstrate the intended structure — they are demonstration content, not real testimonials.";

export const successStories: SuccessStory[] = [
  {
    id: "example-journey-1",
    slug: "example-journey-united-kingdom-undergraduate",
    displayName: "Example journey — A.S.",
    destinationName: "United Kingdom",
    studyLevel: "Undergraduate",
    subject: "Computing and Technology",
    summary:
      "An example of how counselling and application support might help a student move from an initial idea to a submitted application.",
    quote:
      "The guidance made a confusing process feel manageable, step by step.",
    consentStatus: "not-applicable",
    isSampleContent: true,
    contentStatus: "published",
    seo: {
      metaTitle: "Example Journey — United Kingdom, Undergraduate",
      metaDescription:
        "A demonstration example journey showing the intended structure of a published success story.",
    },
  },
  {
    id: "example-journey-2",
    slug: "example-journey-canada-postgraduate",
    displayName: "Example journey — R.K.",
    destinationName: "Canada",
    studyLevel: "Postgraduate",
    subject: "Business and Management",
    summary:
      "An example of how document support might help a student prepare a postgraduate application with more confidence.",
    quote:
      "Having someone to ask questions along the way made a real difference.",
    consentStatus: "not-applicable",
    isSampleContent: true,
    contentStatus: "published",
    seo: {
      metaTitle: "Example Journey — Canada, Postgraduate",
      metaDescription:
        "A demonstration example journey showing the intended structure of a published success story.",
    },
  },
  {
    id: "example-journey-3",
    slug: "example-journey-australia-pre-departure",
    displayName: "Example journey — M.H.",
    destinationName: "Australia",
    studyLevel: "Undergraduate",
    subject: "Health and Life Sciences",
    summary:
      "An example of how pre-departure guidance might help a student feel more prepared before travelling.",
    quote:
      "The pre-departure guidance helped me feel ready before I travelled.",
    consentStatus: "not-applicable",
    isSampleContent: true,
    contentStatus: "published",
    seo: {
      metaTitle: "Example Journey — Australia, Pre-departure",
      metaDescription:
        "A demonstration example journey showing the intended structure of a published success story.",
    },
  },
];
