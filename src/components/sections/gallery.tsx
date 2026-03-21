import Image from "next/image";
import { Container } from "@/components/layout/container";

type Shot = { src: string; aspect: string; alt?: string };

const shots: Shot[] = [
  { src: "/portfolio-1.png", aspect: "aspect-[4/5]" },
  { src: "/portfolio-2.png", aspect: "aspect-square" },
  { src: "/portfolio-3.png", aspect: "aspect-[5/6]" },
  {
    src: "/portfolio-4.png",
    aspect: "aspect-[3/4]",
    alt: "Расчёска из эпоксидной смолы с сухоцветами",
  },
  { src: "/portfolio-5.png", aspect: "aspect-[3/4]" },
  { src: "/portfolio-6.png", aspect: "aspect-[4/5]" },
];

export function Gallery() {
  return (
    <section id="gallery" className="scroll-mt-24 py-[var(--section-y)]">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-green/55">
          Портфолио
        </p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-green sm:text-4xl">
          Текстуры, цвет, свет
        </h2>
        <p className="mt-3 max-w-xl text-sm text-fg/65">
          Фрагменты работ в духе Pinterest: крупные кадры, мягкий зум при наведении.
        </p>

        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {shots.map((item, i) => (
            <div
              key={item.src}
              className="mb-4 break-inside-avoid overflow-hidden rounded-[var(--radius)]"
            >
              <div
                className={`relative w-full overflow-hidden ${item.aspect}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt ?? `Работа из портфолио ${i + 1}`}
                  fill
                  className="object-cover transition duration-500 hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
