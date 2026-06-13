import type { MasterProductVariant } from "@/lib/masters-products";

/** Цена погонного метра борта без дна, ₽ (для размеров без фиксированной цены). */
export const SLIDING_BORT_LINEAR_METER_RUB = 2_250;

/** Фиксированные цены по прайсу, ключ — id варианта (`60x60`). */
const SLIDING_BORT_PRICE_OVERRIDES: Record<string, number> = {
  "60x60": 5_790,
  "100x100": 8_990,
  "120x80": 8_990,
};

export function slidingBortPerimeterMeters(
  widthCm: number,
  heightCm: number,
): number {
  return (2 * (widthCm + heightCm)) / 100;
}

export function slidingBortPriceRub(widthCm: number, heightCm: number): number {
  const id = `${widthCm}x${heightCm}`;
  const fixed = SLIDING_BORT_PRICE_OVERRIDES[id];
  if (fixed !== undefined) return fixed;
  return Math.round(
    slidingBortPerimeterMeters(widthCm, heightCm) * SLIDING_BORT_LINEAR_METER_RUB,
  );
}

export function formatMastersRub(n: number): string {
  return `${new Intl.NumberFormat("ru-RU").format(n)} ₽`;
}

/** Размеры внутреннего поля, см (ширина × длина), от меньшего к большему. */
export const SLIDING_BORT_WITHOUT_BOTTOM_SIZES: ReadonlyArray<
  [number, number]
> = [
  [60, 60],
  [60, 80],
  [100, 60],
  [80, 80],
  [120, 60],
  [100, 80],
  [120, 80],
  [100, 100],
  [120, 100],
  [120, 120],
];

function compareSlidingBortSizes(a: [number, number], b: [number, number]): number {
  const [aw, ah] = a;
  const [bw, bh] = b;
  const areaA = aw * ah;
  const areaB = bw * bh;
  if (areaA !== areaB) return areaA - areaB;
  const perimA = aw + ah;
  const perimB = bw + bh;
  if (perimA !== perimB) return perimA - perimB;
  return Math.max(aw, ah) - Math.max(bw, bh);
}

export function buildSlidingBortVariants(
  sizes: ReadonlyArray<[number, number]>,
): MasterProductVariant[] {
  return [...sizes]
    .sort(compareSlidingBortSizes)
    .map(([w, h]) => ({
      id: `${w}x${h}`,
      label: `${w}×${h} см`,
      priceRub: slidingBortPriceRub(w, h),
    }));
}

export const SLIDING_BORT_WITHOUT_BOTTOM_VARIANTS =
  buildSlidingBortVariants(SLIDING_BORT_WITHOUT_BOTTOM_SIZES);

export function mastersProductVariantById(
  variants: MasterProductVariant[],
  id: string,
): MasterProductVariant {
  return variants.find((v) => v.id === id) ?? variants[0];
}
