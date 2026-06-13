/** База промокодов (код в нижнем регистре). */
export type PromoCodeRecord = {
  code: string;
  discountPercent: number;
};

export const PROMO_CODES: PromoCodeRecord[] = [
  { code: "klub6", discountPercent: 10 },
  { code: "resinart_minsk", discountPercent: 10 },
  { code: "irenart", discountPercent: 10 },
  { code: "schasteva", discountPercent: 10 },
];

export const PROMO_CODE_MAP = new Map(
  PROMO_CODES.map((p) => [p.code, p]),
);

export function normalizePromoCodeInput(input: string): string {
  return input.trim().toLowerCase();
}

export function findPromoCode(input: string): PromoCodeRecord | undefined {
  const normalized = normalizePromoCodeInput(input);
  if (!normalized) return undefined;
  return PROMO_CODE_MAP.get(normalized);
}
