import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/lead-form";
import { SITE } from "@/lib/site";

export function Contacts() {
  return (
    <section id="contacts" className="scroll-mt-24 py-[var(--section-y)]">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-green/55">
              Контакты
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-green sm:text-4xl">
              Давайте обсудим ваш проект
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-fg/70">
              Удобнее всего — WhatsApp: пришлю примеры и сориентирую по срокам.
              Если вы хотите купить изделия из эпоксидной смолы или обсудить
              индивидуальный проект, напишите мне — помогу подобрать формат,
              размер и стилистику.
            </p>
            <ul className="mt-8 space-y-4 text-sm">
              <li>
                <span className="text-fg/50">Телефон</span>
                <br />
                <a
                  href={`tel:${SITE.phoneTel}`}
                  className="text-lg font-medium text-green hover:underline"
                >
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <span className="text-fg/50">Адрес</span>
                <br />
                <span className="text-fg/80">{SITE.address}</span>
              </li>
            </ul>
            <div className="mt-8">
              <Button
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                Открыть WhatsApp
              </Button>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="glass-panel rounded-[var(--radius-lg)] p-6 sm:p-8">
              <h3 className="font-serif text-xl font-semibold text-green">
                Быстрая заявка
              </h3>
              <p className="mt-2 text-sm text-fg/65">
                Ответ в течение дня в рабочие часы.
              </p>
              <div className="mt-6">
                <LeadForm submitLabel="Отправить" source="Контакты" />
              </div>
            </div>
            <div className="mt-6 overflow-hidden rounded-[var(--radius-lg)] border border-green/10 shadow-[var(--shadow-sm)]">
              <iframe
                title="Карта — п. Знаменский, СНТ Автомобилист-2"
                src="https://www.openstreetmap.org/export/embed.html?bbox=38.948%2C45.048%2C38.992%2C45.078&amp;layer=mapnik"
                className="h-[280px] w-full grayscale-[20%] contrast-[0.95]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
