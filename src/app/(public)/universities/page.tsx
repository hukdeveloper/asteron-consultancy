import type { Metadata } from "next";

import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "Universities",
};

export default function UniversitiesPage() {
  return <ComingSoon title="Universities" />;
}
