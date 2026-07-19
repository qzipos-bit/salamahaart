import type { Metadata } from "next";
import Link from "next/link";
import { LandingShell } from "@/components/layout/landing-shell";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/shop/product-card";
import { Button } from "@/components/ui/button";
import {
  CATALOG_CATEGORY_PAGES,
  getCatalogCategoryPage,
  type StandaloneCatalogCategoryPageKey,
} from "@/lib/catalog-category-pages";
import { buildCatalogCategoryPageSchemas } from "@/lib/schema/collection-page";
import { ALL_PRODUCTS } from "@/lib/products";
import { SITE } from "@/lib/site";

export function catalogCategoryPageMetadata(
  key: StandaloneCatalogCategoryPageKey,
): Metadata {
  const page = getCatalogCategoryPage(key);
  const canonical = SITE.siteUrl ? `${SITE.siteUrl}/${page.path}` : undefined;
  return {
    title: page.title,
    description: page.description,
    ...(canonical ? { alternates: { canonical } } : {}),
  };
}

export function CatalogCategoryPageView({
  categoryKey,
}: {
  categoryKey: StandaloneCatalogCategoryPageKey;
}) {
  const page = getCatalogCategoryPage(categoryKey);
  const products = ALL_PRODUCTS.filter((p) => p.category === categoryKey);
  const siblings = Object.values(CATALOG_CATEGORY_PAGES).filter(
    (entry) => entry.path !== page.path,
  );
  const [introA, introB] = page.intro!;

  const introBlock = (
    <div className="space-y-4 text-sm leading-relaxed text-fg/70 sm:text-base">
      <p>{introA}</p>
      <p>{introB}</p>
    </div>
  );

  return (
    <LandingShell>
      <JsonLd
        data={buildCatalogCategoryPageSchemas(categoryKey, products)}
      />
      <section className="py-12 lg:py-16">
        <Container>
          <nav className="text-sm text-fg/60" aria-label="Хлебные крошки">
            <Link
              href="/"
              className="text-green/80 hover:text-green hover:underline"
            >
              Главная
            </Link>
            <span className="mx-2 text-fg/40">/</span>
            <Link
              href="/catalog"
              className="text-green/80 hover:text-green hover:underline"
            >
              Каталог
            </Link>
            <span className="mx-2 text-fg/40">/</span>
            <span className="text-fg/70">{page.h1}</span>
          </nav>

          <h1 className="mt-8 font-serif text-3xl font-semibold leading-tight text-green sm:text-4xl lg:text-[2.35rem]">
            {page.h1}
          </h1>

          <div className="mt-8 max-w-3xl rounded-[var(--radius-lg)] border border-green/12 bg-gradient-to-br from-sage-muted/50 via-cream/80 to-bg px-6 py-7 shadow-[var(--shadow-sm)] sm:px-8 sm:py-9">
            {introBlock}
          </div>

          <h2 className="mt-14 font-serif text-2xl font-semibold text-green sm:text-3xl">
            {page.collectionHeading}
          </h2>

          {products.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <ProductCard
                  key={p.slug}
                  product={p}
                  titleLevel={2}
                  returnTo={`/${page.path}`}
                />
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-[var(--radius-lg)] border border-green/10 bg-sage-muted/25 px-6 py-10 text-center">
              <p className="text-sm leading-relaxed text-fg/70">
                В витрине пока нет готовых позиций в этой рубрике — напишите в
                WhatsApp: подберём формат, пришлю референсы и ориентир по цене.
              </p>
              <Button
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6"
              >
                Написать в WhatsApp
              </Button>
            </div>
          )}

          <section className="mt-16 border-t border-green/10 pt-10">
            <h2 className="font-serif text-xl font-semibold text-green sm:text-2xl">
              Другие категории
            </h2>
            <ul className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
              {siblings.map((entry) => (
                <li key={entry.path}>
                  <Link
                    href={`/${entry.path}`}
                    className="text-sm font-medium text-green/80 underline-offset-4 hover:text-green hover:underline"
                  >
                    {entry.footerLabel}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6">
              <Link
                href="/catalog"
                className="text-sm font-medium text-green underline-offset-4 hover:underline"
              >
                ← Полный каталог
              </Link>
            </p>
          </section>
        </Container>
      </section>
    </LandingShell>
  );
}
