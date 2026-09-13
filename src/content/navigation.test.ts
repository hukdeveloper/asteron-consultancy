import { describe, expect, it } from "vitest";

import {
  footerLinkGroups,
  headerNavigation,
  headerPrimaryCta,
  legalLinks,
} from "./navigation";

function collectIds(): string[] {
  const ids: string[] = [];
  for (const item of headerNavigation) {
    ids.push(item.id);
    for (const child of item.children ?? []) ids.push(child.id);
  }
  for (const group of footerLinkGroups) {
    ids.push(group.id);
    for (const link of group.links) ids.push(link.id);
  }
  for (const link of legalLinks) ids.push(link.id);
  return ids;
}

describe("navigation content", () => {
  it("gives every header item and child an internal href", () => {
    for (const item of headerNavigation) {
      expect(item.href.startsWith("/")).toBe(true);
      for (const child of item.children ?? []) {
        expect(child.href.startsWith("/")).toBe(true);
      }
    }
  });

  it("gives every footer link an internal href", () => {
    for (const group of footerLinkGroups) {
      expect(group.links.length).toBeGreaterThan(0);
      for (const link of group.links) {
        expect(link.href.startsWith("/")).toBe(true);
      }
    }
  });

  it("has no duplicate ids across header, footer, and legal links", () => {
    const ids = collectIds();
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("points the primary CTA at the consultation-booking route", () => {
    expect(headerPrimaryCta.href).toBe("/book-consultation");
    expect(headerPrimaryCta.label.length).toBeGreaterThan(0);
  });

  it("gives every legal link an internal href", () => {
    for (const link of legalLinks) {
      expect(link.href.startsWith("/legal/")).toBe(true);
    }
  });
});
