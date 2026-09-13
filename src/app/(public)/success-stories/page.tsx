import type { Metadata } from "next";

import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "Success Stories",
};

export default function SuccessStoriesPage() {
  return <ComingSoon title="Success Stories" />;
}
