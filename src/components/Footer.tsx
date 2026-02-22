import Link from "next/link";

export default function Footer() {
    const quickLinks = [
        { href: "/", label: "Home" },
        { href: "/dashboard", label: "Practice Modules" },
        { href: "/progress", label: "My Progress" },
        { href: "/scam-training", label: "Scam Training" },
        { href: "/volunteer", label: "Volunteer" },
        { href: "/contact", label: "Contact Us" },
    ];

    return (
        <footer className="bg-foreground text-white py-12" role="contentinfo">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-2xl">🛡️</span>
                            <span className="text-xl font-bold">CyberFort</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            A risk-free digital training simulator helping seniors build confidence
                            with technology — one safe step at a time.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-cool-sky transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Trust & Safety */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Trust & Safety</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>✅ 100% Practice Mode</li>
                            <li>✅ No Real Accounts Used</li>
                            <li>✅ Privacy-First Design</li>
                            <li>✅ Data Encrypted</li>
                            <li>✅ No External Data Sharing</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Get in Touch</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>📧 hello@cyberfort.org</li>
                            <li>📞 +65 6123 4567</li>
                            <li>📍 Singapore</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        © 2026 CyberFort. Built with ❤️ for our seniors. All rights reserved.
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                        This is a practice platform. No real accounts, transactions, or personal data are involved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
