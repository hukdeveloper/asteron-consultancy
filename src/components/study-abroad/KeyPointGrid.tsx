import { cn } from "@/lib/utils";
import type { KeyPoint } from "@/types/content";

interface KeyPointGridProps {
  items: KeyPoint[];
  columns?: 2 | 3;
  className?: string;
}

/**
 * Reusable {title, description} grid — used across the hub and
 * destination/study-level pages so this layout is authored once.
 * Redesigned (see docs/DECISIONS.md "Visual Language Reset, Phase B"):
 * a numbered marker per item instead of a plain bordered card, matching
 * the lighter, less "boxy" language established on the homepage rather
 * than the flat card-grid style flagged as dated sitewide.
 */
export function KeyPointGrid({
  items,
  columns = 3,
  className,
}: KeyPointGridProps) {
  return (
    <ul
      className={cn(
        "grid gap-x-8 gap-y-7 sm:grid-cols-2",
        columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2",
        className,
      )}
    >
      {items.map((item, index) => (
        <li key={item.id} className="flex gap-3.5">
          <span className="bg-surface-pale-blue text-brand-blue flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
            {index + 1}
          </span>
          <div>
            <h3 className="text-foreground text-base font-semibold">
              {item.title}
            </h3>
            <p className="text-muted-foreground mt-1.5 text-sm">
              {item.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
