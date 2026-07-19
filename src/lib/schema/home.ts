import {
  LOCAL_BUSINESS_ID,
  ORG_ID,
  SCHEMA_PHONE,
  SCHEMA_POSTAL_ADDRESS,
  SITE_NAME,
  SITE_URL,
} from "@/lib/schema/site";
import { buildItemListSchema } from "@/lib/schema/helpers";
import { SEO_CATALOG_LANDINGS } from "@/lib/seo-catalog-landings";

export function buildHomePageSchemas(): Record<string, unknown>[] {
  const categoryItems = Object.values(SEO_CATALOG_LANDINGS).map((landing) => ({
    name: landing.footerLabel,
    url: `${SITE_URL}/${landing.path}`,
  }));

  return [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": LOCAL_BUSINESS_ID,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      image: `${SITE_URL}/logo-salamaha.webp`,
      telephone: SCHEMA_PHONE,
      priceRange: "₽₽",
      address: SCHEMA_POSTAL_ADDRESS,
      areaServed: { "@type": "Country", name: "Россия" },
      parentOrganization: { "@id": ORG_ID },
    },
    buildItemListSchema("Категории изделий", categoryItems),
  ];
}
