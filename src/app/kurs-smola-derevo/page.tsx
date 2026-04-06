import type { Metadata } from "next";
import { LandingShell } from "@/components/layout/landing-shell";
import { CourseLandingStickyCta } from "@/components/courses/course-landing-sticky-cta";
import { SmolaDerevoLanding } from "@/components/courses/smola-derevo-landing";
import {
  COURSE_SMOLA_DEREVO,
  COURSE_SMOLA_DEREVO_HERO,
  smolaDerevoWhatsAppHref,
} from "@/lib/course-smola-derevo";
import { SITE, siteOrganizationJsonLdId } from "@/lib/site";

const title = COURSE_SMOLA_DEREVO.seo.metaTitle;
const description = COURSE_SMOLA_DEREVO.seo.metaDescription;

const ogImage =
  SITE.siteUrl !== ""
    ? `${SITE.siteUrl}${COURSE_SMOLA_DEREVO_HERO.src}`
    : undefined;

export const metadata: Metadata = {
  title,
  description,
  alternates: SITE.siteUrl
    ? { canonical: `${SITE.siteUrl}/kurs-smola-derevo` }
    : undefined,
  openGraph: {
    title,
    description,
    ...(SITE.siteUrl ? { url: `${SITE.siteUrl}/kurs-smola-derevo` } : {}),
    ...(ogImage
      ? {
          images: [
            {
              url: ogImage,
              width: 1400,
              height: 1750,
              alt: COURSE_SMOLA_DEREVO_HERO.alt,
            },
          ],
        }
      : {}),
  },
  ...(ogImage
    ? {
        twitter: {
          card: "summary_large_image",
          title,
          description,
          images: [ogImage],
        },
      }
    : {}),
};

function courseJsonLd() {
  const base = SITE.siteUrl;
  const orgId = siteOrganizationJsonLdId();
  if (!base || !orgId) return null;
  const pageUrl = `${base}/kurs-smola-derevo`;
  const data = {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${pageUrl}#course`,
    name: `${COURSE_SMOLA_DEREVO.name}: онлайн-курс по эпоксидной смоле и дереву`,
    description: COURSE_SMOLA_DEREVO.seo.metaDescription,
    url: pageUrl,
    image: `${base}${COURSE_SMOLA_DEREVO_HERO.src}`,
    /** Ссылка на глобальный блок Organization из root layout — без второй сущности Organization. */
    provider: { "@id": orgId },
    offers: {
      "@type": "Offer",
      price: COURSE_SMOLA_DEREVO.priceRub,
      priceCurrency: "RUB",
      url: smolaDerevoWhatsAppHref(),
      availability: "https://schema.org/InStock",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function KursSmolaDerevoPage() {
  return (
    <LandingShell>
      {courseJsonLd()}
      <SmolaDerevoLanding />
      <CourseLandingStickyCta />
    </LandingShell>
  );
}
