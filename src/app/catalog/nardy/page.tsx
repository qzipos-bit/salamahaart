import { NardyLandingView } from "@/components/catalog/nardy-landing-view";
import { nardyLandingMetadata } from "@/lib/nardy-landing";

export const dynamic = "force-static";

export const metadata = nardyLandingMetadata();

export default function NardyLandingPage() {
  return <NardyLandingView />;
}
