"use client";

import { memo, type ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { StickyMobileCta } from "@/components/layout/sticky-mobile-cta";
import { QuizModal } from "@/components/quiz/quiz-modal";
import { QuizProvider } from "@/components/quiz/quiz-context";
import { CartProvider } from "@/components/cart/cart-context";
import { CartModal } from "@/components/cart/cart-modal";
import { HashScrollHandler } from "@/components/layout/hash-scroll-handler";

/** Не перерисовывается при обновлении корзины — меньше мерцания каталога. */
const StableMain = memo(function StableMain({ children }: { children: ReactNode }) {
  return (
    <main className="flex-1 pb-24 md:pb-0">{children}</main>
  );
});

/** Корзина только вокруг шапки и модалки — сетка товаров не трогается. */
const CartChrome = memo(function CartChrome() {
  return (
  <>
    <Header />
    <StickyMobileCta />
    <CartModal />
  </>
  );
});

function Inner({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-10 flex min-h-screen flex-col">
      <HashScrollHandler />
      <CartProvider>
        <CartChrome />
      </CartProvider>
      <StableMain>{children}</StableMain>
      <Footer />
      <QuizModal />
    </div>
  );
}

export function LandingShell({ children }: { children: ReactNode }) {
  return (
    <QuizProvider>
      <Inner>{children}</Inner>
    </QuizProvider>
  );
}
