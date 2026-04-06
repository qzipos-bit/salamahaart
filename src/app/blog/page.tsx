import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LandingShell } from "@/components/layout/landing-shell";
import { Container } from "@/components/layout/container";
import {
  BLOG_CATEGORY_LABEL,
  type BlogCategory,
  formatBlogDate,
  getBlogPostsByCategory,
} from "@/lib/blog";

export const metadata: Metadata = {
  title: "Журнал — новости и статьи мастерской Salamaha Fine Art",
  description:
    "Новости студии, уход за смолой, палитры, сохранение букетов и советы по заказу столешниц и декора из эпоксидной смолы.",
};

type Props = {
  searchParams: Promise<{ rubrika?: string }>;
};

const filters: { key: BlogCategory | "all"; label: string; param: string }[] = [
  { key: "all", label: "Все материалы", param: "" },
  { key: "news", label: "Новости", param: "news" },
  { key: "article", label: "Статьи", param: "article" },
];

export default async function BlogPage({ searchParams }: Props) {
  const { rubrika } = await searchParams;
  const category: BlogCategory | "all" =
    rubrika === "news" || rubrika === "article" ? rubrika : "all";
  const posts = getBlogPostsByCategory(category);

  return (
    <LandingShell>
      <div className="relative overflow-hidden bg-gradient-to-b from-bg via-cream/80 to-sage-muted/25 py-10 lg:py-14">
        <div
          className="pointer-events-none absolute left-0 top-0 h-56 w-full max-w-2xl bg-gradient-to-br from-gold/10 via-transparent to-transparent opacity-90"
          aria-hidden
        />
        <Container className="relative">
          <Link
            href="/"
            className="text-sm font-medium text-green/70 hover:text-green hover:underline"
          >
            ← На главную
          </Link>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-green/55">
            Журнал
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-green sm:text-4xl">
            Новости и статьи
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg/75 sm:text-base">
            Материалы о студии, уходе за изделиями и идеях для заказа. Добавляем
            публикации по мере выхода — заглядывайте сюда или в соцсети.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {filters.map((f) => {
              const active = category === f.key;
              const href = f.param === "" ? "/blog" : `/blog?rubrika=${f.param}`;
              return (
                <Link
                  key={f.key}
                  href={href}
                  className={[
                    "rounded-full border px-4 py-2 text-sm font-medium transition",
                    active
                      ? "border-gold/50 bg-white text-green shadow-[var(--shadow-sm)]"
                      : "border-green/15 bg-white/60 text-green/80 hover:border-gold/30",
                  ].join(" ")}
                >
                  {f.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-green/10 bg-cream/40 shadow-[var(--shadow-sm)] transition hover:-translate-y-1 hover:shadow-[var(--shadow)]"
              >
                <Link href={`/blog/${post.slug}`} className="flex flex-1 flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.coverAlt}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-fg/55">
                      <span className="rounded-md bg-sage-muted/60 px-2 py-0.5 font-medium text-green/80">
                        {BLOG_CATEGORY_LABEL[post.category]}
                      </span>
                      <time dateTime={post.publishedAt}>
                        {formatBlogDate(post.publishedAt)}
                      </time>
                    </div>
                    <h2 className="mt-2 font-serif text-lg font-semibold text-green group-hover:underline">
                      {post.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm text-fg/65">{post.excerpt}</p>
                    <span className="mt-3 text-sm font-medium text-green">
                      Читать →
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {posts.length === 0 ? (
            <p className="mt-10 text-center text-fg/60">В этой рубрике пока нет записей.</p>
          ) : null}
        </Container>
      </div>
    </LandingShell>
  );
}
