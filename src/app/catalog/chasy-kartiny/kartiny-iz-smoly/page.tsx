import {
  SeoCatalogLandingView,
  seoCatalogLandingMetadata,
} from "@/components/catalog/seo-catalog-landing-view";

export const metadata = seoCatalogLandingMetadata("kartiny");

export default function KartinyIzSmolyCategoryPage() {
  return <SeoCatalogLandingView landingKey="kartiny" />;
}
