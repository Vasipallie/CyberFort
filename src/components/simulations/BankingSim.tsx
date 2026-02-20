"use client";
import { useState } from "react";
import { validateLogin, FAKE_BANK } from "@/lib/credentials";
import type { FakeUser } from "@/lib/credentials";

interface Props {
  isGuided: boolean;
  onComplete: (score: number, errors: number) => void;
  onSpeak: (text: string) => void;
}

type Step = "landing" | "login" | "dashboard" | "transfer" | "confirm" | "receipt" | "history";

export default function BankingSim({ isGuided, onComplete, onSpeak }: Props) {
  const [step, setStep] = useState<Step>("landing");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggedInUser, setLoggedInUser] = useState<FakeUser | null>(null);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  // Transfer fields
  const [recipient, setRecipient] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [transferNote, setTransferNote] = useState("");

  const addScore = (pts: number) => setScore(s => s + pts);
  const addError = () => setErrors(e => e + 1);

  const handleLogin = () => {
    const user = validateLogin(username, password);
    if (user) {
      setLoggedInUser(user);
      setLoginError("");
      addScore(20);
      setStep("dashboard");
      onSpeak("Welcome to SafeBank! Your account dashboard is now showing.");
    } else {
      setLoginError("Invalid credentials. Please try again.");
      addError();
    }
  };

  const handleTransferSubmit = () => {
    if (!recipient.trim()) { addError(); return; }
    const amt = parseFloat(transferAmount);
    if (isNaN(amt) || amt <= 0 || amt > FAKE_BANK.balance) {
      addError();
      return;
    }
    addScore(15);
    setStep("confirm");
    onSpeak("Review your transfer details carefully before confirming.");
  };

  const handleConfirmTransfer = () => {
    addScore(15);
    setStep("receipt");
    onSpeak("Transfer complete! Always check your receipt. Click Logout when done.");
  };

  const handleLogout = () => {
    addScore(10);
    onComplete(score + 10, errors);
  };

  // ----------- Landing -----------
  if (step === "landing") {
    return (
      <div className="w-full">
        <div className="bg-gradient-to-b from-[#1a237e] to-[#283593] rounded-t-xl p-6 text-white text-center">
          <div className="flex items-center justify-center gap-3 mb-1">
            <span className="text-4xl">🏦</span>
            <div>
              <h2 className="text-2xl font-bold">SafeBank Online</h2>
              <p className="text-indigo-200 text-sm">Practice Internet Banking</p>
            </div>
          </div>
          <div className="bg-yellow-400/20 text-yellow-200 text-xs px-4 py-1.5 rounded-full inline-block mt-2">
            🛡️ SAFE PRACTICE MODE — No real money is involved
          </div>
        </div>
        <div className="bg-white rounded-b-xl p-8 border border-t-0 border-gray-200 text-center">
          <p className="text-gray-500 mb-6">Learn to use internet banking safely</p>
          <button
            onClick={() => { setStep("login"); addScore(10); onSpeak("Enter your practice banking login."); }}
            className={`btn-primary text-lg px-10 ${isGuided ? "ring-4 ring-cool-sky/40 relative" : ""}`}
          >
            {isGuided && <span className="absolute -top-3 -right-3 text-2xl hand-pointer">👆</span>}
            🔐 Log In to SafeBank
          </button>
          {isGuided && (
            <div className="mt-6 bg-honeydew rounded-xl p-4 text-left text-sm">
              <p className="font-bold text-french-blue mb-1">📝 Guided Instruction:</p>
              <p className="text-gray-700">Click the button above to go to the login screen.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ----------- Login -----------
  if (step === "login") {
    return (
      <div className="w-full">
        <div className="bg-[#283593] rounded-t-xl p-4 text-white flex items-center gap-2">
          <span className="text-xl">🏦</span>
          <span className="font-bold">SafeBank — Login</span>
          <span className="text-xs bg-yellow-400/20 text-yellow-200 px-2 py-0.5 rounded-full ml-auto">PRACTICE</span>
        </div>
        <div className="bg-white rounded-b-xl p-8 border border-t-0 border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Internet Banking Login</h3>
          {loginError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-red-700 text-sm">⚠️ {loginError}</div>
          )}
          <div className="space-y-4 max-w-md mx-auto">
            <div>
              <label htmlFor="bank-user" className="block text-sm font-semibold text-gray-700 mb-1.5">Username</label>
              <input id="bank-user" type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className={`w-full p-4 rounded-xl border-2 text-base min-h-[48px]
                  ${isGuided && !username ? "border-cool-sky bg-cool-sky/5" : "border-gray-200"} focus:border-french-blue focus:outline-none`}
              />
            </div>
            <div>
              <label htmlFor="bank-pass" className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input id="bank-pass" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`w-full p-4 rounded-xl border-2 text-base min-h-[48px] pr-16
                   ${isGuided && username && !password ? "border-cool-sky bg-cool-sky/5" : "border-gray-200"} focus:border-french-blue focus:outline-none`}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-sm font-medium py-1 px-2">
                  {showPassword ? "🙈 Hide" : "👁️ Show"}
                </button>
              </div>
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

  const user = loggedInUser || { fullName: "Margaret Chen" };

  // ----------- Dashboard -----------
  if (step === "dashboard") {
    return (
      <div className="w-full">
        <div className="bg-[#283593] rounded-t-xl p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2"><span className="text-xl">🏦</span><span className="font-bold">SafeBank</span></div>
          <div className="flex items-center gap-3">
            <span className="text-sm">👤 {user.fullName.split(" ")[0]}</span>
            <button onClick={handleLogout}
              className={`bg-red-500/80 hover:bg-red-500 text-white text-sm px-4 py-2 rounded-lg min-h-[40px]
                ${isGuided ? "ring-2 ring-yellow-300" : ""}`}>Logout</button>
          </div>
        </div>
        <div className="bg-gray-50 rounded-b-xl border border-t-0 border-gray-200">
          {/* Account overview */}
          <div className="bg-white p-6 border-b">
            <p className="text-sm text-gray-500">{FAKE_BANK.accountType}</p>
            <p className="text-xs text-gray-400 font-mono mb-1">{FAKE_BANK.accountNumber}</p>
            <p className="text-4xl font-bold text-french-blue">${FAKE_BANK.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
            <p className="text-xs text-gray-400 mt-1">Available Balance</p>
          </div>

          {/* Quick actions */}
          <div className="p-6 grid grid-cols-2 gap-4">
            <button onClick={() => { setStep("transfer"); addScore(10); onSpeak("Fill in a transfer form to send money."); }}
              className={`p-4 rounded-xl border-2 text-left transition-all min-h-[48px]
                ${isGuided ? "border-cool-sky bg-cool-sky/5 hover:bg-cool-sky/10 relative" : "border-gray-200 bg-white hover:border-indigo-400"}`}>
              {isGuided && <span className="absolute -top-2 -right-2 text-xl hand-pointer">👆</span>}
              <p className="font-bold text-gray-800">💸 Transfer</p>
              <p className="text-xs text-gray-500">Send money</p>
            </button>
            <button onClick={() => { setStep("history"); addScore(10); onSpeak("Here are your recent transactions."); }}
              className="p-4 rounded-xl border-2 border-gray-200 bg-white text-left hover:border-indigo-400 transition-all min-h-[48px]">
              <p className="font-bold text-gray-800">📜 History</p>
              <p className="text-xs text-gray-500">Recent transactions</p>
            </button>
          </div>

          {isGuided && (
            <div className="mx-6 mb-6 bg-honeydew rounded-xl p-4 text-sm">
              <p className="font-bold text-french-blue mb-1">📝 Guided Instruction:</p>
              <p className="text-gray-700">Try clicking &quot;Transfer&quot; to practice sending money, or &quot;History&quot; to review transactions. Click &quot;Logout&quot; when done.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ----------- Transfer -----------
  if (step === "transfer") {
    return (
      <div className="w-full">
        <div className="bg-[#283593] rounded-t-xl p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2"><span className="text-xl">🏦</span><span className="font-bold">Transfer</span></div>
          <button onClick={handleLogout} className="bg-red-500/80 hover:bg-red-500 text-white text-sm px-4 py-2 rounded-lg">Logout</button>
        </div>
        <div className="bg-white rounded-b-xl p-6 border border-t-0 border-gray-200">
          <button onClick={() => setStep("dashboard")} className="text-cool-sky hover:underline text-sm mb-4 inline-block">← Back to Dashboard</button>
          <h3 className="text-xl font-bold text-gray-800 mb-4">💸 Fund Transfer</h3>
          <div className="space-y-4 max-w-md">
            <div>
              <label htmlFor="tf-recip" className="block text-sm font-semibold text-gray-700 mb-1.5">Recipient Account</label>
              <input id="tf-recip" type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)}
                placeholder="e.g. 1234-5678-9012"
                className={`w-full p-4 rounded-xl border-2 text-base min-h-[48px]
                  ${isGuided && !recipient ? "border-cool-sky bg-cool-sky/5" : "border-gray-200"} focus:border-french-blue focus:outline-none`}
              />
            </div>
            <div>
              <label htmlFor="tf-amt" className="block text-sm font-semibold text-gray-700 mb-1.5">Amount ($)</label>
              <input id="tf-amt" type="number" value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)}
                placeholder="e.g. 50.00"
                className={`w-full p-4 rounded-xl border-2 text-base min-h-[48px]
                  ${isGuided && recipient && !transferAmount ? "border-cool-sky bg-cool-sky/5" : "border-gray-200"} focus:border-french-blue focus:outline-none`}
              />
            </div>
            <div>
              <label htmlFor="tf-note" className="block text-sm font-semibold text-gray-700 mb-1.5">Note (optional)</label>
              <input id="tf-note" type="text" value={transferNote} onChange={(e) => setTransferNote(e.target.value)}
                placeholder="e.g. Birthday gift"
                className="w-full p-4 rounded-xl border-2 border-gray-200 text-base min-h-[48px] focus:border-french-blue focus:outline-none"
              />
            </div>
            <button onClick={handleTransferSubmit}
              className={`w-full btn-primary text-lg ${isGuided && recipient && transferAmount ? "ring-4 ring-cool-sky/40 relative" : ""}`}>
              {isGuided && recipient && transferAmount && <span className="absolute -top-3 -right-3 text-2xl hand-pointer">👆</span>}
              Review Transfer
            </button>
          </div>
          {isGuided && (
            <div className="mt-6 bg-honeydew rounded-xl p-4 text-sm max-w-md">
              <p className="font-bold text-french-blue mb-1">💡 Try entering:</p>
              <p className="text-gray-700">Recipient: <strong>1234-5678-9012</strong>, Amount: <strong>50</strong></p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ----------- Confirm -----------
  if (step === "confirm") {
    return (
      <div className="w-full">
        <div className="bg-[#283593] rounded-t-xl p-4 text-white flex items-center gap-2">
          <span className="text-xl">🏦</span><span className="font-bold">Confirm Transfer</span>
        </div>
        <div className="bg-white rounded-b-xl p-8 border border-t-0 border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">⚠️ Review Before Confirming</h3>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 max-w-md mx-auto space-y-3">
            <div className="flex justify-between"><span className="text-gray-500">To:</span><span className="font-bold">{recipient}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Amount:</span><span className="font-bold text-french-blue">${parseFloat(transferAmount).toFixed(2)}</span></div>
            {transferNote && <div className="flex justify-between"><span className="text-gray-500">Note:</span><span>{transferNote}</span></div>}
            <div className="flex justify-between"><span className="text-gray-500">From:</span><span>{FAKE_BANK.accountNumber}</span></div>
          </div>
          <div className="flex gap-3 max-w-md mx-auto mt-6">
            <button onClick={() => setStep("transfer")} className="flex-1 btn-secondary py-4 text-lg">← Edit</button>
            <button onClick={handleConfirmTransfer}
              className={`flex-1 btn-primary py-4 text-lg ${isGuided ? "ring-4 ring-cool-sky/40 relative" : ""}`}>
              {isGuided && <span className="absolute -top-3 -right-3 text-2xl hand-pointer">👆</span>}
              ✅ Confirm
            </button>
          </div>
          {isGuided && (
            <div className="mt-6 bg-honeydew rounded-xl p-4 text-sm max-w-md mx-auto">
              <p className="font-bold text-french-blue mb-1">📝 Guided Instruction:</p>
              <p className="text-gray-700">Always review transfer details carefully. Click &quot;Confirm&quot; when ready, or &quot;Edit&quot; to go back.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ----------- Receipt -----------
  if (step === "receipt") {
    return (
      <div className="w-full">
        <div className="bg-[#283593] rounded-t-xl p-4 text-white flex items-center gap-2">
          <span className="text-xl">🏦</span><span className="font-bold">Transfer Receipt</span>
        </div>
        <div className="bg-white rounded-b-xl p-8 border border-t-0 border-gray-200 text-center">
          <div className="text-6xl mb-3">✅</div>
          <h3 className="text-2xl font-bold text-green-600 mb-2">Transfer Successful!</h3>
          <p className="text-gray-500 mb-6">Your practice transfer has been processed</p>
          <div className="bg-gray-50 rounded-xl p-6 max-w-md mx-auto text-left space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Reference:</span><span className="font-mono font-bold">TXN-{Math.random().toString(36).substr(2, 8).toUpperCase()}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">To:</span><span>{recipient}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Amount:</span><span className="font-bold">${parseFloat(transferAmount).toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Date:</span><span>{new Date().toLocaleDateString()}</span></div>
          </div>
          <button onClick={handleLogout}
            className={`btn-primary mt-6 text-lg px-10 ${isGuided ? "ring-4 ring-cool-sky/40 relative" : ""}`}>
            {isGuided && <span className="absolute -top-3 -right-3 text-2xl hand-pointer">👆</span>}
            🚪 Logout & Complete
          </button>
        </div>
      </div>
    );
  }

  // ----------- History -----------
  return (
    <div className="w-full">
      <div className="bg-[#283593] rounded-t-xl p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-2"><span className="text-xl">🏦</span><span className="font-bold">Transaction History</span></div>
        <button onClick={handleLogout} className="bg-red-500/80 hover:bg-red-500 text-white text-sm px-4 py-2 rounded-lg">Logout</button>
      </div>
      <div className="bg-white rounded-b-xl p-6 border border-t-0 border-gray-200">
        <button onClick={() => setStep("dashboard")} className="text-cool-sky hover:underline text-sm mb-4 inline-block">← Back to Dashboard</button>
        <h3 className="text-xl font-bold text-gray-800 mb-4">📜 Recent Transactions</h3>
        <div className="space-y-3">
          {FAKE_BANK.recentTransactions.map((txn, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-semibold text-gray-800">{txn.description}</p>
                <p className="text-xs text-gray-500">{txn.date}</p>
              </div>
              <span className={`font-bold ${txn.amount < 0 ? "text-red-600" : "text-green-600"}`}>
                {txn.amount < 0 ? "-" : "+"}${Math.abs(txn.amount).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <button onClick={() => onComplete(score, errors)} className="btn-primary mt-6 w-full">✅ Complete Module</button>
      </div>
    </div>
  );
}
