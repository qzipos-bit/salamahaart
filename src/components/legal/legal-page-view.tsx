import Link from "next/link";
import { LandingShell } from "@/components/layout/landing-shell";
import { Container } from "@/components/layout/container";
import { LegalDocumentBody } from "@/components/legal/legal-document-body";
import {
  LEGAL_REVISION_DATE,
  getLegalPage,
  type LegalPageKey,
} from "@/lib/legal-pages";
import { LEGAL_NAV_LINKS } from "@/lib/legal-nav";

export function LegalPageView({ pageKey }: { pageKey: LegalPageKey }) {
  const page = getLegalPage(pageKey);
  const printPath = `/legal/print/${pageKey}`;

  return (
    <LandingShell>
      <article className="py-12 lg:py-16">
        <Container className="max-w-3xl">
          <Link
            href="/"
            className="text-sm font-medium text-green/70 hover:text-green hover:underline"
          >
            ← На главную
          </Link>

          <header className="mt-8 border-b border-green/10 pb-8">
            <h1 className="font-serif text-3xl font-semibold text-green sm:text-4xl">
              {page.h1}
            </h1>
            <p className="mt-3 text-sm text-fg/55">
              Редакция от {LEGAL_REVISION_DATE}
            </p>
            <p className="mt-4 text-sm text-fg/65">
              <Link
                href={printPath}
                className="font-medium text-green underline-offset-4 hover:underline"
              >
                Версия для печати / PDF
              </Link>
            </p>
          </header>

          <LegalDocumentBody sections={page.sections} className="mt-8" />

          <nav
            className="mt-12 flex flex-wrap gap-x-4 gap-y-2 border-t border-green/10 pt-8 text-sm text-fg/65"
            aria-label="Другие юридические документы"
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
        </Container>
      </article>
    </LandingShell>
  );
}
