export type CookieConsent = {
  necessary: true;
  analytics: boolean;
};

export function shouldReloadAfterAnalyticsWithdrawal(
  previousConsent: Pick<CookieConsent, "analytics"> | null,
  nextConsent: CookieConsent,
): boolean {
  return previousConsent?.analytics === true && nextConsent.analytics === false;
}

type StoredCookieConsent = CookieConsent & {
  version: 2;
  decidedAt: number;
};

const CONSENT_KEY = "cookie-consent";
const CONSENT_COOKIE = "cookie-consent-given";
const CONSENT_VERSION = 2;
export const CONSENT_MAX_AGE_SECONDS = 180 * 24 * 60 * 60;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function isStoredConsent(value: unknown): value is StoredCookieConsent {
  if (!value || typeof value !== "object") return false;
  const consent = value as Partial<StoredCookieConsent>;
  return (
    consent.version === CONSENT_VERSION &&
    consent.necessary === true &&
    typeof consent.analytics === "boolean" &&
    typeof consent.decidedAt === "number" &&
    Date.now() - consent.decidedAt <= CONSENT_MAX_AGE_SECONDS * 1_000 &&
    consent.decidedAt <= Date.now() + 60_000
  );
}

function deleteAnalyticsCookies() {
  const analyticsCookie = /^(_ga|_gid|_gat|_gac_|_gat_|__utm)/;
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (!name || !analyticsCookie.test(name)) continue;
    document.cookie = `${name}=;Max-Age=0;Path=/;SameSite=Lax`;
    if (location.hostname.includes(".")) {
      document.cookie = `${name}=;Max-Age=0;Path=/;Domain=.${location.hostname};SameSite=Lax`;
    }
  }
}

function updateAnalyticsRuntime(accepted: boolean) {
  const measurementId =
    typeof process === "undefined"
      ? undefined
      : process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (measurementId) {
    (window as unknown as Record<string, unknown>)[
      `ga-disable-${measurementId}`
    ] = !accepted;
  }
  window.gtag?.("consent", "update", {
    analytics_storage: accepted ? "granted" : "denied",
  });
  window.dataLayer?.push({
    event: "cookie_consent_update",
    analytics_storage: accepted ? "granted" : "denied",
  });
  if (!accepted) deleteAnalyticsCookies();
}

export function getStoredConsent(): StoredCookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const stored: unknown = JSON.parse(raw);
    if (isStoredConsent(stored)) return stored;
  } catch {
    // Invalid consent is removed below and requested again.
  }
  localStorage.removeItem(CONSENT_KEY);
  document.cookie = `${CONSENT_COOKIE}=;Max-Age=0;Path=/;SameSite=Lax`;
  return null;
}

export function setStoredConsent(consent: CookieConsent): void {
  if (typeof window === "undefined") return;
  const stored: StoredCookieConsent = {
    ...consent,
    version: CONSENT_VERSION,
    decidedAt: Date.now(),
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(stored));
  const secure = location.protocol === "https:" ? ";Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=true;Path=/;Max-Age=${CONSENT_MAX_AGE_SECONDS};SameSite=Lax${secure}`;
  updateAnalyticsRuntime(consent.analytics);
}

export function hasConsentBeenGiven(): boolean {
  return getStoredConsent() !== null;
}

export function isAnalyticsAccepted(): boolean {
  return getStoredConsent()?.analytics ?? false;
}
