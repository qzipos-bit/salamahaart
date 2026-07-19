import { SITE } from "@/lib/site";
import {
  ORG_ID,
  SCHEMA_EMAIL,
  SCHEMA_PHONE,
  SCHEMA_POSTAL_ADDRESS,
  SITE_NAME,
  SITE_URL,
  WEBSITE_ID,
} from "@/lib/schema/site";

export function buildOrganizationSchema(): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/logo-salamaha.webp`,
    image: `${SITE_URL}/logo-salamaha.webp`,
    description:
      "Авторские изделия из эпоксидной смолы и дерева на заказ: столы, декор, посуда, часы, сохранение букетов.",
    telephone: SCHEMA_PHONE,
    email: SCHEMA_EMAIL,
    address: SCHEMA_POSTAL_ADDRESS,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SCHEMA_PHONE,
        contactType: "customer service",
        areaServed: "RU",
        availableLanguage: ["Russian", "ru-RU"],
      },
    ],
  };

  if (SITE.orgSameAs.length > 0) {
    schema.sameAs = SITE.orgSameAs;
  }

  return schema;
}

export function buildWebSiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    inLanguage: "ru-RU",
    publisher: { "@id": ORG_ID },
  };
}

export function buildGlobalSiteSchemas(): Record<string, unknown>[] {
  return [buildOrganizationSchema(), buildWebSiteSchema()];
}
