import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-green/10 bg-sage-muted/40">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-script text-3xl text-green">Salamaha</p>
            <p className="mt-1 font-serif text-[10px] font-semibold uppercase tracking-[0.35em] text-green/65">
              Fine Art
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg/70">
              Авторские изделия из эпоксидной смолы: мебель, декор, сохранение
              цветов. Ручная работа и внимание к деталям.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 md:col-span-5 md:col-start-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green/55">
                Навигация
              </p>
              <ul className="mt-4 space-y-2 text-sm text-fg/75">
                <li>
                  <Link href="#about" className="hover:text-green">
                    О мастере
                  </Link>
                </li>
                <li>
                  <Link href="#categories" className="hover:text-green">
                    Категории
                  </Link>
                </li>
                <li>
                  <Link href="/catalog" className="hover:text-green">
                    Магазин
                  </Link>
                </li>
                <li>
                  <Link href="#courses" className="hover:text-green">
                    Курсы
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green/55">
                Связь
              </p>
              <ul className="mt-4 space-y-2 text-sm text-fg/75">
                <li>
                  <a href={`tel:${SITE.phoneTel}`} className="hover:text-green">
                    {SITE.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={SITE.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>{SITE.address}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="gold-line mt-12" />
        <p className="mt-6 text-center text-xs text-fg/45">
          © {new Date().getFullYear()} {SITE.name}. ИП / самозанятый — уточнить
          реквизиты.
        </p>
      </Container>
    </footer>
  );
}
