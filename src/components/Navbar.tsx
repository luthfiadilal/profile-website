"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
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
  // visible: whether the navbar strip is translated into view
  const [visible, setVisible] = useState(true);

  const navRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLLIElement[]>([]);
  const lastScrollY = useRef(0);

  // ── Entry animation ───────────────────────────────────────────
  useGSAP(
    () => {
      gsap.from(".nav-item", {
        y: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      });
    },
    { scope: navRef },
  );

  // ── Drawer open/close animation ───────────────────────────────
  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;
    if (menuOpen) {
      gsap.fromTo(
        drawer,
        { x: "100%" },
        { x: "0%", duration: 0.45, ease: "power3.out" },
      );
      gsap.fromTo(
        itemsRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.07,
          ease: "power3.out",
          delay: 0.15,
        },
      );
    } else {
      gsap.to(drawer, { x: "100%", duration: 0.35, ease: "power3.in" });
    }
  }, [menuOpen]);

  // ── Body scroll lock ──────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // ── Scroll: bg tint + auto-hide logic ────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);

      // Show navbar only when scrolled back to the very top
      if (y <= 10) {
        setVisible(true);
      } else {
        setVisible(false); // scrolling anywhere below top → hide
      }

      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Mouse proximity: show when cursor is within 72px of top ──
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (window.scrollY <= 10) return; // already handled by scroll
      if (e.clientY <= 72) {
        setVisible(true);
      } else {
        // Only auto-hide from mouse-reveal if we've scrolled away from top
        if (window.scrollY > 10) setVisible(false);
      }
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        ref={navRef}
        className={`
                    fixed top-0 left-0 right-0 z-50
                    transition-all duration-500
                    ${
                      scrolled
                        ? "bg-[var(--bg-primary)]/70 backdrop-blur-xl border-b border-[var(--border-color)]"
                        : "bg-transparent py-2"
                    }
                    ${visible ? "translate-y-0" : "-translate-y-full"}
                `}
      >
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between relative">
          {/* Logo */}
          <Link
            href="#hero"
            className="nav-item text-xl font-medium tracking-tight text-[var(--text-primary)]"
          >
            LUTHFI<span className="text-[var(--accent-primary)]">.</span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
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

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center gap-4 nav-item z-50 ml-auto">
            <button
              className="flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-px bg-[var(--text-primary)] transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[5px]" : ""}`}
              />
              <span
                className={`block w-6 h-px bg-[var(--text-primary)] transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
              />
              <span
                className={`block w-6 h-px bg-[var(--text-primary)] transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[5px]" : ""}`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      {/* Side Drawer */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 h-full w-72 z-40 md:hidden translate-x-full
                    bg-[var(--bg-primary)] border-l border-[var(--border-color)]
                    flex flex-col px-8 pt-28 pb-10 gap-2 shadow-2xl"
      >
        <ul className="flex flex-col gap-1 flex-1">
          {navLinks.map((link, i) => (
            <li
              key={link.href}
              ref={(el) => {
                if (el) itemsRef.current[i] = el;
              }}
              className="opacity-0"
            >
              <Link
                href={link.href}
                onClick={closeMenu}
                className="group flex items-center justify-between py-3.5 border-b border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
              >
                <span className="text-sm font-light tracking-widest uppercase">
                  {link.label}
                </span>
                <span className="text-[var(--accent-primary)] opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-200 text-xs">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
