"use client";

import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { Button } from "@/components/ui/button";

type Props = {
  slug: string;
  title: string;
  price: string;
  backHref: string;
  catalog: "catalog" | "masters";
  productPath: string;
  priceRub?: number;
  priceRubMax?: number;
};

export function ProductCartActions({
  slug,
  title,
  price,
  backHref,
  catalog,
  productPath,
  priceRub,
  priceRubMax,
}: Props) {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <AddToCartButton
        catalog={catalog}
        slug={slug}
        title={title}
        price={price}
        productPath={productPath}
        priceRub={priceRub}
        priceRubMax={priceRubMax}
        variant="primary"
        fullWidth={false}
        className="sm:min-w-[10rem]"
      />
      <Button href={backHref} variant="secondary">
        Назад в каталог
      </Button>
    </div>
  );
}
