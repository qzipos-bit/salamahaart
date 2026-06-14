/** ID счётчика Яндекс.Метрики (можно задать через NEXT_PUBLIC_YANDEX_METRIKA_ID). */
export const YANDEX_METRIKA_ID = Number(
  process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID ?? "109835099",
);

export function isYandexMetrikaEnabled(): boolean {
  return Number.isFinite(YANDEX_METRIKA_ID) && YANDEX_METRIKA_ID > 0;
}
