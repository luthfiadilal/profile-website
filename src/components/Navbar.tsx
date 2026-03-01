"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ThemeToggle } from "./ThemeToggle";
import MagneticButton from "./MagneticButton";

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".nav-item", {
      y: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.2
    });
  }, { scope: navRef });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-[var(--bg-primary)]/70 backdrop-blur-xl border-b border-[var(--border-color)]"
        : "bg-transparent py-2"
        }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="#hero" className="nav-item text-xl font-medium tracking-tight text-[var(--text-primary)]">
          LUTHFI<span className="text-[var(--accent-primary)]">.</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href} className="nav-item">
              <Link
                href={link.href}
                className="text-sm font-light text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--text-primary)] group-hover:w-full transition-all duration-300 ease-out" />
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button & Theme Toggle */}
        <div className="hidden md:flex items-center gap-6 nav-item">
          <ThemeToggle />
          <MagneticButton
            href="#contact"
            className="px-6 py-2.5 text-sm font-medium rounded-full border border-[var(--accent-primary)] text-[var(--accent-primary)]"
            blobColor="var(--accent-primary)"
            hoverTextColor="var(--bg-primary)"
          >
            Hire Me
          </MagneticButton>
        </div>

        {/* Mobile Menu Button - Align right on mobile */}
        <div className="md:hidden flex items-center gap-4 nav-item z-50">
          <ThemeToggle />
          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-px bg-[var(--text-primary)] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`w-6 h-px bg-[var(--text-primary)] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`w-6 h-px bg-[var(--text-primary)] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-[var(--bg-primary)]/95 backdrop-blur-3xl z-40 transition-all duration-500 flex items-center justify-center md:hidden ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <ul className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-2xl font-light text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors tracking-wide"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="#contact"
              className="mt-4 inline-block px-8 py-3 text-lg font-medium rounded-full border border-[var(--accent-primary)] text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-[var(--bg-primary)] transition-all duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Hire Me
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
