"use client";

import Link from "next/link";
import type { ProductCatalogCategory } from "@/components/shop/product-card";
import type { CatalogPriceSort } from "@/lib/catalog-sort";
import {
  CATALOG_CATEGORIES,
  CATALOG_CATEGORY_LABELS,
  CATALOG_SHOP_PATH,
  formatRubShort,
  getCatalogPriceStep,
} from "@/lib/catalog-filters";
import {
  FILTER_NAV_ROW_IDLE_CLASS,
  FILTER_PRICE_VALUE_CLASS,
  FILTER_RANGE_LABEL_CLASS,
  FILTER_SIDEBAR_PANEL_CLASS,
  FILTER_SIDEBAR_RESET_CLASS,
  FILTER_SIDEBAR_SECTION_CLASS,
  FILTER_SIDEBAR_TITLE_CLASS,
} from "@/lib/product-typography";

type Props = {
  extent: { min: number; max: number };
  activeCat: ProductCatalogCategory | "";
  activeSort: CatalogPriceSort | "";
  minVal: number;
  maxVal: number;
  onCatChange: (cat: ProductCatalogCategory | "") => void;
  onMinChange: (range: { min: number; max: number }) => void;
  onMaxChange: (range: { min: number; max: number }) => void;
};

function navRowClass(active: boolean) {
  return [
    "block w-full rounded-lg border px-3 py-2.5 text-left transition",
    active
      ? "border-green bg-green font-sans text-sm font-bold text-cream shadow-sm"
      : FILTER_NAV_ROW_IDLE_CLASS,
  ].join(" ");
}

export function CatalogFiltersSidebar({
  extent,
  activeCat,
  activeSort,
  minVal,
  maxVal,
  onCatChange,
  onMinChange,
  onMaxChange,
}: Props) {
  const step = getCatalogPriceStep(extent);

  const handleMinChange = (v: number) => {
    let next = Math.max(extent.min, Math.min(v, maxVal - step));
    let hi = maxVal;
    if (hi < next + step) {
      hi = Math.min(extent.max, next + step);
    }
    onMinChange({ min: next, max: hi });
  };

  const handleMaxChange = (v: number) => {
    let next = Math.min(extent.max, Math.max(v, minVal + step));
    let lo = minVal;
    if (lo > next - step) {
      lo = Math.max(extent.min, next - step);
    }
    onMaxChange({ min: lo, max: next });
  };

  const minSliderMax = Math.max(extent.min, maxVal - step);
  const maxSliderMin = Math.min(extent.max, minVal + step);

  const priceTouched = minVal > extent.min || maxVal < extent.max;
  const hasFilters = Boolean(activeCat || activeSort || priceTouched);

  return (
    <div className={FILTER_SIDEBAR_PANEL_CLASS}>
      <div className="flex items-center justify-between gap-2 border-b border-green/15 pb-4">
        <p className={FILTER_SIDEBAR_TITLE_CLASS}>Фильтры</p>
        {hasFilters ? (
          <Link href={CATALOG_SHOP_PATH} className={FILTER_SIDEBAR_RESET_CLASS}>
            Сбросить
          </Link>
        ) : null}
      </div>

      <nav className="mt-5" aria-labelledby="catalog-filter-cat-heading">
        <p id="catalog-filter-cat-heading" className={FILTER_SIDEBAR_SECTION_CLASS}>
          Изделия
        </p>
        <ul className="mt-3 flex flex-col gap-1.5">
          <li>
            <button
              type="button"
              onClick={() => onCatChange("")}
              className={navRowClass(!activeCat)}
            >
              Все категории
            </button>
          </li>
          {CATALOG_CATEGORIES.map((id) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => onCatChange(id)}
                className={navRowClass(activeCat === id)}
              >
                {CATALOG_CATEGORY_LABELS[id]}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className="mt-8 border-t border-green/15 pt-6"
        aria-labelledby="catalog-filter-price-heading"
      >
        <p id="catalog-filter-price-heading" className={FILTER_SIDEBAR_SECTION_CLASS}>
          Цена
        </p>
        <p className={`mt-2 tabular-nums ${FILTER_PRICE_VALUE_CLASS}`}>
          {formatRubShort(minVal)} — {formatRubShort(maxVal)}
        </p>

        <div className="mt-4 space-y-4">
          <div>
            <label htmlFor="catalog-price-min" className={FILTER_RANGE_LABEL_CLASS}>
              От
            </label>
            <input
              id="catalog-price-min"
              type="range"
              min={extent.min}
              max={minSliderMax}
              step={step}
              value={minVal}
              onChange={(e) => handleMinChange(Number(e.target.value))}
              className="mt-1 w-full cursor-pointer accent-[var(--green)]"
            />
          </div>
          <div>
            <label htmlFor="catalog-filter-price-max" className={FILTER_RANGE_LABEL_CLASS}>
              До
            </label>
            <input
              id="catalog-filter-price-max"
              type="range"
              min={maxSliderMin}
              max={extent.max}
              step={step}
              value={maxVal}
              onChange={(e) => handleMaxChange(Number(e.target.value))}
              className="mt-1 w-full cursor-pointer accent-[var(--green)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
