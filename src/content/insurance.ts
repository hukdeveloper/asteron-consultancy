import type {
  FaqItem,
  InsuranceService,
  KeyPoint,
  ProcessStep,
} from "@/types/content";

/**
 * Insurance content for /insurance and /insurance/[slug]. Insurance stays a
 * distinct entity from Service (docs/DECISIONS.md C-004) — it is guidance
 * and quotation assistance, not underwriting. See the global disclosure
 * below and docs/DECISIONS.md "Content Accuracy" for the policy this
 * content follows: no invented providers, no premiums, no guaranteed
 * coverage or claims outcomes.
 */

export const insuranceHero = {
  eyebrow: "Insurance",
  heading: "Understand your insurance options before you travel.",
  description:
    "Get guidance on student health, travel and visitor insurance options, including the information commonly needed to request a quotation.",
};

export const insuranceIntro =
  "Insurance guidance is related to, but separate from, Asteron's education consulting services. We provide general information and help you request a quotation — coverage, premiums and policy decisions are always made by the relevant insurance provider, not by Asteron.";

/**
 * The single global insurance disclosure, shown on the hub, every insurance
 * detail page, and the quote page. Distinct from (but consistent with) the
 * shorter `insuranceDisclaimer` used as a homepage teaser in
 * src/content/home.ts — this fuller version is the one the Phase 5 brief
 * specifically requires for the dedicated Insurance section.
 */
export const insuranceGlobalDisclosure =
  "Asteron Global Consultancy provides general information and quotation assistance. Insurance coverage, premiums, eligibility, exclusions, claims and policy issuance are determined by the relevant insurance provider. Always review the provider's official policy wording before purchase.";

export const insuranceWhyRequired: KeyPoint[] = [
  {
    id: "why-institution",
    title: "Institutional requirements",
    description:
      "Some universities require proof of health cover as a condition of enrolment.",
  },
  {
    id: "why-visa",
    title: "Visa-related requirements",
    description:
      "Some visa categories require appropriate insurance as part of the application.",
  },
  {
    id: "why-unexpected-costs",
    title: "Unexpected medical costs",
    description:
      "Healthcare abroad can be costly without appropriate cover in place.",
  },
  {
    id: "why-travel-disruption",
    title: "Travel disruption",
    description:
      "Delays, cancellations or lost belongings can affect any trip.",
  },
];

export const insuranceComparisonConsiderations: KeyPoint[] = [
  {
    id: "compare-coverage-limits",
    title: "Coverage limits",
    description:
      "The maximum amount a policy may pay out for a given type of claim.",
  },
  {
    id: "compare-exclusions",
    title: "Exclusions",
    description:
      "What a policy explicitly does not cover — always worth reading closely.",
  },
  {
    id: "compare-deductible",
    title: "Deductible or excess",
    description: "The amount you may need to pay before cover applies.",
  },
  {
    id: "compare-premium",
    title: "Premium versus cover",
    description:
      "A lower premium can mean lower limits or more exclusions — compare both together.",
  },
  {
    id: "compare-claims-process",
    title: "Claims process",
    description:
      "How straightforward the provider's claims process is likely to be.",
  },
  {
    id: "compare-network",
    title: "Provider network",
    description:
      "Whether the policy has a network of approved hospitals or clinics.",
  },
];

export const insuranceQuoteProcessSteps: ProcessStep[] = [
  {
    id: "quote-step-1",
    step: 1,
    title: "Share your details",
    description:
      "Tell us about your destination, dates and the type of cover you need.",
  },
  {
    id: "quote-step-2",
    step: 2,
    title: "We help you request a quote",
    description:
      "We help match your situation to a relevant provider quotation.",
  },
  {
    id: "quote-step-3",
    step: 3,
    title: "Review the policy wording",
    description:
      "Review the provider's official policy wording before deciding.",
  },
  {
    id: "quote-step-4",
    step: 4,
    title: "Confirm with the provider",
    description:
      "Coverage, premiums and issuance are confirmed directly with the provider.",
  },
];

export const insuranceProviderDisclosureGeneral =
  "Asteron does not underwrite insurance, does not set premiums, and does not approve or guarantee claims. Our role is to provide general information and help you request a quotation from a relevant insurance provider.";

export const insuranceClaimsSupportGeneral =
  "If you ever need to make a claim, we can offer general guidance on the process — but claims are assessed and approved solely by the insurance provider, following their own policy terms.";

export const insuranceHubFaqItems: FaqItem[] = [
  {
    id: "insurance-hub-faq-issuer",
    question: "Is Asteron an insurance company?",
    answer:
      "No — Asteron is not an insurer. We provide general information and quotation assistance; coverage and policy issuance are handled by the relevant insurance provider.",
  },
  {
    id: "insurance-hub-faq-which",
    question: "Which type of insurance do I need?",
    answer:
      "It depends on your situation — student health insurance is typically for the duration of study, travel insurance covers your journey, and visitor insurance is typically for accompanying family or short visits. See each page for general guidance.",
  },
  {
    id: "insurance-hub-faq-guarantee",
    question: "Can you guarantee my claim will be paid?",
    answer:
      "No — claims are assessed and approved solely by the insurance provider under their own policy terms. We can offer general guidance on the process.",
  },
];

export const insuranceServices: InsuranceService[] = [
  {
    id: "student-health-insurance",
    slug: "student-health-insurance",
    title: "Student Health Insurance",
    summary:
      "General guidance on health cover for the duration of your studies.",
    heroTitle: "Student Health Insurance",
    heroDescription:
      "General guidance on health cover that may support you throughout your time studying abroad.",
    insuranceType: "student-health",
    visualIcon: "HeartPulse",
    overview:
      "Studying abroad often means being outside your home healthcare system for an extended period. Student health insurance is intended to help with medical costs during your studies — some institutions or visa categories may require evidence of appropriate cover. Coverage varies by provider and policy, so always review the specific policy wording before purchase.",
    possibleCoverageAreas: [
      {
        id: "shi-medical-costs",
        title: "Medical-cost protection",
        description:
          "May help with the cost of medical treatment while you study.",
      },
      {
        id: "shi-emergency",
        title: "Emergency treatment",
        description: "May include cover for emergency medical situations.",
      },
      {
        id: "shi-hospitalization",
        title: "Hospitalization",
        description: "May include cover for inpatient hospital stays.",
      },
      {
        id: "shi-outpatient",
        title: "Outpatient services",
        description:
          "May include cover for outpatient consultations and treatment.",
      },
      {
        id: "shi-prescriptions",
        title: "Prescription considerations",
        description:
          "Some policies may include prescription cost considerations, subject to policy terms.",
      },
    ],
    commonExclusionsNote:
      "Policies commonly exclude pre-existing conditions (unless declared and accepted), certain elective treatments, and care outside the policy's coverage period or provider network. Exclusions and waiting periods vary by provider — always check the specific policy wording.",
    eligibilityNote:
      "Eligibility, coverage period and provider networks vary by policy and provider, and may relate to your institution's or visa category's own requirements. Confirm current eligibility criteria directly with the provider.",
    informationNeededForQuote: [
      "Your destination and institution",
      "Your intended coverage start and end dates",
      "Your date of birth",
      "Whether your institution or visa specifies a minimum required cover",
    ],
    processSteps: insuranceQuoteProcessSteps,
    providerDisclosure: insuranceProviderDisclosureGeneral,
    claimsSupportDescription: insuranceClaimsSupportGeneral,
    faqItems: [
      {
        id: "shi-faq-required",
        question: "Do I have to have student health insurance?",
        answer:
          "Some institutions or visa categories require it — check your specific institution's and destination's requirements. We can help you understand what may apply generally.",
      },
      {
        id: "shi-faq-preexisting",
        question: "Are pre-existing conditions covered?",
        answer:
          "Commonly excluded unless declared and accepted by the provider — this varies by policy. Always check the specific policy wording.",
      },
    ],
    relatedServiceSlugs: ["pre-departure-guidance", "visa-guidance"],
    seo: {
      metaTitle: "Student Health Insurance Guidance",
      metaDescription:
        "General guidance on student health insurance: possible coverage areas, common exclusions, eligibility and the information needed for a quote.",
    },
    lastReviewed: "2026-09-13",
    contentStatus: "published",
  },
  {
    id: "travel-insurance",
    slug: "travel-insurance",
    title: "Travel Insurance",
    summary:
      "General guidance on cover for your journey to and from your destination.",
    heroTitle: "Travel Insurance",
    heroDescription:
      "General guidance on cover for the journey itself — separate from ongoing student health cover.",
    insuranceType: "travel",
    visualIcon: "Plane",
    overview:
      "Travel insurance is generally intended to cover your journey — for example a flight to or from your study destination, or a shorter trip. Benefits and limits vary significantly by provider and policy, so always review the specific policy wording before purchase.",
    possibleCoverageAreas: [
      {
        id: "ti-medical",
        title: "Emergency medical expenses",
        description:
          "May include cover for emergency medical costs while travelling.",
      },
      {
        id: "ti-interruption",
        title: "Trip interruption",
        description:
          "May include cover if your trip is cut short for a covered reason.",
      },
      {
        id: "ti-cancellation",
        title: "Trip cancellation",
        description:
          "May include cover if you need to cancel before travelling, for a covered reason.",
      },
      {
        id: "ti-baggage",
        title: "Baggage-related coverage",
        description: "May include cover for lost, delayed or damaged baggage.",
      },
      {
        id: "ti-delay",
        title: "Travel delays",
        description:
          "May include cover for costs arising from a covered delay.",
      },
      {
        id: "ti-assistance",
        title: "Emergency assistance",
        description:
          "Some policies include access to a 24-hour emergency assistance line.",
      },
      {
        id: "ti-liability",
        title: "Personal liability, where included",
        description:
          "Some policies include personal liability cover — this varies by provider.",
      },
    ],
    commonExclusionsNote:
      "Benefits, limits and exclusions vary significantly by provider and policy — always confirm what's covered before you rely on a policy for a specific trip.",
    eligibilityNote:
      "Eligibility and available cover vary by provider, trip length and destination. Confirm current eligibility directly with the provider.",
    informationNeededForQuote: [
      "Your travel dates and destination",
      "Trip duration or expected return date",
      "Your date of birth",
      "Number of travellers",
    ],
    processSteps: insuranceQuoteProcessSteps,
    providerDisclosure: insuranceProviderDisclosureGeneral,
    claimsSupportDescription: insuranceClaimsSupportGeneral,
    faqItems: [
      {
        id: "ti-faq-vs-health",
        question: "How is this different from student health insurance?",
        answer:
          "Travel insurance generally covers your journey (a specific trip), while student health insurance is generally intended to cover the duration of your studies. Depending on your situation, you may need one or both — check with the provider.",
      },
      {
        id: "ti-faq-family",
        question: "Can family members travelling with me be covered?",
        answer:
          "This depends on the policy and provider — some allow multiple travellers on one policy. Confirm with the provider when requesting a quote.",
      },
    ],
    relatedServiceSlugs: ["pre-departure-guidance"],
    seo: {
      metaTitle: "Travel Insurance Guidance",
      metaDescription:
        "General guidance on travel insurance: possible coverage areas, exclusions, eligibility and the information needed for a quote.",
    },
    lastReviewed: "2026-09-13",
    contentStatus: "published",
  },
  {
    id: "visitor-insurance",
    slug: "visitor-insurance",
    title: "Visitor Insurance",
    summary:
      "General guidance for accompanying family members or short-term visitors.",
    heroTitle: "Visitor Insurance",
    heroDescription:
      "General guidance for family members or others visiting you while you study abroad.",
    insuranceType: "visitor",
    visualIcon: "Users",
    overview:
      "Visitor insurance is generally intended for people visiting a destination for a limited period — for example, a parent or family member visiting a student. This is general information only, not immigration advice; visa and entry requirements are set by the relevant government authority.",
    possibleCoverageAreas: [
      {
        id: "vi-audience",
        title: "Intended audience",
        description:
          "Generally intended for short-term visitors rather than someone relocating long-term.",
      },
      {
        id: "vi-duration",
        title: "Trip duration",
        description:
          "Available cover periods vary by provider — confirm the maximum duration offered.",
      },
      {
        id: "vi-medical",
        title: "Emergency medical considerations",
        description:
          "May include cover for emergency medical treatment during the visit.",
      },
      {
        id: "vi-limits",
        title: "Coverage limits",
        description:
          "Policies set maximum payout limits that vary by provider and plan.",
      },
      {
        id: "vi-deductible",
        title: "Deductibles or excess",
        description:
          "Some policies require the visitor to pay an initial amount before cover applies.",
      },
    ],
    commonExclusionsNote:
      "Age-related eligibility and pre-existing-condition limitations are common in visitor insurance — these vary by provider and should be confirmed directly before purchase.",
    eligibilityNote:
      "Age-related eligibility and pre-existing-condition limitations vary by provider. Destination-specific entry or visa requirements are set by the relevant government authority — this page does not provide immigration advice.",
    informationNeededForQuote: [
      "The visitor's date of birth",
      "Destination and length of visit",
      "Any relevant pre-existing conditions to declare",
    ],
    processSteps: insuranceQuoteProcessSteps,
    providerDisclosure: insuranceProviderDisclosureGeneral,
    claimsSupportDescription: insuranceClaimsSupportGeneral,
    faqItems: [
      {
        id: "vi-faq-immigration",
        question: "Does visitor insurance help with a visa application?",
        answer:
          "Some destinations may expect visitors to have appropriate insurance, but this page is general information, not immigration advice — always confirm current entry requirements with the relevant government authority.",
      },
      {
        id: "vi-faq-age",
        question: "Is there an age limit for visitor insurance?",
        answer:
          "Age-related eligibility varies by provider — some policies have upper age limits or different terms for older visitors. Confirm directly with the provider.",
      },
    ],
    relatedServiceSlugs: ["visa-guidance"],
    seo: {
      metaTitle: "Visitor Insurance Guidance",
      metaDescription:
        "General guidance on visitor insurance for family members or short-term visitors: coverage, eligibility and the information needed for a quote.",
    },
    lastReviewed: "2026-09-13",
    contentStatus: "published",
  },
];
