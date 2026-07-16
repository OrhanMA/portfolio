import { Code2 } from "lucide-react";
import Image from "next/image";
import { PixelHeart, PixelSpark } from "@/components/landing/pixel-art";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/app/[locale]/dictionaries";

export function AboutSection({ dict }: { dict: Dictionary["about"] }) {
  const principles = [
    {
      title: dict.card1Title,
      description: dict.card1Desc,
      icon: PixelHeart,
      color: "text-vermillion border-primary",
      rotation: "-rotate-2",
    },
    {
      title: dict.card2Title,
      description: dict.card2Desc,
      icon: Code2,
      color: "text-foreground border-vermillion",
      rotation: "rotate-1",
    },
    {
      title: dict.card3Title,
      description: dict.card3Desc,
      icon: PixelSpark,
      color: "text-primary border-primary",
      rotation: "-rotate-1",
    },
  ];

  return (
    <section
      id="a-propos"
      className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.72fr)] lg:items-center lg:gap-24">
        <div className="relative z-10">
          <h2 className="about-copy invisible text-5xl font-black uppercase leading-none tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            {dict.heading}
          </h2>
          <p className="about-copy invisible mt-7 max-w-2xl text-xl font-semibold leading-8 sm:text-2xl">
            {dict.statement}
          </p>
          <p className="about-copy invisible mt-6 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            {dict.text}
          </p>
        </div>

        <div className="about-stamps relative z-10 grid gap-5 pr-10 sm:pr-20 lg:pr-24">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <article
                key={principle.title}
                className={cn(
                  "about-stamp invisible flex min-h-24 cursor-default items-center gap-5 rounded-xl border-2 bg-background/92 px-5 py-4 shadow-[6px_7px_0_oklch(0.16_0.018_245/0.12)] transition-[color,background-color,transform] duration-300 ease-out will-change-transform hover:-translate-y-2 hover:scale-[1.025] hover:bg-primary/[0.035] motion-reduce:transform-none",
                  principle.color,
                  principle.rotation,
                  index === 1 && "sm:ml-9",
                  index === 2 && "sm:ml-3",
                )}
              >
                <Icon aria-hidden="true" className="h-9 w-9 shrink-0" strokeWidth={2.2} />
                <h3 className="text-sm font-black uppercase leading-5 tracking-[-0.01em] sm:text-base">
                  {principle.title}
                </h3>
                <p className="sr-only">{principle.description}</p>
              </article>
            );
          })}
        </div>
      </div>

      <Image
        src="/images/decorative/pixel-ninja.png"
        alt=""
        aria-hidden="true"
        width={1254}
        height={1254}
        className="about-ninja invisible pointer-events-none absolute -right-16 bottom-4 z-20 hidden h-56 w-56 md:block xl:-right-20 xl:h-64 xl:w-64"
        sizes="(min-width: 1280px) 256px, 224px"
      />
      <PixelSpark className="absolute right-[14%] top-[18%] h-7 w-7 text-foreground/70" />
      <PixelSpark className="absolute right-[7%] top-[30%] h-4 w-4 text-vermillion" />
    </section>
  );
}
