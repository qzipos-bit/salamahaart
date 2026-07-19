import type { Metadata } from "next";
import { LandingShell } from "@/components/layout/landing-shell";
import { JsonLd } from "@/components/JsonLd";
import { TableEpoxyCalculator } from "@/components/table-epoxy-calculator/table-epoxy-calculator";
import { buildWebApplicationSchemas } from "@/lib/schema/web-application";
import { SITE } from "@/lib/site";
const title = "Калькулятор стола из эпоксидной смолы — примерная стоимость";
const description =
  "Онлайн-расчёт ориентировочной цены стола из смолы: форма, размеры, толщина, край, ножки и опции. Точную стоимость уточняйте у мастерской Salamaha Fine Art.";

export const metadata: Metadata = {
  title,
  description,
  alternates: SITE.siteUrl
    ? { canonical: `${SITE.siteUrl}/kalkulyator-stola` }
    : undefined,
  openGraph: {
    title,
    description,
    ...(SITE.siteUrl ? { url: `${SITE.siteUrl}/kalkulyator-stola` } : {}),
  },
};

export default function KalkulyatorStolaPage() {
  return (
    <LandingShell>
      <JsonLd
        data={buildWebApplicationSchemas({
          name: "Калькулятор стола из эпоксидной смолы",
          path: "/kalkulyator-stola",
          breadcrumbLabel: "Калькулятор стола",
        })}
      />
      <section
        className="relative overflow-hidden"
        aria-labelledby="calc-page-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 50% at 50% -20%, var(--green), transparent)",
          }}
          aria-hidden
        />
        <TableEpoxyCalculator />
      </section>
    </LandingShell>
  );
}
