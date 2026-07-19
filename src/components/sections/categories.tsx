import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { CATALOG_SHOP_PATH } from "@/lib/catalog-filters";
import { BUKET_LANDING_PATH } from "@/lib/buket-landing";
import { listCatalogCategoryNavLinks } from "@/lib/catalog-category-pages";

const items = [
  ...listCatalogCategoryNavLinks().map((page) => ({
    title: page.label,
    href: page.href,
    img: page.image,
  })),
  {
    title: "Сохранение букета",
    href: BUKET_LANDING_PATH,
    img: "/category-bukety.webp",
  },
];

const categoryCardClass =
  "group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-green/15 bg-white shadow-[var(--shadow-sm)] transition-shadow duration-300 hover:shadow-[var(--shadow)]";

export function Categories() {
  return (
    <section id="categories" className="scroll-mt-28 py-[var(--section-y)]">
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
            href={CATALOG_SHOP_PATH}
            className="text-sm font-medium text-green underline-offset-4 hover:underline"
          >
            Все товары →
          </Link>
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-fg/70 sm:text-base">
          В каталоге собраны изделия из эпоксидной смолы: столы, часы, картины,
          декор, посуда и сохранённые букеты. Вы можете выбрать готовые
          эпоксидные изделия или заказать индивидуальную работу под интерьер.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 [contain:layout]">
          {items.map((c, index) => (
            <Link key={c.href} href={c.href} className={categoryCardClass}>
              <div className="relative aspect-[4/3] overflow-hidden bg-sage-muted/25">
                <Image
                  src={c.img}
                  alt={c.title}
                  fill
                  priority={index < 3}
                  className="object-cover transition duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-green-deep/0 transition-colors duration-300 group-hover:bg-green-deep/8"
                  aria-hidden
                />
              </div>
              <div className="border-t border-green/10 px-5 py-4">
                <span className="font-sans text-lg font-bold leading-snug text-green-deep transition-colors group-hover:text-green">
                  {c.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
