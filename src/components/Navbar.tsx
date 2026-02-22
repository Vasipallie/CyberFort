"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/dashboard", label: "Practice" },
        { href: "/progress", label: "My Progress" },
        { href: "/scam-training", label: "Scam Training" },
        { href: "/volunteer", label: "Volunteer" },
        { href: "/admin", label: "Admin" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <nav
            className="bg-french-blue text-white shadow-lg sticky top-0 z-40"
            role="navigation"
            aria-label="Main navigation"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    <Link
                        href="/"
                        className="flex items-center gap-3 hover:opacity-90 transition-opacity"
                        aria-label="CyberFort Home"
                    >
                        <span className="text-3xl" aria-hidden="true">🛡️</span>
                        <div>
                            <span className="text-xl sm:text-2xl font-bold tracking-tight">CyberFort</span>
                            <span className="hidden sm:block text-xs text-cool-sky font-medium -mt-1">
                                Risk-Free Digital Training
                            </span>
                        </div>
                    </Link>

                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-4 py-2 rounded-xl text-base font-medium hover:bg-white/10 
                         transition-colors min-h-[48px] flex items-center"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/"
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl 
                       font-semibold text-sm sm:text-base transition-colors min-h-[48px]
                       flex items-center gap-2"
                            aria-label="Return to homepage (panic button)"
                        >
                            🏠 <span className="hidden sm:inline">Go Home</span>
                        </Link>

                        <button
                            className="lg:hidden w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center
                       hover:bg-white/20 transition-colors"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-expanded={mobileMenuOpen}
                            aria-label="Toggle navigation menu"
                        >
                            <span className="text-2xl">{mobileMenuOpen ? "✕" : "☰"}</span>
                        </button>
                    </div>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="lg:hidden bg-french-blue border-t border-white/20 pb-4">
                    <div className="max-w-7xl mx-auto px-4 space-y-1 pt-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-4 py-3 rounded-xl text-lg font-medium 
                         hover:bg-white/10 transition-colors min-h-[48px]"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
