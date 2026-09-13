"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/content";

interface HeaderDesktopNavProps {
  items: NavItem[];
}

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const linkClass =
  "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-primary-foreground/85 outline-none transition-colors hover:bg-white/10 hover:text-primary-foreground focus-visible:bg-white/10 focus-visible:text-primary-foreground aria-expanded:bg-white/10 aria-expanded:text-primary-foreground";

/**
 * Desktop primary navigation, hidden below `xl`. Items with `children`
 * open an accessible Radix dropdown (click/keyboard, not hover-only —
 * see docs/DESIGN_SYSTEM.md §6). Items without `children` are plain links.
 */
export function HeaderDesktopNav({ items }: HeaderDesktopNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden xl:block">
      <ul className="flex items-center">
        {items.map((item) => {
          const active = isActive(pathname, item.href);

          if (!item.children || item.children.length === 0) {
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    linkClass,
                    active && "text-primary-foreground bg-white/10",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          }

          return (
            <li key={item.id}>
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={cn(
                    linkClass,
                    active && "text-primary-foreground bg-white/10",
                  )}
                >
                  {item.label}
                  <ChevronDown aria-hidden="true" className="size-3.5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-56">
                  {item.children.map((child) => (
                    <DropdownMenuItem key={child.id} asChild>
                      <Link href={child.href}>{child.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
