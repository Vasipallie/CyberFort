"use client";

import { useState } from "react";
import { FAKE_BANK, FAKE_CREDENTIALS, FAKE_2FA_CODE } from "@/lib/credentials";

interface Props {
    mode: "guided" | "independent";
    onComplete: (score: number, maxScore: number, errors: number) => void;
    onError: () => void;
}

type Step = "login" | "2fa" | "dashboard" | "transactions" | "transfer" | "transfer-success";

export default function BankingSim({ mode, onComplete, onError }: Props) {
    const [step, setStep] = useState<Step>("login");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [code2fa, setCode2fa] = useState("");
    const [loginError, setLoginError] = useState("");
    const [transferAmt, setTransferAmt] = useState("");
    const [transferTo, setTransferTo] = useState("");
    const [score, setScore] = useState(0);
    const [errors, setErrors] = useState(0);
    const isGuided = mode === "guided";
    const user = FAKE_CREDENTIALS.user;

    const handleLogin = () => {
        if (username === user.username && password === user.password) {
            setScore((s) => s + 20); setStep("2fa"); setLoginError("");
        } else { setLoginError("Invalid credentials."); setErrors((e) => e + 1); onError(); }
    };

    const handle2FA = () => {
        if (code2fa === FAKE_2FA_CODE) { setScore((s) => s + 20); setStep("dashboard"); }
        else { setErrors((e) => e + 1); onError(); }
    };

    // Login
    if (step === "login") {
        return (
            <div className="max-w-lg mx-auto mt-8 p-4">
                <div className="bg-[#c8102e] text-white p-6 rounded-t-xl">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">🏦</span>
                        <div>
                            <h2 className="text-2xl font-bold">DBS digibank</h2>
                            <p className="text-sm text-red-200">Practice Banking Portal</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-b-xl p-8">
                    <h3 className="text-xl font-bold mb-6">Internet Banking Login</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">User ID</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-lg focus:border-[#c8102e] focus:outline-none min-h-[48px]" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">PIN</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-lg focus:border-[#c8102e] focus:outline-none min-h-[48px]"
                                onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
                        </div>
                        {loginError && <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 text-sm text-red-700">{loginError}</div>}
                        <button onClick={handleLogin}
                            className={`w-full bg-[#c8102e] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#a00d24]
                ${isGuided ? "ring-4 ring-blue-400 ring-offset-2" : ""}`}>
                            Log In
                        </button>
                    </div>
                    {isGuided && (
                        <div className="mt-6 bg-green-50 border-2 border-green-200 rounded-xl p-4 text-sm text-green-800">
                            💡 <strong>Credentials:</strong> <code>{user.username}</code> / <code>{user.password}</code>
                        </div>
                    )}
                </div>
                <div className="mt-4 bg-amber-50 border-2 border-amber-200 rounded-xl p-3 text-center">
                    <span className="text-sm font-bold text-amber-800">⚠️ PRACTICE MODE — Not real DBS banking</span>
                </div>
            </div>
        );
    }

    // 2FA
    if (step === "2fa") {
        return (
            <div className="max-w-lg mx-auto mt-8 p-4">
                <div className="bg-[#c8102e] text-white p-4 rounded-t-xl"><span className="font-bold">Verify Your Identity</span></div>
                <div className="bg-white border-2 border-gray-200 rounded-b-xl p-8 text-center">
                    <div className="text-4xl mb-4">📱</div>
                    <p className="text-gray-600 mb-6">Enter OTP sent to ****{user.phone.slice(-4)}</p>
                    <input type="text" value={code2fa} onChange={(e) => setCode2fa(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        maxLength={6} className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 text-2xl text-center tracking-[0.5em] font-mono focus:border-[#c8102e] focus:outline-none"
                        onKeyDown={(e) => e.key === "Enter" && handle2FA()} />
                    <button onClick={handle2FA}
                        className={`w-full mt-6 bg-[#c8102e] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#a00d24]
              ${isGuided ? "ring-4 ring-blue-400 ring-offset-2" : ""}`}>Verify</button>
                    {isGuided && (
                        <div className="mt-4 bg-green-50 border-2 border-green-200 rounded-xl p-3 text-sm text-green-800">
                            💡 OTP: <code className="text-lg">{FAKE_2FA_CODE}</code>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Dashboard
    if (step === "dashboard") {
        return (
            <div className="max-w-3xl mx-auto mt-8 p-4">
                <div className="bg-[#c8102e] text-white p-4 rounded-t-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">🏦</span>
                        <span className="font-bold">DBS digibank</span>
                    </div>
                    <button onClick={() => { setScore((s) => s + 20); onComplete(score + 20, 100, errors); }}
                        className="bg-white text-[#c8102e] px-4 py-2 rounded-xl text-sm font-semibold">Logout</button>
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-b-xl p-6">
                    <h3 className="text-xl font-bold mb-1">Welcome, {user.fullName.split(" ")[0]}</h3>
                    <p className="text-sm text-gray-500 mb-6">Account: {FAKE_BANK.accountNumber} • {FAKE_BANK.accountType}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="bg-[#c8102e] text-white rounded-xl p-6">
                            <div className="text-sm text-red-200">Available Balance</div>
                            <div className="text-3xl font-bold">${FAKE_BANK.availableBalance.toLocaleString()}</div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-6">
                            <div className="text-sm text-gray-500">Total Balance</div>
                            <div className="text-3xl font-bold text-foreground">${FAKE_BANK.balance.toLocaleString()}</div>
                        </div>
                    </div>

                    <div className="flex gap-3 mb-6">
                        <button onClick={() => { setScore((s) => s + 20); setStep("transactions"); }}
                            className={`flex-1 bg-gray-50 hover:bg-gray-100 p-4 rounded-xl font-semibold text-sm
                ${isGuided ? "ring-4 ring-blue-400 ring-offset-2" : ""}`}>
                            📊 Transactions
                        </button>
                        <button onClick={() => { setScore((s) => s + 20); setStep("transfer"); }}
                            className="flex-1 bg-gray-50 hover:bg-gray-100 p-4 rounded-xl font-semibold text-sm">
                            💸 Transfer
                        </button>
                    </div>

                    {isGuided && (
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                            📝 <strong>Guided:</strong> Click &quot;Transactions&quot; to view recent activity, or &quot;Transfer&quot; to practise sending money.
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Transactions
    if (step === "transactions") {
        return (
            <div className="max-w-3xl mx-auto mt-8 p-4">
                <div className="bg-[#c8102e] text-white p-4 rounded-t-xl flex items-center gap-3">
                    <button onClick={() => setStep("dashboard")} className="bg-white/20 px-3 py-1 rounded-lg text-sm">← Back</button>
                    <span className="font-bold">Transaction History</span>
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-b-xl p-6">
                    <div className="space-y-2">
                        {FAKE_BANK.transactions.map((tx, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                <div>
                                    <div className="font-medium text-sm">{tx.description}</div>
                                    <div className="text-xs text-gray-500">{tx.date}</div>
                                </div>
                                <div className={`font-bold text-sm ${tx.amount < 0 ? "text-red-600" : "text-green-600"}`}>
                                    {tx.amount < 0 ? "-" : "+"}${Math.abs(tx.amount).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => onComplete(score, 100, errors)} className="w-full mt-6 btn-primary">
                        ✅ Complete Module
                    </button>
                </div>
            </div>
        );
    }

    // Transfer
    if (step === "transfer") {
        return (
            <div className="max-w-lg mx-auto mt-8 p-4">
                <div className="bg-[#c8102e] text-white p-4 rounded-t-xl flex items-center gap-3">
                    <button onClick={() => setStep("dashboard")} className="bg-white/20 px-3 py-1 rounded-lg text-sm">← Back</button>
                    <span className="font-bold">Fund Transfer</span>
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-b-xl p-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Transfer To</label>
                            <input type="text" value={transferTo} onChange={(e) => setTransferTo(e.target.value)}
                                placeholder="Recipient name or account"
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-lg focus:border-[#c8102e] focus:outline-none min-h-[48px]" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Amount (SGD)</label>
                            <input type="text" value={transferAmt} onChange={(e) => setTransferAmt(e.target.value.replace(/[^0-9.]/g, ""))}
                                placeholder="0.00"
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-lg focus:border-[#c8102e] focus:outline-none min-h-[48px]" />
                        </div>
                        {isGuided && (
                            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                                📝 Enter any name and amount. This is just practice — no real money will move!
                            </div>
                        )}
                        <button onClick={() => {
                            if (!transferTo || !transferAmt) { setErrors((e) => e + 1); onError(); return; }
                            setScore((s) => s + 20); setStep("transfer-success");
                        }}
                            className={`w-full bg-[#c8102e] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#a00d24]
                ${isGuided ? "ring-4 ring-blue-400 ring-offset-2" : ""}`}>
                            Transfer →
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Transfer Success
    return (
        <div className="max-w-lg mx-auto mt-8 p-4">
            <div className="bg-white border-2 border-green-200 rounded-xl p-8 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Transfer Successful!</h3>
                <p className="text-gray-600 mb-4">(This is a practice transfer — no real money moved)</p>
                <div className="bg-green-50 rounded-xl p-4 text-left text-sm space-y-1 mb-6">
                    <p><strong>To:</strong> {transferTo}</p>
                    <p><strong>Amount:</strong> ${parseFloat(transferAmt || "0").toFixed(2)}</p>
                    <p><strong>Ref:</strong> DBS-{Math.floor(Math.random() * 900000 + 100000)}</p>
                </div>
                <button onClick={() => onComplete(score, 100, errors)} className="btn-primary">✅ Complete Module</button>
            </div>
        </div>
    );
}
