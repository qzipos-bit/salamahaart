import { LegalPageView } from "@/components/legal/legal-page-view";
import { legalPageMetadata } from "@/lib/legal-pages";

export const dynamic = "force-static";

export const metadata = legalPageMetadata("pdn");

export default function SoglasieNaObrabotkuPdnPage() {
  return <LegalPageView pageKey="pdn" />;
}
