import type { SitemapSection, SitemapUrlEntry } from "@/lib/sitemap-sections";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatLastMod(date: Date): string {
  return date.toISOString();
}

export function buildUrlsetXml(baseUrl: string, entries: SitemapUrlEntry[]): string {
  const urls = entries
    .map((entry) => {
      const loc = `${baseUrl}${entry.path.startsWith("/") ? entry.path : `/${entry.path}`}`;
      return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${formatLastMod(entry.lastModified)}</lastmod>\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

const SECTION_COMMENTS: Record<SitemapSection, string> = {
  main: "main — главная, калькуляторы, курс",
  catalog: "catalog — каталог, подборки и товары",
  block: "block — журнал, рубрики и статьи",
};

function formatUrlEntry(baseUrl: string, entry: SitemapUrlEntry): string {
  const loc = `${baseUrl}${entry.path.startsWith("/") ? entry.path : `/${entry.path}`}`;
  return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${formatLastMod(entry.lastModified)}</lastmod>\n  </url>`;
}

/** Один sitemap.xml с блоками main / catalog / block. */
export function buildGroupedUrlsetXml(
  baseUrl: string,
  sections: { section: SitemapSection; entries: SitemapUrlEntry[] }[],
): string {
  const blocks = sections
    .filter((block) => block.entries.length > 0)
    .map((block) => {
      const comment = `  <!-- ${SECTION_COMMENTS[block.section]} -->`;
      const urls = block.entries
        .map((entry) => formatUrlEntry(baseUrl, entry))
        .join("\n");
      return `${comment}\n${urls}`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${blocks}\n</urlset>\n`;
}

export function xmlResponse(body: string): Response {
  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
