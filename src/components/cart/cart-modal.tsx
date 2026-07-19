"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CART_CATALOG_LABELS } from "@/lib/cart-types";
import { useCart } from "@/components/cart/cart-context";
import { OrderLegalConsentFields } from "@/components/legal/order-legal-consent-fields";
import {
  cartHasWoodBlankItems,
  cartItemDisplayPrice,
  formatCartOrderTotal,
  formatCartRubRange,
  WOOD_BLANK_CART_PRICE_NOTE,
} from "@/lib/cart-price";
import type { AppliedPromo } from "@/lib/promo-cart";
import {
  calculatePromoForCartItems,
  PROMO_EXCLUDED_ITEMS_NOTE,
} from "@/lib/promo-cart";
import {
  CART_DISCOUNT_PRICE_CLASS,
  CART_ITEM_PRICE_CLASS,
  CART_LINE_PRICE_CLASS,
  CART_ORDER_TOTAL_CLASS,
  PRODUCT_CART_TITLE_CLASS,
} from "@/lib/product-typography";

type FormState = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-xl border border-green/20 bg-white px-4 py-2.5 text-sm text-fg placeholder:text-fg/45 outline-none focus:border-green/45";

export function CartModal() {
  const {
    open,
    closeCart,
    items,
    setQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [acceptOferta, setAcceptOferta] = useState(false);
  const [acceptPdn, setAcceptPdn] = useState(false);
  const [acceptRassylka, setAcceptRassylka] = useState(false);
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<AppliedPromo | null>(null);
  const [promoMessage, setPromoMessage] = useState("");
  const [promoState, setPromoState] = useState<"idle" | "checking">("idle");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeCart]);

  useEffect(() => {
    if (!open) {
      setFormState("idle");
      setErrorMessage("");
      setAppliedPromo(null);
      setPromoMessage("");
      setPromoInput("");
      setPromoState("idle");
      setAcceptOferta(false);
      setAcceptPdn(false);
      setAcceptRassylka(false);
    }
  }, [open]);

  const promoCalculation = useMemo(
    () => calculatePromoForCartItems(items, appliedPromo?.code ?? ""),
    [items, appliedPromo],
  );

  const orderTotalLabel = useMemo(() => {
    if (appliedPromo && promoCalculation.totalAfterPromoRange) {
      return formatCartRubRange(
        promoCalculation.totalAfterPromoRange[0],
        promoCalculation.totalAfterPromoRange[1],
      );
    }
    return formatCartOrderTotal(items);
  }, [items, appliedPromo, promoCalculation.totalAfterPromoRange]);

  const subtotalLabel = useMemo(() => formatCartOrderTotal(items), [items]);
  const hasWoodBlanks = useMemo(() => cartHasWoodBlankItems(items), [items]);

  useEffect(() => {
    if (!appliedPromo) return;
    const calc = calculatePromoForCartItems(items, appliedPromo.code);
    if (calc.promo) {
      setAppliedPromo(calc.promo);
    } else {
      setAppliedPromo(null);
      setPromoMessage(
        "Промокод больше не применим к товарам в корзине.",
      );
    }
  }, [items, appliedPromo?.code]);

  if (!open) return null;

  const applyPromo = async () => {
    if (!promoInput.trim() || items.length === 0) return;
    setPromoState("checking");
    setPromoMessage("");
    setErrorMessage("");

    try {
      const res = await fetch("/api/cart/promo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: promoInput,
          items: items.map((i) => ({
            catalog: i.catalog,
            slug: i.slug,
            variantId: i.variantId,
            quantity: i.quantity,
            priceRub: i.priceRub,
            priceRubMax: i.priceRubMax,
            price: cartItemDisplayPrice(i),
          })),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        promo?: AppliedPromo | null;
        hasEligibleItems?: boolean;
        hasExcludedItems?: boolean;
      };

      if (!res.ok) {
        setAppliedPromo(null);
        setPromoMessage(data.error ?? "Промокод недействен.");
        return;
      }

      if (data.promo) {
        setAppliedPromo(data.promo);
        setPromoMessage(
          data.hasExcludedItems ? PROMO_EXCLUDED_ITEMS_NOTE : "Промокод применён.",
        );
      } else {
        setAppliedPromo(null);
        setPromoMessage(
          `Промокод действует, но не применим к товарам в корзине. ${PROMO_EXCLUDED_ITEMS_NOTE}`,
        );
      }
    } catch {
      setAppliedPromo(null);
      setPromoMessage("Не удалось проверить промокод.");
    } finally {
      setPromoState("idle");
    }
  };

  const clearPromo = () => {
    setAppliedPromo(null);
    setPromoMessage("");
    setPromoInput("");
  };

  const submit = async () => {
    if (items.length === 0 || !acceptOferta || !acceptPdn) return;
    setFormState("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/cart/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          comment,
          consent: {
            oferta: true,
            pdn: true,
            rassylka: acceptRassylka,
          },
          promoCode: appliedPromo?.code ?? undefined,
          items: items.map((i) => ({
            catalog: i.catalog,
            slug: i.slug,
            title: i.title,
            price: cartItemDisplayPrice(i),
            productPath: i.productPath,
            quantity: i.quantity,
            variantId: i.variantId,
            priceRub: i.priceRub,
            priceRubMax: i.priceRubMax,
          })),
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!res.ok) {
        throw new Error(data.error ?? "Не удалось отправить заказ.");
      }

      clearCart();
      setName("");
      setPhone("");
      setEmail("");
      setComment("");
      setAcceptOferta(false);
      setAcceptPdn(false);
      setAcceptRassylka(false);
      setPromoInput("");
      setAppliedPromo(null);
      setPromoMessage("");
      setFormState("success");
    } catch (err) {
      setFormState("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Не удалось отправить заказ.",
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/55 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Закрыть"
        onClick={closeCart}
      />
      <div
        className="relative z-10 flex w-full max-h-[min(92vh,720px)] max-w-lg flex-col rounded-[var(--radius-lg)] border border-green/15 bg-cream shadow-[var(--shadow)]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-green/15 bg-white px-5 py-4 sm:px-6">
          <div>
            <h2
              id="cart-modal-title"
              className="font-serif text-2xl font-semibold text-green-deep"
            >
              Корзина
            </h2>
            {items.length > 0 ? (
              <p className="mt-1 text-sm font-medium text-fg/85">
                {items.length} поз. в заказе
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-lg px-2 py-1 text-sm font-medium text-fg/75 hover:text-green"
          >
            Закрыть
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-cream px-5 py-4 sm:px-6">
          {formState === "success" ? (
            <div className="py-6 text-center">
              <p className="font-serif text-xl font-semibold text-green-deep">
                Заказ отправлен
              </p>
              <p className="mt-3 text-sm leading-relaxed text-fg/85">
                Мы получили вашу заявку и скоро свяжемся с вами.
              </p>
              <Button className="mt-6" type="button" onClick={closeCart}>
                Закрыть
              </Button>
            </div>
          ) : items.length === 0 ? (
            <p className="py-8 text-center text-sm leading-relaxed text-fg/85">
              Корзина пуста. Добавьте товары из{" "}
              <Link
                href="/catalog"
                className="font-medium text-green underline-offset-4 hover:underline"
              >
                магазина
              </Link>
              {" "}или{" "}
              <Link
                href="/tovary-dlya-masterov"
                className="font-medium text-green underline-offset-4 hover:underline"
              >
                каталога для мастеров
              </Link>
              .
            </p>
          ) : (
            <>
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-xl border border-green/15 bg-white p-4 shadow-[var(--shadow-sm)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className={PRODUCT_CART_TITLE_CLASS}>
                          {item.title}
                        </p>
                        <p className="mt-1.5 text-xs font-medium text-fg/70">
                          {CART_CATALOG_LABELS[item.catalog]}
                        </p>
                        <p className={CART_ITEM_PRICE_CLASS}>
                          {cartItemDisplayPrice(item)}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="shrink-0 text-xs font-medium text-fg/65 hover:text-green"
                        onClick={() => removeItem(item.id)}
                      >
                        Удалить
                      </button>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <label
                        className="text-sm font-medium text-fg/80"
                        htmlFor={`qty-${item.id}`}
                      >
                        Кол-во
                      </label>
                      <input
                        id={`qty-${item.id}`}
                        type="number"
                        min={1}
                        max={99}
                        value={item.quantity}
                        onChange={(e) =>
                          setQuantity(item.id, Number(e.target.value))
                        }
                        className="w-16 rounded-lg border border-green/20 bg-white px-2 py-1.5 text-sm font-medium text-fg"
                      />
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 space-y-3 border-t border-green/15 pt-6">
                <p className="text-sm font-semibold text-green-deep">
                  Контакты для заказа
                </p>
                <input
                  type="text"
                  required
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={fieldClass}
                />
                <input
                  type="tel"
                  required
                  placeholder="Телефон"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={fieldClass}
                />
                <input
                  type="email"
                  placeholder="Email (необязательно)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={fieldClass}
                />
                <textarea
                  placeholder="Комментарий к заказу"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className={fieldClass}
                />

                <div className="mt-4 border-t border-green/10 pt-4">
                  <p className="text-sm font-semibold text-green-deep">
                    Промокод
                  </p>
                  <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                    <input
                      type="text"
                      placeholder="Введите промокод"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className={fieldClass}
                      disabled={Boolean(appliedPromo)}
                    />
                    {appliedPromo ? (
                      <Button
                        type="button"
                        variant="secondary"
                        className="shrink-0 !py-2.5 !text-sm"
                        onClick={clearPromo}
                      >
                        Убрать
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="secondary"
                        className="shrink-0 !py-2.5 !text-sm"
                        disabled={
                          promoState === "checking" || !promoInput.trim()
                        }
                        onClick={applyPromo}
                      >
                        {promoState === "checking" ? "Проверяем…" : "Применить"}
                      </Button>
                    )}
                  </div>
                  {promoMessage ? (
                    <p
                      className={`mt-2 text-xs leading-relaxed ${
                        appliedPromo
                          ? "text-fg/75"
                          : "font-medium text-red-800"
                      }`}
                    >
                      {promoMessage}
                    </p>
                  ) : (
                    <p className="mt-2 text-xs leading-relaxed text-fg/60">
                      {PROMO_EXCLUDED_ITEMS_NOTE}
                    </p>
                  )}
                </div>

                <OrderLegalConsentFields
                  acceptOferta={acceptOferta}
                  onAcceptOfertaChange={setAcceptOferta}
                  acceptPdn={acceptPdn}
                  onAcceptPdnChange={setAcceptPdn}
                  acceptRassylka={acceptRassylka}
                  onAcceptRassylkaChange={setAcceptRassylka}
                />

                {formState === "error" && errorMessage ? (
                  <p className="text-sm font-medium text-red-800">
                    {errorMessage}
                  </p>
                ) : null}
              </div>
            </>
          )}
        </div>

        {items.length > 0 && formState !== "success" ? (
          <div className="border-t border-green/15 bg-white px-5 py-4 sm:px-6">
            {orderTotalLabel ? (
              <div className="mb-4 space-y-2">
                {appliedPromo && subtotalLabel ? (
                  <div className={`flex items-baseline justify-between gap-3 ${CART_LINE_PRICE_CLASS}`}>
                    <span>Сумма</span>
                    <span>{subtotalLabel}</span>
                  </div>
                ) : null}
                {appliedPromo ? (
                  <div className={`flex items-baseline justify-between gap-3 ${CART_DISCOUNT_PRICE_CLASS}`}>
                    <span>Скидка {appliedPromo.discountPercent}%</span>
                    <span>
                      −
                      {formatCartRubRange(
                        appliedPromo.discountMinRub,
                        appliedPromo.discountMaxRub,
                      )}
                    </span>
                  </div>
                ) : null}
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-sm font-semibold text-green-deep">
                    {appliedPromo ? "Итого со скидкой" : "Итого"}
                  </span>
                  <span className={CART_ORDER_TOTAL_CLASS}>
                    {orderTotalLabel}
                  </span>
                </div>
                {hasWoodBlanks ? (
                  <p className="mt-2 text-xs leading-relaxed text-fg/70">
                    {WOOD_BLANK_CART_PRICE_NOTE}
                  </p>
                ) : null}
              </div>
            ) : null}
            <Button
              type="button"
              className="w-full"
              disabled={
                formState === "submitting" ||
                !name.trim() ||
                !phone.trim() ||
                !acceptOferta ||
                !acceptPdn
              }
              onClick={submit}
            >
              {formState === "submitting" ? "Отправляем…" : "Оформить заказ"}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
