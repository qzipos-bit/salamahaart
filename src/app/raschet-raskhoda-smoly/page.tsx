import type { Metadata } from "next";
import Link from "next/link";
import { LandingShell } from "@/components/layout/landing-shell";
import { Container } from "@/components/layout/container";
import { ResinCalculator } from "@/components/resin-calculator/resin-calculator";
import { RESIN_CALCULATOR_FAQ } from "@/lib/resin-calculator-faq";

export const metadata: Metadata = {
  title:
    "Калькулятор расхода эпоксидной смолы — расчёт по объёму и пропорции A:B",
  description:
    "Рассчитайте ориентировочный расход эпоксидной смолы для заливки или покрытия: прямоугольник, круг, покрытие, неправильная форма через вес воды; пересчёт компонентов A и B по пропорции.",
};

function ResinCalculatorFaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: RESIN_CALCULATOR_FAQ.map((item) => ({
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

export default function ResinCalculatorPage() {
  return (
    <LandingShell>
      <ResinCalculatorFaqJsonLd />
      <div className="relative overflow-hidden bg-gradient-to-b from-bg via-cream/80 to-sage-muted/25 py-10 lg:py-14">
        <div
          className="pointer-events-none absolute left-0 top-0 h-56 w-full max-w-2xl bg-gradient-to-br from-gold/10 via-transparent to-transparent opacity-90"
          aria-hidden
        />
        <Container className="relative">
          <Link
            href="/"
            className="text-sm font-medium text-green/70 hover:text-green hover:underline"
          >
            ← На главную
          </Link>
          <h1 className="mt-6 font-serif text-3xl font-semibold text-green sm:text-4xl">
            Расчёт расхода смолы
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-fg/75 sm:text-base">
            Онлайн-калькулятор помогает оценить массу смеси и доли компонентов
            перед заливкой. Результат ориентировочный — уточните плотность и
            пропорции по паспорту вашей системы.
          </p>
          <div className="mt-10">
            <ResinCalculator />
          </div>
        </Container>
      </div>
    </LandingShell>
  );
}
