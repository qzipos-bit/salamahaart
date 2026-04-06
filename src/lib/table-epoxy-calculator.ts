import {
  TABLE_EPOXY_CALC,
  type TableEpoxyEdge,
  type TableEpoxyLegs,
  type TableEpoxyProductType,
  type TableEpoxyShape,
  type TableEpoxyThicknessCm,
} from "@/lib/table-epoxy-calculator-config";

export type TableEpoxyInputs = {
  shape: TableEpoxyShape;
  diameterCm: number;
  lengthCm: number;
  widthCm: number;
  product: TableEpoxyProductType;
  thicknessCm: TableEpoxyThicknessCm;
  edge: TableEpoxyEdge;
  legs: TableEpoxyLegs;
  optionFlowers: boolean;
  optionFilm: boolean;
  optionRush: boolean;
};

export type TableEpoxyBreakdown = {
  areaM2: number;
  /** После м², толщины и края — без ножек, декора, плёнки, срочности */
  baseBundleRub: number;
  legsRub: number;
  decorRub: number;
  filmRub: number;
  subtotalBeforeRRub: number;
  /** После срочности (×1.3), до минимума */
  totalBeforeFloorRub: number;
  /** Итог с учётом минимума 15 000 ₽ */
  totalRub: number;
  rangeLowRub: number;
  rangeHighRub: number;
};

const PI = Math.PI;

function areaM2FromInputs(i: TableEpoxyInputs): number {
  if (i.shape === "circle") {
    const rM = i.diameterCm / 100 / 2;
    return PI * rM * rM;
  }
  return (i.lengthCm / 100) * (i.widthCm / 100);
}

function baseCircleAreaM2(diameterCm: number): number {
  const rM = diameterCm / 100 / 2;
  return PI * rM * rM;
}

export function computeTableEpoxyPrice(i: TableEpoxyInputs): TableEpoxyBreakdown {
  const {
    pricePerM2,
    thicknessCoeff,
    edgeCoeff,
    legsRub: legsTable,
    decorFlowersRub,
    filmBaseCircleDiameterCm,
    filmBasePriceRub,
    rushMult,
    minTotalRub,
    displayRange,
  } = TABLE_EPOXY_CALC;

  const areaM2 = areaM2FromInputs(i);
  const rubM2 =
    i.product === "woodResin" ? pricePerM2.woodResin : pricePerM2.resinOnly;

  const rawBase = areaM2 * rubM2;
  const baseBundleRub = rawBase * thicknessCoeff[i.thicknessCm] * edgeCoeff[i.edge];

  const legs = legsTable[i.legs];
  const decor = i.optionFlowers ? decorFlowersRub : 0;

  const filmRefArea = baseCircleAreaM2(filmBaseCircleDiameterCm);
  const film =
    i.optionFilm && filmRefArea > 0
      ? Math.round(filmBasePriceRub * (areaM2 / filmRefArea))
      : 0;

  const subtotalBeforeR = baseBundleRub + legs + decor + film;
  const totalBeforeFloor = i.optionRush ? subtotalBeforeR * rushMult : subtotalBeforeR;
  const totalRub = Math.max(minTotalRub, Math.round(totalBeforeFloor));
  const rangeLowRub = Math.round(totalRub * displayRange.minMult);
  const rangeHighRub = Math.round(totalRub * displayRange.maxMult);

  return {
    areaM2,
    baseBundleRub,
    legsRub: legs,
    decorRub: decor,
    filmRub: film,
    subtotalBeforeRRub: subtotalBeforeR,
    totalBeforeFloorRub: totalBeforeFloor,
    totalRub,
    rangeLowRub,
    rangeHighRub,
  };
}

const SHAPE_LABEL: Record<TableEpoxyShape, string> = {
  circle: "круг",
  rectangle: "прямоугольник",
};

const PRODUCT_LABEL: Record<TableEpoxyProductType, string> = {
  woodResin: "дерево + смола",
  resinOnly: "только смола",
};

const EDGE_LABEL: Record<TableEpoxyEdge, string> = {
  smooth: "ровный",
  live: "живой край",
};

const LEGS_LABEL: Record<TableEpoxyLegs, string> = {
  none: "без ножек",
  standard: "стандартные",
  premium: "премиум",
};

export function formatRub(n: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatAreaM2(area: number): string {
  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(area);
}

/** Текст для WhatsApp / копирования с параметрами и диапазоном. */
export function buildTableEpoxyInquiryMessage(
  i: TableEpoxyInputs,
  b: TableEpoxyBreakdown,
): string {
  const dims =
    i.shape === "circle"
      ? `диаметр ${i.diameterCm} см`
      : `длина ${i.lengthCm} см, ширина ${i.widthCm} см`;

  const extras: string[] = [];
  if (i.optionFlowers) extras.push("цветы / декор");
  if (i.optionFilm) extras.push("защита плёнкой");
  if (i.optionRush) extras.push("срочный заказ");
  const extrasLine =
    extras.length > 0 ? extras.join(", ") : "без дополнительных опций";

  const rangeLine = `от ${formatRub(b.rangeLowRub)} до ${formatRub(b.rangeHighRub)}`;

  return [
    "Здравствуйте! Хочу уточнить стоимость стола из смолы.",
    "",
    `Форма: ${SHAPE_LABEL[i.shape]}`,
    `Размеры: ${dims}`,
    `Материал: ${PRODUCT_LABEL[i.product]}`,
    `Толщина: ${i.thicknessCm} см`,
    `Край: ${EDGE_LABEL[i.edge]}`,
    `Ножки: ${LEGS_LABEL[i.legs]}`,
    `Дополнительно: ${extrasLine}`,
    "",
    `Ориентировочный диапазон по калькулятору: ${rangeLine}.`,
  ].join("\n");
}
