import { StoleshnicyLandingView } from "@/components/catalog/stoleshnicy-landing-view";
import { stoleshnicyLandingMetadata } from "@/lib/stoleshnicy-landing";

export const dynamic = "force-static";

export const metadata = stoleshnicyLandingMetadata();

export default function StoleshnicyLandingPage() {
  return <StoleshnicyLandingView />;
}
