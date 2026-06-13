"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

function scrollPageToTop() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

/**
 * На длинных лендингах (курс) мобильный браузер иногда восстанавливает
 * прошлую позицию скролла или «прыгает» к якорю — принудительно открываем сверху.
 */
export function ScrollToTopOnMount({ matchPath }: { matchPath: string }) {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (pathname !== matchPath) return;
    if (window.location.hash) return;

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    scrollPageToTop();
    requestAnimationFrame(scrollPageToTop);
  }, [pathname, matchPath]);

  useEffect(() => {
    if (pathname !== matchPath) return;

    const onPageShow = (event: PageTransitionEvent) => {
      if (!event.persisted || window.location.hash) return;
      scrollPageToTop();
    };

    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [pathname, matchPath]);

  return null;
}
