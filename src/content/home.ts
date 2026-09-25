import type {
  ExampleUniversity,
  FaqItem,
  FinalCtaContent,
  HomeEventSummary,
  HomeHeroContent,
  InsuranceHighlight,
  ProcessStep,
  ResourceSummary,
  ScholarshipHighlight,
  SuccessStoryDemo,
  TrustPoint,
  WhyChooseReason,
} from "@/types/content";

/**
 * Homepage-specific content. Every array/object here is read through
 * src/lib/content/home.ts — pages and components should not import this
 * file directly (see docs/TECHNICAL_ARCHITECTURE.md "Content Access
 * Approach").
 */

export const homeHero: HomeHeroContent = {
  eyebrow: "Global education, clearly planned",
  heading: "Build your future beyond borders.",
  description:
    "Personal guidance for choosing a destination, preparing your application and planning every step before departure.",
  reassuranceItems: [
    "Personal guidance",
    "Clear next steps",
    "No guaranteed outcomes",
  ],
  primaryCta: { label: "Start Your Journey", href: "/book-consultation" },
  secondaryCta: { label: "Explore Destinations", href: "/study-abroad" },
  tertiaryLink: { label: "Check Your Eligibility", href: "/check-eligibility" },
};

/**
 * Qualitative trust messages only — no invented statistics, success
 * percentages, or years-in-business claims (docs/DESIGN_SYSTEM.md §12).
 */
export const trustPoints: TrustPoint[] = [
  {
    id: "personalised-guidance",
    title: "Personalised Guidance",
    description: "Advice shaped around your goals, background and preferences.",
  },
  {
    id: "clear-application-support",
    title: "Clear Application Support",
    description:
      "Step-by-step help preparing a complete, well-organised application.",
  },
  {
    id: "transparent-process",
    title: "Transparent Process",
    description: "Straightforward communication with no exaggerated promises.",
  },
  {
    id: "before-departure-support",
    title: "Support Before Departure",
    description: "Practical guidance to help you prepare for life abroad.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    id: "consult",
    step: 1,
    title: "Book a consultation",
    description: "Tell us a little about your background and study goals.",
  },
  {
    id: "discuss",
    step: 2,
    title: "Discuss your goals",
    description:
      "We talk through your priorities, budget and preferences together.",
  },
  {
    id: "select",
    step: 3,
    title: "Select a course and destination",
    description:
      "Narrow down realistic options that fit what you're looking for.",
  },
  {
    id: "prepare",
    step: 4,
    title: "Prepare your application",
    description:
      "We help you put together a complete, well-organised application.",
  },
  {
    id: "visa",
    step: 5,
    title: "Receive visa-document guidance",
    description:
      "Guidance on the documentation your visa application will need.",
  },
  {
    id: "depart",
    step: 6,
    title: "Prepare for departure",
    description: "Practical guidance to help you get ready before you travel.",
  },
];

export const whyChooseReasons: WhyChooseReason[] = [
  {
    id: "student-shaped",
    title: "Advice shaped around the student",
    description:
      "We start with your goals and background, not a one-size-fits-all script.",
  },
  {
    id: "clear-communication",
    title: "Clear and practical communication",
    description:
      "Plain-English guidance you can act on, without jargon or pressure.",
  },
  {
    id: "full-journey",
    title: "Support across the complete journey",
    description:
      "From your first consultation through to pre-departure preparation.",
  },
  {
    id: "transparent-next-steps",
    title: "Transparent next steps",
    description: "You'll always know what's happening next and why.",
  },
];

/**
 * Real universities, named purely as illustrative examples of where
 * students in each of our six covered destinations might study — one per
 * destination. Deliberately NOT framed as partners, affiliates, or an
 * admissions guarantee: no "our partner", no logo/trademark use, no
 * ranking numbers or acceptance-rate claims, just the kind of general,
 * publicly-known fact (age, size, subject strength) any study-abroad
 * resource would mention. See docs/DECISIONS.md "Hero University
 * Examples" for the reasoning and the lead architect's explicit sign-off
 * on naming real institutions here (a deliberate exception to this
 * project's usual generic-placeholder-only policy for unverified
 * content).
 */
export const exampleUniversities: ExampleUniversity[] = [
  {
    id: "oxford",
    name: "University of Oxford",
    city: "Oxford",
    country: "United Kingdom",
    destinationSlug: "united-kingdom",
    blurb: "One of the world's oldest English-speaking universities.",
    icon: "Landmark",
  },
  {
    id: "toronto",
    name: "University of Toronto",
    city: "Toronto",
    country: "Canada",
    destinationSlug: "canada",
    blurb: "Canada's largest university by research output.",
    icon: "Landmark",
  },
  {
    id: "melbourne",
    name: "University of Melbourne",
    city: "Melbourne",
    country: "Australia",
    destinationSlug: "australia",
    blurb: "Consistently ranked among Australia's leading universities.",
    icon: "Landmark",
  },
  {
    id: "ucla",
    name: "UCLA",
    city: "Los Angeles",
    country: "United States",
    destinationSlug: "united-states",
    blurb: "A leading public research university in California.",
    icon: "Landmark",
  },
  {
    id: "tum",
    name: "Technical University of Munich",
    city: "Munich",
    country: "Germany",
    destinationSlug: "germany",
    blurb: "A top-ranked institution for engineering and technology.",
    icon: "Landmark",
  },
  {
    id: "trinity-dublin",
    name: "Trinity College Dublin",
    city: "Dublin",
    country: "Ireland",
    destinationSlug: "ireland",
    blurb: "Ireland's oldest university, founded in 1592.",
    icon: "Landmark",
  },
];

export const scholarshipHighlights: ScholarshipHighlight[] = [
  {
    id: "finding",
    title: "Finding relevant opportunities",
    description:
      "We help you identify scholarships that genuinely match your profile.",
  },
  {
    id: "eligibility",
    title: "Understanding eligibility",
    description: "Clear guidance on what each opportunity actually requires.",
  },
  {
    id: "documents",
    title: "Preparing supporting documents",
    description: "Support putting together the documents an application needs.",
  },
  {
    id: "deadlines",
    title: "Tracking deadlines",
    description: "Help staying organised so key dates aren't missed.",
  },
];

/**
 * Demonstration profiles only — not real students. Every profile must
 * render its "Demo content" label; do not remove `isSampleContent`
 * without lead-architect sign-off (docs/DESIGN_SYSTEM.md §12).
 */
export const successStoryDemos: SuccessStoryDemo[] = [
  {
    id: "demo-1",
    initials: "A.S.",
    displayName: "Example student journey — A.S.",
    destinationName: "United Kingdom",
    quote:
      "The guidance made a confusing process feel manageable, step by step.",
    outcomeSummary:
      "Completed an undergraduate application with structured support.",
    isSampleContent: true,
  },
  {
    id: "demo-2",
    initials: "R.K.",
    displayName: "Example student journey — R.K.",
    destinationName: "Canada",
    quote:
      "Having someone to ask questions along the way made a real difference.",
    outcomeSummary:
      "Prepared a postgraduate application with document support.",
    isSampleContent: true,
  },
  {
    id: "demo-3",
    initials: "M.H.",
    displayName: "Example student journey — M.H.",
    destinationName: "Australia",
    quote:
      "The pre-departure guidance helped me feel ready before I travelled.",
    outcomeSummary: "Received pre-departure preparation guidance.",
    isSampleContent: true,
  },
];

export const insuranceHighlights: InsuranceHighlight[] = [
  {
    id: "health",
    title: "Student health insurance",
    description:
      "Guidance understanding health-cover options while you study abroad.",
  },
  {
    id: "travel",
    title: "Travel insurance",
    description:
      "Support arranging cover for your journey to and from your destination.",
  },
  {
    id: "visitor",
    title: "Visitor insurance",
    description: "Guidance for accompanying family members, where relevant.",
  },
  {
    id: "coverage",
    title: "Coverage guidance",
    description: "Help understanding what a policy is likely to cover.",
  },
  {
    id: "quote",
    title: "Quote assistance",
    description: "Help requesting a quotation suited to your situation.",
  },
  {
    id: "claims",
    title: "Claims-support guidance",
    description: "Guidance on the general claims process if you ever need it.",
  },
];

export const insuranceDisclaimer =
  "Janan provides general guidance and quotation assistance. Coverage, eligibility, exclusions and policy issuance are determined by the relevant insurance provider.";

/** Sample event only — replace with real event content, not a new component, when available. */
export const sampleEvent: HomeEventSummary = {
  id: "sample-event-1",
  title: "Study Abroad Planning Session",
  format: "Free consultation webinar",
  scheduleLabel: "Schedule to be announced",
  description:
    "An introductory session covering how to approach choosing a destination, university and programme.",
  isSampleContent: true,
};

export const resourceSummaries: ResourceSummary[] = [
  {
    id: "choosing-a-destination",
    slug: "how-to-choose-the-right-study-destination",
    title: "How to Choose the Right Study Destination",
    summary:
      "A practical way to think through destination options based on your goals.",
  },
  {
    id: "application-documents",
    slug: "documents-commonly-needed-for-university-applications",
    title: "Documents Commonly Needed for University Applications",
    summary:
      "A general overview of documentation many university applications ask for.",
  },
  {
    id: "understanding-insurance",
    slug: "understanding-student-travel-and-health-insurance",
    title: "Understanding Student Travel and Health Insurance",
    summary:
      "A plain-English introduction to how student travel and health cover works.",
  },
];

export const faqItems: FaqItem[] = [
  {
    id: "when-to-start",
    question: "When should I begin my study-abroad application?",
    answer:
      "Earlier is generally better — many applications and visa processes take time. Booking a consultation early gives you the most options.",
  },
  {
    id: "choose-university",
    question: "Can you help me choose a university and programme?",
    answer:
      "Yes. We help you shortlist universities and programmes based on your goals, background and preferences.",
  },
  {
    id: "guarantee-admission",
    question: "Do you guarantee admission or visa approval?",
    answer:
      "No. Admission and visa decisions are made solely by the relevant institutions and government authorities — we cannot and do not guarantee outcomes.",
  },
  {
    id: "scholarship-help",
    question: "Can you help with scholarship applications?",
    answer:
      "Yes. We help you find relevant opportunities, understand eligibility, prepare supporting documents and track deadlines. We cannot guarantee a scholarship will be awarded.",
  },
  {
    id: "insurance-services",
    question: "What insurance services do you assist with?",
    answer:
      "We offer guidance and quotation assistance for student health, travel and visitor insurance. Policies themselves are issued by the relevant insurance provider, not by Janan.",
  },
  {
    id: "book-consultation",
    question: "How can I book a consultation?",
    answer:
      'Use the "Book Free Consultation" button anywhere on the site, or contact us directly via phone or WhatsApp.',
  },
];

export const finalCta: FinalCtaContent = {
  heading: "Ready to explore your options?",
  description:
    "Tell us about your study goals and take the first step toward a clearer application plan.",
  primaryCta: { label: "Book Free Consultation", href: "/book-consultation" },
  secondaryCta: { label: "Check Your Eligibility", href: "/check-eligibility" },
};
