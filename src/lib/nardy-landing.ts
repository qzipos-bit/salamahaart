import type { Metadata } from "next";
import type { CatalogFaqItem } from "@/lib/catalog-faq-types";
import rawContent from "@/lib/data/nardy-content.json";
import { SITE } from "@/lib/site";

export const NARDY_LANDING_PATH = "/catalog/nardy" as const;

export type NardyOption = {
  name: string;
  value: string;
};

export type NardyStep = {
  n: number;
  title: string;
  text: string;
};

export type NardyGalleryItem = {
  image: string;
  caption: string;
};

export type NardyLandingContent = {
  path: string;
  title: string;
  description: string;
  h1: string;
  primaryKeyword: string;
  breadcrumbName: string;
  hero: {
    subtitle: string;
    image: string;
    imageAlt: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ctaSecondaryHref: string;
    whatsappPrefill: string;
  };
  intro: string;
  options: NardyOption[];
  steps: NardyStep[];
  occasions: string[];
  priceNote: string;
  gallery: NardyGalleryItem[];
  faq: CatalogFaqItem[];
  internalLinks: { label: string; href: string }[];
  ctaFinal: {
    heading: string;
    text: string;
    primaryLabel: string;
    whatsappPrefill: string;
  };
  footerLink: { text: string; href: string };
};

export const NARDY_LANDING = rawContent as NardyLandingContent;

export function nardyWhatsappUrl(prefill: string): string {
  const base = SITE.whatsapp.split("?")[0];
  return `${base}?text=${encodeURIComponent(prefill)}`;
}

export function nardyLandingMetadata(): Metadata {
  const page = NARDY_LANDING;
  const canonical = SITE.siteUrl ? `${SITE.siteUrl}${page.path}` : undefined;
  const ogImage = SITE.siteUrl
    ? `${SITE.siteUrl}${page.hero.image}`
    : undefined;

  return {
    title: page.title,
    description: page.description,
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: {
      title: page.title,
      description: page.description,
      ...(canonical ? { url: canonical } : {}),
      ...(ogImage
        ? {
            images: [
              {
                url: ogImage,
                alt: page.hero.imageAlt,
              },
            ],
          }
        : {}),
    },
    ...(ogImage
      ? {
          twitter: {
            card: "summary_large_image" as const,
            title: page.title,
            description: page.description,
            images: [ogImage],
          },
        }
      : {}),
  };
}
