import type { Metadata } from "next";
import { LandingShell } from "@/components/layout/landing-shell";
import { JsonLd } from "@/components/JsonLd";
import { CourseLandingStickyCta } from "@/components/courses/course-landing-sticky-cta";
import { ScrollToTopOnMount } from "@/components/layout/scroll-to-top-on-mount";
import { SmolaDerevoLanding } from "@/components/courses/smola-derevo-landing";
import {
  COURSE_SMOLA_DEREVO,
  COURSE_SMOLA_DEREVO_HERO,
} from "@/lib/course-smola-derevo";
import { buildCoursePageSchemas } from "@/lib/schema/course";
import { SITE } from "@/lib/site";

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

export default function KursSmolaDerevoPage() {
  return (
    <LandingShell>
      <ScrollToTopOnMount matchPath="/kurs-smola-derevo" />
      <JsonLd data={buildCoursePageSchemas()} />
      <SmolaDerevoLanding />
      <CourseLandingStickyCta />
    </LandingShell>
  );
}
