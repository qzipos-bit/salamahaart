import {
  SeoCatalogLandingView,
  seoCatalogLandingMetadata,
} from "@/components/catalog/seo-catalog-landing-view";

export const metadata = seoCatalogLandingMetadata("servirovochnyeDoski");

export default function ServirovochnyeDoskiCategoryPage() {
  return <SeoCatalogLandingView landingKey="servirovochnyeDoski" />;
}
