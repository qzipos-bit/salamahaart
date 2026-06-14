"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/shop/product-card";
import type { Product, ProductCatalogCategory } from "@/components/shop/product-card";
import { CatalogFiltersSidebar } from "@/components/catalog/catalog-filters-sidebar";
import { CatalogSortSelect } from "@/components/catalog/catalog-sort-select";
import { CatalogReturnSync } from "@/components/shop/catalog-return-sync";
import { useCatalogPageUrl } from "@/hooks/use-catalog-page-url";
import type { CatalogPriceSort } from "@/lib/catalog-sort";
import {
  CATALOG_CATEGORY_LABELS,
  CATALOG_SHOP_PATH,
  filterCatalogProducts,
  parseCatalogShopUrlState,
  syncCatalogShopUrl,
  getCatalogPriceExtent,
} from "@/lib/catalog-filters";
import {
  formatCatalogSortLabel,
  sortProductsByPriceFromRub,
} from "@/lib/catalog-sort";

type Props = {
  products: Product[];
};

export function CatalogInteractive({ products }: Props) {
  const extent = useMemo(() => getCatalogPriceExtent(products), [products]);
  const [cat, setCat] = useState<ProductCatalogCategory | "">("");
  const [sort, setSort] = useState<CatalogPriceSort | "">("");

  useEffect(() => {
    const fromUrl = parseCatalogShopUrlState(extent, window.location.search);
    setCat(fromUrl.cat);
    setSort(fromUrl.sort);
  }, [extent]);

  const syncUrl = useCallback(
    (next: { cat: ProductCatalogCategory | ""; sort: CatalogPriceSort | "" }) => {
      syncCatalogShopUrl({
        cat: next.cat || undefined,
        sort: next.sort || undefined,
        extent,
      });
    },
    [extent],
  );

  const setCatFilter = (nextCat: ProductCatalogCategory | "") => {
    setCat(nextCat);
    syncUrl({ cat: nextCat, sort });
  };

  const setSortFilter = (nextSort: CatalogPriceSort | "") => {
    setSort(nextSort);
    syncUrl({ cat, sort: nextSort });
  };

  const filtered = useMemo(
    () =>
      sortProductsByPriceFromRub(
        filterCatalogProducts(products, cat || undefined, {
          active: false,
          min: extent.min,
          max: extent.max,
        }),
        sort,
      ),
    [products, cat, extent.min, extent.max, sort],
  );

  const catalogReturnTo = useCatalogPageUrl(CATALOG_SHOP_PATH, CATALOG_SHOP_PATH);

  const total = products.length;
  const hasFilters = Boolean(cat || sort);

  return (
    <>
      <CatalogReturnSync catalog="catalog" />
      {hasFilters ? (
        <p className="mt-3 text-sm text-fg/70">
          <span className="text-fg/55">Показано:</span>{" "}
          <span className="font-medium text-green">
            {filtered.length} из {total}
          </span>
          {cat ? (
            <>
              {" "}
              ·{" "}
              <span className="text-fg/55">изделия:</span>{" "}
              {CATALOG_CATEGORY_LABELS[cat]}
            </>
          ) : null}
          {sort ? (
            <>
              {" "}
              ·{" "}
              <span className="text-fg/55">сортировка:</span>{" "}
              {formatCatalogSortLabel(sort)}
            </>
          ) : null}
        </p>
      ) : null}

      <div className="mt-8 lg:mt-10 lg:flex lg:items-start lg:gap-8 xl:gap-10">
        <aside className="mb-8 w-full shrink-0 lg:mb-0 lg:w-[280px] lg:max-w-[320px]">
          <CatalogFiltersSidebar
            activeCat={cat}
            activeSort={sort}
            onCatChange={setCatFilter}
          />
        </aside>

        <div className="min-w-0 flex-1">
          <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-fg/70">
            <p>
              Сувениры из эпоксидной смолы — это оригинальные подарки, которые
              создаются вручную и сохраняют важные моменты на долгие годы. Вы
              можете заказать изделие с индивидуальным дизайном: с фотографией,
              цветами или деревом.
            </p>
            <p>
              В нашем каталоге представлены подарки из эпоксидной смолы: от
              декоративных изделий до функциональных предметов интерьера.
              Слева выберите категорию — сетка обновится автоматически.
            </p>
          </div>

          {filtered.length === 0 ? (
            <p className="mt-10 rounded-[var(--radius-lg)] border border-green/12 bg-sage-muted/30 px-6 py-10 text-center text-sm text-fg/70">
              По таким условиям ничего не нашлось.{" "}
              <Link
                href={CATALOG_SHOP_PATH}
                className="font-medium text-green underline-offset-4 hover:underline"
              >
                Сбросить фильтры
              </Link>
            </p>
          ) : (
            <>
              <div className="mt-10">
                <CatalogSortSelect
                  basePath={CATALOG_SHOP_PATH}
                  value={sort}
                  onChange={setSortFilter}
                />
              </div>
              <div className="mt-4 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p) => (
                  <ProductCard
                    key={p.slug}
                    product={p}
                    titleLevel={2}
                    stableLayout
                    returnTo={catalogReturnTo}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
