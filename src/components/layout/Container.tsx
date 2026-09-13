import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Consistent responsive content width and horizontal gutters, shared by
 * every section of the site (docs/DESIGN_SYSTEM.md §4-5).
 */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  );
}
