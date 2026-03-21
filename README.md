# Salamaha Fine Art — сайт

Next.js 16 (App Router) + Tailwind CSS 4. Лендинг и витрина каталога по брифу `../DESIGN_BRIEF_PROMPT.md`.

## Запуск

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Настройка

1. Скопируйте `.env.example` в `.env.local`.
2. Укажите `NEXT_PUBLIC_WHATSAPP_URL` и при необходимости правьте `src/lib/site.ts` (телефон, адрес).

## Структура

- `src/app/page.tsx` — главная, все секции.
- `src/app/catalog` — список и карточка товара.
- `src/components/sections/*` — блоки лендинга.
- `src/components/ui/*` — кнопки, бейджи, поля.

Изображения сейчас с Unsplash; замените на свои в `public/` или CMS.
