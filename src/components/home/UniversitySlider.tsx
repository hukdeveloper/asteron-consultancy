"use client";

import {
  createElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";

import { resolveIcon } from "@/lib/icons";
import type { ExampleUniversity } from "@/types/content";

interface UniversitySliderProps {
  universities: ExampleUniversity[];
}

const AUTOPLAY_MS = 4500;

function subscribeToReducedMotion(callback: () => void) {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

/** SSR-safe: `useSyncExternalStore` avoids the setState-in-effect pattern for reading a browser media query. */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}

/**
 * Full-width, single-slide carousel — the hero's dominant visual element
 * (previously a small ~480px card confined to one column beside the
 * heading; now a full-width banner spanning the whole hero panel, per
 * explicit lead-architect correction). One university per slide,
 * auto-advancing with a visible pause control (WCAG 2.2.2 "Pause, Stop,
 * Hide" — an indefinitely auto-rotating region must be pausable). Real,
 * well-known universities named purely as illustrative examples of where
 * students in each destination might study, never as a claimed
 * partnership — see the doc comment on `exampleUniversities`
 * (src/content/home.ts) for the content policy this follows.
 *
 * Deliberately built without a carousel library: a single "active slide"
 * is rendered at a time (simpler to keep accessible than a scroll-snap
 * track with several slides live in the DOM at once), with basic
 * touch-swipe support for mobile since this is the hero's primary visual
 * element on small screens too.
 */
export function UniversitySlider({ universities }: UniversitySliderProps) {
  const [index, setIndex] = useState(0);
  // null = no explicit user choice yet — default to the system's
  // reduced-motion preference; a manual play/pause click always wins
  // afterward, since that's informed, in-the-moment consent to the motion
  // rather than the app imposing it unasked.
  const [manualPlaying, setManualPlaying] = useState<boolean | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const playing = manualPlaying ?? !prefersReducedMotion;
  const touchStartX = useRef<number | null>(null);
  const count = universities.length;

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (!playing || count <= 1) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [playing, count]);

  if (count === 0) return null;
  const university = universities[index];
  if (!university) return null;
  const Icon = resolveIcon(university.icon);

  return (
    <div className="relative w-full">
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Example universities across our study destinations"
        className="bg-background border-border/60 relative min-h-64 overflow-hidden rounded-[1.75rem] border shadow-md sm:min-h-72 lg:min-h-80"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const delta = e.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(delta) > 40) {
            setManualPlaying(false);
            goTo(index + (delta < 0 ? 1 : -1));
          }
          touchStartX.current = null;
        }}
      >
        <svg
          className="absolute inset-0 h-full w-full opacity-40"
          aria-hidden="true"
        >
          <pattern
            id="university-slider-dots"
            width="22"
            height="22"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.4" className="fill-brand-blue/15" />
          </pattern>
          <rect
            width="100%"
            height="100%"
            fill="url(#university-slider-dots)"
          />
        </svg>
        {/* Large watermark icon — gives the full-width banner visual
            weight on its own, not just text, without needing photography. */}
        {createElement(Icon, {
          "aria-hidden": true,
          className:
            "text-brand-blue/5 pointer-events-none absolute -right-6 -bottom-10 size-56 sm:size-64",
          strokeWidth: 1,
        })}

        <div
          aria-live={playing ? "off" : "polite"}
          aria-atomic="true"
          className="relative flex h-full min-h-64 flex-col items-center justify-center gap-4 px-6 py-10 text-center sm:min-h-72 sm:px-16 lg:min-h-80 lg:px-24"
        >
          <span className="sr-only">
            Slide {index + 1} of {count}:
          </span>
          <span className="bg-surface-pale-blue text-brand-blue flex size-16 items-center justify-center rounded-full sm:size-20">
            {createElement(Icon, {
              className: "size-8 sm:size-10",
              strokeWidth: 1.5,
            })}
          </span>
          <div>
            <p className="text-foreground text-xl font-semibold text-balance sm:text-2xl">
              {university.name}
            </p>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              {university.city}, {university.country}
            </p>
          </div>
          <p className="text-muted-foreground max-w-md text-sm sm:text-base">
            {university.blurb}
          </p>
          <Link
            href={`/study-abroad/${university.destinationSlug}`}
            className="text-brand-blue inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
          >
            Explore {university.country}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => {
            setManualPlaying(false);
            goTo(index - 1);
          }}
          aria-label="Previous university"
          className="bg-background/90 border-border/60 hover:bg-secondary focus-visible:ring-brand-blue absolute top-1/2 left-3 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border shadow-sm outline-none focus-visible:ring-2 sm:left-5"
        >
          <ChevronLeft aria-hidden="true" className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => {
            setManualPlaying(false);
            goTo(index + 1);
          }}
          aria-label="Next university"
          className="bg-background/90 border-border/60 hover:bg-secondary focus-visible:ring-brand-blue absolute top-1/2 right-3 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border shadow-sm outline-none focus-visible:ring-2 sm:right-5"
        >
          <ChevronRight aria-hidden="true" className="size-5" />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setManualPlaying(!playing)}
          aria-label={playing ? "Pause slideshow" : "Play slideshow"}
          className="text-muted-foreground hover:text-brand-blue hover:bg-secondary focus-visible:ring-brand-blue flex size-7 items-center justify-center rounded-full outline-none focus-visible:ring-2"
        >
          {playing ? (
            <Pause aria-hidden="true" className="size-3.5" />
          ) : (
            <Play aria-hidden="true" className="size-3.5" />
          )}
        </button>
        <div
          className="flex items-center"
          role="tablist"
          aria-label="Choose a university"
        >
          {universities.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show ${item.name}`}
              onClick={() => {
                setManualPlaying(false);
                goTo(i);
              }}
              // The visible dot is small by design; the button itself
              // keeps a 24x24 CSS-pixel hit area (WCAG 2.2 SC 2.5.8
              // Target Size Minimum) via the flex-centered padding box.
              className="focus-visible:ring-brand-blue flex size-6 items-center justify-center rounded-full outline-none focus-visible:ring-2"
            >
              <span
                aria-hidden="true"
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "bg-brand-blue w-5" : "bg-border w-1.5"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
