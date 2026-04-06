import { BREAKFAST_TABLE_FAQ } from "@/lib/breakfast-table-faq";
import type { CatalogFaqItem } from "@/lib/catalog-faq-types";
import { CHASY_FAQ } from "@/lib/chasy-faq";
import { KARTINY_FAQ } from "@/lib/kartiny-faq";
import { SERVIROVOCHNYE_DOSKI_FAQ } from "@/lib/servirovochnye-doski-faq";
import { PODNOSY_FAQ } from "@/lib/podnosy-faq";
import { TARELKI_BLYUDA_FAQ } from "@/lib/tarelki-blyuda-faq";

export type SeoCatalogLanding = {
  /** Ключ для кода */
  key: string;
  /** Короткая подпись для подвала (2–3 слова) */
  footerLabel: string;
  /** Путь без ведущего слэша */
  path: string;
  title: string;
  description: string;
  h1: string;
  intro: [string, string];
  /** Slug товаров из ALL_PRODUCTS; пусто — только текст и CTA */
  productSlugs: string[];
  /** Доп. сегменты крошек перед текущей страницей (href опционален) */
  breadcrumbTrail?: { label: string; href?: string }[];
  /** Заголовок H2 над сеткой товаров */
  collectionHeading?: string;
  /** Карточка вокруг вводных абзацев */
  introVariant?: "plain" | "card";
  /** FAQ + JSON-LD FAQPage */
  faq?: readonly CatalogFaqItem[];
};

export const SEO_CATALOG_LANDINGS = {
  breakfastTable: {
    key: "breakfastTable",
    footerLabel: "Столик для завтрака",
    path: "catalog/dekorativnye-stoliki/breakfasttable",
    title: "Столик для завтрака в постель из эпоксидной смолы — купить",
    description:
      "Столик для завтрака из эпоксидной смолы — удобный столик в постель и на диван. Кроватные столики, подносы для завтрака, ручная работа. Купить столик для завтрака с доставкой.",
    h1: "Столик для завтрака в постель из эпоксидной смолы",
    intro: [
      "Столик для завтрака из эпоксидной смолы и дерева удобен в постели и на диване: компактная опора для чашки, тарелки и ноутбука. Делаем кроватные столики и подносы для завтрака вручную — с устойчивой геометрией и спокойной палитрой под ваш интерьер.",
      "Вы можете заказать готовый формат или индивидуальный размер, оттенок смолы и тип дерева. Пришлите фото комнаты или эскиз — подскажу варианты и ориентир по срокам и стоимости, доставка по РФ.",
    ],
    productSlugs: [
      "stolik-zavtrak-utro",
      "stolik-zavtrak-live-sage",
      "stolik-zavtrak-skladnoj",
      "stolik-zavtrak-bortiki",
      "stolik-zavtrak-noutbuk",
      "stolik-zavtrak-podarok",
    ],
    breadcrumbTrail: [{ label: "Декоративные столики" }],
    collectionHeading: "Коллекция столиков для завтрака",
    introVariant: "card",
    faq: BREAKFAST_TABLE_FAQ,
  },
  tarelkiBlyuda: {
    key: "tarelkiBlyuda",
    footerLabel: "Тарелки и блюда",
    path: "catalog/tarelki-i-blyuda-iz-epoksidnoj-smoly",
    title: "Посуда из эпоксидной смолы — тарелки и блюда из смолы и дерева",
    description:
      "Тарелки и посуда из эпоксидной смолы: декоративные блюда, посуда из смолы и дерева ручной работы. Фото, цены, доставка. Купить посуду из эпоксидной смолы.",
    h1: "Посуда из эпоксидной смолы — тарелки и блюда из смолы и дерева",
    intro: [
      "Тарелки и декоративные блюда из эпоксидной смолы и дерева — это сервировка с характером: прозрачность, глубина цвета и аккуратный край. Подойдут для праздничного стола, фуд-фото и подарка ценителю ручной работы.",
      "В каталоге ниже можно посмотреть актуальные позиции; для индивидуального диаметра, формы или набора напишите в WhatsApp — пришлю фото этапов и смету. Доставка по России, надёжная упаковка.",
    ],
    productSlugs: [
      "tarelka-dekor-shalfej",
      "blyudo-servirovochnoe-epoks",
      "tarelka-zakuski-syrnaya",
      "nabor-tarelok-desert",
      "blyudo-centralnoe-stol",
      "tarelka-podarochnaya",
    ],
    breadcrumbTrail: [{ label: "Посуда и сервировка" }],
    collectionHeading: "Тарелки и блюда в каталоге",
    introVariant: "card",
    faq: TARELKI_BLYUDA_FAQ,
  },
  podnosy: {
    key: "podnosy",
    footerLabel: "Подносы из смолы",
    path: "catalog/podnosy-iz-epoksidnoj-smoly",
    title: "Подносы из эпоксидной смолы — купить поднос ручной работы",
    description:
      "Подносы из эпоксидной смолы ручной работы: декоративные подносы с сухоцветами и деревом. Фото, цены. Купить поднос из эпоксидной смолы с доставкой.",
    h1: "Подносы из эпоксидной смолы ручной работы",
    intro: [
      "Декоративные подносы из эпоксидной смолы и дерева — удобная сервировка и стильный акцент в гостиной или на кухне. Прозрачные слои, мягкие переливы и фактура древесины хорошо смотрятся при дневном и вечернем свете.",
      "Ниже — витринные позиции с ценами; возможны варианты с сухоцветами, пигментом и размером под ваш стол. Заказ и консультация в переписке, отправка по РФ.",
    ],
    productSlugs: [
      "podnos-zoloto",
      "podnos-suhocvety-laguna",
      "podnos-live-edge-moss",
      "podnos-zavtrak-kofe",
      "podnos-dekor-interer",
      "podnos-podarochnyj-set",
    ],
    breadcrumbTrail: [{ label: "Сервировка и декор" }],
    collectionHeading: "Подносы в каталоге",
    introVariant: "card",
    faq: PODNOSY_FAQ,
  },
  chasy: {
    key: "chasy",
    footerLabel: "Часы из смолы",
    path: "catalog/chasy-kartiny/chasy-iz-smoly",
    title: "Часы из эпоксидной смолы — купить настенные часы из дерева",
    description:
      "Часы из эпоксидной смолы и дерева ручной работы: настенные часы из смолы, слэба и декора. Фото, цены. Купить часы из эпоксидной смолы с доставкой.",
    h1: "Часы из эпоксидной смолы и дерева",
    intro: [
      "Настенные часы из эпоксидной смолы и дерева объединяют live edge, прозрачность смолы и спокойный циферблат. Такой аксессуар читается как арт-объект и хорошо вписывается в сканди, минимализм и современную классику.",
      "В разделе — актуальные модели и цены; механизм, диаметр и оттенок смолы можно согласовать под интерьер. Напишите, если нужен нестандартный размер — рассчитаю сроки и стоимость.",
    ],
    productSlugs: [
      "chasy-live",
      "chasy-suhocvety-laguna",
      "chasy-kvadrat-noir",
      "chasy-sleb-graphit",
      "chasy-foto-smola",
      "chasy-moh-zelenyj",
    ],
    breadcrumbTrail: [{ label: "Часы и картины" }],
    collectionHeading: "Часы в каталоге",
    introVariant: "card",
    faq: CHASY_FAQ,
  },
  kartiny: {
    key: "kartiny",
    footerLabel: "Картины из смолы",
    path: "catalog/chasy-kartiny/kartiny-iz-smoly",
    title: "Картины из эпоксидной смолы — купить панно и декор из смолы",
    description:
      "Картины из эпоксидной смолы и панно для интерьера: морские, абстрактные и декоративные работы. Фото, цены. Купить картину из эпоксидной смолы ручной работы.",
    h1: "Картины и панно из эпоксидной смолы",
    intro: [
      "Картины из эпоксидной смолы и панно для стен — это глубина, свет и фактура без лишнего шума: морские мотивы, абстракция или декоративные композиции с деревом и пигментом.",
      "Ниже представлены готовые решения и ориентиры по ценам; для индивидуального размера, цвета и сюжета оставьте заявку — пришлю референсы и план работ.",
    ],
    productSlugs: [
      "fotaramka-30x40-a4",
      "panno-more-golubaya",
      "kartina-abstrakciya-sage",
      "panno-kamni-glass",
      "kartina-minimal-pesok",
      "panno-diptih-more",
    ],
    breadcrumbTrail: [{ label: "Часы и картины" }],
    collectionHeading: "Картины и панно в каталоге",
    introVariant: "card",
    faq: KARTINY_FAQ,
  },
  servirovochnyeDoski: {
    key: "servirovochnyeDoski",
    footerLabel: "Сервировочные доски",
    path: "catalog/servirovochnye-doski-iz-dereva-i-smoly",
    title:
      "Сервировочные доски и менажницы из эпоксидной смолы и дерева",
    description:
      "Сервировочные доски из дерева и эпоксидной смолы: доски для подачи блюд и менажницы ручной работы. Фото, цены. Купить сервировочную доску с доставкой.",
    h1: "Сервировочные доски и менажницы из эпоксидной смолы и дерева",
    intro: [
      "Сервировочные доски и менажницы из дерева с эпоксидной смолой — удобная подача сыра, закусок и десертов. Сочетание слэба, прозрачных слоёв и ровного финиша выглядит презентабельно и на каждый день, и на праздник.",
      "Закажите формат под вашу посуду или соберите набор из нескольких досок одной палитры. Уточните размеры в сообщении — предложу варианты и срок изготовления, доставка по РФ.",
    ],
    productSlugs: [
      "doska-servirovochnaja-syr",
      "menazhnica-3-sekcii",
      "doska-live-edge-oval",
      "doska-frukty-river",
      "menazhnica-zakuski",
      "doska-premium-podarok",
    ],
    breadcrumbTrail: [{ label: "Кухня и сервировка" }],
    collectionHeading: "Доски и менажницы в каталоге",
    introVariant: "card",
    faq: SERVIROVOCHNYE_DOSKI_FAQ,
  },
} as const satisfies Record<string, SeoCatalogLanding>;

export type SeoCatalogLandingKey = keyof typeof SEO_CATALOG_LANDINGS;

export function getLandingByKey(key: SeoCatalogLandingKey): SeoCatalogLanding {
  return SEO_CATALOG_LANDINGS[key];
}

export function allSeoLandingPaths(): string[] {
  return Object.values(SEO_CATALOG_LANDINGS).map((l) => `/${l.path}`);
}
