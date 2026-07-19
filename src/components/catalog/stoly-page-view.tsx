import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LandingShell } from "@/components/layout/landing-shell";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/shop/product-card";
import { Button } from "@/components/ui/button";
import { buildCategoryMetadata } from "@/lib/category-metadata";
import { buildStolyPageSchemas } from "@/lib/schema/stoly-page";
import { ALL_PRODUCTS } from "@/lib/products";
import {
  STOLY_PILLAR_KEY,
  getStolyPage,
  stolyFacetPath,
  stolyMetadataInput,
  stolyPagePath,
  type StolyCta,
  type StolyFacetCard,
  type StolyHighlight,
  type StolyPageKey,
  type StolyPortfolioExample,
  type StolyProcessStep,
} from "@/lib/stoly-pages";
import { SITE } from "@/lib/site";

export function stolyPageMetadata(key: StolyPageKey): Metadata {
  return buildCategoryMetadata(stolyMetadataInput(getStolyPage(key)));
}

function FaqSection({
  pageKey,
  faq,
}: {
  pageKey: StolyPageKey;
  faq: { question: string; answer: string }[];
}) {
  if (!faq.length) return null;

  return (
    <section
      className="mt-16 border-t border-green/10 pt-14"
      aria-labelledby={`stoly-faq-${pageKey}`}
    >
      <h2
        id={`stoly-faq-${pageKey}`}
        className="font-serif text-3xl font-semibold text-green sm:text-4xl"
      >
        Часто задаваемые вопросы
      </h2>
      <div className="mt-8 flex flex-col gap-3">
        {faq.map((item) => (
          <details
            key={item.question}
            className="group rounded-[var(--radius-lg)] border border-green/10 bg-cream/35 px-5 py-1 shadow-[var(--shadow-sm)] open:bg-cream/55 open:shadow-[var(--shadow)]"
          >
            <summary className="cursor-pointer list-none py-4 outline-none marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-start justify-between gap-3">
                <h3 className="m-0 max-w-[calc(100%-2rem)] font-serif text-lg font-semibold leading-snug text-green-deep">
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
            <div className="border-t border-green/10 pb-4 pt-3 text-base leading-relaxed text-fg/85 whitespace-pre-line">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

function HighlightsGrid({ items }: { items: StolyHighlight[] }) {
  if (!items.length) return null;

  return (
    <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <li
          key={item.title}
          className="rounded-[var(--radius-lg)] border border-green/10 bg-white px-5 py-5 shadow-[var(--shadow-sm)]"
        >
          <p className="font-serif text-lg font-semibold text-green-deep">
            {item.title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-fg/70">{item.text}</p>
        </li>
      ))}
    </ul>
  );
}

function FacetCardsGrid({ cards }: { cards: StolyFacetCard[] }) {
  if (!cards.length) return null;

  return (
    <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <li key={card.slug}>
          <Link
            href={stolyFacetPath(card.slug)}
            className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-green/12 bg-white shadow-[var(--shadow-sm)] transition hover:border-green/25 hover:shadow-[var(--shadow)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-sage-muted/30">
              <Image
                src={card.image}
                alt={card.label}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-deep/50 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-4 font-serif text-lg font-semibold text-white drop-shadow">
                {card.label}
              </span>
            </div>
            <div className="flex flex-1 flex-col px-5 py-4">
              <p className="text-sm leading-relaxed text-fg/70">{card.teaser}</p>
              <span className="mt-3 text-sm font-medium text-green group-hover:underline">
                Смотреть подборку →
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ProcessSection({ steps }: { steps: StolyProcessStep[] }) {
  if (!steps.length) return null;

  return (
    <section className="mt-16" aria-labelledby="stoly-process">
      <h2
        id="stoly-process"
        className="font-serif text-2xl font-semibold text-green sm:text-3xl"
      >
        Как мы делаем стол
      </h2>
      <ol className="mt-8 grid gap-4 md:grid-cols-2">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="flex gap-4 rounded-[var(--radius-lg)] border border-green/10 bg-cream/30 px-5 py-5"
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green/10 font-serif text-lg font-semibold text-green"
              aria-hidden
            >
              {index + 1}
            </span>
            <div>
              <p className="font-serif text-lg font-semibold text-green-deep">
                {step.title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-fg/70">
                {step.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function PortfolioCard({ example }: { example: StolyPortfolioExample }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-green/12 bg-white shadow-[var(--shadow-sm)]">
      <div className="relative aspect-[4/3] bg-sage-muted/25">
        <Image
          src={example.image}
          alt={example.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {example.badge ? (
          <span className="absolute left-4 top-4 rounded-full bg-green-deep/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            {example.badge}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        {example.subtitle ? (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green/55">
            {example.subtitle}
          </p>
        ) : null}
        <h3 className="mt-1 font-serif text-xl font-semibold text-green-deep">
          {example.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-fg/70">
          {example.description}
        </p>
        {example.specs?.length ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {example.specs.map((spec) => (
              <li
                key={spec}
                className="rounded-full border border-green/12 bg-sage-muted/40 px-3 py-1 text-xs text-fg/75"
              >
                {spec}
              </li>
            ))}
          </ul>
        ) : null}
        <Button
          href={SITE.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 w-full !py-2.5 !text-sm"
        >
          Обсудить такой стол
        </Button>
      </div>
    </article>
  );
}

function CtaSection({ cta }: { cta: StolyCta }) {
  return (
    <section
      className="mt-16 overflow-hidden rounded-[var(--radius-lg)] border border-green/15 bg-gradient-to-br from-green-deep via-green to-green/90 px-6 py-10 text-white shadow-[var(--shadow)] sm:px-10 sm:py-12"
      aria-labelledby="stoly-cta"
    >
      <h2 id="stoly-cta" className="font-serif text-2xl font-semibold sm:text-3xl">
        {cta.heading}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
        {cta.text}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button
          href={SITE.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="!border-white/20 !bg-white !text-green-deep hover:!bg-cream"
        >
          {cta.primaryLabel}
        </Button>
        {cta.secondaryHref && cta.secondaryLabel ? (
          <Button
            href={cta.secondaryHref}
            variant="secondary"
            className="!border-white/40 !bg-transparent !text-white hover:!bg-white/10"
          >
            {cta.secondaryLabel}
          </Button>
        ) : null}
      </div>
    </section>
  );
}

export function StolyPageView({ pageKey }: { pageKey: StolyPageKey }) {
  const page = getStolyPage(pageKey);
  const isPillar = pageKey === STOLY_PILLAR_KEY;
  const returnPath = stolyPagePath(pageKey);
  const products = ALL_PRODUCTS.filter((p) =>
    page.productSlugs.includes(p.slug),
  );
  const relatedFacets = Object.values(
    getStolyPage(STOLY_PILLAR_KEY).facetCards ?? [],
  ).filter((card) => card.slug !== pageKey);

  return (
    <LandingShell>
      <JsonLd data={buildStolyPageSchemas(pageKey, products)} />
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
            {!isPillar ? (
              <>
                <span className="mx-2 text-fg/40">/</span>
                <Link
                  href={stolyPagePath(STOLY_PILLAR_KEY)}
                  className="text-green/80 hover:text-green hover:underline"
                >
                  Столы из смолы
                </Link>
              </>
            ) : null}
            <span className="mx-2 text-fg/40">/</span>
            <span className="text-fg/70">{page.h1}</span>
          </nav>

          <header className="mt-8 max-w-3xl">
            <h1 className="font-serif text-3xl font-semibold leading-tight text-green sm:text-4xl lg:text-[2.35rem]">
              {page.h1}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-fg/75 sm:text-lg">
              {page.heroSubtitle}
            </p>
          </header>

          <div className="mt-10 max-w-3xl space-y-4 rounded-[var(--radius-lg)] border border-green/12 bg-gradient-to-br from-sage-muted/50 via-cream/80 to-bg px-6 py-7 shadow-[var(--shadow-sm)] sm:px-8 sm:py-9">
            {page.introSections.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="text-sm leading-relaxed text-fg/75 sm:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <HighlightsGrid items={page.highlights} />

          {isPillar && page.facetCards?.length ? (
            <section className="mt-16" aria-labelledby="stoly-facets">
              <h2
                id="stoly-facets"
                className="font-serif text-2xl font-semibold text-green sm:text-3xl"
              >
                Подборки по типу
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-fg/65">
                Узкие страницы под ваш запрос — журнальный, из слэба, с
                подсветкой и другие форматы.
              </p>
              <FacetCardsGrid cards={page.facetCards} />
            </section>
          ) : null}

          <ProcessSection steps={page.processSteps ?? []} />

          {(products.length > 0 || page.portfolioExamples.length > 0) && (
            <section className="mt-16" aria-labelledby="stoly-showcase">
              <h2
                id="stoly-showcase"
                className="font-serif text-2xl font-semibold text-green sm:text-3xl"
              >
                {page.collectionHeading}
              </h2>
              {page.showcaseNote ? (
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-fg/70 sm:text-base">
                  {page.showcaseNote}
                </p>
              ) : null}

              {products.length > 0 ? (
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {products.map((p) => (
                    <ProductCard
                      key={p.slug}
                      product={p}
                      titleLevel={3}
                      returnTo={returnPath}
                    />
                  ))}
                </div>
              ) : null}

              {page.portfolioExamples.length > 0 ? (
                <div
                  className={`grid gap-6 sm:grid-cols-2 ${products.length > 0 ? "mt-8" : "mt-8"} ${page.portfolioExamples.length === 1 ? "lg:max-w-xl" : "lg:grid-cols-2"}`}
                >
                  {page.portfolioExamples.map((example) => (
                    <PortfolioCard key={example.title} example={example} />
                  ))}
                </div>
              ) : null}
            </section>
          )}

          {products.length === 0 && page.portfolioExamples.length === 0 ? (
            <div className="mt-16 rounded-[var(--radius-lg)] border border-green/10 bg-sage-muted/25 px-6 py-10 text-center">
              <p className="text-sm leading-relaxed text-fg/70">
                В витрине пока нет готовых позиций в этой подборке — напишите в
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
          ) : null}

          <FaqSection pageKey={pageKey} faq={page.faq} />

          <CtaSection cta={page.cta} />

          {page.internalLinks.length > 0 ? (
            <section className="mt-12 border-t border-green/10 pt-10">
              <h2 className="font-serif text-xl font-semibold text-green sm:text-2xl">
                {isPillar ? "Полезные ссылки" : "Смотрите также"}
              </h2>
              <ul className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
                {page.internalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-green/80 underline-offset-4 hover:text-green hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {!isPillar && relatedFacets.length > 0 ? (
            <section className="mt-10">
              <h2 className="font-serif text-lg font-semibold text-green">
                Другие подборки
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {relatedFacets.slice(0, 4).map((card) => (
                  <li key={card.slug}>
                    <Link
                      href={stolyFacetPath(card.slug)}
                      className="block rounded-[var(--radius-lg)] border border-green/10 bg-white px-4 py-3 text-sm font-medium text-green-deep transition hover:border-green/25 hover:text-green"
                    >
                      {card.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <p className="mt-10">
            <Link
              href="/catalog"
              className="text-sm font-medium text-green underline-offset-4 hover:underline"
            >
              ← Полный каталог
            </Link>
          </p>
        </Container>
      </section>
    </LandingShell>
  );
}
