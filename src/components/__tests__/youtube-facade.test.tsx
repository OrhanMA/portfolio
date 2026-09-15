import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { YouTubeFacade } from "@/components/youtube-facade";

describe("YouTubeFacade", () => {
  it("does not create a third-party player until the visitor explicitly loads it", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <YouTubeFacade
        locale="fr"
        src="https://www.youtube.com/embed/example-video"
        title="Démonstration CAP2vie"
      />,
    );

    expect(container.querySelector("iframe")).not.toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: "Charger la vidéo: Démonstration CAP2vie",
      }),
    );

    const player = screen.getByTitle("Démonstration CAP2vie");
    expect(player).toHaveAttribute(
      "src",
      "https://www.youtube-nocookie.com/embed/example-video",
    );
    expect(player).toHaveAttribute(
      "referrerpolicy",
      "strict-origin-when-cross-origin",
    );
  });
});
