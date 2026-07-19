import catalogContent from "@/lib/data/catalog-product-content.json";
import mastersContent from "@/lib/data/masters-product-content.json";
import type { ProductPageContent } from "@/lib/product-page-content.types";
import {
  SEO_CATALOG_LANDINGS,
  type SeoCatalogLanding,
} from "@/lib/seo-catalog-landings";

const CATALOG_CONTENT = catalogContent as Record<string, ProductPageContent>;
const MASTERS_CONTENT = mastersContent as Record<string, ProductPageContent>;

export type { ProductPageContent, ProductContentAttribute } from "@/lib/product-page-content.types";

export function getCatalogProductPageContent(
  slug: string,
): ProductPageContent | undefined {
  return CATALOG_CONTENT[slug];
}

export function getMastersProductPageContent(
  slug: string,
): ProductPageContent | undefined {
  return MASTERS_CONTENT[slug];
}

export function findCatalogLandingForProduct(
  slug: string,
): SeoCatalogLanding | undefined {
  return Object.values(SEO_CATALOG_LANDINGS).find((landing) =>
    (landing.productSlugs as readonly string[]).includes(slug),
  );
}

export function catalogLandingLink(slug: string) {
  const landing = findCatalogLandingForProduct(slug);
  if (!landing) return undefined;
  return {
    label: landing.footerLabel,
    href: `/${landing.path}`,
  };
}

/** Видимое описание для JSON-LD Product (не meta description). */
export function visibleProductDescription(
  slug: string,
  catalog: "catalog" | "masters",
  fallbackTitle: string,
): string {
  const content =
    catalog === "catalog"
      ? getCatalogProductPageContent(slug)
      : getMastersProductPageContent(slug);
  if (content?.description) return content.description;
  return `Изделие «${fallbackTitle}» из эпоксидной смолы и дерева ручной работы. На заказ в Краснодаре, доставка по РФ.`;
}
