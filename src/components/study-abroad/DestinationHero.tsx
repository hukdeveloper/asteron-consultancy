import { DetailHero } from "@/components/shared/DetailHero";
import type { Destination } from "@/types/content";

interface DestinationHeroProps {
  destination: Destination;
}

export function DestinationHero({ destination }: DestinationHeroProps) {
  return (
    <DetailHero
      breadcrumbItems={[
        { label: "Study Abroad", href: "/study-abroad" },
        { label: destination.name },
      ]}
      badges={[destination.region, destination.flagLabel]}
      heading={destination.heroTitle}
      description={destination.heroDescription}
      primaryCta={{
        label: "Book Free Consultation",
        href: "/book-consultation",
      }}
      secondaryCta={{
        label: "Check Your Eligibility",
        href: "/check-eligibility",
      }}
      icon={destination.visualIcon}
    />
  );
}
