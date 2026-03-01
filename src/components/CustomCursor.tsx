"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        // Menggunakan GSAP quickTo untuk animasi pergerakan cursor yang sangat smooth
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out" });

        const onMouseMove = (e: MouseEvent) => {
            // Offset -8 agar kursor berada persis di tengah mouse asli (ukuran kursor 16px / 2 = 8)
            xTo(e.clientX - 8);
            yTo(e.clientY - 8);
        };

        // Tambahkan event hover untuk elemen yang bisa di-klik agar kursor membesar
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable =
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') !== null ||
                target.closest('button') !== null;

            if (isClickable) {
                gsap.to(cursor, { scale: 2.5, duration: 0.2, ease: "power2.out" });
            } else {
                gsap.to(cursor, { scale: 1, duration: 0.2, ease: "power2.out" });
            }
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseover", handleMouseOver);

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
