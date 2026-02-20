import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-french-blue text-white mt-20" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🛡️</span>
              <span className="text-2xl font-bold">SafeDigital</span>
            </div>
            <p className="text-blue-200 text-base">
              A risk-free digital training simulator helping seniors build confidence
              with technology — one safe step at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/dashboard", label: "Practice Modules" },
                { href: "/progress", label: "My Progress" },
                { href: "/volunteer", label: "Volunteer" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-blue-200 hover:text-white transition-colors text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust & Safety */}
          <div>
            <h3 className="text-lg font-bold mb-4">Trust & Safety</h3>
            <ul className="space-y-2 text-blue-200 text-base">
              <li>✅ 100% Practice Mode</li>
              <li>✅ No Real Accounts Used</li>
              <li>✅ Privacy-First Design</li>
              <li>✅ Data Encrypted</li>
              <li>✅ No External Data Sharing</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Get in Touch</h3>
            <ul className="space-y-2 text-blue-200 text-base">
              <li>📧 hello@safedigital.org</li>
              <li>📞 +65 6123 4567</li>
              <li>📍 Singapore</li>
            </ul>
            <div className="flex gap-4 mt-4">
              <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors" aria-label="Facebook">f</span>
              <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors" aria-label="Twitter">𝕏</span>
              <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors" aria-label="LinkedIn">in</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-blue-200 text-sm">
          <p>© 2026 SafeDigital. Built with ❤️ for our seniors. All rights reserved.</p>
          <p className="mt-2">
            This is a practice platform. No real accounts, transactions, or personal data are involved.
          </p>
        </div>
      </div>
    </footer>
  );
}
