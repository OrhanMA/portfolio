import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { EvidenceMediaGallery } from "@/components/evidence-media-gallery";
import type { EvidenceMedia } from "@/lib/types/evidence-media";

const media: EvidenceMedia[] = [
  {
    type: "image",
    src: "/images/example-standard.png",
    title: { fr: "Preuve standard", en: "Standard evidence" },
    description: {
      fr: "Description française standard.",
      en: "Standard English description.",
    },
  },
  {
    type: "image",
    src: "/images/example-wide.png",
    layout: "wide",
    title: { fr: "Preuve large", en: "Wide evidence" },
    description: {
      fr: "Description française large.",
      en: "Wide English description.",
    },
  },
  {
    type: "youtube",
    src: "https://www.youtube.com/embed/example-video",
    title: { fr: "Démonstration vidéo", en: "Video demonstration" },
    description: {
      fr: "Démonstration sans chargement tiers automatique.",
      en: "Demonstration without automatic third-party loading.",
    },
  },
];

const labels = {
  carousel: "Carrousel de preuves visuelles",
  previous: "Précédent",
  next: "Suivant",
  pause: "Mettre en pause",
  resume: "Reprendre",
  position: "Média {current} sur {total}",
  openFullSize: "Voir la capture en taille réelle",
};

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("EvidenceMediaGallery", () => {
  it("navigates between standard and wide evidence with accessible controls", () => {
    const { container } = render(
      <EvidenceMediaGallery
        media={media}
        locale="fr"
        labels={labels}
      />,
    );
    const gallery = screen.getByRole("region", { name: labels.carousel });

    expect(gallery).toHaveAttribute("data-evidence-carousel-count", "3");
    expect(container.querySelectorAll("[data-evidence-media-item]")).toHaveLength(1);
    expect(container.querySelector("[data-evidence-media-item]")).toHaveAttribute(
      "data-evidence-media-layout",
      "standard",
    );
    expect(
      screen.getByRole("img", { name: "Preuve standard" }),
    ).toHaveAttribute("alt", "Preuve standard");

    fireEvent.click(screen.getByRole("button", { name: labels.next }));

    expect(container.querySelector("[data-evidence-media-item]")).toHaveAttribute(
      "data-evidence-media-layout",
      "wide",
    );
    expect(screen.getByRole("img", { name: "Preuve large" })).toHaveAttribute(
      "alt",
      "Preuve large",
    );
    expect(screen.getByText("Média 2 sur 3")).toBeInTheDocument();

    const links = within(gallery).getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", media[1].src);
    expect(links[1]).toHaveAttribute("href", media[1].src);
    expect(links[1]).toHaveTextContent(labels.openFullSize);

    fireEvent.click(screen.getByRole("button", { name: labels.previous }));
    expect(screen.getByRole("img", { name: "Preuve standard" })).toBeInTheDocument();
  });

  it("selects English titles and descriptions", () => {
    render(
      <EvidenceMediaGallery
        media={media.slice(0, 2)}
        locale="en"
        labels={{
          carousel: "Visual evidence carousel",
          previous: "Previous",
          next: "Next",
          pause: "Pause",
          resume: "Resume",
          position: "Media {current} of {total}",
          openFullSize: "View the full-size screenshot",
        }}
      />,
    );

    expect(screen.getByRole("img", { name: "Standard evidence" })).toHaveAttribute(
      "alt",
      "Standard evidence",
    );
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByText("Wide English description.")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "View the full-size screenshot" }),
    ).toHaveAttribute("href", media[1].src);
  });

  it("advances every ten seconds and supports pause and resume", () => {
    vi.useFakeTimers();
    render(
      <EvidenceMediaGallery
        media={media.slice(0, 2)}
        locale="fr"
        labels={labels}
      />,
    );

    act(() => vi.advanceTimersByTime(9_999));
    expect(screen.getByRole("img", { name: "Preuve standard" })).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(1));
    expect(screen.getByRole("img", { name: "Preuve large" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: labels.pause }));
    act(() => vi.advanceTimersByTime(10_000));
    expect(screen.getByRole("img", { name: "Preuve large" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: labels.resume }));
    act(() => vi.advanceTimersByTime(10_000));
    expect(screen.getByRole("img", { name: "Preuve standard" })).toBeInTheDocument();
  });

  it("disables automatic rotation when reduced motion is requested", () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    );

    render(
      <EvidenceMediaGallery
        media={media.slice(0, 2)}
        locale="fr"
        labels={labels}
      />,
    );

    expect(screen.getByRole("button", { name: labels.resume })).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(10_000));
    expect(screen.getByRole("img", { name: "Preuve standard" })).toBeInTheDocument();
  });

  it("preserves the consent-friendly YouTube facade", () => {
    const { container } = render(
      <EvidenceMediaGallery
        media={media.slice(2)}
        locale="fr"
        labels={labels}
      />,
    );

    expect(container.querySelector("iframe")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Charger la vidéo: Démonstration vidéo",
      }),
    ).toBeInTheDocument();
    expect(screen.queryByText(labels.openFullSize)).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: labels.next })).not.toBeInTheDocument();
  });
});
