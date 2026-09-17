"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Pause,
  Play,
} from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { EvidenceMedia } from "@/lib/types/evidence-media";
import { YouTubeFacade } from "@/components/youtube-facade";

const AUTOPLAY_DELAY_MS = 10_000;

type EvidenceMediaGalleryLabels = {
  carousel: string;
  next: string;
  openFullSize: string;
  pause: string;
  position: string;
  previous: string;
  resume: string;
};

type EvidenceMediaGalleryProps = {
  media: EvidenceMedia[];
  locale: Locale;
  labels: EvidenceMediaGalleryLabels;
};

function formatPositionLabel(template: string, current: number, total: number) {
  return template
    .replace("{current}", String(current))
    .replace("{total}", String(total));
}

export function EvidenceMediaGallery({
  media,
  locale,
  labels,
}: EvidenceMediaGalleryProps) {
  const carouselId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(true);
  const [isPointerInside, setIsPointerInside] = useState(false);
  const [isFocusInside, setIsFocusInside] = useState(false);

  useEffect(() => {
    const motionPreference = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    );

    if (!motionPreference) {
      return;
    }

    const disableAutoplay = () => {
      if (motionPreference.matches) {
        setIsAutoplayEnabled(false);
      }
    };

    disableAutoplay();
    motionPreference.addEventListener?.("change", disableAutoplay);

    return () => {
      motionPreference.removeEventListener?.("change", disableAutoplay);
    };
  }, []);

  useEffect(() => {
    if (
      media.length < 2 ||
      !isAutoplayEnabled ||
      isPointerInside ||
      isFocusInside
    ) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % media.length);
    }, AUTOPLAY_DELAY_MS);

    return () => window.clearTimeout(timeout);
  }, [activeIndex, isAutoplayEnabled, isFocusInside, isPointerInside, media.length]);

  if (media.length === 0) {
    return null;
  }

  const safeIndex = Math.min(activeIndex, media.length - 1);
  const item = media[safeIndex];
  const layout = item.layout ?? "standard";
  const title = item.title[locale];
  const positionLabel = formatPositionLabel(
    labels.position,
    safeIndex + 1,
    media.length,
  );
  const hasMultipleItems = media.length > 1;
  const isTemporarilyPaused = isPointerInside || isFocusInside;
  const isActivelyRotating =
    hasMultipleItems && isAutoplayEnabled && !isTemporarilyPaused;

  function showPrevious() {
    setActiveIndex((current) => (current - 1 + media.length) % media.length);
  }

  function showNext() {
    setActiveIndex((current) => (current + 1) % media.length);
  }

  return (
    <div
      data-evidence-media-grid
      data-evidence-carousel
      data-evidence-carousel-count={media.length}
      data-evidence-carousel-autoplay={
        isActivelyRotating ? "running" : "paused"
      }
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.carousel}
      onMouseEnter={() => setIsPointerInside(true)}
      onMouseLeave={() => setIsPointerInside(false)}
      onFocusCapture={() => setIsFocusInside(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsFocusInside(false);
        }
      }}
    >
      {hasMultipleItems ? (
        <div data-evidence-carousel-controls>
          <div data-evidence-carousel-navigation>
            <button
              type="button"
              onClick={showPrevious}
              aria-controls={carouselId}
              aria-label={labels.previous}
              data-evidence-carousel-previous
            >
              <ChevronLeft aria-hidden="true" />
              <span>{labels.previous}</span>
            </button>
            <p
              data-evidence-carousel-position
              aria-live={isActivelyRotating ? "off" : "polite"}
              aria-atomic="true"
            >
              {positionLabel}
            </p>
            <button
              type="button"
              onClick={showNext}
              aria-controls={carouselId}
              aria-label={labels.next}
              data-evidence-carousel-next
            >
              <span>{labels.next}</span>
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => setIsAutoplayEnabled((current) => !current)}
            aria-controls={carouselId}
            aria-label={isAutoplayEnabled ? labels.pause : labels.resume}
            data-evidence-carousel-toggle
          >
            {isAutoplayEnabled ? (
              <Pause aria-hidden="true" />
            ) : (
              <Play aria-hidden="true" />
            )}
            <span>{isAutoplayEnabled ? labels.pause : labels.resume}</span>
          </button>
        </div>
      ) : null}

      <div id={carouselId} data-evidence-carousel-viewport>
        <div
          key={item.src}
          role="group"
          aria-roledescription="slide"
          aria-label={positionLabel}
        >
          <figure
            data-evidence-media-item
            data-evidence-media-index={safeIndex}
            data-evidence-media-layout={layout}
          >
            <div data-evidence-media-frame>
              {item.type === "image" ? (
                <a
                  href={item.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${labels.openFullSize}: ${title}`}
                >
                  <Image
                    src={item.src}
                    alt={title}
                    fill
                    sizes="(min-width: 1280px) 1152px, (min-width: 768px) 90vw, 100vw"
                  />
                </a>
              ) : (
                <YouTubeFacade src={item.src} title={title} locale={locale} />
              )}
            </div>
            <figcaption>
              <div data-evidence-media-copy>
                <p>{title}</p>
                <p>{item.description[locale]}</p>
              </div>
              {item.type === "image" ? (
                <a
                  href={item.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-evidence-media-full-size
                >
                  {labels.openFullSize}
                  <ExternalLink aria-hidden="true" />
                </a>
              ) : null}
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}
