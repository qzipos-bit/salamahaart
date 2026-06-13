import Link from "next/link";
import { notFound } from "next/navigation";
import { LandingShell } from "@/components/layout/landing-shell";
import { Container } from "@/components/layout/container";
import { MastersProductGallery } from "@/components/shop/masters-product-gallery";
import { MastersProductPurchase } from "@/components/shop/masters-product-purchase";
import { ProductCartActions } from "@/components/shop/product-cart-actions";
import { WoodBlankCustomPurchase } from "@/components/shop/wood-blank-custom-purchase";
import {
  MASTERS_CATALOG_PATH,
  MASTERS_PRODUCTS,
} from "@/lib/masters-products";
import { WOOD_BLANK_CUSTOM_SLUG } from "@/lib/masters-wood-blank-products";
import { PRODUCT_PAGE_TITLE_CLASS, PRODUCT_PAGE_PRICE_CLASS } from "@/lib/product-typography";

type Props = { params: Promise<{ slug: string }> };

export default async function MastersProductPage({ params }: Props) {
  const { slug } = await params;
  const product = MASTERS_PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const galleryImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  const hasVariants = product.variants && product.variants.length > 0;
  const isWoodCustom = product.slug === WOOD_BLANK_CUSTOM_SLUG;

  return (
    <LandingShell>
      <section className="py-12 lg:py-16">
        <Container>
          <Link
            href={MASTERS_CATALOG_PATH}
            className="text-sm font-medium text-green/70 hover:text-green hover:underline"
          >
            ← Товары для мастеров
          </Link>
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

              {product.description ? (
                <div className="mt-6 space-y-2 text-base leading-relaxed text-fg/85 whitespace-pre-line">
                  {product.description}
                </div>
              ) : !hasVariants ? (
                <p className="mt-6 text-base leading-relaxed text-fg/85">
                  Материалы и инструменты для мастеров. Напишите в WhatsApp —
                  уточним наличие, объём и условия доставки.
                </p>
              ) : null}

              {isWoodCustom ? (
                <WoodBlankCustomPurchase
                  slug={product.slug}
                  title={product.title}
                  backHref={MASTERS_CATALOG_PATH}
                  productPath={`${MASTERS_CATALOG_PATH}/${product.slug}`}
                />
              ) : hasVariants ? (
                <div className="mt-6">
                  <MastersProductPurchase
                    slug={product.slug}
                    title={product.title}
                    variants={product.variants!}
                    defaultVariantId={product.defaultVariantId}
                    backHref={MASTERS_CATALOG_PATH}
                    productPath={`${MASTERS_CATALOG_PATH}/${product.slug}`}
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
                      backHref={MASTERS_CATALOG_PATH}
                      catalog="masters"
                      productPath={`${MASTERS_CATALOG_PATH}/${product.slug}`}
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
