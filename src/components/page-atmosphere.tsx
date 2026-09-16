"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

export type PageAtmosphereFamily =
  | "home"
  | "about"
  | "journey"
  | "skills"
  | "work"
  | "contact";

const atmosphereSources: Record<PageAtmosphereFamily, string> = {
  home: "/images/background-home.webp",
  about: "/images/background-about.webp",
  journey: "/images/background-journey.webp",
  skills: "/images/background-skills.webp",
  work: "/images/background-work.webp",
  contact: "/images/background-contact.webp",
};

const homeAtmosphereVideo = "/videos/home-atmosphere.mp4";

export function HomeAtmosphereBackground() {
  return (
    <>
      <Image
        data-home-atmosphere-fallback
        src={atmosphereSources.home}
        alt=""
        fill
        sizes="100vw"
        quality={75}
        preload
      />
      <video
        aria-hidden="true"
        data-home-atmosphere-video
        autoPlay
        loop
        muted
        playsInline
        poster={atmosphereSources.home}
        preload="metadata"
      >
        <source src={homeAtmosphereVideo} type="video/mp4" />
      </video>
    </>
  );
}

/**
 * Page-specific frame sequences stay separate from the shared renderer so
 * another atmospheric page can opt in without duplicating the layer logic.
 */
export const animatedAtmosphereFrames: Partial<
  Record<PageAtmosphereFamily, readonly string[]>
> = {
  about: [
    "/images/backgrounds/about/animated/frame-01.webp",
    "/images/backgrounds/about/animated/frame-02.webp",
    "/images/backgrounds/about/animated/frame-03.webp",
    "/images/backgrounds/about/animated/frame-04.webp",
  ],
  contact: [
    "/images/backgrounds/contact/animated/frame-01.webp",
    "/images/backgrounds/contact/animated/frame-02.webp",
    "/images/backgrounds/contact/animated/frame-03.webp",
    "/images/backgrounds/contact/animated/frame-04.webp",
  ],
};

export function AnimatedPageBackground({
  frames,
  fallbackSrc = frames[0],
}: {
  frames: readonly string[];
  fallbackSrc?: string;
}) {
  const [failedFrames, setFailedFrames] = useState<number[]>([]);

  return frames.map((src, index) => {
    const usesFallback = failedFrames.includes(index);
    const primaryFallback = failedFrames.includes(0) ? fallbackSrc : frames[0];

    return (
      <Image
        key={src}
        data-animated-background-frame
        data-frame={index + 1}
        src={usesFallback ? (index === 0 ? fallbackSrc : primaryFallback) : src}
        alt=""
        fill
        sizes="100vw"
        quality={86}
        decoding="async"
        onError={() => {
          if (usesFallback) return;
          setFailedFrames((current) =>
            current.includes(index) ? current : [...current, index],
          );
        }}
        {...(index === 0 ? { preload: true } : { loading: "lazy" as const })}
      />
    );
  });
}

export function resolvePageAtmosphere(pathname: string): {
  family: PageAtmosphereFamily;
  secondary: boolean;
} {
  const [, , ...segments] = pathname.split("/");
  const route = segments.join("/");

  if (route === "a-propos") return { family: "about", secondary: false };
  if (route === "contact") return { family: "contact", secondary: false };
  if (route === "parcours" || route.startsWith("parcours/")) {
    return { family: "journey", secondary: false };
  }
  if (route === "competences" || route.startsWith("competences/")) {
    return { family: "skills", secondary: false };
  }
  if (
    route === "realisations" ||
    route.startsWith("realisations/") ||
    route === "projects" ||
    route.startsWith("projects/")
  ) {
    return { family: "work", secondary: false };
  }

  return { family: "home", secondary: route.length > 0 };
}

export function PageAtmosphere() {
  const pathname = usePathname();
  const { family, secondary } = resolvePageAtmosphere(pathname ?? "/");
  const animatedFrames = animatedAtmosphereFrames[family];
  const usesHomeVideo = family === "home" && !secondary;

  return (
    <div
      aria-hidden="true"
      data-page-atmosphere
      data-family={family}
      data-animated-page-background={animatedFrames ? "" : undefined}
      data-secondary={secondary || undefined}
    >
      {usesHomeVideo ? (
        <HomeAtmosphereBackground />
      ) : animatedFrames ? (
        <AnimatedPageBackground
          frames={animatedFrames}
          fallbackSrc={atmosphereSources[family]}
        />
      ) : (
        <Image
          key={family}
          src={atmosphereSources[family]}
          alt=""
          fill
          sizes="100vw"
          quality={75}
          preload
        />
      )}
      <span data-atmosphere-scrim />
      <span data-atmosphere-light />
    </div>
  );
}
