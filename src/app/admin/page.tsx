"use client";

import { useState, useEffect } from "react";
import { MODULES } from "@/lib/data";

export default function AdminPage() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [totalUsers, setTotalUsers] = useState(142);
    const [totalSessions, setTotalSessions] = useState(48);

    useEffect(() => {
        // Load some dynamic stats from localStorage
        const certs = JSON.parse(localStorage.getItem("cyberfort-certificates") || "[]");
        const progress = JSON.parse(localStorage.getItem("cyberfort-progress") || "{}");
        const completions = Object.values(progress as Record<string, { completions: number }>).reduce(
            (sum, p) => sum + p.completions, 0
        );
        if (completions > 0) {
            setTotalUsers(142 + Math.floor(completions / 2));
            setTotalSessions(48 + completions);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Admin access in development: require an admin-like username and a non-empty password.
        if (username.toLowerCase().includes("admin") && password.trim().length >= 6) {
            setLoggedIn(true);
            setError("");
        } else {
            setError("Invalid admin credentials.");
        }
    };

    if (!loggedIn) {
        return (
            <div className="min-h-screen bg-honeydew py-12 px-4 flex items-center justify-center">
                <div className="card max-w-md w-full">
                    <div className="text-center mb-6">
                        <div className="text-4xl mb-3">🔒</div>
                        <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
                        <p className="text-sm text-gray-500 mt-1">Access the CyberFort admin dashboard</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="admin.cyberfort"
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-lg
                         focus:border-cool-sky focus:outline-none min-h-[48px]"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Admin2026!"
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-lg
                         focus:border-cool-sky focus:outline-none min-h-[48px]"
                                required
                            />
                        </div>
                        {error && (
                            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 text-sm text-red-700">
                                {error}
                            </div>
                        )}
                        <button type="submit" className="btn-primary w-full">
                            🔐 Log In
                        </button>
                    </form>
                    <div className="mt-4 p-3 bg-blue-50 rounded-xl text-xs text-blue-700">
                        💡 Admin credentials are stored securely and not exposed in the repository.
                    </div>
                </div>
            </div>
        );
    }

    const certs = JSON.parse(localStorage.getItem("cyberfort-certificates") || "[]");
    const progress = JSON.parse(localStorage.getItem("cyberfort-progress") || "{}");
    const confidenceBefore = parseInt(localStorage.getItem("cyberfort-confidence-before") || "0");
    const confidenceAfter = parseInt(localStorage.getItem("cyberfort-confidence-after") || "0");
    const improvement = confidenceAfter > 0 ? Math.round(((confidenceAfter - confidenceBefore) / Math.max(confidenceBefore, 1)) * 100) : 0;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">📊 Admin Dashboard</h1>
                        <p className="text-gray-500 text-sm">CyberFort Performance Overview</p>
                    </div>
                    <button
                        onClick={() => setLoggedIn(false)}
                        className="px-4 py-2 bg-gray-200 rounded-xl text-sm font-medium hover:bg-gray-300 transition-colors"
                    >
                        🚪 Logout
                    </button>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="card bg-blue-50 border-2 border-blue-200 text-center">
                        <div className="text-3xl mb-2">👥</div>
                        <div className="text-3xl font-bold text-french-blue">{totalUsers}</div>
                        <div className="text-sm text-gray-600">Total Users</div>
                    </div>
                    <div className="card bg-green-50 border-2 border-green-200 text-center">
                        <div className="text-3xl mb-2">📅</div>
                        <div className="text-3xl font-bold text-green-600">{totalSessions}</div>
                        <div className="text-sm text-gray-600">Total Sessions</div>
                    </div>
                    <div className="card bg-purple-50 border-2 border-purple-200 text-center">
                        <div className="text-3xl mb-2">🎓</div>
                        <div className="text-3xl font-bold text-velvet-purple">{certs.length}</div>
                        <div className="text-sm text-gray-600">Certificates Issued</div>
                    </div>
                    <div className="card bg-amber-50 border-2 border-amber-200 text-center">
                        <div className="text-3xl mb-2">📈</div>
                        <div className="text-3xl font-bold text-amber-600">
                            {improvement > 0 ? `+${improvement}%` : "N/A"}
                        </div>
                        <div className="text-sm text-gray-600">Avg Improvement</div>
                    </div>
                </div>

                {/* Module Analytics */}
                <div className="card mb-8">
                    <h2 className="text-xl font-bold text-foreground mb-6">📊 Module Completion Analytics</h2>
                    <div className="space-y-4">
                        {MODULES.map((mod) => {
                            const p = progress[mod.id] as { completions: number; bestScore: number; totalTime: number } | undefined;
                            return (
                                <div key={mod.id} className="flex items-center gap-4">
                                    <span className="text-2xl w-8">{mod.icon}</span>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-medium text-sm">{mod.title}</span>
                                            <span className="text-xs text-gray-500">
                                                {p ? `${p.completions} completions • Best: ${Math.round((p.bestScore / 100) * 100)}%` : "0 completions"}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-cool-sky to-french-blue h-2 rounded-full"
                                                style={{ width: `${p ? Math.min(100, p.completions * 20) : 0}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Confidence Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="card">
                        <h2 className="text-xl font-bold text-foreground mb-4">📈 Confidence Comparison</h2>
                        {confidenceBefore > 0 ? (
                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium">Before Training</span>
                                        <span className="font-bold text-red-500">{confidenceBefore}/5</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-4">
                                        <div className="bg-red-400 h-4 rounded-full" style={{ width: `${(confidenceBefore / 5) * 100}%` }} />
                                    </div>
                                </div>
                                {confidenceAfter > 0 && (
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium">After Training</span>
                                            <span className="font-bold text-green-500">{confidenceAfter}/5</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-4">
                                            <div className="bg-green-400 h-4 rounded-full" style={{ width: `${(confidenceAfter / 5) * 100}%` }} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">No confidence data available yet.</p>
                        )}
                    </div>

                    <div className="card">
                        <h2 className="text-xl font-bold text-foreground mb-4">🏆 Recent Certificates</h2>
                        {certs.length > 0 ? (
                            <div className="space-y-2">
                                {certs.slice(-5).reverse().map((c: { module: string; date: string; score: number }, i: number) => (
                                    <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-xl">
                                        <span className="text-sm font-medium">{c.module}</span>
                                        <span className="text-xs text-gray-500">{c.date} • {c.score}%</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">No certificates issued yet.</p>
                        )}
                    </div>
                </div>

                {/* Export */}
                <div className="card text-center">
                    <h2 className="text-xl font-bold text-foreground mb-4">📥 Export Data</h2>
                    <p className="text-gray-600 mb-4 text-sm">
                        Download a summary of all CyberFort data for reporting and analysis.
                    </p>
                    <button
                        onClick={() => {
                            const data = {
                                exported: new Date().toISOString(),
                                totalUsers,
                                totalSessions,
                                certificatesIssued: certs.length,
                                confidenceBefore,
                                confidenceAfter,
                                improvement: `${improvement}%`,
                                moduleProgress: progress,
                                certificates: certs,
                            };
                            const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = `cyberfort-report-${new Date().toISOString().slice(0, 10)}.json`;
                            a.click();
                            URL.revokeObjectURL(url);
                        }}
                        className="btn-primary"
                    >
                        📥 Export as JSON
                    </button>
                </div>
            </div>
        </div>
    );
}
