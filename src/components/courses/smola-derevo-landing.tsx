import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import {
  COURSE_SMOLA_DEREVO,
  COURSE_SMOLA_DEREVO_GALLERY,
  COURSE_SMOLA_DEREVO_HERO,
  formatCoursePrice,
  smolaDerevoWhatsAppHref,
} from "@/lib/course-smola-derevo";
import {
  CertificatePreview,
  ValuePropIcon,
} from "@/components/courses/course-landing-graphics";
import { CourseCountdownBanner } from "@/components/courses/course-countdown-banner";

const waHref = smolaDerevoWhatsAppHref();
const priceLabel = formatCoursePrice(COURSE_SMOLA_DEREVO.priceRub);

function DetailsModule({
  m,
}: {
  m: (typeof COURSE_SMOLA_DEREVO.modules)[number];
}) {
  return (
    <details className="group border-b border-green/10 py-1 first:border-t first:border-green/10">
      <summary className="cursor-pointer list-none rounded-lg py-4 pr-2 font-medium text-green transition hover:text-green-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green [&::-webkit-details-marker]:hidden">
        <span className="flex items-start justify-between gap-4">
          <span className="text-left text-[15px] leading-snug sm:text-base">
            <span className="text-fg/45">{m.number}.</span>{" "}
            <span className="font-[family-name:var(--font-serif)] text-lg sm:text-xl">
              {m.title}
            </span>
            {m.subtitle ? (
              <span className="mt-1 block text-sm font-sans font-normal text-fg/60">
                {m.subtitle}
              </span>
            ) : null}
          </span>
          <span
            className="mt-1 shrink-0 text-gold transition group-open:rotate-180"
            aria-hidden
          >
            ↓
          </span>
        </span>
      </summary>
      <ul className="mb-4 space-y-2.5 border-l border-gold/25 pb-2 pl-4 text-sm leading-relaxed text-fg/75">
        {m.topics.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </details>
  );
}

export function SmolaDerevoLanding() {
  return (
    <article className="pb-24 md:pb-0">
      {/* Hero */}
      <section
        className="relative overflow-hidden border-b border-green/10 bg-sage-muted/30 py-12 sm:py-16 md:py-20"
        aria-labelledby="course-hero-title"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 60% at 70% 0%, var(--green), transparent)",
          }}
          aria-hidden
        />
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6 xl:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-green/60">
                {COURSE_SMOLA_DEREVO.heroEyebrow}
              </p>
              <h1
                id="course-hero-title"
                className="mt-3 font-serif text-3xl font-semibold leading-[1.12] tracking-tight text-green sm:text-4xl md:text-[2.65rem]"
              >
                {COURSE_SMOLA_DEREVO.pageH1}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-fg/75 sm:text-[17px]">
                {COURSE_SMOLA_DEREVO.tagline}
              </p>
              <p className="mt-5 flex max-w-xl flex-wrap items-center gap-2 text-sm text-fg/62">
                <span className="tracking-[0.15em] text-gold" aria-hidden>
                  ★★★★★
                </span>
                <span>{COURSE_SMOLA_DEREVO.ratingLine.caption}</span>
              </p>
              <div className="mt-6 inline-flex flex-col gap-1 rounded-2xl border border-green/12 bg-cream/70 px-5 py-4 shadow-[var(--shadow-sm)] backdrop-blur-sm sm:inline-flex sm:flex-row sm:items-baseline sm:gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-fg/50">
                  Стоимость
                </span>
                <span className="font-[family-name:var(--font-serif)] text-2xl text-green-deep sm:text-3xl">
                  {priceLabel}
                </span>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] w-full px-8 sm:w-auto"
                >
                  Записаться в WhatsApp
                </Button>
                <Button
                  href="#program"
                  variant="secondary"
                  className="min-h-[48px] w-full sm:w-auto"
                >
                  Смотреть программу
                </Button>
              </div>
              <p className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-fg/48">
                <Link
                  href="#countdown"
                  className="font-medium text-green/80 underline decoration-green/20 underline-offset-[4px] hover:text-green hover:decoration-green/45"
                >
                  Таймер
                </Link>
                <span className="text-fg/25" aria-hidden>
                  ·
                </span>
                <Link
                  href="#gallery"
                  className="font-medium text-green/80 underline decoration-green/20 underline-offset-[4px] hover:text-green hover:decoration-green/45"
                >
                  Галерея работ
                </Link>
                <span className="text-fg/25" aria-hidden>
                  ·
                </span>
                <Link
                  href="#reviews"
                  className="font-medium text-green/80 underline decoration-green/20 underline-offset-[4px] hover:text-green hover:decoration-green/45"
                >
                  Отзывы
                </Link>
                <span className="text-fg/25" aria-hidden>
                  ·
                </span>
                <Link
                  href="#faq"
                  className="font-medium text-green/80 underline decoration-green/20 underline-offset-[4px] hover:text-green hover:decoration-green/45"
                >
                  Вопросы
                </Link>
                <span className="text-fg/25" aria-hidden>
                  ·
                </span>
                <Link
                  href="/#contact"
                  className="font-medium text-green/80 underline decoration-green/20 underline-offset-[4px] hover:text-green hover:decoration-green/45"
                >
                  Контакты
                </Link>
              </p>
            </div>
            <div className="relative min-w-0 lg:col-span-6 xl:col-span-5">
              <div className="glass-panel overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow)]">
                <div className="relative aspect-[4/5] w-full sm:aspect-[5/6]">
                  <Image
                    src={COURSE_SMOLA_DEREVO_HERO.src}
                    alt={COURSE_SMOLA_DEREVO_HERO.alt}
                    fill
                    className="object-cover object-[center_42%]"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-green-deep/40 via-transparent to-transparent"
                    aria-hidden
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CourseCountdownBanner />

      {/* Trust + update */}
      <section className="border-b border-green/10 py-12 md:py-14">
        <Container>
          <div className="grid gap-8 sm:grid-cols-3 sm:gap-6">
            {COURSE_SMOLA_DEREVO.trustStrip.map((t) => (
              <div
                key={t.label}
                className="rounded-2xl border border-green/10 bg-cream/40 px-5 py-4 text-center sm:text-left"
              >
                <p className="font-[family-name:var(--font-serif)] text-2xl text-green">
                  {t.value}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-fg/50">
                  {t.label}
                </p>
              </div>
            ))}
          </div>
          <div className="glass-panel mt-10 rounded-[var(--radius-lg)] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green/60">
              Обновление программы
            </p>
            <p className="mt-3 text-sm leading-relaxed text-fg/75 sm:text-[15px]">
              {COURSE_SMOLA_DEREVO.updateNote}
            </p>
          </div>
        </Container>
      </section>

      {/* Что вы получите — bento */}
      <section
        className="border-b border-green/10 bg-gradient-to-b from-cream/80 to-sage-muted/25 py-12 md:py-[var(--section-y)]"
        aria-labelledby="course-value-heading"
      >
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-green/58">
            Структура обучения
          </p>
          <h2
            id="course-value-heading"
            className="mt-3 max-w-2xl font-serif text-2xl font-semibold leading-tight text-green sm:text-3xl md:text-[2rem]"
          >
            Что вы получите на курсе
          </h2>
          <p className="mt-3 max-w-xl text-sm text-fg/65 sm:text-[15px]">
            {COURSE_SMOLA_DEREVO.valueSectionLead}
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {COURSE_SMOLA_DEREVO.valueProps.map((vp) => (
              <li
                key={vp.title}
                className="flex flex-col rounded-[var(--radius-lg)] border border-green/10 bg-cream/70 p-6 shadow-[var(--shadow-sm)] transition duration-300 hover:border-gold/30 hover:shadow-[var(--shadow)]"
              >
                <ValuePropIcon name={vp.icon} />
                <h3 className="mt-4 font-[family-name:var(--font-serif)] text-lg text-green-deep">
                  {vp.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-fg/72">
                  {vp.text}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Галерея работ */}
      <section
        id="gallery"
        className="scroll-mt-24 border-b border-green/10 bg-cream/40 py-12 md:py-[var(--section-y)]"
        aria-labelledby="course-gallery-heading"
      >
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-green/58">
            Портфолио
          </p>
          <h2
            id="course-gallery-heading"
            className="mt-3 max-w-2xl font-serif text-2xl font-semibold leading-tight text-green sm:text-3xl"
          >
            Работы и направления, которые разбираем на курсе
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-fg/68 sm:text-[15px]">
            {COURSE_SMOLA_DEREVO.galleryLead}
          </p>
          <ul
            className="mt-10 grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-4"
            aria-label="Примеры работ из смолы и дерева по темам курса"
          >
            {COURSE_SMOLA_DEREVO_GALLERY.map((item) => (
              <li
                key={item.src}
                className="group relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] border border-green/10 bg-sage-muted/20 shadow-[var(--shadow-sm)] sm:aspect-[3/4]"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width:640px)50vw,(max-width:1024px)33vw,25vw"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-green-deep/20 via-transparent to-transparent opacity-70 transition group-hover:opacity-90"
                  aria-hidden
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Для кого */}
      <section className="py-12 md:py-[var(--section-y)]">
        <Container>
          <h2 className="font-serif text-2xl font-semibold text-green sm:text-3xl">
            Кому подойдёт курс
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-10">
            <div className="rounded-[var(--radius-lg)] border border-green/12 bg-sage-muted/25 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-green/70">
                Подходит
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-fg/78">
                {COURSE_SMOLA_DEREVO.forWhom.yes.map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="text-gold" aria-hidden>
                      ·
                    </span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-fg/10 bg-cream/50 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-fg/45">
                Меньше пользы, если
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-fg/65">
                {COURSE_SMOLA_DEREVO.forWhom.no.map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="text-fg/35" aria-hidden>
                      ·
                    </span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Как проходит */}
      <section className="border-y border-green/10 bg-sage-muted/25 py-12 md:py-16">
        <Container>
          <h2 className="font-serif text-2xl font-semibold text-green sm:text-3xl">
            Как проходит обучение
          </h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {COURSE_SMOLA_DEREVO.steps.map((s, i) => (
              <li
                key={s.title}
                className="relative rounded-2xl border border-green/10 bg-cream/60 p-6 shadow-[var(--shadow-sm)]"
              >
                <span className="font-[family-name:var(--font-serif)] text-3xl text-gold/90">
                  {i + 1}
                </span>
                <h3 className="mt-2 font-medium text-green">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg/68">
                  {s.text}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Отзывы */}
      <section
        id="reviews"
        className="scroll-mt-24 border-b border-green/10 py-12 md:py-[var(--section-y)]"
        aria-labelledby="course-reviews-heading"
      >
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-green/58">
            Социальное доказательство
          </p>
          <h2
            id="course-reviews-heading"
            className="mt-3 font-serif text-2xl font-semibold text-green sm:text-3xl"
          >
            Отзывы участников
          </h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {COURSE_SMOLA_DEREVO.reviews.map((r) => (
              <li
                key={r.name}
                className="flex flex-col rounded-[var(--radius-lg)] border border-green/10 bg-white/80 p-6 shadow-[var(--shadow-sm)]"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage-muted font-[family-name:var(--font-serif)] text-lg text-green"
                    aria-hidden
                  >
                    {r.name
                      .split(" ")
                      .map((p) => p[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-medium text-green-deep">{r.name}</p>
                    <p className="text-xs text-fg/50">{r.tag}</p>
                  </div>
                </div>
                <p
                  className="mt-3 text-xs tracking-[0.12em] text-gold"
                  aria-hidden
                >
                  {"★".repeat(r.rating)}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-fg/75 sm:text-[15px]">
                  «{r.text}»
                </p>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-fg/48">
            {COURSE_SMOLA_DEREVO.reviewsFootnote}
          </p>
        </Container>
      </section>

      {/* Программа */}
      <section id="program" className="scroll-mt-24 py-12 md:py-[var(--section-y)]">
        <Container>
          <div className="rounded-[var(--radius-lg)] border border-green/10 bg-sage-muted/35 px-4 py-10 sm:px-8 md:px-12 md:py-14">
            <h2 className="font-serif text-2xl font-semibold text-green sm:text-3xl">
              Программа: 10 модулей
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg/68">
              {COURSE_SMOLA_DEREVO.programIntro}
            </p>
            <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-green/8 bg-cream/50 px-3 sm:px-5">
              {COURSE_SMOLA_DEREVO.modules.map((m) => (
                <DetailsModule key={m.number} m={m} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Promo — тёмный блок */}
      <section
        className="relative overflow-hidden bg-green-deep py-14 text-cream md:py-16"
        aria-labelledby="course-promo-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 80% at 100% 0%, var(--gold), transparent), radial-gradient(ellipse 50% 50% at 0% 100%, var(--sage), transparent)",
          }}
          aria-hidden
        />
        <Container className="relative">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <h2
                id="course-promo-heading"
                className="font-serif text-2xl font-semibold leading-snug sm:text-3xl md:text-[2rem]"
              >
                {COURSE_SMOLA_DEREVO.promoDark.title}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream/75 sm:text-[15px]">
                {COURSE_SMOLA_DEREVO.promoDark.subtitle}
              </p>
              <ul className="mt-6 space-y-3 text-sm text-cream/85">
                {COURSE_SMOLA_DEREVO.promoDark.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-gold" aria-hidden>
                      ✓
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-stretch gap-4 lg:col-span-5 lg:items-end">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-cream px-8 text-[15px] font-semibold text-green-deep shadow-lg transition hover:bg-white hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream lg:w-auto"
              >
                Записаться на курс
              </a>
              <p className="text-center text-xs text-cream/55 lg:text-right">
                {priceLabel} · оплата частями и другие варианты в WhatsApp
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Формат и оплата */}
      <section className="border-t border-green/10 bg-cream/35 py-12 md:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="rounded-[var(--radius-lg)] border border-green/12 bg-white/50 p-6 sm:p-8">
              <h2 className="font-serif text-xl font-semibold text-green sm:text-2xl">
                {COURSE_SMOLA_DEREVO.format.title}
              </h2>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-fg/75">
                {COURSE_SMOLA_DEREVO.format.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-gold" aria-hidden>
                      ·
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-green/12 bg-white/50 p-6 sm:p-8">
              <h2 className="font-serif text-xl font-semibold text-green sm:text-2xl">
                {COURSE_SMOLA_DEREVO.payment.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-fg/72">
                {COURSE_SMOLA_DEREVO.payment.intro}
              </p>
              <ul className="mt-5 space-y-2.5 text-sm text-fg/75">
                {COURSE_SMOLA_DEREVO.payment.options.map((o) => (
                  <li key={o} className="flex gap-2">
                    <span className="text-green/50" aria-hidden>
                      ✓
                    </span>
                    {o}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-[400px]:w-auto"
                >
                  Узнать реквизиты и рассрочку
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Автор */}
      <section
        className="border-t border-green/10 py-12 md:py-[var(--section-y)]"
        aria-labelledby="course-author-heading"
      >
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] md:col-span-5 md:mx-0 md:max-w-none">
              <Image
                src="/about-victoria.webp"
                alt="Виктория — преподаватель курса по смоле и дереву"
                fill
                className="object-cover object-[center_25%]"
                sizes="(max-width: 768px) 100vw, 38vw"
                loading="lazy"
              />
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-green/55">
                Автор курса
              </p>
              <h2
                id="course-author-heading"
                className="mt-3 font-serif text-2xl font-semibold text-green sm:text-3xl"
              >
                {COURSE_SMOLA_DEREVO.instructor.name}
              </h2>
              <p className="mt-1 text-sm font-medium text-fg/55">
                {COURSE_SMOLA_DEREVO.instructor.role}
              </p>
              {COURSE_SMOLA_DEREVO.instructor.bio.map((p, i) => (
                <p
                  key={i}
                  className="mt-4 text-sm leading-relaxed text-fg/75 sm:text-[15px]"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Сертификат */}
      <section
        className="bg-gradient-to-b from-sage-muted/25 via-cream/40 to-cream/70 py-12 md:py-[var(--section-y)]"
        aria-labelledby="course-cert-heading"
      >
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="order-2 lg:order-1 lg:col-span-5">
              <CertificatePreview />
            </div>
            <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-green/58">
                Итог обучения
              </p>
              <h2
                id="course-cert-heading"
                className="mt-3 font-serif text-2xl font-semibold text-green sm:text-3xl"
              >
                {COURSE_SMOLA_DEREVO.certificate.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-fg/72 sm:text-[15px]">
                {COURSE_SMOLA_DEREVO.certificate.lead}
              </p>
              <ul className="mt-6 space-y-3 text-sm text-fg/75">
                {COURSE_SMOLA_DEREVO.certificate.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-gold" aria-hidden>
                      ·
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs leading-relaxed text-fg/52">
                {COURSE_SMOLA_DEREVO.certificate.footnote}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="scroll-mt-24 border-t border-green/10 bg-sage-muted/20 py-12 md:py-16"
        aria-labelledby="course-faq-heading"
      >
        <Container>
          <h2
            id="course-faq-heading"
            className="font-serif text-2xl font-semibold text-green sm:text-3xl"
          >
            Вопросы и ответы
          </h2>
          <div className="mx-auto mt-8 max-w-3xl space-y-2">
            {COURSE_SMOLA_DEREVO.faq.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-green/10 bg-cream/50 px-5 py-1"
              >
                <summary className="cursor-pointer list-none rounded-xl py-4 font-medium text-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {item.q}
                    <span
                      className="text-gold transition group-open:rotate-180"
                      aria-hidden
                    >
                      ↓
                    </span>
                  </span>
                </summary>
                <p className="border-t border-green/8 pb-4 pt-2 text-sm leading-relaxed text-fg/72">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* Финал CTA */}
      <section className="py-14 md:py-20">
        <Container>
          <div className="glass-panel mx-auto max-w-2xl rounded-[var(--radius-lg)] px-6 py-10 text-center shadow-[var(--shadow-sm)] sm:px-10 sm:py-12">
            <h2 className="font-serif text-2xl font-semibold text-green sm:text-3xl">
              Запись на курс
            </h2>
            <p className="mt-3 text-fg/70">
              Стоимость —{" "}
              <span className="font-semibold text-green-deep">{priceLabel}</span>
              . Напишите в WhatsApp: пришлём варианты оплаты и ответим на
              вопросы.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[48px] w-full min-[400px]:w-auto px-8"
              >
                Написать в WhatsApp
              </Button>
              <Button href="/" variant="secondary" className="min-h-[48px] w-full min-[400px]:w-auto">
                На главную сайта
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </article>
  );
}
