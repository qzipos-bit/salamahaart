"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import {
  isYandexMetrikaEnabled,
  YANDEX_METRIKA_ID,
} from "@/lib/yandex-metrika";

declare global {
  interface Window {
    ym?: (
      counterId: number,
      method: string,
      ...args: unknown[]
    ) => void;
  }
}

function trackPageView() {
  if (typeof window.ym !== "function") return;
  const url = window.location.pathname + window.location.search;
  window.ym(YANDEX_METRIKA_ID, "hit", url, {
    referer: document.referrer,
  });
}

export function YandexMetrika() {
  const pathname = usePathname();

  useEffect(() => {
    trackPageView();
  }, [pathname]);

  if (!isYandexMetrikaEnabled()) return null;

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRIKA_ID}', 'ym');

          ym(${YANDEX_METRIKA_ID}, 'init', {
            ssr: true,
            webvisor: true,
            clickmap: true,
            ecommerce: "dataLayer",
            accurateTrackBounce: true,
            trackLinks: true
          });
        `}
      </Script>
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
            alt=""
            style={{ position: "absolute", left: "-9999px" }}
          />
        </div>
      </noscript>
    </>
  );
}
