"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  COOKIE_CONSENT_EVENT,
  readCookieConsent,
  writeCookieConsent,
  type CookieConsentChoice,
} from "@/lib/cookie-consent";

type CookieConsentContextValue = {
  consent: CookieConsentChoice | null;
  ready: boolean;
  hasAnalytics: boolean;
  acceptAll: () => void;
  acceptNecessaryOnly: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null,
);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsentChoice | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setConsent(readCookieConsent());
    setReady(true);

    const onChange = (event: Event) => {
      const detail = (event as CustomEvent<CookieConsentChoice>).detail;
      setConsent(detail ?? readCookieConsent());
    };

    window.addEventListener(COOKIE_CONSENT_EVENT, onChange);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onChange);
  }, []);

  const acceptAll = useCallback(() => {
    setConsent(writeCookieConsent(true));
  }, []);

  const acceptNecessaryOnly = useCallback(() => {
    setConsent(writeCookieConsent(false));
  }, []);

  const value = useMemo(
    () => ({
      consent,
      ready,
      hasAnalytics: Boolean(consent?.analytics),
      acceptAll,
      acceptNecessaryOnly,
    }),
    [consent, ready, acceptAll, acceptNecessaryOnly],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent(): CookieConsentContextValue {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return ctx;
}
