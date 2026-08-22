"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import type { Locale } from "@/lib/i18n";

function privacyEnhancedEmbedUrl(src: string) {
  return src.replace("www.youtube.com/embed/", "www.youtube-nocookie.com/embed/");
}

export function YouTubeFacade({
  src,
  title,
  locale,
}: {
  src: string;
  title: string;
  locale: Locale;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const loadLabel = locale === "fr" ? "Charger la vidéo" : "Load video";
  const privacyNotice =
    locale === "fr"
      ? "YouTube ne sera contacté qu’après votre action."
      : "YouTube is contacted only after you choose to load the video.";

  if (isLoaded) {
    return (
      <iframe
        src={privacyEnhancedEmbedUrl(src)}
        title={title}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="no-referrer"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsLoaded(true)}
      className="group relative flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden bg-muted px-6 text-center text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      aria-label={`${loadLabel}: ${title}`}
    >
      <span className="flex size-14 items-center justify-center rounded-full bg-foreground text-background transition-transform group-hover:scale-105">
        <Play aria-hidden="true" className="ml-0.5 size-6 fill-current" />
      </span>
      <span className="font-sans text-xs font-bold uppercase tracking-[0.16em]">
        {loadLabel}
      </span>
      <span className="max-w-sm text-xs leading-5 text-muted-foreground">
        {privacyNotice}
      </span>
    </button>
  );
}
