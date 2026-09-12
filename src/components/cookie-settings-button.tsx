"use client";

export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="[font:inherit] uppercase"
      onClick={() => window.dispatchEvent(new Event("cookie-consent-open"))}
    >
      {label}
    </button>
  );
}
