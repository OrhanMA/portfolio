"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import Script from "next/script";
import { getStoredConsent } from "@/lib/cookie-consent";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const SpeedInsights = dynamic(
  () =>
    import("@vercel/speed-insights/next").then(
      ({ SpeedInsights: SpeedInsightsComponent }) => SpeedInsightsComponent,
    ),
  { ssr: false },
);

function subscribeToConsent(callback: () => void) {
  window.addEventListener("cookie-consent-update", callback);
  return () => window.removeEventListener("cookie-consent-update", callback);
}

function getConsentSnapshot() {
  return getStoredConsent()?.analytics ?? false;
}

function getServerSnapshot() {
  return false;
}

export function Analytics() {
  const consentGiven = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    getServerSnapshot,
  );

  if (!consentGiven) return null;

  return (
    <>
      {GTM_ID && (
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      )}

      {!GTM_ID && GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              window.gtag = function(){window.dataLayer.push(arguments);}
              window.gtag('js', new Date());
              window.gtag('consent', 'update', { analytics_storage: 'granted' });
              window.gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}
      <SpeedInsights />
    </>
  );
}
