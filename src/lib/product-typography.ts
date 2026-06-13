/** Название товара в карточке каталога / витрине. */
export const PRODUCT_CARD_TITLE_CLASS =
  "font-sans text-[1.0625rem] font-bold leading-snug tracking-tight text-fg sm:text-lg";

/** Название товара на странице карточки. */
export const PRODUCT_PAGE_TITLE_CLASS =
  "font-serif text-4xl font-semibold tracking-tight text-fg";

/** Название позиции в корзине. */
export const PRODUCT_CART_TITLE_CLASS =
  "font-sans text-base font-bold leading-snug text-fg";

/** База для денежных сумм на светлом фоне — sans, контрастный цвет, нормальный tracking. */
const PRICE_SANS =
  "font-sans font-bold tabular-nums tracking-normal antialiased";

/** Цена в карточке товара. */
export const PRODUCT_CARD_PRICE_CLASS =
  `mt-2 ${PRICE_SANS} text-lg text-green-deep sm:text-xl`;

/** Главная цена на странице товара. */
export const PRODUCT_PAGE_PRICE_CLASS =
  `mt-4 ${PRICE_SANS} text-3xl text-green-deep lg:text-4xl`;

/** Цена позиции в корзине. */
export const CART_ITEM_PRICE_CLASS =
  `mt-1.5 ${PRICE_SANS} text-base text-green-deep`;

/** Итого заказа в корзине. */
export const CART_ORDER_TOTAL_CLASS =
  `${PRICE_SANS} text-2xl text-green-deep`;

/** Промежуточная сумма / скидка в корзине. */
export const CART_LINE_PRICE_CLASS =
  "font-sans text-sm font-semibold tabular-nums tracking-normal text-fg";

/** Скидка в корзине (зелёный акцент). */
export const CART_DISCOUNT_PRICE_CLASS =
  `${PRICE_SANS} text-sm text-green-deep`;

/** Цена варианта в селекторе размеров. */
export const PRODUCT_VARIANT_PRICE_CLASS =
  `mt-0.5 block text-sm font-bold tabular-nums tracking-normal text-green-deep`;

/** Очень крупная цена — итог калькулятора стола. */
export const PRICE_DISPLAY_XL_CLASS =
  `${PRICE_SANS} text-3xl text-green-deep sm:text-4xl md:text-[2.5rem]`;

/** Средний блок цены — карточки вариантов, итого в таблице. */
export const PRICE_DISPLAY_LG_CLASS =
  `${PRICE_SANS} text-xl text-green-deep sm:text-2xl`;

/** Цена на hero курса и в блоках «Стоимость». */
export const PRICE_DISPLAY_HERO_CLASS =
  `${PRICE_SANS} text-2xl text-green-deep sm:text-3xl`;

/** Цена в таблице / строке расчёта. */
export const PRICE_TABLE_CELL_CLASS =
  "font-sans font-semibold tabular-nums tracking-normal text-green-deep";

/** Inline-цена в тексте. */
export const PRICE_INLINE_EMPHASIS_CLASS =
  `${PRICE_SANS} text-green-deep`;

/** Крупная цена на тёмном фоне (таймер, промо). */
export const PRICE_ON_DARK_LG_CLASS =
  `${PRICE_SANS} text-2xl text-gold sm:text-3xl`;

/** Зачёркнутая старая цена на тёмном фоне. */
export const PRICE_STRIKETHROUGH_ON_DARK_CLASS =
  "font-sans text-lg font-semibold tabular-nums tracking-normal text-cream/55 line-through decoration-gold/50";

/** Числа в таймере (светлые плашки на тёмном блоке). */
export const PRICE_COUNTDOWN_UNIT_CLASS =
  `${PRICE_SANS} text-3xl text-green-deep sm:text-4xl`;

/** Диапазон цены в подсказке фильтра каталога. */
export const PRICE_FILTER_SUMMARY_CLASS =
  "font-sans font-semibold tabular-nums tracking-normal text-green-deep";

/** Заголовок блока фильтров («Фильтры»). */
export const FILTER_SIDEBAR_TITLE_CLASS =
  "text-xs font-bold uppercase tracking-[0.18em] text-fg/80";

/** Подзаголовок секции («Категория», «Цена»). */
export const FILTER_SIDEBAR_SECTION_CLASS =
  "text-xs font-bold uppercase tracking-wider text-fg/75";

/** Ссылка «Сбросить» в фильтрах. */
export const FILTER_SIDEBAR_RESET_CLASS =
  "shrink-0 text-sm font-semibold text-green-deep underline-offset-4 hover:text-green hover:underline";

/** Пункт категории (неактивный). */
export const FILTER_NAV_ROW_IDLE_CLASS =
  "border-green/15 bg-white font-sans text-sm font-semibold text-fg hover:border-green/35 hover:bg-sage-muted/40";

/** Пункт подкатегории (неактивный). */
export const FILTER_NAV_SUB_IDLE_CLASS =
  "font-sans text-sm font-semibold text-fg hover:bg-sage-muted/50 hover:text-green-deep";

/** Подкатегория (активная). */
export const FILTER_NAV_SUB_ACTIVE_CLASS =
  "bg-green/12 font-sans text-sm font-bold text-fg";

/** Текущий диапазон цены. */
export const FILTER_PRICE_VALUE_CLASS =
  `${PRICE_SANS} text-xl text-fg sm:text-2xl`;

/** Подписи «От» / «До» у слайдера. */
export const FILTER_RANGE_LABEL_CLASS = "text-sm font-semibold text-fg/85";

/** Поле ввода числа в калькуляторе расхода смолы. */
export const RESIN_CALC_INPUT_CLASS =
  "font-sans text-base font-semibold tabular-nums tracking-normal text-fg sm:text-lg";

/** Суффикс (см, мм, г) у поля ввода калькулятора смолы. */
export const RESIN_CALC_INPUT_SUFFIX_CLASS =
  "font-sans text-base font-bold tabular-nums tracking-normal text-gold";

/** Итог «Всего» в калькуляторе расхода смолы. */
export const RESIN_CALC_RESULT_TOTAL_CLASS =
  `${PRICE_SANS} text-2xl text-green-deep sm:text-3xl`;

/** Строка компонента A/B в результате калькулятора смолы. */
export const RESIN_CALC_RESULT_LINE_CLASS =
  `${PRICE_SANS} text-xl text-green-deep sm:text-2xl`;

/** Подпись строки результата калькулятора смолы. */
export const RESIN_CALC_RESULT_LABEL_CLASS =
  "font-sans text-sm font-semibold text-green-deep/90 sm:text-base";

/** Основной текст блоков калькулятора смолы. */
export const RESIN_CALC_BODY_CLASS =
  "font-sans text-sm leading-relaxed text-fg/80 sm:text-base";

/** Обёртка сайдбара фильтров. */
export const FILTER_SIDEBAR_PANEL_CLASS =
  "rounded-[var(--radius-lg)] border border-green/15 bg-white p-5 shadow-[var(--shadow-sm)]";
