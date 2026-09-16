import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  AnimatedPageBackground,
  animatedAtmosphereFrames,
  HomeAtmosphereBackground,
  resolvePageAtmosphere,
} from "@/components/page-atmosphere";

describe("resolvePageAtmosphere", () => {
  it.each([
    ["/fr", "home", false],
    ["/en/a-propos", "about", false],
    ["/fr/parcours", "journey", false],
    ["/fr/parcours/1up-fullstack-developer", "journey", false],
    ["/fr/competences", "skills", false],
    ["/en/competences/communication", "skills", false],
    ["/fr/realisations", "work", false],
    ["/fr/realisations/modules-metier-odoo", "work", false],
    ["/en/projects/legacy", "work", false],
    ["/fr/contact", "contact", false],
    ["/en/contact", "contact", false],
    ["/en/articles", "home", true],
  ] as const)("maps %s to %s", (pathname, family, secondary) => {
    expect(resolvePageAtmosphere(pathname)).toEqual({ family, secondary });
  });
});

describe("animatedAtmosphereFrames", () => {
  it("keeps About's living background as an ordered four-frame sequence", () => {
    expect(animatedAtmosphereFrames.about).toEqual([
      "/images/backgrounds/about/animated/frame-01.webp",
      "/images/backgrounds/about/animated/frame-02.webp",
      "/images/backgrounds/about/animated/frame-03.webp",
      "/images/backgrounds/about/animated/frame-04.webp",
    ]);
  });

  it("keeps Contact's living background as an ordered four-frame sequence", () => {
    expect(animatedAtmosphereFrames.contact).toEqual([
      "/images/backgrounds/contact/animated/frame-01.webp",
      "/images/backgrounds/contact/animated/frame-02.webp",
      "/images/backgrounds/contact/animated/frame-03.webp",
      "/images/backgrounds/contact/animated/frame-04.webp",
    ]);
  });
});

describe("AnimatedPageBackground", () => {
  it("falls back to the page's static image when the primary frame cannot load", () => {
    const frames = animatedAtmosphereFrames.about!;
    const fallbackSrc = "/images/background-about.webp";
    const { container } = render(
      <AnimatedPageBackground frames={frames} fallbackSrc={fallbackSrc} />,
    );
    const primaryFrame = container.querySelector<HTMLElement>(
      '[data-animated-background-frame][data-frame="1"]',
    );

    expect(primaryFrame).not.toBeNull();
    fireEvent.error(primaryFrame!);

    expect(primaryFrame).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent(fallbackSrc)),
    );
  });

  it("keeps the first frame when a secondary frame cannot load", () => {
    const frames = animatedAtmosphereFrames.contact!;
    const { container } = render(<AnimatedPageBackground frames={frames} />);
    const images = container.querySelectorAll("img");
    const secondaryFrame = container.querySelector<HTMLElement>(
      '[data-animated-background-frame][data-frame="2"]',
    );

    expect(images).toHaveLength(4);
    expect(secondaryFrame).not.toBeNull();
    fireEvent.error(secondaryFrame!);

    expect(secondaryFrame).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent(frames[0])),
    );
  });
});

describe("HomeAtmosphereBackground", () => {
  it("uses the supplied H.264 video silently in an inline loop, with the existing image as fallback", () => {
    const { container } = render(<HomeAtmosphereBackground />);
    const video = container.querySelector<HTMLVideoElement>(
      "[data-home-atmosphere-video]",
    );
    const fallback = container.querySelector<HTMLElement>(
      "[data-home-atmosphere-fallback]",
    );

    expect(video).toHaveAttribute("autoplay");
    expect(video).toHaveAttribute("loop");
    expect(video?.muted).toBe(true);
    expect(video).toHaveAttribute("playsinline");
    expect(video).toHaveAttribute("preload", "metadata");
    expect(video).toHaveAttribute("poster", "/images/background-home.webp");
    expect(video?.querySelector("source")).toHaveAttribute(
      "src",
      "/videos/home-atmosphere.mp4",
    );
    expect(fallback).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent("/images/background-home.webp")),
    );
  });
});
