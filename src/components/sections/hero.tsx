import Image from "next/image";
import { Container } from "@/components/layout/container";
import { QuizLaunchButton } from "@/components/quiz/quiz-launch-button";
import { Button } from "@/components/ui/button";

const perks = [
  { title: "Ручная работа", sub: "каждое изделие уникально" },
  { title: "Премиум-смолы", sub: "прозрачность и срок службы" },
  { title: "Под ключ", sub: "от эскиза до доставки" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-bg">
      <div
        className="pointer-events-none absolute -right-24 top-1/4 h-80 w-80 rounded-full bg-sage/20 blur-3xl"
        aria-hidden
      />
      <Container className="relative py-[clamp(4.5rem,12vw,8rem)]">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="max-w-xl lg:max-w-none">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-green/70">
              Salamaha Fine Art
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] text-green sm:text-5xl lg:text-[3.25rem]">
              Авторские изделия из эпоксидной смолы
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-fg/75 sm:text-lg lg:max-w-lg">
              Столы, панно, декор и сохранение букетов — тихая роскошь, свет и
              глубина прозрачности в вашем пространстве.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/catalog">Смотреть каталог</Button>
              <Button href="#custom" variant="secondary">
                Заказать индивидуально
              </Button>
            </div>
            <div className="mt-6">
              <QuizLaunchButton className="text-sm font-medium text-green underline-offset-4 hover:underline">
                Подберём декор за 2 минуты →
              </QuizLaunchButton>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none lg:justify-self-end">
            <div className="relative aspect-square w-full max-w-[420px] lg:max-w-[min(100%,520px)]">
              <Image
                src="/hero-floral-circle.png"
                alt="Круглое панно из смолы с сохранёнными розами"
                fill
                priority
                className="hero-floral-visual object-contain object-center drop-shadow-[0_20px_50px_rgba(30,48,36,0.1)]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-3 lg:mt-20">
          {perks.map((p) => (
            <li
              key={p.title}
              className="glass-panel rounded-[var(--radius)] px-5 py-4"
            >
              <p className="text-sm font-semibold text-green">{p.title}</p>
              <p className="mt-1 text-xs text-fg/60">{p.sub}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
