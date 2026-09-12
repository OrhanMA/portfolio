export type TimelineEntry = {
  id: string;
  startDate: string;
  endDate: string | null;
};

export type ExperienceRelationEntry = {
  id: string;
  linkedRealisations?: readonly string[];
};

export function findLinkedExperiences<T extends ExperienceRelationEntry>(
  entries: readonly T[],
  realisationSlug: string,
) {
  return entries.filter((entry) =>
    entry.linkedRealisations?.includes(realisationSlug),
  );
}

export function requireLinkedExperience<T extends ExperienceRelationEntry>(
  entries: readonly T[],
  realisationSlug: string,
) {
  const experience = findLinkedExperiences(entries, realisationSlug).at(0);

  if (!experience) {
    throw new Error(
      `Realisation ${realisationSlug} must reference at least one experience`,
    );
  }

  return experience;
}

function toDateBoundaryKey(value: string, boundary: "start" | "end") {
  const [year, month, day] = value.split("-");
  const isStart = boundary === "start";

  return [
    year,
    month ?? (isStart ? "01" : "12"),
    day ?? (isStart ? "01" : "31"),
  ].join("-");
}

/**
 * Sorts a timeline like a reverse-chronological CV.
 *
 * An open end comes first, followed by the latest end date. Overlapping
 * periods with the same end are resolved by their latest start date, then by
 * their stable id. Partial ISO dates are interpreted at the lower boundary
 * for starts and the upper boundary for ends.
 */
export function sortTimelineEntries<T extends TimelineEntry>(
  entries: readonly T[],
) {
  return [...entries].sort((a, b) => {
    if (a.endDate === null && b.endDate !== null) return -1;
    if (a.endDate !== null && b.endDate === null) return 1;

    if (a.endDate !== null && b.endDate !== null) {
      const endComparison = toDateBoundaryKey(b.endDate, "end").localeCompare(
        toDateBoundaryKey(a.endDate, "end"),
      );
      if (endComparison !== 0) return endComparison;
    }

    const startComparison = toDateBoundaryKey(
      b.startDate,
      "start",
    ).localeCompare(toDateBoundaryKey(a.startDate, "start"));
    if (startComparison !== 0) return startComparison;

    if (a.id === b.id) return 0;
    return a.id < b.id ? -1 : 1;
  });
}
