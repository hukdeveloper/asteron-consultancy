import type { Metadata } from "next";

import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "Book a Consultation",
};

export default function BookConsultationPage() {
  return <ComingSoon title="Book a Consultation" />;
}
