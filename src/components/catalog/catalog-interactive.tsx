"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ProductCard } from "@/components/shop/product-card";
import type { Product, ProductCatalogCategory } from "@/components/shop/product-card";
import { CatalogFiltersSidebar } from "@/components/catalog/catalog-filters-sidebar";
import { CatalogSortSelect } from "@/components/catalog/catalog-sort-select";
import type { CatalogPriceSort } from "@/lib/catalog-sort";
import {
  CATALOG_CATEGORY_LABELS,
  CATALOG_SHOP_PATH,
  filterCatalogProducts,
  formatRubShort,
  getCatalogPriceExtent,
  parseCatalogShopUrlState,
  syncCatalogShopUrl,
} from "@/lib/catalog-filters";
import {
  formatCatalogSortLabel,
  sortProductsByPriceFromRub,
} from "@/lib/catalog-sort";
import { PRICE_FILTER_SUMMARY_CLASS } from "@/lib/product-typography";

type Props = {
  products: Product[];
};

export function CatalogInteractive({ products }: Props) {
  const extent = useMemo(() => getCatalogPriceExtent(products), [products]);
  const [cat, setCat] = useState<ProductCatalogCategory | "">("");
  const [sort, setSort] = useState<CatalogPriceSort | "">("");
  const [minVal, setMinVal] = useState(extent.min);
  const [maxVal, setMaxVal] = useState(extent.max);
  const priceDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const fromUrl = parseCatalogShopUrlState(extent, window.location.search);
    setCat(fromUrl.cat);
    setSort(fromUrl.sort);
    setMinVal(fromUrl.min);
    setMaxVal(fromUrl.max);
  }, [extent]);

  const priceRange = useMemo(() => {
    const active = minVal > extent.min || maxVal < extent.max;
    return { active, min: minVal, max: maxVal };
  }, [minVal, maxVal, extent.min, extent.max]);

  const syncUrl = useCallback(
    (
      next: {
        cat: ProductCatalogCategory | "";
        sort: CatalogPriceSort | "";
        min: number;
        max: number;
      },
    ) => {
      syncCatalogShopUrl({
        cat: next.cat || undefined,
        sort: next.sort || undefined,
        priceMin: next.min,
        priceMax: next.max,
        extent,
      });
    },
    [extent],
  );

  const setCatFilter = (nextCat: ProductCatalogCategory | "") => {
    setCat(nextCat);
    syncUrl({ cat: nextCat, sort, min: minVal, max: maxVal });
  };

  const setSortFilter = (nextSort: CatalogPriceSort | "") => {
    setSort(nextSort);
    syncUrl({ cat, sort: nextSort, min: minVal, max: maxVal });
  };

  const schedulePriceUrlSync = useCallback(
    (lo: number, hi: number) => {
      if (priceDebounceRef.current) clearTimeout(priceDebounceRef.current);
      priceDebounceRef.current = setTimeout(() => {
        priceDebounceRef.current = null;
        syncUrl({ cat, sort, min: lo, max: hi });
      }, 380);
    },
    [cat, sort, syncUrl],
  );

  const filtered = useMemo(
    () =>
      sortProductsByPriceFromRub(
        filterCatalogProducts(products, cat || undefined, priceRange),
        sort,
      ),
    [products, cat, priceRange, sort],
  );

  const total = products.length;
  const hasFilters = Boolean(cat || priceRange.active || sort);

  return (
    <>
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
          {priceRange.active ? (
            <>
              {" "}
              ·{" "}
              <span className="text-fg/55">цена:</span>{" "}
              <span className={PRICE_FILTER_SUMMARY_CLASS}>
                {formatRubShort(priceRange.min)} —{" "}
                {formatRubShort(priceRange.max)}
              </span>
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
              extent={extent}
              activeCat={cat}
              activeSort={sort}
              minVal={minVal}
              maxVal={maxVal}
              onCatChange={setCatFilter}
              onMinChange={(v) => {
                setMinVal(v.min);
                setMaxVal(v.max);
                schedulePriceUrlSync(v.min, v.max);
              }}
              onMaxChange={(v) => {
                setMinVal(v.min);
                setMaxVal(v.max);
                schedulePriceUrlSync(v.min, v.max);
              }}
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
              Слева выберите категорию и диапазон цены ползунками — сетка
              обновится автоматически.
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
              <div
                className="mt-4 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
              >
                {filtered.map((p) => (
                  <ProductCard
                    key={p.slug}
                    product={p}
                    titleLevel={2}
                    stableLayout
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
