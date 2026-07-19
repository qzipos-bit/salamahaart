function parseSameAs(raw: string | undefined): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export const SITE = {
  name: "Salamaha Fine Art",
  /** Абсолютный URL сайта для SEO и JSON-LD (без слэша в конце) */
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "",
  /** Профили бренда для Organization.sameAs (URL через запятую) */
  orgSameAs: parseSameAs(process.env.NEXT_PUBLIC_ORG_SAME_AS),
  phoneDisplay: "+7 (938) 444-00-33",
  phoneTel: "+79384440033",
  whatsapp:
    process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "https://wa.me/79384440033",
  /** Полная строка для блоков «Адрес» на сайте */
  address:
    "Краснодар, п. Знаменский, СНТ Автомобилист-2, ул. Звездная, 431",
  /**
   * Совпадает с `address`; разбивка для schema.org PostalAddress.
   * При смене адреса обновите и это.
   */
  addressPostal: {
    addressLocality: "п. Знаменский",
    addressRegion: "Краснодарский край",
    addressCountry: "RU",
    streetAddress: "СНТ Автомобилист-2, ул. Звездная, 431",
  },
  email: "salamaha.2012@mail.ru",
};

/** URL сайта для sitemap и SEO: env → заголовки запроса. */
export function resolveSiteUrl(request?: Request): string {
  const fromPublic =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";
  if (fromPublic) return fromPublic;

  const fromServer = process.env.SITE_URL?.replace(/\/$/, "") ?? "";
  if (fromServer) return fromServer;

  if (!request) return "";

  const host =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host");
  if (!host) return "";

  const proto =
    request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() ??
    (host.includes("localhost") ? "http" : "https");

  return `${proto}://${host}`;
}

/** Стабильный @id Organization в JSON-LD — тот же URI, что в root layout. */
export function siteOrganizationJsonLdId(): string {
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://salamahaart.vercel.app"
  ).replace(/\/$/, "");
  return `${base}/#organization`;
}
