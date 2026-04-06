import type { Metadata } from "next";
import Link from "next/link";
import { LandingShell } from "@/components/layout/landing-shell";
import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/shop/product-card";
import { CATALOG_FAQ_ITEMS } from "@/lib/catalog-faq";
import { ALL_PRODUCTS } from "@/lib/products";
import { SEO_CATALOG_LANDINGS } from "@/lib/seo-catalog-landings";

export const metadata: Metadata = {
  title: "Сувениры из эпоксидной смолы на заказ — купить подарки и изделия",
  description:
    "Сувениры и подарки из эпоксидной смолы на заказ: изделия с фото, деревом и декором. Цены, каталог работ, индивидуальное изготовление.",
};

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

function CatalogFaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: CATALOG_FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function CatalogPage({ searchParams }: Props) {
  const { cat } = await searchParams;
  const label = cat ? catLabels[cat] : null;

  return (
    <LandingShell>
      <CatalogFaqJsonLd />
      <section className="py-12 lg:py-16">
        <Container>
          <Link
            href="/#categories"
            className="text-sm font-medium text-green/70 hover:text-green hover:underline"
          >
            ← На главную
          </Link>
          <h1 className="mt-6 font-serif text-4xl font-semibold text-green">
            Каталог: изделия, сувениры, украшения из эпоксидной смолы
          </h1>
          {label ? (
            <p className="mt-2 text-sm text-fg/60">
              Фильтр: <span className="font-medium text-green">{label}</span>{" "}
              <Link href="/catalog" className="underline underline-offset-2">
                сбросить
              </Link>
            </p>
          ) : null}
          <div className="mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-fg/70">
            <p>
              Сувениры из эпоксидной смолы — это оригинальные подарки, которые
              создаются вручную и сохраняют важные моменты на долгие годы. Вы
              можете заказать изделие с индивидуальным дизайном: с фотографией,
              цветами или деревом.
            </p>
            <p>
              В нашем каталоге представлены подарки из эпоксидной смолы: от
              декоративных изделий до функциональных предметов интерьера. Каждое
              изделие уникально и создаётся под заказ.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ALL_PRODUCTS.map((p) => (
              <ProductCard key={p.slug} product={p} titleLevel={2} />
            ))}
          </div>

          <section
            className="mt-16 border-t border-green/10 pt-14"
            aria-labelledby="catalog-themes-heading"
          >
            <h2
              id="catalog-themes-heading"
              className="font-serif text-2xl font-semibold text-green sm:text-3xl"
            >
              Тематические разделы
            </h2>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {Object.values(SEO_CATALOG_LANDINGS).map((l) => (
                <li key={l.path}>
                  <Link
                    href={`/${l.path}`}
                    className="text-sm font-medium text-green/85 underline-offset-4 hover:text-green hover:underline"
                  >
                    {l.h1}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section
            className="mt-16 border-t border-green/10 pt-14"
            aria-labelledby="catalog-faq-heading"
          >
            <h2
              id="catalog-faq-heading"
              className="font-serif text-3xl font-semibold text-green sm:text-4xl"
            >
              Часто задаваемые вопросы
            </h2>
            <div className="mt-8 flex flex-col gap-3">
              {CATALOG_FAQ_ITEMS.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-[var(--radius-lg)] border border-green/10 bg-cream/35 px-5 py-1 shadow-[var(--shadow-sm)] open:bg-cream/50 open:shadow-[var(--shadow)]"
                >
                  <summary className="cursor-pointer list-none py-4 font-serif text-base font-semibold leading-snug text-green outline-none marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="flex items-start justify-between gap-3">
                      <span>{item.question}</span>
                      <span
                        className="mt-0.5 shrink-0 text-gold transition group-open:rotate-180"
                        aria-hidden
                      >
                        ▼
                      </span>
                    </span>
                  </summary>
                  <div className="border-t border-green/10 pb-4 pt-3 text-sm leading-relaxed text-fg/75">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        </Container>
      </section>
    </LandingShell>
  );
}
