"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { MasterProductCategory } from "@/lib/masters-products";
import {
  MASTERS_CATALOG_PATH,
  MASTERS_FORM_CATEGORIES,
} from "@/lib/masters-products";
import {
  isWoodBlankProductSlug,
  MASTERS_WOOD_BLANK_NAV_ITEMS,
} from "@/lib/masters-wood-blank-products";
import type { CatalogPriceSort } from "@/lib/catalog-sort";
import {
  MASTERS_FORMS_GROUP_CAT,
  MASTERS_CATEGORY_LABELS,
  formatRubShort,
  getMastersPriceStep,
  mastersCatalogHref,
  type MastersCatalogCatParam,
} from "@/lib/masters-catalog-filters";
import { appendCatalogReturn } from "@/lib/catalog-return-url";
import {
  FILTER_NAV_ROW_IDLE_CLASS,
  FILTER_NAV_SUB_ACTIVE_CLASS,
  FILTER_NAV_SUB_IDLE_CLASS,
  FILTER_PRICE_VALUE_CLASS,
  FILTER_RANGE_LABEL_CLASS,
  FILTER_SIDEBAR_PANEL_CLASS,
  FILTER_SIDEBAR_RESET_CLASS,
  FILTER_SIDEBAR_SECTION_CLASS,
  FILTER_SIDEBAR_TITLE_CLASS,
} from "@/lib/product-typography";
import {
  MastersCatalogCategoryIcon,
  type MastersCatalogIconId,
} from "@/components/catalog/masters-catalog-category-icons";

type Props = {
  extent: { min: number; max: number };
  activeCat: MasterProductCategory | "";
  activeFormsGroup: boolean;
  activeSort: CatalogPriceSort | "";
  initialMin: number;
  initialMax: number;
};

function navRowClass(active: boolean) {
  return [
    "flex items-center gap-2.5 rounded-lg border px-3 py-2.5 transition",
    active
      ? "border-green bg-green font-sans text-sm font-bold text-cream shadow-sm"
      : FILTER_NAV_ROW_IDLE_CLASS,
  ].join(" ");
}

function navSubRowClass(active: boolean) {
  return [
    "flex items-center gap-2.5 rounded-md px-3 py-2 transition",
    active ? FILTER_NAV_SUB_ACTIVE_CLASS : FILTER_NAV_SUB_IDLE_CLASS,
  ].join(" ");
}

function FilterNavLink({
  href,
  active,
  iconId,
  sub = false,
  children,
}: {
  href: string;
  active: boolean;
  iconId: MastersCatalogIconId;
  sub?: boolean;
  children: ReactNode;
}) {
  const rowClass = sub ? navSubRowClass(active) : navRowClass(active);
  const iconClass = active
    ? "h-5 w-5 shrink-0 text-cream"
    : "h-5 w-5 shrink-0 text-green";

  return (
    <Link href={href} className={`${rowClass} flex items-center gap-2.5`}>
      <MastersCatalogCategoryIcon id={iconId} className={iconClass} />
      <span className="min-w-0 leading-snug">{children}</span>
    </Link>
  );
}

export function MastersCatalogFiltersSidebar({
  extent,
  activeCat,
  activeFormsGroup,
  activeSort,
  initialMin,
  initialMax,
}: Props) {
  const step = getMastersPriceStep(extent);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [minVal, setMinVal] = useState(initialMin);
  const [maxVal, setMaxVal] = useState(initialMax);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isFormCategory = MASTERS_FORM_CATEGORIES.includes(
    activeCat as MasterProductCategory,
  );
  const isWoodCategoryActive = activeCat === "derev-zagotovki";
  const isFormsMenuActive = activeFormsGroup || isFormCategory;

  const activeWoodSlug =
    pathname?.startsWith(`${MASTERS_CATALOG_PATH}/`) &&
    isWoodBlankProductSlug(pathname.slice(MASTERS_CATALOG_PATH.length + 1))
      ? pathname.slice(MASTERS_CATALOG_PATH.length + 1)
      : "";

  const isWoodMenuActive = isWoodCategoryActive || Boolean(activeWoodSlug);

  const catalogReturnTo = useMemo(() => {
    if (pathname !== MASTERS_CATALOG_PATH) return MASTERS_CATALOG_PATH;
    const q = searchParams.toString();
    return q ? `${MASTERS_CATALOG_PATH}?${q}` : MASTERS_CATALOG_PATH;
  }, [pathname, searchParams]);

  useEffect(() => {
    setMinVal(initialMin);
    setMaxVal(initialMax);
  }, [initialMin, initialMax]);

  const catalogHref = useCallback(
    (cat?: MastersCatalogCatParam) =>
      mastersCatalogHref({
        cat,
        sort: activeSort || undefined,
        priceMin: minVal,
        priceMax: maxVal,
        extent,
      }),
    [extent, minVal, maxVal, activeSort],
  );

  const activeFilterCat: MastersCatalogCatParam | undefined = activeFormsGroup
    ? MASTERS_FORMS_GROUP_CAT
    : activeCat || undefined;

  const flushReplace = useCallback(
    (lo: number, hi: number) => {
      const href = mastersCatalogHref({
        cat: activeFilterCat,
        sort: activeSort || undefined,
        priceMin: lo,
        priceMax: hi,
        extent,
      });
      router.replace(href, { scroll: false });
    },
    [activeFilterCat, activeSort, extent, router],
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
  const hasFilters = Boolean(
    activeCat || activeFormsGroup || activeSort || priceTouched,
  );

  const formsButtonLabel =
    isFormCategory && !activeFormsGroup
      ? MASTERS_CATEGORY_LABELS[activeCat as MasterProductCategory]
      : "Формы для смолы";

  return (
    <div className={FILTER_SIDEBAR_PANEL_CLASS}>
      <div className="flex items-center justify-between gap-2 border-b border-green/15 pb-4">
        <p className={FILTER_SIDEBAR_TITLE_CLASS}>Фильтры</p>
        {hasFilters ? (
          <Link href={MASTERS_CATALOG_PATH} className={FILTER_SIDEBAR_RESET_CLASS}>
            Сбросить
          </Link>
        ) : null}
      </div>

      <nav className="mt-5" aria-labelledby="masters-filter-cat-heading">
        <p id="masters-filter-cat-heading" className={FILTER_SIDEBAR_SECTION_CLASS}>
          Категория
        </p>
        <ul className="mt-3 flex flex-col gap-1.5">
          <li>
            <FilterNavLink href={catalogHref()} active={!activeCat} iconId="all">
              Все категории
            </FilterNavLink>
          </li>
          <li>
            <FilterNavLink
              href={catalogHref("silikagel")}
              active={activeCat === "silikagel"}
              iconId="silikagel"
            >
              Силикагель
            </FilterNavLink>
          </li>
          <li>
            <FilterNavLink
              href={catalogHref("derev-zagotovki")}
              active={
                isWoodMenuActive && !activeWoodSlug && isWoodCategoryActive
              }
              iconId="derev-zagotovki"
            >
              Деревянные заготовки
            </FilterNavLink>
            <ul
              className="mt-1.5 flex flex-col gap-0.5 pl-1"
              aria-label="Деревянные заготовки"
            >
              <li>
                <FilterNavLink
                  href={catalogHref("derev-zagotovki")}
                  active={isWoodCategoryActive && !activeWoodSlug}
                  iconId="wood-all"
                  sub
                >
                  Все заготовки
                </FilterNavLink>
              </li>
              {MASTERS_WOOD_BLANK_NAV_ITEMS.map((item) => (
                <li key={item.slug}>
                  <FilterNavLink
                    href={appendCatalogReturn(
                      `${MASTERS_CATALOG_PATH}/${item.slug}`,
                      catalogReturnTo,
                    )}
                    active={activeWoodSlug === item.slug}
                    iconId={item.slug as MastersCatalogIconId}
                    sub
                  >
                    {item.title}
                  </FilterNavLink>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <FilterNavLink
              href={catalogHref(MASTERS_FORMS_GROUP_CAT)}
              active={isFormsMenuActive && !isFormCategory}
              iconId={
                isFormCategory ? (activeCat as MastersCatalogIconId) : "formy"
              }
            >
              {formsButtonLabel}
            </FilterNavLink>
            <ul
              className="mt-1.5 flex flex-col gap-0.5 pl-1"
              aria-label="Формы для смолы"
            >
              <li>
                <FilterNavLink
                  href={catalogHref(MASTERS_FORMS_GROUP_CAT)}
                  active={activeFormsGroup}
                  iconId="formy-all"
                  sub
                >
                  Все формы
                </FilterNavLink>
              </li>
              {MASTERS_FORM_CATEGORIES.map((id) => (
                <li key={id}>
                  <FilterNavLink
                    href={catalogHref(id)}
                    active={activeCat === id}
                    iconId={id}
                    sub
                  >
                    {MASTERS_CATEGORY_LABELS[id]}
                  </FilterNavLink>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <FilterNavLink
              href={catalogHref("instrumenty")}
              active={activeCat === "instrumenty"}
              iconId="instrumenty"
            >
              Полезные инструменты
            </FilterNavLink>
          </li>
        </ul>
      </nav>

      <div
        className="mt-8 border-t border-green/15 pt-6"
        aria-labelledby="masters-filter-price-heading"
      >
        <p id="masters-filter-price-heading" className={FILTER_SIDEBAR_SECTION_CLASS}>
          Цена
        </p>
        <p className={`mt-2 ${FILTER_PRICE_VALUE_CLASS}`}>
          {formatRubShort(minVal)} — {formatRubShort(maxVal)}
        </p>

        <div className="mt-4 space-y-4">
          <div>
            <label htmlFor="masters-price-min" className={FILTER_RANGE_LABEL_CLASS}>
              От
            </label>
            <input
              id="masters-price-min"
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
            <label htmlFor="masters-price-max" className={FILTER_RANGE_LABEL_CLASS}>
              До
            </label>
            <input
              id="masters-price-max"
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
