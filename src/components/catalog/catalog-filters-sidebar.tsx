"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { ProductCatalogCategory } from "@/components/shop/product-card";
import {
  CATALOG_CATEGORIES,
  CATALOG_CATEGORY_LABELS,
  catalogHref,
  formatRubShort,
  getCatalogPriceStep,
} from "@/lib/catalog-filters";

type Props = {
  extent: { min: number; max: number };
  activeCat: ProductCatalogCategory | "";
  initialMin: number;
  initialMax: number;
};

function navRowClass(active: boolean) {
  return [
    "block rounded-lg border px-3 py-2.5 text-sm font-medium transition",
    active
      ? "border-green bg-green text-cream shadow-sm"
      : "border-green/10 bg-cream/60 text-green/90 hover:border-gold/35 hover:bg-cream",
  ].join(" ");
}

export function CatalogFiltersSidebar({
  extent,
  activeCat,
  initialMin,
  initialMax,
}: Props) {
  const step = getCatalogPriceStep(extent);
  const router = useRouter();
  const [minVal, setMinVal] = useState(initialMin);
  const [maxVal, setMaxVal] = useState(initialMax);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMinVal(initialMin);
    setMaxVal(initialMax);
  }, [initialMin, initialMax]);

  const flushReplace = useCallback(
    (lo: number, hi: number) => {
      const href = catalogHref({
        cat: activeCat || undefined,
        priceMin: lo,
        priceMax: hi,
        extent,
      });
      router.replace(href, { scroll: false });
    },
    [activeCat, extent, router],
  );

  const scheduleReplace = useCallback(
    (lo: number, hi: number) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        debounceRef.current = null;
        flushReplace(lo, hi);
      }, 380);
    },
    [flushReplace],
  );

  useEffect(
    () => () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    },
    [],
  );

  const onMinChange = (v: number) => {
    let next = Math.max(extent.min, Math.min(v, maxVal - step));
    let hi = maxVal;
    if (hi < next + step) {
      hi = Math.min(extent.max, next + step);
      setMaxVal(hi);
    }
    setMinVal(next);
    scheduleReplace(next, hi);
  };

  const onMaxChange = (v: number) => {
    let next = Math.min(extent.max, Math.max(v, minVal + step));
    let lo = minVal;
    if (lo > next - step) {
      lo = Math.max(extent.min, next - step);
      setMinVal(lo);
    }
    setMaxVal(next);
    scheduleReplace(lo, next);
  };

  const minSliderMax = Math.max(extent.min, maxVal - step);
  const maxSliderMin = Math.min(extent.max, minVal + step);

  const priceTouched = minVal > extent.min || maxVal < extent.max;
  const hasFilters = Boolean(activeCat || priceTouched);

  return (
    <div className="rounded-[var(--radius-lg)] border border-green/10 bg-sage-muted/25 p-5 shadow-[var(--shadow-sm)]">
      <div className="flex items-center justify-between gap-2 border-b border-green/10 pb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green/55">
          Фильтры
        </p>
        {hasFilters ? (
          <Link
            href="/catalog"
            className="shrink-0 text-xs font-medium text-green underline-offset-4 hover:underline"
          >
            Сбросить
          </Link>
        ) : null}
      </div>

      <nav className="mt-5" aria-labelledby="catalog-filter-cat-heading">
        <p
          id="catalog-filter-cat-heading"
          className="text-xs font-medium uppercase tracking-wider text-fg/48"
        >
          Изделия
        </p>
        <ul className="mt-3 flex flex-col gap-1.5">
          <li>
            <Link
              href={catalogHref({
                cat: undefined,
                priceMin: minVal,
                priceMax: maxVal,
                extent,
              })}
              className={navRowClass(!activeCat)}
            >
              Все категории
            </Link>
          </li>
          {CATALOG_CATEGORIES.map((id) => (
            <li key={id}>
              <Link
                href={catalogHref({
                  cat: id,
                  priceMin: minVal,
                  priceMax: maxVal,
                  extent,
                })}
                className={navRowClass(activeCat === id)}
              >
                {CATALOG_CATEGORY_LABELS[id]}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className="mt-8 border-t border-green/10 pt-6"
        aria-labelledby="catalog-filter-price-heading"
      >
        <p
          id="catalog-filter-price-heading"
          className="text-xs font-medium uppercase tracking-wider text-fg/48"
        >
          Цена
        </p>
        <p className="mt-2 font-[family-name:var(--font-serif)] text-[1.5rem] font-semibold leading-snug text-green-deep">
          {formatRubShort(minVal)} — {formatRubShort(maxVal)}
        </p>

        <div className="mt-4 space-y-4">
          <div>
            <label
              htmlFor="catalog-price-min"
              className="text-xs text-fg/55"
            >
              От
            </label>
            <input
              id="catalog-price-min"
              type="range"
              min={extent.min}
              max={minSliderMax}
              step={step}
              value={minVal}
              onChange={(e) => onMinChange(Number(e.target.value))}
              className="mt-1 w-full cursor-pointer accent-[var(--green)]"
            />
          </div>
          <div>
            <label
              htmlFor="catalog-price-max"
              className="text-xs text-fg/55"
            >
              До
            </label>
            <input
              id="catalog-price-max"
              type="range"
              min={maxSliderMin}
              max={extent.max}
              step={step}
              value={maxVal}
              onChange={(e) => onMaxChange(Number(e.target.value))}
              className="mt-1 w-full cursor-pointer accent-[var(--green)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
