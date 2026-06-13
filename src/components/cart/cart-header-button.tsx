"use client";

import { memo, useEffect, useState, useSyncExternalStore } from "react";
import {
  cartGetItemCountSnapshot,
  cartSetOpen,
  cartSubscribe,
} from "@/lib/cart-store";

function CartHeaderButtonInner() {
  const itemCount = useSyncExternalStore(
    cartSubscribe,
    cartGetItemCountSnapshot,
    () => 0,
  );
  const [paintBadge, setPaintBadge] = useState(false);

  useEffect(() => {
    setPaintBadge(true);
  }, []);

  const showBadge = paintBadge && itemCount > 0;

  return (
    <button
      type="button"
      onClick={() => cartSetOpen(true)}
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-green/15 text-green hover:border-green/30 hover:bg-sage-muted/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
      aria-label={`Корзина: ${itemCount} товаров`}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        aria-hidden
      >
        <path d="M6 6h15l-1.5 9h-12L6 6Z" />
        <path d="M6 6 5 3H2" />
        <circle cx="9" cy="20" r="1.25" fill="currentColor" stroke="none" />
        <circle cx="18" cy="20" r="1.25" fill="currentColor" stroke="none" />
      </svg>
      <span
        className={`absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold leading-none text-green-deep ${
          showBadge ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden={!showBadge}
      >
        {itemCount > 99 ? "99+" : itemCount || 0}
      </span>
    </button>
  );
}

export const CartHeaderButton = memo(CartHeaderButtonInner);
