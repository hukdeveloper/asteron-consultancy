import type { Metadata } from "next";

import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "Study Abroad",
};

export default function StudyAbroadPage() {
  return <ComingSoon title="Study Abroad" />;
}
