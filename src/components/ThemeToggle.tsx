"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    // Ensure we only render the toggle after the client has mounted
    // to prevent hydration mismatch
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-10 h-10" />; // Empty placeholder to prevent layout shift
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:bg-[var(--accent-primary)]/10 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all duration-300 group"
            aria-label="Toggle Theme"
        >
            {theme === "dark" ? (
                <Sun className="w-5 h-5 text-neutral-400 group-hover:text-[var(--accent-primary)] transition-colors" />
            ) : (
                <Moon className="w-5 h-5 text-neutral-600 group-hover:text-[var(--accent-primary)] transition-colors" />
            )}
        </button>
    );
}
