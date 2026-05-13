"use client";

import Link from "next/link";
import { ExternalLink, FileText } from "lucide-react";
import { Reveal } from "@/components/landing/reveal";
import { useDictionary } from "@/components/dictionary-provider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const proofs = [
  {
    key: "cv",
    href: "/proofs/orhan-madi-assani-cv.pdf",
  },
  {
    key: "toeic",
    href: "/proofs/certificate_20251030105639_toeic_filigrane.pdf",
  },
  {
    key: "cda",
    href: "/proofs/diplome_cda_filigrane.pdf",
  },
  {
    key: "dwwm",
    href: "/proofs/titre-dwwm_filigrane.pdf",
  },
];

export function ProofsSection({ locale }: { locale: string }) {
  const dict = useDictionary();

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="grid gap-8 border-y border-border/70 py-10 lg:grid-cols-[0.7fr_1fr] lg:items-start">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">
                {dict.proofs.eyebrow}
              </p>
              <h2 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
                {dict.proofs.heading}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
                {dict.proofs.text}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {proofs.map((proof) => {
                const item =
                  dict.proofs.items[
                    proof.key as keyof typeof dict.proofs.items
                  ];

                return (
                  <a
                    key={proof.key}
                    href={proof.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-lg border border-border/70 bg-card/60 p-4 no-underline transition-colors hover:border-primary/70 hover:bg-muted/40"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <FileText className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                    </div>
                    <p className="mt-4 font-medium text-foreground">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </a>
                );
              })}
            </div>

            <div className="lg:col-start-2">
              <Link
                href={`/${locale}/contact`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-lg",
                )}
              >
                {dict.proofs.cta}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
