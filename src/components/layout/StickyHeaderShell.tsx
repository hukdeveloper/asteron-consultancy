"use client";

import { useEffect, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Thin client wrapper for the sticky header — white/soft surface with a
 * subtle bottom border at rest, gaining a soft shadow once the page has
 * scrolled (redesigned Phase 10B: replaces the earlier dark navy bar with
 * a light shell, per the "modern editorial" visual reset — see
 * docs/DECISIONS.md). Deliberately no height/opacity animation beyond a
 * shadow fade — `prefers-reduced-motion` needs nothing extra suppressed
 * here. The header's actual content stays a Server Component; only this
 * presentational shell needs client state.
 */
export function StickyHeaderShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "bg-background/95 border-border/70 sticky top-0 z-50 border-b transition-shadow duration-200 supports-backdrop-filter:backdrop-blur-sm",
        scrolled
          ? "shadow-[0_4px_20px_-8px_rgba(20,33,61,0.12)]"
          : "shadow-none",
      )}
      data-scrolled={scrolled}
    >
      {children}
    </header>
  );
}
