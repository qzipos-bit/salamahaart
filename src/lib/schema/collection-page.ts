import { ALL_PRODUCTS } from "@/lib/products";
import type { Product } from "@/components/shop/product-card";
import { MASTERS_CATALOG_PATH, MASTERS_PRODUCTS } from "@/lib/masters-products";
import {
  CATALOG_CATEGORY_PAGES,
  allCatalogCategoryPaths,
  getCatalogCategoryPage,
  type StandaloneCatalogCategoryPageKey,
} from "@/lib/catalog-category-pages";
import {
  SEO_CATALOG_LANDINGS,
  type SeoCatalogLanding,
} from "@/lib/seo-catalog-landings";
import {
  buildBreadcrumbListSchema,
  buildFaqPageSchema,
  buildItemListEntity,
  type BreadcrumbItem,
} from "@/lib/schema/helpers";
import { absoluteUrl, WEBSITE_ID } from "@/lib/schema/site";

function landingBreadcrumbs(landing: SeoCatalogLanding): BreadcrumbItem[] {
  const crumbs: BreadcrumbItem[] = [
    { name: "Главная", path: "/" },
    { name: "Каталог", path: "/catalog" },
  ];

  for (const trail of landing.breadcrumbTrail ?? []) {
    crumbs.push({
      name: trail.label,
      path: trail.href?.startsWith("/")
        ? trail.href
        : trail.href
          ? `/${trail.href}`
          : "/catalog",
    });
  }

  crumbs.push({ name: landing.h1, path: `/${landing.path}` });
  return crumbs;
}

export function buildCollectionPageSchema(input: {
  name: string;
  description: string;
  path: string;
  itemListName: string;
  items: { name: string; path: string }[];
}) {
  const pageUrl = absoluteUrl(input.path);
  const entries = input.items.map((item) => ({
    name: item.name,
    url: absoluteUrl(item.path),
  }));

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: input.name,
    description: input.description,
    url: pageUrl,
    inLanguage: "ru-RU",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: buildItemListEntity(
      input.itemListName,
      entries,
    ),
  };
}

export function buildCatalogHubSchemas() {
  const landings = Object.values(SEO_CATALOG_LANDINGS);
  const categoryItems = allCatalogCategoryPaths().map((path) => {
    const page = Object.values(CATALOG_CATEGORY_PAGES).find(
      (entry) => `/${entry.path}` === path,
    );
    return {
      name: page?.footerLabel ?? path,
      path,
    };
  });
  const landingItems = landings
    .filter(
      (landing) =>
        !categoryItems.some((item) => item.path === `/${landing.path}`),
    )
    .map((landing) => ({
      name: landing.footerLabel,
      path: `/${landing.path}`,
    }));

  return [
    buildCollectionPageSchema({
      name: "Изделия из эпоксидной смолы и дерева",
      description:
        "Авторские изделия из эпоксидной смолы и дерева на заказ: столы, часы, панно, посуда, декор и подарки. Ручная работа в Краснодаре, доставка по РФ.",
      path: "/catalog",
      itemListName: "Разделы каталога",
      items: [...categoryItems, ...landingItems],
    }),
    buildBreadcrumbListSchema([
      { name: "Главная", path: "/" },
      { name: "Каталог", path: "/catalog" },
    ]),
  ];
}

export function buildCatalogShopSchemas() {
  return [
    buildCollectionPageSchema({
      name: "Все изделия",
      description:
        "Полный каталог изделий из эпоксидной смолы: фильтры по категории и цене, сортировка.",
      path: "/catalog/vse-tovary",
      itemListName: "Все товары",
      items: ALL_PRODUCTS.map((product) => ({
        name: product.title,
        path: `/catalog/${product.slug}`,
      })),
    }),
    buildBreadcrumbListSchema([
      { name: "Главная", path: "/" },
      { name: "Каталог", path: "/catalog" },
      { name: "Все изделия", path: "/catalog/vse-tovary" },
    ]),
  ];
}

export function buildMastersCatalogSchemas() {
  return [
    buildCollectionPageSchema({
      name: "Товары для мастеров",
      description:
        "Материалы для мастеров: силикагель, деревянные заготовки, силиконовые формы для смолы.",
      path: MASTERS_CATALOG_PATH,
      itemListName: "Товары для мастеров",
      items: MASTERS_PRODUCTS.map((product) => ({
        name: product.title,
        path: `${MASTERS_CATALOG_PATH}/${product.slug}`,
      })),
    }),
    buildBreadcrumbListSchema([
      { name: "Главная", path: "/" },
      { name: "Товары для мастеров", path: MASTERS_CATALOG_PATH },
    ]),
  ];
}

export function buildSeoCatalogLandingSchemas(landing: SeoCatalogLanding) {
  const products = ALL_PRODUCTS.filter((product) =>
    (landing.productSlugs as readonly string[]).includes(product.slug),
  );
  const pageUrl = absoluteUrl(`/${landing.path}`);

  const schemas: Record<string, unknown>[] = [
    buildCollectionPageSchema({
      name: landing.h1,
      description: landing.intro[0],
      path: `/${landing.path}`,
      itemListName: landing.collectionHeading ?? landing.footerLabel,
      items: products.map((product) => ({
        name: product.title,
        path: `/catalog/${product.slug}`,
      })),
    }),
    buildBreadcrumbListSchema(landingBreadcrumbs(landing)),
  ];

  if (landing.faq?.length) {
    schemas.push(buildFaqPageSchema(landing.faq, `${pageUrl}#faq`));
  }

  return schemas;
}

export function buildCatalogCategoryPageSchemas(
  categoryKey: StandaloneCatalogCategoryPageKey,
  products: Product[],
) {
  const page = getCatalogCategoryPage(categoryKey);

  return [
    buildCollectionPageSchema({
      name: page.h1,
      description: page.description,
      path: `/${page.path}`,
      itemListName: page.collectionHeading,
      items: products.map((product) => ({
        name: product.title,
        path: `/catalog/${product.slug}`,
      })),
    }),
    buildBreadcrumbListSchema([
      { name: "Главная", path: "/" },
      { name: "Каталог", path: "/catalog" },
      { name: page.h1, path: `/${page.path}` },
    ]),
  ];
}
