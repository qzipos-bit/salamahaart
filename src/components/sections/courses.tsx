import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

const courses = [
  {
    title: "Смола + дерево 2.0",
    mode: "Онлайн",
    text: "От основ до сложных столешниц: техника, ошибки, финиш.",
    href: "/kurs-smola-derevo",
    external: false,
  },
  {
    title: "Интенсив в студии",
    mode: "Оффлайн",
    text: "Мини-группа, разбор вашей задачи и практика на материалах.",
    href: SITE.whatsapp,
    external: true,
  },
];

export function Courses() {
  return (
    <section id="courses" className="scroll-mt-24 py-[var(--section-y)]">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-green/55">
          Обучение
        </p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-green sm:text-4xl">
          Курсы и мастер-классы
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-fg/65">
          Для тех, кто хочет освоить смолу системно — с поддержкой и разбором
          домашних работ.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {courses.map((c) => (
            <div
              key={c.title}
              className="flex flex-col rounded-[var(--radius-lg)] border border-green/12 bg-cream/50 p-8 shadow-[var(--shadow-sm)]"
            >
              <span className="w-fit rounded-full bg-sage-muted px-3 py-1 text-xs font-semibold uppercase tracking-wider text-green">
                {c.mode}
              </span>
              <h3 className="mt-4 font-serif text-2xl font-semibold text-green">
                {c.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-fg/70">
                {c.text}
              </p>
              <div className="mt-6">
                <Button
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noopener noreferrer" : undefined}
                  className="w-full sm:w-auto"
                >
                  {c.external ? "Записаться" : "Программа и запись"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
