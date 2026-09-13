import type { Metadata } from "next";

import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "Insurance",
};

export default function InsurancePage() {
  return <ComingSoon title="Insurance" />;
}
