"use client";

import { ProductCard } from "@/components/shop/product-card";
import type { MasterProduct } from "@/lib/masters-products";
import { MASTERS_CATALOG_PATH } from "@/lib/masters-products";
import { useCatalogPageUrl } from "@/hooks/use-catalog-page-url";

type Props = {
  products: MasterProduct[];
  catalogReturnToFallback: string;
};

export function MastersCatalogProductGrid({
  products,
  catalogReturnToFallback,
}: Props) {
  const catalogReturnTo = useCatalogPageUrl(
    MASTERS_CATALOG_PATH,
    catalogReturnToFallback,
  );

  return (
    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
      {products.map((p) => (
        <ProductCard
          key={p.slug}
          product={p}
          titleLevel={2}
          hrefPrefix={MASTERS_CATALOG_PATH}
          returnTo={catalogReturnTo}
          compactMobile
        />
      ))}
    </div>
  );
}
