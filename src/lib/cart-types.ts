export type CartCatalog = "catalog" | "masters";

export type CartItem = {
  id: string;
  catalog: CartCatalog;
  slug: string;
  title: string;
  price: string;
  productPath: string;
  quantity: number;
  /** Id варианта (размер и т.п.), если позиция не базовая. */
  variantId?: string;
  /** Числовая цена в ₽ для итого в корзине (минимум или точная). */
  priceRub?: number;
  /** Верхняя граница цены в ₽, если позиция с диапазоном. */
  priceRubMax?: number;
};

export type CartOrderConsent = {
  oferta: boolean;
  pdn: boolean;
  rassylka?: boolean;
};

export type CartOrderPayload = {
  name: string;
  phone: string;
  email?: string;
  comment?: string;
  promoCode?: string;
  consent: CartOrderConsent;
  items: Array<{
    catalog: CartCatalog;
    slug: string;
    title: string;
    price: string;
    productPath: string;
    quantity: number;
    variantId?: string;
    priceRub?: number;
    priceRubMax?: number;
  }>;
};

export function cartItemId(
  catalog: CartCatalog,
  slug: string,
  variantId?: string,
): string {
  return variantId ? `${catalog}:${slug}:${variantId}` : `${catalog}:${slug}`;
}

export const CART_CATALOG_LABELS: Record<CartCatalog, string> = {
  catalog: "Магазин изделий",
  masters: "Товары для мастеров",
};
