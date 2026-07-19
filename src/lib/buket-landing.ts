import type { Metadata } from "next";
import type { CatalogFaqItem } from "@/lib/catalog-faq-types";
import rawContent from "@/lib/data/buket-content.json";
import { SITE } from "@/lib/site";

export const BUKET_LANDING_PATH = "/sohranenie-buketa-v-smole" as const;

export type BuketFormOption = {
  name: string;
  note: string;
  link: string | null;
  image: string;
};

export type BuketStep = {
  n: number;
  title: string;
  text: string;
};

export type BuketGalleryItem = {
  image: string;
  caption: string;
};

export type BuketLandingContent = {
  path: string;
  title: string;
  description: string;
  h1: string;
  primaryKeyword: string;
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
  forms: BuketFormOption[];
  steps: BuketStep[];
  occasions: string[];
  priceNote: string;
  gallery: BuketGalleryItem[];
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

export const BUKET_LANDING = rawContent as BuketLandingContent;

export function buketWhatsappUrl(prefill: string): string {
  const base = SITE.whatsapp.split("?")[0];
  return `${base}?text=${encodeURIComponent(prefill)}`;
}

export function buketLandingMetadata(): Metadata {
  const page = BUKET_LANDING;
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
