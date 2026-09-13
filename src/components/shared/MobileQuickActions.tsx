import Link from "next/link";
import { CalendarCheck, MessageCircle, Phone } from "lucide-react";

import { siteConfig } from "@/config/site";
import { getSiteContent } from "@/lib/content/site";
import { cn } from "@/lib/utils";

/**
 * Mobile-only quick-action bar (Call / WhatsApp / Book Consultation),
 * fixed to the bottom of the viewport below the `md` breakpoint.
 *
 * Disable it entirely via `siteConfig.mobileQuickActionsEnabled` in
 * src/config/site.ts. When enabled, the (public) layout adds matching
 * bottom padding to <main> (see src/app/(public)/layout.tsx) so this bar
 * never covers page content or the footer; it also respects the device
 * safe-area inset so it doesn't sit under a phone's home-indicator area.
 */
export async function MobileQuickActions() {
  if (!siteConfig.mobileQuickActionsEnabled) return null;

  const site = await getSiteContent();
  const telHref = `tel:${site.contact.phone}`;
  const whatsappHref = `https://wa.me/${site.contact.whatsapp.replace(/[^\d]/g, "")}`;

  const itemClass =
    "flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 text-xs font-medium text-primary-foreground/90 hover:text-primary-foreground focus-visible:text-primary-foreground";

  return (
    <div
      className="bg-primary fixed inset-x-0 bottom-0 z-40 border-t border-white/10 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-3">
        <a
          href={telHref}
          className={cn(itemClass)}
          aria-label={`Call ${site.shortName}`}
        >
          <Phone aria-hidden="true" className="size-5" />
          Call
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className={cn(itemClass, "border-x border-white/10")}
          aria-label={`Message ${site.shortName} on WhatsApp`}
        >
          <MessageCircle aria-hidden="true" className="size-5" />
          WhatsApp
        </a>
        <Link
          href="/book-consultation"
          className={cn(itemClass)}
          aria-label="Book a free consultation"
        >
          <CalendarCheck aria-hidden="true" className="size-5" />
          Book
        </Link>
      </div>
    </div>
  );
}
