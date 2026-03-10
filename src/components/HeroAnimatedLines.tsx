"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin);
}

const lines = [
  {
    id: 1,
    path: "M-50 250 C 150 200, 300 240, 450 220",
    duration: 12,
    delay: 0,
  },
  {
    id: 2,
    path: "M150 1000 C 180 700, 150 500, 500 480",
    duration: 15,
    delay: 2,
  },
  {
    id: 3,
    path: "M1500 100 C 1400 250, 1200 240, 900 260",
    duration: 14,
    delay: 1,
  },
  {
    id: 4,
    path: "M950 490 C 1200 500, 1300 650, 1500 850",
    duration: 16,
    delay: 4,
  },
  {
    id: 5,
    path: "M680 500 C 690 650, 680 800, 680 900",
    duration: 10,
    delay: 3,
  },
];

const TRAIL_LENGTH = 150;

export default function HeroAnimatedLines() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        lines.forEach((line) => {
          const pathEl = document.querySelector(
            `#path-${line.id}`,
          ) as SVGPathElement;
          const dotEl = document.querySelector(
            `.dot-${line.id}`,
          ) as SVGCircleElement;
          const maskPathEl = document.querySelector(
            `.mask-path-${line.id}`,
          ) as SVGPathElement;

          if (!pathEl || !dotEl || !maskPathEl) return;

          const length = pathEl.getTotalLength();

          // Initialize mask path with stroke-dasharray
          gsap.set(maskPathEl, {
            strokeDasharray: `${TRAIL_LENGTH} ${length + TRAIL_LENGTH}`,
            strokeDashoffset: TRAIL_LENGTH,
            opacity: 0,
          });
          gsap.set(dotEl, { opacity: 0 });

          const tl = gsap.timeline({ repeat: -1, delay: line.delay });

          // Fade in
          tl.to(
            [dotEl, maskPathEl],
            { opacity: 1, duration: 0.8, ease: "power2.out" },
            0,
          );

          // Move dot
          tl.to(
            dotEl,
            {
              duration: line.duration,
              ease: "none",
              motionPath: {
                path: `#path-${line.id}`,
                align: `#path-${line.id}`,
                alignOrigin: [0.5, 0.5],
              },
            },
            0,
          );

          // Animate mask path trail
          tl.to(
            maskPathEl,
            {
              strokeDashoffset: TRAIL_LENGTH - length,
              duration: line.duration,
              ease: "none",
            },
            0,
          );

          // Fade out near end
          tl.to(
            [dotEl, maskPathEl],
            {
              opacity: 0,
              duration: 0.8,
              ease: "power2.in",
            },
            line.duration - 0.8,
          );

          // Pause before repeat
          tl.to({}, { duration: 2 });
        });
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="mask-blur">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          {lines.map((l) => (
            <mask
              id={`mask-${l.id}`}
              key={`mask-${l.id}`}
              maskUnits="userSpaceOnUse"
            >
              <path
                className={`mask-path-${l.id}`}
                d={l.path}
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                filter="url(#mask-blur)"
              />
            </mask>
          ))}
        </defs>

        {lines.map((l) => (
          <g key={`group-${l.id}`}>
            {/* Base Path (Invisible) */}
            <path id={`path-${l.id}`} d={l.path} stroke="none" fill="none" />

            {/* Revealed Trail Path */}
            <path
              d={l.path}
              stroke="var(--text-primary)"
              strokeWidth="0.8"
              strokeLinecap="round"
              fill="none"
              opacity="0.15"
              mask={`url(#mask-${l.id})`}
            />

            {/* Moving dot */}
            <circle
              className={`dot-${l.id}`}
              r="3"
              fill="var(--bg-primary)"
              stroke="var(--accent-primary)"
              strokeWidth="1.2"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
