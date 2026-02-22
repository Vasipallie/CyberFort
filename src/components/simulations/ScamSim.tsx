"use client";

import { useState } from "react";
import { SCAM_EMAILS } from "@/lib/data";

interface Props {
    mode: "guided" | "independent";
    onComplete: (score: number, maxScore: number, errors: number) => void;
    onError: () => void;
}

export default function ScamSim({ mode, onComplete, onError }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [revealed, setRevealed] = useState(false);
    const [userChoice, setUserChoice] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [errors, setErrors] = useState(0);
    const isGuided = mode === "guided";

    const email = SCAM_EMAILS[currentIndex];
    const maxScore = SCAM_EMAILS.length * 20;

    const handleChoice = (choice: string) => {
        setUserChoice(choice);
        setRevealed(true);
        const correct = (email.isScam && choice === "scam") || (!email.isScam && choice === "safe");
        if (correct) {
            setScore((s) => s + 20);
        } else {
            setErrors((e) => e + 1);
            onError();
        }
    };

    const handleNext = () => {
        if (currentIndex < SCAM_EMAILS.length - 1) {
            setCurrentIndex((i) => i + 1);
            setRevealed(false);
            setUserChoice(null);
        } else {
            onComplete(score, maxScore, errors);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-8 p-4">
            <div className="bg-[#d32f2f] text-white p-6 rounded-t-xl">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">🛡️</span>
                        <div>
                            <h2 className="text-xl font-bold">Scam Awareness Training</h2>
                            <p className="text-sm text-red-200">Email {currentIndex + 1} of {SCAM_EMAILS.length}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm">Score</div>
                        <div className="text-xl font-bold">{score}/{maxScore}</div>
                    </div>
                </div>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-b-xl p-6">
                {isGuided && !revealed && (
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-4 text-sm text-blue-800">
                        📝 <strong>Guided:</strong> Read the email carefully. Look for red flags like suspicious domains,
                        urgency tactics, and requests for personal info. Then decide if it&apos;s a scam or safe.
                    </div>
                )}

                {/* Email preview */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <div className="border-b border-gray-200 pb-3 mb-3">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm text-gray-500">From:</span>
                            <span className="text-sm font-medium">{email.from}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">Subject:</span>
                            <span className="text-sm font-bold">{email.subject}</span>
                        </div>
                    </div>
                    <div className="whitespace-pre-line text-sm text-gray-700 leading-relaxed">
                        {email.body}
                    </div>
                </div>

                {!revealed ? (
                    <div className="flex gap-3">
                        <button onClick={() => handleChoice("scam")}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-bold text-lg transition-all">
                            🚫 SCAM
                        </button>
                        <button onClick={() => handleChoice("safe")}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold text-lg transition-all">
                            ✅ SAFE
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className={`rounded-xl p-6 mb-4 ${(email.isScam && userChoice === "scam") || (!email.isScam && userChoice === "safe")
                                ? "bg-green-50 border-2 border-green-200"
                                : "bg-red-50 border-2 border-red-200"
                            }`}>
                            <div className="text-lg font-bold mb-2">
                                {(email.isScam && userChoice === "scam") || (!email.isScam && userChoice === "safe")
                                    ? "✅ Correct!"
                                    : "❌ Incorrect — let's learn!"}
                            </div>
                            <p className="text-sm text-gray-700 mb-3">
                                This email is <strong>{email.isScam ? "a SCAM" : "SAFE"}</strong>.
                            </p>
                            {email.isScam && email.redFlags.length > 0 && (
                                <div>
                                    <p className="font-semibold text-sm mb-2">🚩 Red Flags:</p>
                                    <ul className="space-y-1">
                                        {email.redFlags.map((flag, i) => (
                                            <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                                <span className="text-red-500">⚠️</span> {flag}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <button onClick={handleNext}
                            className="w-full bg-[#d32f2f] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#b71c1c]">
                            {currentIndex < SCAM_EMAILS.length - 1 ? "Next Email →" : "✅ Complete Module"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
