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
const LOAD_TIMEOUT_MS = 8_000;
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

    const timeout = window.setTimeout(() => {
      scriptPromise = undefined;
      reject(new Error("reCAPTCHA loading timed out."));
    }, LOAD_TIMEOUT_MS);

    script.addEventListener(
      "load",
      () => {
        window.clearTimeout(timeout);
        resolve();
      },
      { once: true },
    );
    script.addEventListener(
      "error",
      () => {
        window.clearTimeout(timeout);
        scriptPromise = undefined;
        reject(new Error("Unable to load reCAPTCHA."));
      },
      { once: true },
    );

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

    recaptcha.ready(() => {
      recaptcha.execute(siteKey, { action }).then(resolve).catch(reject);
    });
  });
}
