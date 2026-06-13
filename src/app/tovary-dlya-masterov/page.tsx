import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { LandingShell } from "@/components/layout/landing-shell";
import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/shop/product-card";
import { CatalogSortSelect } from "@/components/catalog/catalog-sort-select";
import { MastersCatalogFiltersSidebar } from "@/components/catalog/masters-catalog-filters-sidebar";
import { PuzzleFormConstructor } from "@/components/catalog/puzzle-form-constructor";
import {
  MASTERS_CATEGORY_LABELS,
  MASTERS_FORMS_GROUP_CAT,
  filterMastersProducts,
  formatRubShort,
  formatWoodDiaFilterLabel,
  getMastersPriceExtent,
  parseMastersCatalogCat,
  parseMastersPriceParams,
  parseWoodDiaParam,
} from "@/lib/masters-catalog-filters";
import type { MasterProductCategory } from "@/lib/masters-products";
import {
  MASTERS_CATALOG_PATH,
  MASTERS_PRODUCTS,
} from "@/lib/masters-products";
import {
  formatCatalogSortLabel,
  parseCatalogSortParam,
  sortProductsByPriceFromRub,
} from "@/lib/catalog-sort";
import { PRICE_FILTER_SUMMARY_CLASS } from "@/lib/product-typography";

export const metadata: Metadata = {
  title: "Товары для мастеров — силикагель, формы, заготовки",
  description:
    "Материалы для мастеров: силикагель 3–25 кг, деревянные заготовки, силиконовые формы для смолы, шаблон плашки основы. Отдельный каталог Salamaha Fine Art.",
};

type Props = {
  searchParams: Promise<{
    cat?: string | string[];
    dia?: string | string[];
    priceMin?: string;
    priceMax?: string;
    sort?: string | string[];
  }>;
};

function resolveCatParam(
  raw: string | string[] | undefined,
): MasterProductCategory | "" {
  const parsed = parseMastersCatalogCat(raw);
  if (!parsed || parsed === MASTERS_FORMS_GROUP_CAT) return "";
  return parsed;
}

export default async function MastersCatalogPage({ searchParams }: Props) {
  const { cat: catRaw, dia: diaRaw, priceMin: priceMinRaw, priceMax: priceMaxRaw, sort: sortRaw } =
    await searchParams;
  const extent = getMastersPriceExtent(MASTERS_PRODUCTS);
  const sort = parseCatalogSortParam(sortRaw);
  const catalogCat = parseMastersCatalogCat(catRaw);
  const isFormsGroup = catalogCat === MASTERS_FORMS_GROUP_CAT;
  const cat = resolveCatParam(catRaw);
  const filterCat = catalogCat || undefined;
  const woodDia = parseWoodDiaParam(diaRaw);
  const priceRange = parseMastersPriceParams(
    priceMinRaw,
    priceMaxRaw,
    extent,
  );

  const filtered = sortProductsByPriceFromRub(
    filterMastersProducts(
      MASTERS_PRODUCTS,
      filterCat,
      priceRange,
      woodDia,
    ),
    sort,
  );

  const total = MASTERS_PRODUCTS.length;
  const hasFilters = Boolean(catalogCat || woodDia || priceRange.active || sort);

  return (
    <LandingShell>
      <section className="py-12 lg:py-16">
        <Container>
          <Link
            href="/"
            className="text-sm font-medium text-green/70 hover:text-green hover:underline"
          >
            ← На главную
          </Link>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-green/55">
            Для мастеров
          </p>
          <h1 className="mt-2 font-serif text-4xl font-semibold text-green">
            Товары для мастеров
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-fg/70">
            Силикагель, деревянные заготовки, формы для смолы и полезные
            инструменты — отдельный каталог для мастеров. Изделия и сувениры
            смотрите в{" "}
            <Link href="/catalog" className="font-medium text-green underline-offset-4 hover:underline">
              основном магазине
            </Link>
            .
          </p>

          {hasFilters ? (
            <p className="mt-3 text-sm text-fg/70">
              <span className="text-fg/55">Показано:</span>{" "}
              <span className="font-medium text-green">
                {filtered.length} из {total}
              </span>
              {catalogCat ? (
                <>
                  {" "}
                  ·{" "}
                  <span className="text-fg/55">категория:</span>{" "}
                  {isFormsGroup
                    ? "Формы для смолы"
                    : MASTERS_CATEGORY_LABELS[catalogCat as MasterProductCategory]}
                  {woodDia ? ` · ${formatWoodDiaFilterLabel(woodDia)}` : ""}
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
            <aside
              className="mb-8 w-full shrink-0 lg:sticky lg:top-24 lg:z-20 lg:mb-0 lg:w-[280px] lg:max-w-[320px] lg:self-start"
            >
              <div className="lg:max-h-[calc(100dvh-6.5rem)] lg:overflow-y-auto lg:overscroll-contain lg:pr-1">
                <MastersCatalogFiltersSidebar
                  extent={extent}
                  activeCat={cat}
                  activeFormsGroup={isFormsGroup}
                  activeWoodDia={woodDia ?? ""}
                  activeSort={sort}
                  initialMin={priceRange.min}
                  initialMax={priceRange.max}
                />
              </div>
            </aside>

            <div className="min-w-0 flex-1">
              {cat === "formy-pazl" ? <PuzzleFormConstructor /> : null}

              {filtered.length === 0 ? (
                <p className="mt-10 rounded-[var(--radius-lg)] border border-green/12 bg-sage-muted/30 px-6 py-10 text-center text-sm text-fg/70">
                  По таким условиям ничего не нашлось.{" "}
                  <Link
                    href={MASTERS_CATALOG_PATH}
                    className="font-medium text-green underline-offset-4 hover:underline"
                  >
                    Сбросить фильтры
                  </Link>
                </p>
              ) : (
                <>
                  <Suspense fallback={null}>
                    <div className="mt-4">
                      <CatalogSortSelect basePath={MASTERS_CATALOG_PATH} />
                    </div>
                  </Suspense>
                  <div className="mt-4 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {filtered.map((p) => (
                      <ProductCard
                        key={p.slug}
                        product={p}
                        titleLevel={2}
                        hrefPrefix={MASTERS_CATALOG_PATH}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </Container>
      </section>
    </LandingShell>
  );
}
