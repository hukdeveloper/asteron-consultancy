import type { FaqCategoryGroup } from "@/types/content";

/**
 * Categorized FAQ content for /faq. Every answer follows the site-wide
 * Content Accuracy policy — no guaranteed outcomes, no invented fees, no
 * legal/immigration advice. See docs/DECISIONS.md.
 */
export const faqCategories: FaqCategoryGroup[] = [
  {
    id: "general",
    label: "General",
    items: [
      {
        id: "faq-when-to-start",
        question: "When should I start planning?",
        answer:
          "Earlier is generally better — many applications and visa processes take time. Many students start planning 9–12 months before their intended intake, though this varies by destination and study level.",
      },
      {
        id: "faq-service-fees",
        question: "How much do your services cost?",
        answer:
          "Fees depend on the specific service you need and will be communicated transparently before you commit to anything. We don't publish a fixed price list here because the right combination of support varies by person.",
      },
      {
        id: "faq-personal-info",
        question: "How will my personal information be handled?",
        answer:
          "Our current online forms are demonstration-only and do not transmit or store any information you enter. Once a real submission service is connected, a privacy policy will explain what's collected and why — see our Privacy Policy for the current draft.",
      },
    ],
  },
  {
    id: "study-abroad",
    label: "Study Abroad",
    items: [
      {
        id: "faq-destination-help",
        question: "Can you help me decide where to study?",
        answer:
          "Yes — Study Abroad Counselling is designed for exactly this: a structured conversation about your goals, budget and preferences to help you compare destinations.",
      },
      {
        id: "faq-study-level",
        question: "Do you help with both undergraduate and postgraduate study?",
        answer:
          "Yes, see our Undergraduate and Postgraduate guidance pages for study-level-specific planning considerations.",
      },
    ],
  },
  {
    id: "university-applications",
    label: "University Applications",
    items: [
      {
        id: "faq-university-selection",
        question: "How does university selection work?",
        answer:
          "We compare universities and courses against factors that matter for your situation — academic background, subject interests, entry requirements, budget, location and more. We don't publish rankings or claim any single university is universally best.",
      },
      {
        id: "faq-documents-needed",
        question: "What documents are commonly needed for an application?",
        answer:
          "Requirements vary by institution, programme and destination, but many applications ask for academic transcripts, proof of English proficiency (where required), a personal statement and reference letters. See our resource article on application documents for more detail.",
      },
      {
        id: "faq-guarantee-admission",
        question: "Do you guarantee admission?",
        answer:
          "No. Admission decisions are made solely by the relevant institution — we help you prepare the strongest, most accurate application we can, but we cannot and do not guarantee any outcome.",
      },
    ],
  },
  {
    id: "visa-guidance",
    label: "Visa Guidance",
    items: [
      {
        id: "faq-guarantee-visa",
        question: "Do you guarantee visa approval?",
        answer:
          "No. Visa decisions are made solely by the relevant government authority. Visa rules, documentation requirements, fees and processing times can change — always confirm current requirements on the official government website for your destination.",
      },
      {
        id: "faq-visa-help",
        question: "What kind of visa help do you offer?",
        answer:
          "General guidance organising your documentation and understanding the process ahead — see our Student Visa Guidance service page for details. We are not a registered immigration adviser and do not provide legal representation.",
      },
    ],
  },
  {
    id: "scholarships",
    label: "Scholarships",
    items: [
      {
        id: "faq-scholarship-support",
        question: "Can you help me find and apply for scholarships?",
        answer:
          "Yes — we help identify possible opportunities relevant to your situation, review eligibility, and prepare a stronger application. Scholarships are awarded by the relevant institution or funding body, and our guidance does not guarantee selection or funding.",
      },
      {
        id: "faq-scholarship-directory",
        question: "Do you have a directory of active scholarships?",
        answer:
          "Not yet — our Scholarships section currently shows content templates only, while we work on verifying real, active opportunities to publish.",
      },
    ],
  },
  {
    id: "insurance",
    label: "Insurance",
    items: [
      {
        id: "faq-insurance-provider",
        question: "Who is actually responsible for my insurance coverage?",
        answer:
          "The relevant insurance provider — not Asteron. We provide general information and quotation assistance; coverage, premiums, eligibility, exclusions, claims and policy issuance are determined by the provider. Always review their official policy wording before purchase.",
      },
      {
        id: "faq-insurance-types",
        question: "What types of insurance guidance do you offer?",
        answer:
          "General guidance on student health, travel and visitor insurance — see our Insurance section for each type.",
      },
    ],
  },
  {
    id: "accommodation",
    label: "Accommodation",
    items: [
      {
        id: "faq-accommodation-guarantee",
        question: "Can you guarantee accommodation availability?",
        answer:
          "No — we may provide general guidance or referral assistance, but we do not guarantee property availability, condition or landlord performance. See our Accommodation Support service page for what's included.",
      },
    ],
  },
  {
    id: "consultations",
    label: "Consultations",
    items: [
      {
        id: "faq-book-consultation",
        question: "How can I book a consultation?",
        answer:
          'Use the "Book Free Consultation" button anywhere on the site, or contact us directly by phone, email or WhatsApp — see our Contact page.',
      },
      {
        id: "faq-consultation-cost",
        question: "Is the first consultation free?",
        answer:
          "Yes — the initial consultation is free. Any further paid services would be communicated transparently before you commit.",
      },
    ],
  },
];
