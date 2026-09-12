"use client";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string },
      ) => Promise<string>;
    };
  }
}

const SCRIPT_ID = "google-recaptcha-v3";
export const RECAPTCHA_TIMEOUT_MS = 8_000;
let scriptPromise: Promise<void> | undefined;

export function preloadRecaptcha(): Promise<void> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!siteKey || typeof window === "undefined" || window.grecaptcha) {
    return Promise.resolve();
  }

  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById(SCRIPT_ID);
    const script =
      existingScript instanceof HTMLScriptElement
        ? existingScript
        : document.createElement("script");
    let settled = false;

    const cleanup = () => {
      window.clearTimeout(timeout);
      script.removeEventListener("load", handleLoad);
      script.removeEventListener("error", handleError);
    };

    const fail = (error: Error) => {
      if (settled) return;
      settled = true;
      cleanup();
      scriptPromise = undefined;
      // A failed script cannot be retried by attaching new listeners to it.
      script.remove();
      reject(error);
    };

    const handleLoad = () => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve();
    };

    const handleError = () => {
      fail(new Error("Unable to load reCAPTCHA."));
    };

    const timeout = window.setTimeout(() => {
      fail(new Error("reCAPTCHA loading timed out."));
    }, RECAPTCHA_TIMEOUT_MS);

    script.addEventListener("load", handleLoad);
    script.addEventListener("error", handleError);

    if (!existingScript) {
      script.id = SCRIPT_ID;
      script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  });

  return scriptPromise;
}

export async function executeRecaptcha(action: string): Promise<string> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!siteKey) return "";

  await preloadRecaptcha();

  return new Promise((resolve, reject) => {
    const recaptcha = window.grecaptcha;
    if (!recaptcha) {
      reject(new Error("reCAPTCHA is unavailable."));
      return;
    }

    let settled = false;
    const timeout = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      reject(new Error("reCAPTCHA execution timed out."));
    }, RECAPTCHA_TIMEOUT_MS);

    const resolveOnce = (token: string) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      resolve(token);
    };

    const rejectOnce = (error: unknown) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      reject(error);
    };

    try {
      recaptcha.ready(() => {
        if (settled) return;

        try {
          recaptcha
            .execute(siteKey, { action })
            .then(resolveOnce)
            .catch(rejectOnce);
        } catch (error) {
          rejectOnce(error);
        }
      });
    } catch (error) {
      rejectOnce(error);
    }
  });
}
