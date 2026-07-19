import { StolyPageView, stolyPageMetadata } from "@/components/catalog/stoly-page-view";
import { STOLY_PILLAR_KEY } from "@/lib/stoly-pages";

export const dynamic = "force-static";

export const metadata = stolyPageMetadata(STOLY_PILLAR_KEY);

export default function StolyPillarPage() {
  return <StolyPageView pageKey={STOLY_PILLAR_KEY} />;
}
