"use client";
import SplitTitle from "./SplitTitle";

/**
 * SkillsPanel (repurposed as Projects Intro Panel)
 * Serves as the first scrolling card before the actual projects appear.
 */
export default function SkillsPanel() {
  return (
    <div className="max-w-4xl w-full mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-center relative z-20">
      
      <div className="flex items-center gap-4 mb-8 fade-up-item">
        <div className="h-px w-12 bg-[var(--border-color)] hidden md:block" />
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent-primary)]">
          Portfolio
        </span>
        <div className="h-px w-12 bg-[var(--border-color)] hidden md:block" />
      </div>

      <h2 className="font-outfit font-light text-6xl md:text-7xl lg:text-8xl text-[var(--text-primary)] tracking-tight leading-[1.1] mb-8">
        <SplitTitle text="Selected" /> <br />
        <SplitTitle
          text="Works."
          className="font-serif italic text-[var(--accent-primary)]"
        />
      </h2>

      <p className="text-[var(--text-secondary)] text-lg md:text-xl lg:text-2xl font-light leading-relaxed max-w-2xl fade-up-item">
        Kumpulan proyek terpilih yang menunjukkan pengalaman saya dalam membangun
        aplikasi digital yang fungsional, interaktif, dan terukur.
      </p>

    </div>
  );
}
