import { serializeJsonLd } from "@/lib/structuredData";

interface JsonLdProps {
  data: Record<string, unknown>;
}

/** Renders a single JSON-LD structured-data script tag. Data must be non-fictional (docs/DECISIONS.md "Content Accuracy"). Serialization is escaped via `serializeJsonLd` so no field value can prematurely close the `<script>` tag or inject markup. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
