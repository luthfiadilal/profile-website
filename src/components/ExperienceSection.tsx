"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const experiences = [
  {
    id: 1,
    company: "PT. SIT Global Systems",
    role: "IT Developer",
    period: "Juni 2025 - Present (10 bulan)",
    description: "Location: Kota Jakarta Selatan, Kec. Kby. Baru. Grand Wijaya Centre.",
  },
  {
    id: 2,
    company: "Self Employed",
    role: "Freelance Fullstack Developer",
    period: "November 2024 - Present (1 tahun 5 bulan)",
    description: "Bekerja sebagai pekerja lepas pengembang Fullstack.",
  },
  {
    id: 3,
    company: "Universitas Perjuangan Tasikmalaya",
    role: "Research Assistant",
    period: "Januari 2024 - Februari 2025 (1 tahun 2 bulan)",
    description: "Location: Kota Tasikmalaya. Collaborated with lecturers on research regarding 'Classification of Tasikmalaya batik motifs using convolutional neural networks'. Conducted observations, collected dataset, assisted in testing models, and participated in research seminar.",
  },
  {
    id: 4,
    company: "Universitas Perjuangan Tasikmalaya",
    role: "Research Assistant",
    period: "Januari 2024 - November 2024 (11 bulan)",
    description: "Location: Kota Tasikmalaya. Collaborated on research regarding 'The Implementation of CNN Algorithms in Recognition Applications (Aksara Sunda)'. Collected datasets, implemented MobileNet for CNN, built system for model implementation, and tested with students at SMP N 5 Kota Tasikmalaya.",
  },
  {
    id: 5,
    company: "Bangkit Academy led by Google, Tokopedia, Gojek, & Traveloka",
    role: "Mobile Developer Bangkit",
    period: "Agustus 2023 - Februari 2024 (7 bulan)",
    description: "Program intensif Mobile Development di Bangkit Academy.",
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Animate Section Label & Title
      tl.fromTo(
        ".experience-label",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      )
      .fromTo(
        ".experience-title",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );

      // Animate Timeline Line
      tl.fromTo(
        ".timeline-line",
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, duration: 1, ease: "power3.inOut" },
        "-=0.2"
      );

      // Animate Timeline Items
      const items = gsap.utils.toArray(".timeline-item");
      items.forEach((item: any, index: number) => {
        const dot = item.querySelector(".timeline-dot");
        const content = item.querySelector(".timeline-content");
        
        // Dot animation
        tl.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" },
          `-=${0.6 - (index * 0.1)}` // Stagger a bit relative to line
        );
        
        // Content animation
        tl.fromTo(
          content,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.2"
        );
      });
      
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 md:py-32 relative bg-[var(--bg-primary)] transition-colors duration-500 clip-path-fix"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          
          {/* Visual / Left Side */}
          <div className="lg:col-span-4 flex flex-col gap-8 h-fit lg:sticky lg:top-32">
            <div className="experience-label opacity-0 flex items-center gap-4">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent-primary)]">
                Experience
              </span>
              <div className="h-px w-12 bg-[var(--border-color)]" />
            </div>
            
            <h2 className="experience-title opacity-0 font-outfit font-light text-4xl md:text-5xl text-[var(--text-primary)] leading-[1.1] tracking-tight">
              Karier &{" "}
              <span className="font-serif italic text-[var(--accent-primary)] block mt-2">
                Pengalaman.
              </span>
            </h2>
            <p className="experience-title opacity-0 text-[var(--text-secondary)] font-light mt-4 mb-8">
              Jejak perjalanan profesional saya dalam membangun solusi digital. (Silakan sesuaikan data ini dengan profil LinkedIn Anda)
            </p>
          </div>

          {/* Timeline / Right Side */}
          <div className="lg:col-span-8 lg:pl-12">
            <div ref={timelineRef} className="relative border-l border-[var(--border-color)] ml-4 md:ml-0">
               {/* Animated Line that sits on top of the static border, or we just animate an absolute div overlaying it */}
               <div className="timeline-line absolute top-0 left-[-1px] w-[2px] h-full bg-[var(--accent-primary)] transform origin-top" />

              <div className="flex flex-col gap-12 py-4">
                {experiences.map((exp, index) => (
                  <div key={exp.id} className="timeline-item relative pl-8 md:pl-12">
                    {/* Dot */}
                    <div className="timeline-dot absolute top-1.5 left-[-5px] w-2.5 h-2.5 rounded-full bg-[var(--accent-primary)] ring-4 ring-[var(--bg-primary)] shadow-[0_0_10px_rgba(var(--accent-primary-rgb),0.5)] z-10" />
                    
                    {/* Content */}
                    <div className="timeline-content opacity-0 flex flex-col gap-2">
                      <span className="text-sm font-medium text-[var(--accent-primary)] tracking-wide">
                        {exp.period}
                      </span>
                      <h3 className="text-xl md:text-2xl font-outfit font-medium text-[var(--text-primary)]">
                        {exp.role}
                      </h3>
                      <p className="text-lg font-light text-[var(--text-secondary)] font-serif italic mb-2">
                        {exp.company}
                      </p>
                      <p className="text-[var(--text-secondary)] font-light leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
