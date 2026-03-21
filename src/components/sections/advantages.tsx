import { Container } from "@/components/layout/container";

const items = [
  {
    title: "Материалы",
    text: "Проверенные смолы и дерева — без «желтизны» со временем.",
    icon: "◇",
  },
  {
    title: "Свет и слои",
    text: "Прозрачность, глубина, мягкие переливы как в стекле.",
    icon: "○",
  },
  {
    title: "Индивидуально",
    text: "Размер, пигмент, вставки — под ваш интерьер и историю.",
    icon: "✦",
  },
  {
    title: "Сопровождение",
    text: "Фото на этапах, аккуратная упаковка, доставка по РФ.",
    icon: "→",
  },
];

export function Advantages() {
  return (
    <section className="py-[var(--section-y)]">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-green/55">
          Почему мы
        </p>
        <h2 className="mt-2 max-w-2xl font-serif text-3xl font-semibold text-green sm:text-4xl">
          Спокойная премиальность — в деталях, которые остаются с вами надолго
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.title}
              className="glass-panel rounded-[var(--radius-lg)] p-6 transition duration-300 hover:-translate-y-0.5"
            >
              <span className="text-xl text-gold" aria-hidden>
                {item.icon}
              </span>
              <h3 className="mt-4 font-serif text-xl font-semibold text-green">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg/70">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
