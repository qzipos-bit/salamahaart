import {
  STOLESHNICY_LANDING,
  STOLESHNICY_LANDING_PATH,
} from "@/lib/stoleshnicy-landing";
import {
  buildBreadcrumbListSchema,
  buildFaqPageSchema,
} from "@/lib/schema/helpers";
import { ORG_ID, absoluteUrl } from "@/lib/schema/site";

export function buildStoleshnicyLandingSchemas() {
  const page = STOLESHNICY_LANDING;
  const pageUrl = absoluteUrl(STOLESHNICY_LANDING_PATH);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    serviceType: "Изготовление столешниц из эпоксидной смолы и слэба",
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
        "Стоимость по согласованию после замера — ориентир за погонный метр или изделие",
    },
  };

  return [
    serviceSchema,
    buildFaqPageSchema(page.faq, `${pageUrl}#faq`),
    buildBreadcrumbListSchema([
      { name: "Главная", path: "/" },
      {
        name: "Столешницы из эпоксидной смолы",
        path: STOLESHNICY_LANDING_PATH,
      },
    ]),
  ];
}
