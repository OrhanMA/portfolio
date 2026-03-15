"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle className="h-8 w-8 text-destructive" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Une erreur est survenue
      </h2>
      <p className="mt-3 max-w-md text-muted-foreground">
        Quelque chose s&apos;est mal pass&eacute;. Veuillez r&eacute;essayer ou revenir &agrave; l&apos;accueil.
      </p>
      <div className="mt-8 flex gap-4">
        <Button onClick={reset} variant="default">
          R&eacute;essayer
        </Button>
        <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>
          Accueil
        </Link>
      </div>
    </div>
  );
}
