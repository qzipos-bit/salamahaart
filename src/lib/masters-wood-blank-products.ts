import type { MasterProduct, MasterProductVariant } from "@/lib/masters-products";
import { formatDiameterCm } from "@/lib/masters-format";

const PLACEHOLDER = "/product-photo-soon.svg";

/** Общие условия из прайса Salamaha Market. */
export const MASTERS_WOOD_BLANK_NOTES = [
  "Заготовки сухие, калиброванные, готовы к заливке.",
  "Выраженная капа / остров / сложная форма — +500–1 500 ₽.",
  "Подбор конкретного проекта — бесплатно.",
  "Компоновка наборов для «реки» — возможна.",
  "Выборка ниши под часовой механизм — бесплатно.",
] as const;

/** Общий текст для описания всех заготовок (на карточках товаров). */
export const MASTERS_WOOD_BLANK_CATEGORY_INTRO = [
  "Работаем только с древесиной камерной сушки.",
  "В наличии слэбы, спилы и заготовки различных форм, размеров и толщин. Основная порода — карагач, ценящийся за выразительную текстуру, прочность и красивый природный рисунок.",
  "Каждая заготовка проходит калибровку на профессиональном оборудовании, что обеспечивает ровную геометрию и стабильную толщину по всей поверхности.",
  "Перед отправкой мы обязательно проверяем влажность древесины, чтобы материал был готов к дальнейшей работе и не доставил неприятных сюрпризов после получения.",
  "Для безопасной доставки каждая заготовка тщательно упаковывается в бумагу и защитную плёнку. Это позволяет сохранить древесину в целости и минимизировать риск повреждений во время транспортировки.",
  "Мы уделяем особое внимание качеству материала, поэтому вы получаете подготовленную древесину, готовую для творчества, изготовления мебели, изделий из эпоксидной смолы и других проектов.",
] as const;

export type WoodBlankThicknessKey = "do-35" | "4-5";

export type WoodBlankProductKind =
  | "slab-calm"
  | "slab-live"
  | "spil-calm"
  | "spil-live"
  | "rectangular";

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

type WoodRectangularRow = {
  widthCm: number;
  heightCm: number;
};

const WOOD_RECTANGULAR_ROWS: WoodRectangularRow[] = [
  { widthCm: 30, heightCm: 40 },
  { widthCm: 40, heightCm: 60 },
  { widthCm: 50, heightCm: 70 },
  { widthCm: 60, heightCm: 90 },
  { widthCm: 80, heightCm: 120 },
];

export const MASTERS_WOOD_BLANK_DIAMETERS_CM = [30, 40, 50, 60] as const;

export const WOOD_BLANK_CUSTOM_DIA_PARAM = "custom" as const;
export const WOOD_BLANK_CUSTOM_SLUG = "derevo-individualnyj-razmer" as const;

export const WOOD_BLANK_SLAB_CALM_SLUG = "derevo-sleb-spokojnyj" as const;
export const WOOD_BLANK_SLAB_LIVE_SLUG = "derevo-sleb-kapovyj" as const;
export const WOOD_BLANK_SPIL_CALM_SLUG = "derevo-spil-spokojnyj" as const;
export const WOOD_BLANK_SPIL_LIVE_SLUG = "derevo-spil-kapovyj" as const;
export const WOOD_BLANK_RECTANGULAR_SLUG = "derevo-pryamougolnye" as const;

const WOOD_BLANK_KIND_BY_SLUG: Record<string, WoodBlankProductKind> = {
  [WOOD_BLANK_SLAB_CALM_SLUG]: "slab-calm",
  [WOOD_BLANK_SLAB_LIVE_SLUG]: "slab-live",
  [WOOD_BLANK_SPIL_CALM_SLUG]: "spil-calm",
  [WOOD_BLANK_SPIL_LIVE_SLUG]: "spil-live",
  [WOOD_BLANK_RECTANGULAR_SLUG]: "rectangular",
};

export type MastersWoodBlankDiameterCm =
  (typeof MASTERS_WOOD_BLANK_DIAMETERS_CM)[number];

export type WoodBlankDiaFilter =
  | MastersWoodBlankDiameterCm
  | typeof WOOD_BLANK_CUSTOM_DIA_PARAM;

export function isWoodBlankCustomSlug(slug: string): boolean {
  return slug === WOOD_BLANK_CUSTOM_SLUG;
}

export function getWoodBlankProductKind(slug: string): WoodBlankProductKind | null {
  return WOOD_BLANK_KIND_BY_SLUG[slug] ?? null;
}

export function isWoodBlankProductSlug(slug: string): boolean {
  return isWoodBlankCustomSlug(slug) || getWoodBlankProductKind(slug) != null;
}

export function woodBlankProductMatchesDiameter(slug: string, dia: number): boolean {
  const kind = getWoodBlankProductKind(slug);
  if (!kind || kind === "rectangular") return false;
  return MASTERS_WOOD_BLANK_DIAMETERS_CM.includes(
    dia as MastersWoodBlankDiameterCm,
  );
}

/** @deprecated Используйте `woodBlankProductMatchesDiameter` или `getWoodBlankProductKind`. */
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

function formatRub(n: number): string {
  return `${new Intl.NumberFormat("ru-RU").format(n)} ₽`;
}

function priceExtent(values: number[]): { min: number; max: number } {
  return { min: Math.min(...values), max: Math.max(...values) };
}

function roundRows(edgeKey: "spokojnyj" | "kapovyj"): WoodBlankRow[] {
  return WOOD_BLANK_ROWS.filter((r) => r.edgeKey === edgeKey);
}

function thicknessRange(
  row: WoodBlankRow,
  key: WoodBlankThicknessKey,
): [number, number] {
  return key === "do-35" ? row.thicknessUp35 : row.thickness45;
}

function thicknessLabel(key: WoodBlankThicknessKey): string {
  return key === "do-35" ? "до 3,5 см" : "4–5 см";
}

export function roundVariantId(diameterCm: number, thicknessKey: WoodBlankThicknessKey): string {
  return `d${diameterCm}-t-${thicknessKey}`;
}

export function parseRoundWoodVariantId(id: string): {
  diameterCm: number;
  thicknessKey: WoodBlankThicknessKey;
} | null {
  const match = id.match(/^d(\d+)-t-(do-35|4-5)$/);
  if (!match) return null;
  const diameterCm = Number(match[1]);
  if (!Number.isFinite(diameterCm)) return null;
  return {
    diameterCm,
    thicknessKey: match[2] as WoodBlankThicknessKey,
  };
}

export function spilVariantId(diameterCm: number): string {
  return `d${diameterCm}`;
}

export function parseSpilWoodVariantId(id: string): number | null {
  const match = id.match(/^d(\d+)$/);
  if (!match) return null;
  const n = Number(match[1]);
  return Number.isFinite(n) ? n : null;
}

export function rectangularVariantId(widthCm: number, heightCm: number): string {
  return `${widthCm}x${heightCm}`;
}

export function buildRoundSlabVariants(
  edgeKey: "spokojnyj" | "kapovyj",
  showPrices: boolean,
): MasterProductVariant[] {
  return roundRows(edgeKey).flatMap((row) => {
    const combos: { key: WoodBlankThicknessKey; label: string }[] = [
      { key: "do-35", label: `${row.diameterCm} см, до 3,5 см` },
      { key: "4-5", label: `${row.diameterCm} см, 4–5 см` },
    ];
    return combos.map(({ key, label }) => {
      const range = thicknessRange(row, key);
      const variant: MasterProductVariant = {
        id: roundVariantId(row.diameterCm, key),
        label,
        priceRub: range[0],
      };
      if (showPrices && range[1] > range[0]) {
        variant.priceRubMax = range[1];
      }
      return variant;
    });
  });
}

export function buildSpilVariants(
  edgeKey: "spokojnyj" | "kapovyj",
): MasterProductVariant[] {
  return roundRows(edgeKey).map((row) => {
    const range = row.thicknessUp35;
    return {
      id: spilVariantId(row.diameterCm),
      label: formatDiameterCm(row.diameterCm),
      priceRub: range[0],
      priceRubMax: range[1] > range[0] ? range[1] : undefined,
    };
  });
}

export function buildRectangularVariants(): MasterProductVariant[] {
  return WOOD_RECTANGULAR_ROWS.map((row) => ({
    id: rectangularVariantId(row.widthCm, row.heightCm),
    label: `${row.widthCm}×${row.heightCm} см`,
    priceRub: 1_700,
  }));
}

export function getRoundSlabComboPrice(
  edgeKey: "spokojnyj" | "kapovyj",
  diameterCm: number,
  thicknessKey: WoodBlankThicknessKey,
): [number, number] | null {
  const row = roundRows(edgeKey).find((r) => r.diameterCm === diameterCm);
  if (!row) return null;
  return thicknessRange(row, thicknessKey);
}

export function getSpilDiameterPrice(
  edgeKey: "spokojnyj" | "kapovyj",
  diameterCm: number,
): [number, number] | null {
  const row = roundRows(edgeKey).find((r) => r.diameterCm === diameterCm);
  if (!row) return null;
  return row.thicknessUp35;
}

function woodBlankDescription(lines: string[]): string {
  return [
    ...lines,
    "",
    ...MASTERS_WOOD_BLANK_CATEGORY_INTRO,
    "",
    ...MASTERS_WOOD_BLANK_NOTES,
  ].join("\n");
}

const SLAB_CALM_IMAGES = [
  "/masters-wood-blanks/sleb-spokojnyj-01.png",
  "/masters-wood-blanks/sleb-spokojnyj-02.png",
] as const;

const SLAB_LIVE_IMAGES = [
  "/masters-wood-blanks/sleb-kapovyj-01.png",
  "/masters-wood-blanks/sleb-kapovyj-02.png",
] as const;

const SPIL_CALM_IMAGES = [
  "/masters-wood-blanks/spil-spokojnyj-01.png",
  "/masters-wood-blanks/spil-spokojnyj-02.png",
  "/masters-wood-blanks/spil-spokojnyj-03.png",
] as const;

const SPIL_LIVE_IMAGES = [
  "/masters-wood-blanks/spil-kapovyj-01.png",
  "/masters-wood-blanks/spil-kapovyj-02.png",
] as const;

const RECTANGULAR_IMAGES = [
  "/masters-wood-blanks/pryamougolnye-01.png",
  "/masters-wood-blanks/pryamougolnye-02.png",
  "/masters-wood-blanks/pryamougolnye-03.png",
] as const;

const CUSTOM_IMAGES = [
  "/masters-wood-blanks/individualnyj-01.png",
  "/masters-wood-blanks/individualnyj-02.png",
  "/masters-wood-blanks/individualnyj-03.png",
  "/masters-wood-blanks/individualnyj-04.png",
] as const;

function buildConsolidatedWoodProduct(
  slug: string,
  title: string,
  descriptionLines: string[],
  priceMin: number,
  priceMax: number,
  variants?: MasterProductVariant[],
  defaultVariantId?: string,
  badge?: MasterProduct["badge"],
  image?: string,
  images?: string[],
): MasterProduct {
  const gallery = images && images.length > 0 ? images : undefined;
  const cover = image ?? gallery?.[0] ?? PLACEHOLDER;

  return {
    slug,
    title,
    price: formatRubRange(priceMin, priceMax),
    priceFromRub: priceMin,
    priceToRub: priceMax,
    category: "derev-zagotovki",
    image: cover,
    images: gallery,
    description: woodBlankDescription(descriptionLines),
    variants,
    defaultVariantId,
    badge,
  };
}

const calmSlabRows = roundRows("spokojnyj");
const liveSlabRows = roundRows("kapovyj");
const calmSlabExtent = priceExtent(
  calmSlabRows.flatMap((r) => [...r.thicknessUp35, ...r.thickness45]),
);
const liveSlabExtent = priceExtent(
  liveSlabRows.flatMap((r) => [...r.thicknessUp35, ...r.thickness45]),
);
const spilCalmExtent = priceExtent(
  calmSlabRows.flatMap((r) => r.thicknessUp35),
);
const spilLiveExtent = priceExtent(
  liveSlabRows.flatMap((r) => r.thicknessUp35),
);

const calmSlabVariants = buildRoundSlabVariants("spokojnyj", false);
const liveSlabVariants = buildRoundSlabVariants("kapovyj", true);
const spilCalmVariants = buildSpilVariants("spokojnyj");
const spilLiveVariants = buildSpilVariants("kapovyj");
const rectangularVariants = buildRectangularVariants();

export const MASTERS_WOOD_BLANK_PRODUCTS: MasterProduct[] = [
  buildConsolidatedWoodProduct(
    WOOD_BLANK_SLAB_CALM_SLUG,
    "Слэб круглый — спокойный край",
    [
      "Круглая деревянная заготовка (слэб) для заливки эпоксидной смолой.",
      "Тип края: спокойный.",
      "Выберите диаметр и толщину на карточке товара.",
    ],
    calmSlabExtent.min,
    calmSlabExtent.max,
    calmSlabVariants,
    roundVariantId(30, "do-35"),
    "hit",
    SLAB_CALM_IMAGES[0],
    [...SLAB_CALM_IMAGES],
  ),
  buildConsolidatedWoodProduct(
    WOOD_BLANK_SLAB_LIVE_SLUG,
    "Слэб круглый — живой край",
    [
      "Круглая деревянная заготовка (слэб) для заливки эпоксидной смолой.",
      "Тип края: каповый / живой.",
      "Размеры и ориентировочные цены — в таблице ниже.",
    ],
    liveSlabExtent.min,
    liveSlabExtent.max,
    liveSlabVariants,
    roundVariantId(30, "do-35"),
    undefined,
    SLAB_LIVE_IMAGES[0],
    [...SLAB_LIVE_IMAGES],
  ),
  buildConsolidatedWoodProduct(
    WOOD_BLANK_SPIL_CALM_SLUG,
    "Спил — спокойный край",
    [
      "Деревянный спил для заливки эпоксидной смолой.",
      "Тип края: спокойный.",
      "Выберите диаметр на карточке товара.",
    ],
    spilCalmExtent.min,
    spilCalmExtent.max,
    spilCalmVariants,
    spilVariantId(30),
    undefined,
    SPIL_CALM_IMAGES[0],
    [...SPIL_CALM_IMAGES],
  ),
  buildConsolidatedWoodProduct(
    WOOD_BLANK_SPIL_LIVE_SLUG,
    "Спил — живой край",
    [
      "Деревянный спил для заливки эпоксидной смолой.",
      "Тип края: каповый / живой.",
      "Выберите диаметр на карточке товара.",
    ],
    spilLiveExtent.min,
    spilLiveExtent.max,
    spilLiveVariants,
    spilVariantId(30),
    undefined,
    SPIL_LIVE_IMAGES[0],
    [...SPIL_LIVE_IMAGES],
  ),
  {
    slug: WOOD_BLANK_RECTANGULAR_SLUG,
    title: "Прямоугольные заготовки",
    price: "по запросу",
    priceFromRub: 1_700,
    category: "derev-zagotovki",
    image: RECTANGULAR_IMAGES[0],
    images: [...RECTANGULAR_IMAGES],
    description: woodBlankDescription([
      "Прямоугольные деревянные заготовки для заливки эпоксидной смолой.",
      "Выберите размер на карточке товара — сориентируем по цене после заявки.",
    ]),
    variants: rectangularVariants,
    defaultVariantId: rectangularVariantId(30, 40),
  },
  {
    slug: WOOD_BLANK_CUSTOM_SLUG,
    title: "Заготовка — индивидуальный размер",
    price: "по запросу",
    priceFromRub: 1_700,
    category: "derev-zagotovki",
    image: CUSTOM_IMAGES[0],
    images: [...CUSTOM_IMAGES],
    description: woodBlankDescription([
      "Круглая деревянная заготовка на заказ — любой диаметр и толщина из наличия на производстве.",
      "Укажите нужный размер на карточке товара: диаметр, толщину, тип края и другие пожелания.",
      "Мы подберём заготовку и сориентируем по цене после заявки.",
    ]),
  },
];

export const MASTERS_WOOD_BLANK_NAV_ITEMS = MASTERS_WOOD_BLANK_PRODUCTS.map(
  (product) => ({
    slug: product.slug,
    title: product.title,
  }),
);

export function formatWoodBlankVariantPrice(
  priceRub: number,
  priceRubMax?: number,
): string {
  if (priceRubMax != null && priceRubMax > priceRub) {
    return formatRubRange(priceRub, priceRubMax);
  }
  return formatRub(priceRub);
}
