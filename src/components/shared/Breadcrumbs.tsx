import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  /** Omit on the current (last) item. */
  href?: string;
}

interface BreadcrumbsProps {
  /** Items after "Home" — do not include Home itself. */
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Semantic breadcrumb trail. Always prepends a "Home" link (shown as a
 * house icon, not the word, so it reads as a distinct anchor rather than
 * another plain text label). The current page is a filled pill rather
 * than plain text, so the trail has actual visual weight instead of
 * reading as faint, easy-to-miss gray text — see docs/DECISIONS.md
 * "Visual Language Reset, Phase B".
 *
 * Do not render this on the homepage itself — there is nothing to trail
 * back from.
 */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const trail: BreadcrumbItem[] = [{ label: "Home", href: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-2">
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1;
          const isHome = index === 0;

          return (
            <li
              key={`${item.label}-${index}`}
              className="flex items-center gap-2"
            >
              {index > 0 ? (
                <ChevronRight
                  aria-hidden="true"
                  className="text-muted-foreground/50 size-4 shrink-0"
                />
              ) : null}
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className="bg-surface-pale-blue text-brand-blue-dark max-w-[10rem] truncate rounded-full px-3 py-1 text-sm font-semibold sm:max-w-none"
                >
                  {item.label}
                </span>
              ) : isHome ? (
                <Link
                  href={item.href}
                  aria-label="Home"
                  className="text-muted-foreground hover:text-brand-blue hover:bg-secondary flex size-7 items-center justify-center rounded-full transition-colors"
                >
                  <Home aria-hidden="true" className="size-4" />
                </Link>
              ) : (
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-brand-blue max-w-[8rem] truncate text-sm font-medium transition-colors sm:max-w-none"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
