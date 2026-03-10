"use client";
import SplitTitle from "./SplitTitle";
import { skillCategories } from "./data";

/**
 * SkillsPanel — the content inside the sticky Skills card.
 * All .split-char and .fade-up-item classes are picked up by the
 * parent's GSAP animation logic.
 */
export default function SkillsPanel() {
  return (
    <div className="max-w-6xl w-full mx-auto px-6 md:px-12 flex flex-col xl:flex-row gap-16 xl:gap-24 items-center relative z-20">
      {/* Left: heading + description */}
      <div className="flex-1 w-full">
        <div className="flex items-center gap-4 mb-6 fade-up-item">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-primary)]">
            Expertise
          </span>
          <div className="h-px w-12 bg-[var(--border-color)]" />
        </div>

        <h2 className="font-outfit font-light text-5xl lg:text-7xl text-[var(--text-primary)] tracking-tight leading-[1.1] mb-6">
          <SplitTitle text="Tools of" /> <br />
          <SplitTitle
            text="the trade."
            className="font-serif italic text-[var(--accent-primary)]"
          />
        </h2>

        <p className="text-[var(--text-secondary)] text-lg lg:text-xl font-light leading-relaxed max-w-lg fade-up-item">
          I continuously learn and adapt to the best tools available, ensuring I
          deliver scalable, performant, and beautiful applications.
        </p>
      </div>

      {/* Right: skill categories grid */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 w-full">
        {skillCategories.map((category) => (
          <div key={category.title} className="fade-up-item group">
            <h3 className="font-outfit text-xl lg:text-2xl text-[var(--text-primary)] mb-6 pb-3 border-b border-[var(--border-color)] group-hover:border-[var(--text-primary)] transition-colors duration-500">
              {category.title}
            </h3>
            <ul className="flex flex-col gap-3">
              {category.skills.map((skill) => (
                <li
                  key={skill}
                  className="flex items-center gap-3 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-300"
                >
                  <div className="w-1.5 h-1.5 bg-[var(--accent-primary)] opacity-40 group-hover:opacity-100 transition-opacity" />
                  <span className="font-light tracking-wide text-sm lg:text-base">
                    {skill}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
