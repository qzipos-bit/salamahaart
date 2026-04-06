# Деплой сайта (Next.js)

Сборка проверяется командой `npm run build`. Проект ориентирован на **Vercel** (нативная поддержка Next.js App Router).

---

## Переменные окружения

В панели хостинга (или в `.env.local` локально) задайте:

| Переменная | Обязательно | Назначение |
|------------|-------------|------------|
| `NEXT_PUBLIC_SITE_URL` | **Да** для продакшена | Публичный URL **без** слэша в конце, например `https://salamaha.ru`. Нужен для `sitemap`, canonical, Open Graph и `metadataBase`. |
| `NEXT_PUBLIC_WHATSAPP_URL` | Рекомендуется | Ссылка WhatsApp, например `https://wa.me/79384440033` |
| `NEXT_PUBLIC_ORG_SAME_AS` | Опционально | Профили для JSON-LD, через запятую: `https://vk.com/...,https://t.me/...` |

Остальное (телефон, адрес) пока в [`src/lib/site.ts`](../src/lib/site.ts).

---

## Вариант A: Vercel через GitHub (удобно для обновлений)

1. Залейте репозиторий на GitHub (если ещё не там).
2. Зайдите на [vercel.com](https://vercel.com) → **Add New… → Project** → импортируйте репозиторий.
3. **Root Directory**: корень проекта (где лежит `package.json`).
4. **Environment Variables**: добавьте переменные из таблицы выше для окружения **Production** (и при необходимости Preview).
5. Нажмите **Deploy**. После сборки будет URL вида `*.vercel.app`.
6. **Domains**: подключите свой домен (DNS по инструкции Vercel).
7. Дальше каждый push в выбранную ветку даёт автодеплой.

Файл [`vercel.json`](../vercel.json) задаёт регион билда (`fra1` — ближе к РФ/Европе; при желании смените на `cdg1` и т.д.).

---

## Вариант B: Vercel CLI с вашего компьютера

```bash
npm i -g vercel
cd web
vercel login
vercel link    # привязать к проекту или создать новый
vercel env pull .env.local   # опционально: стянуть env из облака
vercel --prod                # продакшен-деплой
```

Для **CI без браузера** создайте токен в Vercel: Account Settings → Tokens, затем:

```bash
vercel deploy --prod --token ВАШ_TOKEN
```

(Токен не коммитьте в git.)

---

## Вариант C: Свой сервер (Docker / Node)

1. На сервере: Node 20+, `npm ci`, `npm run build`, `npm run start` (порт задаётся через `PORT`, по умолчанию 3000).
2. Перед `build` экспортируйте `NEXT_PUBLIC_*` так же, как в таблице.
3. Прокси (Nginx/Caddy) на `127.0.0.1:3000`, HTTPS на погранице.

Готовый Dockerfile в репозитории пока не приложён — при необходимости его можно добавить отдельно.

---

## После выката

- Откройте `/sitemap.xml` — в продакшене URL должны быть с вашим доменом (если задан `NEXT_PUBLIC_SITE_URL`).
- Проверьте формы и WhatsApp-ссылки.
- В Search Console укажите sitemap.

---

## CI в GitHub

Рабочий процесс [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) на каждом push/PR запускает `npm ci` и `npm run build` — это не деплой, а проверка, что проект собирается.
