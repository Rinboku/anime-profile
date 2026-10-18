"use client";

import { useMemo, type CSSProperties } from "react";


 export type TrailArc = { id: string | number; title: string };

type Props = {
  arcs: TrailArc[];
  completedCount: number;
  accentColor?: string;
  className?: string;
};

const WIDTH = 400;
const MAX_STEP = 92; // distanța maximă dintre noduri
const MIN_STEP = 52; // distanța minimă (când există multe arcuri)
const MAX_LABEL = 26; // caractere afișate dintr-un nume înainte de „…”
const PAD_Y = 40;
const X_A = 56;
const X_B = 112;


const cleanTitle = (t: string) => {
  const out = t
    .replace(/^(arc|saga|season|part|chapter|act)\s*\d+\s*[-–—:.]?\s*/i, "")
    .trim();
  return out || t.trim();
};

const shorten = (t: string) =>
  t.length > MAX_LABEL ? t.slice(0, MAX_LABEL - 1).trimEnd() + "…" : t;

export default function ArcProgressTrail({
  arcs,
  completedCount,
  accentColor,
  className,
}: Props) {
  // Cu puține arcuri traseul e aerisit; cu multe, nodurile se apropie
  // ca înălțimea totală să rămână rezonabilă.
  const step =
    arcs.length > 1
      ? Math.max(MIN_STEP, Math.min(MAX_STEP, 640 / (arcs.length - 1)))
      : MAX_STEP;

  const points = useMemo(
    () =>
      arcs.map((_, i) => ({
        x: i % 2 === 0 ? X_A : X_B,
        y: PAD_Y + i * step,
      })),
    [arcs, step]
  );

  if (arcs.length === 0) return null;

  const height = PAD_Y * 2 + (arcs.length - 1) * step;
  const done = Math.max(0, Math.min(completedCount, arcs.length));
  const next = done < arcs.length ? arcs[done] : null;

  const ariaLabel = next
    ? `${done} din ${arcs.length} arcuri terminate. Urmează: ${cleanTitle(
        next.title
      )}.`
    : `Toate cele ${arcs.length} arcuri sunt terminate.`;

  return (
    <figure
      className={`atrail ${className ?? ""}`}
      style={
        accentColor
          ? ({
              "--trail-bright": accentColor,
              "--trail-done": `color-mix(in srgb, ${accentColor} 55%, black)`,
            } as CSSProperties)
          : undefined
      }
    >
      <style>{css}</style>
      <svg
        viewBox={`0 0 ${WIDTH} ${height}`}
        role="img"
        aria-label={ariaLabel}
        className="atrail-svg"
      >
        {/* Segmentele traseului */}
        {points.slice(0, -1).map((p, i) => {
          const q = points[i + 1];
          const ym = (p.y + q.y) / 2;
          const d = `M ${p.x} ${p.y} C ${p.x} ${ym}, ${q.x} ${ym}, ${q.x} ${q.y}`;
          const state =
            i + 1 < done ? "done" : i + 1 === done ? "tonext" : "future";
          return (
            <path
              key={`seg-${i}`}
              d={d}
              pathLength={state === "done" ? 1 : undefined}
              className={`atrail-seg atrail-seg-${state}`}
              style={{ ["--d" as string]: `${0.3 + i * 0.28}s` }}
            />
          );
        })}

        {/* Nodurile și etichetele */}
        {arcs.map((arc, i) => {
          const { x, y } = points[i];
          const state = i < done ? "done" : i === done ? "next" : "future";
          return (
            <g
              key={arc.id}
              className={`atrail-node atrail-node-${state}`}
              transform={`translate(${x} ${y})`}
              style={{ ["--d" as string]: `${0.2 + i * 0.28}s` }}
            >
              {state === "next" && <circle r="15" className="atrail-halo" />}
              <circle r={state === "future" ? 13 : 15} className="atrail-dot" />
              {state === "done" ? (
                <path
                  d="M -5 0.5 L -1.5 4 L 5.5 -4"
                  className="atrail-check"
                />
              ) : (
                <text className="atrail-num" textAnchor="middle" dy="0.35em">
                  {i + 1}
                </text>
              )}
              <text x="30" dy="0.35em" className="atrail-label">
                <title>{cleanTitle(arc.title)}</title>
                {shorten(cleanTitle(arc.title))}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

const css = `
.atrail {
  --trail-ink: #050806;
  --trail-done: #0a5f4a;
  --trail-bright: #34d3a0;
  --trail-dim: #1d2c26;
  --trail-text: #d6ece3;
  --trail-muted: #6c8279;
  margin: 0;
  width: 100%;
  max-width: 400px;
}
.atrail-svg { display: block; width: 100%; height: auto; overflow: visible; }

.atrail-seg { fill: none; stroke-linecap: round; }
.atrail-seg-done {
  stroke: var(--trail-bright);
  stroke-width: 3;
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
  filter: drop-shadow(0 0 5px rgba(52, 211, 160, 0.45));
  animation: atrail-draw 0.7s ease-out var(--d) backwards;
}
.atrail-seg-tonext {
  stroke: var(--trail-bright);
  stroke-width: 2.5;
  stroke-dasharray: 2 8;
  opacity: 0.8;
  animation: atrail-fade 0.5s ease-out var(--d) backwards;
}
.atrail-seg-future {
  stroke: var(--trail-dim);
  stroke-width: 2.5;
  stroke-dasharray: 2 8;
}

.atrail-node { animation: atrail-fade 0.5s ease-out var(--d) backwards; }
.atrail-dot { stroke-width: 2; }
.atrail-node-done .atrail-dot { fill: var(--trail-done); stroke: var(--trail-bright); }
.atrail-node-next .atrail-dot { fill: var(--trail-ink); stroke: var(--trail-bright); stroke-width: 2.5; }
.atrail-node-future .atrail-dot { fill: var(--trail-ink); stroke: var(--trail-dim); }

.atrail-check {
  fill: none;
  stroke: #eafff6;
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.atrail-num { font-size: 12px; font-weight: 600; fill: var(--trail-text); }
.atrail-node-future .atrail-num { fill: var(--trail-muted); }

.atrail-label { font-size: 15px; font-family: inherit; fill: var(--trail-text); }
.atrail-node-next .atrail-label { font-size: 17px; font-weight: 600; fill: #ffffff; }
.atrail-node-future .atrail-label { fill: var(--trail-muted); }

.atrail-halo {
  fill: var(--trail-bright);
  opacity: 0;
  transform-box: fill-box;
  transform-origin: center;
  animation: atrail-pulse 2.4s ease-out 1.6s infinite;
}

@keyframes atrail-draw { from { stroke-dashoffset: 1; } }
@keyframes atrail-fade { from { opacity: 0; } }
@keyframes atrail-pulse {
  0%   { transform: scale(1);   opacity: 0.45; }
  100% { transform: scale(2.1); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .atrail-seg-done, .atrail-seg-tonext, .atrail-node, .atrail-halo { animation: none; }
}
`;

