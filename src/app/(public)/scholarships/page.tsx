import type { Metadata } from "next";

import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "Scholarships",
};

export default function ScholarshipsPage() {
  return <ComingSoon title="Scholarships" />;
}
