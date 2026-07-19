import type { CatalogFaqItem } from "@/lib/catalog-faq-types";
import rawContent from "@/lib/data/stoly-content.json";

export type StolyPagePriority = "P1" | "P2" | "P3";

export type StolyInternalLink = {
  label: string;
  href: string;
};

export type StolyHighlight = {
  title: string;
  text: string;
};

export type StolyFacetCard = {
  slug: string;
  label: string;
  teaser: string;
  image: string;
};

export type StolyProcessStep = {
  title: string;
  text: string;
  image?: string;
};

export type StolyPortfolioExample = {
  title: string;
  subtitle?: string;
  description: string;
  specs?: string[];
  image: string;
  badge?: string;
};

export type StolyCta = {
  heading: string;
  text: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export type StolyPageContent = {
  priority: StolyPagePriority;
  path: string;
  navLabel: string;
  title: string;
  description: string;
  h1: string;
  primaryKeyword: string;
  heroSubtitle: string;
  introSections: string[];
  highlights: StolyHighlight[];
  facetCards?: StolyFacetCard[];
  processSteps?: StolyProcessStep[];
  collectionHeading: string;
  showcaseNote?: string;
  faq: CatalogFaqItem[];
  productSlugs: string[];
  portfolioExamples: StolyPortfolioExample[];
  internalLinks: StolyInternalLink[];
  cta: StolyCta;
};

export type StolyPageKey = keyof typeof rawContent;
export type StolyFacetKey = Exclude<StolyPageKey, "pillar">;

const CONTENT = rawContent as Record<StolyPageKey, StolyPageContent>;

export const STOLY_PILLAR_KEY = "pillar" as const;

export const STOLY_FACET_KEYS = (
  Object.keys(CONTENT) as StolyPageKey[]
).filter((key): key is StolyFacetKey => key !== STOLY_PILLAR_KEY);

export const STOLY_PUBLISHED_FACET_KEYS = STOLY_FACET_KEYS;

export function getStolyPage(key: StolyPageKey): StolyPageContent {
  return CONTENT[key];
}

export function getStolyPillarPage(): StolyPageContent {
  return CONTENT[STOLY_PILLAR_KEY];
}

export function getStolyFacetPage(slug: string): StolyPageContent | undefined {
  if (!(slug in CONTENT) || slug === STOLY_PILLAR_KEY) return undefined;
  return CONTENT[slug as StolyFacetKey];
}

export function stolyPagePath(key: StolyPageKey): string {
  return `/${CONTENT[key].path}`;
}

export function stolyFacetPath(slug: string): string {
  return `/catalog/stoly/${slug}`;
}

export function allStolyPagePaths(): string[] {
  return (Object.keys(CONTENT) as StolyPageKey[]).map((key) =>
    stolyPagePath(key),
  );
}

export function stolyFacetNavItems(): {
  slug: StolyFacetKey;
  label: string;
  href: string;
}[] {
  return STOLY_FACET_KEYS.map((slug) => ({
    slug,
    label: CONTENT[slug].navLabel,
    href: stolyPagePath(slug),
  }));
}

export function stolyMetadataInput(page: StolyPageContent) {
  return {
    path: `/${page.path}`,
    title: page.title,
    description: page.description,
  };
}

export function stolyPageIntroText(page: StolyPageContent): string {
  return page.introSections.join(" ");
}
