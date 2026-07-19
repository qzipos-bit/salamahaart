import {
  getAllBlogPosts,
  type BlogPost,
} from "@/lib/blog";
import { buildBreadcrumbListSchema } from "@/lib/schema/helpers";
import {
  absoluteAssetUrl,
  absoluteUrl,
  ORG_ID,
  SITE_NAME,
} from "@/lib/schema/site";

export function buildBlogIndexSchemas(): Record<string, unknown>[] {
  const posts = getAllBlogPosts();

  return [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": absoluteUrl("/blog#blog"),
      name: "Журнал Salamaha Fine Art",
      description:
        "Новости студии, уход за изделиями, палитры, сохранение букетов.",
      url: absoluteUrl("/blog"),
      inLanguage: "ru-RU",
      publisher: { "@id": ORG_ID },
      blogPost: posts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        url: absoluteUrl(`/blog/${post.slug}`),
        datePublished: post.publishedAt,
        image: absoluteAssetUrl(post.coverImage),
      })),
    },
    buildBreadcrumbListSchema([
      { name: "Главная", path: "/" },
      { name: "Журнал", path: "/blog" },
    ]),
  ];
}

export function buildBlogPostingSchemas(post: BlogPost): Record<string, unknown>[] {
  const pageUrl = absoluteUrl(`/blog/${post.slug}`);

  return [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      image: absoluteAssetUrl(post.coverImage),
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
      inLanguage: "ru-RU",
      author: {
        "@type": "Person",
        name: "Виктория",
        worksFor: { "@id": ORG_ID },
      },
      publisher: { "@id": ORG_ID },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": pageUrl,
      },
    },
    buildBreadcrumbListSchema([
      { name: "Главная", path: "/" },
      { name: "Журнал", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
  ];
}
