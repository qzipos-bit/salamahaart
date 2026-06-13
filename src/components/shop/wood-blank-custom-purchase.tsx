"use client";

import { useState } from "react";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { Button } from "@/components/ui/button";
import { PRODUCT_PAGE_PRICE_CLASS } from "@/lib/product-typography";

type Props = {
  slug: string;
  title: string;
  backHref: string;
  productPath: string;
};

export function WoodBlankCustomPurchase({
  slug,
  title,
  backHref,
  productPath,
}: Props) {
  const [sizeSpec, setSizeSpec] = useState("");
  const trimmed = sizeSpec.trim();

  const cartTitle = trimmed ? `${title}: ${trimmed}` : title;
  const cartVariantId = trimmed
    ? `custom:${trimmed.slice(0, 120)}`
    : undefined;

  return (
    <div className="mt-6">
      <p className={PRODUCT_PAGE_PRICE_CLASS}>
        по запросу
      </p>
      <p className="mt-2 text-sm leading-relaxed text-fg/80">
        Цена зависит от диаметра, толщины и типа края — рассчитаем после
        заявки.
      </p>

      <div className="mt-6">
        <label
          htmlFor="wood-blank-custom-size"
          className="block text-sm font-semibold text-green-deep"
        >
          Нужный размер заготовки
        </label>
        <textarea
          id="wood-blank-custom-size"
          rows={4}
          required
          value={sizeSpec}
          onChange={(e) => setSizeSpec(e.target.value)}
          placeholder="Например: диаметр 45 см, толщина 4 см, каповый край"
          className="mt-2 w-full rounded-xl border border-green/20 bg-white px-4 py-3 text-base text-fg placeholder:text-fg/45 outline-none focus:border-green/45"
        />
        <p className="mt-2 text-xs leading-relaxed text-fg/70">
          Укажите диаметр, толщину, тип края и другие детали — так мы быстрее
          подберём заготовку.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <AddToCartButton
          catalog="masters"
          slug={slug}
          title={cartTitle}
          price="по запросу"
          productPath={productPath}
          cartVariantId={cartVariantId}
          variant="primary"
          fullWidth={false}
          className="sm:min-w-[10rem] disabled:opacity-55"
          disabled={!trimmed}
        />
        <Button href={backHref} variant="secondary">
          Назад в каталог
        </Button>
      </div>
    </div>
  );
}
