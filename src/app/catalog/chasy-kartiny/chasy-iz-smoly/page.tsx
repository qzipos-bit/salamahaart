import {
  SeoCatalogLandingView,
  seoCatalogLandingMetadata,
} from "@/components/catalog/seo-catalog-landing-view";

export const metadata = seoCatalogLandingMetadata("chasy");

export default function ChasyIzSmolyCategoryPage() {
  return <SeoCatalogLandingView landingKey="chasy" />;
}
