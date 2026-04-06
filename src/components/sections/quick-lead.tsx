import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export function QuickLead() {
  return (
    <section
      className="border-y border-green/10 bg-sage-muted/35 py-[var(--section-y)]"
      aria-labelledby="calculator-cta-heading"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="min-w-0 lg:col-span-6 xl:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-green/60">
              Ориентир по бюджету
            </p>
            <h2
              id="calculator-cta-heading"
              className="mt-3 font-serif text-2xl font-semibold leading-tight text-green sm:text-3xl md:text-[2rem]"
            >
              Рассчитайте примерную стоимость изделия
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-fg/72 sm:text-[15px]">
              Укажите форму, размеры и опции — калькулятор покажет ориентировочный
              диапазон. Точная цена зависит от породы дерева, рисунка слэба, объёма
              смолы и сложности работы; после расчёта можно сразу отправить
              параметры в сообщении.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button
                href="/kalkulyator-stola"
                className="w-full min-h-[48px] px-8 sm:w-auto"
              >
                Открыть калькулятор
              </Button>
              <Button
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                className="w-full min-h-[48px] sm:w-auto"
              >
                Написать в WhatsApp
              </Button>
            </div>
            <p className="mt-5 text-sm text-fg/58">
              <Link
                href="/#contact"
                className="font-medium text-green/85 underline decoration-green/25 underline-offset-[5px] transition hover:text-green hover:decoration-green/50"
              >
                Контакты и форма на главной
              </Link>
            </p>
          </div>

          <div className="relative min-w-0 lg:col-span-6 xl:col-span-5">
            <div className="glass-panel relative overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)]">
              <div className="relative aspect-[4/3] w-full sm:aspect-[5/4] lg:aspect-[4/5]">
                <Image
                  src="/quick-lead-botanical-table.webp"
                  alt="Круглый столик из прозрачной эпоксидной смолы с сухоцветами и эвкалиптом на чёрных ножках"
                  fill
                  className="object-cover object-[center_35%]"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  priority={false}
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-green-deep/35 via-transparent to-transparent"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
