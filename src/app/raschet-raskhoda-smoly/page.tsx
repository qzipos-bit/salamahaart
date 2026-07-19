import type { Metadata } from "next";
import Link from "next/link";
import { LandingShell } from "@/components/layout/landing-shell";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/JsonLd";
import { ResinCalculator } from "@/components/resin-calculator/resin-calculator";
import { buildFaqPageSchema } from "@/lib/schema/helpers";
import { buildWebApplicationSchemas } from "@/lib/schema/web-application";
import { RESIN_CALCULATOR_FAQ } from "@/lib/resin-calculator-faq";

export const metadata: Metadata = {
  title:
    "Калькулятор расхода эпоксидной смолы — расчёт по объёму и пропорции A:B",
  description:
    "Рассчитайте ориентировочный расход эпоксидной смолы для заливки или покрытия: прямоугольник, круг, покрытие, неправильная форма через вес воды; пересчёт компонентов A и B по пропорции.",
};

export default function ResinCalculatorPage() {
  const schemas = [
    ...buildWebApplicationSchemas({
      name: "Расчёт расхода смолы",
      path: "/raschet-raskhoda-smoly",
      breadcrumbLabel: "Расчёт расхода смолы",
    }),
    buildFaqPageSchema(RESIN_CALCULATOR_FAQ),
  ];

  return (
    <LandingShell>
      <JsonLd data={schemas} />
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
          <p className="mt-3 max-w-3xl font-sans text-base leading-relaxed text-fg/80 sm:text-lg">
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
