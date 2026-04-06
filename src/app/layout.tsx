import type { Metadata } from "next";
import { Cormorant_Garamond, Italianno, Manrope } from "next/font/google";
import { OrganizationJsonLd } from "@/components/seo/organization-jsonld";
import { SITE } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-dm-sans",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const italianno = Italianno({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-italianno",
});

const metadataBase =
  SITE.siteUrl !== ""
    ? (() => {
        try {
          return new URL(
            SITE.siteUrl.startsWith("http")
              ? SITE.siteUrl
              : `https://${SITE.siteUrl}`,
          );
        } catch {
          return undefined;
        }
      })()
    : undefined;

export const metadata: Metadata = {
  ...(metadataBase ? { metadataBase } : {}),
  title:
    "Salamaha Fine Art — купить изделия из эпоксидной смолы и дерева на заказ",
  description:
    "Изделия из эпоксидной смолы и дерева на заказ: столы, декор, украшения и предметы интерьера. Фото, цены, ручная работа, доставка по РФ.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${manrope.variable} ${cormorant.variable} ${italianno.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col">
        <OrganizationJsonLd />
        {children}
      </body>
    </html>
  );
}
