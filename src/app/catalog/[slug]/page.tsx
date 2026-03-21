import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LandingShell } from "@/components/layout/landing-shell";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ALL_PRODUCTS } from "@/lib/products";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = ALL_PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const text = encodeURIComponent(
    `Здравствуйте! Интересует: ${product.title} (${product.price}).`,
  );

  return (
    <LandingShell>
      <section className="py-12 lg:py-16">
        <Container>
          <Link
            href="/catalog"
            className="text-sm font-medium text-green/70 hover:text-green hover:underline"
          >
            ← Каталог
          </Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] border border-green/10 shadow-[var(--shadow-sm)]">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {product.badge ? (
                <div className="absolute left-4 top-4">
                  <Badge kind={product.badge} />
                </div>
              ) : null}
            </div>
            <div>
              <h1 className="font-serif text-4xl font-semibold text-green">
                {product.title}
              </h1>
              <p className="mt-4 text-xl text-fg/80">{product.price}</p>
              <p className="mt-6 text-sm leading-relaxed text-fg/70">
                Изделие изготавливается вручную. Срок и финальная стоимость
                зависят от размеров и пожеланий по пигменту/вставкам. Напишите
                в WhatsApp — пришлю варианты и смету.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  href={`${SITE.whatsapp}?text=${text}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Заказать в WhatsApp
                </Button>
                <Button href="/catalog" variant="secondary">
                  Другие товары
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </LandingShell>
  );
}
