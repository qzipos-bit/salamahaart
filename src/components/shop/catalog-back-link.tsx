"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useSearchParams } from "next/navigation";
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
  children: ReactNode;
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

export function CatalogBackLink({
  catalog,
  fallback,
  productSlugs,
  children,
  className,
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
    fromHref === fallback ? readStoredReturn(storageKey, prefix) : undefined;

  const href = normalizeCatalogPageUrl(stored ?? fromHref);

  return (
    <Link
      href={href}
      className={className}
      scroll={false}
      onClick={() => markCatalogScrollRestore(catalog, href)}
    >
      {children}
    </Link>
  );
}
