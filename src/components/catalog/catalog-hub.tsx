import Link from "next/link";
import { Container } from "@/components/layout/container";
import { CATALOG_SHOP_PATH } from "@/lib/catalog-filters";
import { ALL_PRODUCTS } from "@/lib/products";
import {
  SEO_CATALOG_LANDINGS,
  type SeoCatalogLanding,
} from "@/lib/seo-catalog-landings";

const cardClass =
  "flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-green/15 bg-white shadow-[var(--shadow-sm)]";

function landingPreviewImage(landing: SeoCatalogLanding): string {
  if (landing.hubImage) return landing.hubImage;
  const slug = landing.productSlugs[0];
  const product = slug
    ? ALL_PRODUCTS.find((p) => p.slug === slug)
    : undefined;
  return product?.image ?? "/quick-lead-botanical-table.webp";
}

export function CatalogHub() {
  const landings = Object.values(SEO_CATALOG_LANDINGS);

  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {landings.map((landing) => (
        <Link
          key={landing.key}
          href={`/${landing.path}`}
          prefetch={false}
          className={cardClass}
        >
          <div className="overflow-hidden bg-sage-muted/40">
            <img
              src={landingPreviewImage(landing)}
              alt={landing.footerLabel}
              width={640}
              height={480}
              className="aspect-[4/3] w-full object-cover"
              loading="eager"
              decoding="sync"
            />
          </div>
          <div className="flex flex-1 flex-col border-t border-green/10 px-5 py-4">
            <span className="font-sans text-lg font-bold leading-snug text-green-deep">
              {landing.footerLabel}
            </span>
            <span className="mt-2 text-sm leading-relaxed text-fg/65 line-clamp-2">
              {landing.intro[0]}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function CatalogHubPageContent() {
  return (
    <section className="py-12 lg:py-16">
      <Container>
        <Link
          href="/"
          className="text-sm font-medium text-green/70 hover:text-green hover:underline"
        >
          ← На главную
        </Link>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-green/55">
          Каталог изделий
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold text-green">
          Изделия из эпоксидной смолы
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-fg/70 sm:text-base">
          Выберите раздел — в каждом собраны готовые работы, описание и цены.
          Нужен общий список всех позиций с фильтрами — откройте{" "}
          <Link
            href={CATALOG_SHOP_PATH}
            className="font-medium text-green underline-offset-4 hover:underline"
          >
            все товары в магазине
          </Link>
          .
        </p>

        <CatalogHub />

        <p className="mt-10 text-center">
          <Link
            href={CATALOG_SHOP_PATH}
            className="text-sm font-semibold text-green-deep underline-offset-4 hover:text-green hover:underline"
          >
            Все изделия в одном списке →
          </Link>
        </p>
      </Container>
    </section>
  );
}
