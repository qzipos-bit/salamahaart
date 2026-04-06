import {
  SeoCatalogLandingView,
  seoCatalogLandingMetadata,
} from "@/components/catalog/seo-catalog-landing-view";

export const metadata = seoCatalogLandingMetadata("tarelkiBlyuda");

export default function TarelkiBlyudaCategoryPage() {
  return <SeoCatalogLandingView landingKey="tarelkiBlyuda" />;
}
