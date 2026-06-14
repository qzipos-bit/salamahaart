/** Каталог «Товары для мастеров» — отдельный от `/catalog`, без общих slug и URL. */
import { MASTERS_WOOD_BLANK_PRODUCTS } from "@/lib/masters-wood-blank-products";
import { MASTERS_FORM_PRODUCTS } from "@/lib/masters-form-products";
import { MASTERS_SILIKAGEL_PRODUCTS } from "@/lib/masters-silikagel-products";
import { MASTERS_INSTRUMENT_PRODUCTS } from "@/lib/masters-instrument-products";

export const MASTERS_CATALOG_PATH = "/tovary-dlya-masterov" as const;

export const PRODUCT_IMAGE_PLACEHOLDER = "/product-photo-soon.svg" as const;

export type MasterProductCategory =
  | "silikagel"
  | "derev-zagotovki"
  | "formy-krugi-dom"
  | "formy-krugi-bez-dna"
  | "formy-razdvizhnaya"
  | "formy-nabor-krugi-dom"
  | "formy-pazl"
  | "instrumenty";

export type MasterProductVariant = {
  id: string;
  /** Например «100×100 см». */
  label: string;
  priceRub: number;
  /** Верхняя граница, если цена варианта — диапазон (деревянные заготовки). */
  priceRubMax?: number;
};

export type MasterProduct = {
  slug: string;
  title: string;
  price: string;
  priceFromRub: number;
  /** Верхняя граница цены, если в карточке диапазон (деревянные заготовки). */
  priceToRub?: number;
  category: MasterProductCategory;
  image: string;
  /** Дополнительные фото на странице товара. */
  images?: string[];
  /** Размеры / варианты с разной ценой. */
  variants?: MasterProductVariant[];
  /** Вариант по умолчанию в каталоге и корзине (id из `variants`). */
  defaultVariantId?: string;
  badge?: "hit" | "sale" | "new";
  /** Дополнительный текст на странице товара (прайс, условия). */
  description?: string;
};

/** Подкатегории «Формы для смолы» для выпадающего списка в фильтре. */
export const MASTERS_FORM_CATEGORIES: MasterProductCategory[] = [
  "formy-krugi-dom",
  "formy-krugi-bez-dna",
  "formy-razdvizhnaya",
  "formy-nabor-krugi-dom",
  "formy-pazl",
];

/** Группы для сайдбара и логической структуры каталога (см. docs/PROMPT_MASTERS_CATALOG.md). */
export const MASTERS_CATEGORY_GROUPS: {
  label: string;
  categories: MasterProductCategory[];
}[] = [
  { label: "Силикагель", categories: ["silikagel"] },
  { label: "Деревянные заготовки", categories: ["derev-zagotovki"] },
  {
    label: "Формы для смолы",
    categories: MASTERS_FORM_CATEGORIES,
  },
  { label: "Полезные инструменты", categories: ["instrumenty"] },
];

export const MASTERS_PRODUCTS: MasterProduct[] = [
  // 1. Силикагель
  ...MASTERS_SILIKAGEL_PRODUCTS,
  // 2. Деревянные заготовки (прайс Salamaha Market)
  ...MASTERS_WOOD_BLANK_PRODUCTS,
  // 3. Формы для смолы (прайс «Опалубки и формы»)
  ...MASTERS_FORM_PRODUCTS,
  // 4. Полезные инструменты
  ...MASTERS_INSTRUMENT_PRODUCTS,
];

export function mastersProductHref(slug: string): string {
  return `${MASTERS_CATALOG_PATH}/${slug}`;
}
