"use client";

import { useState } from "react";
import { SCAM_EMAILS, SCAM_QUIZ } from "@/lib/data";

export default function ScamTrainingPage() {
    const [activeTab, setActiveTab] = useState<"emails" | "quiz">("emails");
    const [currentEmail, setCurrentEmail] = useState(0);
    const [emailRevealed, setEmailRevealed] = useState(false);
    const [emailUserChoice, setEmailUserChoice] = useState<string | null>(null);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [quizScore, setQuizScore] = useState(0);
    const [quizComplete, setQuizComplete] = useState(false);

    const email = SCAM_EMAILS[currentEmail];
    const question = SCAM_QUIZ[currentQuestion];

    const handleEmailChoice = (choice: string) => {
        setEmailUserChoice(choice);
        setEmailRevealed(true);
    };

    const nextEmail = () => {
        if (currentEmail < SCAM_EMAILS.length - 1) {
            setCurrentEmail(currentEmail + 1);
            setEmailRevealed(false);
            setEmailUserChoice(null);
        }
    };

    const handleQuizAnswer = (index: number) => {
        if (selectedAnswer !== null) return;
        setSelectedAnswer(index);
        if (index === question.correct) {
            setQuizScore(quizScore + 1);
        }
    };

    const nextQuestion = () => {
        if (currentQuestion < SCAM_QUIZ.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
        } else {
            setQuizComplete(true);
        }
    };

    return (
        <div className="min-h-screen bg-honeydew py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-4">
                    🛡️ Scam Awareness Training
                </h1>
                <p className="text-center text-gray-600 mb-8 text-lg">
                    Learn to spot scams, phishing emails, and suspicious messages. Stay safe online!
                </p>

                {/* Practice Mode Banner */}
                <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 text-center mb-8">
                    <span className="text-sm font-bold text-amber-800">
                        ⚠️ Practice Mode — These are fake examples for training purposes only
                    </span>
                </div>

                {/* Tab Selector */}
                <div className="flex gap-2 mb-8 justify-center">
                    <button
                        onClick={() => setActiveTab("emails")}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all min-h-[48px]
              ${activeTab === "emails"
                                ? "bg-french-blue text-white shadow-lg"
                                : "bg-white text-gray-600 hover:bg-gray-100"}`}
                    >
                        📧 Spot the Scam Email
                    </button>
                    <button
                        onClick={() => setActiveTab("quiz")}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all min-h-[48px]
              ${activeTab === "quiz"
                                ? "bg-french-blue text-white shadow-lg"
                                : "bg-white text-gray-600 hover:bg-gray-100"}`}
                    >
                        ❓ Scam Quiz
                    </button>
                </div>

                {/* Email Section */}
                {activeTab === "emails" && (
                    <div>
                        <div className="text-sm text-gray-500 mb-4 text-center">
                            Email {currentEmail + 1} of {SCAM_EMAILS.length}
                        </div>

                        {/* Fake Email */}
                        <div className="card bg-white mb-6">
                            <div className="border-b pb-4 mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-500">From:</span>
                                    <span className="text-sm font-medium text-foreground">{email.from}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">Subject:</span>
                                    <span className="text-sm font-bold text-foreground">{email.subject}</span>
                                </div>
                            </div>
                            <div className="whitespace-pre-line text-gray-700 text-sm leading-relaxed mb-6">
                                {email.body}
                            </div>

                            {!emailRevealed ? (
                                <div className="flex flex-wrap gap-3 justify-center">
                                    <button
                                        onClick={() => handleEmailChoice("scam")}
                                        className="btn-primary bg-red-500 hover:bg-red-600"
                                    >
                                        🚫 This is a SCAM
                                    </button>
                                    <button
                                        onClick={() => handleEmailChoice("safe")}
                                        className="btn-primary bg-green-500 hover:bg-green-600"
                                    >
                                        ✅ This is SAFE
                                    </button>
                                </div>
                            ) : (
                                <div className={`rounded-xl p-6 ${email.isScam
                                    ? (emailUserChoice === "scam" ? "bg-green-50 border-2 border-green-200" : "bg-red-50 border-2 border-red-200")
                                    : (emailUserChoice === "safe" ? "bg-green-50 border-2 border-green-200" : "bg-red-50 border-2 border-red-200")
                                    }`}>
                                    <div className="text-lg font-bold mb-2">
                                        {(email.isScam && emailUserChoice === "scam") || (!email.isScam && emailUserChoice === "safe")
                                            ? "✅ Correct! Well done!"
                                            : "❌ Not quite — let's learn from this!"
                                        }
                                    </div>
                                    <p className="text-sm text-gray-700 mb-3">
                                        This email is <strong>{email.isScam ? "a SCAM" : "SAFE"}</strong>.
                                    </p>
                                    {email.isScam && email.redFlags.length > 0 && (
                                        <div>
                                            <p className="font-semibold text-sm mb-2">🚩 Red Flags to Watch For:</p>
                                            <ul className="space-y-1">
                                                {email.redFlags.map((flag, i) => (
                                                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                                        <span className="text-red-500 mt-0.5">⚠️</span> {flag}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {currentEmail < SCAM_EMAILS.length - 1 && (
                                        <button onClick={nextEmail} className="btn-primary mt-4">
                                            Next Email →
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Safety Tips */}
                        <div className="card bg-blue-50 border-2 border-blue-200">
                            <h3 className="font-bold text-lg text-foreground mb-3">💡 General Safety Tips</h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li>✅ Check the sender&apos;s email address carefully — scammers use fake domains</li>
                                <li>✅ Never click links in unexpected emails or SMS</li>
                                <li>✅ Real government agencies will never ask for your password via email</li>
                                <li>✅ If something sounds too good to be true, it probably is</li>
                                <li>✅ When in doubt, call the official number (not the one in the email)</li>
                                <li>✅ Report suspicious messages to ScamShield (1799)</li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* Quiz Section */}
                {activeTab === "quiz" && (
                    <div>
                        {!quizComplete ? (
                            <div>
                                <div className="text-sm text-gray-500 mb-4 text-center">
                                    Question {currentQuestion + 1} of {SCAM_QUIZ.length} • Score: {quizScore}/{currentQuestion + (selectedAnswer !== null ? 1 : 0)}
                                </div>

                                <div className="card">
                                    <h3 className="text-lg font-bold text-foreground mb-6">
                                        {question.question}
                                    </h3>

                                    <div className="space-y-3">
                                        {question.options.map((option, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleQuizAnswer(i)}
                                                disabled={selectedAnswer !== null}
                                                className={`w-full text-left p-4 rounded-xl transition-all text-sm font-medium
                          ${selectedAnswer === null
                                                        ? "bg-gray-50 hover:bg-cool-sky/10 hover:border-cool-sky border-2 border-gray-200"
                                                        : i === question.correct
                                                            ? "bg-green-50 border-2 border-green-500 text-green-800"
                                                            : selectedAnswer === i
                                                                ? "bg-red-50 border-2 border-red-500 text-red-800"
                                                                : "bg-gray-50 border-2 border-gray-200 opacity-50"
                                                    }`}
                                            >
                                                <span className="font-bold mr-2">
                                                    {String.fromCharCode(65 + i)}.
                                                </span>
                                                {option}
                                                {selectedAnswer !== null && i === question.correct && " ✅"}
                                                {selectedAnswer === i && i !== question.correct && " ❌"}
                                            </button>
                                        ))}
                                    </div>

                                    {selectedAnswer !== null && (
                                        <div className={`mt-6 p-4 rounded-xl ${selectedAnswer === question.correct
                                            ? "bg-green-50 border-2 border-green-200"
                                            : "bg-amber-50 border-2 border-amber-200"
                                            }`}>
                                            <p className="font-bold mb-2">
                                                {selectedAnswer === question.correct ? "✅ Correct!" : "💡 Not quite — here's why:"}
                                            </p>
                                            <p className="text-sm text-gray-700">{question.explanation}</p>
                                            <button onClick={nextQuestion} className="btn-primary mt-4">
                                                {currentQuestion < SCAM_QUIZ.length - 1 ? "Next Question →" : "See Results →"}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="card text-center">
                                <div className="text-5xl mb-4">🎉</div>
                                <h2 className="text-2xl font-bold text-foreground mb-2">Quiz Complete!</h2>
                                <p className="text-gray-600 mb-4">
                                    You scored <strong>{quizScore}</strong> out of <strong>{SCAM_QUIZ.length}</strong>
                                </p>
                                <div className="text-4xl mb-4">
                                    {quizScore === SCAM_QUIZ.length ? "🏆" : quizScore >= SCAM_QUIZ.length / 2 ? "👍" : "📚"}
                                </div>
                                <p className="text-gray-600 mb-6">
                                    {quizScore === SCAM_QUIZ.length
                                        ? "Perfect score! You're a scam-spotting expert! 🌟"
                                        : quizScore >= SCAM_QUIZ.length / 2
                                            ? "Good job! Keep practising to improve even more."
                                            : "Don't worry — review the tips above and try again!"}
                                </p>
                                <button
                                    onClick={() => {
                                        setCurrentQuestion(0);
                                        setSelectedAnswer(null);
                                        setQuizScore(0);
                                        setQuizComplete(false);
                                    }}
                                    className="btn-primary"
                                >
                                    🔄 Try Again
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
