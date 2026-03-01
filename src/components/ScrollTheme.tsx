"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * ScrollTheme — automatically switches to dark mode when entering Skills
 * section (stays dark through Projects), then restores light when Contact
 * comes into view. Scroll-up direction is also handled.
 */
export default function ScrollTheme() {
    useEffect(() => {
        const html = document.documentElement;

        const setDark = () => html.setAttribute("data-scroll-theme", "dark");
        const setLight = () => html.removeAttribute("data-scroll-theme");

        // Dark mode zone: starts when #skills enters, ends when #contact enters
        // onLeaveBack = scrolled UP past the Skills top → back to About → light
        const triggerDark = ScrollTrigger.create({
            trigger: "#skills",
            start: "top 60%",
            onEnter: setDark,        // scrolling down into Skills → dark
            onEnterBack: setDark,    // scrolling up, re-entering Skills from Projects → dark
            onLeaveBack: setLight,   // scrolling up, leaving Skills back to About → light ✅
        });

        // Light mode restore: when Contact enters
        // onLeaveBack = scrolled back UP from Contact into Projects → dark
        const triggerLight = ScrollTrigger.create({
            trigger: "#contact",
            start: "top 60%",
            onEnter: setLight,       // scrolling down into Contact → light
            onLeaveBack: setDark,    // scrolling up, leaving Contact back to Projects → dark
        });

        return () => {
            triggerDark.kill();
            triggerLight.kill();
            setLight();
        };
    }, []);

    return null;
}

