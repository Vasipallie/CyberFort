"use client";
import { useState } from "react";
import { validateLogin, FAKE_2FA_CODE, FAKE_CREDENTIALS } from "@/lib/credentials";
import type { FakeUser } from "@/lib/credentials";

interface Props {
  isGuided: boolean;
  onComplete: (score: number, errors: number) => void;
  onSpeak: (text: string) => void;
}

type Step = "landing" | "login" | "2fa" | "dashboard" | "profile";

export default function GovLoginSim({ isGuided, onComplete, onSpeak }: Props) {
  const [step, setStep] = useState<Step>("landing");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [loginError, setLoginError] = useState("");
  const [otpError, setOtpError] = useState("");
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
      setStep("2fa");
      onSpeak("Great! Login credentials accepted. Now let's verify your identity with a one-time code.");
    } else {
      setLoginError("Invalid username or password. Please try again.");
      addError();
      onSpeak("That's okay — the credentials didn't match. Check the hint card and try again.");
    }
  };

  const handle2FA = () => {
    if (otpCode === FAKE_2FA_CODE) {
      setOtpError("");
      addScore(20);
      setStep("dashboard");
      onSpeak("Two-factor verification successful! You're now on the government portal dashboard.");
    } else {
      setOtpError("Incorrect code. The practice code is shown below.");
      addError();
      onSpeak("That code wasn't right. Look at the practice code shown on screen and try again.");
    }
  };

  const handleLogout = () => {
    addScore(10);
    onComplete(score + 10, errors);
  };

  // ── Landing page ──
  if (step === "landing") {
    return (
      <div className="w-full">
        {/* Fake government portal */}
        <div className="bg-gradient-to-b from-[#1a237e] to-[#283593] rounded-t-xl p-6 text-white text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-4xl">🏛️</span>
            <div>
              <h2 className="text-2xl font-bold">SingPass</h2>
              <p className="text-blue-200 text-sm">Practice Government Portal</p>
            </div>
          </div>
          <div className="bg-yellow-400/20 text-yellow-200 text-xs px-4 py-1.5 rounded-full inline-block mt-2">
            🛡️ SAFE PRACTICE MODE — Not a real government website
          </div>
        </div>
        <div className="bg-white rounded-b-xl p-8 border border-t-0 border-gray-200 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Welcome to the Government Services Portal</h3>
          <p className="text-gray-500 mb-6">Access your government services securely</p>
          <button
            onClick={() => { setStep("login"); addScore(10); onSpeak("Good! You've opened the login page. Now enter your username and password."); }}
            className={`btn-primary text-lg px-10 ${isGuided ? "ring-4 ring-cool-sky/40 relative" : ""}`}
          >
            {isGuided && <span className="absolute -top-3 -right-3 text-2xl hand-pointer">👆</span>}
            Log In with SingPass
          </button>

          {isGuided && (
            <div className="mt-6 bg-honeydew rounded-xl p-4 text-left text-sm">
              <p className="font-bold text-french-blue mb-1">📝 Guided Instruction:</p>
              <p className="text-gray-700">Click the &quot;Log In with SingPass&quot; button to proceed to the login page.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Login form ──
  if (step === "login") {
    return (
      <div className="w-full">
        <div className="bg-gradient-to-b from-[#1a237e] to-[#283593] rounded-t-xl p-4 text-white">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏛️</span>
            <span className="font-bold">SingPass Login</span>
            <span className="text-xs bg-yellow-400/20 text-yellow-200 px-2 py-0.5 rounded-full ml-auto">PRACTICE</span>
          </div>
        </div>
        <div className="bg-white rounded-b-xl p-8 border border-t-0 border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Sign In to Your Account</h3>

          {loginError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-red-700 text-sm flex items-start gap-2">
              <span>⚠️</span>
              <div>
                <p className="font-semibold">{loginError}</p>
                <p className="text-xs mt-1">Don&apos;t worry — this is just practice!</p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="gov-user" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Username / NRIC
              </label>
              <input
                id="gov-user"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className={`w-full p-4 rounded-xl border-2 text-base transition-colors min-h-[48px]
                  ${isGuided && !username ? "border-cool-sky bg-cool-sky/5" : "border-gray-200"}
                  focus:border-french-blue focus:outline-none`}
                autoComplete="off"
              />
            </div>
            <div>
              <label htmlFor="gov-pass" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="gov-pass"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`w-full p-4 pr-14 rounded-xl border-2 text-base transition-colors min-h-[48px]
                    ${isGuided && username && !password ? "border-cool-sky bg-cool-sky/5" : "border-gray-200"}
                    focus:border-french-blue focus:outline-none`}
                  autoComplete="off"
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 text-sm p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button
              onClick={handleLogin}
              className={`w-full btn-primary text-lg ${isGuided && username && password ? "ring-4 ring-cool-sky/40 relative" : ""}`}
            >
              {isGuided && username && password && <span className="absolute -top-3 -right-3 text-2xl hand-pointer">👆</span>}
              Sign In
            </button>

            <div className="flex items-center justify-between text-sm text-gray-400">
              <button className="hover:text-gray-600">Forgot password?</button>
              <button className="hover:text-gray-600">Need help?</button>
            </div>
          </div>

          {isGuided && (
            <div className="mt-6 bg-honeydew rounded-xl p-4 text-sm">
              <p className="font-bold text-french-blue mb-2">💡 Practice Credentials:</p>
              <div className="bg-white rounded-lg p-3 space-y-1 font-mono text-xs">
                <p><span className="text-gray-500">User →</span> <strong>margaret.chen</strong> / <strong>Safe2026!</strong></p>
                <p><span className="text-gray-500">Admin →</span> <strong>admin.safedigital</strong> / <strong>Admin2026!</strong></p>
              </div>
              <p className="mt-2 text-gray-600">Type the username and password above, then click &quot;Sign In&quot;.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── 2FA Verification ──
  if (step === "2fa") {
    return (
      <div className="w-full">
        <div className="bg-gradient-to-b from-[#1a237e] to-[#283593] rounded-t-xl p-4 text-white">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏛️</span>
            <span className="font-bold">SingPass — 2FA Verification</span>
            <span className="text-xs bg-green-400/20 text-green-200 px-2 py-0.5 rounded-full ml-auto">✓ Login OK</span>
          </div>
        </div>
        <div className="bg-white rounded-b-xl p-8 border border-t-0 border-gray-200 text-center">
          <div className="text-5xl mb-4">🔐</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Two-Factor Authentication</h3>
          <p className="text-gray-500 mb-6">
            A 6-digit verification code has been sent to your phone ending in ****{loggedInUser?.phone.slice(-4)}
          </p>

          {otpError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-red-700 text-sm">
              ⚠️ {otpError}
            </div>
          )}

          <div className="max-w-xs mx-auto">
            <input
              type="text"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="Enter 6-digit code"
              maxLength={6}
              className={`w-full p-4 rounded-xl border-2 text-center text-2xl tracking-[0.5em] font-mono transition-colors min-h-[48px]
                ${isGuided && !otpCode ? "border-cool-sky bg-cool-sky/5" : "border-gray-200"}
                focus:border-french-blue focus:outline-none`}
              onKeyDown={(e) => e.key === "Enter" && handle2FA()}
            />
            <button
              onClick={handle2FA}
              className={`w-full btn-primary text-lg mt-4 ${isGuided && otpCode.length === 6 ? "ring-4 ring-cool-sky/40 relative" : ""}`}
            >
              {isGuided && otpCode.length === 6 && <span className="absolute -top-3 -right-3 text-2xl hand-pointer">👆</span>}
              Verify
            </button>
          </div>

          <p className="text-sm text-gray-400 mt-4">
            Didn&apos;t receive the code? <button className="text-cool-sky hover:underline">Resend</button>
          </p>

          {isGuided && (
            <div className="mt-6 bg-honeydew rounded-xl p-4 text-sm text-left">
              <p className="font-bold text-french-blue mb-1">💡 Practice 2FA Code:</p>
              <p className="font-mono text-2xl text-center font-bold text-french-blue tracking-[0.5em] my-2">{FAKE_2FA_CODE}</p>
              <p className="text-gray-600">Type this code into the box above, then click &quot;Verify&quot;.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Dashboard ──
  if (step === "dashboard") {
    const user = loggedInUser || FAKE_CREDENTIALS.user;
    return (
      <div className="w-full">
        <div className="bg-gradient-to-r from-[#1a237e] to-[#283593] rounded-t-xl p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏛️</span>
            <span className="font-bold">MyGov Portal</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm">👤 {user.fullName}</span>
            <button
              onClick={handleLogout}
              className={`bg-red-500/80 hover:bg-red-500 text-white text-sm px-4 py-2 rounded-lg transition-colors min-h-[40px]
                ${isGuided ? "ring-2 ring-yellow-300 relative" : ""}`}
            >
              {isGuided && <span className="absolute -top-2 -right-2 text-lg hand-pointer">👆</span>}
              Logout
            </button>
          </div>
        </div>
        <div className="bg-gray-50 rounded-b-xl border border-t-0 border-gray-200">
          {/* Welcome banner */}
          <div className="bg-white p-6 border-b">
            <h3 className="text-xl font-bold text-gray-800">
              Welcome back, {user.fullName.split(" ")[0]}! 👋
            </h3>
            <p className="text-gray-500 text-sm">Last login: 18 Feb 2026, 10:42 AM</p>
          </div>

          {/* Quick access cards */}
          <div className="p-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "💰", label: "CPF Balance", value: "$204,500.00" },
              { icon: "🏥", label: "Next Appointment", value: "24 Feb 2026" },
              { icon: "📋", label: "Pending Actions", value: "2 items" },
              { icon: "📄", label: "Documents", value: "12 files" },
            ].map((card) => (
              <button
                key={card.label}
                onClick={() => { if (card.label === "CPF Balance") { setStep("profile"); addScore(10); } }}
                className="bg-white rounded-xl p-4 text-left shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <span className="text-2xl">{card.icon}</span>
                <p className="text-xs text-gray-500 mt-2">{card.label}</p>
                <p className="font-bold text-french-blue text-sm">{card.value}</p>
              </button>
            ))}
          </div>

          {/* Notifications */}
          <div className="px-6 pb-6">
            <h4 className="font-bold text-gray-700 mb-3">📬 Recent Notifications</h4>
            <div className="space-y-2">
              {[
                { text: "Your CPF Annual Statement for 2025 is ready", time: "2 days ago", read: false },
                { text: "Appointment confirmed: Dr. Sarah Tan — 24 Feb", time: "3 days ago", read: true },
                { text: "Tax filing deadline reminder: 18 Apr 2026", time: "1 week ago", read: true },
              ].map((n, i) => (
                <div key={i} className={`flex items-start gap-3 p-3 rounded-lg text-sm ${n.read ? "bg-white" : "bg-blue-50 border border-blue-100"}`}>
                  <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.read ? "bg-gray-300" : "bg-blue-500"}`} />
                  <div className="flex-1">
                    <p className="text-gray-700">{n.text}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {isGuided && (
            <div className="mx-6 mb-6 bg-honeydew rounded-xl p-4 text-sm">
              <p className="font-bold text-french-blue mb-1">📝 Guided Instruction:</p>
              <p className="text-gray-700">Explore the dashboard. When you&apos;re ready, click &quot;Logout&quot; in the top-right to complete the module safely.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Profile / CPF detail ──
  const user = loggedInUser || FAKE_CREDENTIALS.user;
  return (
    <div className="w-full">
      <div className="bg-gradient-to-r from-[#1a237e] to-[#283593] rounded-t-xl p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏛️</span>
          <span className="font-bold">MyGov Portal</span>
          <span className="text-xs text-blue-200">/ My Profile</span>
        </div>
        <button onClick={handleLogout} className="bg-red-500/80 hover:bg-red-500 text-white text-sm px-4 py-2 rounded-lg">Logout</button>
      </div>
      <div className="bg-white rounded-b-xl border border-t-0 border-gray-200 p-6">
        <button onClick={() => setStep("dashboard")} className="text-cool-sky hover:underline text-sm mb-4 inline-block">← Back to Dashboard</button>
        <h3 className="text-xl font-bold text-gray-800 mb-4">👤 My Profile</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Full Name", value: user.fullName },
            { label: "NRIC", value: user.nric },
            { label: "Date of Birth", value: user.dob },
            { label: "Email", value: user.email },
            { label: "Phone", value: user.phone },
            { label: "Address", value: user.address },
          ].map((f) => (
            <div key={f.label} className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-0.5">{f.label}</p>
              <p className="font-semibold text-gray-800 text-sm">{f.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
