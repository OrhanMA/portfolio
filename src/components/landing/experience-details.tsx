"use client";

import { useId, useState, type ReactNode } from "react";

export function ExperienceDetails({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const contentId = useId();

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((current) => !current)}
      >
        <span
          aria-hidden="true"
        >
          +
        </span>
        {label}
      </button>

      <div
        id={contentId}
        aria-hidden={!open}
        inert={!open}
      >
        <div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
