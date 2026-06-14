import type { MasterProduct } from "@/lib/masters-products";

const PLACEHOLDER = "/product-photo-soon.svg";

function formatRub(n: number): string {
  return `${new Intl.NumberFormat("ru-RU").format(n)} ₽`;
}

export const MASTERS_INSTRUMENT_PRODUCTS: MasterProduct[] = [
  {
    slug: "shablon-frezer-nisha-chasy",
    title: "Шаблон для ручного фрезера — ниша под часовой механизм",
    price: formatRub(2_500),
    priceFromRub: 2_500,
    category: "instrumenty",
    image: "/masters-instruments/shablon-frezer-nisha-chasy-01.webp",
    images: ["/masters-instruments/shablon-frezer-nisha-chasy-01.webp"],
    badge: "hit",
    description:
      "Шаблон для ручного фрезера для фрезеровки ниши под часовой механизм.",
  },
  {
    slug: "osnova-100x100",
    title: "Основа 100×100 см",
    price: formatRub(8_500),
    priceFromRub: 8_500,
    category: "instrumenty",
    image: "/masters-instruments/osnova-100x100-01.webp",
    images: ["/masters-instruments/osnova-100x100-01.webp"],
    description: "Основа для заливки, размер 100×100 см.",
  },
  {
    slug: "osnova-universalnaya-60",
    title: "Универсальная основа",
    price: formatRub(5_700),
    priceFromRub: 5_700,
    category: "instrumenty",
    image: "/masters-instruments/osnova-universalnaya-01.webp",
    images: ["/masters-instruments/osnova-universalnaya-01.webp"],
    badge: "new",
    description:
      `Универсальная основа.\n1 сторона — фрезеровка паза под обод 60 см.\n2 сторона — ровная.`,
  },
];
