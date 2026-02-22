import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AccessibilityToolbar from "@/components/AccessibilityToolbar";
import AIChatbot from "@/components/AIChatbot";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "CyberFort — Safe Digital Training for Seniors",
    description:
        "A risk-free digital training simulator helping seniors practise government portals, online banking, and essential services safely. Build confidence with step-by-step guidance.",
    keywords: ["seniors", "digital training", "SingPass", "practice", "simulator", "cybersecurity"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} antialiased`}>
                <a href="#main-content" className="skip-link">
                    Skip to main content
                </a>
                <Navbar />
                <main id="main-content">{children}</main>
                <Footer />
                <AccessibilityToolbar />
                <AIChatbot />
            </body>
        </html>
    );
}
