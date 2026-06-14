"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/cart/cart-context";
import { SITE } from "@/lib/site";

const HIDE_ON_PATHS = ["/kurs-smola-derevo"];

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
          href={SITE.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full shadow-[var(--shadow)]"
        >
          Написать в WhatsApp
        </Button>
      </div>
    </div>
  );
}
