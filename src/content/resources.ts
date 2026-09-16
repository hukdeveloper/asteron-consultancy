import type { ResourceArticle, ResourceCategory } from "@/types/content";

/**
 * Content for /resources and /resources/[slug]. Genuinely general
 * guidance only — no specific legal, immigration, medical or financial
 * claims (docs/DECISIONS.md "Content Accuracy"). The first three slugs
 * intentionally match the titles/summaries already referenced by the
 * homepage's resource teaser (src/content/home.ts) so those links now
 * resolve instead of 404ing.
 */

export const resourceCategories: ResourceCategory[] = [
  {
    id: "destination-planning",
    slug: "destination-planning",
    label: "Destination Planning",
    description:
      "Comparing destinations and thinking through what matters for your situation.",
  },
  {
    id: "applications",
    slug: "applications",
    label: "Applications",
    description:
      "Preparing documents and getting the most from the application process.",
  },
  {
    id: "insurance",
    slug: "insurance",
    label: "Insurance",
    description:
      "General guidance understanding student, travel and visitor insurance.",
  },
  {
    id: "budgeting",
    slug: "budgeting",
    label: "Budgeting",
    description:
      "General cost-planning categories to think through before you commit.",
  },
  {
    id: "pre-departure",
    slug: "pre-departure",
    label: "Pre-departure",
    description: "Practical preparation for the weeks before you travel.",
  },
];

export const resourceArticles: ResourceArticle[] = [
  {
    id: "choosing-a-destination",
    slug: "how-to-choose-the-right-study-destination",
    title: "How to Choose the Right Study Destination",
    summary:
      "A practical way to think through destination options based on your goals.",
    categoryId: "destination-planning",
    readingTimeMinutes: 5,
    sections: [
      {
        id: "start-with-goals",
        heading: "Start with your own goals",
        paragraphs: [
          "Before comparing specific countries, it helps to write down what actually matters to you: subject area, study level, budget range, climate and lifestyle preferences, and how far from home you're comfortable being.",
          "Destinations that look appealing in general terms don't always fit a specific person's goals — starting from your own priorities keeps the comparison grounded.",
        ],
      },
      {
        id: "compare-structurally",
        heading: "Compare destinations on the same factors",
        paragraphs: [
          "Try comparing your shortlist across the same handful of factors each time: typical study levels offered, general intake patterns, language of instruction, and the general cost-planning categories you'll need to budget for.",
          "Avoid comparing on reputation alone — a destination's overall reputation doesn't tell you whether a specific university or programme fits your goals.",
        ],
      },
      {
        id: "check-requirements-early",
        heading: "Check general entry and visa patterns early",
        paragraphs: [
          "Different destinations have different general visa and entry patterns. It's worth understanding the shape of a destination's process early, while keeping in mind that exact requirements, fees and processing times are set by that destination's own government and can change.",
          "Always confirm current, binding requirements on the relevant official government website before making decisions.",
        ],
      },
      {
        id: "talk-it-through",
        heading: "Talk it through before deciding",
        paragraphs: [
          "A structured conversation — with family, or during a consultation — can help you pressure-test a shortlist against your own circumstances rather than deciding in isolation.",
        ],
      },
    ],
    relatedArticleSlugs: [
      "documents-commonly-needed-for-university-applications",
      "how-to-plan-a-study-abroad-budget",
    ],
    isFeatured: true,
    lastReviewed: "2026-09-13",
    contentStatus: "published",
    seo: {
      metaTitle: "How to Choose the Right Study Destination",
      metaDescription:
        "A practical, general framework for comparing study-abroad destinations against your own goals and circumstances.",
    },
  },
  {
    id: "application-documents",
    slug: "documents-commonly-needed-for-university-applications",
    title: "Documents Commonly Needed for University Applications",
    summary:
      "A general overview of documentation many university applications ask for.",
    categoryId: "applications",
    readingTimeMinutes: 4,
    sections: [
      {
        id: "core-documents",
        heading: "Documents many applications ask for",
        paragraphs: [
          "While exact requirements vary by institution, programme and destination, many university applications commonly ask for academic transcripts and certificates, proof of English proficiency (where required), a personal statement or motivation letter, and reference letters.",
          "Treat this as a general starting point, not a fixed checklist — always confirm the exact requirements published by each institution.",
        ],
      },
      {
        id: "organise-early",
        heading: "Organise documents early",
        paragraphs: [
          "Some documents — particularly transcripts and references — can take time to obtain. Requesting them early reduces pressure closer to application deadlines.",
          "Keeping a simple checklist per institution, since requirements can differ even between programmes at the same university, helps avoid last-minute surprises.",
        ],
      },
      {
        id: "personal-statement",
        heading: "Personal statements take time",
        paragraphs: [
          "A personal statement or motivation letter usually benefits from more than one draft. Give yourself time to revise it, and remember that the content and its accuracy always remain your own responsibility.",
        ],
      },
    ],
    relatedArticleSlugs: [
      "how-to-choose-the-right-study-destination",
      "questions-to-ask-during-a-university-consultation",
    ],
    isFeatured: true,
    lastReviewed: "2026-09-13",
    contentStatus: "published",
    seo: {
      metaTitle: "Documents Commonly Needed for University Applications",
      metaDescription:
        "A general overview of the documents many university applications ask for, and how to stay organised while preparing them.",
    },
  },
  {
    id: "understanding-insurance",
    slug: "understanding-student-travel-and-health-insurance",
    title: "Understanding Student Travel and Health Insurance",
    summary:
      "A plain-English introduction to how student travel and health cover works.",
    categoryId: "insurance",
    readingTimeMinutes: 5,
    sections: [
      {
        id: "why-it-exists",
        heading: "Why students often need cover",
        paragraphs: [
          "Studying abroad usually means being outside your home healthcare system, and travel involves its own risks (delays, cancellations, lost belongings). Insurance is generally intended to help with costs that could otherwise be significant.",
          "Some institutions and visa categories may expect evidence of appropriate cover — always check your specific destination and institution's requirements.",
        ],
      },
      {
        id: "types-of-cover",
        heading: "Different types of cover, different purposes",
        paragraphs: [
          "Student health insurance generally relates to the duration of your studies, while travel insurance generally relates to a specific journey. Visitor insurance is generally aimed at people visiting you for a shorter period. See our Insurance section for more detail on each.",
        ],
      },
      {
        id: "what-to-check",
        heading: "What to check before choosing a policy",
        paragraphs: [
          "Coverage limits, exclusions, deductibles and the claims process all vary by provider and policy — always review a provider's official policy wording before purchase rather than relying on general guidance alone.",
        ],
      },
    ],
    relatedArticleSlugs: [
      "how-to-plan-a-study-abroad-budget",
      "preparing-your-pre-departure-checklist",
    ],
    isFeatured: false,
    lastReviewed: "2026-09-13",
    contentStatus: "published",
    seo: {
      metaTitle: "Understanding Student Travel and Health Insurance",
      metaDescription:
        "A plain-English, general introduction to how student travel and health insurance works and what to check before choosing a policy.",
    },
  },
  {
    id: "study-abroad-budget",
    slug: "how-to-plan-a-study-abroad-budget",
    title: "How to Plan a Study Abroad Budget",
    summary:
      "General cost categories to think through before committing to a destination.",
    categoryId: "budgeting",
    readingTimeMinutes: 5,
    sections: [
      {
        id: "cost-categories",
        heading: "General cost categories to plan for",
        paragraphs: [
          "A study-abroad budget generally spans tuition fees, accommodation, everyday living expenses, health/travel insurance, and visa and travel costs. Each varies significantly by destination, city and personal lifestyle — always check each institution's own current published estimates rather than relying on general figures.",
        ],
      },
      {
        id: "plan-ahead",
        heading: "Plan further ahead than you might expect",
        paragraphs: [
          "Some costs (like visa application fees or an initial accommodation deposit) fall due earlier in the process than tuition itself. Mapping out roughly when each cost is likely to arise can prevent a late scramble for funds.",
        ],
      },
      {
        id: "funding-sources",
        heading: "Consider your funding sources honestly",
        paragraphs: [
          "Common funding sources include family support, personal savings, loans, and — for some students — scholarships. We can't guarantee that a scholarship will be secured, so it's sensible to plan around funding you can confirm rather than funding you hope for.",
        ],
      },
    ],
    relatedArticleSlugs: [
      "understanding-student-travel-and-health-insurance",
      "how-to-choose-the-right-study-destination",
    ],
    isFeatured: false,
    lastReviewed: "2026-09-13",
    contentStatus: "published",
    seo: {
      metaTitle: "How to Plan a Study Abroad Budget",
      metaDescription:
        "A general framework for planning a study-abroad budget across tuition, accommodation, living costs, insurance and visa/travel expenses.",
    },
  },
  {
    id: "consultation-questions",
    slug: "questions-to-ask-during-a-university-consultation",
    title: "Questions to Ask During a University Consultation",
    summary:
      "Practical questions that help you get the most from a consultation.",
    categoryId: "applications",
    readingTimeMinutes: 4,
    sections: [
      {
        id: "before-you-book",
        heading: "Before you book",
        paragraphs: [
          "Consider jotting down what you already know (destinations you're curious about, subjects of interest, rough budget range) so the conversation can start from where you actually are, rather than from scratch.",
        ],
      },
      {
        id: "good-questions",
        heading: "Questions worth asking",
        paragraphs: [
          "Consider asking: what destinations or study levels might suit my background? What would a realistic application timeline look like for me? What documents should I start preparing now? What general cost categories should I be planning for?",
          "It's also reasonable to ask what a consultation service can and cannot help with — a good adviser should be upfront that admission, visa and scholarship decisions are never guaranteed.",
        ],
      },
      {
        id: "after-the-consultation",
        heading: "After the consultation",
        paragraphs: [
          "A useful consultation should leave you with clear next steps, not just general encouragement. If it doesn't, it's reasonable to ask for a more specific plan.",
        ],
      },
    ],
    relatedArticleSlugs: [
      "documents-commonly-needed-for-university-applications",
      "how-to-choose-the-right-study-destination",
    ],
    isFeatured: false,
    lastReviewed: "2026-09-13",
    contentStatus: "published",
    seo: {
      metaTitle: "Questions to Ask During a University Consultation",
      metaDescription:
        "Practical questions to prepare before a study-abroad consultation, so you get clear, specific next steps.",
    },
  },
  {
    id: "pre-departure-checklist",
    slug: "preparing-your-pre-departure-checklist",
    title: "Preparing for Your Pre-departure Checklist",
    summary:
      "A practical way to approach the final stage of preparation before you travel.",
    categoryId: "pre-departure",
    readingTimeMinutes: 5,
    sections: [
      {
        id: "documents-and-insurance",
        heading: "Documents and insurance first",
        paragraphs: [
          "Before anything else, confirm your travel documents are in order and your insurance (see our Insurance section) is arranged for your travel dates.",
        ],
      },
      {
        id: "accommodation-and-arrival",
        heading: "Accommodation and arrival",
        paragraphs: [
          "Confirm your accommodation arrangements and think through your arrival: how you'll get from the airport, and what you'll need for your first few days before you've had time to settle in.",
        ],
      },
      {
        id: "packing-and-money",
        heading: "Packing and accessible funds",
        paragraphs: [
          "Packing needs vary a great deal by destination and climate — general guidance is less useful here than checking your specific destination. It's generally sensible to arrange some accessible funds for your first weeks, separate from longer-term arrangements.",
        ],
      },
      {
        id: "final-checks",
        heading: "Final checks",
        paragraphs: [
          "In the last week or two, it's worth preparing a short list of emergency and important contacts, confirming your university registration/enrolment steps, and checking official travel advice from your own government for your destination.",
        ],
      },
    ],
    relatedArticleSlugs: [
      "understanding-student-travel-and-health-insurance",
      "how-to-plan-a-study-abroad-budget",
    ],
    isFeatured: false,
    lastReviewed: "2026-09-13",
    contentStatus: "published",
    seo: {
      metaTitle: "Preparing for Your Pre-departure Checklist",
      metaDescription:
        "A practical, general approach to the final stage of preparation before you travel to study abroad.",
    },
  },
];

export const resourcesIntro =
  "Practical, general guidance to help you plan — not a substitute for official sources or a consultation tailored to your situation.";

export const newsletterPlaceholderNote =
  "A newsletter sign-up is planned for a future phase. It is not connected yet — no email address is collected on this page.";
