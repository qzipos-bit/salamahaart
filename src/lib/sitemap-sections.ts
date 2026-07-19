import { BUKET_LANDING_PATH } from "@/lib/buket-landing";
import { NARDY_LANDING_PATH } from "@/lib/nardy-landing";
import { STOLESHNICY_LANDING_PATH } from "@/lib/stoleshnicy-landing";
import { allLegalPagePaths } from "@/lib/legal-pages";
import { getAllBlogPosts } from "@/lib/blog";
import { standaloneCatalogCategoryPaths } from "@/lib/catalog-category-pages";
import { allStolyPagePaths } from "@/lib/stoly-pages";
import { ALL_PRODUCTS } from "@/lib/products";
import { MASTERS_CATALOG_PATH, MASTERS_PRODUCTS } from "@/lib/masters-products";
import { allSeoLandingPaths } from "@/lib/seo-catalog-landings";

export type SitemapSection = "main" | "catalog" | "block";

export type SitemapUrlEntry = {
  path: string;
  lastModified: Date;
};

function pathEntries(
  paths: string[],
  lastModified: Date,
): SitemapUrlEntry[] {
  return paths.map((path) => ({ path, lastModified }));
}

/** Главная, сервисные страницы, калькуляторы, курс (контакты и блоки — на главной). */
export function mainSitemapEntries(now: Date): SitemapUrlEntry[] {
  return pathEntries(
    [
      "/",
      "/kalkulyator-stola",
      "/raschet-raskhoda-smoly",
      "/kurs-smola-derevo",
      BUKET_LANDING_PATH,
      STOLESHNICY_LANDING_PATH,
      ...allLegalPagePaths(),
    ],
    now,
  );
}

/** Хаб каталога, подборки, карточки и страницы товаров. */
export function catalogSitemapEntries(now: Date): SitemapUrlEntry[] {
  const productPaths = ALL_PRODUCTS.map((p) => `/catalog/${p.slug}`);
  const mastersPaths = MASTERS_PRODUCTS.map(
    (p) => `${MASTERS_CATALOG_PATH}/${p.slug}`,
  );

  return pathEntries(
    [
      "/catalog",
      "/catalog/vse-tovary",
      MASTERS_CATALOG_PATH,
      "/formy-dlya-zalivki-epoksidnoj-smoloj",
      ...allStolyPagePaths(),
      ...standaloneCatalogCategoryPaths(),
      ...allSeoLandingPaths(),
      NARDY_LANDING_PATH,
      ...productPaths,
      ...mastersPaths,
    ],
    now,
  );
}

/** Журнал: список, рубрики и статьи. */
export function blockSitemapEntries(now: Date): SitemapUrlEntry[] {
  const posts = getAllBlogPosts();

  return [
    { path: "/blog", lastModified: now },
    { path: "/blog?rubrika=news", lastModified: now },
    { path: "/blog?rubrika=article", lastModified: now },
    ...posts.map((p) => ({
      path: `/blog/${p.slug}`,
      lastModified: new Date(`${p.publishedAt}T12:00:00`),
    })),
  ];
}

export const SITEMAP_SECTIONS: SitemapSection[] = ["main", "catalog", "block"];

export function sitemapEntriesForSection(
  section: SitemapSection,
  now = new Date(),
): SitemapUrlEntry[] {
  switch (section) {
    case "main":
      return mainSitemapEntries(now);
    case "catalog":
      return catalogSitemapEntries(now);
    case "block":
      return blockSitemapEntries(now);
  }
}
