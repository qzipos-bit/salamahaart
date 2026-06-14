import type { MasterProduct } from "@/lib/masters-products";

const PLACEHOLDER = "/product-photo-soon.svg";

export const MASTERS_SILIKAGEL_NOTES = [
  "Урок по сушке цветов — к каждому заказу.",
  "Доставка оплачивается отдельно.",
] as const;

function formatRub(n: number): string {
  return `${new Intl.NumberFormat("ru-RU").format(n)} ₽`;
}

function silikagelDescription(weightKg: number, extra?: string): string {
  const lines = [`Фасовка: ${weightKg} кг.`];
  if (extra) lines.push(extra);
  return [...lines, "", ...MASTERS_SILIKAGEL_NOTES].join("\n");
}

type SilikagelRow = {
  slug: string;
  weightKg: number;
  priceRub: number;
  badge?: "hit" | "sale" | "new";
  priceLabel?: string;
  descriptionExtra?: string;
  image?: string;
  images?: string[];
};

const SILIKAGEL_3KG_IMAGES = [
  "/masters-silikagel/silikagel-3kg-01.webp",
  "/masters-silikagel/silikagel-3kg-02.webp",
  "/masters-silikagel/silikagel-3kg-03.webp",
  "/masters-silikagel/silikagel-3kg-04.webp",
] as const;

const SILIKAGEL_ROWS: SilikagelRow[] = [
  {
    slug: "silikagel-3kg",
    weightKg: 3,
    priceRub: 1_050,
    image: SILIKAGEL_3KG_IMAGES[0],
    images: [...SILIKAGEL_3KG_IMAGES],
  },
  {
    slug: "silikagel-5kg",
    weightKg: 5,
    priceRub: 1_590,
    badge: "hit",
    image: "/masters-silikagel/silikagel-5kg-02.webp",
    images: ["/masters-silikagel/silikagel-5kg-02.webp"],
  },
  {
    slug: "silikagel-10kg",
    weightKg: 10,
    priceRub: 2_990,
    image: "/masters-silikagel/silikagel-10kg-02.webp",
    images: [
      "/masters-silikagel/silikagel-10kg-02.webp",
      "/masters-silikagel/silikagel-10kg-03.webp",
    ],
  },
  {
    slug: "silikagel-25kg",
    weightKg: 25,
    priceRub: 6_250,
    badge: "new",
    priceLabel: "6 250 ₽ (оптовая цена)",
    descriptionExtra: "Оптовая цена.",
    image: "/masters-silikagel/silikagel-25kg-02.webp",
    images: [
      "/masters-silikagel/silikagel-25kg-02.webp",
      "/masters-silikagel/silikagel-25kg-03.webp",
    ],
  },
];

export const MASTERS_SILIKAGEL_PRODUCTS: MasterProduct[] = SILIKAGEL_ROWS.map(
  (row) => ({
    slug: row.slug,
    title: `Силикагель, ${row.weightKg} кг`,
    price: row.priceLabel ?? formatRub(row.priceRub),
    priceFromRub: row.priceRub,
    category: "silikagel",
    image: row.image ?? PLACEHOLDER,
    images: row.images,
    badge: row.badge,
    description: silikagelDescription(row.weightKg, row.descriptionExtra),
  }),
);
