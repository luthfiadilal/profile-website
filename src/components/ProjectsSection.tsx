"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Github } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const projects = [
    {
        title: "Prediksi Melanoma",
        description:
            "Aplikasi web berbasis AI untuk mendeteksi dan memprediksi penyakit melanoma pada kulit menggunakan deep learning dan Computer Vision.",
        tags: ["React", "Python", "AI/ML", "Vercel"],
        link: "https://prediksi-melanoma.vercel.app",
        github: "https://github.com/luthfiadilal/Prediksi-Melanoma",
    },
    {
        title: "Aksara Sunda App",
        description:
            "Aplikasi mobile Flutter untuk belajar dan mengenali aksara Sunda (huruf tradisional Sunda) menggunakan machine learning. Repo dengan ★10 bintang.",
        tags: ["Flutter", "Dart", "ML Kit", "Android"],
        link: "#",
        github: "https://github.com/luthfiadilal/aksara-sunda-app",
    },
    {
        title: "CBT Exam System",
        description:
            "Sistem ujian berbasis komputer (Computer-Based Test) full-stack dengan fitur soal, timer, hasil, dan manajemen peserta ujian.",
        tags: ["React", "Node.js", "Express", "Supabase"],
        link: "https://cbt-ruddy.vercel.app",
        github: "https://github.com/luthfiadilal/front-end-CBT",
    },
    {
        title: "GIS Disaster App",
        description:
            "Aplikasi mobile Flutter untuk pelaporan dan pemetaan bencana alam berbasis GIS, termasuk visualisasi lokasi bencana secara real-time.",
        tags: ["Flutter", "Dart", "GIS", "Maps API"],
        link: "#",
        github: "https://github.com/luthfiadilal/app-disaster",
    },
    {
        title: "Payout App",
        description:
            "Aplikasi manajemen keuangan dan penggajian (payout) yang dibangun dengan TypeScript dan Next.js, dengan UI modern dan responsif.",
        tags: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
        link: "https://payout-ruddy.vercel.app",
        github: "https://github.com/luthfiadilal/Payout",
    },
    {
        title: "Kasir & POS Web",
        description:
            "Sistem kasir dan point-of-sale (POS) berbasis web dengan fitur manajemen produk, transaksi, laporan penjualan, dan dashboard admin.",
        tags: ["JavaScript", "Node.js", "Express", "MySQL"],
        link: "https://pos-web-omega.vercel.app",
        github: "https://github.com/luthfiadilal/pos-web",
    },
];

export default function ProjectsSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
            }
        });

        tl.fromTo(".projects-header",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        )
            .fromTo(".project-card",
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
                "-=0.4"
            );

        // Parallax Effects
        gsap.to(".projects-header", {
            y: -50,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            }
        });

        gsap.to(".projects-grid-wrapper", {
            y: -30,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
            }
        });

    }, { scope: sectionRef });

    return (
        <section id="projects" ref={sectionRef} className="py-32 bg-[var(--bg-primary)] border-t border-[var(--border-color)] transition-colors duration-500 overflow-hidden">
            <div className="max-w-5xl mx-auto px-6">

                <div className="projects-header opacity-0 mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent-primary)]">Work</span>
                            <div className="h-px w-12 bg-[var(--border-color)]" />
                        </div>
                        <h2 className="font-outfit font-light text-4xl md:text-6xl text-[var(--text-primary)] tracking-tight">
                            Selected <span className="font-serif italic text-[var(--accent-primary)]">Projects.</span>
                        </h2>
                    </div>
                </div>

                <div className="projects-grid-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                    {projects.map((project) => (
                        <div
                            key={project.title}
                            className="project-card opacity-0 flex flex-col justify-between p-8 border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-[var(--text-primary)] transition-all duration-300 rounded-xl"
                        >
                            <div>
                                <h3 className="font-outfit font-medium text-2xl text-[var(--text-primary)] mb-4">{project.title}</h3>
                                <p className="text-[var(--text-secondary)] text-sm font-light leading-relaxed mb-8">{project.description}</p>
                            </div>

                            <div className="mt-auto">
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2.5 py-1 text-[10px] uppercase tracking-wider rounded-sm bg-[var(--bg-primary)] text-[var(--text-secondary)]"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-5 pt-4 border-t border-[var(--border-color)]">
                                    <a
                                        href={project.link}
                                        className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider"
                                    >
                                        Live
                                        <ArrowUpRight className="w-3.5 h-3.5" />
                                    </a>
                                    <a
                                        href={project.github}
                                        className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider"
                                    >
                                        GitHub
                                        <Github className="w-3.5 h-3.5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
