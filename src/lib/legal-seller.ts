import { SITE } from "@/lib/site";

/** Реквизиты продавца — единый источник для оферты, политики и футера. */
export const LEGAL_SELLER = {
  fullName: "Леусенко Виктория Игоревна",
  shortName: "Леусенко В. И.",
  inn: "236405305260",
  status:
    "самозанятая, плательщик налога на профессиональный доход (НПД), не является индивидуальным предпринимателем",
  /** Адрес для корреспонденции и претензий */
  legalAddress:
    "Краснодарский край, г. Краснодар, ул. Звездная, д. 431 (СНТ «Автомобилист-2», п. Знаменский)",
  phone: SITE.phoneDisplay,
  phoneTel: SITE.phoneTel,
  email: SITE.email,
  siteHost: "salamahafineart.ru",
  get siteUrl() {
    const fromEnv = SITE.siteUrl.replace(/^https?:\/\//, "");
    return fromEnv || this.siteHost;
  },
} as const;

export function sellerRequisitesLines(): string[] {
  const s = LEGAL_SELLER;
  return [
    `Самозанятая ${s.fullName}`,
    `ИНН: ${s.inn}`,
    `Адрес: ${s.legalAddress}`,
    `Телефон: ${s.phone}`,
    `E-mail: ${s.email}`,
    `Сайт: ${s.siteUrl}`,
  ];
}
