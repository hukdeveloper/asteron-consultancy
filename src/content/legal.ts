import type { LegalPage } from "@/types/content";

/**
 * Temporary legal drafts for /legal/*. Every page is explicitly marked
 * `isDraft: true` and displays the required verbatim notice below — these
 * are not production-approved policies and do not constitute legal
 * advice. Professional legal review is required before launch. See
 * docs/DECISIONS.md "Legal Draft Status".
 */
export const legalDraftNotice =
  "Temporary draft—professional legal review required before production launch.";

export const legalPages: LegalPage[] = [
  {
    id: "privacy-policy",
    slug: "privacy-policy",
    title: "Privacy Policy",
    lastUpdated: "2026-09-13",
    isDraft: true,
    sections: [
      {
        id: "current-forms",
        heading: "Current demo forms",
        paragraphs: [
          "This website's online forms (including the insurance quote form) are currently demonstration-only. Information you enter is not transmitted to us, stored anywhere, or processed in any way — it exists only in your browser while you're filling in the form.",
        ],
      },
      {
        id: "future-forms",
        heading: "Future connected forms",
        paragraphs: [
          "Once a real submission service is connected (a future phase of this project), forms on this site may process the enquiry details you choose to submit, such as your name, contact details, and the content of your enquiry.",
        ],
      },
      {
        id: "data-categories",
        heading: "Likely data categories",
        paragraphs: [
          "If and when forms are connected, we expect to process categories such as: contact details (name, email, phone/WhatsApp), enquiry details (the type and content of your message), and general study-related preferences you choose to share (such as destination or study level interests).",
        ],
      },
      {
        id: "processing-purposes",
        heading: "General processing purposes",
        paragraphs: [
          "Any information collected through a connected form would generally be used to respond to your enquiry and provide the guidance or service you requested — not for unrelated purposes.",
        ],
      },
      {
        id: "retention-principle",
        heading: "Retention principle",
        paragraphs: [
          "We intend to retain enquiry information only for as long as reasonably necessary to respond to it and provide any requested service, though a specific retention period has not yet been finalised.",
        ],
      },
      {
        id: "third-party-providers",
        heading: "Possible third-party providers",
        paragraphs: [
          "A future connected form may rely on a third-party submission or email service to deliver your enquiry to us. Any such provider would be chosen with reasonable data-handling practices in mind.",
        ],
      },
      {
        id: "security-principle",
        heading: "Security principle",
        paragraphs: [
          "We intend to take reasonable steps to protect any information we process, appropriate to its sensitivity.",
        ],
      },
      {
        id: "your-options",
        heading: "Your contact options",
        paragraphs: [
          "If you have questions about this draft policy or how your information may be handled in future, contact us using the details on our Contact page.",
        ],
      },
      {
        id: "policy-updates",
        heading: "Updates to this policy",
        paragraphs: [
          "This policy is a draft and will be updated — likely substantially — once a real submission service is connected and reviewed by a qualified professional.",
        ],
      },
    ],
    seo: {
      metaTitle: "Privacy Policy (Draft)",
      metaDescription:
        "A temporary draft privacy policy explaining current demo-form behaviour and likely future data handling once forms are connected.",
    },
  },
  {
    id: "terms-of-service",
    slug: "terms-of-service",
    title: "Terms and Conditions",
    lastUpdated: "2026-09-13",
    isDraft: true,
    sections: [
      {
        id: "informational-purpose",
        heading: "General informational purpose",
        paragraphs: [
          "This website provides general information and guidance about international education planning. It is not a substitute for official information from institutions, government immigration authorities, or insurance providers.",
        ],
      },
      {
        id: "no-guaranteed-outcomes",
        heading: "No guaranteed outcomes",
        paragraphs: [
          "We do not guarantee admission to any institution, approval of any visa application, selection for any scholarship, or issuance of any insurance policy. These decisions are made solely by the relevant institution, government authority, funding body or insurance provider.",
        ],
      },
      {
        id: "user-responsibility",
        heading: "Your responsibility for accurate information",
        paragraphs: [
          "You are responsible for the accuracy, truthfulness and originality of any information or documents you submit as part of an application, visa process or insurance request.",
        ],
      },
      {
        id: "external-decisions",
        heading: "External institutions and authorities",
        paragraphs: [
          "Universities, government immigration authorities, scholarship bodies and insurance providers make their own independent decisions. Janan does not control or influence those decisions.",
        ],
      },
      {
        id: "third-party-links",
        heading: "Third-party links",
        paragraphs: [
          "This website may link to official third-party websites (such as government immigration sites). We are not responsible for the content or availability of external websites.",
        ],
      },
      {
        id: "intellectual-property",
        heading: "Intellectual property",
        paragraphs: [
          "The content of this website is provided for your general use. Reproducing substantial portions elsewhere without permission is not permitted.",
        ],
      },
      {
        id: "availability",
        heading: "Website availability",
        paragraphs: [
          "We aim to keep this website available and accurate, but we do not guarantee uninterrupted availability or that all information is current at all times.",
        ],
      },
      {
        id: "future-service-agreements",
        heading: "Future service agreements",
        paragraphs: [
          "These general terms cover use of this informational website. A distinct, more detailed service agreement will govern any paid service you formally engage us for, once such agreements exist.",
        ],
      },
    ],
    seo: {
      metaTitle: "Terms and Conditions (Draft)",
      metaDescription:
        "A temporary draft terms and conditions page for the current static informational website.",
    },
  },
  {
    id: "cookie-policy",
    slug: "cookie-policy",
    title: "Cookie Policy",
    lastUpdated: "2026-09-13",
    isDraft: true,
    sections: [
      {
        id: "current-use",
        heading: "Current cookie use",
        paragraphs: [
          "This website, as currently built, does not use analytics cookies, advertising cookies, or a cookie-consent management system. Any storage used today is limited to essential technical functionality — for example, remembering your accessibility or display preferences in your own browser.",
        ],
      },
      {
        id: "essential-storage",
        heading: "Essential technical storage",
        paragraphs: [
          "Essential technical storage, where used, supports basic site functionality and is not used to track you across other websites.",
        ],
      },
      {
        id: "future-analytics",
        heading: "Possible future analytics",
        paragraphs: [
          "A future phase of this project may introduce analytics to help us understand general site usage. If that happens, this policy will be updated to explain what's used and, where required, a consent mechanism will be added before any non-essential cookies are set.",
        ],
      },
      {
        id: "no-invented-claims",
        heading: "What we don't claim",
        paragraphs: [
          "We do not claim to use cookies, analytics or consent systems that are not actually implemented on this website today.",
        ],
      },
    ],
    seo: {
      metaTitle: "Cookie Policy (Draft)",
      metaDescription:
        "A temporary draft cookie policy describing this website's actual current cookie use and possible future analytics.",
    },
  },
  {
    id: "disclaimer",
    slug: "disclaimer",
    title: "Disclaimer",
    lastUpdated: "2026-09-13",
    isDraft: true,
    sections: [
      {
        id: "education-guidance",
        heading: "Education guidance",
        paragraphs: [
          "Information on this website about destinations, universities, courses and application processes is general guidance only. Requirements vary by institution, programme and destination, and can change.",
        ],
      },
      {
        id: "immigration-visa",
        heading: "Immigration and visa information",
        paragraphs: [
          "Visa and immigration information on this website is general and not legal advice. Janan is not a registered immigration adviser and does not provide legal representation. Visa rules, documentation requirements, fees and processing times can change, and final decisions are made solely by the relevant government authority.",
        ],
      },
      {
        id: "insurance-information",
        heading: "Insurance information",
        paragraphs: [
          "Insurance information on this website is general information and quotation assistance only. Janan does not underwrite insurance, set premiums, or approve claims — coverage, eligibility, exclusions and policy issuance are determined by the relevant insurance provider.",
        ],
      },
      {
        id: "scholarships",
        heading: "Scholarships",
        paragraphs: [
          "Scholarship information on this website is general guidance only. Scholarships are awarded by the relevant institution or funding body — guidance does not guarantee selection or funding.",
        ],
      },
      {
        id: "external-links",
        heading: "External links",
        paragraphs: [
          "Links to external websites (including official government and institution websites) are provided for convenience. We are not responsible for their content or accuracy.",
        ],
      },
      {
        id: "changing-information",
        heading: "Changing information",
        paragraphs: [
          "Requirements, fees, processes and policies referenced on this website can change at any time. Always confirm current, binding information directly with the relevant official source before making decisions.",
        ],
      },
      {
        id: "no-guaranteed-outcomes",
        heading: "No guaranteed outcomes",
        paragraphs: [
          "Nothing on this website should be read as a guarantee of admission, visa approval, scholarship selection, or insurance coverage.",
        ],
      },
    ],
    seo: {
      metaTitle: "Disclaimer (Draft)",
      metaDescription:
        "A temporary draft disclaimer covering education, visa, insurance and scholarship information on this website.",
    },
  },
];
