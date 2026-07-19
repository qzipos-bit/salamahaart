import {
  CatalogCategoryPageView,
  catalogCategoryPageMetadata,
} from "@/components/catalog/catalog-category-page-view";

export const metadata = catalogCategoryPageMetadata("dekor");

export default function DekorCategoryPage() {
  return <CatalogCategoryPageView categoryKey="dekor" />;
}
