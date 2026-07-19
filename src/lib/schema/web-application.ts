import { buildBreadcrumbListSchema } from "@/lib/schema/helpers";
import { absoluteUrl, ORG_ID } from "@/lib/schema/site";

export function buildWebApplicationSchemas(input: {
  name: string;
  path: string;
  breadcrumbLabel: string;
}): Record<string, unknown>[] {
  const pageUrl = absoluteUrl(input.path);

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: input.name,
      url: pageUrl,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      inLanguage: "ru-RU",
      isAccessibleForFree: true,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "RUB",
      },
      publisher: { "@id": ORG_ID },
    },
    buildBreadcrumbListSchema([
      { name: "Главная", path: "/" },
      { name: input.breadcrumbLabel, path: input.path },
    ]),
  ];
}
