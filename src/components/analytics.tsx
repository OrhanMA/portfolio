"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import { getStoredConsent } from "@/lib/cookie-consent";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function Analytics() {
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    // Check initial consent
    const consent = getStoredConsent();
    if (consent?.analytics) {
      setConsentGiven(true);
    }

    // Listen for consent updates
    function handleConsentUpdate(e: Event) {
      const detail = (e as CustomEvent).detail;
      setConsentGiven(detail?.analytics ?? false);
    }

    window.addEventListener("cookie-consent-update", handleConsentUpdate);
    return () => {
      window.removeEventListener("cookie-consent-update", handleConsentUpdate);
    };
  }, []);

  // Don't render anything if no measurement ID or no consent
  if (!GA_MEASUREMENT_ID || !consentGiven) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  );
}
