import Image from "next/image";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { EditorialWave } from "@/components/landing/editorial-wave";
import { LandingButtonLink } from "@/components/landing/landing-button-link";
import type { Dictionary } from "@/app/[locale]/dictionaries";

export function CtaSection({
  locale,
  dict,
}: {
  locale: string;
  dict: Dictionary["cta"];
}) {
  return (
    <section
      id="contact"
      className="landing-deferred landing-deferred-contact relative min-h-[430px] overflow-hidden border-t border-foreground/15 px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[52%] opacity-15 mix-blend-multiply dark:opacity-10 dark:mix-blend-screen md:block">
        <Image
          src="/images/decorative/fuji-detail.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="52vw"
          className="object-cover object-left"
        />
      </div>
      <div className="relative z-20 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-20">
        <div className="contact-copy invisible max-w-2xl lg:pl-20">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
            {dict.eyebrow}
          </p>
          <h2 className="mt-3 text-4xl font-black uppercase leading-[0.95] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            {dict.heading}
          </h2>
          <div className="contact-details mt-4 max-w-xl rounded-xl border border-foreground/15 bg-background/92 px-4 py-3 shadow-[0_12px_34px_oklch(0_0_0/0.08)] backdrop-blur-md dark:bg-background/88">
            <p className="text-sm leading-6 text-foreground/78">
              {dict.text}
            </p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 font-sans text-[9px] font-medium text-foreground/72 sm:text-[10px]">
              <span className="inline-flex items-center gap-1.5">
                <MapPin aria-hidden="true" className="h-3.5 w-3.5" /> Chambéry, France
              </span>
              <a
                href="mailto:orhan.madi.assani@gmail.com"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
              >
                <Mail aria-hidden="true" className="h-3.5 w-3.5" /> orhan.madi.assani@gmail.com
              </a>
              <span>Odoo · Symfony · Next.js</span>
            </div>
          </div>
        </div>

        <div className="relative mx-auto h-56 w-56 lg:mr-28 lg:h-64 lg:w-64">
          <LandingButtonLink
            href={`/${locale}/contact`}
            size="lg"
            className="contact-circle invisible h-full w-full rounded-full bg-vermillion text-lg font-black text-white shadow-[0_22px_60px_oklch(0.61_0.235_29/0.24)] transition-transform duration-500 hover:scale-105 hover:bg-vermillion/95 sm:text-xl"
          >
            {dict.ctaContact}
            <ArrowRight aria-hidden="true" className="ml-3 h-7 w-7" />
          </LandingButtonLink>
          <Image
            src="/images/decorative/pixel-sakura-petals-trio.svg"
            alt=""
            aria-hidden="true"
            width={128}
            height={96}
            className="contact-petals invisible pointer-events-none absolute -bottom-5 -right-9 h-auto w-24 -rotate-6 object-contain sm:w-28"
          />
        </div>
      </div>

      <Image
        src="/images/decorative/pixel-samurai-calm.png"
        alt=""
        aria-hidden="true"
        width={1254}
        height={1254}
        sizes="288px"
        className="contact-samurai invisible pointer-events-none absolute -bottom-14 -left-20 z-10 hidden h-72 w-72 object-contain object-left-bottom lg:block"
      />
      <Image
        src="/images/decorative/pixel-sakura-branch.svg"
        alt=""
        aria-hidden="true"
        width={640}
        height={360}
        className="contact-sakura invisible pointer-events-none absolute -bottom-8 -right-24 z-10 hidden h-72 w-[500px] object-contain object-right-bottom opacity-75 md:block"
      />
      <div className="contact-wave absolute inset-x-0 bottom-[-1px] z-0 opacity-90">
        <EditorialWave className="h-28 sm:h-32" />
      </div>
    </section>
  );
}
