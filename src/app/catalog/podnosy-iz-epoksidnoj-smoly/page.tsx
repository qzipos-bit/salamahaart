import {
  SeoCatalogLandingView,
  seoCatalogLandingMetadata,
} from "@/components/catalog/seo-catalog-landing-view";

export const metadata = seoCatalogLandingMetadata("podnosy");

export default function PodnosyCategoryPage() {
  return <SeoCatalogLandingView landingKey="podnosy" />;
}
