import { LegalPrintView } from "@/components/legal/legal-print-view";
import {
  getLegalPage,
  legalPageMetadata,
  LEGAL_PAGE_KEYS,
  type LegalPageKey,
} from "@/lib/legal-pages";

export const dynamic = "force-static";

type PageProps = {
  params: Promise<{ key: string }>;
};

function parseKey(raw: string): LegalPageKey | null {
  return LEGAL_PAGE_KEYS.includes(raw as LegalPageKey)
    ? (raw as LegalPageKey)
    : null;
}

export function generateStaticParams() {
  return LEGAL_PAGE_KEYS.map((key) => ({ key }));
}

export async function generateMetadata({ params }: PageProps) {
  const { key: rawKey } = await params;
  const key = parseKey(rawKey);
  if (!key) return { title: "Документ не найден" };

  const page = getLegalPage(key);
  const baseMeta = legalPageMetadata(key);

  return {
    ...baseMeta,
    title: `${page.h1} — печать | Salamaha`,
    robots: { index: false, follow: false },
  };
}

export default async function LegalPrintPage({ params }: PageProps) {
  const { key: rawKey } = await params;
  const key = parseKey(rawKey);
  if (!key) {
    return (
      <p className="p-8 text-sm text-fg/70">Документ не найден.</p>
    );
  }

  return <LegalPrintView pageKey={key} />;
}
