"use client";

import { useState } from "react";
import { FAKE_CPF } from "@/lib/credentials";

interface Props {
    mode: "guided" | "independent";
    onComplete: (score: number, maxScore: number, errors: number) => void;
    onError: () => void;
}

type Step = "login" | "2fa" | "overview" | "history";

export default function PensionSim({ mode, onComplete, onError }: Props) {
    const [step, setStep] = useState<Step>("login");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [code2fa, setCode2fa] = useState("");
    const [loginError, setLoginError] = useState("");
    const [score, setScore] = useState(0);
    const [errors, setErrors] = useState(0);
    const isGuided = mode === "guided";

    const handleLogin = () => {
        if (username.trim() && password.trim()) {
            setScore((s) => s + 25);
            setStep("2fa");
            setLoginError("");
        } else {
            setLoginError("Please provide a user ID and password.");
            setErrors((e) => e + 1);
            onError();
        }
    };

    const handle2FA = () => {
        if (code2fa.replace(/\D/g, "").length >= 4) {
            setScore((s) => s + 25);
            setStep("overview");
        } else {
            setErrors((e) => e + 1);
            onError();
        }
    };

    // Login
    if (step === "login") {
        return (
            <div className="max-w-lg mx-auto mt-8 p-4">
                <div className="bg-[#00205b] text-white p-6 rounded-t-xl">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">💰</span>
                        <div>
                            <h2 className="text-2xl font-bold">CPF Board</h2>
                            <p className="text-sm text-blue-200">Practice Pension Portal</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-b-xl p-8">
                    <h3 className="text-xl font-bold text-foreground mb-6">Log In to My CPF</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">User ID</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter user ID"
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-lg focus:border-[#00205b] focus:outline-none min-h-[48px]" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-lg focus:border-[#00205b] focus:outline-none min-h-[48px]"
                                onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
                        </div>
                        {loginError && <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 text-sm text-red-700">{loginError}</div>}
                        <button onClick={handleLogin}
                            className={`w-full bg-[#00205b] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#001540] transition-all
                ${isGuided ? "ring-4 ring-blue-400 ring-offset-2" : ""}`}>
                            Log In
                        </button>
                    </div>
                </div>
                <div className="mt-4 bg-amber-50 border-2 border-amber-200 rounded-xl p-3 text-center">
                    <span className="text-sm font-bold text-amber-800">⚠️ PRACTICE MODE — Not the real CPF portal</span>
                </div>
            </div>
        );
    }

    // 2FA
    if (step === "2fa") {
        return (
            <div className="max-w-lg mx-auto mt-8 p-4">
                <div className="bg-[#00205b] text-white p-4 rounded-t-xl">
                    <span className="font-bold">Two-Factor Verification</span>
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-b-xl p-8 text-center">
                    <div className="text-4xl mb-4">📱</div>
                    <p className="text-gray-600 mb-6">Enter the 6-digit code sent to your device.</p>
                    <input type="text" value={code2fa} onChange={(e) => setCode2fa(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        placeholder="000000" maxLength={6}
                        className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 text-2xl text-center tracking-[0.5em] font-mono focus:border-[#00205b] focus:outline-none"
                        onKeyDown={(e) => e.key === "Enter" && handle2FA()} />
                    <button onClick={handle2FA}
                        className={`w-full mt-6 bg-[#00205b] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#001540]
              ${isGuided ? "ring-4 ring-blue-400 ring-offset-2" : ""}`}>
                        Verify
                    </button>
                    {/* Guided hints should not display secret codes in the UI */}
                </div>
            </div>
        );
    }

    // Overview
    if (step === "overview") {
        const accounts = [
            { name: "Ordinary Account (OA)", amount: FAKE_CPF.ordinaryAccount, color: "bg-blue-500" },
            { name: "Special Account (SA)", amount: FAKE_CPF.specialAccount, color: "bg-green-500" },
            { name: "MediSave Account (MA)", amount: FAKE_CPF.medisaveAccount, color: "bg-amber-500" },
            { name: "Retirement Account (RA)", amount: FAKE_CPF.retirementAccount, color: "bg-purple-500" },
        ];

        return (
            <div className="max-w-3xl mx-auto mt-8 p-4">
                <div className="bg-[#00205b] text-white p-4 rounded-t-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">💰</span>
                        <span className="font-bold">My CPF Balances</span>
                    </div>
                    <button onClick={() => { setScore((s) => s + 25); onComplete(score + 25, 100, errors); }}
                        className="bg-white text-[#00205b] px-4 py-2 rounded-xl text-sm font-semibold">
                        Logout
                    </button>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-b-xl p-6">
                    <div className="bg-[#00205b] text-white rounded-xl p-6 mb-6 text-center">
                        <div className="text-sm text-blue-200 mb-1">Total CPF Balance</div>
                        <div className="text-4xl font-bold">${FAKE_CPF.totalBalance.toLocaleString()}</div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        {accounts.map((acc) => (
                            <div key={acc.name} className="p-4 bg-gray-50 rounded-xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className={`w-3 h-3 rounded-full ${acc.color}`} />
                                    <span className="text-sm font-semibold text-gray-700">{acc.name}</span>
                                </div>
                                <div className="text-xl font-bold text-foreground">
                                    ${acc.amount.toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>

                    <button onClick={() => { setScore((s) => s + 25); setStep("history"); }}
                        className={`w-full bg-[#00205b] text-white py-3 rounded-xl font-bold hover:bg-[#001540]
              ${isGuided ? "ring-4 ring-blue-400 ring-offset-2" : ""}`}>
                        📊 View Contribution History
                    </button>

                    {isGuided && (
                        <div className="mt-4 bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                            📝 <strong>Guided:</strong> Click &quot;View Contribution History&quot; to see your recent CPF contributions.
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Contribution History
    return (
        <div className="max-w-3xl mx-auto mt-8 p-4">
            <div className="bg-[#00205b] text-white p-4 rounded-t-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button onClick={() => setStep("overview")} className="bg-white/20 px-3 py-1 rounded-lg text-sm">← Back</button>
                    <span className="font-bold">Contribution History</span>
                </div>
                <button onClick={() => onComplete(score, 100, errors)}
                    className="bg-white text-[#00205b] px-4 py-2 rounded-xl text-sm font-semibold">
                    Logout
                </button>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-b-xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Recent Contributions</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b-2 border-gray-200">
                                <th className="text-left p-3">Month</th>
                                <th className="text-right p-3">Employer</th>
                                <th className="text-right p-3">Employee</th>
                                <th className="text-right p-3 font-bold">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {FAKE_CPF.contributions.map((c) => (
                                <tr key={c.month} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="p-3 font-medium">{c.month}</td>
                                    <td className="p-3 text-right text-green-600">${c.employer.toFixed(2)}</td>
                                    <td className="p-3 text-right text-blue-600">${c.employee.toFixed(2)}</td>
                                    <td className="p-3 text-right font-bold">${c.total.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <button onClick={() => onComplete(score, 100, errors)}
                    className="w-full mt-6 btn-primary">
                    ✅ Complete Module
                </button>
            </div>
        </div>
    );
}
