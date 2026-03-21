import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/shop/product-card";
import { FEATURED_PRODUCTS } from "@/lib/products";

export function FeaturedProducts() {
  return (
    <section id="featured" className="scroll-mt-24 py-[var(--section-y)] bg-sage-muted/35">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-green/55">
              Витрина
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-green sm:text-4xl">
              Избранные работы
            </h2>
          </div>
          <Link
            href="/catalog"
            className="text-sm font-medium text-green underline-offset-4 hover:underline"
          >
            Перейти в магазин →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_PRODUCTS.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </Container>
    </section>
  );
}
