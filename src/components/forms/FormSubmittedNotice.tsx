import { CheckCircle2 } from "lucide-react";

import { FORM_NOT_CONNECTED_MESSAGE } from "@/lib/forms/messages";
import type { ContactInfo } from "@/types/content";

interface FormSubmittedNoticeProps {
  contact: ContactInfo;
}

/**
 * Shown after a valid submission attempt, replacing the form entirely.
 * Deliberately uses a neutral icon/tone, not the green "success" pattern
 * used elsewhere in the design system — this is explicitly not a
 * completed-enquiry state (docs/DECISIONS.md "Form Architecture
 * (Phase 7)").
 */
export function FormSubmittedNotice({ contact }: FormSubmittedNoticeProps) {
  const whatsappHref = `https://wa.me/${contact.whatsapp.replace(/[^\d]/g, "")}`;

  return (
    <div
      role="status"
      className="border-border bg-card flex flex-col items-start gap-3 rounded-xl border p-6"
    >
      <CheckCircle2
        aria-hidden="true"
        className="text-muted-foreground size-6"
      />
      <p className="text-foreground font-medium">
        {FORM_NOT_CONNECTED_MESSAGE}
      </p>
      <div className="flex flex-wrap gap-3 text-sm">
        <a
          href={`tel:${contact.phone}`}
          className="text-brand-teal-text font-medium hover:underline"
        >
          Call {contact.phoneDisplay}
        </a>
        <a
          href={`mailto:${contact.email}`}
          className="text-brand-teal-text font-medium hover:underline"
        >
          Email {contact.email}
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="text-brand-teal-text font-medium hover:underline"
        >
          WhatsApp {contact.whatsappDisplay}
        </a>
      </div>
    </div>
  );
}
