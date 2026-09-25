import type {
  FaqItem,
  FinalCtaContent,
  KeyPoint,
  Service,
  ServiceCategory,
} from "@/types/content";

/**
 * Full service records for the /services hub and /services/[slug] template.
 *
 * Content policy (see docs/DECISIONS.md "Content Accuracy"): no fabricated
 * statistics, no guaranteed outcomes, no invented scholarships, no
 * university rankings, no legal/immigration representation claims. Every
 * service that the phase brief requires a specific verbatim regulatory or
 * integrity notice for carries that text in `importantNotice`, rendered as
 * a prominent callout by `ServiceTemplate` — never folded into small print.
 *
 * `lastReviewed` records when this content was last checked against the
 * Content Accuracy policy — it does not imply a live re-verification of
 * external facts (no browsing was performed to author this content).
 */

export interface ServiceCategoryInfo {
  id: ServiceCategory;
  label: string;
  description: string;
}

export const serviceCategories: ServiceCategoryInfo[] = [
  {
    id: "study-planning",
    label: "Study Planning",
    description:
      "Clarify your goals, compare universities and courses, and understand scholarship options.",
  },
  {
    id: "application-preparation",
    label: "Application Preparation",
    description:
      "Prepare a strong, well-organised application and understand the visa process ahead of you.",
  },
  {
    id: "journey-preparation",
    label: "Journey Preparation",
    description:
      "Get ready for departure — accommodation, pre-departure planning and insurance guidance.",
  },
];

export const services: Service[] = [
  {
    id: "study-abroad-counselling",
    slug: "study-abroad-counselling",
    title: "Study Abroad Counselling",
    shortTitle: "Counselling",
    category: "study-planning",
    summary:
      "One-to-one guidance to clarify your goals and shortlist realistic study options.",
    heroTitle: "Study Abroad Counselling",
    heroDescription:
      "A structured conversation about your background and goals, so the options you go on to compare are realistic for your situation.",
    icon: "Compass",
    overview:
      "Study abroad counselling is usually the starting point: a structured conversation about your academic background, goals and constraints. It helps turn a broad idea ('I want to study abroad') into a shortlist of destinations, study levels and subject areas worth comparing in more detail.",
    whoItMayHelp:
      "This may help students and families who are early in planning and want a clearer, more structured starting point before comparing specific destinations or universities.",
    benefits: [
      {
        id: "sac-direction",
        title: "A clearer sense of direction",
        description:
          "Leave with a shortlist grounded in your own goals, not a generic list.",
      },
      {
        id: "sac-confidence",
        title: "More confidence in next steps",
        description: "Understand what to research or prepare next, and why.",
      },
    ],
    includedSupport: [
      {
        id: "sac-background",
        title: "Academic-background discussion",
        description: "A review of your current or most recent academic record.",
      },
      {
        id: "sac-goals",
        title: "Study-goal exploration",
        description:
          "Clarifying what you want from studying abroad — subject, career direction, personal priorities.",
      },
      {
        id: "sac-destinations",
        title: "Destination considerations",
        description:
          "General discussion of destinations that may suit your goals and circumstances.",
      },
      {
        id: "sac-level",
        title: "Study-level considerations",
        description:
          "Whether undergraduate, postgraduate or another study level fits your background.",
      },
      {
        id: "sac-budget",
        title: "Budget planning categories",
        description:
          "An overview of the general cost categories to plan for, without inventing specific figures.",
      },
      {
        id: "sac-intake",
        title: "Intake planning",
        description:
          "General discussion of realistic intake timing based on your current stage.",
      },
      {
        id: "sac-next-steps",
        title: "Next-step recommendations",
        description: "A practical list of what to look into or prepare next.",
      },
    ],
    processSteps: [
      {
        id: "sac-step-1",
        step: 1,
        title: "Initial conversation",
        description: "We discuss your background, goals and any constraints.",
      },
      {
        id: "sac-step-2",
        step: 2,
        title: "Explore options",
        description:
          "We talk through destinations, study levels and subject areas that may fit.",
      },
      {
        id: "sac-step-3",
        step: 3,
        title: "Budget and intake planning",
        description:
          "General guidance on cost categories and realistic timing.",
      },
      {
        id: "sac-step-4",
        step: 4,
        title: "Next steps",
        description:
          "You leave with a practical shortlist and a plan for what to do next.",
      },
    ],
    requiredInformation: [
      "Your current or most recent academic transcripts",
      "A general idea of your budget range",
      "Any destinations or subjects you're already considering",
      "Your target intake (season/year), if known",
    ],
    limitations: [
      "Counselling provides guidance, not a guarantee of admission to any programme.",
      "Final destination and programme choices remain yours to make.",
    ],
    faqItems: [
      {
        id: "sac-faq-cost",
        question: "Is the initial counselling session free?",
        answer:
          "Yes — the initial consultation is free. See Book a Consultation for details.",
      },
      {
        id: "sac-faq-decided",
        question: "Do I need to have already chosen a destination?",
        answer:
          "No — many students book counselling specifically because they haven't decided yet. That's exactly what this service helps with.",
      },
    ],
    relatedServiceSlugs: [
      "university-course-selection",
      "application-assistance",
    ],
    primaryCta: { label: "Book Free Consultation", href: "/book-consultation" },
    seo: {
      metaTitle: "Study Abroad Counselling",
      metaDescription:
        "One-to-one guidance to clarify your study-abroad goals and shortlist realistic destinations, study levels and budget considerations.",
    },
    lastReviewed: "2026-09-13",
    contentStatus: "published",
    isFeatured: true,
  },
  {
    id: "university-course-selection",
    slug: "university-course-selection",
    title: "University and Course Selection",
    shortTitle: "University Selection",
    category: "study-planning",
    summary:
      "Guidance choosing universities and programmes that fit your goals.",
    heroTitle: "University and Course Selection",
    heroDescription:
      "Compare institutions and programmes against your own goals and circumstances — not a generic ranking.",
    icon: "GraduationCap",
    overview:
      "Choosing a university and course involves weighing up more than reputation alone. This service helps you compare specific options against factors that matter for your own situation — Janan does not publish rankings or claim that any one university is universally best.",
    whoItMayHelp:
      "This may help students who already have a general direction (from counselling or their own research) and now need to compare specific universities and courses.",
    benefits: [
      {
        id: "ucs-structured",
        title: "A structured comparison",
        description:
          "Compare options against the same set of factors, not an ad-hoc search.",
      },
      {
        id: "ucs-fit",
        title: "A focus on fit, not prestige alone",
        description:
          "Course content, structure and requirements matter as much as a university's name.",
      },
    ],
    includedSupport: [
      {
        id: "ucs-academic",
        title: "Academic background",
        description: "How your prior results align with entry requirements.",
      },
      {
        id: "ucs-subject",
        title: "Subject interests",
        description: "Matching course content to what genuinely interests you.",
      },
      {
        id: "ucs-entry",
        title: "Entry requirements",
        description: "General review of what each programme typically expects.",
      },
      {
        id: "ucs-level",
        title: "Study level",
        description: "Confirming the course fits your intended study level.",
      },
      {
        id: "ucs-destination",
        title: "Destination",
        description: "How your destination choice affects available options.",
      },
      {
        id: "ucs-budget",
        title: "Budget",
        description: "Comparing general cost categories across options.",
      },
      {
        id: "ucs-structure",
        title: "Course structure",
        description: "Duration, teaching format and assessment style.",
      },
      {
        id: "ucs-career",
        title: "Career interests",
        description: "How a course may relate to your longer-term direction.",
      },
      {
        id: "ucs-location",
        title: "Institution location",
        description: "City versus campus town, and what that means day to day.",
      },
      {
        id: "ucs-intakes",
        title: "Available intakes",
        description: "Which intakes a programme typically offers.",
      },
    ],
    processSteps: [
      {
        id: "ucs-step-1",
        step: 1,
        title: "Confirm your criteria",
        description: "Agree the factors that matter most for your situation.",
      },
      {
        id: "ucs-step-2",
        step: 2,
        title: "Compare shortlisted options",
        description: "Review universities and courses against those criteria.",
      },
      {
        id: "ucs-step-3",
        step: 3,
        title: "Narrow your shortlist",
        description:
          "Arrive at a manageable, realistic set of options to apply to.",
      },
    ],
    requiredInformation: [
      "Your academic transcripts or results",
      "Subjects or career directions you're interested in",
      "Your budget range and preferred destination(s)",
    ],
    limitations: [
      "Janan does not publish university rankings and does not claim that any single university or programme is universally best — the right fit depends on your own goals and circumstances.",
      "Entry decisions are made solely by each institution.",
    ],
    faqItems: [
      {
        id: "ucs-faq-best",
        question: "Can you tell me the best university for my subject?",
        answer:
          "We don't publish rankings or claim one university is universally best — we help you compare specific options against your own goals and circumstances instead.",
      },
      {
        id: "ucs-faq-many",
        question: "How many universities should I shortlist?",
        answer:
          "This varies by person and destination — we can help you arrive at a realistic, manageable shortlist during a consultation.",
      },
    ],
    relatedServiceSlugs: [
      "study-abroad-counselling",
      "application-assistance",
      "scholarship-guidance",
    ],
    primaryCta: { label: "Book Free Consultation", href: "/book-consultation" },
    seo: {
      metaTitle: "University and Course Selection",
      metaDescription:
        "Guidance comparing universities and courses against your academic background, budget, destination and career interests — no rankings, no guarantees.",
    },
    lastReviewed: "2026-09-13",
    contentStatus: "published",
    isFeatured: true,
  },
  {
    id: "application-assistance",
    slug: "application-assistance",
    title: "Application Assistance",
    shortTitle: "Applications",
    category: "application-preparation",
    summary:
      "Support preparing and submitting a strong admissions application.",
    heroTitle: "Application Assistance",
    heroDescription:
      "Practical help preparing a complete, well-organised application — the content and its accuracy remain yours.",
    icon: "FileCheck2",
    overview:
      "Preparing a university application involves coordinating documents, forms and deadlines across one or more institutions. This service helps you plan and organise that process and present your own experience clearly.",
    whoItMayHelp:
      "This may help applicants who have already chosen their target programmes and now need support planning, organising and reviewing their application.",
    benefits: [
      {
        id: "aa-organised",
        title: "A more organised process",
        description: "Less risk of missed documents or deadlines.",
      },
      {
        id: "aa-clarity",
        title: "Clearer presentation of your experience",
        description:
          "Help structuring how you present your own background and achievements.",
      },
    ],
    includedSupport: [
      {
        id: "aa-planning",
        title: "Application planning",
        description: "Mapping out what each application needs and by when.",
      },
      {
        id: "aa-checklist",
        title: "Document checklist preparation",
        description:
          "A tailored checklist of documents each application is likely to need.",
      },
      {
        id: "aa-form-review",
        title: "Form review",
        description:
          "A general review of completed application forms for completeness.",
      },
      {
        id: "aa-personal-statement",
        title: "Personal-statement guidance",
        description:
          "Guidance structuring and clarifying your own personal statement.",
      },
      {
        id: "aa-deadlines",
        title: "Deadline tracking",
        description: "Help keeping track of each institution's own deadlines.",
      },
      {
        id: "aa-offers",
        title: "Offer-letter explanation",
        description:
          "Help understanding the terms and conditions of any offer you receive.",
      },
      {
        id: "aa-communication",
        title: "Communication preparation",
        description:
          "Guidance preparing clear, professional communication with institutions.",
      },
    ],
    processSteps: [
      {
        id: "aa-step-1",
        step: 1,
        title: "Plan your applications",
        description:
          "Confirm which institutions and programmes you're applying to.",
      },
      {
        id: "aa-step-2",
        step: 2,
        title: "Prepare documents",
        description:
          "Work through your document checklist and personal statement.",
      },
      {
        id: "aa-step-3",
        step: 3,
        title: "Review before submission",
        description: "A general completeness review before you submit.",
      },
      {
        id: "aa-step-4",
        step: 4,
        title: "Track and respond to offers",
        description: "Stay organised as responses and offers arrive.",
      },
    ],
    requiredInformation: [
      "Academic transcripts and certificates",
      "A draft or outline of your personal statement",
      "Reference-letter contacts, where required",
      "Each institution's own application deadlines",
    ],
    limitations: [
      "Janan does not write application content on a student's behalf and does not complete assessed work for applicants.",
      "Janan does not guarantee admission outcomes.",
    ],
    importantNotice:
      "Janan may guide applicants in presenting their own experience clearly, but applicants remain responsible for the truthfulness and originality of submitted material.",
    faqItems: [
      {
        id: "aa-faq-write",
        question: "Will Janan write my personal statement for me?",
        answer:
          "No — we guide you in presenting your own experience clearly, but the content, its truthfulness and its originality remain your responsibility.",
      },
      {
        id: "aa-faq-guarantee",
        question: "Does application assistance guarantee I'll be accepted?",
        answer:
          "No — admission decisions are made solely by each institution. We help you prepare the strongest, most accurate application you can.",
      },
    ],
    relatedServiceSlugs: [
      "study-abroad-counselling",
      "university-course-selection",
      "visa-guidance",
    ],
    primaryCta: { label: "Book Free Consultation", href: "/book-consultation" },
    seo: {
      metaTitle: "Application Assistance",
      metaDescription:
        "Practical support preparing university applications: planning, document checklists, personal-statement guidance and deadline tracking.",
    },
    lastReviewed: "2026-09-13",
    contentStatus: "published",
    isFeatured: true,
  },
  {
    id: "visa-guidance",
    slug: "visa-guidance",
    title: "Student Visa Guidance",
    shortTitle: "Visa Guidance",
    category: "application-preparation",
    summary:
      "Documentation and process guidance for student visa applications.",
    heroTitle: "Student Visa Guidance",
    heroDescription:
      "General guidance organising your visa documentation and understanding the process ahead — always alongside official sources.",
    icon: "IdCard",
    overview:
      "Student visa requirements are set by government authorities and vary by destination and nationality. This service helps you understand the general process, organise your documents and stay on top of each stage — the final decision always rests with the relevant government authority.",
    whoItMayHelp:
      "This may help applicants who have an offer (or are close to one) and now need to prepare for their destination's student visa process.",
    benefits: [
      {
        id: "vg-organised",
        title: "A more organised process",
        description: "Less risk of missing a required document or step.",
      },
      {
        id: "vg-clarity",
        title: "Clearer understanding of what's ahead",
        description:
          "General guidance on the stages most student visa processes involve.",
      },
    ],
    includedSupport: [
      {
        id: "vg-requirements",
        title: "Understanding official requirements",
        description:
          "Help interpreting the general requirements published by the relevant authority.",
      },
      {
        id: "vg-documents",
        title: "Document organization",
        description:
          "Help organising the documents your application is likely to need.",
      },
      {
        id: "vg-financial",
        title: "Financial-document preparation guidance",
        description:
          "General guidance on the type of financial evidence commonly requested.",
      },
      {
        id: "vg-planning",
        title: "Application-stage planning",
        description: "Help planning the sequence and timing of each stage.",
      },
      {
        id: "vg-interview",
        title: "Interview preparation, where applicable",
        description:
          "General preparation for a visa interview, where the process includes one.",
      },
      {
        id: "vg-verification",
        title: "Official-source verification",
        description:
          "Encouragement and support checking current requirements on official government sources.",
      },
      {
        id: "vg-checklist",
        title: "Pre-submission checklist",
        description: "A final general checklist before you submit.",
      },
    ],
    processSteps: [
      {
        id: "vg-step-1",
        step: 1,
        title: "Understand the requirements",
        description:
          "Review the general requirements for your destination and visa category.",
      },
      {
        id: "vg-step-2",
        step: 2,
        title: "Organise your documents",
        description:
          "Gather and organise the documents your application is likely to need.",
      },
      {
        id: "vg-step-3",
        step: 3,
        title: "Prepare for submission",
        description:
          "Complete a pre-submission checklist and, where applicable, interview preparation.",
      },
      {
        id: "vg-step-4",
        step: 4,
        title: "Submit through official channels",
        description:
          "Submit your application directly through the relevant government's official process.",
      },
    ],
    requiredInformation: [
      "Your offer letter or confirmation of enrolment",
      "Passport and identification documents",
      "Financial documentation relevant to your application",
      "Any destination-specific forms the official process requires",
    ],
    limitations: [
      "Janan does not quote exact, unsourced government visa fees.",
      "Janan does not guarantee visa approval or a specific processing time.",
      "Janan does not provide legal representation and is not a registered immigration adviser.",
      "Janan never advises concealing information or submitting altered or misleading documents.",
    ],
    importantNotice:
      "Visa rules, documentation requirements, fees and processing times can change. Final decisions are made solely by the relevant government authority.",
    faqItems: [
      {
        id: "vg-faq-guarantee",
        question: "Can you guarantee my visa will be approved?",
        answer:
          "No — visa decisions are made solely by the relevant government authority. We help you prepare a complete, well-organised application.",
      },
      {
        id: "vg-faq-fees",
        question: "Can you tell me the exact visa fee I'll pay?",
        answer:
          "No — fees are set and updated by the relevant government and can change. Always confirm current fees on the official government website.",
      },
      {
        id: "vg-faq-lawyer",
        question: "Is this the same as hiring an immigration lawyer?",
        answer:
          "No — Janan is not a registered immigration adviser and does not provide legal representation. We provide general documentation and process guidance.",
      },
    ],
    relatedServiceSlugs: ["application-assistance", "pre-departure-guidance"],
    primaryCta: { label: "Book Free Consultation", href: "/book-consultation" },
    seo: {
      metaTitle: "Student Visa Guidance",
      metaDescription:
        "General guidance organising student visa documentation and understanding the application process — always alongside official government sources.",
    },
    lastReviewed: "2026-09-13",
    contentStatus: "published",
    isFeatured: true,
  },
  {
    id: "scholarship-guidance",
    slug: "scholarship-guidance",
    title: "Scholarship Guidance",
    shortTitle: "Scholarships",
    category: "study-planning",
    summary:
      "Guidance identifying, understanding and applying for scholarship opportunities.",
    heroTitle: "Scholarship Guidance",
    heroDescription:
      "Practical help identifying possible opportunities and preparing a stronger scholarship application.",
    icon: "Award",
    overview:
      "Scholarships are awarded by universities, governments and other funding bodies, each with their own criteria and process. This service helps you identify possible opportunities relevant to your situation and prepare a stronger, more organised application — it does not guarantee selection or funding, and does not maintain a list of named scholarships on this page.",
    whoItMayHelp:
      "This may help students who want structured support researching and applying for scholarships alongside their main university applications.",
    benefits: [
      {
        id: "sg-structured",
        title: "A more structured search",
        description:
          "Help focusing your search on opportunities relevant to your situation.",
      },
      {
        id: "sg-stronger",
        title: "A stronger application",
        description:
          "Guidance preparing a complete, well-organised scholarship application.",
      },
    ],
    includedSupport: [
      {
        id: "sg-identify",
        title: "Identifying possible opportunities",
        description:
          "Help researching scholarship opportunities relevant to your destination and profile.",
      },
      {
        id: "sg-eligibility",
        title: "Reviewing eligibility",
        description:
          "General guidance reviewing whether you may meet published eligibility criteria.",
      },
      {
        id: "sg-deadlines",
        title: "Understanding deadlines",
        description: "Help keeping track of each scholarship's own deadlines.",
      },
      {
        id: "sg-documents",
        title: "Preparing required documents",
        description:
          "Guidance preparing the documents a scholarship application typically needs.",
      },
      {
        id: "sg-statement",
        title: "Personal-statement guidance",
        description:
          "Guidance structuring and clarifying your own statement or essay.",
      },
      {
        id: "sg-evidence",
        title: "Organizing supporting evidence",
        description:
          "Help organising references, transcripts and other supporting evidence.",
      },
      {
        id: "sg-tracking",
        title: "Tracking applications",
        description:
          "Help staying organised across multiple scholarship applications.",
      },
    ],
    processSteps: [
      {
        id: "sg-step-1",
        step: 1,
        title: "Identify possible opportunities",
        description:
          "Research scholarships relevant to your destination, subject and profile.",
      },
      {
        id: "sg-step-2",
        step: 2,
        title: "Review eligibility and deadlines",
        description:
          "Confirm which opportunities are realistic for your situation and timeline.",
      },
      {
        id: "sg-step-3",
        step: 3,
        title: "Prepare your application",
        description: "Prepare documents, statements and supporting evidence.",
      },
      {
        id: "sg-step-4",
        step: 4,
        title: "Track your applications",
        description:
          "Stay organised as you apply to more than one opportunity.",
      },
    ],
    requiredInformation: [
      "Academic transcripts and certificates",
      "A draft or outline of any required personal statement",
      "Details of your intended destination, institution and programme",
    ],
    limitations: [
      "Janan does not maintain a directory of named scholarships on this page — a structured scholarship directory is planned for a later phase.",
      "Scholarships are awarded by the relevant institution or funding body, not by Janan.",
    ],
    importantNotice:
      "Scholarships are awarded by the relevant institution or funding body. Guidance does not guarantee selection or funding.",
    faqItems: [
      {
        id: "sg-faq-list",
        question: "Do you have a list of scholarships I can apply to?",
        answer:
          "Not yet on this page — a structured scholarship directory is planned for a later phase. During a consultation, we can discuss opportunities relevant to your specific situation.",
      },
      {
        id: "sg-faq-guarantee",
        question:
          "If I use this service, am I more likely to get a scholarship?",
        answer:
          "We can't guarantee selection or funding — scholarships are awarded by the relevant institution or funding body. We help you prepare the strongest, most organised application you can.",
      },
    ],
    relatedServiceSlugs: ["study-abroad-counselling", "application-assistance"],
    primaryCta: { label: "Book Free Consultation", href: "/book-consultation" },
    seo: {
      metaTitle: "Scholarship Guidance",
      metaDescription:
        "Guidance identifying possible scholarship opportunities and preparing a stronger application — no invented or guaranteed scholarships.",
    },
    lastReviewed: "2026-09-13",
    contentStatus: "published",
    isFeatured: false,
  },
  {
    id: "accommodation-support",
    slug: "accommodation-support",
    title: "Accommodation Support",
    shortTitle: "Accommodation",
    category: "journey-preparation",
    summary: "Help finding suitable student accommodation ahead of your move.",
    heroTitle: "Accommodation Support",
    heroDescription:
      "General guidance comparing accommodation options and what to check before you commit.",
    icon: "Building2",
    overview:
      "Finding suitable accommodation is one of the more time-sensitive parts of preparing to study abroad. This service provides general guidance and, where available, referral assistance across common accommodation categories — Janan does not guarantee property availability, condition or landlord performance.",
    whoItMayHelp:
      "This may help students who have confirmed their destination and institution and now need to plan where they'll live.",
    benefits: [
      {
        id: "as-university-managed",
        title: "University-managed accommodation",
        description:
          "Halls or residences run directly by your institution, where available.",
      },
      {
        id: "as-private",
        title: "Private student residences",
        description:
          "Purpose-built student accommodation operated by private providers.",
      },
      {
        id: "as-shared",
        title: "Shared housing",
        description:
          "Renting privately with other students, typically for more independence.",
      },
      {
        id: "as-homestay",
        title: "Homestay, where available",
        description:
          "Living with a local host family, offered by some destinations and institutions.",
      },
      {
        id: "as-temporary",
        title: "Temporary arrival accommodation",
        description:
          "Short-term options to cover your first days before longer-term accommodation begins.",
      },
    ],
    includedSupport: [
      {
        id: "as-location",
        title: "Location",
        description: "How location affects daily life, cost and commute.",
      },
      {
        id: "as-transport",
        title: "Transport",
        description: "Access to public transport or campus shuttle services.",
      },
      {
        id: "as-contract",
        title: "Contract duration",
        description: "How contract length matches your intended stay.",
      },
      {
        id: "as-deposit",
        title: "Deposit",
        description:
          "General guidance on typical deposit arrangements to check.",
      },
      {
        id: "as-utilities",
        title: "Included utilities",
        description: "What's typically included versus billed separately.",
      },
      {
        id: "as-safety",
        title: "Safety considerations",
        description:
          "General factors to check when assessing an area or building.",
      },
      {
        id: "as-cancellation",
        title: "Cancellation policy",
        description:
          "Understanding a provider's cancellation terms before you commit.",
      },
    ],
    processSteps: [
      {
        id: "as-step-1",
        step: 1,
        title: "Review your options",
        description:
          "Compare accommodation categories relevant to your destination and budget.",
      },
      {
        id: "as-step-2",
        step: 2,
        title: "Check the details",
        description:
          "Work through location, contract, deposit and cancellation considerations.",
      },
      {
        id: "as-step-3",
        step: 3,
        title: "Confirm before you travel",
        description:
          "Aim to confirm accommodation ahead of your departure where possible.",
      },
    ],
    requiredInformation: [
      "Your destination, institution and intended move-in date",
      "Your accommodation budget range",
      "Any specific preferences (shared vs. private, distance from campus, etc.)",
    ],
    limitations: [
      "Janan may provide general guidance or referral assistance but does not guarantee property availability, condition or landlord performance.",
    ],
    faqItems: [
      {
        id: "as-faq-book",
        question: "Will Janan book my accommodation for me?",
        answer:
          "We provide general guidance and, where available, referral assistance — but we do not guarantee availability, condition or landlord performance, and any booking is between you and the provider.",
      },
      {
        id: "as-faq-when",
        question: "When should I start looking for accommodation?",
        answer:
          "As early as practical once your destination and institution are confirmed — popular options can fill up, especially near major intakes.",
      },
    ],
    relatedServiceSlugs: ["pre-departure-guidance"],
    primaryCta: { label: "Book Free Consultation", href: "/book-consultation" },
    seo: {
      metaTitle: "Accommodation Support",
      metaDescription:
        "General guidance comparing student accommodation categories and what to check before you commit — no guaranteed availability or property claims.",
    },
    lastReviewed: "2026-09-13",
    contentStatus: "published",
    isFeatured: true,
  },
  {
    id: "pre-departure-guidance",
    slug: "pre-departure-guidance",
    title: "Pre-departure Guidance",
    shortTitle: "Pre-departure",
    category: "journey-preparation",
    summary: "Practical preparation guidance before you travel.",
    heroTitle: "Pre-departure Guidance",
    heroDescription:
      "A practical checklist-style approach to the final stage of preparation before you travel.",
    icon: "Luggage",
    overview:
      "The weeks before departure involve a lot of practical preparation. This service helps you work through it systematically, so nothing important gets missed in the final rush before you travel.",
    whoItMayHelp:
      "This may help students who have a confirmed offer, visa in progress or approved, and are now preparing for departure.",
    benefits: [
      {
        id: "pdg-systematic",
        title: "A systematic approach",
        description:
          "Work through preparation in a logical order rather than an ad-hoc list.",
      },
      {
        id: "pdg-confidence",
        title: "More confidence before you travel",
        description: "Reduce the chance of overlooking something important.",
      },
    ],
    includedSupport: [
      {
        id: "pdg-documents",
        title: "Travel-document checklist",
        description:
          "A checklist of the travel documents you're likely to need.",
      },
      {
        id: "pdg-insurance",
        title: "Insurance preparation",
        description:
          "General guidance confirming your insurance is arranged before you travel — see our Insurance guidance.",
      },
      {
        id: "pdg-accommodation",
        title: "Accommodation confirmation",
        description:
          "Confirming your accommodation arrangements ahead of arrival.",
      },
      {
        id: "pdg-packing",
        title: "Packing considerations",
        description:
          "General guidance on what to consider packing for your destination.",
      },
      {
        id: "pdg-arrival",
        title: "Airport and arrival planning",
        description:
          "Planning your arrival, including transport from the airport.",
      },
      {
        id: "pdg-financial",
        title: "Financial preparation",
        description:
          "General guidance on arranging accessible funds for your first weeks.",
      },
      {
        id: "pdg-emergency",
        title: "Emergency contacts",
        description: "Preparing a list of emergency and important contacts.",
      },
      {
        id: "pdg-cultural",
        title: "Cultural adjustment",
        description:
          "General guidance on adjusting to a new academic and cultural environment.",
      },
      {
        id: "pdg-registration",
        title: "University registration preparation",
        description:
          "Preparing for your institution's own registration/enrolment process.",
      },
    ],
    processSteps: [
      {
        id: "pdg-step-1",
        step: 1,
        title: "Confirm the essentials",
        description: "Documents, insurance and accommodation confirmed.",
      },
      {
        id: "pdg-step-2",
        step: 2,
        title: "Plan practical logistics",
        description: "Packing, arrival and financial preparation.",
      },
      {
        id: "pdg-step-3",
        step: 3,
        title: "Prepare for arrival",
        description:
          "Emergency contacts, cultural adjustment and registration preparation.",
      },
    ],
    requiredInformation: [
      "Your confirmed travel dates",
      "Your visa and insurance status",
      "Your confirmed accommodation details",
    ],
    limitations: [
      "Janan does not provide country-specific legal guarantees and cannot guarantee travel conditions or outcomes.",
      "Travel advice from your own government should always be checked directly before you travel.",
    ],
    faqItems: [
      {
        id: "pdg-faq-when",
        question: "When should pre-departure preparation start?",
        answer:
          "Generally once your visa is approved (or well underway) and your travel dates are confirmed — a few weeks' lead time is usually sensible.",
      },
      {
        id: "pdg-faq-safety",
        question: "Can you guarantee my destination is safe?",
        answer:
          "No — always check official travel advice from your own government directly. We help with practical preparation, not country-specific safety guarantees.",
      },
    ],
    relatedServiceSlugs: ["accommodation-support", "visa-guidance"],
    primaryCta: { label: "Book Free Consultation", href: "/book-consultation" },
    seo: {
      metaTitle: "Pre-departure Guidance",
      metaDescription:
        "Practical, checklist-style guidance preparing for departure: documents, insurance, accommodation, packing, arrival and registration.",
    },
    lastReviewed: "2026-09-13",
    contentStatus: "published",
    isFeatured: true,
  },
];

export const howSupportWorks: KeyPoint[] = [
  {
    id: "hsw-one-step",
    title: "One step at a time",
    description:
      "We work through your situation in stages rather than promising a one-size-fits-all answer.",
  },
  {
    id: "hsw-general-applied",
    title: "General guidance, applied to you",
    description:
      "The frameworks are general — how they apply depends on your own background and goals.",
  },
  {
    id: "hsw-clear-next-steps",
    title: "Clear next steps",
    description: "Every conversation should leave you knowing what to do next.",
  },
  {
    id: "hsw-alongside-official",
    title: "Alongside official processes, not instead of them",
    description:
      "We support you through institutions' and governments' own processes — we don't replace them.",
  },
];

export const honestScopeLimitations: KeyPoint[] = [
  {
    id: "scope-no-guarantee-admission",
    title: "We don't guarantee admission or visa approval",
    description:
      "These decisions are made solely by institutions and government authorities.",
  },
  {
    id: "scope-no-control",
    title: "We don't control external decisions",
    description:
      "Universities, scholarship bodies and immigration authorities make their own decisions independently.",
  },
  {
    id: "scope-not-insurer",
    title: "We're not an insurer",
    description:
      "Insurance guidance is general information and quotation assistance — coverage decisions rest with the provider.",
  },
  {
    id: "scope-no-writing",
    title: "We don't write your content for you",
    description:
      "We guide you in presenting your own experience — the material you submit remains yours.",
  },
  {
    id: "scope-not-legal-adviser",
    title: "We're not a registered immigration adviser",
    description:
      "Visa guidance is general and documentation-focused, not legal representation.",
  },
];

export const servicesFaqItems: FaqItem[] = [
  {
    id: "services-faq-which",
    question: "How do I know which service I need?",
    answer:
      "Many students use several services together, starting with counselling. A free consultation can help you work out where to start.",
  },
  {
    id: "services-faq-combine",
    question: "Can I use more than one service at the same time?",
    answer:
      "Yes — most students combine several services as they move from planning through to departure.",
  },
  {
    id: "services-faq-guarantee",
    question:
      "Do any of these services guarantee admission, a visa or a scholarship?",
    answer:
      "No — these decisions are made solely by institutions and government authorities. Our services provide guidance and practical support, not guaranteed outcomes.",
  },
  {
    id: "services-faq-insurance",
    question: "Is insurance one of these services?",
    answer:
      "Insurance is a separate, clearly labelled section — see our Insurance guidance for student health, travel and visitor insurance information.",
  },
];

export const servicesFinalCta: FinalCtaContent = {
  heading: "Ready to talk through your options?",
  description:
    "Book a free consultation to discuss which support makes sense for your situation.",
  primaryCta: { label: "Book Free Consultation", href: "/book-consultation" },
  secondaryCta: { label: "Check Your Eligibility", href: "/check-eligibility" },
};
