# Промпт: Sitemap XML (профессиональный SEO)

Используйте этот документ как **единое ТЗ** для добавления, проверки и сопровождения `sitemap.xml` и `robots.txt` в Next.js-проекте Salamaha Fine Art (App Router, TypeScript, данные в `src/lib/*`).

---

## 1. Роль и цель

Ты — **senior SEO + фронтенд (Next.js App Router)**. Нужно обеспечить:

1. **Полную индексацию** всех публичных канонических URL (без дублей, без якорей `#`, без технических страниц).
2. **Один актуальный sitemap** с понятной внутренней структурой для людей и для отладки.
3. **Связку robots.txt → sitemap.xml** и корректные абсолютные URL на продакшене.
4. **Автоматическое обновление** при добавлении товаров, статей и лендингов (через данные, не ручной XML).

Язык сайта: **русский**. Домен продакшена задаётся через env (см. §5).

---

## 2. Текущая архитектура (не ломать без причины)

| URL | Назначение |
|-----|------------|
| `/sitemap.xml` | Один файл `<urlset>` со всеми URL, разбитый комментариями по секциям |
| `/robots.txt` | `Allow: /` + строка `Sitemap: {origin}/sitemap.xml` |

**Код (источник правды):**

| Файл | Задача |
|------|--------|
| [`src/lib/sitemap-sections.ts`](src/lib/sitemap-sections.ts) | Списки URL по секциям `main`, `catalog`, `block` |
| [`src/lib/sitemap-xml.ts`](src/lib/sitemap-xml.ts) | Генерация XML (`loc`, `lastmod`, escape) |
| [`src/app/sitemap.xml/route.ts`](src/app/sitemap.xml/route.ts) | Route handler `/sitemap.xml` |
| [`src/app/robots.txt/route.ts`](src/app/robots.txt/route.ts) | Route handler `/robots.txt` |
| [`src/lib/site.ts`](src/lib/site.ts) | `resolveSiteUrl(request)` — базовый URL для sitemap |

**Не** возвращать к статическому `src/app/sitemap.ts` и **не** дробить на `sitemapindex` + десятки файлов, пока в проекте < 50 000 URL (лимит одного sitemap по спецификации).

---

## 3. Структура секций в одном `sitemap.xml`

В XML секции отмечены комментариями (поисковики их игнорируют; для людей и diff в Git — полезны):

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- main — главная, калькуляторы, курс -->
  <url><loc>https://example.com/</loc><lastmod>...</lastmod></url>
  ...

  <!-- catalog — каталог, подборки и товары -->
  ...

  <!-- block — журнал, рубрики и статьи -->
  ...
</urlset>
```

### 3.1 Секция `main`

Сервисные и маркетинговые страницы **вне** каталога товаров и **вне** журнала:

| URL | Почему здесь |
|-----|----------------|
| `/` | Главная (контакты, о мастере, портфолио — якоря `#`, в sitemap **не** добавлять) |
| `/kalkulyator-stola` | Калькулятор столешницы |
| `/raschet-raskhoda-smoly` | Калькулятор смолы |
| `/kurs-smola-derevo` | Лендинг курса |

**Добавлять в `main`:** новые лендинги услуг, калькуляторы, статические «О студии» **только если** у них отдельный URL (не якорь на главной).

### 3.2 Секция `catalog`

Всё, что связано с **покупкой изделий и материалов**:

| Тип | Источник данных | Пример |
|-----|-----------------|--------|
| Хаб каталога | константа | `/catalog` |
| Все товары с фильтрами | константа | `/catalog/vse-tovary` |
| Каталог мастеров | `MASTERS_CATALOG_PATH` | `/tovary-dlya-masterov` |
| SEO-подборки | `SEO_CATALOG_LANDINGS` → `allSeoLandingPaths()` | `/catalog/tarelki-i-blyuda-...` |
| Товар изделий | `ALL_PRODUCTS` | `/catalog/{slug}` |
| Товар мастеров | `MASTERS_PRODUCTS` | `/tovary-dlya-masterov/{slug}` |
| Тематический лендинг | константа | `/formy-dlya-zalivki-epoksidnoj-smoloj` |

**Добавлять в `catalog`:** новый товар → поле в `products.ts` / `masters-products.ts`; новая SEO-подборка → `seo-catalog-landings.ts`; новый публичный путь каталога → соответствующая функция в `catalogSitemapEntries()`.

### 3.3 Секция `block`

Контент и журнал:

| URL | Источник |
|-----|----------|
| `/blog` | константа |
| `/blog?rubrika=news` | рубрика «Новости» |
| `/blog?rubrika=article` | рубрика «Статьи» |
| `/blog/{slug}` | `getAllBlogPosts()` + `publishedAt` → `lastmod` |

**Добавлять в `block`:** новая статья в `blog.ts`; новая рубрика с отдельным query — строка в `blockSitemapEntries()`.

---

## 4. SEO-правила (обязательно)

### 4.1 Что включать в sitemap

- Только **канонические** URL: тот адрес, который в `<link rel="canonical">` и в навигации.
- Только **200 OK** (не 404, не редирект как целевой URL дубля).
- **HTTPS** на проде, без `www` / с `www` — как в `NEXT_PUBLIC_SITE_URL` (единый стиль).
- **Абсолютные** `<loc>`: `https://домен/путь`, без пробелов, с encoding в XML (`&` → `&amp;`).

### 4.2 Что НЕ включать

- Якоря: `/#about`, `/#contacts`, `/#gallery` — один URL главной `/` достаточно.
- URL с **внутренними фильтрами** каталога (`?cat=`, `?sort=`, `priceMin`) — фильтры живут на `/catalog/vse-tovary` клиентски; в sitemap только чистый хаб и канонические лендинги.
- Страницы **закрытые** от индекса (`noindex`), thank-you, API (`/api/*`), preview, admin.
- **Дубли** одного контента (http + https, trailing slash — выбрать один вариант в canonical и sitemap).

### 4.3 Поля sitemap

| Поле | Правило в проекте |
|------|-------------------|
| `<loc>` | Обязательно |
| `<lastmod>` | Обязательно; ISO 8601; для статей — дата `publishedAt`; для товаров/хабов — дата генерации или реальная дата изменения, если появится в данных |
| `<changefreq>`, `<priority>` | **Не используем** — Google игнорирует; не раздувать XML |

### 4.4 Лимиты

- До **50 000 URL** и **50 МБ** в одном файле (стандарт sitemaps.org).
- При превышении — разбить на sitemap index + части (`main.xml`, `catalog.xml`, `block.xml`) и обновить этот промпт.

---

## 5. Окружение и деплой

```bash
# При сборке (рекомендуется)
NEXT_PUBLIC_SITE_URL=https://salamaha.ru

# Альтернатива на сервере (runtime)
SITE_URL=https://salamaha.ru
```

`resolveSiteUrl(request)` порядок: `NEXT_PUBLIC_SITE_URL` → `SITE_URL` → заголовки `Host` / `X-Forwarded-*`.

**После деплоя проверить:**

- `https://{домен}/sitemap.xml` — не пустой `<urlset>`, абсолютные `loc`.
- `https://{домен}/robots.txt` — строка `Sitemap: https://{домен}/sitemap.xml`.

См. также [`docs/DEPLOY.md`](DEPLOY.md).

---

## 6. Пошагово: добавить новый URL в sitemap

### Новая страница «сервис» (калькулятор, курс)

1. Создать `src/app/{path}/page.tsx` с уникальными `metadata` (title, description, canonical).
2. В [`mainSitemapEntries()`](src/lib/sitemap-sections.ts) добавить `"/{path}"`.
3. `npm run build` → открыть `/sitemap.xml` → найти URL в блоке `main`.
4. Отправить sitemap в Яндекс / Google (§7).

### Новый товар в каталоге изделий

1. Добавить объект в [`ALL_PRODUCTS`](src/lib/products.ts) (`slug` уникален).
2. Sitemap подхватит `/catalog/{slug}` автоматически через `catalogSitemapEntries()`.
3. Убедиться, что slug **не конфликтует** с SEO-лендингом и middleware.

### Новая SEO-подборка каталога

1. Добавить запису в [`SEO_CATALOG_LANDINGS`](src/lib/seo-catalog-landings.ts) + страницу `page.tsx`.
2. Путь появится через `allSeoLandingPaths()` в секции `catalog`.

### Новая статья журнала

1. Добавить пост в [`BLOG_POSTS`](src/lib/blog.ts) (`slug`, `publishedAt`).
2. URL `/blog/{slug}` и `lastmod` по дате публикации — автоматически в `block`.

### Новая секция sitemap (редко)

1. Расширить тип `SitemapSection` в `sitemap-sections.ts`.
2. Добавить функцию `*SitemapEntries()` и case в `sitemapEntriesForSection()`.
3. Добавить секцию в `SITEMAP_SECTIONS`.
4. Добавить комментарий в `SECTION_COMMENTS` в `sitemap-xml.ts`.

---

## 7. Search Console и Яндекс.Вебмастер

После выкладки на прод:

1. **Яндекс.Вебмастер** → Индексирование → Файлы Sitemap → `https://{домен}/sitemap.xml`
2. **Google Search Console** → Файлы Sitemap → тот же URL
3. Через 2–7 дней: «Покрытие» / «Страницы в поиске» — сравнить с числом URL в sitemap
4. При ошибках «URL недоступен» / «редирект» — проверить canonical и 301 (не включать редиректящие URL в sitemap)

`robots.txt` уже указывает на sitemap; дополнительно можно указать sitemap только в Вебмастере.

---

## 8. Чеклист перед релизом

- [ ] `NEXT_PUBLIC_SITE_URL` задан на CI/сервере **до** `npm run build`
- [ ] `/sitemap.xml` отдаёт `Content-Type: application/xml`
- [ ] Все `<loc>` начинаются с продакшен-домена, без `localhost`
- [ ] Нет якорей `#` в `<loc>`
- [ ] Нет дублей (один slug — один `<url>`)
- [ ] `/robots.txt` содержит `Sitemap: .../sitemap.xml`
- [ ] Новые публичные страницы есть в одной из секций `main` / `catalog` / `block`
- [ ] Статьи с корректным `lastmod` по дате публикации
- [ ] Страницы с `noindex` **не** в sitemap

---

## 9. Промпт для ИИ (копировать в задачу)

```
Ты — senior SEO и разработчик Next.js (App Router). Проект Salamaha Fine Art.

Задача: [опиши — новая страница / товар / статья / раздел sitemap].

Соблюдай docs/PROMPT_SITEMAP_XML.md:
- Один sitemap.xml (urlset), секции main / catalog / block.
- URL только из src/lib/sitemap-sections.ts и связанных данных (products, blog, seo-catalog-landings, masters-products).
- Абсолютные loc через resolveSiteUrl; robots.txt с Sitemap.
- Не добавлять якоря, ?cat=, API, noindex.
- Для товаров и статей — автогенерация из данных; для сервисных страниц — mainSitemapEntries().
- После изменений: описать как проверить /sitemap.xml и /robots.txt на проде.

Сдать: diff файлов, список новых URL в sitemap, чеклист §8.
```

---

## 10. Связанные документы

- [`SEO_CATEGORY_PAGES_PROMPT.md`](SEO_CATEGORY_PAGES_PROMPT.md) — канонические URL категорий и индексация
- [`docs/PROMPT_MASTERS_CATALOG.md`](PROMPT_MASTERS_CATALOG.md) — каталог мастеров в sitemap (`catalog`)
- [`docs/DEPLOY.md`](DEPLOY.md) — `NEXT_PUBLIC_SITE_URL`

---

## 11. Критерии «сделано профессионально»

- Sitemap **синхронизирован с кодом** (не ручной XML в `public/`).
- Поисковик получает **тот же набор URL**, что видит пользователь по каноническим ссылкам.
- Один файл, **структурированный** комментариями; легко diff и аудит.
- Robots **явно** отдаёт sitemap.
- Документированный процесс добавления URL без регресса в SEO.
