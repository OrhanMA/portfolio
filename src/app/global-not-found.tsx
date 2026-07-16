import "./globals.css";
import Link from "next/link";
import { deferredFontClassName } from "@/components/deferred-fonts";

export default function GlobalNotFound() {
  return (
    <html lang="fr" className={deferredFontClassName}>
      <body className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground antialiased">
        <main className="w-full max-w-2xl rounded-xl border border-foreground/15 bg-card p-8 text-center shadow-xl sm:p-12">
          <p className="font-mono text-sm font-bold uppercase tracking-[0.22em] text-vermillion">
            404
          </p>
          <h1 className="mt-4 text-4xl font-black uppercase tracking-[-0.04em] sm:text-6xl">
            Page introuvable
          </h1>
          <p className="mx-auto mt-5 max-w-xl leading-7 text-muted-foreground">
            La page demandée n’existe pas. The requested page could not be found.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/fr"
              className="inline-flex h-11 items-center justify-center rounded-full bg-vermillion px-6 text-sm font-bold text-white hover:bg-vermillion/90"
            >
              Accueil français
            </Link>
            <Link
              href="/en"
              className="inline-flex h-11 items-center justify-center rounded-full border border-foreground/20 px-6 text-sm font-bold hover:border-primary"
            >
              English home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
