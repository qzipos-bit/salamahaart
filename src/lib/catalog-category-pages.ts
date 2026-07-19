import type { ProductCatalogCategory } from "@/components/shop/product-card";

export type CatalogCategoryPageConfig = {
  /** Путь без ведущего слэша */
  path: string;
  title: string;
  description: string;
  h1: string;
  primaryKeyword: string;
  /** Значение `?cat=` для 301-редиректа */
  redirectFromCat: MappedCatalogCategory;
  /** Только для standalone-страниц; у SEO-лендингов тексты в seo-catalog-landings.ts */
  intro?: [string, string];
  collectionHeading: string;
  hubImage: string;
  footerLabel: string;
};

/** Категории с каноническими ЧПУ (кроме bukety — лендинг `/sohranenie-buketa-v-smole`). */
export type MappedCatalogCategory = Exclude<ProductCatalogCategory, "bukety">;

/** Канонические страницы основных категорий каталога (вместо `?cat=`). */
export const CATALOG_CATEGORY_PAGES = {
  stoly: {
    path: "catalog/stoly",
    title: "Стол из эпоксидной смолы на заказ в Краснодаре | Salamaha",
    description:
      "Столы из эпоксидной смолы и дерева на заказ: журнальные, обеденные, кухонные, из слэба, с подсветкой и цветами. Слэб, живой край, цвет под интерьер. Доставка по РФ.",
    h1: "Столы из эпоксидной смолы и дерева",
    primaryKeyword: "стол из эпоксидной смолы",
    redirectFromCat: "stoly",
    collectionHeading: "Примеры столов",
    hubImage: "/category-stoly.webp",
    footerLabel: "Столы из смолы",
  },
  chasy: {
    path: "catalog/chasy-kartiny/chasy-iz-smoly",
    title: "Часы из эпоксидной смолы на заказ в Краснодаре | Salamaha",
    description:
      "Настенные часы из эпоксидной смолы и дерева ручной работы: слэб, сухоцветы, минимализм, фото. Бесшумный ход, размер и оттенок под интерьер. Краснодар, доставка по РФ.",
    h1: "Часы из эпоксидной смолы и дерева",
    primaryKeyword: "часы из эпоксидной смолы",
    redirectFromCat: "chasy",
    collectionHeading: "Часы в каталоге",
    hubImage: "/category-chasy.webp",
    footerLabel: "Часы из смолы",
  },
  kartiny: {
    path: "catalog/chasy-kartiny/kartiny-iz-smoly",
    title: "Картины и панно из эпоксидной смолы на заказ | Salamaha",
    description:
      "Картины и панно из эпоксидной смолы для интерьера: морские мотивы, абстракция, камни. Глубина, свет и фактура ручной работы. Краснодар, доставка по РФ.",
    h1: "Картины и панно из эпоксидной смолы",
    primaryKeyword: "картина из эпоксидной смолы",
    redirectFromCat: "kartiny",
    collectionHeading: "Картины и панно в каталоге",
    hubImage: "/category-kartiny.webp",
    footerLabel: "Картины из смолы",
  },
  posuda: {
    path: "catalog/tarelki-i-blyuda-iz-epoksidnoj-smoly",
    title: "Посуда из эпоксидной смолы — тарелки и блюда | Salamaha",
    description:
      "Посуда из эпоксидной смолы и дерева: декоративные тарелки, блюда, сырные и десертные наборы. Сервировка с характером, ручная работа. Краснодар, доставка по РФ.",
    h1: "Посуда из эпоксидной смолы — тарелки и блюда",
    primaryKeyword: "посуда из эпоксидной смолы",
    redirectFromCat: "posuda",
    collectionHeading: "Тарелки и блюда в каталоге",
    hubImage: "/category-posuda.webp",
    footerLabel: "Тарелки и блюда",
  },
  dekor: {
    path: "catalog/dekor",
    title: "Декор из эпоксидной смолы на заказ в Краснодаре | Salamaha",
    description:
      "Декор из эпоксидной смолы и дерева для интерьера и подарка: подставки, фоторамки, ёлочные игрушки, декоративные подносы. Ручная работа. Краснодар, доставка по РФ.",
    h1: "Декор из эпоксидной смолы",
    primaryKeyword: "декор из эпоксидной смолы",
    redirectFromCat: "dekor",
    intro: [
      "Декор из эпоксидной смолы и дерева добавляет интерьеру глубину и тактильность: фоторамки, подставки, ёлочные игрушки и акцентные предметы с прозрачными слоями и живой фактурой древесины.",
      "В разделе — готовые позиции с ценами; для подарка или серии в одной палитре напишите в WhatsApp — подберём формат, оттенок смолы и упаковку. Изготовление в Краснодаре, отправка по РФ.",
    ],
    collectionHeading: "Декор в каталоге",
    hubImage: "/category-dekor.webp",
    footerLabel: "Декор из смолы",
  },
} as const satisfies Record<MappedCatalogCategory, CatalogCategoryPageConfig>;

export type CatalogCategoryPageKey = keyof typeof CATALOG_CATEGORY_PAGES;

const REDIRECT_BY_CAT = Object.fromEntries(
  Object.values(CATALOG_CATEGORY_PAGES).map((page) => [
    page.redirectFromCat,
    `/${page.path}`,
  ]),
) as Record<MappedCatalogCategory, string>;

/** Канонический путь категории для ссылок и 301 с `?cat=`. */
export function catalogCategoryCanonicalPath(
  cat: MappedCatalogCategory,
): string {
  return REDIRECT_BY_CAT[cat];
}

/** 301 с query `?cat=` на канонический URL категории. */
export function resolveCatalogCategoryRedirect(
  pathname: string,
  search: string,
): string | null {
  const sp = new URLSearchParams(search);
  const cat = sp.get("cat");
  if (!cat || !(cat in REDIRECT_BY_CAT)) return null;

  if (pathname !== "/catalog" && pathname !== "/catalog/vse-tovary") {
    return null;
  }

  return REDIRECT_BY_CAT[cat as MappedCatalogCategory];
}

export function getCatalogCategoryPage(
  key: CatalogCategoryPageKey,
): CatalogCategoryPageConfig {
  return CATALOG_CATEGORY_PAGES[key];
}

export function listCatalogCategoryNavLinks(): {
  label: string;
  href: string;
  image: string;
}[] {
  return Object.values(CATALOG_CATEGORY_PAGES).map((page) => ({
    label: page.footerLabel,
    href: `/${page.path}`,
    image: page.hubImage,
  }));
}

export function allCatalogCategoryPaths(): string[] {
  return Object.values(CATALOG_CATEGORY_PAGES).map((page) => `/${page.path}`);
}

export function standaloneCatalogCategoryPaths(): string[] {
  return STANDALONE_CATEGORY_PAGE_KEYS.map(
    (key) => `/${getCatalogCategoryPage(key).path}`,
  );
}

/** Основные категории с отдельными page.tsx (не SEO-лендинги chasy/kartiny/posuda). */
export const STANDALONE_CATEGORY_PAGE_KEYS = [
  "dekor",
] as const satisfies readonly CatalogCategoryPageKey[];

export type StandaloneCatalogCategoryPageKey =
  (typeof STANDALONE_CATEGORY_PAGE_KEYS)[number];
