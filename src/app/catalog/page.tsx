import Link from "next/link";
import { LandingShell } from "@/components/layout/landing-shell";
import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/shop/product-card";
import { ALL_PRODUCTS } from "@/lib/products";

type Props = {
  searchParams: Promise<{ cat?: string }>;
};

const catLabels: Record<string, string> = {
  stoly: "Столы",
  chasy: "Часы",
  kartiny: "Картины",
  dekor: "Декор",
  posuda: "Посуда",
  bukety: "Букеты в смоле",
};

export default async function CatalogPage({ searchParams }: Props) {
  const { cat } = await searchParams;
  const label = cat ? catLabels[cat] : null;

  return (
    <LandingShell>
      <section className="py-12 lg:py-16">
        <Container>
          <Link
            href="/#categories"
            className="text-sm font-medium text-green/70 hover:text-green hover:underline"
          >
            ← На главную
          </Link>
          <h1 className="mt-6 font-serif text-4xl font-semibold text-green">
            Каталог
          </h1>
          {label ? (
            <p className="mt-2 text-sm text-fg/60">
              Фильтр: <span className="font-medium text-green">{label}</span>{" "}
              <Link href="/catalog" className="underline underline-offset-2">
                сбросить
              </Link>
            </p>
          ) : (
            <p className="mt-2 max-w-xl text-sm text-fg/65">
              Готовые позиции и база для индивидуального заказа. Точные цены
              уточняйте в сообщении — зависят от размера и вставок.
            </p>
          )}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ALL_PRODUCTS.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </Container>
      </section>
    </LandingShell>
  );
}
