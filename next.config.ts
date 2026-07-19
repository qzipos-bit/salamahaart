import type { NextConfig } from "next";
import { WOOD_BLANK_LEGACY_SLUG_REDIRECTS } from "@/lib/wood-blank-legacy-slugs";
import { FORM_LEGACY_SLUG_REDIRECTS } from "@/lib/form-legacy-slugs";

const mastersLegacyRedirects = Object.entries({
  ...WOOD_BLANK_LEGACY_SLUG_REDIRECTS,
  ...FORM_LEGACY_SLUG_REDIRECTS,
}).map(([slug, destination]) => ({
  source: `/tovary-dlya-masterov/${slug}`,
  destination: `/tovary-dlya-masterov/${destination}`,
  permanent: true,
}));

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...mastersLegacyRedirects,
      {
        source: "/catalog",
        has: [{ type: "query", key: "cat", value: "bukety" }],
        destination: "/sohranenie-buketa-v-smole",
        permanent: true,
      },
      {
        source: "/catalog/vse-tovary",
        has: [{ type: "query", key: "cat", value: "bukety" }],
        destination: "/sohranenie-buketa-v-smole",
        permanent: true,
      },
      {
        source: "/catalog/panello-sage",
        destination: "/catalog/fotaramka-30x40-a4",
        permanent: true,
      },
      {
        source: "/catalog/vaza-mist",
        destination: "/catalog/eloch-igrushki-2d",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1600],
    imageSizes: [128, 192, 256, 384, 512, 640],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
