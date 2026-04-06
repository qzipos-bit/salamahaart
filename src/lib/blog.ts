/**
 * Материалы блога. Добавляйте записи в BLOG_POSTS — они появятся в /blog и в превью на главной.
 * Порядок в массиве не важен: сортировка по дате (сначала новые).
 */

export type BlogCategory = "news" | "article";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** YYYY-MM-DD */
  publishedAt: string;
  category: BlogCategory;
  coverImage: string;
  /** Альтернативный текст обложки */
  coverAlt: string;
  /** Абзацы текста (без HTML) */
  content: string[];
};

export const BLOG_CATEGORY_LABEL: Record<BlogCategory, string> = {
  news: "Новость",
  article: "Статья",
};

const BLOG_POSTS: BlogPost[] = [
  {
    slug: "uhod-stoleshnica-iz-smoly",
    title: "Как ухаживать за столешницей из смолы",
    excerpt: "Простые правила, чтобы сохранить блеск на годы.",
    publishedAt: "2026-03-18",
    category: "article",
    coverImage: "/blog-uhod-stoleshnica.webp",
    coverAlt: "Столешница из эпоксидной смолы в интерьере",
    content: [
      "Эпоксидное покрытие устойчиво к бытовым кислотам и влаге, но любит бережное обращение. Для ежедневной уборки достаточно мягкой ткани и тёплой воды с нейтральным моющим средством без абразивов.",
      "Не режьте прямо по смоле — используйте разделочные доски. Горячие кастрюли лучше ставить на подставку: резкая температура может повлиять на блеск полировки.",
      "Раз в несколько месяцев можно обработать поверхность воском или специальным маслом для смолы по рекомендации мастера — так проще поддерживать равномерный глянец и скрыть мелкие потёртости со времени.",
    ],
  },
  {
    slug: "palitra-2026-naturalnye-ottenki",
    title: "Палитра 2026: спокойные натуральные оттенки",
    excerpt:
      "Spring Water, Sand, Wood и Navy — сочетания для тихих, дорогих интерьеров.",
    publishedAt: "2026-02-05",
    category: "article",
    coverImage: "/blog-palitra-2026.webp",
    coverAlt: "Примеры цветовых сочетаний для смолы и дерева",
    content: [
      "В работе с деревом и смолой мы часто слышим запрос на «спокойную роскошь»: без кричащих контрастов, с глубиной слэба и мягким цветом заливки.",
      "Нейтральные холодные полупрозрачности хорошо дружат с дубом и орехом; тёплый песочный тон смолы — с более светлыми породами и минималистичной мебелью.",
      "Точный оттег подбирается под ваш интерьер и образцы — эта подборка лишь отправная точка для консультации.",
    ],
  },
  {
    slug: "sokhranenie-buketa-v-smole",
    title: "Сохранение букета: что важно знать",
    excerpt: "Сроки, упаковка доставки, оттенки пигмента.",
    publishedAt: "2026-01-22",
    category: "article",
    coverImage: "/blog-buket.webp",
    coverAlt: "Букет в эпоксидной смоле",
    content: [
      "Чтобы зафиксировать букет в смоле, цветы должны быть хорошо высушены по технологии сушки — влага внутри бутона неизбежно даст пузыри и помутнение в массе.",
      "Сроки мастерской зависят от очереди и объёма формы: заливка часто делается в несколько слоёв, между ними нужно время на полимеризацию и контроль.",
      "Доставку лучше согласовать заранее: надёжная упаковка и страховка снимают риск сколов на готовом изделии.",
    ],
  },
  {
    slug: "novaya-vitrina-rabot-v-studii",
    title: "Обновили витрину работ в студии",
    excerpt:
      "Фотографии новых столешниц и декор — можно записаться на просмотр перед заказом.",
    publishedAt: "2026-04-01",
    category: "news",
    coverImage: "/blog-uhod-stoleshnica.webp",
    coverAlt: "Обновлённая экспозиция работ мастерской",
    content: [
      "Мы расширили выставочную зону: добавили столешницы в разных техниках — от классического слэба до сложной прозрачной заливки.",
      "Если вы выбираете стол или декор и хотите увидеть текстуры «живьём», напишите нам — подберём удобное время визита.",
    ],
  },
];

function byDateDesc(a: BlogPost, b: BlogPost): number {
  return b.publishedAt.localeCompare(a.publishedAt);
}

export function getAllBlogPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(byDateDesc);
}

export function getBlogPostsByCategory(
  category: BlogCategory | "all",
): BlogPost[] {
  const all = getAllBlogPosts();
  if (category === "all") return all;
  return all.filter((p) => p.category === category);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}

/** Для блока на главной */
export function getFeaturedBlogPosts(limit = 3): BlogPost[] {
  return getAllBlogPosts().slice(0, limit);
}

export function formatBlogDate(isoDate: string): string {
  const d = new Date(isoDate + "T12:00:00");
  return d.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
