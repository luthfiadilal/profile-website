"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Download } from "lucide-react";
import MagneticButton from "./MagneticButton";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);

    const stats = [
        { value: "3+", label: "Years Coding" },
        { value: "53+", label: "Repositories" },
        { value: "10+", label: "Stars on GitHub" },
    ];

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
            }
        });

        tl.fromTo(".about-label",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
        )
            .fromTo(".about-title",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                "-=0.4"
            )
            .fromTo(".about-text",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
                "-=0.4"
            )
            .fromTo(".about-stat",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
                "-=0.4"
            )
            .fromTo(".about-btn",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
                "-=0.4"
            );

        // Parallax Effects
        gsap.to(".about-emoji", {
            y: -120,
            rotation: 15,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
            }
        });

        gsap.to(".about-text-container", {
            y: -50,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            }
        });

    }, { scope: sectionRef });

    return (
        <section id="about" ref={sectionRef} className="py-32 relative bg-[var(--bg-primary)] border-t border-[var(--border-color)] transition-colors duration-500 overflow-hidden">
            <div className="max-w-5xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">

                    {/* Visual / Left Side */}
                    <div className="lg:col-span-4 flex flex-col gap-8">
                        <div className="about-label opacity-0 flex items-center gap-4">
                            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent-primary)]">About Me</span>
                            <div className="h-px w-12 bg-[var(--border-color)]" />
                        </div>

                        <div className="about-emoji opacity-0 text-7xl md:text-8xl mt-12 md:mt-24">
                            👨‍💻
                        </div>
                    </div>

                    {/* Text Side */}
                    <div className="lg:col-span-8 about-text-container">
                        <h2 className="about-title opacity-0 font-outfit font-light text-4xl md:text-5xl text-[var(--text-primary)] mb-8 leading-[1.1] tracking-tight">
                            Turning ideas into <span className="font-serif italic text-[var(--accent-primary)]">digital reality.</span>
                        </h2>

                        <div className="flex flex-col gap-6 text-[var(--text-secondary)] text-lg font-light leading-relaxed mb-12">
                            <p className="about-text opacity-0">
                                Saya seorang mahasiswa Teknik Informatika di Universitas Perjuangan Tasikmalaya
                                yang bersemangat dalam membangun aplikasi web dan mobile. Saya fokus pada
                                pengembangan full-stack dengan teknologi modern.
                            </p>
                            <p className="about-text opacity-0">
                                Berbasis di Tasikmalaya, Jawa Barat, saya aktif mengerjakan berbagai proyek
                                mulai dari aplikasi berbasis AI, sistem manajemen, hingga aplikasi mobile Flutter.
                                Saya selalu bersemangat mempelajari teknologi baru.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12 mb-12 border-y border-[var(--border-color)] py-8">
                            {stats.map((s) => (
                                <div key={s.label} className="about-stat opacity-0 flex flex-col gap-2">
                                    <p className="text-4xl md:text-5xl font-light text-[var(--text-primary)] tracking-tighter">{s.value}</p>
                                    <p className="text-[10px] text-[var(--text-secondary)] font-medium tracking-widest uppercase">{s.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Download CV */}
                        <div className="about-btn opacity-0">
                            <MagneticButton
                                href="/cv.pdf"
                                download
                                className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[var(--accent-primary)] text-[var(--accent-primary)] text-sm font-medium"
                                blobColor="var(--accent-primary)"
                                hoverTextColor="var(--bg-primary)"
                            >
                                <Download className="w-4 h-4" />
                                Download Resume
                            </MagneticButton>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
