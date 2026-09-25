import type { SiteContent } from "@/types/content";

/**
 * Site-wide identity, marketing copy, and contact details — the single
 * authoritative source for this information. See src/lib/content/site.ts
 * for the access layer that pages/components should import instead of
 * this file directly.
 *
 * Email is real (lead-architect-supplied, 2026-09-18). Phone/WhatsApp
 * number and office address remain deliberately obvious placeholders —
 * replace them here, in one place, once real values are approved. Do not
 * duplicate these values elsewhere.
 */
export const siteContent: SiteContent = {
  name: "Janan Consultancy",
  shortName: "Janan",
  tagline: "Guidance Beyond Borders",
  description:
    "Expert guidance for studying abroad, university admissions, student visas, scholarships, insurance and pre-departure preparation.",
  contact: {
    phone: "+923000000000",
    phoneDisplay: "+92 300 0000000",
    whatsapp: "+923000000000",
    whatsappDisplay: "+92 300 0000000",
    email: "info@jananconsultancy.com",
    address: "Islamabad, Pakistan",
  },
};
