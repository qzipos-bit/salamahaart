import Image from "next/image";
import { Container } from "@/components/layout/container";

const reviews = [
  {
    name: "Алина",
    text: "Стол приехал идеально упакованный. На солнце смола просто поёт — как в студии.",
    avatar: "/review-marina.png",
  },
  {
    name: "Марина & Илья",
    text: "Сохранили свадебный букет. Очень бережно, согласовали оттенок под гостиную.",
    avatar: "/review-alina.png",
  },
  {
    name: "Екатерина",
    text: "Панно стало центром комнаты. Друзья думают, что из галереи.",
    avatar: "/review-ekaterina.png",
  },
];

export function Reviews() {
  return (
    <section className="py-[var(--section-y)] bg-sage-muted/30">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-green/55">
          Отзывы
        </p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-green sm:text-4xl">
          Тёплые слова тех, кто уже живёт с работами
        </h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {reviews.map((r) => (
            <blockquote
              key={r.name}
              className="glass-panel flex flex-col rounded-[var(--radius-lg)] p-6"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-cream">
                  <Image
                    src={r.avatar}
                    alt={`${r.name}, фото`}
                    fill
                    className="object-cover"
                    sizes="44px"
                  />
                </div>
                <div>
                  <cite className="not-italic text-sm font-semibold text-green">
                    {r.name}
                  </cite>
                  <p className="text-[11px] text-fg/45">Клиент</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-fg/75">
                «{r.text}»
              </p>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
