import type { Metadata } from "next";
import Link from "next/link";
import { LandingShell } from "@/components/layout/landing-shell";
import { Container } from "@/components/layout/container";
import { CatalogInteractive } from "@/components/catalog/catalog-interactive";
import { CATALOG_HUB_PATH } from "@/lib/catalog-filters";
import { ALL_PRODUCTS } from "@/lib/products";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Все изделия — магазин Salamaha Fine Art",
  description:
    "Полный каталог изделий из эпоксидной смолы: фильтры по категории и цене, сортировка. Столы, декор, посуда, часы и подарки.",
};

export default function CatalogShopPage() {
  return (
    <LandingShell>
      <section className="py-12 lg:py-16">
        <Container>
          <Link
            href={CATALOG_HUB_PATH}
            className="text-sm font-medium text-green/70 hover:text-green hover:underline"
          >
            ← Каталог изделий
          </Link>
          <h1 className="mt-6 font-serif text-4xl font-semibold text-green">
            Все изделия
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-fg/70 sm:text-base">
            Полный список работ с фильтрами по категории и цене. Тематические
            подборки — в{" "}
            <Link
              href={CATALOG_HUB_PATH}
              className="font-medium text-green underline-offset-4 hover:underline"
            >
              каталоге изделий
            </Link>
            .
          </p>

          <CatalogInteractive products={ALL_PRODUCTS} />
        </Container>
      </section>
    </LandingShell>
  );
}
