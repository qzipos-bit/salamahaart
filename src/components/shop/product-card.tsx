import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import type { CartCatalog } from "@/lib/cart-types";
import { MASTERS_CATALOG_PATH } from "@/lib/masters-products";
import type { MasterProductVariant } from "@/lib/masters-products";
import {
  formatMastersRub,
  mastersProductVariantById,
} from "@/lib/masters-sliding-borts";
import { isWoodBlankCustomSlug } from "@/lib/masters-wood-blank-products";
import { PRODUCT_CARD_TITLE_CLASS, PRODUCT_CARD_PRICE_CLASS } from "@/lib/product-typography";

/** Совпадает с параметром `?cat=` на главной и в каталоге */
export type ProductCatalogCategory =
  | "stoly"
  | "chasy"
  | "kartiny"
  | "dekor"
  | "posuda"
  | "bukety";

export type Product = {
  slug: string;
  title: string;
  price: string;
  /** Нижняя граница цены для фильтра в каталоге (из строки `price`) */
  priceFromRub: number;
  category: ProductCatalogCategory;
  image: string;
  badge?: "hit" | "sale" | "new";
};

type ProductCardProduct = {
  slug: string;
  title: string;
  price: string;
  image: string;
  badge?: "hit" | "sale" | "new";
  variants?: MasterProductVariant[];
  defaultVariantId?: string;
  priceFromRub?: number;
  priceToRub?: number;
};

type ProductCardProps = {
  product: ProductCardProduct;
  /** Уровень заголовка названия товара (на странице каталога — h2 для SEO) */
  titleLevel?: 2 | 3;
  /** Базовый путь каталога, без слэша в конце. По умолчанию — магазин изделий. */
  hrefPrefix?: string;
  /** Без подъёма карточки при hover — меньше дёргания в сетках на главной */
  stableLayout?: boolean;
};

export const ProductCard = memo(function ProductCard({
  product,
  titleLevel = 3,
  hrefPrefix = "/catalog",
  stableLayout = false,
}: ProductCardProps) {
  const TitleTag = titleLevel === 2 ? "h2" : "h3";
  const productHref = `${hrefPrefix}/${product.slug}`;
  const isPlaceholder = product.image.endsWith(".svg");
  const catalog: CartCatalog =
    hrefPrefix === MASTERS_CATALOG_PATH ? "masters" : "catalog";
  const isMasters = catalog === "masters";
  const imageContained = isPlaceholder || isMasters;

  const defaultVariant =
    product.variants && product.variants.length > 0
      ? mastersProductVariantById(
          product.variants,
          product.defaultVariantId ?? product.variants[0].id,
        )
      : null;
  const cartTitle = defaultVariant
    ? `${product.title}, ${defaultVariant.label}`
    : product.title;
  const cartPrice = defaultVariant
    ? formatMastersRub(defaultVariant.priceRub)
    : product.price;
  const cartPriceRub = defaultVariant
    ? defaultVariant.priceRub
    : product.priceFromRub;
  const cartPriceRubMax = defaultVariant ? undefined : product.priceToRub;
  const isWoodCustom = isWoodBlankCustomSlug(product.slug);

  const articleClass = stableLayout
    ? "group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-green/15 bg-white shadow-[var(--shadow-sm)] [contain:paint]"
    : "group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-green/15 bg-white shadow-[var(--shadow-sm)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow)]";

  return (
    <article className={articleClass}>
      <Link href={productHref} className="relative block overflow-hidden bg-sage-muted/25">
        {stableLayout ? (
          <img
            src={product.image}
            alt={
              isPlaceholder
                ? `${product.title} — фото скоро появится`
                : product.title
            }
            width={400}
            height={500}
            className={
              imageContained
                ? "aspect-[4/5] w-full object-contain object-center bg-sage-muted/35 p-4 sm:p-6"
                : "aspect-[4/5] w-full object-cover"
            }
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className="relative block aspect-[4/5]">
          <Image
            src={product.image}
            alt={
              isPlaceholder
                ? `${product.title} — фото скоро появится`
                : product.title
            }
            fill
            unoptimized={isPlaceholder}
            className={
              imageContained
                ? `object-contain object-center bg-sage-muted/35 p-4 sm:p-6 transition duration-500 group-hover:scale-[1.02]`
                : `object-cover transition duration-500 group-hover:scale-[1.03]`
            }
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          </span>
        )}
        {product.badge ? (
          <div className="absolute left-4 top-4">
            <Badge kind={product.badge} />
          </div>
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col border-t border-green/10 p-5">
        <Link href={productHref}>
          <TitleTag className={`${PRODUCT_CARD_TITLE_CLASS}${stableLayout ? "" : " transition group-hover:text-green-deep"}`}>
            {product.title}
          </TitleTag>
        </Link>
        <p className={PRODUCT_CARD_PRICE_CLASS}>
          {product.price}
        </p>
        <div className="mt-4">
          {isWoodCustom ? (
            <Button href={productHref} variant="secondary" className="w-full">
              Указать размер
            </Button>
          ) : (
            <AddToCartButton
              catalog={catalog}
              slug={product.slug}
              title={cartTitle}
              price={cartPrice}
              productPath={productHref}
              cartVariantId={defaultVariant?.id}
              priceRub={cartPriceRub}
              priceRubMax={cartPriceRubMax}
            />
          )}
        </div>
      </div>
    </article>
  );
});
