import Link from "next/link";
import { EditorialPageHeader } from "@/components/editorial-page-header";

export default function RootNotFound() {
  return (
    <div>
      <EditorialPageHeader
        eyebrow="404"
        title="Page introuvable"
        description="La page demandée n’existe pas. The requested page could not be found."
        titleClassName="uppercase"
      />
      <div className="section-tinted flex min-h-64 flex-wrap items-center justify-center gap-3 px-6 py-16">
        <Link
          href="/fr"
          className="inline-flex h-11 items-center justify-center rounded-full bg-vermillion px-6 text-sm font-bold text-white transition-colors hover:bg-vermillion/90"
        >
          Accueil français
        </Link>
        <Link
          href="/en"
          className="inline-flex h-11 items-center justify-center rounded-full border border-foreground/20 bg-background px-6 text-sm font-bold transition-colors hover:border-primary"
        >
          English home
        </Link>
      </div>
    </div>
  );
}
