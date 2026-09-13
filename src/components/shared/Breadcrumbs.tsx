import Link from "next/link";
import { ChevronRight } from "lucide-react";

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
 * Semantic breadcrumb trail. Always prepends a "Home" link. The last item
 * is treated as the current page (`aria-current="page"`, no link).
 *
 * Do not render this on the homepage itself — there is nothing to trail
 * back from.
 */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const trail: BreadcrumbItem[] = [{ label: "Home", href: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1;

          return (
            <li
              key={`${item.label}-${index}`}
              className="flex items-center gap-1.5"
            >
              {index > 0 ? (
                <ChevronRight
                  aria-hidden="true"
                  className="text-muted-foreground size-3.5 shrink-0"
                />
              ) : null}
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className="text-foreground max-w-[10rem] truncate font-medium sm:max-w-none"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground max-w-[8rem] truncate hover:underline sm:max-w-none"
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
