import type { SVGProps } from "react";

type PixelSvgProps = SVGProps<SVGSVGElement>;

const sharedProps = {
  "aria-hidden": true,
  focusable: false,
  shapeRendering: "crispEdges" as const,
};

export function PixelHeart({ className, ...props }: PixelSvgProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...sharedProps} {...props}>
      <path
        d="M3 5h2V3h5v2h4V3h5v2h2v8h-2v2h-2v2h-2v2h-2v2h-2v-2H9v-2H7v-2H5v-2H3Z"
        fill="currentColor"
      />
      <path d="M5 5h4v2h2v2H9V7H5Zm10 0h4v4h-2V7h-2Z" fill="white" opacity=".85" />
      <path d="M5 13h2v2h2v2h2v2H9v-2H7v-2H5Z" fill="black" opacity=".28" />
    </svg>
  );
}

export function PixelSpark({ className, ...props }: PixelSvgProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...sharedProps} {...props}>
      <path d="M10 2h4v6h6v4h-6v10h-4V12H4V8h6Z" fill="currentColor" />
      <path d="M2 3h2v3H2Zm18 14h2v4h-2Z" fill="currentColor" opacity=".55" />
    </svg>
  );
}

export function PixelFlag({ className, ...props }: PixelSvgProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...sharedProps} {...props}>
      <path d="M4 2h3v20H4Z" fill="currentColor" />
      <path d="M7 3h12v3h-2v3h2v3H7Z" fill="var(--vermillion)" />
      <path d="M7 12h3v2H7Z" fill="currentColor" opacity=".35" />
    </svg>
  );
}

export function PixelDocument({ className, ...props }: PixelSvgProps) {
  return (
    <svg viewBox="0 0 28 32" className={className} {...sharedProps} {...props}>
      <path d="M4 1h14l6 6v24H4Z" fill="white" stroke="currentColor" strokeWidth="2" />
      <path d="M18 1v7h6M8 13h12v3H8Zm0 6h12v3H8Zm0 6h8v3H8Z" fill="currentColor" />
    </svg>
  );
}

export type PixelSkillIconName =
  | "backend"
  | "frontend"
  | "odoo"
  | "devops"
  | "methods"
  | "education";

export function PixelSkillIcon({
  name,
  className,
  ...props
}: PixelSvgProps & { name: PixelSkillIconName }) {
  const common = { className, ...sharedProps, ...props };

  if (name === "backend") {
    return (
      <svg viewBox="0 0 32 32" {...common}>
        <path d="M6 3h20v26H6Z" fill="currentColor" />
        <path d="M9 7h14v5H9Zm0 8h14v5H9Zm0 8h14v3H9Z" fill="white" />
        <path d="M10 8h3v3h-3Zm0 8h3v3h-3Z" fill="var(--vermillion)" />
      </svg>
    );
  }

  if (name === "frontend") {
    return (
      <svg viewBox="0 0 32 32" {...common}>
        <path d="M2 5h28v23H2Z" fill="currentColor" />
        <path d="M5 9h22v16H5Z" fill="white" />
        <path d="M5 5h22v5H5Z" fill="var(--vermillion)" />
        <path d="M8 6h3v2H8Zm5 0h3v2h-3Z" fill="white" />
      </svg>
    );
  }

  if (name === "odoo") {
    return (
      <svg viewBox="0 0 32 32" {...common}>
        <path d="M10 2h12v3h5v5h3v12h-3v5h-5v3H10v-3H5v-5H2V10h3V5h5Z" fill="currentColor" />
        <path d="M11 7h10v3h4v12h-4v3H11v-3H7V10h4Z" fill="white" />
      </svg>
    );
  }

  if (name === "devops") {
    return (
      <svg viewBox="0 0 36 32" {...common}>
        <path d="M9 12h3V7h5V4h8v3h5v5h4v11h-3v4H7v-3H2V16h4v-4Z" fill="currentColor" />
        <path d="M9 16h20v7H9Z" fill="white" opacity=".82" />
      </svg>
    );
  }

  if (name === "methods") {
    return <PixelHeart className={className} {...props} />;
  }

  return (
    <svg viewBox="0 0 36 32" {...common}>
      <path d="M2 10 18 2l16 8-16 8Z" fill="currentColor" />
      <path d="M8 15h20v9l-5 5H13l-5-5Z" fill="currentColor" />
      <path d="M32 12h2v13h-2Z" fill="var(--vermillion)" />
    </svg>
  );
}
