import { NextResponse } from "next/server";
import type { CartCatalog } from "@/lib/cart-types";
import type { PromoOrderLine } from "@/lib/promo-cart";
import { calculatePromoForLines } from "@/lib/promo-cart";

const MAX_ITEMS = 40;

type PromoLineBody = {
  catalog?: unknown;
  slug?: unknown;
  variantId?: unknown;
  quantity?: unknown;
  priceRub?: unknown;
  priceRubMax?: unknown;
  price?: unknown;
};

function parseLines(raw: unknown): PromoOrderLine[] {
  if (!Array.isArray(raw)) return [];

  const lines: PromoOrderLine[] = [];
  for (const row of raw.slice(0, MAX_ITEMS)) {
    if (!row || typeof row !== "object") continue;
    const r = row as PromoLineBody;
    const catalog = r.catalog;
    const slug = typeof r.slug === "string" ? r.slug.trim() : "";
    const quantity = Number(r.quantity);
    const price = typeof r.price === "string" ? r.price.trim() : "—";
    const variantId =
      typeof r.variantId === "string" && r.variantId.trim()
        ? r.variantId.trim()
        : undefined;
    const priceRubRaw = r.priceRub;
    const priceRub =
      typeof priceRubRaw === "number" && Number.isFinite(priceRubRaw)
        ? Math.round(priceRubRaw)
        : undefined;
    const priceRubMaxRaw = r.priceRubMax;
    const priceRubMax =
      typeof priceRubMaxRaw === "number" && Number.isFinite(priceRubMaxRaw)
        ? Math.round(priceRubMaxRaw)
        : undefined;

    if (
      (catalog !== "catalog" && catalog !== "masters") ||
      !slug ||
      !Number.isFinite(quantity) ||
      quantity < 1 ||
      quantity > 99
    ) {
      continue;
    }

    lines.push({
      catalog: catalog as CartCatalog,
      slug,
      variantId,
      quantity: Math.round(quantity),
      price,
      priceRub,
      priceRubMax,
    });
  }
  return lines;
}

export async function POST(request: Request) {
  try {
    const json = (await request.json()) as {
      code?: unknown;
      items?: unknown;
    };
    const code = typeof json.code === "string" ? json.code : "";
    const lines = parseLines(json.items);

    if (lines.length === 0) {
      return NextResponse.json(
        { error: "Корзина пуста." },
        { status: 400 },
      );
    }

    const result = calculatePromoForLines(lines, code);

    if (!result.valid) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      promo: result.promo,
      subtotalMin: result.subtotalRange?.[0],
      subtotalMax: result.subtotalRange?.[1],
      totalMin: result.totalAfterPromoRange?.[0],
      totalMax: result.totalAfterPromoRange?.[1],
      hasEligibleItems: result.hasEligibleItems,
      hasExcludedItems: result.hasExcludedItems,
    });
  } catch (err) {
    console.error("[cart/promo]", err);
    return NextResponse.json(
      { error: "Не удалось проверить промокод." },
      { status: 500 },
    );
  }
}
