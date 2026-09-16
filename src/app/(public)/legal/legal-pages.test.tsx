import type { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import CookiePolicyPage from "./cookie-policy/page";
import DisclaimerPage from "./disclaimer/page";
import PrivacyPolicyPage from "./privacy-policy/page";
import TermsOfServicePage from "./terms-of-service/page";

const DRAFT_NOTICE =
  "Temporary draft—professional legal review required before production launch.";

describe("legal draft pages", () => {
  for (const [name, Page, expectedTitle] of [
    ["PrivacyPolicyPage", PrivacyPolicyPage, "Privacy Policy"],
    ["TermsOfServicePage", TermsOfServicePage, "Terms and Conditions"],
    ["CookiePolicyPage", CookiePolicyPage, "Cookie Policy"],
    ["DisclaimerPage", DisclaimerPage, "Disclaimer"],
  ] as const) {
    describe(name, () => {
      it("renders exactly one H1 and the required draft notice", async () => {
        render((await Page()) as ReactElement);
        const h1s = screen.getAllByRole("heading", { level: 1 });
        expect(h1s).toHaveLength(1);
        expect(h1s[0]).toHaveTextContent(expectedTitle);

        const notices = screen.getAllByText(DRAFT_NOTICE);
        expect(notices.length).toBeGreaterThan(0);
      });

      it("does not claim to be legal advice or production-approved", async () => {
        const { container } = render((await Page()) as ReactElement);
        const text = (container.textContent ?? "").toLowerCase();
        expect(text).not.toContain("this constitutes legal advice");
        expect(text).not.toContain("production-approved");
      });
    });
  }
});
