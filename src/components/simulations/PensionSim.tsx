"use client";
import { useState } from "react";
import { validateLogin, FAKE_CPF, FAKE_CREDENTIALS } from "@/lib/credentials";
import type { FakeUser } from "@/lib/credentials";

interface Props {
  isGuided: boolean;
  onComplete: (score: number, errors: number) => void;
  onSpeak: (text: string) => void;
}

type Step = "landing" | "login" | "overview" | "statement" | "history";

export default function PensionSim({ isGuided, onComplete, onSpeak }: Props) {
  const [step, setStep] = useState<Step>("landing");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggedInUser, setLoggedInUser] = useState<FakeUser | null>(null);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);

  const addScore = (pts: number) => setScore(s => s + pts);
  const addError = () => setErrors(e => e + 1);

  const handleLogin = () => {
    const user = validateLogin(username, password);
    if (user) {
      setLoggedInUser(user);
      setLoginError("");
      addScore(20);
      setStep("overview");
      onSpeak("Login successful! You can now view your CPF balances.");
    } else {
      setLoginError("Invalid credentials. Check the hint card.");
      addError();
    }
  };

  const handleLogout = () => {
    addScore(10);
    onComplete(score + 10, errors);
  };

  if (step === "landing") {
    return (
      <div className="w-full">
        <div className="bg-gradient-to-b from-[#0d47a1] to-[#1565c0] rounded-t-xl p-6 text-white text-center">
          <div className="flex items-center justify-center gap-3 mb-1">
            <span className="text-4xl">💰</span>
            <div>
              <h2 className="text-2xl font-bold">CPF Board</h2>
              <p className="text-blue-200 text-sm">Practice Pension Portal</p>
            </div>
          </div>
          <div className="bg-yellow-400/20 text-yellow-200 text-xs px-4 py-1.5 rounded-full inline-block mt-2">
            🛡️ SAFE PRACTICE MODE — This is not the real CPF website
          </div>
        </div>
        <div className="bg-white rounded-b-xl p-8 border border-t-0 border-gray-200 text-center">
          <p className="text-gray-500 mb-6">Check your CPF balances and statements safely</p>
          <button
            onClick={() => { setStep("login"); addScore(10); onSpeak("Enter your practice login credentials."); }}
            className={`btn-primary text-lg px-10 ${isGuided ? "ring-4 ring-cool-sky/40 relative" : ""}`}
          >
            {isGuided && <span className="absolute -top-3 -right-3 text-2xl hand-pointer">👆</span>}
            🔐 Login to My CPF
          </button>
          {isGuided && (
            <div className="mt-6 bg-honeydew rounded-xl p-4 text-left text-sm">
              <p className="font-bold text-french-blue mb-1">📝 Guided Instruction:</p>
              <p className="text-gray-700">Click &quot;Login to My CPF&quot; to start.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (step === "login") {
    return (
      <div className="w-full">
        <div className="bg-[#1565c0] rounded-t-xl p-4 text-white flex items-center gap-2">
          <span className="text-xl">💰</span>
          <span className="font-bold">CPF Board — Login</span>
          <span className="text-xs bg-yellow-400/20 text-yellow-200 px-2 py-0.5 rounded-full ml-auto">PRACTICE</span>
        </div>
        <div className="bg-white rounded-b-xl p-8 border border-t-0 border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Sign In to CPF Online</h3>
          {loginError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-red-700 text-sm">⚠️ {loginError}</div>
          )}
          <div className="space-y-4 max-w-md mx-auto">
            <div>
              <label htmlFor="cpf-user" className="block text-sm font-semibold text-gray-700 mb-1.5">CPF Username</label>
              <input id="cpf-user" type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className={`w-full p-4 rounded-xl border-2 text-base min-h-[48px] ${isGuided && !username ? "border-cool-sky bg-cool-sky/5" : "border-gray-200"} focus:border-french-blue focus:outline-none`}
              />
            </div>
            <div>
              <label htmlFor="cpf-pass" className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <input id="cpf-pass" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={`w-full p-4 rounded-xl border-2 text-base min-h-[48px] ${isGuided && username && !password ? "border-cool-sky bg-cool-sky/5" : "border-gray-200"} focus:border-french-blue focus:outline-none`}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>
            <button onClick={handleLogin}
              className={`w-full btn-primary text-lg ${isGuided && username && password ? "ring-4 ring-cool-sky/40 relative" : ""}`}
            >
              {isGuided && username && password && <span className="absolute -top-3 -right-3 text-2xl hand-pointer">👆</span>}
              Sign In
            </button>
          </div>
          {isGuided && (
            <div className="mt-6 bg-honeydew rounded-xl p-4 text-sm max-w-md mx-auto">
              <p className="font-bold text-french-blue mb-2">💡 Practice Credentials:</p>
              <div className="bg-white rounded-lg p-3 font-mono text-xs">
                <p><span className="text-gray-500">User →</span> <strong>margaret.chen</strong> / <strong>Safe2026!</strong></p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const user = loggedInUser || FAKE_CREDENTIALS.user;

  if (step === "overview") {
    return (
      <div className="w-full">
        <div className="bg-[#1565c0] rounded-t-xl p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">💰</span>
            <span className="font-bold">My CPF</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm">👤 {user.fullName.split(" ")[0]}</span>
            <button onClick={handleLogout}
              className={`bg-red-500/80 hover:bg-red-500 text-white text-sm px-4 py-2 rounded-lg min-h-[40px]
                ${isGuided ? "ring-2 ring-yellow-300" : ""}`}>
              Logout
            </button>
          </div>
        </div>
        <div className="bg-gray-50 rounded-b-xl border border-t-0 border-gray-200">
          {/* Total balance */}
          <div className="bg-white p-6 border-b text-center">
            <p className="text-sm text-gray-500">Total CPF Balance</p>
            <p className="text-4xl font-bold text-french-blue">${FAKE_CPF.totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
            <p className="text-xs text-gray-400 mt-1">As of 20 Feb 2026</p>
          </div>

          {/* Account breakdown */}
          <div className="p-6 grid grid-cols-2 gap-4">
            {[
              { label: "Ordinary Account (OA)", value: FAKE_CPF.ordinaryAccount, color: "bg-blue-100 text-blue-800" },
              { label: "Special Account (SA)", value: FAKE_CPF.specialAccount, color: "bg-purple-100 text-purple-800" },
              { label: "MediSave Account (MA)", value: FAKE_CPF.medisaveAccount, color: "bg-green-100 text-green-800" },
              { label: "Retirement Account (RA)", value: FAKE_CPF.retirementAccount, color: "bg-orange-100 text-orange-800" },
            ].map((acc) => (
              <div key={acc.label} className={`rounded-xl p-4 ${acc.color}`}>
                <p className="text-xs font-medium opacity-80">{acc.label}</p>
                <p className="text-xl font-bold">${acc.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="px-6 pb-6 flex flex-wrap gap-3">
            <button onClick={() => { setStep("statement"); addScore(10); onSpeak("Here are your CPF contribution statements."); }}
              className={`flex-1 p-4 rounded-xl border-2 text-left transition-all min-h-[48px]
                ${isGuided ? "border-cool-sky bg-cool-sky/5 hover:bg-cool-sky/10" : "border-gray-200 hover:border-blue-400 bg-white"}`}>
              <p className="font-bold text-gray-800">📋 My Statement</p>
              <p className="text-xs text-gray-500">View contribution history</p>
            </button>
            <button onClick={() => { setStep("history"); addScore(10); onSpeak("Here is your transaction history."); }}
              className={`flex-1 p-4 rounded-xl border-2 text-left transition-all min-h-[48px]
                ${!isGuided ? "border-gray-200 hover:border-blue-400 bg-white" : "border-gray-200 bg-white"}`}>
              <p className="font-bold text-gray-800">📊 Transaction History</p>
              <p className="text-xs text-gray-500">Recent transactions</p>
            </button>
          </div>

          {isGuided && (
            <div className="mx-6 mb-6 bg-honeydew rounded-xl p-4 text-sm">
              <p className="font-bold text-french-blue mb-1">📝 Guided Instruction:</p>
              <p className="text-gray-700">Look at your CPF balances above. Click &quot;My Statement&quot; or explore the dashboard. Click &quot;Logout&quot; when done.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (step === "statement") {
    return (
      <div className="w-full">
        <div className="bg-[#1565c0] rounded-t-xl p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2"><span className="text-xl">💰</span><span className="font-bold">My CPF — Statement</span></div>
          <button onClick={handleLogout} className="bg-red-500/80 hover:bg-red-500 text-white text-sm px-4 py-2 rounded-lg">Logout</button>
        </div>
        <div className="bg-white rounded-b-xl p-6 border border-t-0 border-gray-200">
          <button onClick={() => setStep("overview")} className="text-cool-sky hover:underline text-sm mb-4 inline-block">← Back to Overview</button>
          <h3 className="text-xl font-bold text-gray-800 mb-4">📋 CPF Contribution Statement</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead><tr className="border-b-2 border-gray-200">
                <th className="py-2 px-3 text-gray-500">Month</th>
                <th className="py-2 px-3 text-gray-500">Employer</th>
                <th className="py-2 px-3 text-gray-500">Employee</th>
                <th className="py-2 px-3 text-gray-500">Total</th>
              </tr></thead>
              <tbody>
                {FAKE_CPF.contributions.map((c) => (
                  <tr key={c.month} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                    <td className="py-3 px-3 font-medium">{c.month}</td>
                    <td className="py-3 px-3 text-green-700">${c.employer.toFixed(2)}</td>
                    <td className="py-3 px-3 text-green-700">${c.employee.toFixed(2)}</td>
                    <td className="py-3 px-3 font-bold text-french-blue">${c.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // History
  return (
    <div className="w-full">
      <div className="bg-[#1565c0] rounded-t-xl p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-2"><span className="text-xl">💰</span><span className="font-bold">My CPF — History</span></div>
        <button onClick={handleLogout} className="bg-red-500/80 hover:bg-red-500 text-white text-sm px-4 py-2 rounded-lg">Logout</button>
      </div>
      <div className="bg-white rounded-b-xl p-6 border border-t-0 border-gray-200">
        <button onClick={() => setStep("overview")} className="text-cool-sky hover:underline text-sm mb-4 inline-block">← Back to Overview</button>
        <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Transaction History</h3>
        <div className="space-y-3">
          {FAKE_CPF.contributions.map((c) => (
            <div key={c.month} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-semibold text-gray-800">{c.month}</p>
                <p className="text-xs text-gray-500">Monthly Contribution</p>
              </div>
              <span className="font-bold text-green-600">+${c.total.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <button onClick={() => onComplete(score, errors)} className="btn-primary mt-6 w-full">✅ Complete Module</button>
      </div>
    </div>
  );
}
