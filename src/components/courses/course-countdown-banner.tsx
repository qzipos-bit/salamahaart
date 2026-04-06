"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  COURSE_SMOLA_DEREVO,
  formatCoursePrice,
  smolaDerevoWhatsAppHref,
} from "@/lib/course-smola-derevo";
import { Container } from "@/components/layout/container";

function ruPlural(
  n: number,
  one: string,
  few: string,
  many: string,
): string {
  const abs = Math.abs(n) % 100;
  const n1 = abs % 10;
  if (abs > 10 && abs < 20) return many;
  if (n1 > 1 && n1 < 5) return few;
  if (n1 === 1) return one;
  return many;
}

function pad2(n: number) {
  return n.toString().padStart(2, "0");
}

type UnitProps = {
  display: string;
  label: string;
};

function TimeUnit({ display, label }: UnitProps) {
  return (
    <div className="flex min-w-[4.5rem] flex-col items-center sm:min-w-[5.5rem]">
      <div className="w-full rounded-2xl border border-gold/35 bg-gradient-to-b from-cream to-sage-muted/40 px-3 py-3 text-center shadow-[var(--shadow-sm)] sm:px-4 sm:py-4">
        <span className="font-[family-name:var(--font-serif)] text-3xl font-semibold tabular-nums tracking-tight text-green-deep sm:text-4xl">
          {display}
        </span>
      </div>
      <span className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-cream/45 sm:text-[11px]">
        {label}
      </span>
    </div>
  );
}

export function CourseCountdownBanner() {
  const wa = smolaDerevoWhatsAppHref();
  const cfg = COURSE_SMOLA_DEREVO.countdown;
  const endMs = new Date(cfg.endsAtIso).getTime();
  const price = formatCoursePrice(COURSE_SMOLA_DEREVO.priceRub);
  const showOld =
    typeof cfg.oldPriceRub === "number" &&
    cfg.oldPriceRub > COURSE_SMOLA_DEREVO.priceRub;
  const oldPrice = showOld ? formatCoursePrice(cfg.oldPriceRub) : null;

  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const mounted = now !== null;
  const diff = mounted ? Math.max(0, endMs - now) : 0;
  const expired = mounted && diff <= 0;

  const secTotal = Math.floor(diff / 1000);
  const days = Math.floor(secTotal / 86400);
  const hours = Math.floor((secTotal % 86400) / 3600);
  const minutes = Math.floor((secTotal % 3600) / 60);
  const seconds = secTotal % 60;

  if (Number.isNaN(endMs)) return null;

  return (
    <section
      id="countdown"
      className="scroll-mt-24 border-b border-green/10 bg-gradient-to-br from-green-deep via-green-deep to-[#243628] py-10 text-cream sm:py-12"
      aria-labelledby="countdown-title"
    >
      <Container>
        {!expired ? (
          <div className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:justify-between lg:text-left">
            <div className="max-w-xl lg:pr-8">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold/85">
                Спецпредложение
              </p>
              <h2
                id="countdown-title"
                className="mt-3 font-serif text-2xl font-semibold leading-tight sm:text-3xl"
              >
                {cfg.headline}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-cream/75 sm:text-[15px]">
                {cfg.subline}
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                {showOld && oldPrice ? (
                  <span className="text-lg text-cream/45 line-through decoration-gold/50">
                    {oldPrice}
                  </span>
                ) : null}
                <span className="font-[family-name:var(--font-serif)] text-2xl font-semibold text-gold sm:text-3xl">
                  {price}
                </span>
                {showOld ? (
                  <span className="rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold">
                    Скидка
                  </span>
                ) : null}
              </div>
            </div>

            <div className="mt-8 flex w-full max-w-md flex-col items-center lg:mt-0 lg:max-w-none lg:items-end">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-cream/45">
                До конца предложения
              </p>
              {!mounted ? (
                <div
                  className="flex h-[120px] w-full max-w-sm animate-pulse rounded-2xl bg-cream/10"
                  aria-hidden
                />
              ) : (
                <div className="flex flex-wrap items-center justify-center gap-2 sm:flex-nowrap sm:gap-3">
                  <TimeUnit
                    display={String(days)}
                    label={ruPlural(days, "день", "дня", "дней")}
                  />
                  <span
                    className="mb-8 hidden font-serif text-2xl font-light text-gold/70 sm:inline"
                    aria-hidden
                  >
                    :
                  </span>
                  <TimeUnit
                    display={pad2(hours)}
                    label={ruPlural(hours, "час", "часа", "часов")}
                  />
                  <span
                    className="mb-8 hidden font-serif text-2xl font-light text-gold/70 sm:inline"
                    aria-hidden
                  >
                    :
                  </span>
                  <TimeUnit
                    display={pad2(minutes)}
                    label={ruPlural(minutes, "минута", "минуты", "минут")}
                  />
                  <span
                    className="mb-8 hidden font-serif text-2xl font-light text-gold/70 sm:inline"
                    aria-hidden
                  >
                    :
                  </span>
                  <TimeUnit
                    display={pad2(seconds)}
                    label={ruPlural(seconds, "секунда", "секунды", "секунд")}
                  />
                </div>
              )}
              <Link
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-full bg-cream px-8 text-[15px] font-semibold text-green-deep shadow-lg transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
              >
                Забронировать по этой цене
              </Link>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-lg text-center">
            <h2
              id="countdown-title"
              className="font-serif text-2xl font-semibold sm:text-3xl"
            >
              {cfg.expiredTitle}
            </h2>
            <p className="mt-3 text-sm text-cream/75">{cfg.expiredText}</p>
            <Link
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-full bg-cream px-8 text-[15px] font-semibold text-green-deep shadow-lg transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
            >
              Написать в WhatsApp
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
