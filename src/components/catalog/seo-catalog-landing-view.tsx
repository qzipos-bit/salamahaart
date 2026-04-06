import type { Metadata } from "next";
import Link from "next/link";
import { LandingShell } from "@/components/layout/landing-shell";
import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/shop/product-card";
import { Button } from "@/components/ui/button";
import { ALL_PRODUCTS } from "@/lib/products";
import {
  getLandingByKey,
  SEO_CATALOG_LANDINGS,
  type SeoCatalogLanding,
  type SeoCatalogLandingKey,
} from "@/lib/seo-catalog-landings";
import { SITE } from "@/lib/site";

export function seoCatalogLandingMetadata(
  key: SeoCatalogLandingKey,
): Metadata {
  const L = getLandingByKey(key);
  const canonical = SITE.siteUrl ? `${SITE.siteUrl}/${L.path}` : undefined;
  return {
    title: L.title,
    description: L.description,
    ...(canonical ? { alternates: { canonical } } : {}),
  };
}

function faqAnswerPlainText(answer: string): string {
  return answer.replace(/\n• /g, ". ").replace(/\n+/g, " ").trim();
}

function CatalogLandingJsonLd({
  L,
  productUrls,
}: {
  L: SeoCatalogLanding;
  productUrls: string[];
}) {
  const base = SITE.siteUrl;
  if (!base) return null;

  const pageUrl = `${base}/${L.path}`;
  const graph: Record<string, unknown>[] = [];

  const breadcrumbItems: Record<string, unknown>[] = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Главная",
      item: `${base}/`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Каталог",
      item: `${base}/catalog`,
    },
  ];
  let pos = 3;
  for (const t of L.breadcrumbTrail ?? []) {
    const href = t.href?.startsWith("/") ? t.href : t.href ? `/${t.href}` : null;
    breadcrumbItems.push({
      "@type": "ListItem",
      position: pos,
      name: t.label,
      item: href ? `${base}${href}` : `${base}/catalog`,
    });
    pos += 1;
  }
  breadcrumbItems.push({
    "@type": "ListItem",
    position: pos,
    name: L.h1,
    item: pageUrl,
  });

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: breadcrumbItems,
  };

  const webPage: Record<string, unknown> = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: L.title,
    description: L.description,
    inLanguage: "ru-RU",
    isPartOf: {
      "@type": "WebSite",
      url: base,
      name: SITE.name,
    },
    breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
  };

  if (productUrls.length > 0) {
    webPage.mainEntity = {
      "@type": "ItemList",
      numberOfItems: productUrls.length,
      itemListElement: productUrls.map((url, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: url,
      })),
    };
  }

  graph.push(webPage);
  graph.push(breadcrumb);

  if (L.faq?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: L.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faqAnswerPlainText(item.answer),
        },
      })),
    });
  }

  const payload = { "@context": "https://schema.org", "@graph": graph };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}

function BreadcrumbsNav({ L }: { L: SeoCatalogLanding }) {
  return (
    <nav className="text-sm text-fg/60" aria-label="Хлебные крошки">
      <Link href="/" className="text-green/80 hover:text-green hover:underline">
        Главная
      </Link>
      <span className="mx-2 text-fg/40">/</span>
      <Link
        href="/catalog"
        className="text-green/80 hover:text-green hover:underline"
      >
        Каталог
      </Link>
      {L.breadcrumbTrail?.map((t) => (
        <span key={t.label}>
          <span className="mx-2 text-fg/40">/</span>
          {t.href ? (
            <Link
              href={t.href.startsWith("/") ? t.href : `/${t.href}`}
              className="text-green/80 hover:text-green hover:underline"
            >
              {t.label}
            </Link>
          ) : (
            <span className="text-fg/55">{t.label}</span>
          )}
        </span>
      ))}
      <span className="mx-2 text-fg/40">/</span>
      <span className="text-fg/70">{L.h1}</span>
    </nav>
  );
}

export function SeoCatalogLandingView({
  landingKey,
}: {
  landingKey: SeoCatalogLandingKey;
}) {
  const L = getLandingByKey(landingKey);
  const products = ALL_PRODUCTS.filter((p) => L.productSlugs.includes(p.slug));
  const base = SITE.siteUrl;
  const productUrls = base
    ? products.map((p) => `${base}/catalog/${p.slug}`)
    : [];

  const siblings = Object.values(SEO_CATALOG_LANDINGS).filter(
    (x) => x.key !== L.key,
  );

  const introBlock = (
    <div className="space-y-4 text-sm leading-relaxed text-fg/70 sm:text-base">
      <p>{L.intro[0]}</p>
      <p>{L.intro[1]}</p>
    </div>
  );

  return (
    <LandingShell>
      <CatalogLandingJsonLd L={L} productUrls={productUrls} />
      <section className="py-12 lg:py-16">
        <Container>
          <BreadcrumbsNav L={L} />

          <h1 className="mt-8 font-serif text-3xl font-semibold leading-tight text-green sm:text-4xl lg:text-[2.35rem]">
            {L.h1}
          </h1>

          {L.introVariant === "card" ? (
            <div className="mt-8 max-w-3xl rounded-[var(--radius-lg)] border border-green/12 bg-gradient-to-br from-sage-muted/50 via-cream/80 to-bg px-6 py-7 shadow-[var(--shadow-sm)] sm:px-8 sm:py-9">
              {introBlock}
            </div>
          ) : (
            <div className="mt-6 max-w-3xl">{introBlock}</div>
          )}

          {L.collectionHeading ? (
            <h2 className="mt-14 font-serif text-2xl font-semibold text-green sm:text-3xl">
              {L.collectionHeading}
            </h2>
          ) : null}

          {products.length > 0 ? (
            <div
              className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${L.collectionHeading ? "mt-8" : "mt-12"}`}
            >
              {products.map((p) => (
                <ProductCard key={p.slug} product={p} titleLevel={2} />
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

          {L.faq?.length ? (
            <section
              className="mt-16 border-t border-green/10 pt-14"
              aria-labelledby={`faq-${L.key}`}
            >
              <h2
                id={`faq-${L.key}`}
                className="font-serif text-3xl font-semibold text-green sm:text-4xl"
              >
                Часто задаваемые вопросы
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-fg/60">
                Краткие ответы на частые вопросы. Текст доступен поисковым
                системам в HTML и в структурированных данных на странице.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                {L.faq.map((item) => (
                  <details
                    key={item.question}
                    className="group rounded-[var(--radius-lg)] border border-green/10 bg-cream/35 px-5 py-1 shadow-[var(--shadow-sm)] open:bg-cream/55 open:shadow-[var(--shadow)]"
                  >
                    <summary className="cursor-pointer list-none py-4 outline-none marker:content-none [&::-webkit-details-marker]:hidden">
                      <span className="flex items-start justify-between gap-3">
                        <h3 className="m-0 max-w-[calc(100%-2rem)] font-serif text-lg font-semibold leading-snug text-green">
                          {item.question}
                        </h3>
                        <span
                          className="mt-0.5 shrink-0 text-gold transition group-open:rotate-180"
                          aria-hidden
                        >
                          ▼
                        </span>
                      </span>
                    </summary>
                    <div className="border-t border-green/10 pb-4 pt-3 text-sm leading-relaxed text-fg/75 whitespace-pre-line">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ) : null}

          <section className="mt-16 border-t border-green/10 pt-10">
            <h2 className="font-serif text-xl font-semibold text-green sm:text-2xl">
              Другие разделы каталога
            </h2>
            <ul className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
              {siblings.map((s) => (
                <li key={s.path}>
                  <Link
                    href={`/${s.path}`}
                    className="text-sm font-medium text-green/80 underline-offset-4 hover:text-green hover:underline"
                  >
                    {s.title.split(" — ")[0]}
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
