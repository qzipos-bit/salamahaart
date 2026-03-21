import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";

const posts = [
  {
    title: "Как ухаживать за столешницей из смолы",
    excerpt: "Простые правила, чтобы сохранить блеск на годы.",
    img: "/blog-uhod-stoleshnica.png",
    href: "#blog",
  },
  {
    title: "Палитра 2026: спокойные натуральные оттенки",
    excerpt:
      "Spring Water, Sand, Wood и Navy — сочетания для тихих, дорогих интерьеров.",
    img: "/blog-palitra-2026.png",
    href: "#blog",
  },
  {
    title: "Сохранение букета: что важно знать",
    excerpt: "Сроки, упаковка доставки, оттенки пигмента.",
    img: "/blog-buket.png",
    href: "#blog",
  },
];

export function BlogPreview() {
  return (
    <section id="blog" className="scroll-mt-24 py-[var(--section-y)] bg-sage-muted/25">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-green/55">
              Журнал
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-green sm:text-4xl">
              Полезное вдохновение
            </h2>
          </div>
          <Link
            href="#blog"
            className="text-sm font-medium text-green underline-offset-4 hover:underline"
          >
            Все статьи →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.title}
              className="group overflow-hidden rounded-[var(--radius-lg)] border border-green/10 bg-cream/40 shadow-[var(--shadow-sm)] transition hover:-translate-y-1 hover:shadow-[var(--shadow)]"
            >
              <Link href={post.href} className="block">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.img}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-semibold text-green group-hover:underline">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-fg/65">{post.excerpt}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
