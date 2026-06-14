"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  CATALOG_SHOP_RETURN_KEY,
  MASTERS_CATALOG_RETURN_KEY,
  markCatalogScrollRestore,
  normalizeCatalogPageUrl,
  resolveCatalogReturn,
  resolveMastersCatalogReturn,
} from "@/lib/catalog-return-url";
import { MASTERS_CATALOG_PATH } from "@/lib/masters-products";

type Props = {
  catalog: "masters" | "catalog";
  fallback: string;
  productSlugs: readonly string[];
  className?: string;
};

function readStoredReturn(
  storageKey: string,
  prefix: string,
): string | undefined {
  try {
    const stored = sessionStorage.getItem(storageKey)?.trim();
    if (!stored?.startsWith(prefix) || stored.startsWith("//")) return undefined;
    return stored;
  } catch {
    return undefined;
  }
}

export function CatalogBackButton({
  catalog,
  fallback,
  productSlugs,
  className = "",
}: Props) {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? undefined;

  const fromHref =
    catalog === "masters"
      ? resolveMastersCatalogReturn(from, productSlugs, fallback)
      : resolveCatalogReturn(from, productSlugs, fallback);

  const storageKey =
    catalog === "masters"
      ? MASTERS_CATALOG_RETURN_KEY
      : CATALOG_SHOP_RETURN_KEY;
  const prefix =
    catalog === "masters" ? MASTERS_CATALOG_PATH : "/catalog";

  const stored =
    fromHref === fallback
      ? readStoredReturn(storageKey, prefix)
      : undefined;

  const href = normalizeCatalogPageUrl(stored ?? fromHref);

  return (
    <Button
      href={href}
      variant="secondary"
      className={className}
      scroll={false}
      onClick={() => markCatalogScrollRestore(catalog, href)}
    >
      Назад в каталог
    </Button>
  );
}
