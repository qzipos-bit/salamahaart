import type { Metadata } from "next";
import type { CatalogFaqItem } from "@/lib/catalog-faq-types";
import rawContent from "@/lib/data/stoleshnicy-content.json";
import { SITE } from "@/lib/site";

export const STOLESHNICY_LANDING_PATH =
  "/stoleshnicy-iz-epoksidnoj-smoly" as const;

export type StoleshnicyApplicationSection = {
  id: string;
  h2: string;
  text: string;
  image: string;
  link: string | null;
  linkLabel: string | null;
};

export type StoleshnicyStep = {
  n: number;
  title: string;
  text: string;
};

export type StoleshnicyGalleryItem = {
  image: string;
  caption: string;
};

export type StoleshnicyLandingContent = {
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
  sections: StoleshnicyApplicationSection[];
  steps: StoleshnicyStep[];
  priceNote: string;
  gallery: StoleshnicyGalleryItem[];
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

export const STOLESHNICY_LANDING = rawContent as StoleshnicyLandingContent;

export function stoleshnicyWhatsappUrl(prefill: string): string {
  const base = SITE.whatsapp.split("?")[0];
  return `${base}?text=${encodeURIComponent(prefill)}`;
}

export function stoleshnicyLandingMetadata(): Metadata {
  const page = STOLESHNICY_LANDING;
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
