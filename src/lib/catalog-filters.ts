import type {
  Product,
  ProductCatalogCategory,
} from "@/components/shop/product-card";
import type { CatalogPriceSort } from "@/lib/catalog-sort";
import { parseCatalogSortParam } from "@/lib/catalog-sort";
import { CATALOG_URL_SYNC_EVENT } from "@/lib/catalog-return-url";
import catalogProductContent from "@/lib/data/catalog-product-content.json";

const FLOWER_MATERIAL_RE = /сухоцвет|мимоз/i;
const FLOWER_TEXT_RE =
  /сухоцвет|мимоз|ваши цветы|цветы из букета|с цветами|цветами в/i;
const FLOWER_TITLE_RE = /сухоцвет|с цветами|мимоз/i;

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

/** Хаб каталогов (разделы из подвала). */
export const CATALOG_HUB_PATH = "/catalog";

/** Все изделия в одном списке с фильтрами. */
export const CATALOG_SHOP_PATH = "/catalog/vse-tovary";

export function catalogHref(params: {
  cat?: string;
  priceMin?: number;
  priceMax?: number;
  sort?: CatalogPriceSort | "";
  extent: { min: number; max: number };
  basePath?: string;
}): string {
  const base = params.basePath ?? CATALOG_SHOP_PATH;
  const sp = new URLSearchParams();
  if (params.cat) sp.set("cat", params.cat);
  if (params.sort) sp.set("sort", params.sort);
  const { extent } = params;
  const lo = params.priceMin ?? extent.min;
  const hi = params.priceMax ?? extent.max;
  const priceTouched = lo > extent.min || hi < extent.max;
  if (priceTouched) {
    sp.set("priceMin", String(Math.round(lo)));
    sp.set("priceMax", String(Math.round(hi)));
  }
  const q = sp.toString();
  return q ? `${base}?${q}` : base;
}

/** Обновляет URL магазина без навигации Next.js — без мерцания сетки. */
export function syncCatalogShopUrl(
  params: {
    cat?: string;
    priceMin?: number;
    priceMax?: number;
    sort?: CatalogPriceSort | "";
    extent: { min: number; max: number };
  },
): void {
  if (typeof window === "undefined") return;
  const href = catalogHref({ ...params, basePath: CATALOG_SHOP_PATH });
  const current = `${window.location.pathname}${window.location.search}`;
  if (current === href) return;
  window.history.replaceState(null, "", href);
  window.dispatchEvent(new Event(CATALOG_URL_SYNC_EVENT));
}

/** Читает фильтры из query string (клиент, без server searchParams). */
export function parseCatalogShopUrlState(
  extent: { min: number; max: number },
  search?: string,
): {
  cat: ProductCatalogCategory | "";
  sort: CatalogPriceSort | "";
  min: number;
  max: number;
} {
  const sp = new URLSearchParams(search ?? "");
  const catRaw = sp.get("cat");
  const cat: ProductCatalogCategory | "" =
    catRaw && CATALOG_CATEGORIES.includes(catRaw as ProductCatalogCategory)
      ? (catRaw as ProductCatalogCategory)
      : "";
  const sort = parseCatalogSortParam(sp.get("sort") ?? undefined);
  const price = parseCatalogPriceParams(
    sp.get("priceMin") ?? undefined,
    sp.get("priceMax") ?? undefined,
    extent,
  );
  return {
    cat,
    sort,
    min: price.min,
    max: price.max,
  };
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

/** Изделие с сухоцветами / цветами в смоле — попадает и в фильтр «Букеты в смоле». */
export function productHasFlowers(product: Product): boolean {
  if (product.category === "bukety") return true;

  const content =
    catalogProductContent[product.slug as keyof typeof catalogProductContent];
  const material =
    content?.attributes?.find((a) => a.name === "Материал")?.value ?? "";

  if (FLOWER_MATERIAL_RE.test(material)) return true;
  if (FLOWER_TEXT_RE.test(content?.description ?? "")) return true;
  if (FLOWER_TITLE_RE.test(product.title)) return true;

  return false;
}

export function productMatchesCatalogCategory(
  product: Product,
  cat: ProductCatalogCategory,
): boolean {
  if (product.category === cat) return true;
  if (cat === "bukety" && productHasFlowers(product)) return true;
  return false;
}

export function filterCatalogProducts(
  products: Product[],
  cat: string | undefined,
  priceRange: { active: boolean; min: number; max: number },
): Product[] {
  let list = products;
  if (cat && CATALOG_CATEGORIES.includes(cat as ProductCatalogCategory)) {
    list = list.filter((p) =>
      productMatchesCatalogCategory(p, cat as ProductCatalogCategory),
    );
  }
  if (priceRange.active) {
    list = list.filter(
      (p) =>
        p.priceFromRub >= priceRange.min && p.priceFromRub <= priceRange.max,
    );
  }
  return list;
}

export { catalogCategoryCanonicalPath, type MappedCatalogCategory } from "@/lib/catalog-category-pages";
