"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCookieConsent } from "@/components/consent/cookie-consent-provider";

export function CookieBanner() {
  const { consent, ready, acceptAll, acceptNecessaryOnly } = useCookieConsent();

  if (!ready || consent) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-green/15 bg-cream/95 p-4 shadow-[var(--shadow)] backdrop-blur-md md:bottom-4 md:mx-auto md:max-w-3xl md:rounded-[var(--radius-lg)] md:border"
      role="dialog"
      aria-live="polite"
      aria-label="Настройки cookie"
    >
      <div className="mx-auto flex max-w-[1320px] flex-col gap-4">
        <div>
          <p className="text-sm font-semibold text-green-deep">
            Мы используем cookie
          </p>
          <p className="mt-2 text-sm leading-relaxed text-fg/75">
            <strong>Необходимые</strong> cookie нужны для корзины и сохранения
            вашего выбора. <strong>Аналитические</strong> cookie (Яндекс.Метрика)
            помогают понять, как пользователи работают с сайтом — они включаются
            только с вашего согласия. Подробнее — в{" "}
            <Link
              href="/politika-konfidencialnosti#cookie-table"
              className="font-medium text-green underline-offset-4 hover:underline"
            >
              Политике конфиденциальности
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={acceptNecessaryOnly}
            className="sm:min-w-[180px]"
          >
            Только необходимые
          </Button>
          <Button
            type="button"
            onClick={acceptAll}
            className="sm:min-w-[140px]"
          >
            Принять все
          </Button>
        </div>
      </div>
    </div>
  );
}
