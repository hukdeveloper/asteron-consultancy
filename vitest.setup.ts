import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

import "@testing-library/jest-dom/vitest";

// `globals: false` in vitest.config.mts means @testing-library/react's own
// auto-cleanup (which looks for a *global* afterEach) never registers, so
// multiple `render()` calls across `it` blocks in one file would otherwise
// accumulate in the same document. Register cleanup explicitly instead.
afterEach(() => {
  cleanup();
});

// jsdom implements neither ResizeObserver nor a few pointer-capture/scroll
// APIs that Radix UI primitives (Select, in particular, since Phase 5's
// insurance-quote form) touch on mount/interaction. Minimal stand-ins, not
// full implementations — enough for these components to render in tests.
if (typeof globalThis.ResizeObserver === "undefined") {
  class ResizeObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  globalThis.ResizeObserver =
    ResizeObserverStub as unknown as typeof ResizeObserver;
}

if (typeof Element.prototype.hasPointerCapture === "undefined") {
  Element.prototype.hasPointerCapture = () => false;
}
if (typeof Element.prototype.setPointerCapture === "undefined") {
  Element.prototype.setPointerCapture = () => {};
}
if (typeof Element.prototype.releasePointerCapture === "undefined") {
  Element.prototype.releasePointerCapture = () => {};
}
if (typeof Element.prototype.scrollIntoView === "undefined") {
  Element.prototype.scrollIntoView = () => {};
}

// jsdom implements no media-query engine at all, so `window.matchMedia` is
// simply absent — needed since UniversitySlider (home) reads
// `prefers-reduced-motion` via `useSyncExternalStore`. Always reports "no
// match" (safe default for tests: autoplay behaves as if reduced motion
// is off) and no-ops the (add|remove)EventListener/deprecated
// (add|remove)Listener methods real code may call on the returned object.
if (typeof window.matchMedia === "undefined") {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList;
}
