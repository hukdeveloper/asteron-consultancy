import { describe, expect, it, vi } from "vitest";

describe("env", () => {
  it("falls back to the local development site URL when unset", async () => {
    const original = process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.NEXT_PUBLIC_SITE_URL;
    vi.resetModules();

    const { env } = await import("./env");
    expect(env.siteUrl).toBe("http://localhost:3000");

    if (original !== undefined) process.env.NEXT_PUBLIC_SITE_URL = original;
    vi.resetModules();
  });
});
