import type { Metadata } from "next";
import { LandingShell } from "@/components/layout/landing-shell";
import { CatalogHubPageContent } from "@/components/catalog/catalog-hub";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Каталог изделий из эпоксидной смолы — Salamaha Fine Art",
  description:
    "Каталог изделий из эпоксидной смолы: столики для завтрака, тарелки и блюда, подносы, часы, картины, сервировочные доски. Ручная работа, заказ и доставка.",
};

export default function CatalogPage() {
  return (
    <LandingShell>
      <CatalogHubPageContent />
    </LandingShell>
  );
}
