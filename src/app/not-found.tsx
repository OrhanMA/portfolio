import Link from "next/link";

export default function RootNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center sm:px-6">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">
        404
      </p>
      <h1 className="mt-5 text-balance text-5xl font-semibold leading-[0.95] tracking-normal sm:text-7xl">
        Page introuvable
      </h1>
      <h2 className="sr-only">Page not found</h2>
      <p className="mt-5 max-w-md text-muted-foreground">
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
        <br />
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
      >
        Retour / Back home
      </Link>
    </div>
  );
}
