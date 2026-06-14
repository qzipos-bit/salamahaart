import { CATALOG_SHOP_PATH } from "@/lib/catalog-filters";
import { MASTERS_CATALOG_PATH } from "@/lib/masters-products";

export const CATALOG_RETURN_PARAM = "from" as const;

export const MASTERS_CATALOG_RETURN_KEY = "salamaha:masters-catalog-return";
export const CATALOG_SHOP_RETURN_KEY = "salamaha:catalog-shop-return";

export const MASTERS_CATALOG_SCROLL_KEY = "salamaha:masters-catalog-scroll";
export const CATALOG_SHOP_SCROLL_KEY = "salamaha:catalog-shop-scroll";

export const MASTERS_CATALOG_SCROLL_PENDING_KEY =
  "salamaha:masters-catalog-scroll-pending";
export const CATALOG_SHOP_SCROLL_PENDING_KEY =
  "salamaha:catalog-shop-scroll-pending";

export type CatalogScrollCatalog = "masters" | "catalog";

export function catalogScrollStorageKeys(catalog: CatalogScrollCatalog) {
  return catalog === "masters"
    ? {
        scroll: MASTERS_CATALOG_SCROLL_KEY,
        pending: MASTERS_CATALOG_SCROLL_PENDING_KEY,
      }
    : {
        scroll: CATALOG_SHOP_SCROLL_KEY,
        pending: CATALOG_SHOP_SCROLL_PENDING_KEY,
      };
}

export const CATALOG_URL_SYNC_EVENT = "salamaha:catalog-url";

export function normalizeCatalogPageUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) return trimmed;

  const qIndex = trimmed.indexOf("?");
  const path = qIndex === -1 ? trimmed : trimmed.slice(0, qIndex);
  const search = qIndex === -1 ? "" : trimmed.slice(qIndex + 1);
  if (!search) return path;

  const sp = new URLSearchParams(search);
  sp.delete(CATALOG_RETURN_PARAM);
  const keys = [...new Set([...sp.keys()])].sort();
  const normalized = new URLSearchParams();
  for (const key of keys) {
    for (const value of sp.getAll(key)) {
      normalized.append(key, value);
    }
  }
  const q = normalized.toString();
  return q ? `${path}?${q}` : path;
}

export function readBrowserCatalogPageUrl(): string {
  if (typeof window === "undefined") return "";
  return normalizeCatalogPageUrl(
    `${window.location.pathname}${window.location.search}`,
  );
}

export function buildCatalogPageUrl(pathname: string, search: string): string {
  return normalizeCatalogPageUrl(
    search ? `${pathname}?${search}` : pathname,
  );
}

export function catalogUrlsMatch(a: string, b: string): boolean {
  return normalizeCatalogPageUrl(a) === normalizeCatalogPageUrl(b);
}

function readScrollMap(storageKey: string): Record<string, number> {
  try {
    const raw = sessionStorage.getItem(storageKey);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, number>;
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

export function saveCatalogScrollPosition(
  storageKey: string,
  catalogUrl: string,
  scrollY: number,
): void {
  if (!Number.isFinite(scrollY) || scrollY < 0) return;
  const key = normalizeCatalogPageUrl(catalogUrl);
  try {
    const map = readScrollMap(storageKey);
    map[key] = Math.round(scrollY);
    sessionStorage.setItem(storageKey, JSON.stringify(map));
  } catch {
    /* private mode */
  }
}

export function readCatalogScrollPosition(
  storageKey: string,
  catalogUrl: string,
): number | undefined {
  const key = normalizeCatalogPageUrl(catalogUrl);
  try {
    const y = readScrollMap(storageKey)[key];
    return typeof y === "number" && Number.isFinite(y) && y >= 0 ? y : undefined;
  } catch {
    return undefined;
  }
}

export function markCatalogScrollRestore(
  catalog: CatalogScrollCatalog,
  catalogUrl: string,
): void {
  try {
    const { pending } = catalogScrollStorageKeys(catalog);
    sessionStorage.setItem(pending, normalizeCatalogPageUrl(catalogUrl));
  } catch {
    /* private mode */
  }
}

export function readCatalogScrollRestorePending(
  catalog: CatalogScrollCatalog,
): string | undefined {
  try {
    const { pending } = catalogScrollStorageKeys(catalog);
    const value = sessionStorage.getItem(pending)?.trim();
    return value || undefined;
  } catch {
    return undefined;
  }
}

export function clearCatalogScrollRestorePending(
  catalog: CatalogScrollCatalog,
): void {
  try {
    const { pending } = catalogScrollStorageKeys(catalog);
    sessionStorage.removeItem(pending);
  } catch {
    /* private mode */
  }
}

export function restoreCatalogScrollPosition(y: number): void {
  const scroll = () => window.scrollTo({ top: y, left: 0, behavior: "instant" });
  scroll();
  requestAnimationFrame(scroll);
  requestAnimationFrame(() => requestAnimationFrame(scroll));
  window.setTimeout(scroll, 0);
  window.setTimeout(scroll, 50);
  window.setTimeout(scroll, 120);
}

export function appendCatalogReturn(
  productPath: string,
  returnTo?: string,
): string {
  if (!returnTo) return productPath;
  const q = `${CATALOG_RETURN_PARAM}=${encodeURIComponent(returnTo)}`;
  const sep = productPath.includes("?") ? "&" : "?";
  return `${productPath}${sep}${q}`;
}

function parseFromParam(
  raw: string | string[] | undefined,
): string | undefined {
  const value = typeof raw === "string" ? raw : raw?.[0];
  if (!value) return undefined;
  try {
    const decoded = decodeURIComponent(value.trim());
    if (!decoded.startsWith("/") || decoded.startsWith("//")) return undefined;
    return decoded;
  } catch {
    return undefined;
  }
}

function isSingleSegmentProductPath(
  pathOnly: string,
  basePath: string,
  productSlugs: readonly string[],
): boolean {
  if (!pathOnly.startsWith(basePath + "/")) return false;
  const rest = pathOnly.slice(basePath.length + 1);
  if (!rest || rest.includes("/")) return false;
  return productSlugs.includes(rest);
}

export function resolveMastersCatalogReturn(
  fromRaw: string | string[] | undefined,
  productSlugs: readonly string[],
  fallback: string = MASTERS_CATALOG_PATH,
): string {
  const decoded = parseFromParam(fromRaw);
  if (!decoded?.startsWith(MASTERS_CATALOG_PATH)) return fallback;

  const pathOnly = decoded.split("?")[0];
  if (pathOnly === MASTERS_CATALOG_PATH) return normalizeCatalogPageUrl(decoded);
  if (isSingleSegmentProductPath(pathOnly, MASTERS_CATALOG_PATH, productSlugs)) {
    return fallback;
  }
  return normalizeCatalogPageUrl(decoded);
}

export function resolveCatalogReturn(
  fromRaw: string | string[] | undefined,
  productSlugs: readonly string[],
  fallback: string = CATALOG_SHOP_PATH,
): string {
  const decoded = parseFromParam(fromRaw);
  if (!decoded?.startsWith("/catalog")) return fallback;

  const pathOnly = decoded.split("?")[0];
  if (pathOnly === "/catalog" || pathOnly === CATALOG_SHOP_PATH) {
    return normalizeCatalogPageUrl(decoded);
  }
  if (isSingleSegmentProductPath(pathOnly, "/catalog", productSlugs)) {
    return fallback;
  }
  return normalizeCatalogPageUrl(decoded);
}

export function buildMastersCatalogReturnUrl(
  query: Record<string, string | string[] | undefined>,
): string {
  const sp = new URLSearchParams();
  for (const [key, raw] of Object.entries(query)) {
    if (key === CATALOG_RETURN_PARAM) continue;
    const value = typeof raw === "string" ? raw : raw?.[0];
    if (value) sp.set(key, value);
  }
  const q = sp.toString();
  return normalizeCatalogPageUrl(
    q ? `${MASTERS_CATALOG_PATH}?${q}` : MASTERS_CATALOG_PATH,
  );
}
