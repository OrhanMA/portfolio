"use client";

import { useRef } from "react";
import Link from "next/link";
import { Mail, ExternalLink } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { buttonVariants } from "@/components/ui/button";
import { useDictionary } from "@/components/dictionary-provider";
import { cn } from "@/lib/utils";

export function CtaSection({ locale }: { locale: string }) {
  const container = useRef<HTMLDivElement>(null);
  const dict = useDictionary();

  useGSAP(
    () => {
      gsap.from(".cta-heading", {
        scrollTrigger: {
          trigger: ".cta-heading",
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
      });

      gsap.from(".cta-text", {
        scrollTrigger: {
          trigger: ".cta-heading",
          start: "top 85%",
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.2,
      });

      // No scroll animation on buttons — they stay always visible
      // to avoid FOUC issues with ScrollTrigger + Lenis
    },
    { scope: container }
  );

  return (
    <section ref={container} id="contact" className="bg-muted/30 py-24 px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="cta-heading text-3xl font-bold tracking-tight sm:text-4xl">
          {dict.cta.heading}
        </h2>

        <p className="cta-text mt-4 text-lg text-muted-foreground">
          {dict.cta.text}
        </p>

        <div className="cta-buttons mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={`/${locale}/contact`}
            className={cn(buttonVariants({ size: "lg" }))}
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
            )}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            {dict.cta.ctaLinkedin}
          </a>
        </div>
      </div>
    </section>
  );
}
