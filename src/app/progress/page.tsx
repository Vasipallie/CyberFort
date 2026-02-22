"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MODULES } from "@/lib/data";

interface ModuleProgress {
    completions: number;
    bestScore: number;
    totalTime: number;
    lastCompleted: string;
    errors: number;
}

interface Certificate {
    module: string;
    date: string;
    score: number;
    time: string;
}

export default function ProgressPage() {
    const [progress, setProgress] = useState<Record<string, ModuleProgress>>({});
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [confidenceBefore, setConfidenceBefore] = useState<number | null>(null);
    const [confidenceAfter, setConfidenceAfter] = useState(3);
    const [afterSubmitted, setAfterSubmitted] = useState(false);

    useEffect(() => {
        const p = JSON.parse(localStorage.getItem("cyberfort-progress") || "{}");
        setProgress(p);
        const c = JSON.parse(localStorage.getItem("cyberfort-certificates") || "[]");
        setCertificates(c);
        const cb = localStorage.getItem("cyberfort-confidence-before");
        if (cb) setConfidenceBefore(parseInt(cb));
        const ca = localStorage.getItem("cyberfort-confidence-after");
        if (ca) setAfterSubmitted(true);
    }, []);

    const totalCompletions = Object.values(progress).reduce((sum, p) => sum + p.completions, 0);
    const totalTime = Object.values(progress).reduce((sum, p) => sum + p.totalTime, 0);
    const totalErrors = Object.values(progress).reduce((sum, p) => sum + p.errors, 0);
    const completedModules = Object.keys(progress).length;
    const independence = completedModules > 0 ? Math.min(100, Math.round((completedModules / MODULES.length) * 100)) : 0;

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        if (h > 0) return `${h}h ${m}m`;
        return `${m}m`;
    };

    return (
        <div className="min-h-screen bg-honeydew py-12 px-4">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-4">
                    🏆 My Progress
                </h1>
                <p className="text-center text-gray-600 mb-12 text-lg">
                    Track your learning journey and celebrate your achievements
                </p>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="card text-center">
                        <div className="text-3xl mb-2">📚</div>
                        <div className="text-2xl font-bold text-french-blue">{completedModules}/{MODULES.length}</div>
                        <div className="text-sm text-gray-500">Modules Completed</div>
                    </div>
                    <div className="card text-center">
                        <div className="text-3xl mb-2">⏱️</div>
                        <div className="text-2xl font-bold text-french-blue">{formatTime(totalTime)}</div>
                        <div className="text-sm text-gray-500">Total Practice Time</div>
                    </div>
                    <div className="card text-center">
                        <div className="text-3xl mb-2">❌</div>
                        <div className="text-2xl font-bold text-french-blue">{totalErrors}</div>
                        <div className="text-sm text-gray-500">Total Errors (Learning!)</div>
                    </div>
                    <div className="card text-center">
                        <div className="text-3xl mb-2">🎯</div>
                        <div className="text-2xl font-bold text-green-600">{independence}%</div>
                        <div className="text-sm text-gray-500">Independence Level</div>
                    </div>
                </div>

                {/* Module Progress */}
                <div className="card mb-8">
                    <h2 className="text-xl font-bold text-foreground mb-6">📊 Module Progress</h2>
                    <div className="space-y-4">
                        {MODULES.map((mod) => {
                            const p = progress[mod.id];
                            const pct = p ? Math.min(100, p.completions * 25) : 0;
                            return (
                                <div key={mod.id} className="flex items-center gap-4">
                                    <span className="text-2xl w-8">{mod.icon}</span>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-medium text-sm">{mod.title}</span>
                                            <span className="text-xs text-gray-500">
                                                {p ? `${p.completions} completion${p.completions !== 1 ? "s" : ""}` : "Not started"}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div
                                                className="bg-gradient-to-r from-cool-sky to-french-blue h-3 rounded-full progress-animate transition-all"
                                                style={{ width: `${pct}%` }}
                                            />
                                        </div>
                                    </div>
                                    <Link
                                        href={`/module?id=${mod.id}`}
                                        className="text-sm text-french-blue hover:underline font-medium"
                                    >
                                        {p ? "Retry" : "Start"} →
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Certificates */}
                <div className="card mb-8">
                    <h2 className="text-xl font-bold text-foreground mb-6">🎓 My Certificates</h2>
                    {certificates.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <div className="text-4xl mb-3">📜</div>
                            <p>No certificates yet. Complete a module to earn your first one!</p>
                            <Link href="/dashboard" className="btn-primary mt-4 inline-block">Start Practising</Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {certificates.map((cert, i) => (
                                <div
                                    key={i}
                                    className="certificate-border rounded-xl p-5 text-center"
                                >
                                    <div className="text-xs text-velvet-purple font-semibold uppercase tracking-wider mb-2">
                                        Certificate of Completion
                                    </div>
                                    <div className="text-3xl mb-2">🏆</div>
                                    <div className="font-bold text-foreground mb-1">{cert.module}</div>
                                    <div className="text-sm text-gray-500 mb-2">
                                        {cert.date} • Score: {cert.score}% • Time: {cert.time}
                                    </div>
                                    <div className="text-xs text-velvet-purple/70">
                                        CyberFort Digital Training Certificate
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="text-center mt-4 text-sm text-gray-500">
                        Total certificates issued: <strong>{certificates.length}</strong>
                    </div>
                </div>

                {/* Before/After Confidence */}
                <div className="card">
                    <h2 className="text-xl font-bold text-foreground mb-6">📈 Confidence Growth</h2>
                    {confidenceBefore !== null ? (
                        <div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                                <div className="text-center p-4 bg-red-50 rounded-xl">
                                    <div className="text-sm text-gray-500 mb-1">Before Training</div>
                                    <div className="text-3xl font-bold text-red-500">{confidenceBefore}/5</div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <span className="text-3xl">→</span>
                                </div>
                                {afterSubmitted ? (
                                    <div className="text-center p-4 bg-green-50 rounded-xl">
                                        <div className="text-sm text-gray-500 mb-1">After Training</div>
                                        <div className="text-3xl font-bold text-green-500">
                                            {localStorage.getItem("cyberfort-confidence-after") || confidenceAfter}/5
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                                        <div className="text-sm text-gray-500 mb-1">After Training</div>
                                        <div className="text-lg text-gray-400">Rate below ↓</div>
                                    </div>
                                )}
                            </div>

                            {!afterSubmitted && totalCompletions > 0 && (
                                <div className="bg-cool-sky/5 rounded-xl p-6 text-center">
                                    <p className="text-sm text-gray-600 mb-4">
                                        How confident do you feel now after practising?
                                    </p>
                                    <div className="flex justify-center gap-3 mb-4">
                                        {[1, 2, 3, 4, 5].map((n) => (
                                            <button
                                                key={n}
                                                onClick={() => setConfidenceAfter(n)}
                                                className={`w-12 h-12 rounded-xl text-lg font-bold transition-all
                          ${confidenceAfter === n
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
                                            localStorage.setItem("cyberfort-confidence-after", String(confidenceAfter));
                                            setAfterSubmitted(true);
                                        }}
                                        className="btn-primary"
                                    >
                                        Submit Rating
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-6 text-gray-500">
                            <p>Visit the <Link href="/" className="text-french-blue hover:underline">homepage</Link> to set your initial confidence rating.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
