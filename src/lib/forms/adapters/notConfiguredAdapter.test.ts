import { describe, expect, it, vi } from "vitest";

import { notConfiguredAdapter } from "./notConfiguredAdapter";

describe("notConfiguredAdapter", () => {
  it("resolves with a not-configured status", async () => {
    const result = await notConfiguredAdapter.submit({ some: "data" });
    expect(result).toEqual({ status: "not-configured" });
  });

  it("never claims success", async () => {
    const result = await notConfiguredAdapter.submit({ fullName: "Test" });
    expect(result.status).not.toBe("success");
  });

  it("does not call fetch or any network API", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    await notConfiguredAdapter.submit({ email: "test@example.com" });
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });

  it("does not write to localStorage or sessionStorage", async () => {
    const localSetSpy = vi.spyOn(Storage.prototype, "setItem");
    await notConfiguredAdapter.submit({ email: "test@example.com" });
    expect(localSetSpy).not.toHaveBeenCalled();
    localSetSpy.mockRestore();
  });

  it("does not log the payload to the console", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    await notConfiguredAdapter.submit({
      email: "secret@example.com",
      fullName: "Secret Name",
    });

    expect(logSpy).not.toHaveBeenCalled();
    expect(warnSpy).not.toHaveBeenCalled();
    expect(errorSpy).not.toHaveBeenCalled();

    logSpy.mockRestore();
    warnSpy.mockRestore();
    errorSpy.mockRestore();
  });
});
