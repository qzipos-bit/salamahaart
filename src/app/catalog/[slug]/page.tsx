import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { LandingShell } from "@/components/layout/landing-shell";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { ProductCartActions } from "@/components/shop/product-cart-actions";
import { CatalogBackLink } from "@/components/shop/catalog-back-link";
import {
  ProductPageContentDetails,
  ProductPageLead,
} from "@/components/shop/product-page-content-blocks";
import { ALL_PRODUCTS } from "@/lib/products";
import { getProductSeo } from "@/lib/product-seo";
import {
  catalogLandingLink,
  getCatalogProductPageContent,
} from "@/lib/product-page-content";
import { CATALOG_SHOP_PATH } from "@/lib/catalog-filters";
import {
  appendCatalogReturn,
  resolveCatalogReturn,
} from "@/lib/catalog-return-url";
import { PRODUCT_PAGE_TITLE_CLASS, PRODUCT_PAGE_PRICE_CLASS } from "@/lib/product-typography";
import { JsonLd } from "@/components/JsonLd";
import { buildCatalogProductPageSchemas } from "@/lib/schema/product-page";
import { SITE } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ from?: string | string[] }>;
};

export async function generateStaticParams() {
  return ALL_PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = ALL_PRODUCTS.find((p) => p.slug === slug);
  if (!product) return { title: "Товар не найден" };

  const seo = getProductSeo(slug);
  const title = seo?.title ?? `${product.title} | Salamaha`;
  const description =
    seo?.description ??
    `Изделие «${product.title}» из эпоксидной смолы и дерева ручной работы. На заказ в Краснодаре, доставка по РФ.`;
  const canonical = SITE.siteUrl ? `${SITE.siteUrl}/catalog/${slug}` : undefined;

  return {
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title,
      description,
      ...(canonical ? { url: canonical } : {}),
      images: [{ url: product.image, alt: product.title }],
    },
  };
}

export default async function ProductPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { from } = await searchParams;
  const product = ALL_PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const productSlugs = ALL_PRODUCTS.map((p) => p.slug);
  const backHref = resolveCatalogReturn(from, productSlugs);
  const productPath = appendCatalogReturn(
    `/catalog/${product.slug}`,
    backHref !== CATALOG_SHOP_PATH ? backHref : undefined,
  );
  const pageContent = getCatalogProductPageContent(product.slug);
  const categoryLanding = catalogLandingLink(product.slug);

  return (
    <LandingShell>
      <JsonLd data={buildCatalogProductPageSchemas(product)} />
      <section className="py-12 lg:py-16">
        <Container>
          <Suspense fallback={null}>
            <CatalogBackLink
              catalog="catalog"
              fallback={backHref}
              productSlugs={productSlugs}
              className="text-sm font-medium text-green/70 hover:text-green hover:underline"
            >
              ← Каталог
            </CatalogBackLink>
          </Suspense>
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] border border-green/10 shadow-[var(--shadow-sm)]">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {product.badge ? (
                <div className="absolute left-4 top-4">
                  <Badge kind={product.badge} />
                </div>
              ) : null}
            </div>
            <div>
              <h1 className={PRODUCT_PAGE_TITLE_CLASS}>
                {product.title}
              </h1>
              <p className={PRODUCT_PAGE_PRICE_CLASS}>
                {product.price}
              </p>
              {pageContent ? (
                <ProductPageLead content={pageContent} />
              ) : (
                <p className="mt-6 text-base leading-relaxed text-fg/85">
                  Изделие изготавливается вручную. Срок и финальная стоимость
                  зависят от размеров и пожеланий по пигменту и вставкам. Напишите
                  в WhatsApp — пришлю варианты и смету.
                </p>
              )}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ProductCartActions
                  slug={product.slug}
                  title={product.title}
                  price={product.price}
                  priceRub={product.priceFromRub}
                  backHref={backHref}
                  catalog="catalog"
                  productPath={productPath}
                  productSlugs={productSlugs}
                />
              </div>
            </div>
          </div>
          {pageContent ? (
            <ProductPageContentDetails
              content={pageContent}
              categoryLanding={categoryLanding}
            />
          ) : null}
        </Container>
      </section>
    </LandingShell>
  );
}
