"use client";
import { ArrowUpRight, Github } from "lucide-react";
import SplitTitle from "./SplitTitle";
import type { Project } from "./data";
import { PALETTES } from "./data";

interface ProjectPanelProps {
  project: Project;
  index: number;
}

/**
 * ProjectPanel — content inside a single sticky project card.
 * Background and text colors come from the project's `palette` field in data.ts.
 */
export default function ProjectPanel({ project, index }: ProjectPanelProps) {
  const palette = PALETTES[project.palette];

  return (
    <div className="max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 items-center relative z-20">
      {/* Left Side: Content */}
      <div className="flex-1 w-full order-2 lg:order-1">
        {/* Index label */}
        <div className="flex items-center gap-4 mb-8 fade-up-item">
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.25em]"
            style={{ color: palette.accentText }}
          >
            Project 0{index + 1}
          </span>
          <div
            className="h-px w-16"
            style={{ backgroundColor: palette.border }}
          />
        </div>

        {/* Title  */}
        <h2
          className="font-outfit font-light text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight mb-8"
          style={{ color: palette.textPrimary }}
        >
          <SplitTitle text={project.title} />
        </h2>

        {/* Description */}
        <p
          className="text-base lg:text-lg font-light leading-relaxed max-w-xl mb-10 fade-up-item"
          style={{ color: palette.textSecondary }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10 fade-up-item">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 text-xs font-medium uppercase tracking-widest rounded"
              style={{
                backgroundColor: palette.tagBg,
                border: `1px solid ${palette.tagBorder}`,
                color: palette.tagText,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-8 fade-up-item">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-sm font-semibold uppercase tracking-widest transition-opacity hover:opacity-70"
            style={{ color: palette.textPrimary }}
          >
            <span className="relative">
              View Live
              <span
                className="absolute bottom-0 left-0 w-full h-px translate-y-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{ backgroundColor: palette.accentText }}
              />
            </span>
            <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-sm font-semibold uppercase tracking-widest transition-opacity hover:opacity-70"
            style={{ color: palette.textSecondary }}
          >
            <span className="relative">
              GitHub
              <span
                className="absolute bottom-0 left-0 w-full h-px translate-y-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{ backgroundColor: palette.textPrimary }}
              />
            </span>
            <Github className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Right Side: Abstract number visual */}
      <div className="flex-1 w-full flex justify-center lg:justify-end order-1 lg:order-2 fade-up-item">
        <div
          className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px] rounded-3xl overflow-hidden group flex items-center justify-center"
          style={{
            backgroundColor: palette.tagBg,
            border: `1px solid ${palette.border}`,
          }}
        >
          {/* Glow */}
          <div
            className="absolute inset-0 opacity-20 blur-3xl rounded-full group-hover:scale-110 transition-transform duration-700 ease-out"
            style={{ backgroundColor: palette.accentText }}
          />
          {/* Number */}
          <div
            className="font-serif italic text-[10rem] sm:text-[14rem] lg:text-[18rem] select-none opacity-[0.07] transition-all duration-700 ease-out group-hover:opacity-[0.14] group-hover:-translate-y-4"
            style={{ color: palette.textPrimary }}
          >
            0{index + 1}
          </div>
          {/* Inner ring */}
          <div
            className="absolute inset-4 rounded-[2rem] opacity-30"
            style={{ border: `1px solid ${palette.border}` }}
          />
        </div>
      </div>
    </div>
  );
}
