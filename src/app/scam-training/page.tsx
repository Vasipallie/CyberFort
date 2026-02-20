"use client";

import { useState } from "react";
import Link from "next/link";
import { scamExamples } from "@/lib/data";

export default function ScamTrainingPage() {
  const [currentSection, setCurrentSection] = useState<"menu" | "email" | "sms" | "popup" | "quiz">("menu");
  const [revealedFlags, setRevealedFlags] = useState<Set<string>>(new Set());
  const [quizAnswers, setQuizAnswers] = useState<Record<number, boolean>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [confidenceMeter, setConfidenceMeter] = useState(0);

  const toggleFlag = (id: string) => {
    const newSet = new Set(revealedFlags);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setRevealedFlags(newSet);
    setConfidenceMeter(Math.min(100, (newSet.size / 10) * 100));
  };

  const quizQuestions = [
    { q: "A bank emails you saying your account will be 'SUSPENDED' unless you click a link. What do you do?", correct: "b", options: { a: "Click the link immediately", b: "Ignore it and call your bank directly", c: "Reply asking for more info" } },
    { q: "You receive an SMS from an unknown number saying 'Hi Mum, this is my new phone'. They ask for $500. What do you do?", correct: "c", options: { a: "Send the money quickly", b: "Ask them questions via SMS", c: "Call your child's original number to verify" } },
    { q: "A popup says your computer has a virus and to call a number. What should you do?", correct: "b", options: { a: "Call the number right away", b: "Close the popup — it's a scam", c: "Download the suggested software" } },
    { q: "Which of these is a red flag in a suspicious email?", correct: "a", options: { a: "Urgent language demanding immediate action", b: "A personalised greeting using your name", c: "A familiar sender email address" } },
    { q: "What should you check first when you receive a suspicious link?", correct: "c", options: { a: "How many people shared it", b: "If it loads fast", c: "The domain name / URL" } },
  ];

  if (currentSection === "menu") {
    return (
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-french-blue hover:text-cool-sky mb-6 text-lg font-medium">
            ← Back to Dashboard
          </Link>

          <div className="text-center mb-10">
            <div className="text-6xl mb-4">🛡️</div>
            <h1 className="text-3xl sm:text-4xl font-bold text-french-blue mb-3">
              Scam Awareness Training
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Learn to spot and avoid common online scams through interactive exercises.
              All examples are fake — this is a safe training environment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <button onClick={() => setCurrentSection("email")} className="card text-left hover:border-cool-sky group">
              <div className="text-4xl mb-3">📧</div>
              <h3 className="text-xl font-bold text-french-blue group-hover:text-cool-sky mb-2">Fake Phishing Emails</h3>
              <p className="text-gray-600">Learn to identify suspicious emails that try to steal your information.</p>
            </button>
            <button onClick={() => setCurrentSection("sms")} className="card text-left hover:border-cool-sky group">
              <div className="text-4xl mb-3">💬</div>
              <h3 className="text-xl font-bold text-french-blue group-hover:text-cool-sky mb-2">Fake SMS Messages</h3>
              <p className="text-gray-600">Spot scam text messages before they trick you.</p>
            </button>
            <button onClick={() => setCurrentSection("popup")} className="card text-left hover:border-cool-sky group">
              <div className="text-4xl mb-3">⚠️</div>
              <h3 className="text-xl font-bold text-french-blue group-hover:text-cool-sky mb-2">Fake Login Popups</h3>
              <p className="text-gray-600">Recognize fake security warnings and popups.</p>
            </button>
            <button onClick={() => setCurrentSection("quiz")} className="card text-left hover:border-velvet-purple group">
              <div className="text-4xl mb-3">🧠</div>
              <h3 className="text-xl font-bold text-french-blue group-hover:text-velvet-purple mb-2">Spot the Red Flag Quiz</h3>
              <p className="text-gray-600">Test your knowledge with an interactive quiz!</p>
            </button>
          </div>

          {/* Real world safety tips */}
          <div className="card mt-10">
            <h2 className="text-xl font-bold text-french-blue mb-4">🌍 Real World Safety Tips</h2>
            <ul className="space-y-3">
              {[
                "Never click links in unexpected emails or messages",
                "Always verify the sender's email address or phone number",
                "Banks and government agencies will NEVER ask for your password via email or SMS",
                "If something feels too urgent, it's probably a scam — take your time",
                "When in doubt, call the organisation directly using their official number",
                "Look for spelling errors and poor grammar — these are common in scams",
                "Check the website URL carefully before entering any information",
                "Never share your OTP (One-Time Password) with anyone",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-green-500 text-lg flex-shrink-0">✅</span>
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (currentSection === "email") {
    return (
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => setCurrentSection("menu")} className="inline-flex items-center gap-2 text-french-blue hover:text-cool-sky mb-6 text-lg font-medium">
            ← Back to Scam Training
          </button>
          <h1 className="text-3xl font-bold text-french-blue mb-8">📧 Fake Phishing Emails</h1>

          {scamExamples.phishingEmails.map((email) => (
            <div key={email.id} className="card mb-8">
              <div className="bg-gray-50 rounded-xl p-5 mb-4 font-mono text-sm">
                <p><strong>From:</strong> <span className="text-red-600">{email.from}</span></p>
                <p><strong>Subject:</strong> {email.subject}</p>
                <div className="border-t mt-3 pt-3 whitespace-pre-wrap">{email.body}</div>
              </div>

              <h3 className="text-lg font-bold text-french-blue mb-3">🚩 Click to Reveal Red Flags:</h3>
              <div className="space-y-2">
                {email.redFlags.map((flag, i) => (
                  <button
                    key={i}
                    onClick={() => toggleFlag(`${email.id}-${i}`)}
                    className={`w-full text-left p-3 rounded-xl transition-all ${
                      revealedFlags.has(`${email.id}-${i}`)
                        ? "bg-red-50 border-2 border-red-300 text-red-800"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-500"
                    }`}
                  >
                    {revealedFlags.has(`${email.id}-${i}`) ? `🚩 ${flag}` : `Click to reveal red flag #${i + 1}`}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (currentSection === "sms") {
    return (
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => setCurrentSection("menu")} className="inline-flex items-center gap-2 text-french-blue hover:text-cool-sky mb-6 text-lg font-medium">
            ← Back to Scam Training
          </button>
          <h1 className="text-3xl font-bold text-french-blue mb-8">💬 Fake SMS Messages</h1>

          {scamExamples.fakeSMS.map((sms) => (
            <div key={sms.id} className="card mb-8">
              <div className="bg-green-50 rounded-xl p-5 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-sm">📱</span>
                  <span className="font-semibold text-gray-700">{sms.from}</span>
                </div>
                <div className="bg-white rounded-2xl rounded-tl-md p-4 shadow-sm max-w-sm">
                  <p className="text-gray-800">{sms.message}</p>
                </div>
              </div>

              <h3 className="text-lg font-bold text-french-blue mb-3">🚩 Click to Reveal Red Flags:</h3>
              <div className="space-y-2">
                {sms.redFlags.map((flag, i) => (
                  <button
                    key={i}
                    onClick={() => toggleFlag(`${sms.id}-${i}`)}
                    className={`w-full text-left p-3 rounded-xl transition-all ${
                      revealedFlags.has(`${sms.id}-${i}`)
                        ? "bg-red-50 border-2 border-red-300 text-red-800"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-500"
                    }`}
                  >
                    {revealedFlags.has(`${sms.id}-${i}`) ? `🚩 ${flag}` : `Click to reveal red flag #${i + 1}`}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (currentSection === "popup") {
    return (
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => setCurrentSection("menu")} className="inline-flex items-center gap-2 text-french-blue hover:text-cool-sky mb-6 text-lg font-medium">
            ← Back to Scam Training
          </button>
          <h1 className="text-3xl font-bold text-french-blue mb-8">⚠️ Fake Login Popups</h1>

          {scamExamples.fakePopups.map((popup) => (
            <div key={popup.id} className="card mb-8">
              <div className="bg-red-900 text-white rounded-xl p-6 mb-4 text-center">
                <p className="text-3xl mb-2">{popup.title}</p>
                <p className="text-lg">{popup.message}</p>
                <button className="mt-4 bg-red-600 px-6 py-2 rounded-lg text-white font-bold cursor-not-allowed opacity-80">
                  DO NOT CLICK — This is a scam example
                </button>
              </div>

              <h3 className="text-lg font-bold text-french-blue mb-3">🚩 Click to Reveal Red Flags:</h3>
              <div className="space-y-2">
                {popup.redFlags.map((flag, i) => (
                  <button
                    key={i}
                    onClick={() => toggleFlag(`${popup.id}-${i}`)}
                    className={`w-full text-left p-3 rounded-xl transition-all ${
                      revealedFlags.has(`${popup.id}-${i}`)
                        ? "bg-red-50 border-2 border-red-300 text-red-800"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-500"
                    }`}
                  >
                    {revealedFlags.has(`${popup.id}-${i}`) ? `🚩 ${flag}` : `Click to reveal red flag #${i + 1}`}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Quiz section
  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => setCurrentSection("menu")} className="inline-flex items-center gap-2 text-french-blue hover:text-cool-sky mb-6 text-lg font-medium">
          ← Back to Scam Training
        </button>
        <h1 className="text-3xl font-bold text-french-blue mb-3">🧠 Spot the Red Flag Quiz</h1>
        <p className="text-gray-600 mb-8">Test your scam detection knowledge. Take your time!</p>

        {/* Confidence meter */}
        <div className="card mb-8">
          <h3 className="font-bold text-french-blue mb-2">Your Confidence Meter</h3>
          <div className="bg-gray-200 rounded-full h-6 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cool-sky to-velvet-purple rounded-full transition-all duration-500"
              style={{ width: `${showQuizResults ? (Object.values(quizAnswers).filter(Boolean).length / quizQuestions.length) * 100 : confidenceMeter}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {showQuizResults
              ? `${Object.values(quizAnswers).filter(Boolean).length}/${quizQuestions.length} correct!`
              : "Complete all exercises to build your confidence meter"}
          </p>
        </div>

        <div className="space-y-6">
          {quizQuestions.map((q, idx) => (
            <div key={idx} className="card">
              <h3 className="text-lg font-bold text-french-blue mb-4">
                Question {idx + 1}: {q.q}
              </h3>
              <div className="space-y-2">
                {Object.entries(q.options).map(([key, val]) => {
                  const selected = quizAnswers[idx] !== undefined;
                  const isCorrect = key === q.correct;
                  return (
                    <button
                      key={key}
                      disabled={selected}
                      onClick={() => {
                        setQuizAnswers({ ...quizAnswers, [idx]: key === q.correct });
                      }}
                      className={`w-full text-left p-4 rounded-xl transition-all min-h-[48px] ${
                        selected
                          ? isCorrect
                            ? "bg-green-50 border-2 border-green-400 text-green-800"
                            : "bg-gray-50 text-gray-400 border border-gray-200"
                          : "bg-gray-50 hover:bg-cool-sky/10 border-2 border-gray-200 hover:border-cool-sky"
                      }`}
                    >
                      <span className="font-bold mr-2">{key.toUpperCase()}.</span> {val}
                      {selected && isCorrect && " ✅"}
                    </button>
                  );
                })}
              </div>
              {quizAnswers[idx] !== undefined && !quizAnswers[idx] && (
                <div className="mt-3 bg-orange-50 border border-orange-200 rounded-xl p-3 text-orange-800 text-sm">
                  Not quite! The correct answer was <strong>{q.correct.toUpperCase()}</strong>. That&apos;s okay — you&apos;re learning! 😊
                </div>
              )}
              {quizAnswers[idx] === true && (
                <div className="mt-3 bg-green-50 border border-green-200 rounded-xl p-3 text-green-800 text-sm">
                  Excellent! You got it right! 🎉
                </div>
              )}
            </div>
          ))}
        </div>

        {Object.keys(quizAnswers).length === quizQuestions.length && !showQuizResults && (
          <div className="text-center mt-8">
            <button onClick={() => setShowQuizResults(true)} className="btn-accent text-xl px-10 py-5">
              🎓 See My Results
            </button>
          </div>
        )}

        {showQuizResults && (
          <div className="card mt-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-french-blue mb-2">Quiz Complete!</h2>
            <p className="text-xl text-gray-600 mb-4">
              You scored <strong className="text-velvet-purple">{Object.values(quizAnswers).filter(Boolean).length}/{quizQuestions.length}</strong>
            </p>
            <p className="text-gray-500 mb-6">
              Every question you practise makes you safer online. You&apos;re doing great!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => { setQuizAnswers({}); setShowQuizResults(false); }} className="btn-secondary">
                🔁 Try Again
              </button>
              <Link href="/dashboard" className="btn-primary">
                📋 More Modules
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
