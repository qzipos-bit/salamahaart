import type { CartItem } from "@/lib/cart-types";
import { isWoodBlankCustomSlug } from "@/lib/masters-wood-blank-products";

/** Из «1 050 ₽», «от 5 790 ₽», «6 250 ₽ (оптовая цена)» — первое число. */
export function parsePriceRubFromLabel(label: string): number | null {
  const normalized = label.replace(/\u00a0/g, " ").trim();
  if (/уточняйте|whatsapp/i.test(normalized)) return null;
  const match = normalized.match(/(\d[\d\s]*)\s*₽/);
  if (!match) return null;
  const n = Number(match[1].replace(/\s/g, ""));
  return Number.isFinite(n) ? n : null;
}

/** Из «1 700–2 200 ₽» — пара [min, max]. */
export function parsePriceRangeFromLabel(label: string): [number, number] | null {
  const normalized = label.replace(/\u00a0/g, " ").trim();
  if (/уточняйте|whatsapp/i.test(normalized)) return null;

  const rangeMatch = normalized.match(
    /(\d[\d\s]*)\s*[–\-]\s*(\d[\d\s]*)\s*₽/,
  );
  if (rangeMatch) {
    const min = Number(rangeMatch[1].replace(/\s/g, ""));
    const max = Number(rangeMatch[2].replace(/\s/g, ""));
    if (Number.isFinite(min) && Number.isFinite(max)) {
      return [Math.min(min, max), Math.max(min, max)];
    }
  }

  const single = parsePriceRubFromLabel(normalized);
  if (single != null) return [single, single];
  return null;
}

export function formatCartRub(n: number): string {
  return `${new Intl.NumberFormat("ru-RU").format(n)} ₽`;
}

export function formatCartRubRange(min: number, max: number): string {
  const fmt = (n: number) => new Intl.NumberFormat("ru-RU").format(n);
  if (min === max) return formatCartRub(min);
  return `${fmt(min)}–${fmt(max)} ₽`;
}

export function isWoodBlankCartItem(item: CartItem): boolean {
  return (
    item.catalog === "masters" &&
    (item.slug.startsWith("derevo-d") || isWoodBlankCustomSlug(item.slug))
  );
}

export const WOOD_BLANK_CART_PRICE_NOTE =
  "Точная стоимость деревянных заготовок будет определена после согласования.";

export function cartItemUnitPriceRange(item: CartItem): [number, number] | null {
  if (item.priceRub != null) {
    const max = item.priceRubMax ?? item.priceRub;
    return [item.priceRub, max];
  }
  return parsePriceRangeFromLabel(item.price);
}

export function cartItemUnitPriceRub(item: CartItem): number | null {
  const range = cartItemUnitPriceRange(item);
  return range ? range[0] : null;
}

export function cartItemLineTotalRange(item: CartItem): [number, number] | null {
  const unit = cartItemUnitPriceRange(item);
  if (!unit) return null;
  return [unit[0] * item.quantity, unit[1] * item.quantity];
}

export function cartItemLineTotalRub(item: CartItem): number | null {
  const line = cartItemLineTotalRange(item);
  return line ? line[0] : null;
}

export function cartOrderTotalRange(items: CartItem[]): [number, number] | null {
  if (items.length === 0) return [0, 0];
  let minTotal = 0;
  let maxTotal = 0;
  for (const item of items) {
    const line = cartItemLineTotalRange(item);
    if (!line) return null;
    minTotal += line[0];
    maxTotal += line[1];
  }
  return [minTotal, maxTotal];
}

export function cartOrderTotalRub(items: CartItem[]): number | null {
  const range = cartOrderTotalRange(items);
  return range ? range[0] : null;
}

export function formatCartOrderTotal(items: CartItem[]): string | null {
  const range = cartOrderTotalRange(items);
  if (!range) return null;
  return formatCartRubRange(range[0], range[1]);
}

export function cartHasWoodBlankItems(items: CartItem[]): boolean {
  return items.some(isWoodBlankCartItem);
}

export function cartItemDisplayPrice(item: CartItem): string {
  const range = cartItemUnitPriceRange(item);
  if (!range) return item.price;
  return formatCartRubRange(range[0], range[1]);
}
