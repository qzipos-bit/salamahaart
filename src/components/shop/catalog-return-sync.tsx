"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  catalogScrollStorageKeys,
  catalogUrlsMatch,
  CATALOG_SHOP_RETURN_KEY,
  CATALOG_URL_SYNC_EVENT,
  clearCatalogScrollRestorePending,
  MASTERS_CATALOG_RETURN_KEY,
  readBrowserCatalogPageUrl,
  readCatalogScrollPosition,
  readCatalogScrollRestorePending,
  restoreCatalogScrollPosition,
  saveCatalogScrollPosition,
} from "@/lib/catalog-return-url";
import { MASTERS_CATALOG_PATH } from "@/lib/masters-products";
import { CATALOG_SHOP_PATH } from "@/lib/catalog-filters";

type Props = {
  catalog: "masters" | "catalog";
};

export function CatalogReturnSync({ catalog }: Props) {
  const pathname = usePathname();
  const basePath =
    catalog === "masters" ? MASTERS_CATALOG_PATH : CATALOG_SHOP_PATH;
  const returnKey =
    catalog === "masters"
      ? MASTERS_CATALOG_RETURN_KEY
      : CATALOG_SHOP_RETURN_KEY;
  const { scroll: scrollKey } = catalogScrollStorageKeys(catalog);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (pathname !== basePath) return;

    const persistReturnUrl = () => {
      const url = readBrowserCatalogPageUrl();
      if (!url.startsWith(basePath)) return;
      try {
        sessionStorage.setItem(returnKey, url);
      } catch {
        /* private mode */
      }
    };

    persistReturnUrl();
    window.addEventListener(CATALOG_URL_SYNC_EVENT, persistReturnUrl);
    window.addEventListener("popstate", persistReturnUrl);
    return () => {
      window.removeEventListener(CATALOG_URL_SYNC_EVENT, persistReturnUrl);
      window.removeEventListener("popstate", persistReturnUrl);
    };
  }, [basePath, pathname, returnKey]);

  useEffect(() => {
    if (pathname !== basePath) return;

    let debounce: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      if (debounce) clearTimeout(debounce);
      debounce = setTimeout(() => {
        const url = readBrowserCatalogPageUrl();
        if (!url.startsWith(basePath)) return;
        saveCatalogScrollPosition(scrollKey, url, window.scrollY);
      }, 80);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (debounce) clearTimeout(debounce);
      window.removeEventListener("scroll", onScroll);
    };
  }, [basePath, pathname, scrollKey]);

  useEffect(() => {
    if (pathname !== basePath) return;

    const pending = readCatalogScrollRestorePending(catalog);
    if (!pending) return;

    let cancelled = false;
    let attempts = 0;

    const tryRestore = () => {
      if (cancelled || attempts > 24) return;
      attempts += 1;

      const url = readBrowserCatalogPageUrl();
      if (!catalogUrlsMatch(pending, url)) return;

      clearCatalogScrollRestorePending(catalog);
      const y = readCatalogScrollPosition(scrollKey, url);
      if (y == null) return;

      restoreCatalogScrollPosition(y);
      if (Math.abs(window.scrollY - y) > 4) {
        requestAnimationFrame(tryRestore);
      }
    };

    requestAnimationFrame(tryRestore);
    window.setTimeout(tryRestore, 0);
    window.setTimeout(tryRestore, 80);
    window.setTimeout(tryRestore, 160);

    return () => {
      cancelled = true;
    };
  }, [basePath, catalog, pathname, scrollKey]);

  return null;
}
