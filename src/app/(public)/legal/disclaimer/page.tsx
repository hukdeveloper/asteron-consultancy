import type { Metadata } from "next";

import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "Disclaimer",
};

export default function LegalDisclaimerPage() {
  return <ComingSoon title="Disclaimer" />;
}
