# Аудит: Schema.org Organization на сайте Salamaha Fine Art

Дата проверки по коду: актуальная версия репозитория.

## Как устроено в проекте

Компонент **`OrganizationJsonLd`** подключён в **корневом** `src/app/layout.tsx` сразу после открытия `<body>`. Это значит: **один и тот же скрипт JSON-LD выводится на каждой странице**, которую отдаёт App Router (включая ошибки, если они используют тот же root layout).

Отдельно на SEO-лендингах каталога и на странице `/catalog` добавляются **другие** типы (`WebPage`, `BreadcrumbList`, `ItemList`, `FAQPage`) — они **не заменяют** Organization и **не дублируют** второй Organization.

## Сводка по страницам

| Маршрут / шаблон | Organization в HTML | Примечание |
|------------------|----------------------|------------|
| `/` (главная) | Да | root layout |
| `/catalog` | Да | root layout + свой FAQPage и т.д. |
| `/catalog/[slug]` (карточка товара) | Да | все slug из `ALL_PRODUCTS` |
| `/catalog/dekorativnye-stoliki/breakfasttable` | Да | + WebPage / FAQ / … |
| `/catalog/tarelki-i-blyuda-iz-epoksidnoj-smoly` | Да | |
| `/catalog/podnosy-iz-epoksidnoj-smoly` | Да | |
| `/catalog/chasy-kartiny/chasy-iz-smoly` | Да | |
| `/catalog/chasy-kartiny/kartiny-iz-smoly` | Да | |
| `/catalog/servirovochnye-doski-iz-dereva-i-smoly` | Да | |
| `/_not-found` (404) | Да* | если используется тот же root layout |

\*На 404 наличие Organization допустимо и не мешает; при желании можно вынести в отдельный layout без JSON-LD — сейчас не сделано.

**Итог по охвату:** для поисковых систем блок **Organization присутствует на всех перечисленных URL** — требование «одна организация на весь сайт в layout» соблюдено.

## Соответствие правилам ПС (Google / Яндекс)

| Критерий | Статус | Комментарий |
|----------|--------|-------------|
| Тип `Organization` | OK | Корректный тип для бренда/студии |
| `name` | OK | `Salamaha Fine Art` |
| `url` | **Условно** | Заполняется только если задан `NEXT_PUBLIC_SITE_URL`. Без него поле **нет** — для продакшена URL обязателен |
| `logo` | **Условно** | Абсолютный URL к `/logo-salamaha.webp` только при заданном `siteUrl`; файл должен реально отдаваться с продакшена |
| `@id` | **Условно** | `{siteUrl}#organization` при заданном `siteUrl` — удобно для связки с другими сущностями |
| `telephone` | OK | E.164 `+79384440033` |
| `email` | ⚠️ | Сейчас `hello@salamaha.example` — **плейсхолдер**; для продакшена заменить на реальный ящик |
| `address` | OK с оговоркой | `PostalAddress`: страна, город, `streetAddress` совпадает с текстом на сайте; нет вымышленного номера дома |
| `contactPoint` | OK | Добавлен `ContactPoint` (customer service, RU, русский язык) |
| `sameAs` | Опционально | Заполняется из `NEXT_PUBLIC_ORG_SAME_AS` (URL через запятую); пока пусто, если env не задан |
| Дубли Organization | OK | Один блок на страницу из layout |

## Рекомендации перед продакшеном

1. Задать **`NEXT_PUBLIC_SITE_URL`** (канонический домен без слэша в конце).
2. Заменить **`SITE.email`** на реальный контактный email.
3. При наличии соцсетей — **`NEXT_PUBLIC_ORG_SAME_AS`** (например `https://vk.com/...,https://t.me/...`).
4. Проверить в **[Rich Results Test](https://search.google.com/test/rich-results)** и **[Яндекс.Вебмастер](https://webmaster.yandex.ru/)** разметку на одной из страниц после деплоя.

## Связанные файлы

- `src/components/seo/organization-jsonld.tsx`
- `src/lib/site.ts`
- `src/app/layout.tsx`
- Промт для подготовки разметки: `docs/MICRODATA_ORGANIZATION_PROMPT.md`
