/** Старые slug деревянных заготовок → объединённые карточки (без импортов с `@/`). */

const SLAB_CALM = "derevo-sleb-spokojnyj";
const SLAB_LIVE = "derevo-sleb-kapovyj";

const DIAMETERS = [30, 40, 50, 60] as const;
const EDGES = ["spokojnyj", "kapovyj"] as const;
const THICKNESS_KEYS = ["do-35", "4-5"] as const;

export const WOOD_BLANK_LEGACY_SLUG_REDIRECTS: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const dia of DIAMETERS) {
    for (const edge of EDGES) {
      const target = edge === "spokojnyj" ? SLAB_CALM : SLAB_LIVE;
      for (const thick of THICKNESS_KEYS) {
        map[`derevo-d${dia}-${edge}-t-${thick}`] = target;
      }
    }
  }
  return map;
})();
