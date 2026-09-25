import { scholarshipHighlights } from "@/content/home";
import type {
  FaqItem,
  FinalCtaContent,
  HomeHeroContent,
  KeyPoint,
  StudyAbroadProcessStep,
  StudyLevelPageContent,
} from "@/types/content";

/**
 * Content for the Study Abroad hub (/study-abroad) and the two study-level
 * pages (/study-abroad/undergraduate, /study-abroad/postgraduate). See
 * docs/CONTENT_MODEL.md for how this maps to the future Strapi content
 * model, and docs/DECISIONS.md "Content Accuracy" for the general-guidance
 * policy this content follows throughout.
 */

export const studyAbroadHero: HomeHeroContent = {
  eyebrow: "Study Abroad",
  heading: "Find the study destination that fits your goals.",
  description:
    "Compare international study options and understand the steps involved in selecting a programme, preparing an application and planning your journey.",
  primaryCta: { label: "Book Free Consultation", href: "/book-consultation" },
  secondaryCta: { label: "Check Your Eligibility", href: "/check-eligibility" },
  tertiaryLink: { label: "Browse Destinations", href: "#destinations" },
};

export const studyAbroadIntro =
  "Choosing where and what to study abroad involves comparing destinations, institutions and programmes against your own goals, budget and preferences. Janan helps you work through that comparison and prepare a stronger application — the final decisions on admission and visas always rest with the relevant institutions and government authorities, not with Janan.";

/** Shared, general 10-step sequence — reused by the hub and both study-level pages so it's authored once. */
export const genericApplicationProcess: StudyAbroadProcessStep[] = [
  {
    id: "goals",
    step: 1,
    title: "Define your study goals",
    description:
      "Clarify what you want from your studies: subject, level, destination preferences and budget.",
  },
  {
    id: "entry-requirements",
    step: 2,
    title: "Review entry requirements",
    description:
      "Check the general entry requirements for the study level and destinations you're considering.",
  },
  {
    id: "compare-programmes",
    step: 3,
    title: "Compare programmes",
    description:
      "Shortlist and compare universities and courses that fit your goals.",
  },
  {
    id: "prepare-documents",
    step: 4,
    title: "Prepare your documents",
    description:
      "Gather transcripts, references, personal statements and any other required documents.",
  },
  {
    id: "submit-applications",
    step: 5,
    title: "Submit applications",
    description:
      "Apply to your shortlisted programmes, following each institution's own process and deadlines.",
  },
  {
    id: "review-offers",
    step: 6,
    title: "Review offers",
    description:
      "Compare any offers you receive against your original goals and circumstances.",
  },
  {
    id: "prepare-finances",
    step: 7,
    title: "Prepare your finances",
    description:
      "Plan for tuition, living costs and other expenses — see our cost-planning guidance.",
  },
  {
    id: "visa-process",
    step: 8,
    title: "Follow the official visa process",
    description:
      "Apply for the appropriate visa or permit directly through official government channels.",
  },
  {
    id: "insurance-accommodation",
    step: 9,
    title: "Arrange insurance and accommodation",
    description:
      "Organise health/travel insurance and confirm your accommodation ahead of departure.",
  },
  {
    id: "departure-prep",
    step: 10,
    title: "Prepare for departure",
    description: "Complete pre-departure practical planning before you travel.",
  },
];

/** Broad, non-ranked categories shared across the hub and destination pages. */
export const popularSubjectAreas: string[] = [
  "Business and Management",
  "Computing and Technology",
  "Engineering",
  "Health and Life Sciences",
  "Social Sciences",
  "Arts and Design",
];

export const howJananSupports: KeyPoint[] = [
  {
    id: "compare",
    title: "Help comparing destinations and programmes",
    description:
      "Structured guidance to compare options against your own goals, not a generic ranking.",
  },
  {
    id: "documents",
    title: "Application and document preparation support",
    description:
      "Practical help preparing a complete, well-organised application.",
  },
  {
    id: "visa-clarity",
    title: "Visa-document guidance",
    description:
      "General guidance on the documentation your visa application is likely to need — always alongside official sources.",
  },
  {
    id: "ongoing-contact",
    title: "Support through to departure",
    description:
      "Continued guidance from application through to pre-departure preparation.",
  },
];

/**
 * Cost-planning categories only — deliberately no figures, since specific
 * amounts date quickly and vary by institution/city/lifestyle. Each
 * destination's own `generalCostGuidance` field adds a short qualifier.
 */
export const costPlanningCategories: KeyPoint[] = [
  {
    id: "tuition",
    title: "Tuition fees",
    description:
      "Vary by institution, programme and study level — confirm current fees directly with each university.",
  },
  {
    id: "accommodation",
    title: "Accommodation",
    description:
      "University halls, private rentals and homestays differ in cost and availability by city.",
  },
  {
    id: "living-expenses",
    title: "Everyday living expenses",
    description:
      "Food, transport and other daily costs vary by city and personal lifestyle.",
  },
  {
    id: "health-insurance",
    title: "Health insurance",
    description:
      "Many destinations require appropriate health cover for the duration of study — requirements vary by country.",
  },
  {
    id: "visa-and-travel",
    title: "Visa and travel costs",
    description:
      "Visa application costs and travel expenses depend on your nationality, destination and circumstances.",
  },
];

export const visaGuidanceIntro =
  "Visa and immigration requirements are set and updated by government authorities, not by Janan, and they can change without notice. We help you understand the general documentation your visa application is likely to need and keep you organised through the process — but the official, current requirements always come from the relevant government's own immigration website, and the final decision always rests with that authority.";

export const parentReassurance: KeyPoint[] = [
  {
    id: "no-guarantees",
    title: "We don't promise outcomes we can't control",
    description:
      "Admission and visa decisions are made by institutions and government authorities, never by Janan.",
  },
  {
    id: "general-guidance",
    title: "Guidance is practical and general",
    description:
      "We help your family understand the process and prepare well, without overstating what any consultancy can guarantee.",
  },
  {
    id: "involve-family",
    title: "Families are welcome in consultations",
    description:
      "Parents and guardians are welcome to join consultation sessions alongside the student.",
  },
  {
    id: "official-sources",
    title: "We point you to official sources",
    description:
      "For binding visa, financial or legal requirements, we direct you to the relevant government or institution directly.",
  },
];

export const studyAbroadFaqItems: FaqItem[] = [
  {
    id: "choose-destination",
    question: "How do I choose between destinations?",
    answer:
      "Start with your goals (subject, budget, course length, lifestyle preferences), then compare specific destinations and programmes against those goals — a consultation can help structure this comparison.",
  },
  {
    id: "study-level-difference",
    question:
      "What's the difference between the undergraduate and postgraduate pages?",
    answer:
      "Each page covers the planning considerations, timelines and document checklists most relevant to that study level — see our Undergraduate and Postgraduate guidance pages.",
  },
  {
    id: "one-country-only",
    question:
      "Do I have to decide on one destination before booking a consultation?",
    answer:
      "No — many students book a consultation while still comparing destinations. That comparison is part of what we help with.",
  },
  {
    id: "parents-involved",
    question: "Can my parents be involved in the process?",
    answer:
      "Yes, parents and guardians are welcome to join consultations and ask questions directly.",
  },
];

export const studyAbroadFinalCta: FinalCtaContent = {
  heading: "Ready to compare your study options?",
  description:
    "Book a free consultation to talk through destinations, programmes and next steps.",
  primaryCta: { label: "Book Free Consultation", href: "/book-consultation" },
  secondaryCta: { label: "Check Your Eligibility", href: "/check-eligibility" },
};

// --- Study level pages -----------------------------------------------------

export const undergraduatePageContent: StudyLevelPageContent = {
  id: "undergraduate",
  slug: "undergraduate",
  heading: "Undergraduate Study Abroad",
  intro:
    "Undergraduate study abroad is usually the first full degree after secondary/high school. Entry requirements, course structures and application routes vary by institution, programme and destination, so use this page as a general starting point rather than a fixed checklist.",
  whoItsFor:
    "This page is aimed at students who have completed or are completing secondary/high school education and are considering a first bachelor's-level degree abroad.",
  qualificationConsiderations: [
    {
      id: "school-results",
      title: "Secondary/high school results",
      description:
        "Most institutions consider your school results, though the specific grades or qualification equivalencies required vary by university and country.",
    },
    {
      id: "english-tests",
      title: "English-language testing, where required",
      description:
        "Many destinations and institutions ask for evidence of English proficiency — the accepted tests and required scores vary.",
    },
    {
      id: "subject-prerequisites",
      title: "Subject-specific prerequisites",
      description:
        "Some programmes (e.g. engineering, health sciences) may expect specific prior subjects — check each programme's own requirements.",
    },
  ],
  planningTimeline: [
    {
      id: "12-months",
      title: "12+ months before intake",
      description:
        "Research destinations, institutions and programmes; note application routes.",
    },
    {
      id: "9-months",
      title: "6–9 months before intake",
      description:
        "Prepare documents, sit any required English tests, and begin applications.",
    },
    {
      id: "3-months",
      title: "2–3 months before intake",
      description:
        "Finalise your visa application and arrange accommodation and insurance.",
    },
  ],
  documentChecklist: [
    "Academic transcripts and certificates",
    "Proof of English proficiency, where required",
    "Passport-style identification documents",
    "Personal statement or motivation letter, where required",
    "Reference letters, where required",
    "Financial documentation for your visa application",
  ],
  courseSelectionGuidance:
    "Compare programmes on course content, structure, entry requirements and location rather than on general reputation alone — the right fit depends on your own goals and circumstances.",
  fundingConsiderations:
    "Funding sources for undergraduate study can include family support, savings, loans and scholarships. See our Scholarship Guidance section for how we can help you research options — we cannot guarantee that a scholarship will be awarded.",
  faqItems: [
    {
      id: "ug-faq-one-list",
      question:
        "Is there one document checklist that applies to every university?",
      answer:
        "No — requirements vary by institution, programme and destination. Use our general checklist as a starting point and confirm specifics with each university.",
    },
    {
      id: "ug-faq-gap-year",
      question: "Can I apply if I've taken a gap year?",
      answer:
        "Many institutions accept applications from students with a study gap, though you may need to explain it as part of your application. Requirements vary by institution.",
    },
    {
      id: "ug-faq-when-apply",
      question: "When should I start my undergraduate application?",
      answer:
        "Generally 9–12 months before your intended intake, though exact deadlines vary by institution and destination — earlier is safer.",
    },
  ],
  seo: {
    metaTitle: "Undergraduate Study Abroad Guidance",
    metaDescription:
      "General guidance for undergraduate study abroad: who it's for, qualification considerations, planning timeline, document checklist and funding considerations.",
  },
};

export const postgraduatePageContent: StudyLevelPageContent = {
  id: "postgraduate",
  slug: "postgraduate",
  heading: "Postgraduate Study Abroad",
  intro:
    "Postgraduate study abroad covers master's and, in some cases, doctoral-level study. Entry requirements, programme lengths and application routes vary considerably by institution, subject and destination, so use this page as a general starting point rather than a fixed checklist.",
  whoItsFor:
    "This page is aimed at students who already hold (or are completing) an undergraduate degree and are considering further study abroad, including career-changers and those returning to study after work experience.",
  qualificationConsiderations: [
    {
      id: "prior-degree",
      title: "Prior degree and grades",
      description:
        "Most postgraduate programmes expect a relevant undergraduate degree, with grade requirements that vary by institution and programme.",
    },
    {
      id: "relevant-experience",
      title: "Relevant work or research experience",
      description:
        "Some postgraduate programmes, particularly at doctoral level, value or require relevant experience — check each programme's own criteria.",
    },
    {
      id: "english-tests-pg",
      title: "English-language testing, where required",
      description:
        "As with undergraduate study, accepted tests and required scores vary by institution and programme.",
    },
  ],
  planningTimeline: [
    {
      id: "pg-12-months",
      title: "9–12 months before intake",
      description:
        "Research programmes and supervisors (for research degrees); note application routes and any required entrance exams.",
    },
    {
      id: "pg-6-months",
      title: "4–6 months before intake",
      description:
        "Prepare a personal statement or research proposal, gather references, and begin applications.",
    },
    {
      id: "pg-2-months",
      title: "1–2 months before intake",
      description:
        "Finalise your visa application and arrange accommodation, insurance and, where relevant, funding confirmation.",
    },
  ],
  documentChecklist: [
    "Undergraduate transcripts and degree certificate",
    "Proof of English proficiency, where required",
    "Personal statement or research proposal, where required",
    "Academic and/or professional reference letters",
    "CV/résumé, where required",
    "Financial documentation for your visa application",
  ],
  courseSelectionGuidance:
    "For taught postgraduate programmes, compare course content and structure; for research degrees, consider the specific research group or potential supervisor as much as the institution itself.",
  fundingConsiderations:
    "Postgraduate funding can include personal savings, employer sponsorship, research funding (for some doctoral programmes), loans and scholarships. See our Scholarship Guidance section for how we can help you research options — we cannot guarantee that funding or a scholarship will be secured.",
  faqItems: [
    {
      id: "pg-faq-work-first",
      question: "Do I need work experience before a postgraduate degree?",
      answer:
        "It depends on the programme — some value or require relevant experience, particularly certain professional or research-focused programmes, while many taught master's programmes don't require it. Check each programme's own criteria.",
    },
    {
      id: "pg-faq-research-proposal",
      question: "Do all postgraduate applications need a research proposal?",
      answer:
        "No — research proposals are generally only required for research-based programmes such as many doctoral degrees, not for most taught master's programmes.",
    },
    {
      id: "pg-faq-timeline",
      question:
        "How long does a postgraduate application usually take to prepare?",
      answer:
        "Many students begin preparing 9–12 months before their intended intake, though this varies by programme and destination — starting earlier gives more flexibility.",
    },
  ],
  seo: {
    metaTitle: "Postgraduate Study Abroad Guidance",
    metaDescription:
      "General guidance for postgraduate study abroad: who it's for, qualification considerations, planning timeline, document checklist and funding considerations.",
  },
};

/** Reused directly from the homepage's scholarship content so it isn't duplicated — see src/content/home.ts. */
export const studyAbroadScholarshipHighlights = scholarshipHighlights;
