/**
 * Все тарифы и коэффициенты калькулятора стола из смолы — редактируйте здесь.
 */

export const TABLE_EPOXY_CALC = {
  /** Минимальная сторона / диаметр, см */
  minDimensionCm: 20,
  /** Минимальная итоговая сумма после всех множителей */
  minTotalRub: 15_000,
  /** Диапазон показа: от итога × min до итога × max */
  displayRange: { minMult: 0.95, maxMult: 1.1 },
  /** ₽ за м² */
  pricePerM2: {
    woodResin: 165_000,
    resinOnly: 100_000,
  },
  thicknessCm: [3, 3.5, 4, 5] as const,
  /** Коэффициент толщины по значению в см */
  thicknessCoeff: {
    3: 1,
    3.5: 1.1,
    4: 1.2,
    5: 1.35,
  } as Record<3 | 3.5 | 4 | 5, number>,
  edgeCoeff: {
    smooth: 1,
    live: 1.08,
  },
  legsRub: {
    none: 0,
    standard: 2_000,
    premium: 10_000,
  },
  decorFlowersRub: 7_000,
  /** Базовая цена защитной плёнки для круга Ø40 см */
  filmBaseCircleDiameterCm: 40,
  filmBasePriceRub: 4_250,
  rushMult: 1.3,
  copy: {
    title: "Рассчитать примерную стоимость стола",
    subtitle:
      "Укажите параметры изделия, и вы получите ориентировочную стоимость.",
    dimensionsHint: "Введите размеры в сантиметрах",
    placeholderDiameter: "например 50",
    placeholderLength: "например 80",
    placeholderWidth: "например 50",
    seoParagraph:
      "Рассчитайте стоимость стола из эпоксидной смолы онлайн. Цена зависит от размера, толщины, количества смолы, вида дерева и сложности работы.",
    resultTitle: "Примерная стоимость",
    disclaimer:
      "Точная стоимость зависит от породы дерева, рисунка слэба, объема смолы и сложности работы.",
    cta: "Уточнить точную стоимость",
  },
  productCards: {
    woodResin: {
      id: "woodResin" as const,
      title: "Дерево + смола",
      description: "Натуральное дерево с заливкой смолы",
      image: "/product-stol-river.webp",
      imageAlt: "Стол из дерева с эпоксидной «рекой»",
    },
    resinOnly: {
      id: "resinOnly" as const,
      title: "Только смола",
      description: "Полностью из смолы, прозрачный или с декором",
      image: "/portfolio-2.webp",
      imageAlt: "Изделие из эпоксидной смолы",
    },
  },
} as const;

export type TableEpoxyProductType = keyof typeof TABLE_EPOXY_CALC.productCards;
export type TableEpoxyShape = "circle" | "rectangle";
export type TableEpoxyThicknessCm = (typeof TABLE_EPOXY_CALC.thicknessCm)[number];
export type TableEpoxyEdge = keyof typeof TABLE_EPOXY_CALC.edgeCoeff;
export type TableEpoxyLegs = keyof typeof TABLE_EPOXY_CALC.legsRub;
