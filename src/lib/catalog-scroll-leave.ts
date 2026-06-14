"use client";

import {
  catalogScrollStorageKeys,
  markCatalogScrollRestore,
  saveCatalogScrollPosition,
  type CatalogScrollCatalog,
} from "@/lib/catalog-return-url";
import { MASTERS_CATALOG_PATH } from "@/lib/masters-products";

export function rememberCatalogScrollBeforeProduct(
  catalog: CatalogScrollCatalog,
  returnTo: string | undefined,
): void {
  if (typeof window === "undefined" || !returnTo) return;
  const { scroll: scrollKey } = catalogScrollStorageKeys(catalog);
  saveCatalogScrollPosition(scrollKey, returnTo, window.scrollY);
  markCatalogScrollRestore(catalog, returnTo);
}

export function catalogScrollKindFromHrefPrefix(
  hrefPrefix: string,
): CatalogScrollCatalog | null {
  if (hrefPrefix === MASTERS_CATALOG_PATH) return "masters";
  if (hrefPrefix.startsWith("/catalog")) return "catalog";
  return null;
}
