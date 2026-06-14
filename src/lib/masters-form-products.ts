import type { MasterProduct } from "@/lib/masters-products";
import { formatDiameterCm, formatDiameterListCm } from "@/lib/masters-format";
import {
  formatMastersRub,
  SLIDING_BORT_LINEAR_METER_RUB,
  SLIDING_BORT_WITHOUT_BOTTOM_VARIANTS,
} from "@/lib/masters-sliding-borts";

const PLACEHOLDER = "/product-photo-soon.svg";

/** Общие условия из прайса «Опалубки и формы для эпоксидной смолы». */
export const MASTERS_FORM_NOTES = [
  "Формы изготавливаются на заказ — геометрия точная.",
  "Подходят для эпоксидной смолы и бетона.",
  "Срок изготовления: 5–7 рабочих дней.",
  "Доставка СДЭК по всей России.",
  "При заказе укажите название, размер и город доставки.",
] as const;

function formatRub(n: number): string {
  return `${new Intl.NumberFormat("ru-RU").format(n)} ₽`;
}

function formDescription(lines: string[]): string {
  return [...lines, "", ...MASTERS_FORM_NOTES].join("\n");
}

function rimVariantId(diameterCm: number): string {
  return `d${diameterCm}`;
}

function buildRoundRimVariants(): MasterProduct["variants"] {
  return RIM_PRICES.map(({ d, price }) => ({
    id: rimVariantId(d),
    label: formatDiameterCm(d),
    priceRub: price,
  }));
}

export const ROUND_RIM_SLUG = "obod-krugovoj" as const;

const ROUND_RIM_IMAGES = ["/masters-forms/obod-krugovoj-01.png"] as const;

function roundRimProduct(): MasterProduct {
  const variants = buildRoundRimVariants() ?? [];
  const prices = RIM_PRICES.map((row) => row.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);

  return {
    slug: ROUND_RIM_SLUG,
    title: "Обод круговой",
    price: `${formatRub(min)}–${formatRub(max)}`,
    priceFromRub: min,
    priceToRub: max,
    category: "formy-krugi-bez-dna",
    image: ROUND_RIM_IMAGES[0],
    images: [...ROUND_RIM_IMAGES],
    variants,
    defaultVariantId: rimVariantId(30),
    description: formDescription([
      "Круговой обод без дна — по отдельности.",
      `Диаметры: ${formatDiameterListCm(RIM_PRICES.map((r) => r.d))}.`,
      "Выберите размер на карточке товара — цена указана для каждого диаметра.",
    ]),
  };
}

function fullCircleVariantId(diameterCm: number): string {
  return `d${diameterCm}`;
}

function buildFullCircleWithBottomVariants(): MasterProduct["variants"] {
  return FULL_CIRCLE_PRICES.map(({ d, price }) => ({
    id: fullCircleVariantId(d),
    label: formatDiameterCm(d),
    priceRub: price,
  }));
}

export const FULL_CIRCLE_WITH_BOTTOM_SLUG = "forma-krugi-s-domom" as const;

const FULL_CIRCLE_IMAGES = ["/masters-forms/krugi-s-domom-01.png"] as const;

function fullCircleWithBottomProduct(): MasterProduct {
  const variants = buildFullCircleWithBottomVariants() ?? [];
  const prices = FULL_CIRCLE_PRICES.map((row) => row.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);

  return {
    slug: FULL_CIRCLE_WITH_BOTTOM_SLUG,
    title: "Круги с дном",
    price: `${formatRub(min)}–${formatRub(max)}`,
    priceFromRub: min,
    priceToRub: max,
    category: "formy-krugi-dom",
    image: FULL_CIRCLE_IMAGES[0],
    images: [...FULL_CIRCLE_IMAGES],
    variants,
    defaultVariantId: fullCircleVariantId(40),
    description: formDescription([
      "Полная круговая форма с дном — готовое решение для заливки.",
      `Диаметры: ${formatDiameterListCm(FULL_CIRCLE_PRICES.map((r) => r.d))}.`,
      "Выберите размер на карточке товара — цена указана для каждого диаметра.",
    ]),
  };
}

const RIM_PRICES: Array<{ d: number; price: number }> = [
  { d: 30, price: 1_050 },
  { d: 40, price: 1_190 },
  { d: 50, price: 1_390 },
  { d: 60, price: 1_590 },
  { d: 70, price: 1_790 },
  { d: 80, price: 1_990 },
  { d: 90, price: 2_190 },
  { d: 100, price: 2_390 },
];

const FULL_CIRCLE_PRICES: Array<{ d: number; price: number }> = [
  { d: 40, price: 5_490 },
  { d: 50, price: 6_490 },
  { d: 60, price: 7_490 },
  { d: 70, price: 8_490 },
  { d: 80, price: 9_490 },
  { d: 90, price: 10_490 },
  { d: 100, price: 11_990 },
];

const SLIDING_FORM_WITH_BASE_IMAGE =
  "/masters-forms/razdvizhnaya-opalubka-osnova-01.png" as const;

const SLIDING_FORM_WITH_BASE_PRICE = 15_490;

const RIM_SET_WITH_BASE_IMAGE =
  "/masters-forms/nabor-obodov-osnova-01.png" as const;

export const MASTERS_FORM_PRODUCTS: MasterProduct[] = [
  // Готовое решение → набор круги с дном
  {
    slug: "nabor-obodov-osnova-gotovoe",
    title: "Набор ободов + основа (готовое решение)",
    price: formatRub(9_490),
    priceFromRub: 9_490,
    category: "formy-nabor-krugi-dom",
    image: RIM_SET_WITH_BASE_IMAGE,
    images: [RIM_SET_WITH_BASE_IMAGE],
    badge: "hit",
    description: formDescription([
      "Готовое решение для старта: закрывает 90% задач.",
      `В наборе: ободы ${formatDiameterListCm([30, 40, 50, 60])} + основа 60 см.`,
    ]),
  },
  // Раздвижная форма (с дном и без дна)
  {
    slug: "razdvizhnaya-opalubka-osnova-60x60",
    title: "Раздвижная опалубка + основа, 60×60 см",
    price: formatRub(SLIDING_FORM_WITH_BASE_PRICE),
    priceFromRub: SLIDING_FORM_WITH_BASE_PRICE,
    category: "formy-razdvizhnaya",
    image: SLIDING_FORM_WITH_BASE_IMAGE,
    images: [SLIDING_FORM_WITH_BASE_IMAGE],
    description: formDescription([
      "Профессиональное решение для большей свободы и нестандартных проектов.",
      "Размер: 60×60 см + основа.",
    ]),
  },
  {
    slug: "forma-pryam-s-domom-100x100",
    title: "Раздвижная опалубка + основа, 100×100 см",
    price: formatRub(SLIDING_FORM_WITH_BASE_PRICE),
    priceFromRub: SLIDING_FORM_WITH_BASE_PRICE,
    category: "formy-razdvizhnaya",
    image: SLIDING_FORM_WITH_BASE_IMAGE,
    images: [SLIDING_FORM_WITH_BASE_IMAGE],
    description: formDescription([
      "Профессиональное решение для больших и нестандартных проектов.",
      "Размер: 100×100 см + основа.",
    ]),
  },
  // Раздвижные борта без дна
  {
    slug: "razdvizhnye-borta-100x100",
    title: "Раздвижные борта без дна",
    price: `от ${formatMastersRub(
      Math.min(...SLIDING_BORT_WITHOUT_BOTTOM_VARIANTS.map((v) => v.priceRub)),
    )}`,
    priceFromRub: Math.min(
      ...SLIDING_BORT_WITHOUT_BOTTOM_VARIANTS.map((v) => v.priceRub),
    ),
    category: "formy-razdvizhnaya",
    image: "/masters-forms/razdvizhnye-borta-100x100-01.png",
    images: [
      "/masters-forms/razdvizhnye-borta-100x100-01.png",
      "/masters-forms/razdvizhnye-borta-100x100-02.png",
    ],
    variants: [...SLIDING_BORT_WITHOUT_BOTTOM_VARIANTS],
    defaultVariantId: "100x100",
    description: formDescription([
      "Раздвижные борта без дна — регулируемый размер внутреннего поля.",
      "Подходит для больших и сложных изделий.",
      `Цена: ${formatMastersRub(SLIDING_BORT_LINEAR_METER_RUB)} за погонный метр (периметр).`,
      "Выберите размер на карточке товара — цена пересчитается автоматически.",
      "Высота борта: 7 см.",
      "Все плашки совместимы с друг другом — можно комбинировать и расширять набор.",
    ]),
  },
  roundRimProduct(),
  fullCircleWithBottomProduct(),
  // Пазловые формы
  {
    slug: "pazl-zamok-10",
    title: "Замок пазловой формы, 10 см",
    price: formatRub(540),
    priceFromRub: 540,
    category: "formy-pazl",
    image: PLACEHOLDER,
    description: formDescription(["Пазловая форма — замок.", "Длина: 10 см."]),
  },
  {
    slug: "pazl-zamok-65",
    title: "Замок пазловой формы, 65 см",
    price: formatRub(1_830),
    priceFromRub: 1_830,
    category: "formy-pazl",
    image: PLACEHOLDER,
    description: formDescription(["Пазловая форма — замок.", "Длина: 65 см."]),
  },
  {
    slug: "pazl-dobornaya-plashka-30",
    title: "Доборная плашка, 30 см",
    price: formatRub(900),
    priceFromRub: 900,
    category: "formy-pazl",
    image: PLACEHOLDER,
    description: formDescription([
      "Пазловая форма — доборная плашка.",
      "Длина: 30 см.",
    ]),
  },
  {
    slug: "pazl-dobornaya-plashka-60",
    title: "Доборная плашка, 60 см",
    price: formatRub(1_850),
    priceFromRub: 1_850,
    category: "formy-pazl",
    image: PLACEHOLDER,
    description: formDescription([
      "Пазловая форма — доборная плашка.",
      "Длина: 60 см.",
    ]),
  },
];
