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
