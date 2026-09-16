import {
  contactIntro,
  contactTemporaryValuesNote,
  mapPlaceholderNote,
  officeHoursPlaceholder,
} from "@/content/contact";
import { getSiteContent } from "@/lib/content/site";
import type { ContactMethod, OfficeLocation } from "@/types/content";

export async function getContactMethods(): Promise<ContactMethod[]> {
  const site = await getSiteContent();
  const { contact } = site;

  return [
    {
      id: "phone",
      type: "phone",
      label: "Phone",
      value: contact.phoneDisplay,
      href: `tel:${contact.phone}`,
    },
    {
      id: "email",
      type: "email",
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      id: "whatsapp",
      type: "whatsapp",
      label: "WhatsApp",
      value: contact.whatsappDisplay,
      href: `https://wa.me/${contact.whatsapp.replace(/[^\d]/g, "")}`,
    },
  ];
}

export async function getOfficeLocation(): Promise<OfficeLocation> {
  const site = await getSiteContent();

  return {
    id: "primary",
    label: "General location",
    addressLine: site.contact.address,
    isPrimary: true,
  };
}

export async function getContactPageContent() {
  return {
    intro: contactIntro,
    officeHoursPlaceholder,
    mapPlaceholderNote,
    temporaryValuesNote: contactTemporaryValuesNote,
  };
}
