import { notFound } from "next/navigation";
import { StolyPageView, stolyPageMetadata } from "@/components/catalog/stoly-page-view";
import {
  STOLY_PUBLISHED_FACET_KEYS,
  getStolyFacetPage,
  type StolyFacetKey,
} from "@/lib/stoly-pages";

export const dynamic = "force-static";

type Props = {
  params: Promise<{ facet: string }>;
};

export function generateStaticParams() {
  return STOLY_PUBLISHED_FACET_KEYS.map((facet) => ({ facet }));
}

export async function generateMetadata({ params }: Props) {
  const { facet } = await params;
  const page = getStolyFacetPage(facet);
  if (!page) return {};
  return stolyPageMetadata(facet as StolyFacetKey);
}

export default async function StolyFacetPage({ params }: Props) {
  const { facet } = await params;
  if (!getStolyFacetPage(facet)) notFound();
  return <StolyPageView pageKey={facet as StolyFacetKey} />;
}
