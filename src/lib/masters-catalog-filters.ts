import type { MasterProduct, MasterProductCategory } from "@/lib/masters-products";
import { MASTERS_CATALOG_PATH, MASTERS_FORM_CATEGORIES } from "@/lib/masters-products";
import {
  MASTERS_WOOD_BLANK_DIAMETERS_CM,
  WOOD_BLANK_CUSTOM_DIA_PARAM,
  WOOD_BLANK_CUSTOM_SLUG,
  woodBlankProductMatchesDiameter,
  type WoodBlankDiaFilter,
} from "@/lib/masters-wood-blank-products";
import type { CatalogPriceSort } from "@/lib/catalog-sort";
import { formatDiameterCm } from "@/lib/masters-format";

export const MASTERS_CATEGORY_LABELS: Record<MasterProductCategory, string> = {
  silikagel: "Силикагель",
  "derev-zagotovki": "Деревянные заготовки",
  "formy-krugi-dom": "Круги с дном",
  "formy-krugi-bez-dna": "Круги без дна",
  "formy-razdvizhnaya": "Раздвижная форма",
  "formy-nabor-krugi-dom": "Набор: круги с дном",
  "formy-pazl": "Пазловые формы",
  instrumenty: "Полезные инструменты",
};

export const MASTERS_CATEGORIES: MasterProductCategory[] = [
  "silikagel",
  "derev-zagotovki",
  "formy-krugi-dom",
  "formy-krugi-bez-dna",
  "formy-razdvizhnaya",
  "formy-nabor-krugi-dom",
  "formy-pazl",
  "instrumenty",
];

export const MASTERS_PRICE_STEP_MAX = 500;

export function getMastersPriceStep(extent: { min: number; max: number }): number {
  const span = extent.max - extent.min;
  if (span <= 0) return 1;
  const suggested = Math.ceil(span / 48);
  return Math.max(1, Math.min(MASTERS_PRICE_STEP_MAX, suggested));
}

export function getMastersPriceExtent(
  products: MasterProduct[],
): { min: number; max: number } {
  const prices = products.map((p) => p.priceFromRub);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

export function formatRubShort(n: number): string {
  return `${new Intl.NumberFormat("ru-RU").format(n)} ₽`;
}

export function mastersCatalogHref(params: {
  cat?: string;
  woodDia?: WoodBlankDiaFilter;
  priceMin?: number;
  priceMax?: number;
  sort?: CatalogPriceSort | "";
  extent: { min: number; max: number };
}): string {
  const sp = new URLSearchParams();
  if (params.cat) sp.set("cat", params.cat);
  if (params.woodDia) sp.set("dia", String(params.woodDia));
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
  return q ? `${MASTERS_CATALOG_PATH}?${q}` : MASTERS_CATALOG_PATH;
}

export function parseMastersPriceParams(
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

/** Старые slug категорий → объединённая «Раздвижная форма». */
export const MASTERS_CATEGORY_ALIASES: Record<string, MasterProductCategory> = {
  "formy-pryam-dom": "formy-razdvizhnaya",
  "formy-pryam-bez-dna": "formy-razdvizhnaya",
};

/** Параметр `?cat=formy` — все подкатегории «Формы для смолы». */
export const MASTERS_FORMS_GROUP_CAT = "formy" as const;

export type MastersCatalogCatParam =
  | MasterProductCategory
  | typeof MASTERS_FORMS_GROUP_CAT;

export function isMastersFormsGroupCat(cat: string | undefined): boolean {
  return cat === MASTERS_FORMS_GROUP_CAT;
}

export function parseMastersCatalogCat(
  raw: string | string[] | undefined,
): MasterProductCategory | typeof MASTERS_FORMS_GROUP_CAT | "" {
  const value = typeof raw === "string" ? raw : raw?.[0];
  if (!value) return "";
  if (value === MASTERS_FORMS_GROUP_CAT) return MASTERS_FORMS_GROUP_CAT;
  if (MASTERS_CATEGORIES.includes(value as MasterProductCategory)) {
    return value as MasterProductCategory;
  }
  const aliased = MASTERS_CATEGORY_ALIASES[value];
  return aliased ?? "";
}

export function resolveMastersCategory(
  cat: string | string[] | undefined,
): MasterProductCategory | undefined {
  const value = typeof cat === "string" ? cat : cat?.[0];
  if (!value) return undefined;
  if (value === MASTERS_FORMS_GROUP_CAT) return undefined;
  if (MASTERS_CATEGORIES.includes(value as MasterProductCategory)) {
    return value as MasterProductCategory;
  }
  return MASTERS_CATEGORY_ALIASES[value];
}

export function parseWoodDiaParam(
  raw: string | string[] | undefined,
): WoodBlankDiaFilter | undefined {
  const value = typeof raw === "string" ? raw : raw?.[0];
  if (!value) return undefined;
  if (value === WOOD_BLANK_CUSTOM_DIA_PARAM) {
    return WOOD_BLANK_CUSTOM_DIA_PARAM;
  }
  const n = Number.parseInt(value, 10);
  if (!Number.isFinite(n)) return undefined;
  return MASTERS_WOOD_BLANK_DIAMETERS_CM.includes(
    n as (typeof MASTERS_WOOD_BLANK_DIAMETERS_CM)[number],
  )
    ? (n as WoodBlankDiaFilter)
    : undefined;
}

export function isWoodBlankCustomFilter(
  woodDia?: WoodBlankDiaFilter,
): boolean {
  return woodDia === WOOD_BLANK_CUSTOM_DIA_PARAM;
}

export function formatWoodDiaFilterLabel(dia: WoodBlankDiaFilter): string {
  if (dia === WOOD_BLANK_CUSTOM_DIA_PARAM) {
    return "Индивидуальный размер";
  }
  return formatDiameterCm(dia);
}

export function filterMastersProducts(
  products: MasterProduct[],
  cat: string | undefined,
  priceRange: { active: boolean; min: number; max: number },
  woodDia?: WoodBlankDiaFilter,
): MasterProduct[] {
  let list = products;
  if (cat === MASTERS_FORMS_GROUP_CAT) {
    list = list.filter((p) =>
      MASTERS_FORM_CATEGORIES.includes(p.category),
    );
  } else {
    const resolved = resolveMastersCategory(cat);
    if (resolved) {
      list = list.filter((p) => p.category === resolved);
    }
  }
  if (woodDia === WOOD_BLANK_CUSTOM_DIA_PARAM) {
    list = list.filter((p) => p.slug === WOOD_BLANK_CUSTOM_SLUG);
  } else if (typeof woodDia === "number") {
    list = list.filter(
      (p) =>
        p.category === "derev-zagotovki" &&
        woodBlankProductMatchesDiameter(p.slug, woodDia),
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
