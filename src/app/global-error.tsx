"use client";

import "./globals.css";
import { useEffect } from "react";

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
      <body className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground antialiased">
        <main className="w-full max-w-xl rounded-xl border border-destructive/30 bg-card p-8 text-center shadow-xl">
          <p className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-destructive">
            Erreur / Error
          </p>
          <h1 className="mt-4 text-3xl font-black uppercase tracking-[-0.03em]">
            Une erreur inattendue est survenue
          </h1>
          <p className="mt-4 leading-7 text-muted-foreground">
            Réessayez maintenant. If the problem persists, return to the homepage.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-7 inline-flex h-11 cursor-pointer items-center justify-center rounded-full bg-vermillion px-6 text-sm font-bold text-white hover:bg-vermillion/90"
          >
            Réessayer / Retry
          </button>
        </main>
      </body>
    </html>
  );
}
