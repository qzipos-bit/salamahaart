import { CATALOG_CATEGORY_LABELS } from "@/lib/catalog-filters";
import type { Product } from "@/components/shop/product-card";
import type { MasterProduct } from "@/lib/masters-products";
import { MASTERS_CATALOG_PATH } from "@/lib/masters-products";
import { MASTERS_CATEGORY_LABELS } from "@/lib/masters-catalog-filters";
import { visibleProductDescription } from "@/lib/product-page-content";
import {
  SEO_CATALOG_LANDINGS,
  type SeoCatalogLanding,
} from "@/lib/seo-catalog-landings";
import { buildBreadcrumbListSchema } from "@/lib/schema/helpers";
import { buildProductOffer } from "@/lib/schema/offers";
import { absoluteAssetUrl, absoluteUrl, SITE_NAME } from "@/lib/schema/site";

function findCatalogLandingForProduct(slug: string): SeoCatalogLanding | undefined {
  return Object.values(SEO_CATALOG_LANDINGS).find((landing) =>
    (landing.productSlugs as readonly string[]).includes(slug),
  );
}

function catalogProductBreadcrumbs(product: Product) {
  const landing = findCatalogLandingForProduct(product.slug);
  const crumbs = [
    { name: "Главная", path: "/" },
    { name: "Каталог", path: "/catalog" },
  ];

  if (landing) {
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
    crumbs.push({
      name: landing.footerLabel,
      path: `/${landing.path}`,
    });
  } else {
    crumbs.push({
      name: CATALOG_CATEGORY_LABELS[product.category],
      path: "/catalog/vse-tovary",
    });
  }

  crumbs.push({
    name: product.title,
    path: `/catalog/${product.slug}`,
  });

  return crumbs;
}

function mastersProductBreadcrumbs(product: MasterProduct) {
  return [
    { name: "Главная", path: "/" },
    { name: "Товары для мастеров", path: MASTERS_CATALOG_PATH },
    {
      name: product.title,
      path: `${MASTERS_CATALOG_PATH}/${product.slug}`,
    },
  ];
}

function productDescription(
  slug: string,
  fallbackTitle: string,
  catalog: "catalog" | "masters",
): string {
  return visibleProductDescription(slug, catalog, fallbackTitle);
}

function productCategoryLabel(
  product: Product | MasterProduct,
  catalog: "catalog" | "masters",
): string {
  if (catalog === "catalog") {
    const landing = findCatalogLandingForProduct(product.slug);
    if (landing) return landing.footerLabel;
    return CATALOG_CATEGORY_LABELS[(product as Product).category];
  }
  return MASTERS_CATEGORY_LABELS[(product as MasterProduct).category];
}

function buildProductSchema(input: {
  product: Product | MasterProduct;
  pagePath: string;
  catalog: "catalog" | "masters";
}): Record<string, unknown> {
  const pageUrl = absoluteUrl(input.pagePath);
  const { product } = input;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: productDescription(product.slug, product.title, input.catalog),
    image: [absoluteAssetUrl(product.image)],
    sku: product.slug,
    brand: { "@type": "Brand", name: SITE_NAME },
    category: productCategoryLabel(product, input.catalog),
    offers: buildProductOffer({
      pageUrl,
      priceLabel: product.price,
      priceFromRub: product.priceFromRub,
      priceToRub: "priceToRub" in product ? product.priceToRub : undefined,
    }),
  };
}

export function buildCatalogProductPageSchemas(product: Product) {
  return [
    buildProductSchema({
      product,
      pagePath: `/catalog/${product.slug}`,
      catalog: "catalog",
    }),
    buildBreadcrumbListSchema(catalogProductBreadcrumbs(product)),
  ];
}

export function buildMastersProductPageSchemas(product: MasterProduct) {
  return [
    buildProductSchema({
      product,
      pagePath: `${MASTERS_CATALOG_PATH}/${product.slug}`,
      catalog: "masters",
    }),
    buildBreadcrumbListSchema(mastersProductBreadcrumbs(product)),
  ];
}