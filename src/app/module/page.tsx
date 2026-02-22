"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { MODULES } from "@/lib/data";
import GovLoginSim from "@/components/simulations/GovLoginSim";
import HealthcareSim from "@/components/simulations/HealthcareSim";
import PensionSim from "@/components/simulations/PensionSim";
import BankingSim from "@/components/simulations/BankingSim";
import PayNowSim from "@/components/simulations/PayNowSim";
import FormFillingSim from "@/components/simulations/FormFillingSim";
import ScamSim from "@/components/simulations/ScamSim";

function ModuleContent() {
    const searchParams = useSearchParams();
    const moduleId = searchParams.get("id") || "gov-login";
    const mod = MODULES.find((m) => m.id === moduleId);

    const [mode, setMode] = useState<"select" | "guided" | "independent">("select");
    const [completed, setCompleted] = useState(false);
    const [score, setScore] = useState(0);
    const [maxScore, setMaxScore] = useState(100);
    const [errors, setErrors] = useState(0);
    const [timer, setTimer] = useState(0);
    const [timerActive, setTimerActive] = useState(false);

    useEffect(() => {
        if (!timerActive) return;
        const interval = setInterval(() => setTimer((t) => t + 1), 1000);
        return () => clearInterval(interval);
    }, [timerActive]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, "0")}`;
    };

    const handleStart = (selectedMode: "guided" | "independent") => {
        setMode(selectedMode);
        setTimerActive(true);
        setScore(0);
        setErrors(0);
        setTimer(0);
    };

    const handleComplete = useCallback((finalScore: number, finalMaxScore: number, finalErrors: number) => {
        setCompleted(true);
        setTimerActive(false);
        setScore(finalScore);
        setMaxScore(finalMaxScore);
        setErrors(finalErrors);

        // Save progress to localStorage
        const progress = JSON.parse(localStorage.getItem("cyberfort-progress") || "{}");
        const moduleProgress = progress[moduleId] || { completions: 0, bestScore: 0, totalTime: 0 };
        moduleProgress.completions += 1;
        moduleProgress.bestScore = Math.max(moduleProgress.bestScore, finalScore);
        moduleProgress.totalTime += timer;
        moduleProgress.lastCompleted = new Date().toISOString();
        moduleProgress.errors = finalErrors;
        progress[moduleId] = moduleProgress;
        localStorage.setItem("cyberfort-progress", JSON.stringify(progress));

        // Save certificate
        const certs = JSON.parse(localStorage.getItem("cyberfort-certificates") || "[]");
        certs.push({
            module: mod?.title || moduleId,
            date: new Date().toLocaleDateString("en-SG"),
            score: Math.round((finalScore / Math.max(finalMaxScore, 1)) * 100),
            time: formatTime(timer),
        });
        localStorage.setItem("cyberfort-certificates", JSON.stringify(certs));
    }, [moduleId, mod?.title, timer]);

    const handleError = useCallback(() => {
        setErrors((e) => e + 1);
    }, []);

    if (!mod) {
        return (
            <div className="min-h-screen bg-honeydew py-12 px-4 text-center">
                <h1 className="text-2xl font-bold">Module not found</h1>
                <Link href="/dashboard" className="btn-primary mt-4">Back to Dashboard</Link>
            </div>
        );
    }

    // Completion screen
    if (completed) {
        const percentage = Math.round((score / Math.max(maxScore, 1)) * 100);
        return (
            <div className="min-h-screen bg-honeydew py-12 px-4">
                <div className="max-w-2xl mx-auto">
                    <div className="certificate-border rounded-2xl p-8 sm:p-12 text-center">
                        <div className="text-5xl mb-4">🎓</div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">Module Completed!</h1>
                        <p className="text-gray-600 mb-6">
                            You&apos;re doing great! You&apos;ve successfully completed {mod.title}.
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                                <div className="text-sm text-gray-500">Score</div>
                                <div className="text-2xl font-bold text-french-blue">{percentage}%</div>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                                <div className="text-sm text-gray-500">Time</div>
                                <div className="text-2xl font-bold text-french-blue">{formatTime(timer)}</div>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                                <div className="text-sm text-gray-500">Errors</div>
                                <div className="text-2xl font-bold text-french-blue">{errors}</div>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                                <div className="text-sm text-gray-500">Confidence</div>
                                <div className="text-2xl font-bold text-green-600">
                                    +{Math.max(30, percentage)}%
                                </div>
                            </div>
                        </div>

                        {/* Certificate */}
                        <div className="bg-white rounded-xl p-6 border-2 border-velvet-purple/30 mb-6">
                            <div className="text-xs text-velvet-purple font-semibold mb-2 uppercase tracking-wider">
                                Certificate of Completion
                            </div>
                            <div className="text-lg font-bold text-foreground mb-1">{mod.title}</div>
                            <div className="text-sm text-gray-500">
                                Completed on {new Date().toLocaleDateString("en-SG")} • Score: {percentage}%
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4">
                            <button
                                onClick={() => { setCompleted(false); setMode("select"); }}
                                className="btn-secondary"
                            >
                                🔄 Try Again
                            </button>
                            <Link href="/dashboard" className="btn-primary">
                                📚 More Modules
                            </Link>
                            <Link href="/progress" className="btn-accent">
                                🏆 View Progress
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Mode selection screen
    if (mode === "select") {
        return (
            <div className="min-h-screen bg-honeydew py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <Link href="/dashboard" className="text-french-blue hover:underline text-sm mb-4 inline-block">
                        ← Back to Dashboard
                    </Link>

                    {/* Module info */}
                    <div className="card mb-8">
                        <div className="flex items-start gap-4">
                            <span className="text-5xl">{mod.icon}</span>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{mod.title}</h1>
                                    <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
                                        ⚠️ Practice Mode
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-4">{mod.description}</p>
                                <div className="flex flex-wrap gap-4 text-sm">
                                    <span className="bg-gray-100 px-3 py-1 rounded-full">⏱️ Time: {mod.estimatedTime}</span>
                                    <span className="bg-gray-100 px-3 py-1 rounded-full">📊 Difficulty: {mod.difficulty}</span>
                                    <span className="bg-gray-100 px-3 py-1 rounded-full">🎮 Type: Interactive</span>
                                    <span className="bg-gray-100 px-3 py-1 rounded-full">⭐ Rating: {mod.confidenceRating}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="font-bold text-lg mb-3">Skills You&apos;ll Learn:</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {mod.skills.map((skill) => (
                                    <div key={skill} className="flex items-center gap-2 text-gray-600">
                                        <span className="text-green-500">✓</span> {skill}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mode selection */}
                    <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                        Choose Your Mode:
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <button
                            onClick={() => handleStart("guided")}
                            className="card text-left hover:border-cool-sky border-2 border-transparent transition-all hover:scale-[1.02]"
                        >
                            <div className="text-3xl mb-3">🧑‍🏫</div>
                            <h3 className="text-xl font-bold text-foreground mb-2">Guided Mode</h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Step-by-step guidance with highlights, hints, and voice narration. Perfect for first-timers.
                            </p>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>✅ Highlighted buttons</li>
                                <li>✅ Tooltips & hints</li>
                                <li>✅ Animated hand pointer</li>
                                <li>✅ Voice narration toggle</li>
                                <li>✅ Encouraging feedback</li>
                            </ul>
                        </button>

                        <button
                            onClick={() => handleStart("independent")}
                            className="card text-left hover:border-velvet-purple border-2 border-transparent transition-all hover:scale-[1.02]"
                        >
                            <div className="text-3xl mb-3">🎯</div>
                            <h3 className="text-xl font-bold text-foreground mb-2">Independent Mode</h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Realistic simulation without guides. Test your skills in a safe environment.
                            </p>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>✅ Realistic interface</li>
                                <li>✅ No highlighting</li>
                                <li>✅ Safe error feedback</li>
                                <li>✅ Optional timer</li>
                                <li>✅ Performance scoring</li>
                            </ul>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Simulation view
    const SimComponent = {
        "gov-login": GovLoginSim,
        "healthcare": HealthcareSim,
        "pension": PensionSim,
        "banking": BankingSim,
        "paynow": PayNowSim,
        "form-filling": FormFillingSim,
        "scam": ScamSim,
    }[moduleId];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top bar */}
            <div className="bg-white border-b shadow-sm px-4 py-3">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard" className="text-french-blue hover:underline text-sm">
                            ← Exit
                        </Link>
                        <span className="text-foreground font-semibold">{mod.title}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold
              ${mode === "guided" ? "bg-cool-sky/10 text-cool-sky" : "bg-velvet-purple/10 text-velvet-purple"}`}>
                            {mode === "guided" ? "🧑‍🏫 Guided" : "🎯 Independent"}
                        </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-500">⏱️ {formatTime(timer)}</span>
                        <span className="text-gray-500">❌ {errors} errors</span>
                    </div>
                </div>
            </div>

            {SimComponent ? (
                <SimComponent
                    mode={mode}
                    onComplete={handleComplete}
                    onError={handleError}
                />
            ) : (
                <div className="text-center py-20">
                    <div className="text-5xl mb-4">🚧</div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">{mod.title}</h2>
                    <p className="text-gray-600">Simulation for this module is coming soon!</p>
                </div>
            )}
        </div>
    );
}

export default function ModulePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-honeydew flex items-center justify-center">
                <div className="text-center">
                    <div className="text-4xl mb-4 gentle-pulse">🛡️</div>
                    <p className="text-lg text-gray-600">Loading module...</p>
                </div>
            </div>
        }>
            <ModuleContent />
        </Suspense>
    );
}
