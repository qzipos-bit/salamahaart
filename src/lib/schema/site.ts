import { SITE } from "@/lib/site";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://salamahaart.vercel.app"
).replace(/\/$/, "");

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const LOCAL_BUSINESS_ID = `${SITE_URL}/#localbusiness`;
export const SITE_NAME = SITE.name;

export const SCHEMA_PHONE = "+7-938-444-00-33";
export const SCHEMA_EMAIL = SITE.email;

export const SCHEMA_POSTAL_ADDRESS = {
  "@type": "PostalAddress" as const,
  addressLocality: "Краснодар",
  addressRegion: "Краснодарский край",
  addressCountry: "RU",
  streetAddress: "п. Знаменский, СНТ Автомобилист-2, ул. Звёздная, 431",
};

/** Абсолютный URL для пути вида `/catalog/foo` или `catalog/foo`. */
export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

/** Абсолютный URL для статического asset из public. */
export function absoluteAssetUrl(assetPath: string): string {
  const normalized = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
  return `${SITE_URL}${normalized}`;
}
