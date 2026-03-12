"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Mail, MapPin, Linkedin, Github } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const contactInfo = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: "Email",
    value: "luthfiadilalmahbub@gmail.com",
    href: "mailto:luthfiadilalmahbub@gmail.com",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: "Location",
    value: "Tasikmalaya, Jawa Barat",
    href: "#",
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    label: "LinkedIn",
    value: "linkedin.com/in/luthfiadilalmahbub",
    href: "https://www.linkedin.com/in/luthfiadilalmahbub/",
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovering, setIsHovering] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Header Animation
      tl.fromTo(
        ".contact-header",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      )
        // Info Items Animation
        .fromTo(
          ".contact-info-item",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
          "-=0.4",
        )
        // Name Characters Reveal (Base)
        .fromTo(
          ".base-char",
          { y: 50, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "back.out(1.7)",
          },
          "-=0.4",
        )
        // Name Characters Reveal (Spotlight) synced directly to with previous step
        .fromTo(
          ".spot-char",
          { y: 50, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "back.out(1.7)",
          },
          "<",
        );

      // Parallax Effect for the big name
      gsap.to(nameRef.current, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    },
    { scope: sectionRef },
  );

  const renderNameCharacters = (text: string, isSpotlight = false) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className={`${isSpotlight ? "spot-char" : "base-char"} inline-block min-w-[0.2em] opacity-0`}
        style={{ transformOrigin: "bottom center" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!nameRef.current) return;
    const rect = nameRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="pt-20 md:pt-32 pb-16 relative bg-[var(--bg-primary)] transition-colors duration-500 overflow-hidden flex flex-col justify-between min-h-[80vh]"
    >
      <div className="max-w-6xl mx-auto px-6 w-full flex-1 flex flex-col">
        {/* Top Section: Let's Collaborate & Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 items-start mb-24 flex-1">
          {/* Left: Heading */}
          <div className="contact-header opacity-0">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent-primary)]">
                Contact
              </span>
              <div className="h-px w-12 bg-[var(--border-color)]" />
            </div>
            <h2 className="font-outfit font-light text-5xl md:text-7xl text-[var(--text-primary)] tracking-tight mb-6 leading-[1.1]">
              Mari <br />
              <span className="font-ganky text-[var(--accent-primary)]">
                Berkolaborasi.
              </span>
            </h2>
            <p className="text-[var(--text-secondary)] max-w-sm text-lg font-light leading-relaxed">
              Punya ide proyek atau ingin bekerja sama? Jangan ragu untuk
              menghubungi melalui kanal di bawah ini.
            </p>
          </div>

          {/* Right: Info & Socials */}
          <div className="flex flex-col gap-6 md:pt-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="contact-info-item opacity-0 flex items-center gap-4 p-5 bg-transparent border border-[var(--border-color)] hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/5 rounded-2xl transition-all duration-300 group"
                >
                  <span className="text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-[10px] text-[var(--text-secondary)] opacity-70 font-medium uppercase tracking-widest mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm text-[var(--text-primary)] transition-colors tracking-wide truncate max-w-[150px]">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex gap-4 pt-4 border-t border-[var(--border-color)] contact-info-item opacity-0">
              {[
                {
                  label: "GitHub",
                  icon: <Github className="w-5 h-5" />,
                  href: "https://github.com/luthfiadilal",
                },
                {
                  label: "LinkedIn",
                  icon: <Linkedin className="w-5 h-5" />,
                  href: "https://www.linkedin.com/in/luthfiadilalmahbub/",
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-12 h-12 rounded-full border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--bg-primary)] hover:bg-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Huge Name Typography */}
      <div className="w-full overflow-hidden flex items-end justify-center px-4 pt-10 mt-auto relative pb-4">
        <div
          ref={nameRef}
          className="relative"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Base Typography (Dimmed) */}
          <h1
            className="font-outfit font-black uppercase text-[15vw] md:text-[12vw] leading-none text-center tracking-tighter text-[var(--text-primary)]/10 whitespace-nowrap"
            style={{ letterSpacing: "-0.04em" }}
          >
            {renderNameCharacters("LUTHFI ADILAL M")}
          </h1>

          {/* Spotlight Typography (Accent Color) */}
          <h1
            className={`font-outfit font-black uppercase text-[15vw] md:text-[12vw] leading-none text-center tracking-tighter text-[var(--accent-primary)] whitespace-nowrap absolute top-0 left-0 pointer-events-none transition-opacity duration-700 ease-out ${isHovering ? "opacity-100" : "opacity-0"}`}
            style={{
              letterSpacing: "-0.04em",
              WebkitMaskImage: `radial-gradient(250px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
              maskImage: `radial-gradient(250px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
            }}
            aria-hidden="true"
          >
            {renderNameCharacters("LUTHFI ADILAL M", true)}
          </h1>
        </div>
      </div>
    </section>
  );
}
