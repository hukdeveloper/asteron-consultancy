"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SiteLogo } from "@/components/shared/SiteLogo";
import type { ContactInfo, NavItem } from "@/types/content";

interface HeaderMobileMenuProps {
  items: NavItem[];
  primaryCta: { label: string; href: string };
  contact: ContactInfo;
}

/**
 * Mobile navigation, shown below `xl`. Built on the Sheet primitive
 * (Radix Dialog under the hood) so focus trapping, Escape-to-close, and
 * focus return are handled by the library rather than custom logic — see
 * docs/DESIGN_SYSTEM.md §9 and docs/TECHNICAL_ARCHITECTURE.md §10.
 * Grouped nav items use native <details>/<summary> disclosures, which are
 * keyboard-operable and exposed to assistive tech without extra code.
 */
export function HeaderMobileMenu({
  items,
  primaryCta,
  contact,
}: HeaderMobileMenuProps) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const telHref = `tel:${contact.phone}`;
  const whatsappHref = `https://wa.me/${contact.whatsapp.replace(/[^\d]/g, "")}`;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-primary-foreground hover:text-primary-foreground hover:bg-white/10 xl:hidden"
          aria-label="Open menu"
        >
          <Menu aria-hidden="true" className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-[85vw] flex-col p-0 sm:max-w-sm"
      >
        <SheetHeader className="border-b">
          <SheetTitle asChild>
            <Link href="/" onClick={close}>
              <SiteLogo variant="compact" />
            </Link>
          </SheetTitle>
        </SheetHeader>

        <nav aria-label="Primary" className="flex-1 overflow-y-auto px-4 py-2">
          <ul className="divide-border divide-y">
            {items.map((item) => {
              if (!item.children || item.children.length === 0) {
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={close}
                      className="text-foreground block py-3 text-base font-medium"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              return (
                <li key={item.id}>
                  <details className="group py-1">
                    <summary className="text-foreground flex cursor-pointer list-none items-center justify-between py-2 text-base font-medium marker:content-none">
                      {item.label}
                      <span
                        aria-hidden="true"
                        className="text-muted-foreground group-open:rotate-180"
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
                            className="text-muted-foreground hover:text-foreground block py-2 text-sm"
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

        <div className="space-y-3 border-t p-4">
          <Button asChild variant="accent" className="w-full" onClick={close}>
            <Link href={primaryCta.href}>{primaryCta.label}</Link>
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button asChild variant="outline" onClick={close}>
              <a href={telHref}>
                <Phone aria-hidden="true" className="size-4" />
                Call
              </a>
            </Button>
            <Button asChild variant="outline" onClick={close}>
              <a href={whatsappHref} target="_blank" rel="noreferrer">
                <MessageCircle aria-hidden="true" className="size-4" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
