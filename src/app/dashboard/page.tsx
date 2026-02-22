"use client";

import Link from "next/link";
import { MODULES } from "@/lib/data";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-honeydew py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        🎯 Simulation Dashboard
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Choose a module below to start practising. Each module is completely safe —
                        no real accounts, no real data, no real risk.
                    </p>
                </div>

                {/* Module Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MODULES.map((mod) => (
                        <Link
                            key={mod.id}
                            href={`/module?id=${mod.id}`}
                            className={`card ${mod.color} border-2 hover:scale-[1.02] transition-transform group`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-4xl">{mod.icon}</span>
                                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
                                    ⚠️ Practice Mode
                                </span>
                            </div>
                            <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-french-blue transition-colors">
                                {mod.title}
                            </h2>
                            <p className="text-gray-600 text-sm mb-4 leading-relaxed">{mod.description}</p>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">⏱️ {mod.estimatedTime}</span>
                                <span className={`font-semibold px-3 py-1 rounded-full text-xs
                  ${mod.difficulty === "Beginner" ? "bg-green-100 text-green-700" :
                                        mod.difficulty === "Intermediate" ? "bg-blue-100 text-blue-700" :
                                            "bg-purple-100 text-purple-700"}`}>
                                    {mod.difficulty}
                                </span>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <div className="text-xs text-red-600 font-medium text-center">
                                    ⚠️ Not the Real Website — Practice Only
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Encouragement */}
                <div className="mt-12 card text-center bg-white max-w-2xl mx-auto">
                    <div className="text-3xl mb-3">🌟</div>
                    <h3 className="font-bold text-lg text-foreground mb-2">Remember — this is just practice!</h3>
                    <p className="text-gray-600">
                        You can try any module as many times as you like. There are no penalties for mistakes.
                        Every error is a learning opportunity. You&apos;re doing great!
                    </p>
                </div>
            </div>
        </div>
    );
}
