import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { LandingShell } from "@/components/layout/landing-shell";
import { Container } from "@/components/layout/container";
import { MastersProductGallery } from "@/components/shop/masters-product-gallery";
import { MastersProductPurchase } from "@/components/shop/masters-product-purchase";
import { ProductCartActions } from "@/components/shop/product-cart-actions";
import { CatalogBackLink } from "@/components/shop/catalog-back-link";
import { WoodBlankCustomPurchase } from "@/components/shop/wood-blank-custom-purchase";
import { WoodBlankPurchase } from "@/components/shop/wood-blank-purchase";
import {
  MASTERS_CATALOG_PATH,
  MASTERS_PRODUCTS,
} from "@/lib/masters-products";
import {
  getWoodBlankProductKind,
  WOOD_BLANK_CUSTOM_SLUG,
} from "@/lib/masters-wood-blank-products";
import { FULL_CIRCLE_WITH_BOTTOM_SLUG, ROUND_RIM_SLUG } from "@/lib/masters-form-products";
import { resolveMastersCatalogReturn, appendCatalogReturn } from "@/lib/catalog-return-url";
import { getMastersProductSeo } from "@/lib/masters-product-seo";
import { JsonLd } from "@/components/JsonLd";
import { buildMastersProductPageSchemas } from "@/lib/schema/product-page";
import { PRODUCT_PAGE_TITLE_CLASS, PRODUCT_PAGE_PRICE_CLASS } from "@/lib/product-typography";
import { SITE } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ from?: string | string[] }>;
};

export async function generateStaticParams() {
  return MASTERS_PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = MASTERS_PRODUCTS.find((p) => p.slug === slug);
  if (!product) return { title: "Товар не найден" };

  const seo = getMastersProductSeo(slug);
  const title = seo?.title ?? `${product.title} | Salamaha`;
  const description =
    seo?.description ??
    `«${product.title}» для мастеров эпоксидной смолы. Купить в Краснодаре, доставка по РФ.`;
  const canonical = SITE.siteUrl
    ? `${SITE.siteUrl}${MASTERS_CATALOG_PATH}/${slug}`
    : undefined;

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

export default async function MastersProductPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { from } = await searchParams;
  const product = MASTERS_PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const productSlugs = MASTERS_PRODUCTS.map((p) => p.slug);
  const backHref = resolveMastersCatalogReturn(from, productSlugs);
  const productPath = appendCatalogReturn(
    `${MASTERS_CATALOG_PATH}/${product.slug}`,
    backHref !== MASTERS_CATALOG_PATH ? backHref : undefined,
  );

  const galleryImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  const woodBlankKind = getWoodBlankProductKind(product.slug);
  const hasVariants = product.variants && product.variants.length > 0;
  const isWoodCustom = product.slug === WOOD_BLANK_CUSTOM_SLUG;

  return (
    <LandingShell>
      <JsonLd data={buildMastersProductPageSchemas(product)} />
      <section className="py-12 lg:py-16">
        <Container>
          <Suspense fallback={null}>
            <CatalogBackLink
              catalog="masters"
              fallback={backHref}
              productSlugs={productSlugs}
              className="text-sm font-medium text-green/70 hover:text-green hover:underline"
            >
              ← Товары для мастеров
            </CatalogBackLink>
          </Suspense>
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start">
            <MastersProductGallery
              images={galleryImages}
              alt={product.title}
              badge={product.badge}
            />
            <div>
              <h1 className={PRODUCT_PAGE_TITLE_CLASS}>
                {product.title}
              </h1>

              {product.description && !woodBlankKind && !isWoodCustom ? (
                <div className="mt-6 space-y-2 text-base leading-relaxed text-fg/85 whitespace-pre-line">
                  {product.description}
                </div>
              ) : !hasVariants && !woodBlankKind && !isWoodCustom ? (
                <p className="mt-6 text-base leading-relaxed text-fg/85">
                  Материалы и инструменты для мастеров. Напишите в WhatsApp —
                  уточним наличие, объём и условия доставки.
                </p>
              ) : null}

              {isWoodCustom ? (
                <WoodBlankCustomPurchase
                  slug={product.slug}
                  title={product.title}
                  backHref={backHref}
                  productPath={productPath}
                  description={product.description ?? ""}
                  productSlugs={productSlugs}
                />
              ) : woodBlankKind ? (
                <WoodBlankPurchase
                  slug={product.slug}
                  title={product.title}
                  kind={woodBlankKind}
                  backHref={backHref}
                  productPath={productPath}
                  description={product.description ?? ""}
                  productSlugs={productSlugs}
                />
              ) : hasVariants ? (
                <div className="mt-6">
                  <MastersProductPurchase
                    slug={product.slug}
                    title={product.title}
                    variants={product.variants!}
                    defaultVariantId={product.defaultVariantId}
                    backHref={backHref}
                    productPath={productPath}
                    productSlugs={productSlugs}
                    variantLegend={
                      product.slug === FULL_CIRCLE_WITH_BOTTOM_SLUG ||
                      product.slug === ROUND_RIM_SLUG
                        ? "Диаметр"
                        : undefined
                    }
                  />
                </div>
              ) : (
                <>
                  <p className={PRODUCT_PAGE_PRICE_CLASS}>
                    {product.price}
                  </p>
                  <div className="mt-8">
                    <ProductCartActions
                      slug={product.slug}
                      title={product.title}
                      price={product.price}
                      priceRub={product.priceFromRub}
                      priceRubMax={product.priceToRub}
                      backHref={backHref}
                      catalog="masters"
                      productPath={productPath}
                      productSlugs={productSlugs}
                    />
                  </div>
                </>
              )}

              <p className="mt-8 text-sm leading-relaxed text-fg/75">
                Изделия и сувениры — в{" "}
                <Link
                  href="/catalog"
                  className="font-medium text-green underline-offset-4 hover:underline"
                >
                  основном каталоге
                </Link>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>
    </LandingShell>
  );
}
