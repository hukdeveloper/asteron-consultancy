import { describe, expect, it } from "vitest";

import {
  buildBreadcrumbListJsonLd,
  buildFaqPageJsonLd,
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
  serializeJsonLd,
} from "./structuredData";

describe("serializeJsonLd", () => {
  it("produces valid JSON that round-trips", () => {
    const data = { a: 1, b: "hello", c: [1, 2, 3] };
    expect(JSON.parse(serializeJsonLd(data))).toEqual(data);
  });

  it("escapes a literal </script> sequence so it cannot terminate the script tag", () => {
    const data = { text: "</script><script>alert(1)</script>" };
    const serialized = serializeJsonLd(data);
    expect(serialized).not.toContain("</script>");
    expect(serialized).not.toContain("<script>");
    expect(JSON.parse(serialized)).toEqual(data);
  });

  it("escapes every '<' character, not just inside </script>", () => {
    const data = { text: "<!-- comment --> <div>x</div>" };
    const serialized = serializeJsonLd(data);
    expect(serialized).not.toContain("<");
    expect(JSON.parse(serialized)).toEqual(data);
  });
});

describe("buildOrganizationJsonLd", () => {
  it("includes only real, provided fields — no fabricated rating/address/founding date", () => {
    const result = buildOrganizationJsonLd({
      name: "Asteron Global Consultancy",
      description: "Test description",
      contact: {
        phone: "+923000000000",
        phoneDisplay: "+92 300 0000000",
        whatsapp: "+923000000000",
        whatsappDisplay: "+92 300 0000000",
        email: "hello@example.com",
        address: "Islamabad, Pakistan",
      },
    });

    expect(result["@type"]).toBe("Organization");
    expect(result.name).toBe("Asteron Global Consultancy");
    expect(result.email).toBe("hello@example.com");
    expect(result).not.toHaveProperty("aggregateRating");
    expect(result).not.toHaveProperty("foundingDate");
  });
});

describe("buildWebSiteJsonLd", () => {
  it("builds a minimal WebSite entry", () => {
    const result = buildWebSiteJsonLd({ name: "Asteron Global Consultancy" });
    expect(result["@type"]).toBe("WebSite");
    expect(result.name).toBe("Asteron Global Consultancy");
    expect(result.url).toBeTruthy();
  });
});

describe("buildBreadcrumbListJsonLd", () => {
  it("always starts with Home", () => {
    const result = buildBreadcrumbListJsonLd([{ label: "Contact" }]);
    expect(result.itemListElement[0].name).toBe("Home");
    expect(result.itemListElement[1].name).toBe("Contact");
  });
});

describe("buildFaqPageJsonLd", () => {
  it("maps question/answer pairs into schema.org Question/Answer entries", () => {
    const result = buildFaqPageJsonLd([{ question: "Q1?", answer: "A1." }]);
    expect(result.mainEntity).toHaveLength(1);
    expect(result.mainEntity[0].name).toBe("Q1?");
    expect(result.mainEntity[0].acceptedAnswer.text).toBe("A1.");
  });
});
