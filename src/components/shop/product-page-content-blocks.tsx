import Link from "next/link";
import type { ProductPageContent } from "@/lib/product-page-content.types";
import { SITE } from "@/lib/site";

type Props = {
  content: ProductPageContent;
  /** Ссылка на SEO-лендинг категории, если slug входит в подборку */
  categoryLanding?: { label: string; href: string };
};

export function ProductPageLead({ content }: Pick<Props, "content">) {
  return (
    <p className="mt-6 text-base leading-relaxed text-fg/85">
      {content.description}
    </p>
  );
}

export function ProductPageContentDetails({
  content,
  categoryLanding,
}: Props) {
  return (
    <div className="mt-12 space-y-10 border-t border-green/10 pt-12">
      <section aria-labelledby="product-specs-heading">
        <h2
          id="product-specs-heading"
          className="font-serif text-2xl font-semibold text-green sm:text-3xl"
        >
          Характеристики
        </h2>
        <dl className="mt-6 grid gap-3 sm:grid-cols-2">
          {content.attributes.map((row) => (
            <div
              key={row.name}
              className="rounded-[var(--radius-lg)] border border-green/10 bg-cream/30 px-4 py-3"
            >
              <dt className="text-xs font-semibold uppercase tracking-wide text-green/60">
                {row.name}
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-fg/85">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="product-care-heading">
        <h2
          id="product-care-heading"
          className="font-serif text-2xl font-semibold text-green sm:text-3xl"
        >
          Уход
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-fg/85">
          {content.care}
        </p>
      </section>

      <section aria-labelledby="product-order-heading">
        <h2
          id="product-order-heading"
          className="font-serif text-2xl font-semibold text-green sm:text-3xl"
        >
          Доставка и заказ
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-fg/85">
          Изделие изготавливается вручную в студии Salamaha Fine Art. Срок и
          финальная стоимость зависят от размеров, оттенка смолы и пожеланий по
          вставкам. Напишите в WhatsApp — пришлём варианты, фото этапов работы и
          смету. Доставка по России, надёжная упаковка.
        </p>
        <p className="mt-4">
          <Link
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-green underline-offset-4 hover:underline"
          >
            Написать в WhatsApp
          </Link>
        </p>
      </section>

      {categoryLanding ? (
        <p className="text-sm text-fg/70">
          Смотрите также раздел{" "}
          <Link
            href={categoryLanding.href}
            className="font-medium text-green underline-offset-4 hover:underline"
          >
            {categoryLanding.label}
          </Link>
          .
        </p>
      ) : null}
    </div>
  );
}
