import React from "react";
// Add simple icons component here for now or use lucide-react ones if possible
// We will use standard SVG tech logos

const techLogos = [
  {
    name: "NodeJs",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Express",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  {
    name: "React",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Kotlin",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
  },
  {
    name: "Flutter",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  },
  {
    name: "Dart",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
  },
  {
    name: "Python",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "GitHub",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
];

export default function TechMarquee() {
  return (
    <section className="py-20 relative bg-[var(--bg-primary)] transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-6 relative overflow-hidden">
        {/* PERBAIKAN: Ubah left-6 menjadi left-0 agar fade menempel di ujung layar */}
        <div className="absolute left-0 top-0 w-12 md:w-48 h-full bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none"></div>

        {/* PERBAIKAN: Ubah right-6 menjadi right-0 agar fade menempel di ujung layar */}
        <div className="absolute right-0 top-0 w-12 md:w-48 h-full bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none"></div>

        {/* Scrolling Inner Container */}
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {/* Duplicate array mapping twice to ensure seamless looping */}
          {[...techLogos, ...techLogos].map((tech, index) => (
            <div
              key={index}
              className="mx-6 md:mx-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
            >
              <img
                src={tech.src}
                alt={tech.name}
                className={`h-12 w-auto object-contain ${
                  tech.name === "Next.js" || tech.name === "GitHub"
                    ? "dark:invert"
                    : ""
                }`}
              />
              <span className="ml-4 font-outfit font-medium text-xl text-[var(--text-secondary)] hidden md:block">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
