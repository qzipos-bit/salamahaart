import {
  COURSE_SMOLA_DEREVO,
  COURSE_SMOLA_DEREVO_HERO,
  smolaDerevoWhatsAppHref,
} from "@/lib/course-smola-derevo";
import {
  buildBreadcrumbListSchema,
  buildFaqPageSchema,
} from "@/lib/schema/helpers";
import { absoluteAssetUrl, absoluteUrl, ORG_ID } from "@/lib/schema/site";

export function buildCoursePageSchemas(): Record<string, unknown>[] {
  const pageUrl = absoluteUrl("/kurs-smola-derevo");

  return [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      "@id": `${pageUrl}#course`,
      name: "Смола + дерево 2.0 — обучение по эпоксидной смоле онлайн",
      description:
        "Онлайн-курс по изготовлению изделий из эпоксидной смолы и дерева: 10 модулей от смешивания и форм до столешниц, финиша и продаж.",
      url: pageUrl,
      inLanguage: "ru-RU",
      image: absoluteAssetUrl(COURSE_SMOLA_DEREVO_HERO.src),
      provider: { "@id": ORG_ID },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "Online",
        courseWorkload: "P6M",
        instructor: { "@type": "Person", name: "Виктория" },
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "RUB",
        price: String(COURSE_SMOLA_DEREVO.priceRub),
        availability: "https://schema.org/InStock",
        url: smolaDerevoWhatsAppHref(),
        category: "Онлайн-обучение",
      },
    },
    buildFaqPageSchema(COURSE_SMOLA_DEREVO.faq, `${pageUrl}#faq`),
    buildBreadcrumbListSchema([
      { name: "Главная", path: "/" },
      { name: "Курс «Смола + дерево 2.0»", path: "/kurs-smola-derevo" },
    ]),
  ];
}
