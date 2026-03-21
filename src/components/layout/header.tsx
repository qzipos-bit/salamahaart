"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

const nav = [
  { href: "#about", label: "О мастере" },
  { href: "#categories", label: "Каталог" },
  { href: "#gallery", label: "Портфолио" },
  { href: "#courses", label: "Обучение" },
  { href: "#contacts", label: "Контакты" },
];

export function Header({ onOpenQuiz }: { onOpenQuiz?: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-green/10">
      <div className="glass-panel">
        <Container className="flex h-[72px] items-center justify-between gap-4">
          <Link
            href="/"
            className="group flex items-center gap-3 leading-none"
            aria-label="Salamaha Fine Art — на главную"
          >
            <Image
              src="/logo-salamaha.webp"
              alt=""
              width={56}
              height={56}
              className="h-11 w-11 shrink-0 object-contain sm:h-12 sm:w-12"
              priority
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

          <div className="hidden items-center gap-3 md:flex">
            {onOpenQuiz ? (
              <button
                type="button"
                onClick={onOpenQuiz}
                className="text-sm text-green/70 underline-offset-4 hover:text-green hover:underline"
              >
                Подбор за 2 мин.
              </button>
            ) : null}
            <Button href="/catalog" variant="secondary" className="!py-2.5 !text-sm">
              Магазин
            </Button>
            <Button
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="!py-2.5 !text-sm"
            >
              Написать
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
        </Container>

        {open ? (
          <div className="border-t border-green/10 bg-bg/95 px-4 py-4 md:hidden">
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
              {onOpenQuiz ? (
                <button
                  type="button"
                  className="text-left text-base text-green/70"
                  onClick={() => {
                    setOpen(false);
                    onOpenQuiz();
                  }}
                >
                  Подбор декора за 2 минуты
                </button>
              ) : null}
              <div className="mt-2 flex flex-col gap-2">
                <Button href="/catalog" variant="secondary">
                  Магазин
                </Button>
                <Button href={SITE.whatsapp}>WhatsApp</Button>
              </div>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
