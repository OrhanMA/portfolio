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
    <div className="experience-details mt-5 border-t border-border pt-4">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((current) => !current)}
        className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        <span
          aria-hidden="true"
          className={`transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
        {label}
      </button>

      <div
        id={contentId}
        aria-hidden={!open}
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
          open
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
