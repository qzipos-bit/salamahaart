"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";
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
  mastersCatalogHref,
  type MastersCatalogCatParam,
} from "@/lib/masters-catalog-filters";
import { appendCatalogReturn } from "@/lib/catalog-return-url";
import { rememberCatalogScrollBeforeProduct } from "@/lib/catalog-scroll-leave";
import { useCatalogPageUrl } from "@/hooks/use-catalog-page-url";
import {
  FILTER_NAV_ROW_IDLE_CLASS,
  FILTER_NAV_SUB_ACTIVE_CLASS,
  FILTER_NAV_SUB_IDLE_CLASS,
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
  activeCat: MasterProductCategory | "";
  activeFormsGroup: boolean;
  activeSort: CatalogPriceSort | "";
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
  onNavigate,
  children,
}: {
  href: string;
  active: boolean;
  iconId: MastersCatalogIconId;
  sub?: boolean;
  onNavigate?: () => void;
  children: ReactNode;
}) {
  const rowClass = sub ? navSubRowClass(active) : navRowClass(active);
  const iconClass = active
    ? "h-5 w-5 shrink-0 text-cream"
    : "h-5 w-5 shrink-0 text-green";

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`${rowClass} flex items-center gap-2.5`}
    >
      <MastersCatalogCategoryIcon id={iconId} className={iconClass} />
      <span className="min-w-0 leading-snug">{children}</span>
    </Link>
  );
}

export function MastersCatalogFiltersSidebar({
  activeCat,
  activeFormsGroup,
  activeSort,
}: Props) {
  const pathname = usePathname();

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

  const catalogReturnTo = useCatalogPageUrl(
    MASTERS_CATALOG_PATH,
    MASTERS_CATALOG_PATH,
  );

  const catalogHref = useCallback(
    (cat?: MastersCatalogCatParam) =>
      mastersCatalogHref({
        cat,
        sort: activeSort || undefined,
      }),
    [activeSort],
  );

  const rememberCatalogScroll = () => {
    rememberCatalogScrollBeforeProduct("masters", catalogReturnTo);
  };

  const hasFilters = Boolean(activeCat || activeFormsGroup || activeSort);

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
                    onNavigate={rememberCatalogScroll}
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
    </div>
  );
}
