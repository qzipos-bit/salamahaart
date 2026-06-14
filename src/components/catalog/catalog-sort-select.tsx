"use client";

import { startTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CATALOG_PRICE_SORT_ASC,
  CATALOG_PRICE_SORT_DESC,
  CATALOG_PRICE_SORT_OPTIONS,
  type CatalogPriceSort,
  parseCatalogSortParam,
} from "@/lib/catalog-sort";
import { FILTER_SIDEBAR_SECTION_CLASS } from "@/lib/product-typography";

type ControlledProps = {
  value: CatalogPriceSort | "";
  onChange: (sort: CatalogPriceSort | "") => void;
};

type RouterProps = {
  basePath: string;
};

type Props = {
  basePath: string;
  value?: CatalogPriceSort | "";
  onChange?: (sort: CatalogPriceSort | "") => void;
};

function CatalogSortSelectControl({
  sort,
  onSortChange,
  selectId,
}: {
  sort: CatalogPriceSort | "";
  onSortChange: (sort: CatalogPriceSort | "") => void;
  selectId: string;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
      <label
        htmlFor={selectId}
        className={`${FILTER_SIDEBAR_SECTION_CLASS} shrink-0`}
      >
        Сортировка
      </label>
      <select
        id={selectId}
        value={sort}
        onChange={(e) => {
          const raw = e.target.value;
          if (
            raw === CATALOG_PRICE_SORT_ASC ||
            raw === CATALOG_PRICE_SORT_DESC
          ) {
            onSortChange(raw);
          } else {
            onSortChange("");
          }
        }}
        className="w-full rounded-xl border border-green/20 bg-white px-3 py-2.5 text-sm font-medium text-fg outline-none focus:border-green/45 sm:min-w-[11rem] sm:w-auto"
      >
        <option value="">По умолчанию</option>
        {CATALOG_PRICE_SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ControlledCatalogSortSelect({ value, onChange }: ControlledProps) {
  const selectId = "catalog-sort-controlled";
  return (
    <CatalogSortSelectControl
      sort={value}
      onSortChange={onChange}
      selectId={selectId}
    />
  );
}

function RouterCatalogSortSelect({ basePath }: RouterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = parseCatalogSortParam(searchParams.get("sort") ?? undefined);
  const selectId = `catalog-sort-${basePath.replace(/\//g, "-")}`;

  const applySort = (next: CatalogPriceSort | "") => {
    const sp = new URLSearchParams(searchParams.toString());
    if (next === CATALOG_PRICE_SORT_ASC || next === CATALOG_PRICE_SORT_DESC) {
      sp.set("sort", next);
    } else {
      sp.delete("sort");
    }
    const q = sp.toString();
    const href = q ? `${basePath}?${q}` : basePath;
    const current = `${window.location.pathname}${window.location.search}`;
    if (current === href) return;
    startTransition(() => {
      router.replace(href, { scroll: false });
    });
  };

  return (
    <CatalogSortSelectControl
      sort={sort}
      onSortChange={applySort}
      selectId={selectId}
    />
  );
}

export function CatalogSortSelect({ basePath, value, onChange }: Props) {
  if (value !== undefined && onChange) {
    return (
      <ControlledCatalogSortSelect value={value} onChange={onChange} />
    );
  }
  return <RouterCatalogSortSelect basePath={basePath} />;
}
