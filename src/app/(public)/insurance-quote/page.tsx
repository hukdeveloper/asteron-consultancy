import type { Metadata } from "next";

import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "Insurance Quote",
};

export default function InsuranceQuotePage() {
  return <ComingSoon title="Insurance Quote" />;
}
