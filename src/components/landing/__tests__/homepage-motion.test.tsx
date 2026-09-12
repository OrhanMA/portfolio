import { afterEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { HomepageMotion } from "@/components/landing/homepage-motion";

describe("HomepageMotion", () => {
  afterEach(() => {
    window.history.replaceState(null, "", "/");
  });

  it("reveals a section immediately when it is the direct hash target", () => {
    window.history.replaceState(null, "", "/fr#parcours");

    render(
      <>
        <section id="parcours">
          <h2>Parcours</h2>
        </section>
        <HomepageMotion />
      </>,
    );

    expect(screen.getByRole("heading", { name: "Parcours" })).not.toHaveClass(
      "invisible",
    );
  });
});
