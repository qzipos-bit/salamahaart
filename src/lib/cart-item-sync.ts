import type { CartItem } from "@/lib/cart-types";
import {
  formatCartRub,
  parsePriceRangeFromLabel,
  parsePriceRubFromLabel,
} from "@/lib/cart-price";
import { MASTERS_PRODUCTS } from "@/lib/masters-products";

type MastersCartPrice = {
  price: string;
  priceRub: number;
  priceRubMax?: number;
};

function mastersCartPrice(
  slug: string,
  variantId?: string,
): MastersCartPrice | null {
  const product = MASTERS_PRODUCTS.find((p) => p.slug === slug);
  if (!product) return null;

  const variant = variantId
    ? product.variants?.find((v) => v.id === variantId)
    : undefined;
  const priceRub = variant?.priceRub ?? product.priceFromRub;
  const priceRubMax = variant ? undefined : product.priceToRub;

  if (variant) {
    return { priceRub, price: formatCartRub(priceRub) };
  }

  if (
    priceRubMax != null &&
    priceRubMax > priceRub &&
    !/уточняйте|whatsapp/i.test(product.price)
  ) {
    return {
      priceRub,
      priceRubMax,
      price: product.price.replace(/^от\s+/i, "").trim(),
    };
  }

  if (!/уточняйте|whatsapp/i.test(product.price)) {
    const parsedRange = parsePriceRangeFromLabel(product.price);
    if (parsedRange) {
      return {
        priceRub: parsedRange[0],
        priceRubMax:
          parsedRange[1] > parsedRange[0] ? parsedRange[1] : undefined,
        price: product.price.replace(/^от\s+/i, "").trim(),
      };
    }
    const parsed = parsePriceRubFromLabel(product.price);
    return {
      priceRub: parsed ?? priceRub,
      price: product.price.replace(/^от\s+/i, "").trim(),
    };
  }

  return { priceRub, price: formatCartRub(priceRub) };
}

export function normalizeCartItem(item: CartItem): CartItem {
  let next: CartItem = { ...item };

  if (next.catalog === "masters") {
    const resolved = mastersCartPrice(next.slug, next.variantId);
    if (resolved) {
      const needsWoodRange =
        next.slug.startsWith("derevo-d") &&
        resolved.priceRubMax != null &&
        next.priceRubMax == null;
      const needsPriceFix =
        /уточняйте|whatsapp/i.test(next.price) ||
        next.priceRub == null ||
        needsWoodRange;

      if (needsPriceFix) {
        next = {
          ...next,
          price: resolved.price,
          priceRub: resolved.priceRub,
          priceRubMax: resolved.priceRubMax,
        };
      }
    }
  }

  if (next.priceRub == null || next.priceRubMax == null) {
    const parsedRange = parsePriceRangeFromLabel(next.price);
    if (parsedRange) {
      next = {
        ...next,
        priceRub: next.priceRub ?? parsedRange[0],
        priceRubMax:
          next.priceRubMax ??
          (parsedRange[1] > parsedRange[0] ? parsedRange[1] : undefined),
      };
    }
  }

  if (next.priceRub == null) {
    const parsed = parsePriceRubFromLabel(next.price);
    if (parsed != null) {
      next = { ...next, priceRub: parsed };
    }
  }

  return next;
}

export function normalizeCartItems(items: CartItem[]): CartItem[] {
  return items.map(normalizeCartItem);
}
