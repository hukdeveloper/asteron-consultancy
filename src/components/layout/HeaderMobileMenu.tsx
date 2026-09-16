"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Menu, MessageCircle, Phone, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SiteLogo } from "@/components/shared/SiteLogo";
import { getActiveNavGroupId } from "@/lib/navigation-active";
import { cn } from "@/lib/utils";
import type { ContactInfo, NavItem } from "@/types/content";

interface HeaderMobileMenuProps {
  items: NavItem[];
  primaryCta: { label: string; href: string };
  contact: ContactInfo;
}

/**
 * Mobile navigation, shown below `2xl`. Built on the Sheet primitive
 * (Radix Dialog under the hood) so focus trapping, Escape-to-close,
 * background scroll locking, and focus return are handled by the library
 * rather than custom logic — see docs/DESIGN_SYSTEM.md §9 and
 * docs/TECHNICAL_ARCHITECTURE.md §10. Grouped nav items use native
 * `<details>`/`<summary>` disclosures (keyboard-operable, exposed to
 * assistive tech without extra code). Redesigned Phase 10B: near-full-width
 * panel (was capped at 85vw), light surface matching the new header, large
 * labels, and a dedicated phone/WhatsApp/email contact block — the desktop
 * header no longer shows the phone number, so this panel is now the
 * primary mobile path to it.
 */
export function HeaderMobileMenu({
  items,
  primaryCta,
  contact,
}: HeaderMobileMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const activeGroupId = getActiveNavGroupId(pathname);
  const close = () => setOpen(false);
  const telHref = `tel:${contact.phone}`;
  const whatsappHref = `https://wa.me/${contact.whatsapp.replace(/[^\d]/g, "")}`;
  const mailHref = `mailto:${contact.email}`;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground hover:bg-secondary xl:hidden"
          aria-label="Open menu"
        >
          <Menu aria-hidden="true" className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 p-0 data-[side=right]:w-full sm:max-w-sm"
      >
        <SheetHeader className="border-border flex-row items-center justify-between border-b py-4">
          <SheetTitle asChild>
            <Link href="/" onClick={close}>
              <SiteLogo variant="compact" />
            </Link>
          </SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" aria-label="Close menu">
              <X aria-hidden="true" className="size-5" />
            </Button>
          </SheetClose>
        </SheetHeader>

        <nav aria-label="Primary" className="flex-1 overflow-y-auto px-5 py-2">
          <ul className="divide-border divide-y">
            {items.map((item) => {
              const active = item.id === activeGroupId;

              if (!item.children || item.children.length === 0) {
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block py-4 text-lg font-medium",
                        active ? "text-brand-blue" : "text-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              return (
                <li key={item.id}>
                  <details className="group py-1" open={active}>
                    <summary
                      className={cn(
                        "flex min-h-12 cursor-pointer list-none items-center justify-between py-3 text-lg font-medium marker:content-none",
                        active ? "text-brand-blue" : "text-foreground",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className="text-muted-foreground transition-transform group-open:rotate-180"
                      >
                        ⌄
                      </span>
                    </summary>
                    <ul className="pb-2 pl-3">
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <Link
                            href={child.href}
                            onClick={close}
                            className="text-muted-foreground hover:text-brand-blue block min-h-11 py-2.5 text-base"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-border space-y-4 border-t p-5">
          <Button
            asChild
            variant="accent"
            size="lg"
            className="h-12 w-full"
            onClick={close}
          >
            <Link href={primaryCta.href}>{primaryCta.label}</Link>
          </Button>

          <ul className="grid gap-1 text-sm">
            <li>
              <a
                href={telHref}
                className="text-muted-foreground hover:text-brand-blue hover:bg-secondary flex items-center gap-2.5 rounded-md px-2 py-2.5"
              >
                <Phone aria-hidden="true" className="size-4 shrink-0" />
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-brand-blue hover:bg-secondary flex items-center gap-2.5 rounded-md px-2 py-2.5"
              >
                <MessageCircle aria-hidden="true" className="size-4 shrink-0" />
                WhatsApp {contact.whatsappDisplay}
              </a>
            </li>
            <li>
              <a
                href={mailHref}
                className="text-muted-foreground hover:text-brand-blue hover:bg-secondary flex items-center gap-2.5 rounded-md px-2 py-2.5"
              >
                <Mail aria-hidden="true" className="size-4 shrink-0" />
                {contact.email}
              </a>
            </li>
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}
