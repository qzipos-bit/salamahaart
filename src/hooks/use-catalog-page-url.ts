"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  CATALOG_URL_SYNC_EVENT,
  readBrowserCatalogPageUrl,
} from "@/lib/catalog-return-url";

export function useCatalogPageUrl(basePath: string, fallback: string): string {
  const pathname = usePathname();
  const readUrl = useCallback(() => {
    if (typeof window === "undefined") return fallback;
    const url = readBrowserCatalogPageUrl();
    return url.startsWith(basePath) ? url : fallback;
  }, [basePath, fallback]);

  const [catalogUrl, setCatalogUrl] = useState(fallback);

  useEffect(() => {
    if (pathname !== basePath) return;
    setCatalogUrl(readUrl());

    const sync = () => setCatalogUrl(readUrl());
    window.addEventListener(CATALOG_URL_SYNC_EVENT, sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener(CATALOG_URL_SYNC_EVENT, sync);
      window.removeEventListener("popstate", sync);
    };
  }, [pathname, basePath, readUrl]);

  return pathname === basePath ? catalogUrl : fallback;
}
