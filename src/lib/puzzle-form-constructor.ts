/** Конструктор пазловых форм — расчёт доборных плашек и замков. */

export type PuzzleLockSize = 10 | 65;
export type PuzzlePlateSize = 30 | 60;
export type PuzzleCorner = "tl" | "tr" | "br" | "bl";

export const PUZZLE_CORNERS: PuzzleCorner[] = ["tl", "tr", "br", "bl"];

export const PUZZLE_LOCK_OPTIONS: {
  sizeCm: PuzzleLockSize;
  label: string;
  priceRub: number;
  slug: string;
}[] = [
  { sizeCm: 10, label: "Замок 10 см", priceRub: 540, slug: "pazl-zamok-10" },
  { sizeCm: 65, label: "Замок 65 см", priceRub: 1_830, slug: "pazl-zamok-65" },
];

export const PUZZLE_PLATE_OPTIONS: {
  sizeCm: PuzzlePlateSize;
  label: string;
  priceRub: number;
  slug: string;
}[] = [
  {
    sizeCm: 30,
    label: "Доборная плашка 30 см",
    priceRub: 900,
    slug: "pazl-dobornaya-plashka-30",
  },
  {
    sizeCm: 60,
    label: "Доборная плашка 60 см",
    priceRub: 1_850,
    slug: "pazl-dobornaya-plashka-60",
  },
];

export const PUZZLE_CORNER_LABELS: Record<PuzzleCorner, string> = {
  tl: "Верх-лево",
  tr: "Верх-право",
  br: "Низ-право",
  bl: "Низ-лево",
};

export type PuzzleSideId = "top" | "bottom" | "left" | "right";

export const PUZZLE_SIDE_LABELS: Record<PuzzleSideId, string> = {
  top: "Верх",
  bottom: "Низ",
  left: "Лево",
  right: "Право",
};

export type PuzzleSidePlan = {
  id: PuzzleSideId;
  requestedCm: number;
  actualCm: number;
  lockStartCm: number;
  lockEndCm: number;
  plateLengthCm: number;
  plateSegments: PuzzlePlateSize[];
  error?: string;
};

export type PuzzleBomItem = {
  slug: string;
  label: string;
  sizeCm: number;
  quantity: number;
  priceRub: number;
};

export type PuzzleConstructorResult = {
  requestedLengthCm: number;
  requestedWidthCm: number;
  actualLengthCm: number;
  actualWidthCm: number;
  corners: Record<PuzzleCorner, PuzzleLockSize>;
  sides: PuzzleSidePlan[];
  bom: PuzzleBomItem[];
  totalRub: number;
  ok: boolean;
  errors: string[];
};

export type PuzzleFormOption = {
  id: string;
  corners: Record<PuzzleCorner, PuzzleLockSize>;
  result: PuzzleConstructorResult;
  lockSummary: string;
  plateSummary: string;
};

export type PuzzleFormPickKind =
  | "economic"
  | "economicBig"
  | "exact"
  | "fewestJoints";

export type PuzzleFormPick = {
  kind: PuzzleFormPickKind;
  label: string;
  description: string;
  option: PuzzleFormOption | null;
};

/** Округление вверх до длины, собираемой из плашек 30 и 60 см. */
export function ceilToPlateMultiple(cm: number): number {
  if (cm <= 0) return 0;
  return Math.ceil(cm / 30) * 30;
}

/** Округление вверх до длины из плашек 60 см (для форм с замками 10 см). */
export function ceilTo60PlateMultiple(cm: number): number {
  if (cm <= 0) return 0;
  return Math.ceil(cm / 60) * 60;
}

export function decomposePlateLength(cm: number): {
  segments: PuzzlePlateSize[];
  error?: string;
} {
  if (cm < 0) {
    return { segments: [], error: "Отрицательная длина доборных плашек." };
  }
  if (cm === 0) {
    return { segments: [] };
  }
  if (cm % 30 !== 0) {
    return {
      segments: [],
      error: `${cm} см не собирается из плашек 30 и 60 см (нужна длина кратная 30).`,
    };
  }
  const segments: PuzzlePlateSize[] = [];
  let remaining = cm;
  while (remaining >= 60) {
    segments.push(60);
    remaining -= 60;
  }
  while (remaining >= 30) {
    segments.push(30);
    remaining -= 30;
  }
  return { segments };
}

/** Все способы разложить длину на плашки 30 и 60 (разный состав заказа). */
export function allPlateDecompositions(cm: number): PuzzlePlateSize[][] {
  if (cm < 0) return [];
  if (cm === 0) return [[]];
  if (cm % 30 !== 0) return [];

  const results: PuzzlePlateSize[][] = [];
  const max60 = Math.floor(cm / 60);
  for (let n60 = 0; n60 <= max60; n60 += 1) {
    const rest = cm - n60 * 60;
    if (rest % 30 !== 0) continue;
    const n30 = rest / 30;
    const segments: PuzzlePlateSize[] = [
      ...Array<PuzzlePlateSize>(n60).fill(60),
      ...Array<PuzzlePlateSize>(n30).fill(30),
    ];
    results.push(segments);
  }
  return results;
}

/** Разложение только на плашки 60 см (замки 10 см). */
export function allPlateDecompositions60Only(cm: number): PuzzlePlateSize[][] {
  if (cm < 0) return [];
  if (cm === 0) return [[]];
  if (cm % 60 !== 0) return [];
  const n60 = cm / 60;
  return [[...Array<PuzzlePlateSize>(n60).fill(60)]];
}

type DimensionPair = {
  plateA: number;
  plateB: number;
  actualCm: number;
};

/** Сторона равна длине замка — только замок, без доборных плашек. */
export function isLockOnlyDimension(
  actualCm: number,
  lockCm: PuzzleLockSize,
): boolean {
  return actualCm === lockCm;
}

/** Все четыре угла — одинаковый замок (10 или 65 см). */
function solveUniformDimension(
  requestedCm: number,
  lockCm: PuzzleLockSize,
): DimensionPair {
  const minPlate = Math.max(0, requestedCm - lockCm);
  if (minPlate === 0) {
    return { plateA: 0, plateB: 0, actualCm: lockCm };
  }
  const plate =
    lockCm === 10
      ? ceilTo60PlateMultiple(minPlate)
      : ceilToPlateMultiple(minPlate);
  return { plateA: plate, plateB: plate, actualCm: lockCm + plate };
}

function plateSegmentsForDimension(
  actualCm: number,
  lockCm: PuzzleLockSize,
  segments: PuzzlePlateSize[],
): PuzzlePlateSize[] {
  if (isLockOnlyDimension(actualCm, lockCm)) {
    return [];
  }
  return segments;
}

function plateDecompositionsForLock(
  lockCm: PuzzleLockSize,
  cm: number,
): PuzzlePlateSize[][] {
  return lockCm === 10
    ? allPlateDecompositions60Only(cm)
    : allPlateDecompositions(cm);
}

export const UNIFORM_LOCK_CORNERS: Record<PuzzleCorner, PuzzleLockSize>[] = [
  { tl: 10, tr: 10, br: 10, bl: 10 },
  { tl: 65, tr: 65, br: 65, bl: 65 },
];

function isUniformCorners(
  corners: Record<PuzzleCorner, PuzzleLockSize>,
): boolean {
  const first = corners[PUZZLE_CORNERS[0]];
  return PUZZLE_CORNERS.every((c) => corners[c] === first);
}

function buildSide(
  id: PuzzleSideId,
  requestedCm: number,
  actualCm: number,
  lockStartCm: number,
  lockEndCm: number,
  plateSegments: PuzzlePlateSize[],
): PuzzleSidePlan {
  const plateLengthCm = plateSegments.reduce((s, n) => s + n, 0);
  return {
    id,
    requestedCm,
    actualCm,
    lockStartCm,
    lockEndCm,
    plateLengthCm,
    plateSegments,
  };
}

function countLocks(
  corners: Record<PuzzleCorner, PuzzleLockSize>,
): Record<PuzzleLockSize, number> {
  const counts: Record<PuzzleLockSize, number> = { 10: 0, 65: 0 };
  for (const corner of PUZZLE_CORNERS) {
    counts[corners[corner]] += 1;
  }
  return counts;
}

function countPlatesFromSides(sides: PuzzleSidePlan[]): Record<PuzzlePlateSize, number> {
  const counts: Record<PuzzlePlateSize, number> = { 30: 0, 60: 0 };
  for (const side of sides) {
    for (const seg of side.plateSegments) {
      counts[seg] += 1;
    }
  }
  return counts;
}

function buildBom(
  lockCounts: Record<PuzzleLockSize, number>,
  plateCounts: Record<PuzzlePlateSize, number>,
): PuzzleBomItem[] {
  const bom: PuzzleBomItem[] = [];

  for (const lock of PUZZLE_LOCK_OPTIONS) {
    const qty = lockCounts[lock.sizeCm];
    if (qty > 0) {
      bom.push({
        slug: lock.slug,
        label: lock.label,
        sizeCm: lock.sizeCm,
        quantity: qty,
        priceRub: lock.priceRub,
      });
    }
  }

  for (const plate of PUZZLE_PLATE_OPTIONS) {
    const qty = plateCounts[plate.sizeCm];
    if (qty > 0) {
      bom.push({
        slug: plate.slug,
        label: plate.label,
        sizeCm: plate.sizeCm,
        quantity: qty,
        priceRub: plate.priceRub,
      });
    }
  }

  return bom;
}

export function cornersKey(corners: Record<PuzzleCorner, PuzzleLockSize>): string {
  return PUZZLE_CORNERS.map((c) => corners[c]).join("-");
}

export function formatLockSummary(
  corners: Record<PuzzleCorner, PuzzleLockSize>,
): string {
  const counts = countLocks(corners);
  const parts: string[] = [];
  if (counts[65] > 0) parts.push(`${counts[65]}× замок 65 см`);
  if (counts[10] > 0) parts.push(`${counts[10]}× замок 10 см`);
  return parts.join(", ");
}

export function formatPlateSummary(
  plateCounts: Record<PuzzlePlateSize, number>,
): string {
  const parts: string[] = [];
  if (plateCounts[60] > 0) parts.push(`${plateCounts[60]}× плашка 60 см`);
  if (plateCounts[30] > 0) parts.push(`${plateCounts[30]}× плашка 30 см`);
  if (parts.length === 0) return "без доборных плашек";
  return parts.join(", ");
}

function bomSignature(bom: PuzzleBomItem[]): string {
  return bom
    .map((i) => `${i.slug}:${i.quantity}`)
    .sort()
    .join("|");
}

function buildPuzzleResult(params: {
  lengthCm: number;
  widthCm: number;
  corners: Record<PuzzleCorner, PuzzleLockSize>;
  topSegments: PuzzlePlateSize[];
  bottomSegments: PuzzlePlateSize[];
  leftSegments: PuzzlePlateSize[];
  rightSegments: PuzzlePlateSize[];
  actualLengthCm: number;
  actualWidthCm: number;
}): PuzzleConstructorResult {
  const {
    lengthCm,
    widthCm,
    corners,
    topSegments,
    bottomSegments,
    leftSegments,
    rightSegments,
    actualLengthCm,
    actualWidthCm,
  } = params;

  const lockCm = corners.tl;
  const topPlates = plateSegmentsForDimension(
    actualLengthCm,
    lockCm,
    topSegments,
  );
  const bottomPlates = plateSegmentsForDimension(
    actualLengthCm,
    lockCm,
    bottomSegments,
  );
  const leftPlates = plateSegmentsForDimension(
    actualWidthCm,
    lockCm,
    leftSegments,
  );
  const rightPlates = plateSegmentsForDimension(
    actualWidthCm,
    lockCm,
    rightSegments,
  );

  const sides: PuzzleSidePlan[] = [
    buildSide(
      "top",
      lengthCm,
      actualLengthCm,
      corners.tl,
      corners.tr,
      topPlates,
    ),
    buildSide(
      "bottom",
      lengthCm,
      actualLengthCm,
      corners.bl,
      corners.br,
      bottomPlates,
    ),
    buildSide(
      "left",
      widthCm,
      actualWidthCm,
      corners.tl,
      corners.bl,
      leftPlates,
    ),
    buildSide(
      "right",
      widthCm,
      actualWidthCm,
      corners.tr,
      corners.br,
      rightPlates,
    ),
  ];

  const bom = buildBom(countLocks(corners), countPlatesFromSides(sides));
  const totalRub = bom.reduce((sum, i) => sum + i.quantity * i.priceRub, 0);

  return {
    requestedLengthCm: lengthCm,
    requestedWidthCm: widthCm,
    actualLengthCm,
    actualWidthCm,
    corners,
    sides,
    bom,
    totalRub,
    ok: true,
    errors: [],
  };
}

export function calculatePuzzleForm(params: {
  lengthCm: number;
  widthCm: number;
  corners: Record<PuzzleCorner, PuzzleLockSize>;
}): PuzzleConstructorResult {
  const errors: string[] = [];
  const { lengthCm, widthCm, corners } = params;

  if (!Number.isFinite(lengthCm) || lengthCm <= 0) {
    errors.push("Укажите длину формы больше 0.");
  }
  if (!Number.isFinite(widthCm) || widthCm <= 0) {
    errors.push("Укажите ширину формы больше 0.");
  }
  if (errors.length > 0) {
    return {
      requestedLengthCm: lengthCm,
      requestedWidthCm: widthCm,
      actualLengthCm: 0,
      actualWidthCm: 0,
      corners,
      sides: [],
      bom: [],
      totalRub: 0,
      ok: false,
      errors,
    };
  }

  if (!isUniformCorners(corners)) {
    errors.push(
      "Во всех углах должен быть одинаковый замок: 4×10 см или 4×65 см.",
    );
  }
  if (errors.length > 0) {
    return {
      requestedLengthCm: lengthCm,
      requestedWidthCm: widthCm,
      actualLengthCm: 0,
      actualWidthCm: 0,
      corners,
      sides: [],
      bom: [],
      totalRub: 0,
      ok: false,
      errors,
    };
  }

  const lockCm = corners.tl;
  const lengthPair = solveUniformDimension(lengthCm, lockCm);
  const widthPair = solveUniformDimension(widthCm, lockCm);

  const topSegments = decomposePlateLength(lengthPair.plateA).segments;
  const bottomSegments = decomposePlateLength(lengthPair.plateB).segments;
  const leftSegments = decomposePlateLength(widthPair.plateA).segments;
  const rightSegments = decomposePlateLength(widthPair.plateB).segments;

  if (lockCm === 10) {
    const ok10 =
      allPlateDecompositions60Only(lengthPair.plateA).length > 0 &&
      allPlateDecompositions60Only(widthPair.plateA).length > 0;
    if (!ok10) {
      errors.push("С замками 10 см добор только плашками 60 см.");
    }
  }

  if (errors.length > 0) {
    return {
      requestedLengthCm: lengthCm,
      requestedWidthCm: widthCm,
      actualLengthCm: 0,
      actualWidthCm: 0,
      corners,
      sides: [],
      bom: [],
      totalRub: 0,
      ok: false,
      errors,
    };
  }

  const topSegs =
    lockCm === 10
      ? allPlateDecompositions60Only(lengthPair.plateA)[0] ?? []
      : topSegments;
  const bottomSegs =
    lockCm === 10
      ? allPlateDecompositions60Only(lengthPair.plateB)[0] ?? []
      : bottomSegments;
  const leftSegs =
    lockCm === 10
      ? allPlateDecompositions60Only(widthPair.plateA)[0] ?? []
      : leftSegments;
  const rightSegs =
    lockCm === 10
      ? allPlateDecompositions60Only(widthPair.plateB)[0] ?? []
      : rightSegments;

  return buildPuzzleResult({
    lengthCm,
    widthCm,
    corners,
    topSegments: topSegs,
    bottomSegments: bottomSegs,
    leftSegments: leftSegs,
    rightSegments: rightSegs,
    actualLengthCm: lengthPair.actualCm,
    actualWidthCm: widthPair.actualCm,
  });
}

function allCornerAssignments(): Record<PuzzleCorner, PuzzleLockSize>[] {
  return UNIFORM_LOCK_CORNERS;
}

export function findAllPuzzleFormOptions(
  lengthCm: number,
  widthCm: number,
): { options: PuzzleFormOption[]; errors: string[] } {
  const errors: string[] = [];

  if (!Number.isFinite(lengthCm) || lengthCm <= 0) {
    errors.push("Укажите длину формы больше 0.");
  }
  if (!Number.isFinite(widthCm) || widthCm <= 0) {
    errors.push("Укажите ширину формы больше 0.");
  }
  if (errors.length > 0) {
    return { options: [], errors };
  }

  const seen = new Set<string>();
  const options: PuzzleFormOption[] = [];

  for (const corners of allCornerAssignments()) {
    const lockCm = corners.tl;
    const lengthPair = solveUniformDimension(lengthCm, lockCm);
    const widthPair = solveUniformDimension(widthCm, lockCm);

    const topDecomps = plateDecompositionsForLock(lockCm, lengthPair.plateA);
    const bottomDecomps = plateDecompositionsForLock(lockCm, lengthPair.plateB);
    const leftDecomps = plateDecompositionsForLock(lockCm, widthPair.plateA);
    const rightDecomps = plateDecompositionsForLock(lockCm, widthPair.plateB);

    if (
      topDecomps.length === 0 ||
      bottomDecomps.length === 0 ||
      leftDecomps.length === 0 ||
      rightDecomps.length === 0
    ) {
      continue;
    }

    for (const topSegments of topDecomps) {
      for (const bottomSegments of bottomDecomps) {
        for (const leftSegments of leftDecomps) {
          for (const rightSegments of rightDecomps) {
            const result = buildPuzzleResult({
              lengthCm,
              widthCm,
              corners,
              topSegments,
              bottomSegments,
              leftSegments,
              rightSegments,
              actualLengthCm: lengthPair.actualCm,
              actualWidthCm: widthPair.actualCm,
            });

            const dedupeKey = `${cornersKey(corners)}|${bomSignature(result.bom)}`;
            if (seen.has(dedupeKey)) continue;
            seen.add(dedupeKey);

            const plateCounts = countPlatesFromSides(result.sides);
            const segKey = [
              topSegments.join("+"),
              bottomSegments.join("+"),
              leftSegments.join("+"),
              rightSegments.join("+"),
            ].join("/");

            options.push({
              id: `${cornersKey(corners)}_${segKey}_${options.length}`,
              corners,
              result,
              lockSummary: formatLockSummary(corners),
              plateSummary: formatPlateSummary(plateCounts),
            });
          }
        }
      }
    }
  }

  if (options.length === 0) {
    errors.push(
      "Для такого размера не найдено комбинаций. Попробуйте изменить длину или ширину.",
    );
  }

  options.sort((a, b) => {
    const excessA =
      a.result.actualLengthCm -
      lengthCm +
      (a.result.actualWidthCm - widthCm);
    const excessB =
      b.result.actualLengthCm -
      lengthCm +
      (b.result.actualWidthCm - widthCm);
    if (excessA !== excessB) return excessA - excessB;
    if (a.result.totalRub !== b.result.totalRub) {
      return a.result.totalRub - b.result.totalRub;
    }
    return a.id.localeCompare(b.id);
  });

  return { options, errors };
}

function excessCm(
  option: PuzzleFormOption,
  lengthCm: number,
  widthCm: number,
): number {
  return (
    option.result.actualLengthCm -
    lengthCm +
    (option.result.actualWidthCm - widthCm)
  );
}

function areaCm(option: PuzzleFormOption): number {
  return option.result.actualLengthCm * option.result.actualWidthCm;
}

function pickCheapest(options: PuzzleFormOption[]): PuzzleFormOption | null {
  if (options.length === 0) return null;
  return [...options].sort((a, b) => {
    if (a.result.totalRub !== b.result.totalRub) {
      return a.result.totalRub - b.result.totalRub;
    }
    return excessCm(a, a.result.requestedLengthCm, a.result.requestedWidthCm) -
      excessCm(b, b.result.requestedLengthCm, b.result.requestedWidthCm);
  })[0];
}

function pickBiggestEconomical(
  options: PuzzleFormOption[],
): PuzzleFormOption | null {
  if (options.length === 0) return null;
  return [...options].sort((a, b) => {
    const areaDiff = areaCm(b) - areaCm(a);
    if (areaDiff !== 0) return areaDiff;
    if (a.result.totalRub !== b.result.totalRub) {
      return a.result.totalRub - b.result.totalRub;
    }
    return excessCm(a, a.result.requestedLengthCm, a.result.requestedWidthCm) -
      excessCm(b, b.result.requestedLengthCm, b.result.requestedWidthCm);
  })[0];
}

function pickExact(
  options: PuzzleFormOption[],
  lengthCm: number,
  widthCm: number,
): PuzzleFormOption | null {
  const exact = options.filter(
    (o) =>
      o.result.actualLengthCm === lengthCm &&
      o.result.actualWidthCm === widthCm,
  );
  return pickCheapest(exact);
}

function plateCount30(option: PuzzleFormOption): number {
  return option.result.bom
    .filter((i) => i.slug === "pazl-dobornaya-plashka-30")
    .reduce((s, i) => s + i.quantity, 0);
}

/** Число пазовых стыков вдоль бортов (замок–плашка и между плашками). */
export function countPuzzleJoints(option: PuzzleFormOption): number {
  return option.result.sides.reduce(
    (sum, side) => sum + side.plateSegments.length,
    0,
  );
}

function pickFewestJoints(options: PuzzleFormOption[]): PuzzleFormOption | null {
  if (options.length === 0) return null;
  return [...options].sort((a, b) => {
    const jointsDiff = countPuzzleJoints(a) - countPuzzleJoints(b);
    if (jointsDiff !== 0) return jointsDiff;
    const n30Diff = plateCount30(a) - plateCount30(b);
    if (n30Diff !== 0) return n30Diff;
    if (a.result.totalRub !== b.result.totalRub) {
      return a.result.totalRub - b.result.totalRub;
    }
    return excessCm(a, a.result.requestedLengthCm, a.result.requestedWidthCm) -
      excessCm(b, b.result.requestedLengthCm, b.result.requestedWidthCm);
  })[0];
}

/** Рекомендованные варианты: выгодный, большой, точный и с минимумом стыков. */
export function pickPuzzleFormRecommendations(
  options: PuzzleFormOption[],
  lengthCm: number,
  widthCm: number,
): PuzzleFormPick[] {
  const economic = pickCheapest(options);
  const economicBig = pickBiggestEconomical(options);
  const exact = pickExact(options, lengthCm, widthCm);
  const fewestJoints = pickFewestJoints(options);

  return [
    {
      kind: "economic",
      label: "Выгодно",
      description: "Минимальная цена с добором до подходящего размера.",
      option: economic,
    },
    {
      kind: "economicBig",
      label: "Запас в размере",
      description:
        "Больше форма при разумной цене — дополнительный запас по длине и ширине.",
      option: economicBig,
    },
    {
      kind: "exact",
      label: "Точный в размер",
      description: exact
        ? `Форма ровно ${lengthCm}×${widthCm} см без добора.`
        : `Точный размер ${lengthCm}×${widthCm} см из плашек 30 и 60 не собирается.`,
      option: exact,
    },
    {
      kind: "fewestJoints",
      label: "Минимум стыков",
      description: fewestJoints
        ? `${countPuzzleJoints(fewestJoints)} стыков по бортам — меньше плашек и длиннее сегменты (например, 60+60 вместо 60+30+30).`
        : "Не найдено подходящей комбинации.",
      option: fewestJoints,
    },
  ];
}

export function findPuzzleFormRecommendations(
  lengthCm: number,
  widthCm: number,
): { picks: PuzzleFormPick[]; errors: string[] } {
  const { options, errors } = findAllPuzzleFormOptions(lengthCm, widthCm);
  if (options.length === 0) {
    return { picks: pickPuzzleFormRecommendations([], lengthCm, widthCm), errors };
  }
  return {
    picks: pickPuzzleFormRecommendations(options, lengthCm, widthCm),
    errors,
  };
}

export function formatRub(n: number): string {
  return `${new Intl.NumberFormat("ru-RU").format(n)} ₽`;
}
