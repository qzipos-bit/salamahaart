"use client";

import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { cartItemId, type CartCatalog } from "@/lib/cart-types";
import {
  cartAddItem,
  cartDecrementItem,
  cartGetItemsSnapshot,
  cartGetItemsServerSnapshot,
  cartRemoveItem,
  cartSubscribe,
} from "@/lib/cart-store";

type Props = {
  catalog: CartCatalog;
  slug: string;
  title: string;
  price: string;
  productPath: string;
  className?: string;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  /** Id варианта (размер и т.п.) для отдельной строки в корзине. */
  cartVariantId?: string;
  /** Числовая цена в ₽ для итого в корзине (минимум или точная). */
  priceRub?: number;
  /** Верхняя граница цены в ₽ для диапазона (деревянные заготовки). */
  priceRubMax?: number;
  disabled?: boolean;
  /** Узкая карточка в каталоге «Товары для мастеров». */
  compact?: boolean;
};

const stepperBtnClass =
  "flex items-center justify-center font-medium text-green transition hover:bg-sage-muted/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-green disabled:pointer-events-none disabled:opacity-45";

export function AddToCartButton({
  catalog,
  slug,
  title,
  price,
  productPath,
  className = "",
  variant = "secondary",
  fullWidth = true,
  cartVariantId,
  priceRub,
  priceRubMax,
  disabled = false,
  compact = false,
}: Props) {
  const items = useSyncExternalStore(
    cartSubscribe,
    cartGetItemsSnapshot,
    cartGetItemsServerSnapshot,
  );

  const itemId = cartItemId(catalog, slug, cartVariantId);
  const cartItem = items.find((i) => i.id === itemId);
  const quantity = cartItem?.quantity ?? 0;

  const addOne = () => {
    if (disabled) return;
    cartAddItem({
      catalog,
      slug,
      title,
      price,
      productPath,
      variantId: cartVariantId,
      priceRub,
      priceRubMax,
    });
  };

  const wrapperClass = fullWidth ? "w-full" : "";
  const pyClass = compact ? "py-2" : "py-2.5";
  const textClass = compact ? "text-xs sm:text-sm" : "text-sm";
  const qtyMinW = compact ? "min-w-[1.75rem] sm:min-w-[2.25rem]" : "min-w-[2.5rem]";
  const removePad = compact ? "px-2 sm:px-2.5" : "px-2.5";

  if (quantity === 0) {
    const addBtnClass = compact
      ? `${fullWidth ? "w-full" : ""} !py-2 !text-xs sm:!text-sm ${className}`
      : `${fullWidth ? "w-full" : ""} !py-2.5 !text-sm ${className}`;

    return (
      <div className={wrapperClass}>
        <Button
          type="button"
          variant={variant}
          className={addBtnClass}
          onClick={addOne}
          disabled={disabled}
        >
          В корзину
        </Button>
      </div>
    );
  }

  const stepperShell =
    variant === "primary"
      ? "border-green bg-green text-cream"
      : "border-green/25 bg-cream/40 text-green";

  const stepperDivider =
    variant === "primary" ? "border-cream/25" : "border-green/20";

  const stepperBtnTone =
    variant === "primary"
      ? "text-cream hover:bg-green-deep"
      : "text-green hover:bg-sage-muted/80";

  const qtyTone =
    variant === "primary" ? "text-cream" : "text-green-deep";

  const removeTone =
    variant === "primary"
      ? "text-cream/80 hover:bg-green-deep hover:text-cream"
      : "text-fg/55 hover:bg-red-50 hover:text-red-800";

  return (
    <div className={wrapperClass}>
      <div
        className={`flex w-full items-stretch overflow-hidden rounded-[18px] border ${stepperShell} ${textClass} ${className}`}
      >
        <button
          type="button"
          className={`${stepperBtnClass} ${stepperBtnTone} flex-1 ${pyClass} px-2`}
          aria-label="Уменьшить количество"
          disabled={disabled}
          onClick={() => cartDecrementItem(itemId)}
        >
          −
        </button>
        <span
          className={`flex ${qtyMinW} items-center justify-center border-x ${stepperDivider} font-bold tabular-nums ${qtyTone}`}
          aria-live="polite"
          aria-label={`В корзине: ${quantity}`}
        >
          {quantity}
        </span>
        <button
          type="button"
          className={`${stepperBtnClass} ${stepperBtnTone} flex-1 ${pyClass} px-2`}
          aria-label="Увеличить количество"
          disabled={disabled || quantity >= 99}
          onClick={addOne}
        >
          +
        </button>
        <button
          type="button"
          className={`${stepperBtnClass} ${removeTone} shrink-0 border-l ${stepperDivider} ${removePad} ${pyClass}`}
          aria-label="Удалить из корзины"
          disabled={disabled}
          onClick={() => cartRemoveItem(itemId)}
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </div>
  );
}
