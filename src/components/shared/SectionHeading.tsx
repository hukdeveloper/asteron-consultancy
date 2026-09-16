import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  heading: ReactNode;
  description?: ReactNode;
  className?: string;
  /** Defaults to h2 — use inside a page that already has its own h1. */
  headingLevel?: "h2" | "h3";
  align?: "left" | "center";
  /** Set this and reference it from the wrapping <section aria-labelledby>. */
  headingId?: string;
}

/**
 * Eyebrow / heading / description intro for a page *section* (as opposed
 * to `PageHeader`, which owns the page's single h1). See
 * docs/DESIGN_SYSTEM.md §6 typography hierarchy.
 */
export function SectionHeading({
  eyebrow,
  heading,
  description,
  className,
  headingLevel = "h2",
  align = "left",
  headingId,
}: SectionHeadingProps) {
  const Heading = headingLevel;

  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-brand-teal-text text-sm font-semibold tracking-wide">
          {eyebrow}
        </p>
      ) : null}
      <Heading
        id={headingId}
        className={cn(
          "text-foreground mt-2 font-semibold tracking-tight",
          headingLevel === "h2"
            ? "text-2xl sm:text-3xl"
            : "text-xl sm:text-2xl",
        )}
      >
        {heading}
      </Heading>
      {description ? (
        <p className="text-muted-foreground mt-3 text-base">{description}</p>
      ) : null}
    </div>
  );
}
