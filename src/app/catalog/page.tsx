import type { Metadata } from "next";
import { LandingShell } from "@/components/layout/landing-shell";
import { JsonLd } from "@/components/JsonLd";
import { CatalogHubPageContent } from "@/components/catalog/catalog-hub";
import { buildCatalogHubSchemas } from "@/lib/schema/collection-page";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Изделия из эпоксидной смолы на заказ в Краснодаре | Salamaha",
  description:
    "Авторские изделия из эпоксидной смолы и дерева на заказ: столы, часы, панно, посуда, декор и подарки. Ручная работа в Краснодаре, доставка по РФ. Каталог с ценами.",
};

export default function CatalogPage() {
  return (
    <LandingShell>
      <JsonLd data={buildCatalogHubSchemas()} />
      <CatalogHubPageContent />
    </LandingShell>
  );
}
