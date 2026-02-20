"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { modules } from "@/lib/data";
import GovLoginSim from "@/components/simulations/GovLoginSim";
import HealthcareSim from "@/components/simulations/HealthcareSim";
import PensionSim from "@/components/simulations/PensionSim";
import BankingSim from "@/components/simulations/BankingSim";
import PayNowSim from "@/components/simulations/PayNowSim";
import FormFillingSim from "@/components/simulations/FormFillingSim";
import ScamSim from "@/components/simulations/ScamSim";

// Map module IDs to their simulation components
const simulationComponents: Record<string, React.ComponentType<{ isGuided: boolean; onComplete: (score: number, errors: number) => void; onSpeak: (text: string) => void }>> = {
  "gov-login": GovLoginSim,
  "healthcare": HealthcareSim,
  "pension": PensionSim,
  "banking": BankingSim,
  "digital-payment": PayNowSim,
  "form-filling": FormFillingSim,
  "scam-awareness": ScamSim,
  "sms-scam": ScamSim,
};

function ModuleContent() {
  const searchParams = useSearchParams();
  const moduleId = searchParams.get("id") || "gov-login";
  const mod = modules.find((m) => m.id === moduleId) || modules[0];

  const [mode, setMode] = useState<"select" | "guided" | "independent">("select");
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [narrationOn, setNarrationOn] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive) {
      interval = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  const speak = (text: string) => {
    if (narrationOn && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    }
  };

  const startModule = (selectedMode: "guided" | "independent") => {
    setMode(selectedMode);
    setCompleted(false);
    setScore(0);
    setErrors(0);
    setTimer(0);
    setTimerActive(true);
  };

  const handleSimComplete = (simScore: number, simErrors: number) => {
    setScore(simScore);
    setErrors(simErrors);
    setCompleted(true);
    setTimerActive(false);
    speak("Congratulations! You have completed this module.");
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const SimComponent = simulationComponents[moduleId];

  if (completed) {
    const maxScore = score + errors * 5;
    return (
      <div className="py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="card">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-3xl font-bold text-french-blue mb-3">
              Module Completed!
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              You&apos;re doing great! You&apos;ve successfully completed{" "}
              <strong>{mod.title}</strong>.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-honeydew rounded-xl p-4">
                <p className="text-sm text-gray-500">Score</p>
                <p className="text-2xl font-bold text-french-blue">{score}</p>
              </div>
              <div className="bg-honeydew rounded-xl p-4">
                <p className="text-sm text-gray-500">Time</p>
                <p className="text-2xl font-bold text-french-blue">{formatTime(timer)}</p>
              </div>
              <div className="bg-honeydew rounded-xl p-4">
                <p className="text-sm text-gray-500">Errors</p>
                <p className="text-2xl font-bold text-french-blue">{errors}</p>
              </div>
              <div className="bg-honeydew rounded-xl p-4">
                <p className="text-sm text-gray-500">Confidence</p>
                <p className="text-2xl font-bold text-green-600">+{Math.max(30, Math.round((score / Math.max(maxScore, 1)) * 100))}%</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/progress" className="btn-accent">
                🎓 View Certificate
              </Link>
              <button onClick={() => startModule(mode as "guided" | "independent")} className="btn-secondary">
                🔁 Practice Again
              </button>
              <Link href="/dashboard" className="btn-secondary">
                📋 Back to Modules
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (mode === "select") {
    return (
      <div className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back button */}
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-french-blue hover:text-cool-sky mb-6 text-lg font-medium">
            ← Back to Modules
          </Link>

          <div className="card mb-6">
            <div className="flex items-start gap-4 mb-6">
              <span className="text-5xl">{mod.icon}</span>
              <div>
                <div className="text-xs font-semibold text-cool-sky bg-cool-sky/10 px-3 py-1 rounded-full inline-block mb-2">
                  Practice Mode — Not a Real Website
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-french-blue">{mod.title}</h1>
                <p className="text-gray-600 mt-2">{mod.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-honeydew rounded-xl p-3 text-center">
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-bold text-french-blue">{mod.estimatedTime}</p>
              </div>
              <div className="bg-honeydew rounded-xl p-3 text-center">
                <p className="text-sm text-gray-500">Difficulty</p>
                <p className="font-bold text-french-blue">{mod.difficulty}</p>
              </div>
              <div className="bg-honeydew rounded-xl p-3 text-center">
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-bold text-french-blue">Interactive</p>
              </div>
              <div className="bg-honeydew rounded-xl p-3 text-center">
                <p className="text-sm text-gray-500">Rating</p>
                <p className="font-bold text-french-blue">⭐ {mod.confidenceRating}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-french-blue mb-2">Skills You&apos;ll Learn:</h3>
              <div className="flex flex-wrap gap-2">
                {mod.skills.map((s) => (
                  <span key={s} className="bg-honeydew text-french-blue px-4 py-2 rounded-full text-sm font-medium">
                    ✓ {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <h2 className="text-xl font-bold text-french-blue mb-4">Choose Your Mode:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <button onClick={() => startModule("guided")} className="card text-left hover:border-cool-sky group">
              <div className="text-4xl mb-3">👋</div>
              <h3 className="text-xl font-bold text-french-blue group-hover:text-cool-sky mb-2">
                Guided Mode
              </h3>
              <p className="text-gray-600 mb-4">
                Step-by-step guidance with highlights, hints, and voice narration.
                Perfect for first-timers.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>✅ Highlighted buttons</li>
                <li>✅ Tooltips & hints</li>
                <li>✅ Animated hand pointer</li>
                <li>✅ Voice narration toggle</li>
                <li>✅ Encouraging feedback</li>
              </ul>
            </button>

            <button onClick={() => startModule("independent")} className="card text-left hover:border-cool-sky group">
              <div className="text-4xl mb-3">💪</div>
              <h3 className="text-xl font-bold text-french-blue group-hover:text-cool-sky mb-2">
                Independent Mode
              </h3>
              <p className="text-gray-600 mb-4">
                Realistic simulation without guides. Test your skills in a
                safe environment.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
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

  // Simulation view — renders the appropriate simulation component
  const isGuided = mode === "guided";

  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link href="/dashboard" className="btn-secondary text-sm py-2 px-4">
            ← Back
          </Link>
          <div className="flex items-center gap-3">
            <span className="bg-cool-sky/10 text-cool-sky px-4 py-2 rounded-full text-sm font-semibold">
              🛡️ Practice Mode
            </span>
            {showTimer && (
              <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-mono">
                ⏱️ {formatTime(timer)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {mode === "independent" && (
              <button
                onClick={() => setShowTimer(!showTimer)}
                className="text-sm text-gray-500 hover:text-french-blue"
              >
                {showTimer ? "Hide Timer" : "Show Timer"}
              </button>
            )}
            <button
              onClick={() => {
                setNarrationOn(!narrationOn);
                if (!narrationOn) speak("Voice narration enabled.");
              }}
              className={`text-sm px-3 py-1 rounded-full ${narrationOn ? "bg-cool-sky text-white" : "bg-gray-100 text-gray-600"}`}
            >
              🔊 {narrationOn ? "On" : "Off"}
            </button>
          </div>
        </div>

        {/* Module title bar */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">{mod.icon}</span>
          <h1 className="text-xl font-bold text-french-blue">{mod.title}</h1>
          <span className="text-sm bg-honeydew text-french-blue px-3 py-1 rounded-full">
            {isGuided ? "Guided Mode" : "Independent Mode"}
          </span>
        </div>

        {/* Render the simulation component */}
        {SimComponent ? (
          <SimComponent
            isGuided={isGuided}
            onComplete={handleSimComplete}
            onSpeak={speak}
          />
        ) : (
          <div className="card text-center py-12">
            <p className="text-gray-500 text-lg">Simulation for this module is coming soon!</p>
            <Link href="/dashboard" className="btn-primary mt-4 inline-block">← Back to Modules</Link>
          </div>
        )}

        {/* Bottom controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Score: {score}</span>
            <span>Errors: {errors}</span>
          </div>
          <button
            onClick={() => setMode("select")}
            className="btn-secondary text-sm py-2 px-4"
          >
            🔄 Change Mode
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ModulePage() {
  return (
    <Suspense fallback={
      <div className="py-20 text-center">
        <div className="text-4xl mb-4 gentle-pulse">⏳</div>
        <p className="text-lg text-gray-600">Loading module...</p>
      </div>
    }>
      <ModuleContent />
    </Suspense>
  );
}
