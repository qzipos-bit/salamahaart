"use client";

import Link from "next/link";
import { memo, useState } from "react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { CartHeaderButton } from "@/components/cart/cart-header-button";
import { MASTERS_CATALOG_PATH } from "@/lib/masters-products";
import { CATALOG_SHOP_PATH } from "@/lib/catalog-filters";

const nav = [
  { href: "/#about", label: "О мастере" },
  { href: CATALOG_SHOP_PATH, label: "Каталог изделий" },
  { href: "/#gallery", label: "Портфолио" },
  { href: "/blog", label: "Журнал" },
  { href: "/#courses", label: "Обучение" },
  { href: "/#contacts", label: "Контакты" },
];

export const Header = memo(function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-green/10 bg-bg">
      <Container className="flex h-[72px] items-center justify-between gap-4">
          <Link
            href="/"
            className="group flex items-center gap-3 leading-none"
            aria-label="Salamaha Fine Art — на главную"
          >
            <img
              src="/logo-salamaha.webp"
              alt=""
              width={48}
              height={48}
              className="h-11 w-11 shrink-0 object-contain sm:h-12 sm:w-12"
              decoding="sync"
            />
            <span className="flex flex-col">
              <span className="font-script text-2xl text-green sm:text-[1.85rem]">
                Salamaha
              </span>
              <span className="font-serif text-[10px] font-semibold uppercase tracking-[0.35em] text-green/70">
                Fine Art
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-green/80 transition hover:text-green"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <CartHeaderButton />
            <div className="hidden md:block">
              <Button
                href={MASTERS_CATALOG_PATH}
                className="!py-2.5 !text-sm"
              >
                Товары для мастеров
              </Button>
            </div>
            <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-green/15 md:hidden"
            aria-expanded={open}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Меню</span>
            <span className="flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-5 bg-green transition ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`block h-0.5 w-5 bg-green transition ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-5 bg-green transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </span>
          </button>
          </div>
        </Container>

        {open ? (
          <div className="border-t border-green/10 bg-bg px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-3">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-base text-green"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2">
                <Button href={MASTERS_CATALOG_PATH} className="w-full">
                  Товары для мастеров
                </Button>
              </div>
            </nav>
          </div>
        ) : null}
    </header>
  );
});
