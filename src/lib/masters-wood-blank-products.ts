import type { MasterProduct } from "@/lib/masters-products";
import { formatDiameterCm, formatDiameterDescription } from "@/lib/masters-format";

const PLACEHOLDER = "/product-photo-soon.svg";

/** Общие условия из прайса Salamaha Market. */
export const MASTERS_WOOD_BLANK_NOTES = [
  "Заготовки сухие, калиброванные, готовы к заливке.",
  "Выраженная капа / остров / сложная форма — +500–1 500 ₽.",
  "Подбор конкретного проекта — бесплатно.",
  "Компоновка наборов для «реки» — возможна.",
  "Выборка ниши под часовой механизм — бесплатно.",
] as const;

type WoodBlankRow = {
  diameterCm: number;
  edgeKey: "spokojnyj" | "kapovyj";
  edgeLabel: string;
  thicknessUp35: [number, number];
  thickness45: [number, number];
};

const WOOD_BLANK_ROWS: WoodBlankRow[] = [
  {
    diameterCm: 30,
    edgeKey: "spokojnyj",
    edgeLabel: "спокойный край",
    thicknessUp35: [1_700, 2_200],
    thickness45: [2_300, 2_800],
  },
  {
    diameterCm: 30,
    edgeKey: "kapovyj",
    edgeLabel: "каповый / живой край",
    thicknessUp35: [2_300, 3_000],
    thickness45: [3_000, 3_800],
  },
  {
    diameterCm: 40,
    edgeKey: "spokojnyj",
    edgeLabel: "спокойный край",
    thicknessUp35: [3_000, 3_500],
    thickness45: [3_700, 4_500],
  },
  {
    diameterCm: 40,
    edgeKey: "kapovyj",
    edgeLabel: "каповый / живой край",
    thicknessUp35: [3_500, 4_200],
    thickness45: [4_500, 5_500],
  },
  {
    diameterCm: 50,
    edgeKey: "spokojnyj",
    edgeLabel: "спокойный край",
    thicknessUp35: [4_800, 5_500],
    thickness45: [5_800, 6_800],
  },
  {
    diameterCm: 50,
    edgeKey: "kapovyj",
    edgeLabel: "каповый / живой край",
    thicknessUp35: [5_500, 6_500],
    thickness45: [6_500, 8_000],
  },
  {
    diameterCm: 60,
    edgeKey: "spokojnyj",
    edgeLabel: "спокойный край",
    thicknessUp35: [6_200, 7_200],
    thickness45: [7_500, 9_000],
  },
  {
    diameterCm: 60,
    edgeKey: "kapovyj",
    edgeLabel: "каповый / живой край",
    thicknessUp35: [7_000, 8_500],
    thickness45: [9_000, 11_000],
  },
];

export const MASTERS_WOOD_BLANK_DIAMETERS_CM = [30, 40, 50, 60] as const;

export const WOOD_BLANK_CUSTOM_DIA_PARAM = "custom" as const;
export const WOOD_BLANK_CUSTOM_SLUG = "derevo-individualnyj-razmer" as const;

export type MastersWoodBlankDiameterCm =
  (typeof MASTERS_WOOD_BLANK_DIAMETERS_CM)[number];

export type WoodBlankDiaFilter =
  | MastersWoodBlankDiameterCm
  | typeof WOOD_BLANK_CUSTOM_DIA_PARAM;

export function isWoodBlankCustomSlug(slug: string): boolean {
  return slug === WOOD_BLANK_CUSTOM_SLUG;
}

export function woodBlankDiameterFromSlug(slug: string): number | null {
  const match = slug.match(/^derevo-d(\d+)-/);
  if (!match) return null;
  const n = Number(match[1]);
  return Number.isFinite(n) ? n : null;
}

function formatRubRange(min: number, max: number): string {
  const fmt = (n: number) =>
    new Intl.NumberFormat("ru-RU").format(n).replace(/\s/g, " ");
  return `${fmt(min)}–${fmt(max)} ₽`;
}

function woodBlankDescription(
  diameterCm: number,
  edgeLabel: string,
  thicknessLabel: string,
  range: [number, number],
): string {
  return [
    `Круглая деревянная заготовка для заливки эпоксидной смолой.`,
    formatDiameterDescription(diameterCm),
    `Тип края: ${edgeLabel}.`,
    `Толщина: ${thicknessLabel}.`,
    `Ориентировочная цена по прайсу: ${formatRubRange(range[0], range[1])}.`,
    "",
    ...MASTERS_WOOD_BLANK_NOTES,
  ].join("\n");
}

function buildWoodBlankProduct(
  row: WoodBlankRow,
  thicknessKey: "do-35" | "4-5",
  range: [number, number],
  thicknessLabel: string,
): MasterProduct {
  const slug = `derevo-d${row.diameterCm}-${row.edgeKey}-t-${thicknessKey}`;
  const title = `Заготовка ${formatDiameterCm(row.diameterCm)} — ${row.edgeLabel}, ${thicknessLabel}`;

  return {
    slug,
    title,
    price: formatRubRange(range[0], range[1]),
    priceFromRub: range[0],
    priceToRub: range[1],
    category: "derev-zagotovki",
    image: PLACEHOLDER,
    description: woodBlankDescription(
      row.diameterCm,
      row.edgeLabel,
      thicknessLabel,
      range,
    ),
    badge:
      row.diameterCm === 30 && row.edgeKey === "spokojnyj" && thicknessKey === "do-35"
        ? "hit"
        : undefined,
  };
}

export const MASTERS_WOOD_BLANK_PRODUCTS: MasterProduct[] = [
  ...WOOD_BLANK_ROWS.flatMap((row) => [
    buildWoodBlankProduct(row, "do-35", row.thicknessUp35, "до 3,5 см"),
    buildWoodBlankProduct(row, "4-5", row.thickness45, "4–5 см"),
  ]),
  {
    slug: WOOD_BLANK_CUSTOM_SLUG,
    title: "Заготовка — индивидуальный размер",
    price: "по запросу",
    priceFromRub: 1_700,
    category: "derev-zagotovki",
    image: PLACEHOLDER,
    description: [
      "Круглая деревянная заготовка на заказ — любой диаметр и толщина из наличия на производстве.",
      "Укажите нужный размер на карточке товара: диаметр, толщину, тип края и другие пожелания.",
      "Мы подберём заготовку и сориентируем по цене после заявки.",
      "",
      ...MASTERS_WOOD_BLANK_NOTES,
    ].join("\n"),
  },
];
