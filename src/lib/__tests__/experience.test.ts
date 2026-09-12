import { describe, expect, it } from "vitest";
import {
  requireLinkedExperience,
  sortTimelineEntries,
} from "@/lib/experience";

describe("sortTimelineEntries", () => {
  it("sorts overlapping periods by latest end, then latest start", () => {
    const entries = [
      { id: "lig", startDate: "2024-05", endDate: "2024-10" },
      { id: "same-end-older-start", startDate: "2023", endDate: "2024-12" },
      { id: "current-older", startDate: "2023", endDate: null },
      { id: "cda", startDate: "2024-01", endDate: "2024-12" },
      { id: "current-newer", startDate: "2025", endDate: null },
    ] as const;

    expect(sortTimelineEntries(entries).map(({ id }) => id)).toEqual([
      "current-newer",
      "current-older",
      "cda",
      "same-end-older-start",
      "lig",
    ]);
  });

  it("uses the stable id for identical intervals without mutating the source", () => {
    const entries = [
      { id: "zeta", startDate: "2025-08-07", endDate: "2025-08-07" },
      { id: "alpha", startDate: "2025-08-07", endDate: "2025-08-07" },
    ];

    const sorted = sortTimelineEntries(entries);

    expect(sorted.map(({ id }) => id)).toEqual(["alpha", "zeta"]);
    expect(entries.map(({ id }) => id)).toEqual(["zeta", "alpha"]);
    expect(sorted).not.toBe(entries);
  });

  it("uses the upper boundary of a partial end date", () => {
    const entries = [
      { id: "october", startDate: "2024-05", endDate: "2024-10" },
      { id: "whole-year", startDate: "2024", endDate: "2024" },
    ];

    expect(sortTimelineEntries(entries).map(({ id }) => id)).toEqual([
      "whole-year",
      "october",
    ]);
  });

  it("reports the realisation slug when no linked experience exists", () => {
    expect(() => requireLinkedExperience([], "orphan-realisation")).toThrow(
      "Realisation orphan-realisation must reference at least one experience",
    );
  });
});
