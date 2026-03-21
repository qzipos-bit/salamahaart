import Image from "next/image";
import { Container } from "@/components/layout/container";

const stats = [
  { value: "10+", label: "лет в материале" },
  { value: "100%", label: "ручная работа" },
  { value: "РФ", label: "доставка и самовывоз" },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-[var(--section-y)]">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] lg:col-span-5">
            <Image
              src="/about-victoria.webp"
              alt="Виктория — художник по эпоксидной смоле с работой из смолы и дерева"
              fill
              className="object-cover object-[center_25%]"
              sizes="(max-width: 1024px) 100vw, 42vw"
              priority
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-green/10" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-green/55">
              О мастере
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-green sm:text-4xl">
              Я создаю предметы, на которые хочется смотреть
            </h2>
            <p className="mt-6 text-base leading-relaxed text-fg/75">
              Меня зовут Виктория. Я работаю со смолой, деревом и светом — чтобы
              вещь в доме ощущалась как маленькая галерея: спокойно, дорого,
              по-настоящему живо.
            </p>
            <p className="mt-4 text-base leading-relaxed text-fg/75">
              Каждый проект — от персонального стола до сохранения букета — я
              веду от идеи до финиша: подбираю пигменты, контролирую полимеризацию
              и детали, которые видно только вблизи.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-[var(--radius)] border border-green/10 bg-sage-muted/50 px-4 py-5 text-center"
                >
                  <p className="font-serif text-2xl font-semibold text-green">
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs text-fg/60">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
