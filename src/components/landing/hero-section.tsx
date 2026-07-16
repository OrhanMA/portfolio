import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowRight, Briefcase, Code2, Mail, MapPin } from "lucide-react";
import {
  EditorialWave,
  UkiyoeCrest,
} from "@/components/landing/editorial-wave";
import { LandingButtonLink } from "@/components/landing/landing-button-link";
import type { Dictionary } from "@/app/[locale]/dictionaries";

export function HeroSection({
  locale,
  headshot,
  dict,
}: {
  locale: string;
  headshot: ReactNode;
  dict: Dictionary["hero"];
}) {
  return (
    <section
      className="relative isolate min-h-[860px] overflow-hidden px-4 pb-36 pt-28 sm:px-6 lg:min-h-[820px] lg:px-8 lg:pb-44 lg:pt-24"
    >
      <div className="hero-fuji absolute right-[-11%] top-[16%] z-0 hidden h-[60%] w-[74%] opacity-70 mix-blend-multiply dark:opacity-25 dark:mix-blend-screen lg:block">
        <Image
          src="/images/decorative/fuji-hero.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="74vw"
          className="object-contain object-right-bottom"
        />
      </div>

      <div className="hero-sun absolute left-[51%] top-[13%] z-[1] aspect-square w-[min(31vw,440px)] rounded-full bg-vermillion shadow-[0_20px_70px_oklch(0.61_0.235_29/0.16)] max-lg:left-auto max-lg:right-[8%] max-lg:top-[48%] max-lg:w-[68vw] max-sm:top-[58%]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl lg:grid-cols-[minmax(0,0.82fr)_minmax(480px,1.18fr)]">
        <div className="relative z-20 pt-4 lg:pt-12">
          <h1 className="hero-display text-[clamp(5rem,10vw,9.5rem)] font-black uppercase leading-[0.73] tracking-[-0.068em] text-foreground">
            <span className="hero-word block">Orhan</span>
            <span className="hero-word hero-name-outline block">Madi</span>
            <span className="hero-word block">Assani</span>
          </h1>

          <p className="hero-copy mt-9 max-w-lg text-[15px] font-semibold leading-6 text-foreground sm:text-base sm:leading-7">
            {dict.statement}
          </p>

          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-3 font-sans text-[10px] font-medium text-foreground/72 sm:text-[11px]">
            <span className="hero-meta flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-foreground" />
              {dict.location}
            </span>
            <span className="hero-meta hidden h-4 w-px bg-foreground/30 sm:block" />
            <span className="hero-meta flex items-center gap-2">
              <Briefcase className="h-3.5 w-3.5 text-foreground" />
              {dict.status}
            </span>
            <span className="hero-meta hidden h-4 w-px bg-foreground/30 sm:block" />
            <span className="hero-meta flex items-center gap-2">
              <Code2 className="h-3.5 w-3.5 text-foreground" />
              {dict.subtitle}
            </span>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <LandingButtonLink
              href={`/${locale}/realisations`}
              size="lg"
              className="gap-2"
            >
              {dict.ctaWork}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </LandingButtonLink>
            <LandingButtonLink
              href={`/${locale}/contact`}
              variant="outline"
              size="lg"
              className="gap-2 bg-background/55 backdrop-blur-sm"
            >
              <Mail aria-hidden="true" className="h-4 w-4" />
              {dict.ctaContact}
            </LandingButtonLink>
          </div>
        </div>

        <div className="relative mt-4 min-h-[430px] sm:mt-8 sm:min-h-[570px] lg:mt-0 lg:min-h-[700px]">
          <div className="hero-portrait absolute inset-x-[-8%] bottom-[-7%] z-10 mx-auto h-[108%] max-w-[690px] sm:inset-x-0 sm:bottom-[-8%] sm:h-[112%] [&>img]:h-full [&>img]:w-full [&>img]:object-contain [&>img]:object-bottom">
            {headshot}
          </div>
          <Image
            src="/images/decorative/sakura-petals-scatter.svg"
            alt=""
            aria-hidden="true"
            width={180}
            height={120}
            loading="eager"
            className="hero-petals pointer-events-none absolute bottom-[30%] right-[8%] z-20 h-auto w-24 rotate-6 object-contain sm:w-28 lg:right-[4%]"
          />
          <Image
            src="/images/decorative/sakura-petal.svg"
            alt=""
            aria-hidden="true"
            width={36}
            height={42}
            loading="eager"
            className="hero-petal-accent pointer-events-none absolute left-[9%] top-[15%] z-20 h-9 w-auto -rotate-[28deg] lg:left-[4%]"
          />
          <Image
            src="/images/decorative/sakura-petal.svg"
            alt=""
            aria-hidden="true"
            width={26}
            height={30}
            loading="eager"
            className="hero-petal-accent pointer-events-none absolute right-[6%] top-[9%] z-20 h-7 w-auto rotate-[32deg]"
          />
        </div>
      </div>

      <div className="hero-side-note absolute right-3 top-36 z-30 hidden items-center gap-3 [writing-mode:vertical-rl] xl:flex">
        <span className="h-12 w-px bg-foreground/45" />
        <span className="font-sans text-[10px] font-bold uppercase tracking-[0.14em]">
          {dict.availabilityLabel}
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-vermillion" />
      </div>

      <div className="absolute inset-x-0 bottom-[-1px] z-30">
        <EditorialWave />
      </div>
      <UkiyoeCrest className="hero-crest absolute -bottom-1 -left-16 z-[31] h-52 w-72 sm:h-60 sm:w-80" />
      <UkiyoeCrest
        flip
        className="hero-crest absolute -bottom-1 -right-20 z-[31] hidden h-64 w-96 sm:block"
      />
    </section>
  );
}
