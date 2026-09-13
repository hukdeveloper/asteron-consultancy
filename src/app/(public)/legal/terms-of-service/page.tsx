import type { Metadata } from "next";

import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "Terms and Conditions",
};

export default function LegalTermsOfServicePage() {
  return <ComingSoon title="Terms and Conditions" />;
}
