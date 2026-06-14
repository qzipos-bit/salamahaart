/** Старые slug форм → объединённые карточки (без импортов с `@/`). */

const FULL_CIRCLE_TARGET = "forma-krugi-s-domom";
const FULL_CIRCLE_DIAMETERS = [40, 50, 60, 70, 80, 90, 100] as const;
const ROUND_RIM_TARGET = "obod-krugovoj";
const ROUND_RIM_DIAMETERS = [30, 40, 50, 60, 70, 80, 90, 100] as const;

export const FORM_FULL_CIRCLE_LEGACY_REDIRECTS: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const d of FULL_CIRCLE_DIAMETERS) {
    map[`forma-krug-s-domom-${d}`] = FULL_CIRCLE_TARGET;
  }
  return map;
})();

export const FORM_ROUND_RIM_LEGACY_REDIRECTS: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const d of ROUND_RIM_DIAMETERS) {
    map[`obod-krug-${d}`] = ROUND_RIM_TARGET;
  }
  return map;
})();

export const FORM_LEGACY_SLUG_REDIRECTS: Record<string, string> = {
  ...FORM_FULL_CIRCLE_LEGACY_REDIRECTS,
  ...FORM_ROUND_RIM_LEGACY_REDIRECTS,
};
