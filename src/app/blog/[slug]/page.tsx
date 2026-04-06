import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LandingShell } from "@/components/layout/landing-shell";
import { Container } from "@/components/layout/container";
import {
  BLOG_CATEGORY_LABEL,
  formatBlogDate,
  getAllBlogSlugs,
  getBlogPostBySlug,
} from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Материал не найден" };
  return {
    title: `${post.title} — журнал Salamaha Fine Art`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    image: post.coverImage,
  };

  return (
    <LandingShell>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="relative overflow-hidden bg-gradient-to-b from-bg via-cream/50 to-bg pb-14 pt-10 lg:pb-20 lg:pt-12">
        <div
          className="pointer-events-none absolute left-0 top-0 h-48 max-w-xl bg-gradient-to-br from-gold/10 via-transparent to-transparent opacity-90"
          aria-hidden
        />
        <Container className="relative max-w-3xl">
          <Link
            href="/blog"
            className="text-sm font-medium text-green/70 hover:text-green hover:underline"
          >
            ← Все материалы
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-fg/60">
            <span className="rounded-md bg-sage-muted/70 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-green/85">
              {BLOG_CATEGORY_LABEL[post.category]}
            </span>
            <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
          </div>

          <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight text-green sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-fg/75">{post.excerpt}</p>

          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[var(--radius-lg)] border border-green/10 shadow-[var(--shadow-sm)]">
            <Image
              src={post.coverImage}
              alt={post.coverAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
              priority
            />
          </div>

          <div className="prose-blog mt-10 space-y-5 text-base leading-relaxed text-fg/80">
            {post.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-12 rounded-[var(--radius-lg)] border border-green/12 bg-sage-muted/25 px-5 py-4 text-sm text-fg/70">
            Есть вопрос по изделию или заказу?{" "}
            <Link
              href="/#contacts"
              className="font-medium text-green underline-offset-2 hover:underline"
            >
              Напишите нам
            </Link>
            .
          </div>
        </Container>
      </article>
    </LandingShell>
  );
}
