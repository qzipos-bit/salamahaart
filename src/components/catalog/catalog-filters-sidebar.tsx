"use client";

import Link from "next/link";
import type { ProductCatalogCategory } from "@/components/shop/product-card";
import type { CatalogPriceSort } from "@/lib/catalog-sort";
import {
  CATALOG_CATEGORIES,
  CATALOG_CATEGORY_LABELS,
  CATALOG_SHOP_PATH,
} from "@/lib/catalog-filters";
import {
  FILTER_NAV_ROW_IDLE_CLASS,
  FILTER_SIDEBAR_PANEL_CLASS,
  FILTER_SIDEBAR_RESET_CLASS,
  FILTER_SIDEBAR_SECTION_CLASS,
  FILTER_SIDEBAR_TITLE_CLASS,
} from "@/lib/product-typography";

type Props = {
  activeCat: ProductCatalogCategory | "";
  activeSort: CatalogPriceSort | "";
  onCatChange: (cat: ProductCatalogCategory | "") => void;
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
  activeCat,
  activeSort,
  onCatChange,
}: Props) {
  const hasFilters = Boolean(activeCat || activeSort);

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
    </div>
  );
}
