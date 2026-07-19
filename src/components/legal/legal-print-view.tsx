import Link from "next/link";
import { LegalDocumentBody } from "@/components/legal/legal-document-body";
import { LegalPrintActions } from "@/components/legal/legal-print-actions";
import {
  LEGAL_REVISION_DATE,
  getLegalPage,
  LEGAL_PAGE_KEYS,
  type LegalPageKey,
} from "@/lib/legal-pages";

type Props = {
  pageKey: LegalPageKey;
};

export function LegalPrintView({ pageKey }: Props) {
  const page = getLegalPage(pageKey);

  return (
    <div className="legal-print mx-auto max-w-3xl px-6 py-10 sm:px-8">
      <LegalPrintActions backHref={page.path} />

      <header className="border-b border-green/15 pb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-fg/50">
          Salamaha Fine Art
        </p>
        <h1 className="mt-2 font-serif text-2xl font-semibold text-green-deep sm:text-3xl">
          {page.h1}
        </h1>
        <p className="mt-2 text-sm text-fg/60">
          Редакция от {LEGAL_REVISION_DATE} · {page.path}
        </p>
      </header>

      <LegalDocumentBody sections={page.sections} className="mt-8" />

      <footer className="mt-10 border-t border-green/10 pt-6 text-xs leading-relaxed text-fg/55">
        <p>
          Документ размещён на сайте{" "}
          <Link href={page.path} className="text-green underline-offset-2">
            {page.path}
          </Link>
          . Для B2B-заказчиков и маркетплейсов доступна страница{" "}
          <Link href="/rekvizity" className="text-green underline-offset-2">
            /rekvizity
          </Link>
          .
        </p>
      </footer>
    </div>
  );
}

export function legalPrintStaticParams() {
  return LEGAL_PAGE_KEYS.map((key) => ({ key }));
}
