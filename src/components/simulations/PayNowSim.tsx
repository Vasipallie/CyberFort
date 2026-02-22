"use client";

import { useState } from "react";

interface Props {
    mode: "guided" | "independent";
    onComplete: (score: number, maxScore: number, errors: number) => void;
    onError: () => void;
}

type Step = "select" | "amount" | "confirm" | "success";

const CONTACTS = [
    { name: "Robert Lim (Brother)", phone: "9876 5432", icon: "👨" },
    { name: "Sarah Chen (Daughter)", phone: "8765 4321", icon: "👩" },
    { name: "NTUC FairPrice", phone: "UEN 12345678A", icon: "🏪" },
    { name: "Ah Kow (Friend)", phone: "9234 5678", icon: "👴" },
];

export default function PayNowSim({ mode, onComplete, onError }: Props) {
    const [step, setStep] = useState<Step>("select");
    const [selectedContact, setSelectedContact] = useState<number | null>(null);
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [score, setScore] = useState(0);
    const [errors, setErrors] = useState(0);
    const isGuided = mode === "guided";

    const contact = selectedContact !== null ? CONTACTS[selectedContact] : null;

    // Select Recipient
    if (step === "select") {
        return (
            <div className="max-w-lg mx-auto mt-8 p-4">
                <div className="bg-[#7b2d8e] text-white p-6 rounded-t-xl">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">📱</span>
                        <div>
                            <h2 className="text-2xl font-bold">PayNow</h2>
                            <p className="text-sm text-purple-200">Practice Transfer Portal</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-b-xl p-6">
                    <h3 className="text-lg font-bold text-foreground mb-4">Select Recipient</h3>

                    {isGuided && (
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-4 text-sm text-blue-800">
                            📝 <strong>Guided:</strong> Click on the person you want to send money to.
                        </div>
                    )}

                    <div className="space-y-3">
                        {CONTACTS.map((c, i) => (
                            <button key={i} onClick={() => { setSelectedContact(i); setScore((s) => s + 25); setStep("amount"); }}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all hover:bg-purple-50 hover:border-[#7b2d8e]
                  ${isGuided ? "border-blue-300" : "border-gray-200"}`}>
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{c.icon}</span>
                                    <div>
                                        <div className="font-bold text-foreground">{c.name}</div>
                                        <div className="text-sm text-gray-500">{c.phone}</div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="mt-4 bg-amber-50 border-2 border-amber-200 rounded-xl p-3 text-center">
                    <span className="text-sm font-bold text-amber-800">⚠️ PRACTICE MODE — No real money will be transferred</span>
                </div>
            </div>
        );
    }

    // Enter Amount
    if (step === "amount") {
        return (
            <div className="max-w-lg mx-auto mt-8 p-4">
                <div className="bg-[#7b2d8e] text-white p-4 rounded-t-xl flex items-center gap-3">
                    <button onClick={() => setStep("select")} className="bg-white/20 px-3 py-1 rounded-lg text-sm">← Back</button>
                    <span className="font-bold">Enter Amount</span>
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-b-xl p-6">
                    <div className="bg-purple-50 rounded-xl p-4 mb-6 flex items-center gap-3">
                        <span className="text-2xl">{contact?.icon}</span>
                        <div>
                            <div className="font-bold text-sm">{contact?.name}</div>
                            <div className="text-xs text-gray-500">{contact?.phone}</div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Amount (SGD)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400">$</span>
                            <input type="text" value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
                                placeholder="0.00"
                                className="w-full pl-10 pr-4 py-4 rounded-xl border-2 border-gray-200 text-3xl font-bold text-center focus:border-[#7b2d8e] focus:outline-none" />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-semibold mb-2">Note (optional)</label>
                        <input type="text" value={note} onChange={(e) => setNote(e.target.value)}
                            placeholder="e.g. Dinner money"
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-lg focus:border-[#7b2d8e] focus:outline-none" />
                    </div>

                    {isGuided && (
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-4 text-sm text-blue-800">
                            📝 Enter any amount (e.g. 10). Remember — this is practice, no real money moves!
                        </div>
                    )}

                    <button onClick={() => {
                        if (!amount || parseFloat(amount) <= 0) { setErrors((e) => e + 1); onError(); return; }
                        setScore((s) => s + 25); setStep("confirm");
                    }}
                        className={`w-full bg-[#7b2d8e] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#5e2270]
              ${isGuided ? "ring-4 ring-blue-400 ring-offset-2" : ""}`}>
                        Continue →
                    </button>
                </div>
            </div>
        );
    }

    // Confirm
    if (step === "confirm") {
        return (
            <div className="max-w-lg mx-auto mt-8 p-4">
                <div className="bg-[#7b2d8e] text-white p-4 rounded-t-xl">
                    <span className="font-bold">Confirm Transfer</span>
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-b-xl p-6 text-center">
                    <div className="text-4xl mb-4">{contact?.icon}</div>
                    <h3 className="text-lg font-bold text-foreground mb-1">Sending to {contact?.name}</h3>
                    <div className="text-4xl font-bold text-[#7b2d8e] my-4">${parseFloat(amount || "0").toFixed(2)}</div>
                    {note && <p className="text-sm text-gray-500 mb-4">Note: {note}</p>}

                    <div className="bg-gray-50 rounded-xl p-4 text-left text-sm space-y-2 mb-6">
                        <div className="flex justify-between">
                            <span className="text-gray-500">From</span>
                            <span>You (Learner)</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">To</span>
                            <span>{contact?.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Amount</span>
                            <span className="font-bold">${parseFloat(amount || "0").toFixed(2)}</span>
                        </div>
                    </div>

                    {isGuided && (
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-4 text-sm text-blue-800">
                            📝 Review the details carefully. If correct, click &quot;Confirm &amp; Send&quot; — no real money will move!
                        </div>
                    )}

                    <button onClick={() => { setScore((s) => s + 25); setStep("success"); }}
                        className={`w-full bg-[#7b2d8e] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#5e2270]
              ${isGuided ? "ring-4 ring-blue-400 ring-offset-2" : ""}`}>
                        ✅ Confirm & Send
                    </button>
                </div>
            </div>
        );
    }

    // Success
    return (
        <div className="max-w-lg mx-auto mt-8 p-4">
            <div className="bg-white border-2 border-green-200 rounded-xl p-8 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Transfer Complete!</h3>
                <p className="text-gray-600 mb-4">(Practice only — no real money transferred)</p>
                <div className="bg-green-50 rounded-xl p-4 text-left text-sm space-y-1 mb-6">
                    <p><strong>To:</strong> {contact?.name}</p>
                    <p><strong>Amount:</strong> ${parseFloat(amount || "0").toFixed(2)}</p>
                    <p><strong>Ref:</strong> PN-{Math.floor(Math.random() * 900000 + 100000)}</p>
                    <p><strong>Date:</strong> {new Date().toLocaleDateString("en-SG")}</p>
                </div>
                <button onClick={() => onComplete(score, 100, errors)} className="btn-primary">✅ Complete Module</button>
            </div>
        </div>
    );
}
