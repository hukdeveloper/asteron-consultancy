import { DetailHero } from "@/components/shared/DetailHero";
import type { Service } from "@/types/content";

interface ServiceHeroProps {
  service: Service;
  categoryLabel: string;
}

export function ServiceHero({ service, categoryLabel }: ServiceHeroProps) {
  return (
    <DetailHero
      breadcrumbItems={[
        { label: "Services", href: "/services" },
        { label: service.title },
      ]}
      badges={[categoryLabel]}
      heading={service.heroTitle}
      description={service.heroDescription}
      primaryCta={service.primaryCta}
      secondaryCta={{
        label: "Check Your Eligibility",
        href: "/check-eligibility",
      }}
      icon={service.icon}
    />
  );
}
