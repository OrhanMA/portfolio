"use client";

import Link from "next/link";
import { Mail, ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useDictionary } from "@/components/dictionary-provider";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/landing/reveal";

export function CtaSection({ locale }: { locale: string }) {
  const dict = useDictionary();

  return (
    <section id="contact" className="px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="premium-card overflow-hidden rounded-lg p-6 sm:p-10 lg:p-14">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">
                  {dict.cta.eyebrow}
                </p>
                <h2 className="mt-5 max-w-4xl text-balance text-5xl font-semibold leading-[0.95] tracking-normal sm:text-6xl lg:text-8xl">
                  {dict.cta.heading}
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                  {dict.cta.text}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href={`/${locale}/contact`}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-12 rounded-lg px-5",
                  )}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  {dict.cta.ctaContact}
                </Link>
                <a
                  href="https://www.linkedin.com/in/orhanmadi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-12 rounded-lg px-5",
                  )}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {dict.cta.ctaLinkedin}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
