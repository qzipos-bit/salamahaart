/** Диаметр в подписи: «30 см». */
export function formatDiameterCm(cm: number): string {
  return `${cm} см`;
}

/** Несколько диаметров: «30, 40 и 60 см». */
export function formatDiameterListCm(diameters: readonly number[]): string {
  if (diameters.length === 0) return "";
  if (diameters.length === 1) return formatDiameterCm(diameters[0]);
  if (diameters.length === 2) {
    return `${diameters[0]} и ${diameters[1]} см`;
  }
  return `${diameters.slice(0, -1).join(", ")} и ${diameters[diameters.length - 1]} см`;
}

/** Диаметр в описании товара. */
export function formatDiameterDescription(cm: number): string {
  return `Диаметр: ${cm} см.`;
}
