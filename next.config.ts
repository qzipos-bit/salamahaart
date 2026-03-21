import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
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
