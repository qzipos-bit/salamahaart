import { resolveSiteUrl } from "@/lib/site";
import {
  SITEMAP_SECTIONS,
  sitemapEntriesForSection,
} from "@/lib/sitemap-sections";
import { buildGroupedUrlsetXml, xmlResponse } from "@/lib/sitemap-xml";

export function GET(request: Request) {
  const base = resolveSiteUrl(request);
  const now = new Date();

  const sections = SITEMAP_SECTIONS.map((section) => ({
    section,
    entries: sitemapEntriesForSection(section, now),
  }));

  if (!base) {
    return xmlResponse(buildGroupedUrlsetXml("", sections));
  }

  return xmlResponse(buildGroupedUrlsetXml(base, sections));
}
