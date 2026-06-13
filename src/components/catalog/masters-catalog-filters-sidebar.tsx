"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { MasterProductCategory } from "@/lib/masters-products";
import {
  MASTERS_CATALOG_PATH,
  MASTERS_FORM_CATEGORIES,
} from "@/lib/masters-products";
import { MASTERS_WOOD_BLANK_DIAMETERS_CM, WOOD_BLANK_CUSTOM_DIA_PARAM } from "@/lib/masters-wood-blank-products";
import type { WoodBlankDiaFilter } from "@/lib/masters-wood-blank-products";
import type { CatalogPriceSort } from "@/lib/catalog-sort";
import {
  MASTERS_FORMS_GROUP_CAT,
  MASTERS_CATEGORY_LABELS,
  formatRubShort,
  getMastersPriceStep,
  mastersCatalogHref,
  type MastersCatalogCatParam,
} from "@/lib/masters-catalog-filters";
import { formatDiameterCm } from "@/lib/masters-format";
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

type Props = {
  extent: { min: number; max: number };
  activeCat: MasterProductCategory | "";
  activeFormsGroup: boolean;
  activeWoodDia: WoodBlankDiaFilter | "";
  activeSort: CatalogPriceSort | "";
  initialMin: number;
  initialMax: number;
};

function navRowClass(active: boolean) {
  return [
    "block rounded-lg border px-3 py-2.5 transition",
    active
      ? "border-green bg-green font-sans text-sm font-bold text-cream shadow-sm"
      : FILTER_NAV_ROW_IDLE_CLASS,
  ].join(" ");
}

function navSubRowClass(active: boolean) {
  return [
    "block rounded-md px-3 py-2 transition",
    active ? FILTER_NAV_SUB_ACTIVE_CLASS : FILTER_NAV_SUB_IDLE_CLASS,
  ].join(" ");
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      aria-hidden
      className={className}
    >
      <path fill="currentColor" d="M2.5 4.5 6 8l3.5-3.5" />
    </svg>
  );
}

export function MastersCatalogFiltersSidebar({
  extent,
  activeCat,
  activeFormsGroup,
  activeWoodDia,
  activeSort,
  initialMin,
  initialMax,
}: Props) {
  const step = getMastersPriceStep(extent);
  const router = useRouter();
  const [minVal, setMinVal] = useState(initialMin);
  const [maxVal, setMaxVal] = useState(initialMax);

  const isFormCategory = MASTERS_FORM_CATEGORIES.includes(
    activeCat as MasterProductCategory,
  );
  const isWoodCategoryActive = activeCat === "derev-zagotovki";
  const isWoodMenuActive = isWoodCategoryActive || Boolean(activeWoodDia);
  const isFormsMenuActive = activeFormsGroup || isFormCategory;

  const [formsOpen, setFormsOpen] = useState(isFormsMenuActive);
  const [woodOpen, setWoodOpen] = useState(isWoodMenuActive);
  const formsMenuRef = useRef<HTMLLIElement>(null);
  const woodMenuRef = useRef<HTMLLIElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isFormsMenuActive) setFormsOpen(true);
  }, [isFormsMenuActive]);

  useEffect(() => {
    if (isWoodMenuActive) setWoodOpen(true);
  }, [isWoodMenuActive]);

  useEffect(() => {
    if (!formsOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (
        formsMenuRef.current &&
        !formsMenuRef.current.contains(e.target as Node)
      ) {
        setFormsOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [formsOpen]);

  useEffect(() => {
    if (!woodOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (
        woodMenuRef.current &&
        !woodMenuRef.current.contains(e.target as Node)
      ) {
        setWoodOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [woodOpen]);

  useEffect(() => {
    setMinVal(initialMin);
    setMaxVal(initialMax);
  }, [initialMin, initialMax]);

  const catalogHref = useCallback(
    (cat?: MastersCatalogCatParam, woodDia?: WoodBlankDiaFilter) =>
      mastersCatalogHref({
        cat,
        woodDia,
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
        woodDia: activeWoodDia || undefined,
        sort: activeSort || undefined,
        priceMin: lo,
        priceMax: hi,
        extent,
      });
      router.replace(href, { scroll: false });
    },
    [activeFilterCat, activeWoodDia, activeSort, extent, router],
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
    activeCat || activeFormsGroup || activeWoodDia || activeSort || priceTouched,
  );

  const formsButtonLabel =
    isFormCategory && !activeFormsGroup
      ? MASTERS_CATEGORY_LABELS[activeCat as MasterProductCategory]
      : "Формы для смолы";

  const woodButtonLabel = activeWoodDia
    ? activeWoodDia === WOOD_BLANK_CUSTOM_DIA_PARAM
      ? "Индивидуальный размер"
      : formatDiameterCm(activeWoodDia)
    : "Деревянные заготовки";

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
            <Link href={catalogHref()} className={navRowClass(!activeCat)}>
              Все категории
            </Link>
          </li>
          <li>
            <Link
              href={catalogHref("silikagel")}
              className={navRowClass(activeCat === "silikagel")}
            >
              Силикагель
            </Link>
          </li>
          <li ref={woodMenuRef} className="relative">
            <div
              className={`${navRowClass(isWoodMenuActive)} flex items-stretch gap-0.5 pr-1.5`}
            >
              <Link
                href={catalogHref("derev-zagotovki")}
                id="masters-wood-trigger"
                className="flex min-w-0 flex-1 items-center py-0 pl-0 text-left"
                onClick={() => setWoodOpen(true)}
              >
                <span className="truncate">{woodButtonLabel}</span>
              </Link>
              <button
                type="button"
                aria-expanded={woodOpen}
                aria-controls="masters-wood-submenu"
                aria-label={
                  woodOpen
                    ? "Скрыть фильтры заготовок"
                    : "Показать фильтры заготовок"
                }
                className="flex shrink-0 items-center self-center rounded-md p-1.5 transition hover:bg-black/10"
                onClick={() => setWoodOpen((open) => !open)}
              >
                <ChevronDown
                  className={`shrink-0 transition-transform duration-200 ${
                    woodOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
            {woodOpen ? (
              <ul
                id="masters-wood-submenu"
                role="list"
                aria-labelledby="masters-wood-trigger"
                className="mt-1.5 flex flex-col gap-0.5 rounded-lg border border-green/15 bg-white p-1.5 shadow-[var(--shadow-sm)]"
              >
                <li>
                  <Link
                    href={catalogHref("derev-zagotovki")}
                    className={navSubRowClass(
                      isWoodCategoryActive && !activeWoodDia,
                    )}
                  >
                    Все заготовки
                  </Link>
                </li>
                {MASTERS_WOOD_BLANK_DIAMETERS_CM.map((dia) => (
                  <li key={dia}>
                    <Link
                      href={catalogHref("derev-zagotovki", dia)}
                      className={navSubRowClass(activeWoodDia === dia)}
                    >
                      {formatDiameterCm(dia)}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={catalogHref(
                      "derev-zagotovki",
                      WOOD_BLANK_CUSTOM_DIA_PARAM,
                    )}
                    className={navSubRowClass(
                      activeWoodDia === WOOD_BLANK_CUSTOM_DIA_PARAM,
                    )}
                  >
                    Индивидуальный размер
                  </Link>
                </li>
              </ul>
            ) : null}
          </li>
          <li ref={formsMenuRef} className="relative">
            <div
              className={`${navRowClass(isFormsMenuActive)} flex items-stretch gap-0.5 pr-1.5`}
            >
              <Link
                href={catalogHref(MASTERS_FORMS_GROUP_CAT)}
                id="masters-forms-trigger"
                className="flex min-w-0 flex-1 items-center py-0 pl-0 text-left"
                onClick={() => setFormsOpen(true)}
              >
                <span className="truncate">{formsButtonLabel}</span>
              </Link>
              <button
                type="button"
                aria-expanded={formsOpen}
                aria-controls="masters-forms-submenu"
                aria-label={
                  formsOpen
                    ? "Скрыть типы форм"
                    : "Показать типы форм"
                }
                className="flex shrink-0 items-center self-center rounded-md p-1.5 transition hover:bg-black/10"
                onClick={() => setFormsOpen((open) => !open)}
              >
                <ChevronDown
                  className={`shrink-0 transition-transform duration-200 ${
                    formsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
            {formsOpen ? (
              <ul
                id="masters-forms-submenu"
                role="list"
                aria-labelledby="masters-forms-trigger"
                className="mt-1.5 flex flex-col gap-0.5 rounded-lg border border-green/15 bg-white p-1.5 shadow-[var(--shadow-sm)]"
              >
                <li>
                  <Link
                    href={catalogHref(MASTERS_FORMS_GROUP_CAT)}
                    className={navSubRowClass(activeFormsGroup)}
                  >
                    Все формы
                  </Link>
                </li>
                {MASTERS_FORM_CATEGORIES.map((id) => (
                  <li key={id}>
                    <Link
                      href={catalogHref(id)}
                      className={navSubRowClass(activeCat === id)}
                    >
                      {MASTERS_CATEGORY_LABELS[id]}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
          <li>
            <Link
              href={catalogHref("instrumenty")}
              className={navRowClass(activeCat === "instrumenty")}
            >
              Полезные инструменты
            </Link>
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
