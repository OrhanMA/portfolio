"use client";
import { useEffect } from "react";
import { SiteIdentity } from "@/components/site-identity";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled root error:", error);
  }, [error]);

  return (
    <html lang="fr">
      <body>
        <SiteIdentity
          href="/fr"
        />
        <main>
          <p>
            Erreur / Error
          </p>
          <h1>
            Une erreur inattendue est survenue
          </h1>
          <p>
            Réessayez maintenant. If the problem persists, return to the homepage.
          </p>
          <button
            type="button"
            onClick={reset}
          >
            Réessayer / Retry
          </button>
        </main>
      </body>
    </html>
  );
}
