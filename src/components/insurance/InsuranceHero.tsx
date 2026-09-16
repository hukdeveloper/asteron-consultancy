import { DetailHero } from "@/components/shared/DetailHero";
import type { InsuranceService } from "@/types/content";

interface InsuranceHeroProps {
  insurance: InsuranceService;
}

export function InsuranceHero({ insurance }: InsuranceHeroProps) {
  return (
    <DetailHero
      breadcrumbItems={[
        { label: "Insurance", href: "/insurance" },
        { label: insurance.title },
      ]}
      heading={insurance.heroTitle}
      description={insurance.heroDescription}
      primaryCta={{
        label: "Request an Insurance Quote",
        href: "/insurance-quote",
      }}
      secondaryCta={{
        label: "Book Free Consultation",
        href: "/book-consultation",
      }}
      icon={insurance.visualIcon}
    />
  );
}
