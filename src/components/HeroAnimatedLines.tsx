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
        gradStart: { x: "0%", y: "50%" },
        gradEnd: { x: "100%", y: "50%" }
    },
    {
        id: 2,
        path: "M150 1000 C 180 700, 150 500, 500 480",
        duration: 15,
        delay: 2,
        gradStart: { x: "0%", y: "100%" },
        gradEnd: { x: "100%", y: "0%" }
    },
    {
        id: 3,
        path: "M1500 100 C 1400 250, 1200 240, 900 260",
        duration: 14,
        delay: 1,
        gradStart: { x: "100%", y: "0%" },
        gradEnd: { x: "0%", y: "100%" }
    },
    {
        id: 4,
        path: "M950 490 C 1200 500, 1300 650, 1500 850",
        duration: 16,
        delay: 4,
        gradStart: { x: "0%", y: "0%" },
        gradEnd: { x: "100%", y: "100%" }
    },
    {
        id: 5,
        path: "M680 500 C 690 650, 680 800, 680 900",
        duration: 10,
        delay: 3,
        gradStart: { x: "50%", y: "0%" },
        gradEnd: { x: "50%", y: "100%" }
    }
];

export default function HeroAnimatedLines() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {

            lines.forEach((line) => {
                const pathEl = document.querySelector(`#path-${line.id}`) as unknown as SVGPathElement;
                const trailEl = document.querySelector(`#trail-${line.id}`) as unknown as SVGPathElement;
                const dotEl = document.querySelector(`.dot-${line.id}`) as SVGCircleElement;

                if (!pathEl || !trailEl || !dotEl) return;

                // 1. Dapatkan panjang total path untuk mengatur properti jejak (stroke-dasharray)
                const length = pathEl.getTotalLength();

                // Panjang jejaknya (misal: 15% dari total panjang garis atau ditaruh angka statis misal 150px)
                const trailLength = Math.min(length * 0.15, 150);

                // Setup awal trail: tip ada di 0 (offset = trailLength)
                gsap.set(trailEl, {
                    strokeDasharray: `${trailLength} ${length}`,
                    strokeDashoffset: trailLength,
                    opacity: 0
                });

                // Set dot awal agar tersembunyi
                gsap.set(dotEl, { opacity: 0 });

                // 2. Buat timeline per garis yang mengulang secara continuous
                const tl = gsap.timeline({
                    repeat: -1,
                    delay: line.delay
                });

                // --- FASE 1: Muncul (Fade In) di titik awal ---
                tl.to(dotEl, {
                    opacity: 1,
                    duration: 1,
                    ease: "power2.inOut"
                }, 0);
                tl.to(trailEl, {
                    opacity: 0.3, // Jangan terlalu jelas
                    duration: 1,
                    ease: "power2.inOut"
                }, 0);

                // --- FASE 2: Bergerak menyusuri path ---
                // Gerakkan Trail (offset animasi dari trailLength ke trailLength - length) 
                // Agar tip trail bergerak dari 0 ke length sejajar dengan dot
                tl.to(trailEl, {
                    strokeDashoffset: trailLength - length,
                    duration: line.duration,
                    ease: "none"
                }, 0);

                // Gerakkan Dot (pakai MotionPath)
                tl.to(dotEl, {
                    duration: line.duration,
                    ease: "none",
                    motionPath: {
                        path: `#path-${line.id}`,
                        align: `#path-${line.id}`,
                        alignOrigin: [0.5, 0.5],
                    }
                }, 0);

                // --- FASE 3: Menghilang (Fade Out) di ujung garis ---
                // Fade out dimulai 1 detik sebelum animasi gerak selesai
                tl.to([dotEl, trailEl], {
                    opacity: 0,
                    duration: 1,
                    ease: "power2.inOut"
                }, line.duration - 1);

                // Jeda kosong sebelum mengulang
                tl.to({}, { duration: 2 });
            });

        }, containerRef);
        return () => ctx.revert();
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 1440 800"
                preserveAspectRatio="xMidYMid slice"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    {/* Linear Gradients untuk faded ends pada garis dasar */}
                    {lines.map((l) => (
                        <linearGradient
                            key={`grad-${l.id}`}
                            id={`gradient-${l.id}`}
                            x1={l.gradStart.x} y1={l.gradStart.y}
                            x2={l.gradEnd.x} y2={l.gradEnd.y}
                        >
                            <stop offset="0%" stopColor="var(--border-color)" stopOpacity="0" />
                            <stop offset="20%" stopColor="var(--border-color)" stopOpacity="0.4" />
                            <stop offset="50%" stopColor="var(--border-color)" stopOpacity="0.8" />
                            <stop offset="80%" stopColor="var(--border-color)" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="var(--border-color)" stopOpacity="0" />
                        </linearGradient>
                    ))}

                    {/* Gradient untuk Jejak (Trail) agar pangkal jejaknya memudar halus (opsional, dbuat solid accent dulu + opacity memudar di timeline) */}
                    <linearGradient id="trail-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0" />
                        <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="1" />
                    </linearGradient>
                </defs>

                {lines.map((l) => (
                    <g key={`group-${l.id}`}>
                        {/* Garis Dasar Ber-gradient (Faded Ends) */}
                        <path
                            id={`path-${l.id}`}
                            d={l.path}
                            stroke={`url(#gradient-${l.id})`}
                            strokeWidth="1.5"
                            fill="none"
                        />

                        {/* Garis Jejak (Trail) Glow Biru/Hijau */}
                        {/* Menggunakan stroke-dasharray untuk memotongnya menjadi potongan kecil yang bergerak */}
                        <path
                            id={`trail-${l.id}`}
                            d={l.path}
                            stroke="var(--accent-primary)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            fill="none"
                        />

                        {/* Titik Animasi */}
                        <circle className={`dot-${l.id}`} r="3" fill="var(--bg-primary)" stroke="var(--accent-primary)" strokeWidth="1.5" style={{ filter: "drop-shadow(0 0 2px var(--accent-primary))" }} />
                    </g>
                ))}
            </svg>
        </div>
    );
}
