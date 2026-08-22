"use client";

export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("cookie-consent-open"))}
      className="[font:inherit] uppercase transition-colors hover:text-foreground"
    >
      {label}
    </button>
  );
}
