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
      aria-label={`${loadLabel}: ${title}`}
    >
      <span>
        <Play aria-hidden="true" />
      </span>
      <span>
        {loadLabel}
      </span>
      <span>
        {privacyNotice}
      </span>
    </button>
  );
}
