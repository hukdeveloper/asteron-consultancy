import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const CONTAINER_VARIANTS = {
  /** ~1152px. Default. Most page sections, card grids, standard content blocks. */
  content: "max-w-6xl",
  /** ~1480px. Header/footer inner content, and large full-bleed marketing bands (hero, insurance band) — redesigned Phase 10B, narrowed from 1600px to match the new lighter, more editorial visual language (see docs/DECISIONS.md "Visual Language Reset"). */
  wide: "max-w-[1480px]",
  /** ~720px. Long-form reading: article bodies, legal pages — narrower for comfortable line length. */
  reading: "max-w-3xl",
  /** No max width — the element's own background/layout controls edge-to-edge behaviour; padding still applies. */
  fullBleed: "max-w-none",
} as const;

export type ContainerVariant = keyof typeof CONTAINER_VARIANTS;

interface ContainerProps extends ComponentProps<"div"> {
  /** @default "content" */
  variant?: ContainerVariant;
}

/**
 * Consistent responsive horizontal gutters and a content-width ceiling that
 * varies by what the content actually is (docs/DESIGN_SYSTEM.md §4-5) —
 * not one ceiling for every section. Padding scales mobile → tablet →
 * desktop → wide desktop (16px → 24px → 40px → 64px) so wide sections use
 * the viewport confidently at 1440px+ without huge empty gutters, while
 * staying safe at 320px.
 */
export function Container({
  variant = "content",
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-10 2xl:px-16",
        CONTAINER_VARIANTS[variant],
        className,
      )}
      {...props}
    />
  );
}
