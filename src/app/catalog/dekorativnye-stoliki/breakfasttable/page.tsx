import {
  SeoCatalogLandingView,
  seoCatalogLandingMetadata,
} from "@/components/catalog/seo-catalog-landing-view";

export const metadata = seoCatalogLandingMetadata("breakfastTable");

export default function BreakfastTableCategoryPage() {
  return <SeoCatalogLandingView landingKey="breakfastTable" />;
}
