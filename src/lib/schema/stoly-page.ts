import type { Product } from "@/components/shop/product-card";
import {
  buildBreadcrumbListSchema,
  buildFaqPageSchema,
} from "@/lib/schema/helpers";
import { buildCollectionPageSchema } from "@/lib/schema/collection-page";
import { absoluteUrl } from "@/lib/schema/site";
import {
  STOLY_PILLAR_KEY,
  getStolyPage,
  stolyPagePath,
  type StolyPageKey,
} from "@/lib/stoly-pages";

export function buildStolyPageSchemas(
  pageKey: StolyPageKey,
  products: Product[],
) {
  const page = getStolyPage(pageKey);
  const pagePath = stolyPagePath(pageKey);
  const pageUrl = absoluteUrl(pagePath);

  const breadcrumbs =
    pageKey === STOLY_PILLAR_KEY
      ? [
          { name: "Главная", path: "/" },
          { name: "Каталог", path: "/catalog" },
          { name: page.h1, path: pagePath },
        ]
      : [
          { name: "Главная", path: "/" },
          { name: "Каталог", path: "/catalog" },
          {
            name: "Столы из смолы",
            path: stolyPagePath(STOLY_PILLAR_KEY),
          },
          { name: page.h1, path: pagePath },
        ];

  const schemas: Record<string, unknown>[] = [
    buildCollectionPageSchema({
      name: page.h1,
      description: page.description,
      path: pagePath,
      itemListName: page.collectionHeading,
      items: [
        ...products.map((product) => ({
          name: product.title,
          path: `/catalog/${product.slug}`,
        })),
        ...page.portfolioExamples.map((example) => ({
          name: example.title,
          path: pagePath,
        })),
      ],
    }),
    buildBreadcrumbListSchema(breadcrumbs),
  ];

  if (page.faq.length) {
    schemas.push(buildFaqPageSchema(page.faq, `${pageUrl}#faq`));
  }

  return schemas;
}
