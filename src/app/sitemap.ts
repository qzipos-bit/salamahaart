import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/blog";
import { ALL_PRODUCTS } from "@/lib/products";
import { allSeoLandingPaths } from "@/lib/seo-catalog-landings";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.siteUrl;
  if (!base) {
    return [];
  }

  const now = new Date();

  const blogPosts = getAllBlogPosts();

  return [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/catalog`, lastModified: now },
    { url: `${base}/blog`, lastModified: now },
    { url: `${base}/raschet-raskhoda-smoly`, lastModified: now },
    { url: `${base}/kalkulyator-stola-iz-smoly`, lastModified: now },
    ...blogPosts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(`${p.publishedAt}T12:00:00`),
    })),
    ...allSeoLandingPaths().map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
    })),
    ...ALL_PRODUCTS.map((p) => ({
      url: `${base}/catalog/${p.slug}`,
      lastModified: now,
    })),
  ];
}
