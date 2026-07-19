import { NARDY_LANDING, NARDY_LANDING_PATH } from "@/lib/nardy-landing";
import {
  buildBreadcrumbListSchema,
  buildFaqPageSchema,
} from "@/lib/schema/helpers";
import {
  absoluteAssetUrl,
  absoluteUrl,
  ORG_ID,
  SITE_NAME,
} from "@/lib/schema/site";

export function buildNardyLandingSchemas() {
  const page = NARDY_LANDING;
  const pageUrl = absoluteUrl(NARDY_LANDING_PATH);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: page.h1,
    description: page.description,
    image: [absoluteAssetUrl(page.hero.image)],
    brand: { "@type": "Brand", name: SITE_NAME },
    category: "Нарды ручной работы",
    url: pageUrl,
    offers: {
      "@type": "Offer",
      priceCurrency: "RUB",
      availability: "https://schema.org/MadeToOrder",
      url: pageUrl,
      seller: { "@id": ORG_ID },
      itemCondition: "https://schema.org/NewCondition",
      description:
        "Изготовление на заказ; ориентир по цене после согласования дизайна",
    },
  };

  return [
    productSchema,
    buildFaqPageSchema(page.faq, `${pageUrl}#faq`),
    buildBreadcrumbListSchema([
      { name: "Главная", path: "/" },
      { name: "Каталог", path: "/catalog" },
      { name: page.breadcrumbName, path: NARDY_LANDING_PATH },
    ]),
  ];
}
