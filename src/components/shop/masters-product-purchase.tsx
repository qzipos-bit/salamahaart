"use client";

import { useMemo, useState } from "react";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { Button } from "@/components/ui/button";
import type { MasterProductVariant } from "@/lib/masters-products";
import {
  formatMastersRub,
  mastersProductVariantById,
} from "@/lib/masters-sliding-borts";
import {
  PRODUCT_PAGE_PRICE_CLASS,
  PRODUCT_VARIANT_PRICE_CLASS,
} from "@/lib/product-typography";

type Props = {
  slug: string;
  title: string;
  variants: MasterProductVariant[];
  defaultVariantId?: string;
  backHref: string;
  productPath: string;
  /** Подпись блока выбора варианта на странице товара. */
  variantLegend?: string;
};

export function MastersProductPurchase({
  slug,
  title,
  variants,
  defaultVariantId,
  backHref,
  productPath,
  variantLegend = "Размер внутреннего поля",
}: Props) {
  const initialId =
    defaultVariantId && variants.some((v) => v.id === defaultVariantId)
      ? defaultVariantId
      : variants[0].id;

  const [selectedId, setSelectedId] = useState(initialId);

  const selected = useMemo(
    () => mastersProductVariantById(variants, selectedId),
    [variants, selectedId],
  );

  const priceLabel = formatMastersRub(selected.priceRub);
  const cartTitle = `${title}, ${selected.label}`;

  return (
    <div>
      <p className={PRODUCT_PAGE_PRICE_CLASS}>
        {priceLabel}
      </p>

      <fieldset className="mt-6">
        <legend className="text-sm font-semibold text-green-deep">
          {variantLegend}
        </legend>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {variants.map((v) => {
            const active = v.id === selectedId;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedId(v.id)}
                className={`rounded-[var(--radius-md)] border px-3 py-2.5 text-left text-sm transition ${
                  active
                    ? "border-green bg-green/10 font-semibold text-green-deep"
                    : "border-green/20 bg-white text-green-deep hover:border-green/40"
                }`}
              >
                <span className="block font-semibold">{v.label}</span>
                <span className={PRODUCT_VARIANT_PRICE_CLASS}>
                  {formatMastersRub(v.priceRub)}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <AddToCartButton
          catalog="masters"
          slug={slug}
          title={cartTitle}
          price={priceLabel}
          productPath={productPath}
          cartVariantId={selected.id}
          priceRub={selected.priceRub}
          variant="primary"
          fullWidth={false}
          className="sm:min-w-[10rem]"
        />
        <Button href={backHref} variant="secondary">
          Назад в каталог
        </Button>
      </div>
    </div>
  );
}
