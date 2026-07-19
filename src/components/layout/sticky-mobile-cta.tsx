"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/cart/cart-context";
import {
  BUKET_LANDING,
  BUKET_LANDING_PATH,
  buketWhatsappUrl,
} from "@/lib/buket-landing";
import {
  NARDY_LANDING,
  NARDY_LANDING_PATH,
  nardyWhatsappUrl,
} from "@/lib/nardy-landing";
import {
  STOLESHNICY_LANDING,
  STOLESHNICY_LANDING_PATH,
  stoleshnicyWhatsappUrl,
} from "@/lib/stoleshnicy-landing";
import { SITE } from "@/lib/site";

const HIDE_ON_PATHS = ["/kurs-smola-derevo"];

function stickyWhatsappHref(pathname: string): string {
  if (pathname === BUKET_LANDING_PATH) {
    return buketWhatsappUrl(BUKET_LANDING.ctaFinal.whatsappPrefill);
  }
  if (pathname === STOLESHNICY_LANDING_PATH) {
    return stoleshnicyWhatsappUrl(
      STOLESHNICY_LANDING.ctaFinal.whatsappPrefill,
    );
  }
  if (pathname === NARDY_LANDING_PATH) {
    return nardyWhatsappUrl(NARDY_LANDING.ctaFinal.whatsappPrefill);
  }
  return SITE.whatsapp;
}

function stickyWhatsappLabel(pathname: string): string {
  if (pathname === BUKET_LANDING_PATH) {
    return "Обсудить букет";
  }
  if (pathname === STOLESHNICY_LANDING_PATH) {
    return "Заказать замер";
  }
  if (pathname === NARDY_LANDING_PATH) {
    return "Заказать нарды";
  }
  return "Написать в WhatsApp";
}

export function StickyMobileCta() {
  const pathname = usePathname();
  const { open } = useCart();

  if (
    open ||
    HIDE_ON_PATHS.includes(pathname) ||
    pathname.startsWith("/tovary-dlya-masterov")
  ) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 p-4 md:hidden">
      <div className="pointer-events-auto mx-auto max-w-[1320px]">
        <Button
          href={stickyWhatsappHref(pathname)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full shadow-[var(--shadow)]"
        >
          {stickyWhatsappLabel(pathname)}
        </Button>
      </div>
    </div>
  );
}
