import Image from "next/image";
import Link from "next/link";
import { LandingShell } from "@/components/layout/landing-shell";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/button";
import { NARDY_LANDING, nardyWhatsappUrl } from "@/lib/nardy-landing";
import { buildNardyLandingSchemas } from "@/lib/schema/nardy-landing";
import { SITE } from "@/lib/site";

const INTERNAL_LINK_IMAGES: Record<string, string> = {
  "/catalog/igry-iz-smoly": "/category-stoly.webp",
  "/catalog/podarochnye-nabory": "/product-podnos.webp",
  "/catalog/stoly/iz-sleba": "/category-stoly.webp",
  "/tovary-dlya-masterov": "/product-stol-river.webp",
};

const OCCASION_ACCENTS = [
  {
    label: "Праздник",
    className: "from-sky-50/70 via-cream to-white border-sky-200/35",
  },
  {
    label: "Бизнес",
    className: "from-sage-muted/90 via-cream to-white border-green/15",
  },
  {
    label: "Юбилей",
    className: "from-amber-50/80 via-cream to-white border-amber-200/35",
  },
  {
    label: "Именной",
    className: "from-rose-100/60 via-cream to-white border-rose-200/35",
  },
] as const;

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-green/55">
      {children}
    </p>
  );
}

function ProcessTimeline({
  steps,
}: {
  steps: { n: number; title: string; text: string }[];
}) {
  return (
    <ol className="relative mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
      <div
        className="absolute left-[12%] right-[12%] top-5 hidden h-px bg-green/15 lg:block"
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

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  if (src.endsWith(".svg")) {
    return (
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-contain p-6 opacity-90"
      />
    );
  }

  return (
    <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 640px) 50vw, 25vw" />
  );
}

export function NardyLandingView() {
  const page = NARDY_LANDING;
  const heroWhatsapp = nardyWhatsappUrl(page.hero.whatsappPrefill);
  const finalWhatsapp = nardyWhatsappUrl(page.ctaFinal.whatsappPrefill);
  const [featuredGallery, ...galleryRest] = page.gallery;

  return (
    <LandingShell>
      <JsonLd data={buildNardyLandingSchemas()} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-green/10">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sage-muted/70 via-cream to-bg"
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
            <Link
              href="/catalog"
              className="text-green/80 hover:text-green hover:underline"
            >
              Каталог
            </Link>
            <span className="mx-2 text-fg/40">/</span>
            <span className="text-fg/70">{page.breadcrumbName}</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:mt-12 lg:grid-cols-12 lg:items-center lg:gap-14">
            <div className="order-2 lg:order-1 lg:col-span-5">
              <SectionEyebrow>
                Игры · подарок · гравировка · Краснодар
              </SectionEyebrow>
              <h1 className="mt-4 font-serif text-3xl font-semibold leading-[1.15] text-green sm:text-4xl lg:text-[2.55rem]">
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
            </div>

            <div className="order-1 lg:order-2 lg:col-span-7">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[var(--radius-lg)] border border-green/12 bg-sage-muted/30 shadow-[var(--shadow)] sm:aspect-[4/3]">
                <Image
                  src={page.hero.image}
                  alt={page.hero.imageAlt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-deep/40 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 rounded-[var(--radius)] bg-white/90 px-4 py-3 text-sm leading-snug text-green-deep backdrop-blur-sm">
                  Авторская доска в единственном экземпляре — слэб, смола,
                  гравировка
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Intro */}
      <section className="py-12 lg:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-12">
            <div className="lg:col-span-4">
              <SectionEyebrow>О продукте</SectionEyebrow>
              <h2 className="mt-3 font-serif text-2xl font-semibold text-green sm:text-3xl">
                Статусный подарок с характером
              </h2>
            </div>
            <div className="relative lg:col-span-8">
              <blockquote className="rounded-[var(--radius-lg)] border border-green/12 bg-gradient-to-br from-sage-muted/40 via-cream/80 to-bg px-6 py-8 shadow-[var(--shadow-sm)] sm:px-10 sm:py-10">
                <p className="text-base leading-relaxed text-fg/80 sm:text-lg">
                  {page.intro}
                </p>
              </blockquote>
            </div>
          </div>
        </Container>
      </section>

      {/* Options */}
      <section
        id="varianty"
        className="scroll-mt-28 border-t border-green/10 bg-sage-muted/20 py-12 lg:py-16"
      >
        <Container>
          <SectionEyebrow>Конфигурация</SectionEyebrow>
          <h2 className="mt-3 font-serif text-2xl font-semibold text-green sm:text-3xl">
            Варианты на заказ
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fg/65">
            Порода, поле, размер и персонализация — согласуем до начала работ.
          </p>
          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            {page.options.map((option) => (
              <div
                key={option.name}
                className="rounded-[var(--radius-lg)] border border-green/10 bg-white px-5 py-5 shadow-[var(--shadow-sm)]"
              >
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-green/55">
                  {option.name}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-fg/75 sm:text-base">
                  {option.value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Process */}
      <section
        id="kak-rabotaem"
        className="scroll-mt-28 py-12 lg:py-16"
        aria-labelledby="nardy-process-heading"
      >
        <Container>
          <SectionEyebrow>Процесс</SectionEyebrow>
          <h2
            id="nardy-process-heading"
            className="mt-3 font-serif text-2xl font-semibold text-green sm:text-3xl"
          >
            Как мы делаем нарды
          </h2>
          <ProcessTimeline steps={page.steps} />
        </Container>
      </section>

      {/* Occasions */}
      <section className="border-t border-green/10 bg-cream/40 py-12 lg:py-14">
        <Container>
          <SectionEyebrow>Поводы</SectionEyebrow>
          <h2 className="mt-3 font-serif text-2xl font-semibold text-green sm:text-3xl">
            Кому и когда дарят
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {page.occasions.map((occasion, index) => {
              const accent = OCCASION_ACCENTS[index] ?? OCCASION_ACCENTS[3];

              return (
                <li
                  key={occasion}
                  className={`rounded-[var(--radius-lg)] border bg-gradient-to-br px-6 py-5 shadow-[var(--shadow-sm)] ${accent.className}`}
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-green/50">
                    {accent.label}
                  </span>
                  <p className="mt-3 font-serif text-lg font-semibold leading-snug text-green-deep">
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
              <SectionEyebrow>Цена и сроки</SectionEyebrow>
              <h2 className="mt-3 font-serif text-2xl font-semibold text-green sm:text-3xl">
                Смета после согласования
              </h2>
            </div>
            <div className="grid gap-px bg-green/10 sm:grid-cols-2">
              <div className="bg-white px-6 py-7 sm:px-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green/55">
                  Стоимость
                </p>
                <p className="mt-2 font-serif text-3xl font-semibold text-green">
                  от ◻ ₽
                </p>
              </div>
              <div className="bg-white px-6 py-7 sm:px-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green/55">
                  Срок
                </p>
                <p className="mt-2 font-serif text-3xl font-semibold text-green">
                  ◻ недель
                </p>
              </div>
            </div>
            <div className="border-t border-green/10 px-6 py-5 sm:px-10">
              <p className="text-sm leading-relaxed text-fg/75">{page.priceNote}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Gallery */}
      <section
        id="galereya"
        className="scroll-mt-28 border-t border-green/10 py-12 lg:py-16"
      >
        <Container>
          <SectionEyebrow>Примеры</SectionEyebrow>
          <h2 className="mt-3 font-serif text-2xl font-semibold text-green sm:text-3xl">
            Готовые работы
          </h2>
          <p className="mt-2 text-sm text-fg/65">
            Фото готовых нард скоро — ниже плейсхолдеры форматов.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <li className="sm:col-span-2 lg:col-span-2 lg:row-span-2">
              <article className="h-full overflow-hidden rounded-[var(--radius-lg)] border border-green/12 bg-white shadow-[var(--shadow-sm)]">
                <div className="relative aspect-[4/3] bg-sage-muted/20 lg:min-h-[280px] lg:aspect-auto lg:h-[calc(100%-4.5rem)]">
                  <GalleryImage
                    src={featuredGallery.image}
                    alt={featuredGallery.caption}
                  />
                </div>
                <p className="px-5 py-4 text-sm leading-snug text-fg/70">
                  {featuredGallery.caption}
                </p>
              </article>
            </li>
            {galleryRest.map((item) => (
              <li key={item.caption}>
                <article className="h-full overflow-hidden rounded-[var(--radius-lg)] border border-green/10 bg-white shadow-[var(--shadow-sm)]">
                  <div className="relative aspect-[4/3] bg-sage-muted/20">
                    <GalleryImage src={item.image} alt={item.caption} />
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
        aria-labelledby="nardy-faq"
      >
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionEyebrow>Вопросы</SectionEyebrow>
            <h2
              id="nardy-faq"
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
          <SectionEyebrow>Связанные разделы</SectionEyebrow>
          <h2 className="mt-3 font-serif text-xl font-semibold text-green sm:text-2xl">
            Смотрите также
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {page.internalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex items-center gap-3 rounded-[var(--radius-lg)] border border-green/10 bg-white p-3 shadow-[var(--shadow-sm)] transition hover:border-green/25"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[14px] bg-sage-muted/40">
                    <Image
                      src={
                        INTERNAL_LINK_IMAGES[link.href] ?? "/category-dekor.webp"
                      }
                      alt=""
                      fill
                      className="object-cover"
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
        </Container>
      </section>
    </LandingShell>
  );
}
