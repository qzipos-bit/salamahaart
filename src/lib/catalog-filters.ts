import type {
  Product,
  ProductCatalogCategory,
} from "@/components/shop/product-card";

export const CATALOG_CATEGORY_LABELS: Record<ProductCatalogCategory, string> = {
  stoly: "Столы",
  chasy: "Часы",
  kartiny: "Картины",
  dekor: "Декор",
  posuda: "Посуда",
  bukety: "Букеты в смоле",
};

export const CATALOG_CATEGORIES: ProductCatalogCategory[] = [
  "stoly",
  "chasy",
  "kartiny",
  "dekor",
  "posuda",
  "bukety",
];

/** Верхняя граница шага ползунка, ₽ (реальный шаг адаптируется к диапазону каталога) */
export const CATALOG_PRICE_STEP_MAX = 500;

export function getCatalogPriceStep(extent: { min: number; max: number }): number {
  const span = extent.max - extent.min;
  if (span <= 0) return 1;
  const suggested = Math.ceil(span / 48);
  return Math.max(1, Math.min(CATALOG_PRICE_STEP_MAX, suggested));
}

export function getCatalogPriceExtent(
  products: Product[],
): { min: number; max: number } {
  const prices = products.map((p) => p.priceFromRub);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

export function formatRubShort(n: number): string {
  return `${new Intl.NumberFormat("ru-RU").format(n)} ₽`;
}

export function catalogHref(params: {
  cat?: string;
  priceMin?: number;
  priceMax?: number;
  extent: { min: number; max: number };
}): string {
  const sp = new URLSearchParams();
  if (params.cat) sp.set("cat", params.cat);
  const { extent } = params;
  const lo = params.priceMin ?? extent.min;
  const hi = params.priceMax ?? extent.max;
  const priceTouched = lo > extent.min || hi < extent.max;
  if (priceTouched) {
    sp.set("priceMin", String(Math.round(lo)));
    sp.set("priceMax", String(Math.round(hi)));
  }
  const q = sp.toString();
  return q ? `/catalog?${q}` : "/catalog";
}

export function parseCatalogPriceParams(
  minRaw: string | undefined,
  maxRaw: string | undefined,
  extent: { min: number; max: number },
): { active: boolean; min: number; max: number } {
  const parse = (v: string | undefined) => {
    if (v === undefined || v === "") return undefined;
    const n = Number.parseInt(v, 10);
    return Number.isFinite(n) ? n : undefined;
  };
  const minQ = parse(minRaw);
  const maxQ = parse(maxRaw);
  const active = minQ !== undefined || maxQ !== undefined;
  if (!active) {
    return { active: false, min: extent.min, max: extent.max };
  }
  let lo = minQ ?? extent.min;
  let hi = maxQ ?? extent.max;
  lo = Math.min(extent.max, Math.max(extent.min, lo));
  hi = Math.min(extent.max, Math.max(extent.min, hi));
  if (lo > hi) [lo, hi] = [hi, lo];
  return { active: true, min: lo, max: hi };
}

export function filterCatalogProducts(
  products: Product[],
  cat: string | undefined,
  priceRange: { active: boolean; min: number; max: number },
): Product[] {
  let list = products;
  if (cat && CATALOG_CATEGORIES.includes(cat as ProductCatalogCategory)) {
    list = list.filter((p) => p.category === cat);
  }
  if (priceRange.active) {
    list = list.filter(
      (p) =>
        p.priceFromRub >= priceRange.min && p.priceFromRub <= priceRange.max,
    );
  }
  return list;
}
