"use client";

import Link from "next/link";
import { startTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CATALOG_PRICE_SORT_ASC,
  CATALOG_PRICE_SORT_DESC,
  CATALOG_PRICE_SORT_OPTIONS,
  type CatalogPriceSort,
  parseCatalogSortParam,
} from "@/lib/catalog-sort";
import {
  FILTER_NAV_SUB_ACTIVE_CLASS,
  FILTER_NAV_SUB_IDLE_CLASS,
  FILTER_SIDEBAR_SECTION_CLASS,
} from "@/lib/product-typography";

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

function sortNavLinkClass(active: boolean) {
  return [
    "block rounded-md px-3 py-2 transition",
    active ? FILTER_NAV_SUB_ACTIVE_CLASS : FILTER_NAV_SUB_IDLE_CLASS,
  ].join(" ");
}

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
    <div className="flex flex-wrap items-center justify-end gap-3">
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
        className="min-w-[11rem] rounded-xl border border-green/20 bg-white px-3 py-2.5 text-sm font-medium text-fg outline-none focus:border-green/45"
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

function CatalogSortNavControl({
  sort,
  hrefForSort,
  onSortChange,
}: {
  sort: CatalogPriceSort | "";
  hrefForSort?: (sort: CatalogPriceSort | "") => string;
  onSortChange?: (sort: CatalogPriceSort | "") => void;
}) {
  const renderItem = (
    label: string,
    value: CatalogPriceSort | "",
  ) => {
    const className = sortNavLinkClass(sort === value);
    if (onSortChange) {
      return (
        <button
          type="button"
          onClick={() => onSortChange(value)}
          className={`${className} w-full text-left sm:w-auto`}
        >
          {label}
        </button>
      );
    }
    return (
      <Link href={hrefForSort!(value)} className={className}>
        {label}
      </Link>
    );
  };

  return (
    <div>
      <p className={FILTER_SIDEBAR_SECTION_CLASS}>Сортировка</p>
      <ul className="mt-2 flex flex-col gap-0.5 sm:flex-row sm:flex-wrap sm:gap-1">
        <li>{renderItem("По умолчанию", "")}</li>
        {CATALOG_PRICE_SORT_OPTIONS.map((option) => (
          <li key={option.value}>{renderItem(option.label, option.value)}</li>
        ))}
      </ul>
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

function RouterCatalogSortNav({ basePath }: RouterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = parseCatalogSortParam(searchParams.get("sort") ?? undefined);

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

  return <CatalogSortNavControl sort={sort} onSortChange={applySort} />;
}

export function CatalogSortSelect({ basePath, value, onChange }: Props) {
  if (value !== undefined && onChange) {
    return (
      <ControlledCatalogSortSelect value={value} onChange={onChange} />
    );
  }
  return <RouterCatalogSortSelect basePath={basePath} />;
}

export function CatalogSortNav({ basePath }: RouterProps) {
  return <RouterCatalogSortNav basePath={basePath} />;
}
