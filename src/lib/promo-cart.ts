import type { CartItem } from "@/lib/cart-types";
import { cartItemLineTotalRange, cartOrderTotalRange } from "@/lib/cart-price";
import { ALL_PRODUCTS } from "@/lib/products";
import { MASTERS_PRODUCTS } from "@/lib/masters-products";
import { isWoodBlankCustomSlug } from "@/lib/masters-wood-blank-products";
import { findPromoCode, normalizePromoCodeInput } from "@/lib/promo-codes";

const MASTERS_CATALOG_SLUGS = new Set(MASTERS_PRODUCTS.map((p) => p.slug));
const SHOP_CATALOG_SLUGS = new Set(ALL_PRODUCTS.map((p) => p.slug));

export type PromoOrderLine = {
  catalog: CartItem["catalog"];
  slug: string;
  variantId?: string;
  quantity: number;
  priceRub?: number;
  priceRubMax?: number;
  price: string;
};

export type AppliedPromo = {
  code: string;
  discountPercent: number;
  eligibleSubtotalMin: number;
  eligibleSubtotalMax: number;
  discountMinRub: number;
  discountMaxRub: number;
};

export type PromoCalculation = {
  valid: boolean;
  error?: string;
  promo: AppliedPromo | null;
  subtotalRange: [number, number] | null;
  totalAfterPromoRange: [number, number] | null;
  hasEligibleItems: boolean;
  hasExcludedItems: boolean;
};

function toCartItemLike(line: PromoOrderLine, id: string): CartItem {
  return {
    id,
    catalog: line.catalog,
    slug: line.slug,
    title: "",
    price: line.price,
    productPath: "",
    quantity: line.quantity,
    variantId: line.variantId,
    priceRub: line.priceRub,
    priceRubMax: line.priceRubMax,
  };
}

/** Промокод не действует на индивидуальные заказы и товары не из каталога. */
export function isPromoEligibleLine(line: PromoOrderLine): boolean {
  if (isWoodBlankCustomSlug(line.slug)) return false;
  if (line.variantId?.startsWith("custom:")) return false;

  if (line.catalog === "masters") {
    return MASTERS_CATALOG_SLUGS.has(line.slug);
  }
  if (line.catalog === "catalog") {
    return SHOP_CATALOG_SLUGS.has(line.slug);
  }
  return false;
}

function eligibleLineRange(line: PromoOrderLine): [number, number] | null {
  if (!isPromoEligibleLine(line)) return null;
  return cartItemLineTotalRange(
    toCartItemLike(line, `${line.catalog}:${line.slug}`),
  );
}

export function calculatePromoForLines(
  lines: PromoOrderLine[],
  promoCodeInput: string,
): PromoCalculation {
  const normalized = normalizePromoCodeInput(promoCodeInput);
  if (!normalized) {
    const subtotal = cartOrderTotalRange(
      lines.map((line, i) =>
        toCartItemLike(line, `line:${i}:${line.catalog}:${line.slug}`),
      ),
    );
    return {
      valid: true,
      promo: null,
      subtotalRange: subtotal,
      totalAfterPromoRange: subtotal,
      hasEligibleItems: false,
      hasExcludedItems: lines.some((l) => !isPromoEligibleLine(l)),
    };
  }

  const record = findPromoCode(normalized);
  if (!record) {
    return {
      valid: false,
      error: "Промокод не найден или недействен.",
      promo: null,
      subtotalRange: null,
      totalAfterPromoRange: null,
      hasEligibleItems: false,
      hasExcludedItems: false,
    };
  }

  let eligibleMin = 0;
  let eligibleMax = 0;
  let hasEligibleItems = false;
  let hasExcludedItems = false;

  for (const line of lines) {
    if (!isPromoEligibleLine(line)) {
      hasExcludedItems = true;
      continue;
    }
    const range = eligibleLineRange(line);
    if (!range) {
      hasExcludedItems = true;
      continue;
    }
    hasEligibleItems = true;
    eligibleMin += range[0];
    eligibleMax += range[1];
  }

  const subtotal = cartOrderTotalRange(
    lines.map((line, i) =>
      toCartItemLike(line, `line:${i}:${line.catalog}:${line.slug}`),
    ),
  );

  const discountMinRub = Math.round(
    eligibleMin * (record.discountPercent / 100),
  );
  const discountMaxRub = Math.round(
    eligibleMax * (record.discountPercent / 100),
  );

  const promo: AppliedPromo = {
    code: record.code,
    discountPercent: record.discountPercent,
    eligibleSubtotalMin: eligibleMin,
    eligibleSubtotalMax: eligibleMax,
    discountMinRub,
    discountMaxRub,
  };

  let totalAfterPromoRange: [number, number] | null = null;
  if (subtotal) {
    totalAfterPromoRange = [
      Math.max(0, subtotal[0] - discountMinRub),
      Math.max(0, subtotal[1] - discountMaxRub),
    ];
  }

  return {
    valid: true,
    promo: hasEligibleItems ? promo : null,
    subtotalRange: subtotal,
    totalAfterPromoRange,
    hasEligibleItems,
    hasExcludedItems,
  };
}

export function calculatePromoForCartItems(
  items: CartItem[],
  promoCodeInput: string,
): PromoCalculation {
  return calculatePromoForLines(
    items.map((item) => ({
      catalog: item.catalog,
      slug: item.slug,
      variantId: item.variantId,
      quantity: item.quantity,
      priceRub: item.priceRub,
      priceRubMax: item.priceRubMax,
      price: item.price,
    })),
    promoCodeInput,
  );
}

export const PROMO_EXCLUDED_ITEMS_NOTE =
  "Скидка по промокоду не действует на индивидуальные заказы (заготовки на заказ) и товары не из каталога.";
