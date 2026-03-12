"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

import HeroAnimatedLines from "./HeroAnimatedLines";

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.fromTo(".hero-badge",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
        )
            .fromTo(".hero-title-line",
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power4.out" },
                "-=0.4"
            )
            .fromTo(".hero-desc",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
                "-=0.5"
            );

        // Parallax Scroll Effects — fromTo ensures elements start at their natural position (y:0)
        // and only move upward as the user scrolls, preventing any initial downward dip.
        gsap.fromTo(".hero-title-line",
            { y: 0 },
            {
                y: -150,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                }
            }
        );

        gsap.fromTo(".hero-desc",
            { y: 0 },
            {
                y: -80,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.5,
                }
            }
        );

        gsap.fromTo(".hero-badge",
            { y: 0 },
            {
                y: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 2,
                }
            }
        );

    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="hero" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[var(--bg-primary)] transition-colors duration-500">

            {/* Animated Background Lines */}
            <HeroAnimatedLines />

            <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 md:py-32 text-center flex flex-col items-center">
                {/* Badge */}
                <div className="hero-badge flex items-center gap-3 px-4 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] text-xs font-medium tracking-wide mb-10 translate-y-4 opacity-0">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-primary)] opacity-40"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-primary)]"></span>
                    </span>
                    Available for freelance work
                </div>

                {/* Heading */}
                <h1 className="font-outfit font-light text-4xl md:text-7xl lg:text-[6.5rem] leading-[1.05] tracking-tighter mb-8 text-[var(--text-primary)]">
                    <div className="hero-title-line" style={{ perspective: "1000px", willChange: "transform, opacity" }}>Crafting digital</div>
                    <div className="hero-title-line" style={{ perspective: "1000px", willChange: "transform, opacity" }}>
                        <span className="font-ganky text-[var(--accent-primary)]">experiences</span> that
                    </div>
                    <div className="hero-title-line" style={{ perspective: "1000px", willChange: "transform, opacity" }}>leave a mark.</div>
                </h1>

                {/* Subtitle */}
                <p className="hero-desc max-w-2xl mx-auto text-[var(--text-secondary)] text-base md:text-xl font-light leading-relaxed mb-12 will-change-[transform,opacity]">
                    I&apos;m a full-stack developer dedicated to building fast, beautiful, and highly functional web applications. Let&apos;s build something great.
                </p>

            </div>
        </section>
    );
}
