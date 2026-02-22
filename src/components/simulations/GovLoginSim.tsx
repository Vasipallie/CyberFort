"use client";

import { useState } from "react";

interface Props {
    mode: "guided" | "independent";
    onComplete: (score: number, maxScore: number, errors: number) => void;
    onError: () => void;
}

type Step = "landing" | "login" | "2fa" | "dashboard" | "profile";

export default function GovLoginSim({ mode, onComplete, onError }: Props) {
    const [step, setStep] = useState<Step>("landing");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [code2fa, setCode2fa] = useState("");
    const [error2fa, setError2fa] = useState("");
    const [score, setScore] = useState(0);
    const [errors, setErrors] = useState(0);
    const [showProfile, setShowProfile] = useState(false);

    const isGuided = mode === "guided";

    const handleLogin = () => {
        if (username.trim() && password.trim()) {
            setScore((s) => s + 30);
            setStep("2fa");
            setLoginError("");
        } else {
            setLoginError("Please enter your user ID and password.");
            setErrors((e) => e + 1);
            onError();
        }
    };

    const handle2FA = () => {
        if (code2fa.replace(/\D/g, "").length >= 4) {
            setScore((s) => s + 30);
            setStep("dashboard");
            setError2fa("");
        } else {
            setError2fa("Incorrect code. Please try again.");
            setErrors((e) => e + 1);
            onError();
        }
    };

    const handleLogout = () => {
        setScore((s) => s + 20);
        onComplete(score + 20, 100, errors);
    };

    // Landing (practice government portal)
    if (step === "landing") {
        return (
            <div className="max-w-lg mx-auto mt-8 p-4">
                <div className="bg-[#c41f30] text-white p-6 rounded-t-xl">
                    <div className="flex items-center gap-3">
                        <div className="bg-white rounded p-2">
                            <span className="text-[#c41f30] font-black text-xl">GP</span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Government Portal</h2>
                            <p className="text-sm text-red-200">Practice Government Portal</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-b-xl p-8 text-center">
                    <h3 className="text-xl font-bold text-foreground mb-4">
                        Welcome to the Government Services Portal
                    </h3>
                    <p className="text-gray-600 mb-8">Access your government services securely</p>

                    {isGuided && (
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6 text-left">
                            <p className="text-sm text-blue-800 font-medium">
                                📝 <strong>Guided Instruction:</strong><br />
                                Click the &quot;Log In&quot; button to proceed to the login page.
                            </p>
                        </div>
                    )}

                    <button
                        onClick={() => { setScore((s) => s + 20); setStep("login"); }}
                        className={`w-full bg-[#c41f30] text-white py-4 rounded-xl font-bold text-lg
                       hover:bg-[#a01828] transition-all min-h-[56px]
                       ${isGuided ? "ring-4 ring-blue-400 ring-offset-2 animate-pulse" : ""}`}
                    >
                        Log In
                    </button>

                    {isGuided && (
                        <div className="mt-4 text-2xl hand-pointer">👆</div>
                    )}
                </div>

                <div className="mt-4 bg-amber-50 border-2 border-amber-200 rounded-xl p-3 text-center">
                    <span className="text-sm font-bold text-amber-800">
                        ⚠️ PRACTICE MODE — Not the real SingPass website
                    </span>
                </div>
            </div>
        );
    }

    // Login Form
    if (step === "login") {
        return (
            <div className="max-w-lg mx-auto mt-8 p-4">
                <div className="bg-[#c41f30] text-white p-4 rounded-t-xl flex items-center gap-3">
                    <div className="bg-white rounded p-1.5">
                        <span className="text-[#c41f30] font-black text-lg">GP</span>
                    </div>
                    <span className="font-bold text-lg">Government Login</span>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-b-xl p-8">
                    <h3 className="text-xl font-bold text-foreground mb-6">Sign In to Your Account</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">User ID</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your user ID"
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-lg
                         focus:border-[#c41f30] focus:outline-none min-h-[48px]"
                                aria-label="User ID"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-lg
                         focus:border-[#c41f30] focus:outline-none min-h-[48px]"
                                aria-label="Password"
                                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                            />
                        </div>

                        {loginError && (
                            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 text-sm text-red-700">
                                {loginError}<br />
                                <span className="text-xs">Don&apos;t worry — this is just practice!</span>
                            </div>
                        )}

                        <button
                            onClick={handleLogin}
                            className={`w-full bg-[#c41f30] text-white py-4 rounded-xl font-bold text-lg
                         hover:bg-[#a01828] transition-all min-h-[56px]
                         ${isGuided ? "ring-4 ring-blue-400 ring-offset-2" : ""}`}
                        >
                            Sign In
                        </button>
                    </div>

                    {/* Guided hints do not reveal repository secrets or real credentials. */}
                </div>
            </div>
        );
    }

    // 2FA
    if (step === "2fa") {
        return (
            <div className="max-w-lg mx-auto mt-8 p-4">
                <div className="bg-[#c41f30] text-white p-4 rounded-t-xl flex items-center gap-3">
                    <div className="bg-white rounded p-1.5">
                        <span className="text-[#c41f30] font-black text-lg">SP</span>
                    </div>
                    <span className="font-bold text-lg">Two-Factor Authentication</span>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-b-xl p-8 text-center">
                    <div className="text-4xl mb-4">📱</div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Two-Factor Authentication</h3>
                    <p className="text-gray-600 mb-6 text-sm">
                        A 6-digit verification code has been sent to your device.
                    </p>

                    <input
                        type="text"
                        value={code2fa}
                        onChange={(e) => setCode2fa(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        placeholder="Enter 6-digit code"
                        className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 text-2xl text-center
                     tracking-[0.5em] font-mono focus:border-[#c41f30] focus:outline-none"
                        maxLength={6}
                        aria-label="Two-factor authentication code"
                        onKeyDown={(e) => e.key === "Enter" && handle2FA()}
                    />

                    {error2fa && (
                        <div className="mt-4 bg-red-50 border-2 border-red-200 rounded-xl p-3 text-sm text-red-700">
                            {error2fa}
                        </div>
                    )}

                    <button
                        onClick={handle2FA}
                        className={`w-full mt-6 bg-[#c41f30] text-white py-4 rounded-xl font-bold text-lg
                       hover:bg-[#a01828] transition-all min-h-[56px]
                       ${isGuided ? "ring-4 ring-blue-400 ring-offset-2" : ""}`}
                    >
                        Verify
                    </button>

                    <p className="mt-4 text-sm text-gray-500">
                        Didn&apos;t receive the code? <button className="text-[#c41f30] hover:underline">Resend</button>
                    </p>

                    {/* Guided hints should not display secret codes. */}
                </div>
            </div>
        );
    }

    // Dashboard
    if (step === "dashboard" && !showProfile) {
        const dashCards = [
            { label: "CPF Balance", value: "$204,500", icon: "💰" },
            { label: "Health Records", value: "Up to date", icon: "🏥" },
            { label: "Tax Filing", value: "Due: 18 Apr", icon: "📋" },
            { label: "HDB Services", value: "Active", icon: "🏠" },
        ];

        const notifications = [
            { text: "CPF contribution credited — Jan 2026", time: "2 days ago" },
            { text: "Polyclinic appointment confirmed — 24 Feb", time: "5 days ago" },
            { text: "Tax filing period opens — 1 Mar 2026", time: "1 week ago" },
        ];

        return (
            <div className="max-w-4xl mx-auto mt-8 p-4">
                <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-[#c41f30] text-white p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-white rounded p-1.5">
                                <span className="text-[#c41f30] font-black text-lg">SP</span>
                            </div>
                            <span className="font-bold">My Government Dashboard</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowProfile(true)}
                                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm transition-colors"
                            >
                                👤 Profile
                            </button>
                            <button
                                onClick={handleLogout}
                                className={`bg-white text-[#c41f30] px-4 py-2 rounded-xl text-sm font-semibold
                           hover:bg-gray-100 transition-colors
                           ${isGuided ? "ring-4 ring-blue-400 ring-offset-2" : ""}`}
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* Welcome */}
                    <div className="p-6">
                        <h3 className="text-2xl font-bold text-foreground mb-1">
                            Welcome back, {username ? username.split(".")[0] : "Learner"}! 👋
                        </h3>
                        <p className="text-gray-500 text-sm mb-6">Last login: 18 Feb 2026, 10:42 AM</p>

                        {/* Service Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            {dashCards.map((card) => (
                                <div key={card.label} className="bg-gray-50 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors cursor-pointer">
                                    <div className="text-2xl mb-2">{card.icon}</div>
                                    <div className="font-bold text-foreground text-sm">{card.label}</div>
                                    <div className="text-cool-sky text-sm">{card.value}</div>
                                </div>
                            ))}
                        </div>

                        {/* Notifications */}
                        <div className="bg-gray-50 rounded-xl p-6">
                            <h4 className="font-bold text-foreground mb-4">📬 Recent Notifications</h4>
                            <div className="space-y-3">
                                {notifications.map((n, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-white rounded-xl">
                                        <span className="text-sm text-gray-700">{n.text}</span>
                                        <span className="text-xs text-gray-400">{n.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {isGuided && (
                            <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                                <p className="text-sm text-blue-800">
                                    📝 <strong>Guided Instruction:</strong><br />
                                    Explore the dashboard. When you&apos;re ready, click &quot;Logout&quot; in the top-right to complete the module safely.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Profile
    if (showProfile) {
        const profileFields = [
            { label: "Full Name", value: username ? username.replace(/\./g, " ") : "Learner" },
            { label: "NRIC", value: "—" },
            { label: "Date of Birth", value: "—" },
            { label: "Phone", value: "—" },
            { label: "Email", value: "—" },
            { label: "Address", value: "—" },
        ];

        return (
            <div className="max-w-2xl mx-auto mt-8 p-4">
                <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
                    <div className="bg-[#c41f30] text-white p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowProfile(false)}
                                className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-sm"
                            >
                                ← Back
                            </button>
                            <span className="font-bold">My Profile</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-white text-[#c41f30] px-4 py-2 rounded-xl text-sm font-semibold"
                        >
                            Logout
                        </button>
                    </div>

                    <div className="p-6">
                        <h3 className="text-xl font-bold text-foreground mb-6">👤 My Profile</h3>
                        <div className="space-y-4">
                            {profileFields.map((f) => (
                                <div key={f.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                    <span className="text-sm font-semibold text-gray-600">{f.label}</span>
                                    <span className="text-sm text-foreground">{f.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}
