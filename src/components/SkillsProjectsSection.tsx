"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { projects, PALETTES } from "./projects/data";
import SkillsPanel from "./projects/SkillsPanel";
import ProjectPanel from "./projects/ProjectPanel";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Animation helpers ────────────────────────────────────────────

async function playTitle(chars: NodeListOf<Element>, dir: "down" | "up") {
  const { animate, stagger } = await import("animejs");
  const fromY = dir === "down" ? "110%" : "-110%";

  // Snap to start position instantly
  animate(chars, {
    translateY: fromY,
    opacity: 0,
    filter: "blur(8px)",
    duration: 0,
  });

  // Reveal
  animate(chars, {
    translateY: ["0%"],
    opacity: [1],
    filter: ["blur(0px)"],
    duration: 850,
    delay: stagger(28),
    ease: "outExpo",
  });
}

async function hideTitle(chars: NodeListOf<Element>, dir: "down" | "up") {
  const { animate } = await import("animejs");
  animate(chars, {
    translateY: dir === "down" ? "110%" : "-110%",
    opacity: 0,
    filter: "blur(8px)",
    duration: 0,
  });
}

function playFade(items: NodeListOf<Element>, dir: "down" | "up") {
  gsap.killTweensOf(items);
  gsap.set(items, { y: dir === "down" ? 40 : -40, opacity: 0 });
  gsap.to(items, {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.12,
    ease: "power3.out",
  });
}

function hideFade(items: NodeListOf<Element>, dir: "down" | "up") {
  gsap.killTweensOf(items);
  gsap.set(items, { y: dir === "down" ? 40 : -40, opacity: 0 });
}

// ─── Main Component ───────────────────────────────────────────────

export default function SkillsProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const panels = gsap.utils.toArray<HTMLElement>(".sticky-panel");

      panels.forEach((panel, i) => {
        const chars = panel.querySelectorAll(".split-char");
        const fadeItems = panel.querySelectorAll(".fade-up-item");

        // ── Set initial hidden state ──
        hideTitle(chars, "down");
        hideFade(fadeItems, "down");

        // ── Bidirectional content reveal ──
        ScrollTrigger.create({
          trigger: panel,
          start: "top 80%",
          onEnter: () => {
            playTitle(chars, "down");
            playFade(fadeItems, "down");
          },
          onEnterBack: () => {
            playTitle(chars, "up");
            playFade(fadeItems, "up");
          },
          onLeave: () => {
            hideTitle(chars, "up");
            hideFade(fadeItems, "up");
          },
          onLeaveBack: () => {
            hideTitle(chars, "down");
            hideFade(fadeItems, "down");
          },
        });

        // ── Stacked-card shrink: only applies to project panels (skip Skills at i=0) ──
        if (i > 0 && i < panels.length - 1) {
          const nextPanel = panels[i + 1];
          const card = panel.querySelector<HTMLElement>(".card-inner");
          const overlay = panel.querySelector<HTMLElement>(".card-overlay");

          if (card) {
            // Start state: flat corners, no rotation, full size
            gsap.set(card, {
              borderRadius: "0px",
              scale: 1,
              rotation: 0,
              transformOrigin: "top center",
            });

            // Animate: shrink + tilt + round corners as next card covers this one
            gsap.to(card, {
              scale: 0.82, // noticeably smaller so rotation is visible
              rotation: -8, // subtle CCW tilt — matches reference image
              borderRadius: "3rem", // rounded card look
              ease: "none",
              scrollTrigger: {
                trigger: nextPanel,
                start: "top bottom",
                end: "top top",
                scrub: 1.2,
              },
            });
          }

          if (overlay) {
            gsap.set(overlay, { opacity: 0 });
            gsap.to(overlay, {
              opacity: 0.3, // subtle dim, not too dark
              ease: "none",
              scrollTrigger: {
                trigger: nextPanel,
                start: "top bottom",
                end: "top top",
                scrub: 1.2,
              },
            });
          }
        }
      });
    },
    { scope: containerRef },
  );

  // ─── Render ───────────────────────────────────────────────────

  return (
    <div id="skills" ref={containerRef} className="relative w-full">
      {/* ── Panel 1: Skills ────────── */}
      <section
        className="sticky-panel sticky top-0 h-screen md:h-screen flex flex-col justify-center"
        style={{ zIndex: 10, backgroundColor: "var(--bg-primary)" }}
      >
        {/* card-inner: the white/light card — no scale animation, no inner shadow */}
        <div
          className="card-inner absolute inset-0 flex flex-col justify-center overflow-hidden will-change-transform"
          style={{ backgroundColor: "var(--bg-primary)" }}
        >
          {/* dark overlay for dimming effect */}
          <div className="card-overlay absolute inset-0 bg-black pointer-events-none opacity-0 z-40" />
          <SkillsPanel />
        </div>
      </section>

      {/* ── Panels 2–N: Projects ────── */}
      {projects.map((project, i) => (
        <section
          key={project.title}
          className="sticky-panel sticky top-0 h-screen md:h-screen flex flex-col justify-center bg-black"
          style={{ zIndex: 11 + i }}
        >
          <div
            className="card-inner absolute inset-0 flex flex-col justify-center overflow-hidden will-change-transform"
            style={{ backgroundColor: PALETTES[project.palette].bg }}
          >
            {/* dark overlay for dimming effect */}
            <div className="card-overlay absolute inset-0 bg-black pointer-events-none opacity-0 z-40" />
            <ProjectPanel project={project} index={i} />
          </div>
        </section>
      ))}
    </div>
  );
}
