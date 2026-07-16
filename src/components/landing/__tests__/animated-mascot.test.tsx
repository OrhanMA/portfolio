import { beforeEach, describe, expect, it, vi } from "vitest";
import { AnimatedMascot } from "@/components/landing/animated-mascot";
import { gsap, useGSAP } from "@/lib/gsap";
import { renderWithProviders } from "@/test/utils";

describe("AnimatedMascot", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("preloads the base and alternate frames in the same layout box", () => {
    const { container } = renderWithProviders(
      <AnimatedMascot
        src="/images/decorative/pixel-ninja.png"
        variantSrc="/images/decorative/pixel-ninja-wink.png"
        width={1254}
        height={1254}
        className="h-40 w-40"
      />,
    );

    const frames = container.querySelectorAll("img");
    expect(frames).toHaveLength(2);
    expect(frames[0].getAttribute("src")).toContain(
      encodeURIComponent("/images/decorative/pixel-ninja.png"),
    );
    expect(frames[1].getAttribute("src")).toContain(
      encodeURIComponent("/images/decorative/pixel-ninja-wink.png"),
    );
    expect(container.querySelector("[data-mascot-animation]")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("keeps the base visible beneath the recurring variant layer", () => {
    const { container } = renderWithProviders(
      <AnimatedMascot
        src="/mascot.png"
        variantSrc="/mascot-wink.png"
        width={100}
        height={100}
        intervalMs={6000}
        initialDelayMs={3000}
        frameDurationMs={220}
      />,
    );

    const base = container.querySelector<HTMLElement>(
      '[data-mascot-layer="base"]',
    );
    const variant = container.querySelector<HTMLElement>(
      '[data-mascot-layer="variant"]',
    );
    expect(base).toHaveClass("absolute", "inset-0", "z-0", "h-full", "w-full");
    expect(base).toHaveStyle({ animation: "none", opacity: "1" });
    expect(variant).toHaveClass(
      "absolute",
      "inset-0",
      "z-10",
      "h-full",
      "w-full",
    );
    expect(base?.parentElement).toBe(variant?.parentElement);

    const animationCallback = vi.mocked(useGSAP).mock.calls.at(-1)?.[0] as
      | (() => void)
      | undefined;
    expect(animationCallback).toBeTypeOf("function");
    animationCallback?.();

    expect(gsap.set).toHaveBeenCalledWith(variant, { autoAlpha: 0 });
    expect(gsap.timeline).toHaveBeenCalledWith({
      delay: 3,
      repeat: -1,
      repeatDelay: 5.78,
    });
    const timeline = vi.mocked(gsap.timeline).mock.results.at(-1)?.value;
    expect(timeline?.set).toHaveBeenNthCalledWith(1, variant, {
      autoAlpha: 1,
      visibility: "visible",
    });
    expect(timeline?.set).toHaveBeenNthCalledWith(
      2,
      variant,
      { autoAlpha: 0, visibility: "hidden" },
      0.22,
    );
  });

  it("uses the base and variant classes targeted by reduced-motion CSS", () => {
    const { container } = renderWithProviders(
      <AnimatedMascot
        src="/mascot.png"
        variantSrc="/mascot-wink.png"
        width={100}
        height={100}
      />,
    );

    expect(container.querySelector(".mascot-layer-base")).toHaveClass(
      "mascot-layer-base",
    );
    expect(container.querySelector(".mascot-layer-variant")).toHaveClass(
      "mascot-layer-variant",
    );
  });
});
