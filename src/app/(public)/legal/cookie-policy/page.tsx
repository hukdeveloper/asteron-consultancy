import type { Metadata } from "next";

import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "Cookie Policy",
};

export default function LegalCookiePolicyPage() {
  return <ComingSoon title="Cookie Policy" />;
}
