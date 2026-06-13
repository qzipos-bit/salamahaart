export const CATALOG_PRICE_SORT_ASC = "price-asc" as const;
export const CATALOG_PRICE_SORT_DESC = "price-desc" as const;

export type CatalogPriceSort =
  | typeof CATALOG_PRICE_SORT_ASC
  | typeof CATALOG_PRICE_SORT_DESC;

export const CATALOG_PRICE_SORT_OPTIONS: {
  value: CatalogPriceSort;
  label: string;
}[] = [
  { value: CATALOG_PRICE_SORT_ASC, label: "Сначала дешевле" },
  { value: CATALOG_PRICE_SORT_DESC, label: "Сначала дороже" },
];

export function parseCatalogSortParam(
  raw: string | string[] | undefined,
): CatalogPriceSort | "" {
  const value = typeof raw === "string" ? raw : raw?.[0];
  if (value === CATALOG_PRICE_SORT_ASC || value === CATALOG_PRICE_SORT_DESC) {
    return value;
  }
  return "";
}

export function formatCatalogSortLabel(sort: CatalogPriceSort): string {
  const option = CATALOG_PRICE_SORT_OPTIONS.find((o) => o.value === sort);
  return option?.label ?? sort;
}

export function sortProductsByPriceFromRub<T extends { priceFromRub: number }>(
  products: T[],
  sort: CatalogPriceSort | "",
): T[] {
  if (!sort) return products;
  const sorted = [...products];
  if (sort === CATALOG_PRICE_SORT_ASC) {
    sorted.sort((a, b) => a.priceFromRub - b.priceFromRub);
  } else {
    sorted.sort((a, b) => b.priceFromRub - a.priceFromRub);
  }
  return sorted;
}
