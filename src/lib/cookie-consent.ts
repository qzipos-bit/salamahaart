/** Версия политики cookie — при изменении текста увеличить и показать баннер снова. */
export const COOKIE_CONSENT_VERSION = 2;

export const COOKIE_CONSENT_STORAGE_KEY = "salamaha-cookie-consent-v2";
export const LEGACY_COOKIE_CONSENT_KEY = "salamaha-cookie-consent-v1";

export const COOKIE_CONSENT_EVENT = "salamaha:cookie-consent";

export type CookieConsentChoice = {
  version: number;
  /** Строго необходимые cookie (корзина, запоминание выбора). */
  necessary: true;
  /** Аналитика (Яндекс.Метрика). */
  analytics: boolean;
  updatedAt: string;
};

function isValidChoice(raw: unknown): raw is CookieConsentChoice {
  if (!raw || typeof raw !== "object") return false;
  const c = raw as Record<string, unknown>;
  return (
    c.version === COOKIE_CONSENT_VERSION &&
    c.necessary === true &&
    typeof c.analytics === "boolean" &&
    typeof c.updatedAt === "string"
  );
}

function readLegacyConsent(): CookieConsentChoice | null {
  try {
    const legacy = localStorage.getItem(LEGACY_COOKIE_CONSENT_KEY);
    if (legacy !== "accepted") return null;
    return {
      version: COOKIE_CONSENT_VERSION,
      necessary: true,
      analytics: true,
      updatedAt: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function readCookieConsent(): CookieConsentChoice | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (isValidChoice(parsed)) return parsed;
    }
  } catch {
    /* ignore */
  }

  const migrated = readLegacyConsent();
  if (migrated) {
    writeCookieConsent(migrated.analytics);
    try {
      localStorage.removeItem(LEGACY_COOKIE_CONSENT_KEY);
    } catch {
      /* ignore */
    }
    return migrated;
  }

  return null;
}

export function writeCookieConsent(analytics: boolean): CookieConsentChoice {
  const choice: CookieConsentChoice = {
    version: COOKIE_CONSENT_VERSION,
    necessary: true,
    analytics,
    updatedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(choice));
  } catch {
    /* ignore */
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: choice }));
  }

  return choice;
}

export function hasAnalyticsConsent(choice: CookieConsentChoice | null): boolean {
  return Boolean(choice?.analytics);
}
