import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { CATALOG_HUB_PATH, CATALOG_SHOP_PATH } from "@/lib/catalog-filters";
import { BUKET_LANDING_PATH } from "@/lib/buket-landing";
import { NARDY_LANDING_PATH } from "@/lib/nardy-landing";
import { STOLESHNICY_LANDING_PATH } from "@/lib/stoleshnicy-landing";
import { listCatalogCategoryNavLinks } from "@/lib/catalog-category-pages";
import { MASTERS_CATALOG_PATH } from "@/lib/masters-products";
import { SEO_CATALOG_LANDINGS } from "@/lib/seo-catalog-landings";
import { LEGAL_NAV_LINKS } from "@/lib/legal-nav";
import { LEGAL_SELLER } from "@/lib/legal-seller";
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
            <div className="mt-6">
              <Button href={MASTERS_CATALOG_PATH} className="!py-2.5 !text-sm">
                Товары для мастеров
              </Button>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 md:col-span-8 md:col-start-5 lg:col-start-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green/55">
                Категории
              </p>
              <ul className="mt-4 space-y-2 text-sm text-fg/75">
                {listCatalogCategoryNavLinks().map((category) => (
                  <li key={category.href}>
                    <Link href={category.href} className="hover:text-green">
                      {category.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={BUKET_LANDING_PATH} className="hover:text-green">
                    Сохранение букета
                  </Link>
                </li>
                <li>
                  <Link
                    href={STOLESHNICY_LANDING_PATH}
                    className="hover:text-green"
                  >
                    Столешницы из смолы
                  </Link>
                </li>
              </ul>
              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-green/55">
                Игры
              </p>
              <ul className="mt-4 space-y-2 text-sm text-fg/75">
                <li>
                  <Link href={NARDY_LANDING_PATH} className="hover:text-green">
                    Нарды
                  </Link>
                </li>
              </ul>
              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-green/55">
                Подборки
              </p>
              <ul className="mt-4 space-y-2 text-sm text-fg/75">
                {Object.values(SEO_CATALOG_LANDINGS).map((landing) => (
                  <li key={landing.path}>
                    <Link
                      href={`/${landing.path}`}
                      className="hover:text-green"
                    >
                      {landing.footerLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green/55">
                Навигация
              </p>
              <ul className="mt-4 space-y-2 text-sm text-fg/75">
                <li>
                  <Link href="/#about" className="hover:text-green">
                    О мастере
                  </Link>
                </li>
                <li>
                  <Link href="/#categories" className="hover:text-green">
                    Категории
                  </Link>
                </li>
                <li>
                  <Link href={CATALOG_SHOP_PATH} className="hover:text-green">
                    Магазин
                  </Link>
                </li>
                <li>
                  <Link href={CATALOG_HUB_PATH} className="hover:text-green">
                    Каталог изделий
                  </Link>
                </li>
                <li>
                  <Link
                    href="/raschet-raskhoda-smoly"
                    className="hover:text-green"
                  >
                    Расчёт смолы
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-green">
                    Журнал
                  </Link>
                </li>
                <li>
                  <Link href="/#courses" className="hover:text-green">
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
        <nav
          className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-fg/55"
          aria-label="Юридические документы"
        >
          {LEGAL_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-green hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="mt-4 text-center text-xs text-fg/45">
          © {new Date().getFullYear()} {SITE.name}. Самозанятая{" "}
          {LEGAL_SELLER.fullName}, ИНН {LEGAL_SELLER.inn}
        </p>
      </Container>
    </footer>
  );
}
