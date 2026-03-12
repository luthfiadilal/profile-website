"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Only initialize if the device has a fine pointer (mouse)
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const cursor = cursorRef.current;
        if (!cursor) return;

        // Use translate3d for hardware acceleration
        gsap.set(cursor, { force3D: true });

        const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power2.out" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power2.out" });

        const onMouseMove = (e: MouseEvent) => {
            xTo(e.clientX - 8);
            yTo(e.clientY - 8);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target) return;
            
            const isClickable = target.closest('a, button, [role="button"]');
            
            gsap.to(cursor, { 
                scale: isClickable ? 2.5 : 1, 
                duration: 0.2, 
                ease: "power2.out",
                overwrite: "auto"
            });
        };

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        window.addEventListener("mouseover", handleMouseOver, { passive: true });

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="hidden md:block fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference origin-center"
        />
    );
}
