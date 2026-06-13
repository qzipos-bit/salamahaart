"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { CartCatalog } from "@/lib/cart-types";
import { cartAddItem, cartSetOpen } from "@/lib/cart-store";

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
};

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
}: Props) {
  const [hint, setHint] = useState(false);

  const handleClick = () => {
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
    setHint(true);
    window.setTimeout(() => setHint(false), 2000);
  };

  return (
    <div className={fullWidth ? "w-full" : ""}>
      <Button
        type="button"
        variant={variant}
        className={`${fullWidth ? "w-full" : ""} !py-2.5 !text-sm ${className}`}
        onClick={handleClick}
        disabled={disabled}
      >
        {hint ? "Добавлено ✓" : "В корзину"}
      </Button>
      {hint ? (
        <button
          type="button"
          className="mt-2 text-xs font-medium text-green underline-offset-4 hover:underline"
          onClick={() => cartSetOpen(true)}
        >
          Открыть корзину
        </button>
      ) : null}
    </div>
  );
}
