import { SITE } from "@/lib/site";

/**
 * Глобальная схема Organization для всех страниц (подключается в root layout).
 * См. docs/MICRODATA_ORGANIZATION_PROMPT.md и docs/ORGANIZATION_SCHEMA_AUDIT.md
 */
export function OrganizationJsonLd() {
  const base = SITE.siteUrl;

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    telephone: SITE.phoneTel,
    email: SITE.email,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE.phoneTel,
        contactType: "customer service",
        areaServed: "RU",
        availableLanguage: ["Russian", "ru-RU"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      ...SITE.addressPostal,
    },
  };

  if (base) {
    data["@id"] = `${base}/#organization`;
    data.url = base;
    data.logo = `${base}/logo-salamaha.webp`;
  }

  if (SITE.orgSameAs.length > 0) {
    data.sameAs = SITE.orgSameAs;
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
