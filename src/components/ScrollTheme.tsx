"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * ScrollTheme — forces dark mode when entering Skills/Projects,
 * then restores light when Contact comes into view.
 * The site default is always light (set in layout.tsx).
 */
export default function ScrollTheme() {
    useEffect(() => {
        const html = document.documentElement;

        const setDark = () => html.classList.add("dark");
        const setLight = () => html.classList.remove("dark");

        // Force dark when Skills section enters viewport
        const triggerDark = ScrollTrigger.create({
            trigger: "#skills",
            start: "top 60%",
            onEnter: setDark,        // scroll down into Skills → dark
            onEnterBack: setDark,    // scroll up back into Skills from Projects → dark
            onLeaveBack: setLight,   // scroll up past Skills back to About → light
        });

        // Restore light when Contact section enters viewport
        const triggerLight = ScrollTrigger.create({
            trigger: "#contact",
            start: "top 60%",
            onEnter: setLight,       // scroll down into Contact → light
            onLeaveBack: setDark,    // scroll up back into Projects → dark
        });

        return () => {
            triggerDark.kill();
            triggerLight.kill();
            setLight(); // always restore light on unmount
        };
    }, []);

    return null;
}
