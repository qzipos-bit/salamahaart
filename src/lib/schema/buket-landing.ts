import { BUKET_LANDING, BUKET_LANDING_PATH } from "@/lib/buket-landing";
import {
  buildBreadcrumbListSchema,
  buildFaqPageSchema,
} from "@/lib/schema/helpers";
import { ORG_ID, absoluteUrl } from "@/lib/schema/site";

export function buildBuketLandingSchemas() {
  const page = BUKET_LANDING;
  const pageUrl = absoluteUrl(BUKET_LANDING_PATH);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    serviceType: "Сохранение цветов в эпоксидной смоле",
    description: page.description,
    provider: { "@id": ORG_ID },
    areaServed: {
      "@type": "Country",
      name: "Россия",
    },
    url: pageUrl,
    offers: {
      "@type": "Offer",
      priceCurrency: "RUB",
      availability: "https://schema.org/MadeToOrder",
      url: pageUrl,
      description:
        "Стоимость по согласованию после обсуждения букета и формата изделия",
    },
  };

  return [
    serviceSchema,
    buildFaqPageSchema(page.faq, `${pageUrl}#faq`),
    buildBreadcrumbListSchema([
      { name: "Главная", path: "/" },
      { name: page.h1, path: BUKET_LANDING_PATH },
    ]),
  ];
}
