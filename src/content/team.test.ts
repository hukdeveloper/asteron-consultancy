import { describe, expect, it } from "vitest";

import { teamMembers } from "./team";

describe("team content", () => {
  it("has unique ids", () => {
    const ids = teamMembers.map((member) => member.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("marks every current member as a placeholder with the required note", () => {
    for (const member of teamMembers) {
      expect(member.isPlaceholder).toBe(true);
      expect(member.placeholderNote).toBe("Profile to be added.");
    }
  });

  it("does not invent a real name, photo, or credential for any member", () => {
    const text = JSON.stringify(teamMembers).toLowerCase();
    for (const forbidden of [
      "certified",
      "phd",
      "msc",
      "years of experience",
      "award",
    ]) {
      expect(text).not.toContain(forbidden);
    }
  });

  it("includes the required role-based cards", () => {
    const titles = teamMembers.map((member) => member.roleTitle);
    expect(titles).toEqual(
      expect.arrayContaining([
        "Senior Education Counsellor",
        "Admissions Adviser",
        "Visa Documentation Adviser",
        "Insurance Support Adviser",
        "Student Support Coordinator",
      ]),
    );
  });
});
