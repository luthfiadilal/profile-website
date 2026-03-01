import Link from "next/link";

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="border-t border-[var(--border-color)] bg-[var(--bg-primary)] py-12 transition-colors duration-500">
            <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-[var(--text-secondary)] font-light text-sm tracking-wide">
                    © {year} <span className="text-[var(--text-primary)] font-medium">Luthfi Adilal Mahbub</span>. All rights reserved.
                </p>
                <div className="flex items-center gap-6">
                    {[
                        { href: "https://github.com/luthfiadilal", label: "github" },
                        { href: "https://www.linkedin.com/in/luthfiadilalmahbub/", label: "linkedin" },
                        { href: "mailto:luthfiadilalmahbub@gmail.com", label: "email" },
                    ].map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-medium uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-300"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
}
