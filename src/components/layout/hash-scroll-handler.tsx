"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function scrollToHash(hash: string) {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "auto", block: "start" });
}

/**
 * Прокрутка к якорю после клиентской навигации (один раз за переход).
 */
export function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    requestAnimationFrame(() => scrollToHash(hash));
  }, [pathname]);

  return null;
}
