"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const skillCategories = [
    {
        title: "Frontend",
        skills: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS", "GSAP Animations"],
    },
    {
        title: "Backend & Mobile",
        skills: ["Node.js", "Express", "Flutter / Dart", "REST APIs", "Supabase", "MySQL"],
    },
    {
        title: "Tools & Platform",
        skills: ["Git & GitHub", "Vercel", "Figma", "Postman", "Python (AI/ML)", "Android Studio"],
    },
];

export default function SkillsSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            // Setup initial hidden state
            gsap.set(".skills-header", { opacity: 0, y: 40 });
            gsap.set(".skill-category", { opacity: 0, y: 40 });

            // Create a scrubbed timeline bound to scroll distance
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=150%", // Users scroll for 1.5x viewport height to complete this section
                    pin: true,     // Pin the section to screen while timeline runs
                    scrub: 1,      // Smooth scrubbing effect
                }
            });

            // 1. Header fades in and moves up
            tl.to(".skills-header", { opacity: 1, y: 0, duration: 1 })
                // 2. Categories fade in sequentially one by one
                .to(".skill-category", { opacity: 1, y: 0, duration: 1, stagger: 0.8 });

        }, sectionRef);

        return () => ctx.revert();
    }, { scope: sectionRef });

    return (
        <section id="skills" ref={sectionRef} className="py-24 min-h-screen flex flex-col justify-center bg-[var(--bg-primary)] border-t border-[var(--border-color)] transition-colors duration-500 overflow-hidden">
            <div className="max-w-5xl w-full mx-auto px-6">

                <div className="skills-header mb-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent-primary)]">Expertise</span>
                            <div className="h-px w-12 bg-[var(--border-color)]" />
                        </div>
                        <h2 className="font-outfit font-light text-4xl md:text-6xl text-[var(--text-primary)] tracking-tight">
                            Tools of <span className="font-serif italic text-[var(--accent-primary)]">the trade.</span>
                        </h2>
                    </div>
                    <p className="text-[var(--text-secondary)] text-lg font-light leading-relaxed mb-1 md:mb-0">
                        I continuously learn and adapt to the best tools available, ensuring I deliver scalable, performant, and beautiful applications.
                    </p>
                </div>

                <div className="skills-grid-wrapper grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
                    {skillCategories.map((category) => (
                        <div key={category.title} className="skill-category group">
                            <h3 className="font-outfit text-2xl text-[var(--text-primary)] mb-8 pb-4 border-b border-[var(--border-color)] group-hover:border-[var(--text-primary)] transition-colors duration-500">
                                {category.title}
                            </h3>
                            <ul className="flex flex-col gap-4">
                                {category.skills.map((skill) => (
                                    <li
                                        key={skill}
                                        className="flex items-center gap-3 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-300"
                                    >
                                        <div className="w-1 h-1 bg-[var(--accent-primary)] rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                                        <span className="font-light tracking-wide">{skill}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
