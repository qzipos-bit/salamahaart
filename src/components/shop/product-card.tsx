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
  mastersProductVariantById,
} from "@/lib/masters-sliding-borts";
import { formatWoodBlankVariantPrice } from "@/lib/masters-wood-blank-products";
import { isWoodBlankCustomSlug } from "@/lib/masters-wood-blank-products";
import { appendCatalogReturn } from "@/lib/catalog-return-url";
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
  /** URL каталога/раздела для кнопки «назад» на карточке товара (`?from=`). */
  returnTo?: string;
  /** Узкая сетка на мобильных — каталог «Товары для мастеров». */
  compactMobile?: boolean;
};

export const ProductCard = memo(function ProductCard({
  product,
  titleLevel = 3,
  hrefPrefix = "/catalog",
  stableLayout = false,
  returnTo,
  compactMobile = false,
}: ProductCardProps) {
  const TitleTag = titleLevel === 2 ? "h2" : "h3";
  const productHref = appendCatalogReturn(
    `${hrefPrefix}/${product.slug}`,
    returnTo,
  );
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
    ? formatWoodBlankVariantPrice(
        defaultVariant.priceRub,
        defaultVariant.priceRubMax,
      )
    : product.price;
  const cartPriceRub = defaultVariant
    ? defaultVariant.priceRub
    : product.priceFromRub;
  const cartPriceRubMax = defaultVariant
    ? defaultVariant.priceRubMax
    : product.priceToRub;
  const isWoodCustom = isWoodBlankCustomSlug(product.slug);

  const imageAspectClass = compactMobile
    ? "aspect-[3/4] sm:aspect-[4/5]"
    : "aspect-[4/5]";
  const imagePadClass = compactMobile
    ? "p-2 sm:p-6"
    : imageContained
      ? "p-4 sm:p-6"
      : "";
  const imageSizes = compactMobile
    ? "(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
    : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw";
  const titleClass = compactMobile
    ? "font-sans text-sm font-bold leading-snug tracking-tight text-fg line-clamp-2 sm:text-lg sm:line-clamp-none"
    : PRODUCT_CARD_TITLE_CLASS;
  const priceClass = compactMobile
    ? "mt-1 font-sans text-base font-bold tabular-nums tracking-normal text-green-deep antialiased sm:mt-2 sm:text-xl"
    : PRODUCT_CARD_PRICE_CLASS;
  const contentPadClass = compactMobile ? "p-3 sm:p-5" : "p-5";
  const badgePosClass = compactMobile
    ? "absolute left-2 top-2 sm:left-4 sm:top-4"
    : "absolute left-4 top-4";
  const actionBtnClass = compactMobile
    ? "!py-2 !text-xs sm:!py-2.5 sm:!text-sm"
    : "";
  const actionMtClass = compactMobile ? "mt-2 sm:mt-4" : "mt-4";

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
                ? `${imageAspectClass} w-full object-contain object-center bg-sage-muted/35 ${imagePadClass}`
                : `${imageAspectClass} w-full object-cover`
            }
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className={`relative block ${imageAspectClass}`}>
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
                ? `object-contain object-center bg-sage-muted/35 ${imagePadClass} transition duration-500 group-hover:scale-[1.02]`
                : `object-cover transition duration-500 group-hover:scale-[1.03]`
            }
            sizes={imageSizes}
          />
          </span>
        )}
        {product.badge ? (
          <div className={badgePosClass}>
            <Badge kind={product.badge} />
          </div>
        ) : null}
      </Link>
      <div className={`flex flex-1 flex-col border-t border-green/10 ${contentPadClass}`}>
        <Link href={productHref}>
          <TitleTag className={`${titleClass}${stableLayout ? "" : " transition group-hover:text-green-deep"}`}>
            {product.title}
          </TitleTag>
        </Link>
        <p className={priceClass}>
          {product.price}
        </p>
        <div className={actionMtClass}>
          {isWoodCustom ? (
            <Button
              href={productHref}
              variant="secondary"
              className={`w-full ${actionBtnClass}`}
            >
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
              className={actionBtnClass}
            />
          )}
        </div>
      </div>
    </article>
  );
});
