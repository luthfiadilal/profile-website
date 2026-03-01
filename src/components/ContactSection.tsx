"use client";
import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Mail, MapPin, Linkedin, Github, Twitter, Send } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const contactInfo = [
    { icon: <Mail className="w-5 h-5" />, label: "Email", value: "luthfiadilalmahbub@gmail.com", href: "mailto:luthfiadilalmahbub@gmail.com" },
    { icon: <MapPin className="w-5 h-5" />, label: "Location", value: "Tasikmalaya, Jawa Barat", href: "#" },
    { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", value: "linkedin.com/in/luthfiadilalmahbub", href: "https://www.linkedin.com/in/luthfiadilalmahbub/" },
];

export default function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
            }
        });

        tl.fromTo(".contact-header",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        )
            .fromTo(".contact-info-item",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
                "-=0.4"
            )
            .fromTo(".contact-form",
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                "-=0.6"
            );

        // Parallax Effects
        gsap.to(".contact-header", {
            y: -70,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            }
        });

        gsap.to(".contact-info-container", {
            y: -30,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
            }
        });

        gsap.to(".contact-form", {
            y: -90,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 2,
            }
        });

    }, { scope: sectionRef });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        await new Promise((r) => setTimeout(r, 1500));
        setStatus("sent");
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 3000);
    };

    return (
        <section id="contact" ref={sectionRef} className="py-32 bg-[var(--bg-primary)] border-t border-[var(--border-color)] relative transition-colors duration-500 overflow-hidden">
            <div className="max-w-5xl mx-auto px-6">

                <div className="contact-header opacity-0 mb-20">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent-primary)]">Contact</span>
                        <div className="h-px w-12 bg-[var(--border-color)]" />
                    </div>
                    <h2 className="font-outfit font-light text-4xl md:text-6xl text-[var(--text-primary)] tracking-tight mb-6">
                        Let&apos;s <span className="font-serif italic text-[var(--accent-primary)]">Collaborate.</span>
                    </h2>
                    <p className="text-[var(--text-secondary)] max-w-xl text-lg font-light leading-relaxed">
                        Have a project in mind or want to work together? Drop me a message and I&apos;ll get back to you as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Info */}
                    <div className="contact-info-container lg:col-span-5 space-y-4">
                        {contactInfo.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                target={item.href.startsWith("http") ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                className="contact-info-item opacity-0 flex items-center gap-5 p-6 bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] rounded-xl transition-all duration-300 group"
                            >
                                <span className="text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors">{item.icon}</span>
                                <div>
                                    <p className="text-xs text-[var(--text-secondary)] opacity-70 font-medium uppercase tracking-widest mb-1.5">{item.label}</p>
                                    <p className="text-sm text-[var(--text-primary)] transition-colors tracking-wide">{item.value}</p>
                                </div>
                            </a>
                        ))}

                        {/* Social icons */}
                        <div className="contact-info-item opacity-0 flex gap-4 pt-4">
                            {[
                                { label: "GitHub", icon: <Github className="w-5 h-5" />, href: "https://github.com/luthfiadilal" },
                                { label: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/luthfiadilalmahbub/" },
                            ].map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className="w-12 h-12 rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--bg-primary)] hover:bg-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all duration-300"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="contact-form opacity-0 lg:col-span-7 bg-[var(--bg-secondary)] border border-[var(--border-color)] transition-colors duration-300 rounded-xl p-8 md:p-10 space-y-6"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-xs font-medium uppercase tracking-widest text-[var(--text-secondary)] mb-2">Your Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-b border-[var(--border-color)] rounded-none px-0 py-3 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-all placeholder-[var(--text-secondary)]/50"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-xs font-medium uppercase tracking-widest text-[var(--text-secondary)] mb-2">Email Address</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-b border-[var(--border-color)] rounded-none px-0 py-3 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-all placeholder-[var(--text-secondary)]/50"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="subject" className="block text-xs font-medium uppercase tracking-widest text-[var(--text-secondary)] mb-2">Subject</label>
                            <input
                                id="subject"
                                name="subject"
                                required
                                value={form.subject}
                                onChange={handleChange}
                                className="w-full bg-transparent border-b border-[var(--border-color)] rounded-none px-0 py-3 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-all placeholder-[var(--text-secondary)]/50"
                                placeholder="Project Inquiry"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-xs font-medium uppercase tracking-widest text-[var(--text-secondary)] mb-2">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={4}
                                value={form.message}
                                onChange={handleChange}
                                className="w-full bg-transparent border-b border-[var(--border-color)] rounded-none px-0 py-3 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-all placeholder-[var(--text-secondary)]/50 resize-none"
                                placeholder="Tell me about your project..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === "sending" || status === "sent"}
                            className="w-full py-4 mt-4 rounded-full border border-transparent bg-[var(--accent-primary)] text-[var(--bg-primary)] font-medium text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 group"
                        >
                            {status === "sending" ? "Sending..." : status === "sent" ? "Message Sent" : (
                                <>
                                    Send Message
                                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
