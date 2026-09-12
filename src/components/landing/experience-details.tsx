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
    <div className="experience-details">
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
        className={open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
      >
        <div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
