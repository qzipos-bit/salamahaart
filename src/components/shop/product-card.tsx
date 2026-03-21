import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type Product = {
  slug: string;
  title: string;
  price: string;
  image: string;
  badge?: "hit" | "sale" | "new";
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-green/10 bg-cream/40 shadow-[var(--shadow-sm)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow)]">
      <Link href={`/catalog/${product.slug}`} className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {product.badge ? (
          <div className="absolute left-4 top-4">
            <Badge kind={product.badge} />
          </div>
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <Link href={`/catalog/${product.slug}`}>
          <h3 className="font-serif text-lg font-semibold text-green transition group-hover:text-green-deep">
            {product.title}
          </h3>
        </Link>
        <p className="mt-2 text-sm text-fg/65">{product.price}</p>
        <div className="mt-4">
          <Button href={`/catalog/${product.slug}`} variant="secondary" className="w-full !py-2.5 !text-sm">
            В корзину
          </Button>
        </div>
      </div>
    </article>
  );
}
