"use client";

import { useId, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface RadarChartDatum {
  label: string;
  value: number;
}

interface RadarChartProps {
  data: RadarChartDatum[];
  title: string;
}

function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleRad: number,
) {
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad),
  };
}

function buildPolygonPoints(
  cx: number,
  cy: number,
  radius: number,
  count: number,
  startAngle: number,
) {
  return Array.from({ length: count }, (_, i) => {
    const angle = startAngle + (2 * Math.PI * i) / count;
    const { x, y } = polarToCartesian(cx, cy, radius, angle);
    return `${x},${y}`;
  }).join(" ");
}

const W = 700;
const H = 550;
const CX = W / 2;
const CY = H / 2;
const MAX_RADIUS = H * 0.3;
const LABEL_OFFSET = 55;
const START_ANGLE = -Math.PI / 2;
const GRID_LEVELS = [0.25, 0.5, 0.75, 1];

export function RadarChart({ data, title }: RadarChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const count = data.length;

  const dataPoints = data.map((d, i) => {
    const angle = START_ANGLE + (2 * Math.PI * i) / count;
    const r = (d.value / 100) * MAX_RADIUS;
    return polarToCartesian(CX, CY, r, angle);
  });
  const dataPolygonPoints = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  const labels = data.map((d, i) => {
    const angle = START_ANGLE + (2 * Math.PI * i) / count;
    const { x, y } = polarToCartesian(CX, CY, MAX_RADIUS + LABEL_OFFSET, angle);

    let textAnchor: "middle" | "start" | "end" = "middle";
    const cos = Math.cos(angle);
    if (cos > 0.01) textAnchor = "start";
    else if (cos < -0.01) textAnchor = "end";

    let dy = "0.35em";
    const sin = Math.sin(angle);
    if (sin < -0.5) dy = "0em";
    else if (sin > 0.5) dy = "0.7em";

    return { label: d.label, x, y, textAnchor, dy };
  });

  useGSAP(
    () => {
      const polygon = containerRef.current?.querySelector(
        "[data-radar-polygon]",
      );
      if (!polygon) return;

      gsap.from(polygon, {
        autoAlpha: 0,
        scale: 0,
        transformOrigin: `${CX}px ${CY}px`,
        duration: 0.8,
        ease: "power2.out",
      });

      const labelEls = containerRef.current?.querySelectorAll(
        "[data-radar-label]",
      );
      if (labelEls?.length) {
        gsap.from(labelEls, {
          autoAlpha: 0,
          duration: 0.5,
          stagger: 0.05,
          delay: 0.4,
          ease: "power2.out",
        });
      }
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="mx-auto w-full max-w-xl">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-labelledby={`${titleId} ${descriptionId}`}
      >
        <title id={titleId}>{title}</title>
        <desc id={descriptionId}>
          {data.map((item) => `${item.label} : ${item.value} sur 100`).join(", ")}
        </desc>
        {/* Concentric grid polygons */}
        {GRID_LEVELS.map((level) => (
          <polygon
            key={level}
            points={buildPolygonPoints(
              CX,
              CY,
              MAX_RADIUS * level,
              count,
              START_ANGLE,
            )}
            className="fill-none stroke-foreground/20"
            strokeWidth={1}
          />
        ))}

        {/* Axis lines from center to each vertex */}
        {Array.from({ length: count }, (_, i) => {
          const angle = START_ANGLE + (2 * Math.PI * i) / count;
          const { x, y } = polarToCartesian(CX, CY, MAX_RADIUS, angle);
          return (
            <line
              key={i}
              x1={CX}
              y1={CY}
              x2={x}
              y2={y}
              className="stroke-foreground/20"
              strokeWidth={1}
            />
          );
        })}

        {/* Data polygon */}
        <polygon
          data-radar-polygon
          className="invisible fill-primary/20 stroke-primary"
          points={dataPolygonPoints}
          strokeWidth={2}
          strokeLinejoin="round"
        />

        {/* Labels */}
        {labels.map((l) => (
          <text
            key={l.label}
            data-radar-label
            className="invisible fill-foreground text-sm"
            x={l.x}
            y={l.y}
            textAnchor={l.textAnchor}
            dy={l.dy}
          >
            {l.label}
          </text>
        ))}
      </svg>
    </div>
  );
}
