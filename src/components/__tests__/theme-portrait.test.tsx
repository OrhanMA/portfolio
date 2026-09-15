import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ThemePortrait } from "@/components/theme-portrait";

describe("ThemePortrait", () => {
  it("renders matching light and dark portraits while keeping one accessible name", () => {
    const { container } = render(
      <ThemePortrait
        alt="Portrait d'Orhan Madi Assani"
        width={1024}
        height={1024}
        sizes="320px"
      />,
    );

    const portraits = screen.getAllByAltText("Portrait d'Orhan Madi Assani");

    expect(portraits).toHaveLength(2);
    expect(portraits[0]).toHaveAttribute("src", expect.stringContaining("orhan-portrait.webp"));
    expect(portraits[0]).toHaveClass("dark:hidden");
    expect(portraits[1]).toHaveAttribute(
      "src",
      expect.stringContaining("orhan-portrait-dark.webp"),
    );
    expect(portraits[1]).toHaveClass("hidden", "dark:block");
    expect(container.querySelectorAll("img")).toHaveLength(2);
  });
});
