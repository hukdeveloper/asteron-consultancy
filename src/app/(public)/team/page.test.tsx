import type { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import TeamPage from "./page";

describe("TeamPage", () => {
  it("renders exactly one H1", async () => {
    render((await TeamPage()) as ReactElement);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
  });

  it("renders every role-based placeholder card labelled 'Profile to be added.'", async () => {
    render((await TeamPage()) as ReactElement);
    const labels = screen.getAllByText("Profile to be added.");
    expect(labels.length).toBe(5);

    for (const role of [
      "Senior Education Counsellor",
      "Admissions Adviser",
      "Visa Documentation Adviser",
      "Insurance Support Adviser",
      "Student Support Coordinator",
    ]) {
      expect(screen.getByText(role)).toBeInTheDocument();
    }
  });

  it("does not invent a real staff name or credential", async () => {
    const { container } = render((await TeamPage()) as ReactElement);
    const text = (container.textContent ?? "").toLowerCase();
    for (const forbidden of ["certified", "phd", "10+ years"]) {
      expect(text).not.toContain(forbidden);
    }
  });
});
