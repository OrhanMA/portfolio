"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export type PageAtmosphereFamily =
  | "home"
  | "about"
  | "journey"
  | "skills"
  | "work";

const atmosphereSources: Record<PageAtmosphereFamily, string> = {
  home: "/images/background-home.webp",
  about: "/images/background-about.webp",
  journey: "/images/background-journey.webp",
  skills: "/images/background-skills.webp",
  work: "/images/background-work.webp",
};

export function resolvePageAtmosphere(pathname: string): {
  family: PageAtmosphereFamily;
  secondary: boolean;
} {
  const [, , ...segments] = pathname.split("/");
  const route = segments.join("/");

  if (route === "a-propos") return { family: "about", secondary: false };
  if (route.startsWith("parcours/")) {
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

  return (
    <div
      aria-hidden="true"
      data-page-atmosphere
      data-family={family}
      data-secondary={secondary || undefined}
    >
      <Image
        key={family}
        src={atmosphereSources[family]}
        alt=""
        fill
        sizes="100vw"
        quality={75}
        preload
      />
      <span data-atmosphere-scrim />
      <span data-atmosphere-light />
    </div>
  );
}
