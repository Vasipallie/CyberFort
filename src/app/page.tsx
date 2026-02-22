"use client";

import Link from "next/link";
import { HOW_IT_WORKS, SAFETY_FEATURES } from "@/lib/data";
import { useState } from "react";

export default function HomePage() {
    const [confidenceBefore, setConfidenceBefore] = useState(3);
    const [submitted, setSubmitted] = useState(false);

    return (
        <div>
            {/* Hero Section */}
            <section className="animated-gradient py-16 sm:py-24 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="inline-block bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 mb-6 text-sm font-medium text-french-blue">
                        🛡️ 100% Safe Practice Environment — Not Real Websites
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
                        Learn Digital Skills Safely.{" "}
                        <span className="text-french-blue">No Risk. No Pressure.</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
                        CyberFort is a guided simulator that helps seniors practise essential
                        online services in a completely safe, non-real environment.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/dashboard" className="btn-primary text-xl px-10 py-5 gentle-pulse">
                            🚀 Start Practice
                        </Link>
                        <a href="#how-it-works" className="btn-secondary text-xl px-10 py-5">
                            📖 How It Works
                        </a>
                        <Link href="/contact" className="btn-accent text-xl px-10 py-5">
                            🤝 For Caregivers
                        </Link>
                        <Link href="/contact" className="btn-secondary text-xl px-10 py-5">
                            📞 Contact Us
                        </Link>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-16 px-4 bg-white">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-4">
                        How It Works
                    </h2>
                    <p className="text-center text-gray-500 mb-12 text-lg">
                        Three simple steps to build your digital confidence
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {HOW_IT_WORKS.map((item) => (
                            <div
                                key={item.step}
                                className="card text-center hover:scale-[1.02] transition-transform"
                            >
                                <div className="text-5xl mb-4">{item.icon}</div>
                                <div className="inline-block bg-cool-sky/10 text-cool-sky font-bold px-4 py-1 rounded-full text-sm mb-3">
                                    Step {item.step}
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-cool-sky font-semibold mt-8 text-lg">
                        YOUR LEARNING JOURNEY
                    </p>
                </div>
            </section>

            {/* Stats and testimonials removed to keep content factual and uncluttered */}

            {/* Safety */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-4">
                        🔐 Your Safety Is Our Priority
                    </h2>
                    <p className="text-center text-gray-500 mb-12 text-lg">
                        We designed CyberFort with trust at its core
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {SAFETY_FEATURES.map((item) => (
                            <div key={item.title} className="card flex gap-4 items-start">
                                <div className="text-3xl flex-shrink-0">{item.icon}</div>
                                <div>
                                    <h3 className="font-bold text-lg text-foreground mb-1">{item.title}</h3>
                                    <p className="text-gray-600">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Before/After Confidence Rating */}
            <section className="py-16 px-4 hero-gradient">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        📊 Rate Your Confidence
                    </h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        Before you start, tell us how confident you feel using technology (1 = not at all, 5 = very confident)
                    </p>
                    {!submitted ? (
                        <div className="card">
                            <label className="block text-lg font-semibold mb-4">
                                How confident do you feel right now? {confidenceBefore}/5
                            </label>
                            <div className="flex justify-center gap-3 mb-6">
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <button
                                        key={n}
                                        onClick={() => setConfidenceBefore(n)}
                                        className={`w-14 h-14 rounded-xl text-xl font-bold transition-all
                      ${confidenceBefore === n
                                                ? "bg-french-blue text-white scale-110 shadow-lg"
                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                            }`}
                                    >
                                        {n}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => {
                                    localStorage.setItem("cyberfort-confidence-before", String(confidenceBefore));
                                    setSubmitted(true);
                                }}
                                className="btn-primary"
                            >
                                Save & Start Learning →
                            </button>
                        </div>
                    ) : (
                        <div className="card">
                            <div className="text-4xl mb-3">✅</div>
                            <p className="text-lg font-semibold text-foreground mb-2">Thank you!</p>
                            <p className="text-gray-600">
                                Your starting confidence: <strong>{confidenceBefore}/5</strong>. After completing modules,
                                {" "}we&apos;ll ask again to measure your growth!
                            </p>
                            <Link href="/dashboard" className="btn-primary mt-4">
                                Start Practising →
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-4 bg-french-blue text-white text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Start?</h2>
                    <p className="text-cool-sky text-lg mb-8">
                        It&apos;s free, safe, and you can learn at your own pace. Remember — this is just practice! 😊
                    </p>
                    <Link href="/dashboard" className="btn-primary text-xl px-12 py-5 bg-white text-french-blue hover:bg-gray-100">
                        🚀 Begin Practice Now
                    </Link>
                </div>
            </section>
        </div>
    );
}
