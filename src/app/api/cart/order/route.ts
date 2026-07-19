import { NextResponse } from "next/server";
import type { CartCatalog, CartOrderPayload } from "@/lib/cart-types";
import type { AppliedPromo } from "@/lib/promo-cart";
import { calculatePromoForLines } from "@/lib/promo-cart";
import { normalizePromoCodeInput } from "@/lib/promo-codes";
import { sendOrderEmail } from "@/lib/send-order-email";

const MAX_ITEMS = 40;
const PHONE_RE = /^[\d\s()+\-]{10,18}$/;

function parseBody(raw: unknown): CartOrderPayload | null {
  if (!raw || typeof raw !== "object") return null;
  const b = raw as Record<string, unknown>;

  const name = typeof b.name === "string" ? b.name.trim() : "";
  const phone = typeof b.phone === "string" ? b.phone.trim() : "";
  const email =
    typeof b.email === "string" && b.email.trim() ? b.email.trim() : undefined;
  const comment =
    typeof b.comment === "string" && b.comment.trim()
      ? b.comment.trim()
      : undefined;
  const promoCodeRaw =
    typeof b.promoCode === "string" ? normalizePromoCodeInput(b.promoCode) : "";
  const promoCode = promoCodeRaw || undefined;

  const consentRaw = b.consent;
  if (!consentRaw || typeof consentRaw !== "object") return null;
  const consentObj = consentRaw as Record<string, unknown>;
  const oferta = consentObj.oferta === true;
  const pdn = consentObj.pdn === true;
  const rassylka =
    consentObj.rassylka === true ? true : undefined;

  if (!oferta || !pdn) return null;

  if (name.length < 2 || !PHONE_RE.test(phone)) return null;

  if (!Array.isArray(b.items) || b.items.length === 0) return null;

  const items: CartOrderPayload["items"] = [];
  for (const row of b.items.slice(0, MAX_ITEMS)) {
    if (!row || typeof row !== "object") continue;
    const r = row as Record<string, unknown>;
    const catalog = r.catalog;
    const slug = typeof r.slug === "string" ? r.slug.trim() : "";
    const title = typeof r.title === "string" ? r.title.trim() : "";
    const price = typeof r.price === "string" ? r.price.trim() : "";
    const productPath =
      typeof r.productPath === "string" ? r.productPath.trim() : "";
    const variantId =
      typeof r.variantId === "string" && r.variantId.trim()
        ? r.variantId.trim()
        : undefined;
    const quantity = Number(r.quantity);
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
      !title ||
      !productPath.startsWith("/") ||
      !Number.isFinite(quantity) ||
      quantity < 1 ||
      quantity > 99
    ) {
      continue;
    }

    items.push({
      catalog: catalog as CartCatalog,
      slug,
      title,
      price: price || "—",
      productPath,
      quantity: Math.round(quantity),
      variantId,
      priceRub,
      priceRubMax,
    });
  }

  if (items.length === 0) return null;

  return { name, phone, email, comment, promoCode, consent: { oferta, pdn, rassylka }, items };
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const order = parseBody(json);

    if (!order) {
      return NextResponse.json(
        { error: "Проверьте имя, телефон, согласия и список товаров." },
        { status: 400 },
      );
    }

    let appliedPromo: AppliedPromo | null = null;
    if (order.promoCode) {
      const promoResult = calculatePromoForLines(
        order.items.map((item) => ({
          catalog: item.catalog,
          slug: item.slug,
          variantId: item.variantId,
          quantity: item.quantity,
          priceRub: item.priceRub,
          priceRubMax: item.priceRubMax,
          price: item.price,
        })),
        order.promoCode,
      );
      if (!promoResult.valid) {
        return NextResponse.json(
          { error: promoResult.error ?? "Промокод недействен." },
          { status: 400 },
        );
      }
      appliedPromo = promoResult.promo;
    }

    await sendOrderEmail(order, appliedPromo);

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Не удалось отправить заказ.";
    console.error("[cart/order]", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
