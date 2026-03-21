import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";

const items = [
  {
    title: "Столы",
    href: "/catalog?cat=stoly",
    img: "/category-stoly.png",
  },
  {
    title: "Часы",
    href: "/catalog?cat=chasy",
    img: "/category-chasy.png",
  },
  {
    title: "Картины",
    href: "/catalog?cat=kartiny",
    img: "/category-kartiny.png",
  },
  {
    title: "Декор",
    href: "/catalog?cat=dekor",
    img: "/category-dekor.png",
  },
  {
    title: "Посуда",
    href: "/catalog?cat=posuda",
    img: "/category-posuda.png",
  },
  {
    title: "Букеты в смоле",
    href: "/catalog?cat=bukety",
    img: "/category-bukety.png",
  },
];

export function Categories() {
  return (
    <section id="categories" className="scroll-mt-24 py-[var(--section-y)]">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-green/55">
              Каталог
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-green sm:text-4xl">
              Категории
            </h2>
          </div>
          <Link
            href="/catalog"
            className="text-sm font-medium text-green underline-offset-4 hover:underline"
          >
            Все товары →
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="group relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)]"
            >
              <Image
                src={c.img}
                alt={c.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-green-deep/0 transition duration-300 group-hover:bg-green-deep/35" />
              <div className="absolute inset-0 flex items-end p-6">
                <span className="translate-y-2 text-lg font-semibold text-cream opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {c.title}
                </span>
              </div>
              <span className="absolute left-6 top-6 rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold text-green shadow-sm transition group-hover:opacity-0">
                {c.title}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
