"use client";
import { useState } from "react";

interface Props {
  isGuided: boolean;
  onComplete: (score: number, errors: number) => void;
  onSpeak: (text: string) => void;
}

type Step = "landing" | "selectRecipient" | "enterAmount" | "review" | "pin" | "receipt";

const CONTACTS = [
  { name: "Ah Kow", phone: "9123 4567", avatar: "👨‍🦳" },
  { name: "Mei Ling", phone: "8234 5678", avatar: "👩" },
  { name: "David Tan", phone: "9345 6789", avatar: "👨" },
  { name: "Siti Nurhaliza", phone: "8456 7890", avatar: "👩‍🦱" },
];

export default function PayNowSim({ isGuided, onComplete, onSpeak }: Props) {
  const [step, setStep] = useState<Step>("landing");
  const [selectedContact, setSelectedContact] = useState<typeof CONTACTS[0] | null>(null);
  const [manualPhone, setManualPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);

  const addScore = (pts: number) => setScore(s => s + pts);
  const addError = () => setErrors(e => e + 1);

  const recipientName = selectedContact?.name || "Phone " + manualPhone;

  const handlePinSubmit = () => {
    if (pin === "123456") {
      addScore(20);
      setStep("receipt");
      onSpeak("Payment successful! Always keep your PIN secret and never share it.");
    } else {
      addError();
      setPinError("Wrong PIN. Try 123456 (practice PIN).");
    }
  };

  if (step === "landing") {
    return (
      <div className="w-full">
        <div className="bg-gradient-to-b from-[#7b1fa2] to-[#9c27b0] rounded-t-xl p-6 text-white text-center">
          <div className="flex items-center justify-center gap-3 mb-1">
            <span className="text-4xl">📱</span>
            <div>
              <h2 className="text-2xl font-bold">PayNow</h2>
              <p className="text-purple-200 text-sm">Practice Digital Payments</p>
            </div>
          </div>
          <div className="bg-yellow-400/20 text-yellow-200 text-xs px-4 py-1.5 rounded-full inline-block mt-2">
            🛡️ SAFE PRACTICE MODE — No real money is used
          </div>
        </div>
        <div className="bg-white rounded-b-xl p-8 border border-t-0 border-gray-200 text-center">
          <p className="text-gray-500 mb-6">Send money quickly using a phone number</p>
          <button
            onClick={() => { setStep("selectRecipient"); addScore(10); onSpeak("Choose a contact or enter a phone number."); }}
            className={`btn-primary text-lg px-10 ${isGuided ? "ring-4 ring-cool-sky/40 relative" : ""}`}
          >
            {isGuided && <span className="absolute -top-3 -right-3 text-2xl hand-pointer">👆</span>}
            💸 Send Money
          </button>
          {isGuided && (
            <div className="mt-6 bg-honeydew rounded-xl p-4 text-left text-sm">
              <p className="font-bold text-french-blue mb-1">📝 Guided Instruction:</p>
              <p className="text-gray-700">Click &quot;Send Money&quot; to start making a practice payment.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (step === "selectRecipient") {
    return (
      <div className="w-full">
        <div className="bg-[#9c27b0] rounded-t-xl p-4 text-white flex items-center gap-2">
          <span className="text-xl">📱</span><span className="font-bold">PayNow — Select Recipient</span>
        </div>
        <div className="bg-white rounded-b-xl p-6 border border-t-0 border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Choose a contact</h3>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {CONTACTS.map((c) => (
              <button key={c.phone}
                onClick={() => { setSelectedContact(c); addScore(10); setStep("enterAmount"); onSpeak(`Selected ${c.name}. Now enter the amount.`); }}
                className={`p-4 rounded-xl border-2 text-left transition-all min-h-[48px] hover:shadow-md
                  ${isGuided && !selectedContact ? "border-cool-sky bg-cool-sky/5" : "border-gray-200 bg-white hover:border-purple-400"}`}>
                <span className="text-3xl">{c.avatar}</span>
                <p className="font-bold text-gray-800 mt-1">{c.name}</p>
                <p className="text-xs text-gray-500">{c.phone}</p>
              </button>
            ))}
          </div>

          <div className="border-t pt-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Or enter phone number:</p>
            <div className="flex gap-2">
              <input type="tel" value={manualPhone} onChange={(e) => setManualPhone(e.target.value)}
                placeholder="e.g. 9123 4567"
                className="flex-1 p-4 rounded-xl border-2 border-gray-200 min-h-[48px] focus:border-french-blue focus:outline-none"
              />
              <button onClick={() => {
                if (manualPhone.replace(/\s/g, "").length >= 8) {
                  setSelectedContact(null); addScore(10);
                  setStep("enterAmount"); onSpeak("Phone number entered. Now enter the amount.");
                } else { addError(); }
              }} className="btn-primary px-6">Next →</button>
            </div>
          </div>

          {isGuided && (
            <div className="mt-6 bg-honeydew rounded-xl p-4 text-sm">
              <p className="font-bold text-french-blue mb-1">💡 Tip:</p>
              <p className="text-gray-700">Select one of the contacts above, or type a phone number.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (step === "enterAmount") {
    return (
      <div className="w-full">
        <div className="bg-[#9c27b0] rounded-t-xl p-4 text-white flex items-center gap-2">
          <span className="text-xl">📱</span><span className="font-bold">PayNow — Enter Amount</span>
        </div>
        <div className="bg-white rounded-b-xl p-8 border border-t-0 border-gray-200">
          <button onClick={() => setStep("selectRecipient")} className="text-cool-sky hover:underline text-sm mb-4 inline-block">← Change Recipient</button>
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500">Sending to</p>
            <p className="text-xl font-bold text-gray-800">{recipientName}</p>
          </div>
          <div className="max-w-sm mx-auto">
            <label htmlFor="pay-amt" className="block text-sm font-semibold text-gray-700 mb-1.5 text-center">Amount ($)</label>
            <input id="pay-amt" type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className={`w-full p-6 rounded-xl border-2 text-3xl text-center font-bold min-h-[48px]
                ${isGuided && !amount ? "border-cool-sky bg-cool-sky/5" : "border-gray-200"} focus:border-french-blue focus:outline-none`}
            />
            <div className="flex gap-2 mt-3 justify-center">
              {[5, 10, 20, 50].map((v) => (
                <button key={v} onClick={() => setAmount(v.toString())}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-sm hover:bg-purple-50 hover:border-purple-400 transition-colors min-h-[40px]">
                  ${v}
                </button>
              ))}
            </div>
            <div className="mt-4">
              <label htmlFor="pay-note" className="block text-sm text-gray-500 mb-1">Note (optional)</label>
              <input id="pay-note" type="text" value={note} onChange={(e) => setNote(e.target.value)}
                placeholder="What&apos;s this for?"
                className="w-full p-3 rounded-xl border-2 border-gray-200 text-sm min-h-[48px] focus:border-french-blue focus:outline-none"
              />
            </div>
            <button onClick={() => {
              const amt = parseFloat(amount);
              if (!isNaN(amt) && amt > 0) {
                addScore(10); setStep("review"); onSpeak("Review your payment details before continuing.");
              } else { addError(); }
            }}
              className={`w-full btn-primary text-lg mt-4 ${isGuided && amount ? "ring-4 ring-cool-sky/40 relative" : ""}`}>
              {isGuided && amount && <span className="absolute -top-3 -right-3 text-2xl hand-pointer">👆</span>}
              Review Payment
            </button>
          </div>
          {isGuided && (
            <div className="mt-6 bg-honeydew rounded-xl p-4 text-sm max-w-sm mx-auto">
              <p className="font-bold text-french-blue mb-1">💡 Try:</p>
              <p className="text-gray-700">Enter an amount like <strong>$10</strong> or click a quick button above.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (step === "review") {
    return (
      <div className="w-full">
        <div className="bg-[#9c27b0] rounded-t-xl p-4 text-white flex items-center gap-2">
          <span className="text-xl">📱</span><span className="font-bold">PayNow — Review</span>
        </div>
        <div className="bg-white rounded-b-xl p-8 border border-t-0 border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Confirm Payment</h3>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 max-w-md mx-auto space-y-3">
            <div className="flex justify-between"><span className="text-gray-500">To:</span><span className="font-bold">{recipientName}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Amount:</span><span className="text-2xl font-bold text-purple-700">${parseFloat(amount).toFixed(2)}</span></div>
            {note && <div className="flex justify-between"><span className="text-gray-500">Note:</span><span>{note}</span></div>}
          </div>
          <div className="flex gap-3 max-w-md mx-auto mt-6">
            <button onClick={() => setStep("enterAmount")} className="flex-1 btn-secondary py-4 text-lg">← Edit</button>
            <button onClick={() => { addScore(10); setStep("pin"); onSpeak("Enter your 6-digit PIN to confirm the payment."); }}
              className={`flex-1 btn-primary py-4 text-lg ${isGuided ? "ring-4 ring-cool-sky/40 relative" : ""}`}>
              {isGuided && <span className="absolute -top-3 -right-3 text-2xl hand-pointer">👆</span>}
              Pay Now →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "pin") {
    return (
      <div className="w-full">
        <div className="bg-[#9c27b0] rounded-t-xl p-4 text-white flex items-center gap-2">
          <span className="text-xl">📱</span><span className="font-bold">PayNow — Enter PIN</span>
        </div>
        <div className="bg-white rounded-b-xl p-8 border border-t-0 border-gray-200 text-center">
          <div className="text-5xl mb-3">🔒</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Enter Your PIN</h3>
          <p className="text-sm text-gray-500 mb-6">6-digit security PIN</p>
          {pinError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-red-700 text-sm max-w-xs mx-auto">⚠️ {pinError}</div>
          )}
          <div className="max-w-xs mx-auto">
            <input type="password" value={pin} onChange={(e) => { if (e.target.value.length <= 6) setPin(e.target.value); }}
              placeholder="● ● ● ● ● ●"
              className={`w-full p-6 rounded-xl border-2 text-3xl text-center tracking-[0.5em] font-bold min-h-[48px]
                ${isGuided && !pin ? "border-cool-sky bg-cool-sky/5" : "border-gray-200"} focus:border-french-blue focus:outline-none`}
              onKeyDown={(e) => e.key === "Enter" && pin.length === 6 && handlePinSubmit()}
            />
            <button onClick={handlePinSubmit} disabled={pin.length !== 6}
              className={`w-full btn-primary text-lg mt-4 disabled:opacity-40 disabled:cursor-not-allowed
                ${isGuided && pin.length === 6 ? "ring-4 ring-cool-sky/40 relative" : ""}`}>
              {isGuided && pin.length === 6 && <span className="absolute -top-3 -right-3 text-2xl hand-pointer">👆</span>}
              Confirm Payment
            </button>
          </div>
          {isGuided && (
            <div className="mt-6 bg-honeydew rounded-xl p-4 text-sm max-w-xs mx-auto">
              <p className="font-bold text-french-blue mb-1">💡 Practice PIN:</p>
              <p className="text-gray-700 font-mono text-lg"><strong>123456</strong></p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Receipt
  return (
    <div className="w-full">
      <div className="bg-[#9c27b0] rounded-t-xl p-4 text-white flex items-center gap-2">
        <span className="text-xl">📱</span><span className="font-bold">PayNow — Receipt</span>
      </div>
      <div className="bg-white rounded-b-xl p-8 border border-t-0 border-gray-200 text-center">
        <div className="text-6xl mb-3">🎉</div>
        <h3 className="text-2xl font-bold text-green-600 mb-2">Payment Sent!</h3>
        <p className="text-gray-500 mb-6">${parseFloat(amount).toFixed(2)} sent to {recipientName}</p>
        <div className="bg-gray-50 rounded-xl p-6 max-w-sm mx-auto text-left space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-gray-500">Reference:</span><span className="font-mono font-bold">PN-{Math.random().toString(36).substr(2, 8).toUpperCase()}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">To:</span><span>{recipientName}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Amount:</span><span className="font-bold">${parseFloat(amount).toFixed(2)}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Date:</span><span>{new Date().toLocaleDateString()}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Status:</span><span className="text-green-600 font-bold">✅ Completed</span></div>
        </div>
        <button onClick={() => onComplete(score, errors)}
          className={`btn-primary mt-6 text-lg px-10 ${isGuided ? "ring-4 ring-cool-sky/40 relative" : ""}`}>
          {isGuided && <span className="absolute -top-3 -right-3 text-2xl hand-pointer">👆</span>}
          ✅ Complete Module
        </button>
      </div>
    </div>
  );
}
