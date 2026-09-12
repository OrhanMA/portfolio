import Link from "next/link";
import { deferredFontClassName } from "@/components/deferred-fonts";
import { SiteIdentity } from "@/components/site-identity";

export default function GlobalNotFound() {
  return (
    <html lang="fr">
      <body className={deferredFontClassName}>
        <SiteIdentity
          href="/fr"
        />
        <main>
          <p>
            404
          </p>
          <h1>
            Page introuvable
          </h1>
          <p>
            La page demandée n’existe pas. The requested page could not be found.
          </p>
          <div>
            <Link
              href="/fr"
            >
              Accueil français
            </Link>
            <Link
              href="/en"
            >
              English home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
