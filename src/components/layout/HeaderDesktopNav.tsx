"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getActiveNavGroupId } from "@/lib/navigation-active";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/content";

interface HeaderDesktopNavProps {
  items: NavItem[];
}

/**
 * Base link/trigger style — deliberately no filled background at rest or
 * on hover (the previous "paired dark rounded-button" look flagged as a
 * "dashboard toolbar" defect). Hover uses a text-colour shift only; the
 * dropdown-open state (`data-[state=open]`) is visually a hover-like
 * state, not the permanent "current page" treatment below — those two
 * states must never look identical, or an open dropdown reads as if that
 * section were already the current page.
 */
const linkClass =
  "relative inline-flex items-center gap-1 rounded-md px-3.5 py-2 text-[0.9375rem] font-medium text-foreground/80 outline-none transition-colors hover:text-brand-blue focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 data-[state=open]:text-brand-blue";

/** Current-page treatment: blue text + a short underline bar beneath the label — never a filled rectangle. */
const activeClass =
  "text-brand-blue after:absolute after:-bottom-1 after:left-3.5 after:h-0.5 after:w-5 after:rounded-full after:bg-brand-blue";

/**
 * Desktop primary navigation, hidden below `xl` (1280px). Originally
 * gated at `2xl` (1536px, see docs/DECISIONS.md C-015/C-047) back when
 * the header still carried a phone number and a longer CTA label; the
 * Phase 10B reset removed both and cut the nav to 6 items, so it now
 * fits comfortably well below that old threshold — lowered so 1440px
 * (a standard desktop width, and one of this phase's required
 * screenshot breakpoints) shows the real desktop nav and dropdowns
 * instead of falling back to the mobile menu. Reduced to 6 top-level
 * items in the Phase 10B visual reset (Universities/Scholarships/
 * Insurance moved into dropdowns — see `src/content/navigation.ts`).
 * Active-state matching
 * uses `getActiveNavGroupId()` (route ownership, not href-prefix
 * matching) so exactly one item — or none, on routes with no owning
 * group — is ever marked current; this directly fixes the "two nav items
 * both appear active" defect (Study Abroad and Destinations previously
 * shared the same href prefix). Items with `children` open an accessible
 * Radix dropdown (click/keyboard, not hover-only — see
 * docs/DESIGN_SYSTEM.md §6). Items without `children` are plain links.
 */
export function HeaderDesktopNav({ items }: HeaderDesktopNavProps) {
  const pathname = usePathname();
  const activeGroupId = getActiveNavGroupId(pathname);

  return (
    <nav aria-label="Primary" className="hidden xl:block">
      <ul className="flex items-center gap-0.5">
        {items.map((item) => {
          const active = item.id === activeGroupId;

          if (!item.children || item.children.length === 0) {
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(linkClass, active && activeClass)}
                >
                  {item.label}
                </Link>
              </li>
            );
          }

          const children = item.children;

          return (
            <li key={item.id}>
              <DropdownMenu>
                <DropdownMenuTrigger
                  aria-current={active ? "page" : undefined}
                  className={cn(linkClass, active && activeClass)}
                >
                  {item.label}
                  <ChevronDown aria-hidden="true" className="size-3.5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  sideOffset={10}
                  className="min-w-64"
                >
                  {children.map((child, index) => {
                    const isFirst = index === 0;
                    return (
                      <div key={child.id}>
                        <DropdownMenuItem
                          asChild
                          className={cn(
                            isFirst &&
                              "text-brand-blue group/first justify-between font-semibold",
                          )}
                        >
                          <Link href={child.href}>
                            {child.label}
                            {isFirst ? (
                              <ArrowRight
                                aria-hidden="true"
                                className="size-3.5 opacity-0 transition-opacity group-hover/first:opacity-100"
                              />
                            ) : null}
                          </Link>
                        </DropdownMenuItem>
                        {isFirst && children.length > 1 ? (
                          <DropdownMenuSeparator />
                        ) : null}
                      </div>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
