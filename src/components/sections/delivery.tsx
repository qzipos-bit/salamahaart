import { Container } from "@/components/layout/container";

const items = [
  {
    title: "Доставка",
    text: "Доставка ТК и курьер по РФ. Страхуем крупные изделия из эпоксидной смолы и дерева.",
    icon: "▢",
  },
  {
    title: "Оплата",
    text: "Предоплата / рассрочка по договорённости для заказов от суммы X.",
    icon: "◈",
  },
  {
    title: "Сроки",
    text: "От 2 недель в зависимости от сложности и очереди.",
    icon: "◐",
  },
];

export function Delivery() {
  return (
    <section className="py-[var(--section-y)]">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-green/55">
          Сервис
        </p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-green sm:text-4xl">
          Доставка и оплата
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-[var(--radius-lg)] border border-green/10 bg-cream/30 p-6"
            >
              <span className="text-lg text-gold" aria-hidden>
                {item.icon}
              </span>
              <h3 className="mt-3 font-serif text-xl font-semibold text-green">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-fg/70">{item.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
