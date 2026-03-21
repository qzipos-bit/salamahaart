import type { Product } from "@/components/shop/product-card";

export const FEATURED_PRODUCTS: Product[] = [
  {
    slug: "stol-river",
    title: "Журнальный стол River",
    price: "от 48 000 ₽",
    image: "/product-stol-river.webp",
    badge: "hit",
  },
  {
    slug: "fotaramka-30x40-a4",
    title: "Фоторамка 30×40 под фото А4",
    price: "от 22 000 ₽",
    image: "/product-fotaramka-30x40.webp",
    badge: "new",
  },
  {
    slug: "podnos-zoloto",
    title: "Сервировочный поднос",
    price: "8 900 ₽",
    image: "/product-podnos.webp",
    badge: "sale",
  },
  {
    slug: "chasy-live",
    title: "Часы Live Edge",
    price: "от 12 500 ₽",
    image: "/product-chasy-live.webp",
  },
];

export const ALL_PRODUCTS: Product[] = [
  ...FEATURED_PRODUCTS,
  {
    slug: "eloch-igrushki-2d",
    title: "Ёлочные 2D игрушки",
    price: "от 1 200 ₽",
    image: "/product-eloch-igrushki.webp",
    badge: "new",
  },
  {
    slug: "podstavka",
    title: "Подставка под украшения",
    price: "4 800 ₽",
    image: "/product-podstavka.webp",
  },
];
