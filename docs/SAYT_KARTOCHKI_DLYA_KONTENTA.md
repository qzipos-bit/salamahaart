# Карточки и медиа сайта — чеклист для картинок и текстов

Файлы лежат в **`public/`** (пути ниже — от корня сайта, начинаются с `/`).

Описание карточки товара сейчас задаётся одним полем **заголовок + цена** в [`src/lib/products.ts`](../src/lib/products.ts). Для расширенного текста понадобится доработка компонента [`ProductCard`](../src/components/shop/product-card.tsx) и типа `Product`.

---

## 1. Категории на главной (`Категории`)

Блок: [`src/components/sections/categories.tsx`](../src/components/sections/categories.tsx).

| № | Название на карточке | Ссылка | Файл изображения | Что подготовить |
|---|----------------------|--------|------------------|-----------------|
| 1 | Столы | `/catalog?cat=stoly` | `/category-stoly.webp` | Обложка 4∶3, атмосфера «столы/столешницы» |
| 2 | Часы | `/catalog?cat=chasy` | `/category-chasy.webp` | Часы из смолы/дерева |
| 3 | Картины | `/catalog?cat=kartiny` | `/category-kartiny.webp` | Панно/картины |
| 4 | Декор | `/catalog?cat=dekor` | `/category-dekor.webp` | Микс декора |
| 5 | Посуда | `/catalog?cat=posuda` | `/category-posuda.webp` | Тарелки, доски, сервировка |
| 6 | Букеты в смоле | `/catalog?cat=bukety` | `/category-bukety.webp` | Букет/флора в смоле |

Дополнительно на странице есть общий абзац-пояснение каталога — при смене позиционирования его можно отредактировать в том же файле.

---

## 2. Товары — каталог и карточки (`/catalog`, лендинги)

Источник: [`src/lib/products.ts`](../src/lib/products.ts).  
Картинка в коде — поле **`image`**, подпись — **`title`**, цена — **`price`**, метка — **`badge`**: `hit` | `new` | `sale` (необязательно).

Ниже все позиции из `ALL_PRODUCTS` (в порядке в файле).  
**Колонка «Файл картинки»** — что сейчас в коде; позиции с одним и тем же файлом лучше в итоге развести на **уникальные фото**.

| № | `slug` (URL `/catalog/{slug}`) | Заголовок в карточке | Цена (как в коде) | Бейдж | Файл картинки |
|---|----------------------------------|----------------------|-------------------|-------|---------------|
| 1 | `stol-river` | Журнальный стол River | от 48 000 ₽ | hit | `/product-stol-river.webp` |
| 2 | `fotaramka-30x40-a4` | Фоторамка 30×40 под фото А4 | от 22 000 ₽ | new | `/product-fotaramka-30x40.webp` |
| 3 | `podnos-zoloto` | Сервировочный поднос | 8 900 ₽ | sale | `/product-podnos.webp` |
| 4 | `chasy-live` | Часы Live Edge | от 12 500 ₽ | — | `/product-chasy-live.webp` |
| 5 | `eloch-igrushki-2d` | Ёлочные 2D игрушки | от 1 200 ₽ | new | `/product-eloch-igrushki.webp` |
| 6 | `podstavka` | Подставка под украшения | 4 800 ₽ | — | `/product-podstavka.webp` |
| 7 | `stolik-zavtrak-utro` | Столик для завтрака «Утро» — компактный | от 9 800 ₽ | new | `/product-stol-river.webp` ⚠️ |
| 8 | `stolik-zavtrak-live-sage` | Столик для завтрака Live Edge, шалфей и смола | от 14 200 ₽ | — | `/product-stol-river.webp` ⚠️ |
| 9 | `stolik-zavtrak-skladnoj` | Складной столик для завтрака в постель | от 11 500 ₽ | hit | `/product-podnos.webp` ⚠️ |
| 10 | `stolik-zavtrak-bortiki` | Столик с бортиками и ручками для переноски | от 12 900 ₽ | — | `/product-stol-river.webp` ⚠️ |
| 11 | `stolik-zavtrak-noutbuk` | Столик для ноутбука и завтрака в постели | от 13 400 ₽ | — | `/product-podstavka.webp` ⚠️ |
| 12 | `stolik-zavtrak-podarok` | Подарочный столик для завтрака премиум | от 16 800 ₽ | new | `/product-fotaramka-30x40.webp` ⚠️ |
| 13 | `tarelka-dekor-shalfej` | Декоративная тарелка «Шалфей» — смола и дерево | от 4 200 ₽ | new | `/product-podnos.webp` ⚠️ |
| 14 | `blyudo-servirovochnoe-epoks` | Сервировочное блюдо из эпоксидной смолы | от 5 800 ₽ | — | `/product-stol-river.webp` ⚠️ |
| 15 | `tarelka-zakuski-syrnaya` | Тарелка для закусок и сырной нарезки | от 3 900 ₽ | — | `/product-podstavka.webp` ⚠️ |
| 16 | `nabor-tarelok-desert` | Набор из 2 десертных тарелок ручной работы | от 8 600 ₽ | hit | `/product-fotaramka-30x40.webp` ⚠️ |
| 17 | `blyudo-centralnoe-stol` | Центральное блюдо для стола (панно-сервировка) | от 9 200 ₽ | — | `/product-podnos.webp` ⚠️ |
| 18 | `tarelka-podarochnaya` | Подарочная тарелка премиум из смолы и слэба | от 7 400 ₽ | new | `/product-stol-river.webp` ⚠️ |
| 19 | `podnos-suhocvety-laguna` | Поднос с сухоцветами «Лагуна» в эпоксидной смоле | от 10 200 ₽ | new | `/product-fotaramka-30x40.webp` ⚠️ |
| 20 | `podnos-live-edge-moss` | Поднос Live Edge — мох, дерево и прозрачная смола | от 9 600 ₽ | — | `/product-stol-river.webp` ⚠️ |
| 21 | `podnos-zavtrak-kofe` | Мини-поднос для завтрака и кофе | от 6 400 ₽ | hit | `/product-podnos.webp` ⚠️ |
| 22 | `podnos-dekor-interer` | Декоративный поднос для интерьера и свечей | от 7 800 ₽ | — | `/product-podstavka.webp` ⚠️ |
| 23 | `podnos-podarochnyj-set` | Подарочный поднос премиум в фирменной упаковке | от 12 400 ₽ | new | `/product-podnos.webp` ⚠️ |
| 24 | `chasy-suhocvety-laguna` | Настенные часы с сухоцветами «Лагуна» | от 13 800 ₽ | new | `/product-chasy-live.webp` ⚠️ |
| 25 | `chasy-kvadrat-noir` | Квадратные часы минимализм, смола и латунь | от 11 200 ₽ | — | `/product-chasy-live.webp` ⚠️ |
| 26 | `chasy-sleb-graphit` | Часы из слэба и графитовой эпоксидной смолы | от 14 500 ₽ | hit | `/product-stol-river.webp` ⚠️ |
| 27 | `chasy-foto-smola` | Часы с фотографией в заливке эпоксидной смолы | от 15 900 ₽ | new | `/product-fotaramka-30x40.webp` ⚠️ |
| 28 | `chasy-moh-zelenyj` | Круглые часы с мхом и зелёной смолой | от 12 900 ₽ | — | `/product-chasy-live.webp` ⚠️ |
| 29 | `panno-more-golubaya` | Панно «Морская глубина» из эпоксидной смолы | от 18 500 ₽ | hit | `/product-stol-river.webp` ⚠️ |
| 30 | `kartina-abstrakciya-sage` | Абстрактная картина «Шалфей и туман» | от 14 200 ₽ | new | `/product-fotaramka-30x40.webp` ⚠️ |
| 31 | `panno-kamni-glass` | Панно с камнями в прозрачной эпоксидной смоле | от 16 800 ₽ | — | `/product-podnos.webp` ⚠️ |
| 32 | `kartina-minimal-pesok` | Минималистичное панно «Песок и линия» | от 11 900 ₽ | — | `/product-podstavka.webp` ⚠️ |
| 33 | `panno-diptih-more` | Диптих «Морской горизонт» — два полотна | от 28 000 ₽ | new | `/product-chasy-live.webp` ⚠️ |
| 34 | `doska-servirovochnaja-syr` | Сервировочная доска для сыра — орех и эпоксидная смола | от 8 900 ₽ | hit | `/product-podnos.webp` ⚠️ |
| 35 | `menazhnica-3-sekcii` | Менажница на 3 секции из дерева и смолы | от 11 200 ₽ | new | `/product-stol-river.webp` ⚠️ |
| 36 | `doska-live-edge-oval` | Овальная сервировочная доска Live Edge | от 9 600 ₽ | — | `/product-podnos.webp` ⚠️ |
| 37 | `doska-frukty-river` | Доска для фруктов с прозрачной «речной» смолой | от 7 800 ₽ | — | `/product-fotaramka-30x40.webp` ⚠️ |
| 38 | `menazhnica-zakuski` | Менажница для закусок и антипасти | от 12 400 ₽ | new | `/product-podstavka.webp` ⚠️ |
| 39 | `doska-premium-podarok` | Подарочная сервировочная доска премиум | от 14 800 ₽ | — | `/product-stol-river.webp` ⚠️ |

⚠️ — сейчас используется **тот же файл**, что и у других позиций; для витрины лучше свои снимки и при необходимости новые имена файлов + правка в `products.ts`.

**Избранное на главной** — это первые 4 строки таблицы (`FEATURED_PRODUCTS`): те же карточки, что в каталоге.

---

## 3. Тематические лендинги каталога

Не отдельные «карточки», но на страницах выводятся **те же товары по slug** из таблицы выше. Пути (все в `src/app/catalog/...`):

| Раздел | Путь на сайте |
|--------|----------------|
| Столик для завтрака | `/catalog/dekorativnye-stoliki/breakfasttable` |
| Тарелки и блюда | `/catalog/tarelki-i-blyuda-iz-epoksidnoj-smoly` |
| Подносы | `/catalog/podnosy-iz-epoksidnoj-smoly` |
| Сервировочные доски | `/catalog/servirovochnye-doski-iz-dereva-i-smoly` |
| Часы | `/catalog/chasy-kartiny/chasy-iz-smoly` |
| Картины | `/catalog/chasy-kartiny/kartiny-iz-smoly` |

Конфиг списков slug: [`src/lib/seo-catalog-landings.ts`](../src/lib/seo-catalog-landings.ts).

---

## 4. Блог — карточки и статьи

Источник: [`src/lib/blog.ts`](../src/lib/blog.ts). Превью на главной берёт **3 последних** по дате.

| slug | Заголовок | Обложка | Лид (excerpt) |
|------|-----------|---------|---------------|
| `uhod-stoleshnica-iz-smoly` | Как ухаживать за столешницей из смолы | `/blog-uhod-stoleshnica.webp` | Простые правила, чтобы сохранить блеск на годы. |
| `palitra-2026-naturalnye-ottenki` | Палитра 2026: спокойные натуральные оттенки | `/blog-palitra-2026.webp` | Spring Water, Sand, Wood и Navy… |
| `sokhranenie-buketa-v-smole` | Сохранение букета: что важно знать | `/blog-buket.webp` | Сроки, упаковка доставки, оттенки пигмента. |
| `novaya-vitrina-rabot-v-studii` | Обновили витрину работ в студии | `/blog-uhod-stoleshnica.webp` ⚠️ дубль | Фотографии новых столешниц… |

Для каждой статьи дополнительно: **`coverAlt`** (SEO/доступность) и тело **`content`** — массив абзацев в том же файле.

---

## 5. Портфолио (галерея на главной)

[`src/components/sections/gallery.tsx`](../src/components/sections/gallery.tsx) — сетка без текстовых карточек, только фото:

| Файл | Примечание |
|------|------------|
| `/portfolio-1.webp` | aspect 4∶5 |
| `/portfolio-2.webp` | квадрат |
| `/portfolio-3.webp` | 5∶6 |
| `/portfolio-4.webp` | 3∶2 (+ подпись «Эпоксидная смола + дерево» в коде) |
| `/portfolio-5.webp` | 3∶4 |
| `/portfolio-6.webp` | 4∶5 |

При необходимости подписи к кадрам — правка в `gallery.tsx`.

---

## 6. Прочее брендинг / UI (не карточки каталога)

| Назначение | Файл |
|------------|------|
| Логотип в шапке и JSON-LD | `/logo-salamaha.webp` |
| Hero / визуалы главной | проверить [`hero.tsx`](../src/components/sections/hero.tsx), [`hero-resin-visual.tsx`](../src/components/sections/hero-resin-visual.tsx) при смене иллюстраций |

Калькуляторы (**расход смолы**, **стол**) — без карточек с вашими фото, только UI.

---

## Сводка по уникальным файлам в `public`

Имеет смысл завести **отдельный снимок на каждый товар**, даже если имя файла остаётся вида `product-{slug}.webp`.

**Сейчас задействованы имена (каталог + главная):**

- `product-stol-river.webp`, `product-fotaramka-30x40.webp`, `product-podnos.webp`, `product-chasy-live.webp`, `product-eloch-igrushki.webp`, `product-podstavka.webp`
- `category-*.webp` (6 шт.)
- `blog-uhod-stoleshnica.webp`, `blog-palitra-2026.webp`, `blog-buket.webp`
- `portfolio-1.webp` … `portfolio-6.webp`

После замены файлов **имена путей сохраняйте** или одновременно обновляйте код в `products.ts` / `categories.tsx` / `blog.ts` / `gallery.tsx`.
