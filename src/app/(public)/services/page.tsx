import type { Metadata } from "next";

import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return <ComingSoon title="Services" />;
}
