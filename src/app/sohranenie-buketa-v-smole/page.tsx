import { BuketLandingView } from "@/components/catalog/buket-landing-view";
import { buketLandingMetadata } from "@/lib/buket-landing";

export const dynamic = "force-static";

export const metadata = buketLandingMetadata();

export default function SohranenieBuketaPage() {
  return <BuketLandingView />;
}
