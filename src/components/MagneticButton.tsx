"use client";
import { useRef, ReactNode } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    href?: string;
    onClick?: () => void;
    download?: boolean;
    target?: string;
    rel?: string;
    type?: "button" | "submit" | "reset";
    blobColor?: string;       // Background blob color
    hoverTextColor?: string;  // Text color when blob covers button
}

export default function MagneticButton({
    children,
    className = "",
    href,
    onClick,
    download,
    target,
    rel,
    type,
    blobColor = "var(--accent-primary)",
    hoverTextColor,
}: MagneticButtonProps) {
    const btnRef = useRef<HTMLElement>(null);
    const blobRef = useRef<HTMLSpanElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    const getPos = (e: React.MouseEvent) => {
        const rect = btnRef.current!.getBoundingClientRect();
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onMouseEnter = (e: React.MouseEvent) => {
        const { x, y } = getPos(e);
        // Start blob exactly at cursor entry point, fully hidden
        gsap.set(blobRef.current, { x, y, scale: 0, opacity: 1 });
        // Expand blob to fill button
        gsap.to(blobRef.current, { scale: 16, duration: 0.55, ease: "power3.out" });
        // Optionally animate text color
        if (hoverTextColor && textRef.current) {
            gsap.to(textRef.current, { color: hoverTextColor, duration: 0.2, delay: 0.15, ease: "none" });
        }
    };

    const onMouseMove = (e: React.MouseEvent) => {
        const { x, y } = getPos(e);
        gsap.to(blobRef.current, { x, y, duration: 0.2, ease: "power2.out" });
    };

    const onMouseLeave = (e: React.MouseEvent) => {
        const { x, y } = getPos(e);
        // Shrink blob from exit point
        gsap.set(blobRef.current, { x, y });
        gsap.to(blobRef.current, { scale: 0, duration: 0.45, ease: "power3.in" });
        // Restore text color
        if (hoverTextColor && textRef.current) {
            gsap.to(textRef.current, { color: "", duration: 0.2, ease: "none" });
        }
    };

    const commonProps = {
        ref: btnRef as React.RefObject<HTMLAnchorElement & HTMLButtonElement>,
        className: `relative overflow-hidden ${className}`,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
    };

    const inner = (
        <>
            {/* Solid blob — starts at cursor, grows to fill button */}
            <span
                ref={blobRef}
                style={{
                    background: blobColor,
                    position: "absolute",
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "50%",
                    transform: "translate(-50%, -50%) scale(0)",
                    pointerEvents: "none",
                    zIndex: 0,
                    willChange: "transform",
                }}
            />
            {/* Text content always on top */}
            <span ref={textRef} className="relative z-10 flex items-center gap-2">
                {children}
            </span>
        </>
    );

    if (href) {
        return (
            <a {...commonProps} href={href} download={download} target={target} rel={rel}>
                {inner}
            </a>
        );
    }

    return (
        <button {...commonProps} type={type || "button"}>
            {inner}
        </button>
    );
}
