import { resolveSiteUrl } from "@/lib/site";

export function GET(request: Request) {
  const base = resolveSiteUrl(request);

  const lines = ["User-agent: *", "Allow: /"];

  if (base) {
    lines.push(`Sitemap: ${base}/sitemap.xml`);
  }

  return new Response(`${lines.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
