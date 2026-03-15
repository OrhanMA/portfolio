import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-bold tracking-tight text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
        Page introuvable
      </h2>
      <p className="mt-3 max-w-md text-muted-foreground">
        La page que vous recherchez n&apos;existe pas ou a ete deplacee.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
      >
        Retour a l&apos;accueil
      </Link>
    </div>
  );
}
