import { MASTERS_CATALOG_PATH } from "@/lib/masters-products";

export const CATALOG_RETURN_PARAM = "from" as const;

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
  fallback = MASTERS_CATALOG_PATH,
): string {
  const decoded = parseFromParam(fromRaw);
  if (!decoded?.startsWith(MASTERS_CATALOG_PATH)) return fallback;

  const pathOnly = decoded.split("?")[0];
  if (pathOnly === MASTERS_CATALOG_PATH) return decoded;
  if (isSingleSegmentProductPath(pathOnly, MASTERS_CATALOG_PATH, productSlugs)) {
    return fallback;
  }
  return decoded;
}

export function resolveCatalogReturn(
  fromRaw: string | string[] | undefined,
  productSlugs: readonly string[],
  fallback = "/catalog",
): string {
  const decoded = parseFromParam(fromRaw);
  if (!decoded?.startsWith("/catalog")) return fallback;

  const pathOnly = decoded.split("?")[0];
  if (pathOnly === "/catalog") return decoded;
  if (isSingleSegmentProductPath(pathOnly, "/catalog", productSlugs)) {
    return fallback;
  }
  return decoded;
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
  return q ? `${MASTERS_CATALOG_PATH}?${q}` : MASTERS_CATALOG_PATH;
}
