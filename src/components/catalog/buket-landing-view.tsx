import Image from "next/image";
import Link from "next/link";
import { LandingShell } from "@/components/layout/landing-shell";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/button";
import { BUKET_LANDING, buketWhatsappUrl } from "@/lib/buket-landing";
import { buildBuketLandingSchemas } from "@/lib/schema/buket-landing";
import { SITE } from "@/lib/site";

const INTERNAL_LINK_IMAGES: Record<string, string> = {
  "/catalog/stoly/s-cvetami": "/category-stoly.webp",
  "/catalog/podnos-suhocvety-laguna": "/product-podnos-suhocvety-vesna.webp",
  "/catalog/chasy-suhocvety-laguna": "/product-chasy-programmist.webp",
  "/catalog/podnos-live-edge-moss": "/product-podstavki-kamennaya-faktura.webp",
};

const OCCASION_ACCENTS = [
  {
    label: "Свадьба",
    className: "from-rose-100/70 via-cream to-white border-rose-200/40",
  },
  {
    label: "Годовщина",
    className: "from-amber-50/80 via-cream to-white border-amber-200/35",
  },
  {
    label: "Память",
    className: "from-sage-muted/90 via-cream to-white border-green/15",
  },
  {
    label: "Важный день",
    className: "from-sky-50/60 via-cream to-white border-sky-200/30",
  },
] as const;

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-green/55">
      {children}
    </p>
  );
}

function FormCard({
  name,
  note,
  link,
  image,
}: {
  name: string;
  note: string;
  link: string | null;
  image: string;
}) {
  const badge = link ? "Пример в каталоге" : "На заказ";

  const inner = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden bg-sage-muted/30">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-deep/65 via-green-deep/10 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-green-deep backdrop-blur-sm">
          {badge}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="font-serif text-xl font-semibold text-white drop-shadow-sm">
            {name}
          </h3>
          {note ? (
            <p className="mt-1 text-sm leading-snug text-white/85">{note}</p>
          ) : null}
        </div>
      </div>
      {link ? (
        <div className="border-t border-green/8 bg-white px-4 py-3">
          <span className="text-sm font-medium text-green group-hover:underline">
            Смотреть пример →
          </span>
        </div>
      ) : null}
    </>
  );

  const cardClass =
    "group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-green/12 bg-white shadow-[var(--shadow-sm)] transition hover:border-green/25 hover:shadow-[var(--shadow)]";

  if (link) {
    return (
      <Link href={link} className={cardClass}>
        {inner}
      </Link>
    );
  }

  return <div className={cardClass}>{inner}</div>;
}

function ProcessTimeline({
  steps,
}: {
  steps: { n: number; title: string; text: string }[];
}) {
  return (
    <ol className="relative mt-10 grid gap-6 lg:grid-cols-5 lg:gap-4">
      <div
        className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-green/25 via-green/15 to-transparent lg:hidden"
        aria-hidden
      />
      <div
        className="absolute left-[10%] right-[10%] top-5 hidden h-px bg-green/15 lg:block"
        aria-hidden
      />

      {steps.map((step) => {
        const isKeyStep = step.n <= 2;

        return (
          <li
            key={step.n}
            className={`relative flex gap-4 lg:flex-col lg:gap-0 lg:text-center ${
              isKeyStep ? "lg:-mt-1" : ""
            }`}
          >
            <span
              className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-serif text-base font-semibold lg:mx-auto ${
                isKeyStep
                  ? "bg-green text-cream shadow-[var(--shadow-sm)] ring-4 ring-green/10"
                  : "bg-green/10 text-green"
              }`}
            >
              {step.n}
            </span>
            <div
              className={`flex-1 rounded-[var(--radius-lg)] border px-4 py-4 lg:mt-4 lg:px-3 lg:py-5 ${
                isKeyStep
                  ? "border-green/20 bg-gradient-to-br from-sage-muted/50 to-white shadow-[var(--shadow-sm)]"
                  : "border-green/10 bg-white"
              }`}
            >
              <h3 className="font-serif text-lg font-semibold text-green-deep">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg/70">
                {step.text}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function BuketLandingView() {
  const page = BUKET_LANDING;
  const heroWhatsapp = buketWhatsappUrl(page.hero.whatsappPrefill);
  const finalWhatsapp = buketWhatsappUrl(page.ctaFinal.whatsappPrefill);
  const [featuredGallery, ...galleryRest] = page.gallery;

  return (
    <LandingShell>
      <JsonLd data={buildBuketLandingSchemas()} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-green/10">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sage-muted/70 via-cream to-bg"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-sage/25 blur-3xl"
          aria-hidden
        />
        <Container className="relative py-12 lg:py-20">
          <nav className="text-sm text-fg/60" aria-label="Хлебные крошки">
            <Link
              href="/"
              className="text-green/80 hover:text-green hover:underline"
            >
              Главная
            </Link>
            <span className="mx-2 text-fg/40">/</span>
            <span className="text-fg/70">{page.h1}</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:mt-12 lg:grid-cols-12 lg:items-center lg:gap-14">
            <div className="order-2 lg:order-1 lg:col-span-5">
              <SectionEyebrow>
                Авторская работа · Краснодар · доставка по РФ
              </SectionEyebrow>
              <h1 className="mt-4 font-serif text-3xl font-semibold leading-[1.15] text-green sm:text-4xl lg:text-[2.65rem]">
                {page.h1}
              </h1>
              <p className="mt-5 text-base leading-relaxed text-fg/75 sm:text-lg">
                {page.hero.subtitle}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  href={heroWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {page.hero.ctaPrimary}
                </Button>
                <Button href={page.hero.ctaSecondaryHref} variant="secondary">
                  {page.hero.ctaSecondary}
                </Button>
              </div>
              <p className="mt-6 flex items-start gap-2 text-sm leading-relaxed text-fg/60">
                <span className="mt-0.5 text-gold" aria-hidden>
                  ◆
                </span>
                Свежие цветы лучше передать в течение 1–2 дней после события
              </p>
            </div>

            <div className="order-1 lg:order-2 lg:col-span-7">
              <div className="relative">
                <div
                  className="absolute -inset-3 rounded-[calc(var(--radius-lg)+8px)] bg-gradient-to-br from-green/8 via-sage/20 to-transparent"
                  aria-hidden
                />
                <div className="relative aspect-[5/4] overflow-hidden rounded-[var(--radius-lg)] border border-green/12 shadow-[var(--shadow)] sm:aspect-[4/3]">
                  <Image
                    src={page.hero.image}
                    alt={page.hero.imageAlt}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-deep/35 via-transparent to-transparent" />
                  <p className="absolute bottom-4 left-4 right-4 max-w-sm rounded-[var(--radius)] bg-white/90 px-4 py-3 text-sm leading-snug text-green-deep backdrop-blur-sm">
                    Живые цветы, бережно высушенные и залитые в прозрачную
                    смолу — навсегда
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Intro */}
      <section className="py-12 lg:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="lg:col-span-4">
              <SectionEyebrow>Зачем</SectionEyebrow>
              <h2 className="mt-3 font-serif text-2xl font-semibold text-green sm:text-3xl">
                Сохранить момент, а не букет
              </h2>
            </div>
            <div className="relative lg:col-span-8">
              <span
                className="pointer-events-none absolute -left-2 -top-6 font-serif text-7xl leading-none text-green/10 sm:-left-4 sm:text-8xl"
                aria-hidden
              >
                «
              </span>
              <blockquote className="relative rounded-[var(--radius-lg)] border border-green/12 bg-gradient-to-br from-sage-muted/40 via-cream/80 to-bg px-6 py-8 shadow-[var(--shadow-sm)] sm:px-10 sm:py-10">
                <p className="text-base leading-relaxed text-fg/80 sm:text-lg">
                  {page.intro}
                </p>
              </blockquote>
            </div>
          </div>
        </Container>
      </section>

      {/* Forms */}
      <section className="border-t border-green/10 bg-sage-muted/25 py-12 lg:py-16">
        <Container>
          <SectionEyebrow>Форматы</SectionEyebrow>
          <h2 className="mt-3 font-serif text-2xl font-semibold text-green sm:text-3xl">
            В каком виде сохраняем
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fg/65 sm:text-base">
            Поднос, панно, часы, блок или столешница — выберите формат под ваш
            интерьер и повод.
          </p>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {page.forms.slice(0, 3).map((form) => (
              <li key={form.name}>
                <FormCard {...form} />
              </li>
            ))}
          </ul>
          <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:mx-auto lg:max-w-4xl">
            {page.forms.slice(3).map((form) => (
              <li key={form.name}>
                <FormCard {...form} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Process */}
      <section
        id="kak-rabotaet"
        className="scroll-mt-28 py-12 lg:py-16"
        aria-labelledby="buket-process-heading"
      >
        <Container>
          <SectionEyebrow>Процесс</SectionEyebrow>
          <h2
            id="buket-process-heading"
            className="mt-3 font-serif text-2xl font-semibold text-green sm:text-3xl"
          >
            Как это работает
          </h2>
          <p className="mt-2 max-w-xl text-sm text-fg/65">
            От заявки до доставки — с согласованием на каждом важном этапе.
          </p>
          <ProcessTimeline steps={page.steps} />
        </Container>
      </section>

      {/* Occasions */}
      <section className="border-t border-green/10 bg-cream/40 py-12 lg:py-16">
        <Container>
          <SectionEyebrow>Поводы</SectionEyebrow>
          <h2 className="mt-3 font-serif text-2xl font-semibold text-green sm:text-3xl">
            Для каких историй
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {page.occasions.map((occasion, index) => {
              const accent = OCCASION_ACCENTS[index] ?? OCCASION_ACCENTS[3];

              return (
                <li
                  key={occasion}
                  className={`flex flex-col justify-between rounded-[var(--radius-lg)] border bg-gradient-to-br px-6 py-5 shadow-[var(--shadow-sm)] ${accent.className}`}
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-green/50">
                    {accent.label}
                  </span>
                  <p className="mt-3 font-serif text-lg font-semibold leading-snug text-green-deep sm:text-xl">
                    {occasion}
                  </p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Price */}
      <section className="py-12 lg:py-16">
        <Container>
          <div className="overflow-hidden rounded-[var(--radius-lg)] border border-green/12 bg-white shadow-[var(--shadow-sm)]">
            <div className="border-b border-green/10 bg-sage-muted/30 px-6 py-8 sm:px-10">
              <SectionEyebrow>Сроки и стоимость</SectionEyebrow>
              <h2 className="mt-3 font-serif text-2xl font-semibold text-green sm:text-3xl">
                Индивидуальная смета после обсуждения
              </h2>
            </div>
            <div className="grid gap-px bg-green/10 sm:grid-cols-2">
              <div className="bg-white px-6 py-7 sm:px-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green/55">
                  Стоимость
                </p>
                <p className="mt-2 font-serif text-3xl font-semibold text-green">
                  По смете
                </p>
                <p className="mt-2 text-sm leading-relaxed text-fg/65">
                  Зависит от формы, размера и сложности композиции
                </p>
              </div>
              <div className="bg-white px-6 py-7 sm:px-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green/55">
                  Срок
                </p>
                <p className="mt-2 font-serif text-3xl font-semibold text-green">
                  Несколько недель
                </p>
                <p className="mt-2 text-sm leading-relaxed text-fg/65">
                  Сушка цветов — самый долгий этап
                </p>
              </div>
            </div>
            <div className="border-t border-green/10 bg-gradient-to-r from-amber-50/50 via-cream to-sage-muted/30 px-6 py-5 sm:px-10">
              <p className="flex flex-col gap-2 text-sm leading-relaxed text-fg/75 sm:flex-row sm:items-center sm:gap-3">
                <span className="inline-flex shrink-0 items-center rounded-full bg-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green">
                  Важно
                </span>
                {page.priceNote}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Gallery */}
      <section className="border-t border-green/10 py-12 lg:py-16">
        <Container>
          <SectionEyebrow>Портфолио</SectionEyebrow>
          <h2 className="mt-3 font-serif text-2xl font-semibold text-green sm:text-3xl">
            Примеры работ
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-fg/65">
            Каждый заказ с вашими цветами уникален — ниже ориентиры по форматам
            и настроению.
          </p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
            <li className="sm:col-span-2 lg:row-span-2">
              <article className="group h-full overflow-hidden rounded-[var(--radius-lg)] border border-green/12 bg-white shadow-[var(--shadow-sm)] transition hover:shadow-[var(--shadow)]">
                <div className="relative aspect-[4/3] bg-sage-muted/25 lg:aspect-auto lg:h-[calc(100%-4.5rem)] lg:min-h-[280px]">
                  <Image
                    src={featuredGallery.image}
                    alt={featuredGallery.caption}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-green-deep/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                    Избранное
                  </span>
                </div>
                <p className="px-5 py-4 font-serif text-lg leading-snug text-green-deep">
                  {featuredGallery.caption}
                </p>
              </article>
            </li>
            {galleryRest.map((item) => (
              <li key={item.caption}>
                <article className="group h-full overflow-hidden rounded-[var(--radius-lg)] border border-green/10 bg-white shadow-[var(--shadow-sm)] transition hover:border-green/20 hover:shadow-[var(--shadow-sm)]">
                  <div className="relative aspect-[4/3] bg-sage-muted/25">
                    <Image
                      src={item.image}
                      alt={item.caption}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  </div>
                  <p className="px-4 py-3 text-sm leading-snug text-fg/70">
                    {item.caption}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* FAQ */}
      <section
        className="border-t border-green/10 bg-cream/25 py-12 lg:py-16"
        aria-labelledby="buket-faq"
      >
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionEyebrow>Вопросы</SectionEyebrow>
            <h2
              id="buket-faq"
              className="mt-3 font-serif text-3xl font-semibold text-green sm:text-4xl"
            >
              Часто задаваемые вопросы
            </h2>
            <div className="mt-8 flex flex-col gap-3">
              {page.faq.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-[var(--radius-lg)] border border-green/10 bg-white px-5 py-1 shadow-[var(--shadow-sm)] open:shadow-[var(--shadow)]"
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
                  <div className="border-t border-green/10 pb-4 pt-3 text-base leading-relaxed text-fg/85">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden border-t border-green/10">
        <div
          className="absolute inset-0 bg-gradient-to-br from-green-deep via-green to-green/90"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-white/5 blur-3xl"
          aria-hidden
        />
        <Container className="relative py-12 lg:py-16">
          <div className="mx-auto max-w-2xl text-center text-white">
            <p className="font-script text-3xl text-white/90 sm:text-4xl">
              Salamaha
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">
              {page.ctaFinal.heading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/85 sm:text-base">
              {page.ctaFinal.text}
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/60">
              Ответим в WhatsApp · {SITE.phoneDisplay}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                href={finalWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="!border-white/20 !bg-white !text-green-deep hover:!bg-cream"
              >
                {page.ctaFinal.primaryLabel}
              </Button>
              <Button
                href={`tel:${SITE.phoneTel}`}
                variant="secondary"
                className="!border-white/40 !bg-transparent !text-white hover:!bg-white/10"
              >
                {SITE.phoneDisplay}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Internal links */}
      <section className="py-12 lg:py-14">
        <Container>
          <SectionEyebrow>Каталог</SectionEyebrow>
          <h2 className="mt-3 font-serif text-xl font-semibold text-green sm:text-2xl">
            Смотрите также
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {page.internalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex items-center gap-3 rounded-[var(--radius-lg)] border border-green/10 bg-white p-3 shadow-[var(--shadow-sm)] transition hover:border-green/25 hover:shadow-[var(--shadow-sm)]"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[14px] bg-sage-muted/40">
                    <Image
                      src={INTERNAL_LINK_IMAGES[link.href] ?? "/category-dekor.webp"}
                      alt=""
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="56px"
                    />
                  </div>
                  <span className="text-sm font-medium leading-snug text-green-deep group-hover:text-green">
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8">
            <Link
              href="/catalog"
              className="text-sm font-medium text-green underline-offset-4 hover:underline"
            >
              ← Каталог изделий
            </Link>
          </p>
        </Container>
      </section>
    </LandingShell>
  );
}
