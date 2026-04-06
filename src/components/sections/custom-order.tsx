import { Container } from "@/components/layout/container";
import { LeadForm } from "@/components/forms/lead-form";

export function CustomOrder() {
  return (
    <section
      id="custom"
      className="scroll-mt-24 py-[var(--section-y)]"
    >
      <Container>
        <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-green/12 bg-gradient-to-br from-sage-muted/80 via-cream/90 to-bg px-6 py-12 shadow-[var(--shadow-sm)] sm:px-10 sm:py-14 lg:px-14">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-sage/40 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-green/10 blur-3xl"
            aria-hidden
          />
          <div className="relative max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-green/55">
              Индивидуальный заказ
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-green sm:text-4xl">
              Создам изделие под ваш интерьер
            </h2>
            <p className="mt-4 text-base leading-relaxed text-fg/70">
              Опишите задачу в паре слов — я предложу формат, палитру и сроки. Без
              навязчивых звонков: сначала переписка, потом созвон по желанию.
              Можно заказать изделия из эпоксидной смолы на заказ, в том числе
              изделия из смолы и дерева, декор, панно или подарок из эпоксидной
              смолы.
            </p>
          </div>
          <div className="relative mt-10 max-w-3xl">
            <LeadForm submitLabel="Оставить заявку" source="Индивидуальный заказ" />
          </div>
        </div>
      </Container>
    </section>
  );
}
