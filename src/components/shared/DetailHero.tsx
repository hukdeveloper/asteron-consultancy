import { createElement, type ReactNode } from "react";
import Link from "next/link";

import {
  Breadcrumbs,
  type BreadcrumbItem,
} from "@/components/shared/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { resolveIcon } from "@/lib/icons";
import type { IconName } from "@/types/content";

interface DetailHeroProps {
  /** Breadcrumb trail before the current page (Home is prepended automatically). */
  breadcrumbItems: BreadcrumbItem[];
  /** Small pill labels above the heading (region, category, etc.) — rendered with one consistent style, never mixed variants. */
  badges?: string[];
  heading: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  /** A single-topic detail page (one destination/service/insurance type) — renders one centered icon. Mutually exclusive with `icons`. */
  icon?: IconName;
  /** A hub/router page covering several topics at once — renders a small asymmetric cluster instead of implying the page is about one thing. Mutually exclusive with `icon`. */
  icons?: IconName[];
  /** Optional extra content rendered below the badges/above the heading, e.g. a second badge row with different semantics. */
  children?: ReactNode;
}

const CLUSTER_POSITIONS = [
  {
    wrapper: "absolute top-8 left-8 sm:top-10 sm:left-10",
    size: "size-24",
    iconSize: "size-11",
    tone: "bg-surface-pale-blue text-brand-blue",
  },
  {
    wrapper: "absolute right-8 bottom-10 sm:right-10",
    size: "size-16",
    iconSize: "size-7",
    tone: "bg-surface-pale-mint text-brand-teal-text",
  },
  {
    wrapper: "absolute right-10 top-10 sm:top-14",
    size: "size-12",
    iconSize: "size-5",
    tone: "bg-surface-warm text-brand-blue-dark",
  },
] as const;

/**
 * Shared inner-page detail hero — used by destination, service, and
 * insurance detail pages (previously three near-identical components,
 * each with its own dark ink-to-teal gradient block and inconsistent
 * badge styling). Rebuilt to match the homepage hero's visual grammar
 * (a soft tinted panel containing both the text and a white icon card,
 * rather than a dark slab) so inner pages read as the same site as the
 * redesigned homepage — see docs/DECISIONS.md "Visual Language Reset,
 * Phase B (inner pages)".
 */
export function DetailHero({
  breadcrumbItems,
  badges,
  heading,
  description,
  primaryCta,
  secondaryCta,
  icon,
  icons,
  children,
}: DetailHeroProps) {
  return (
    <section className="bg-background py-8 sm:py-12">
      <Container>
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />

        <div className="from-surface-pale-blue to-surface-pale-mint border-border/60 rounded-[2rem] border bg-gradient-to-br p-6 sm:p-10 lg:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              {badges && badges.length > 0 ? (
                <div className="flex flex-wrap items-center gap-2">
                  {badges.map((badge) => (
                    <Badge key={badge} variant="secondary">
                      {badge}
                    </Badge>
                  ))}
                </div>
              ) : null}
              {children}
              <h1 className="text-foreground mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                {heading}
              </h1>
              <p className="text-muted-foreground mt-4 max-w-lg text-base sm:text-lg">
                {description}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button asChild variant="accent" size="lg">
                  <Link href={primaryCta.href}>{primaryCta.label}</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="bg-background"
                >
                  <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div
                aria-hidden="true"
                className="bg-background border-border/60 relative mx-auto flex aspect-square w-full max-w-64 items-center justify-center overflow-hidden rounded-[1.75rem] border shadow-md lg:max-w-72"
              >
                <svg
                  className="absolute inset-0 h-full w-full opacity-40"
                  aria-hidden="true"
                >
                  <pattern
                    id="detail-hero-dots"
                    width="22"
                    height="22"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle
                      cx="2"
                      cy="2"
                      r="1.4"
                      className="fill-brand-blue/15"
                    />
                  </pattern>
                  <rect
                    width="100%"
                    height="100%"
                    fill="url(#detail-hero-dots)"
                  />
                </svg>

                {icons && icons.length > 0 ? (
                  icons.slice(0, 3).map((name, index) => {
                    const position = CLUSTER_POSITIONS[index];
                    if (!position) return null;
                    return (
                      <span
                        key={name}
                        className={`${position.wrapper} ${position.size} ${position.tone} relative flex items-center justify-center rounded-full shadow-sm`}
                      >
                        {createElement(resolveIcon(name), {
                          className: position.iconSize,
                          strokeWidth: 1.25,
                        })}
                      </span>
                    );
                  })
                ) : icon ? (
                  <span className="bg-surface-pale-blue relative flex size-28 items-center justify-center rounded-full">
                    {createElement(resolveIcon(icon), {
                      className: "text-brand-blue size-14",
                      strokeWidth: 1.25,
                    })}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
