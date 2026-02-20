"use client";
import { useState } from "react";

interface Props {
  isGuided: boolean;
  onComplete: (score: number, errors: number) => void;
  onSpeak: (text: string) => void;
}

type Step = "landing" | "inbox" | "detail" | "result";

interface Message {
  id: number;
  sender: string;
  preview: string;
  body: string;
  isScam: boolean;
  scamClues: string[];
  time: string;
}

const MESSAGES: Message[] = [
  {
    id: 1,
    sender: "+65 8123 4567",
    preview: "URGENT: Your DBS account has been locked!",
    body: "Dear customer, your DBS account has been LOCKED due to suspicious activity. Click here to verify your identity immediately or your account will be permanently closed: http://dbs-secure-verify.tk/login\n\nDBS Bank Security Team",
    isScam: true,
    scamClues: [
      "Creates urgency — 'account locked', 'immediately'",
      "Suspicious link (.tk domain, not official DBS website)",
      "Banks never ask you to click links in SMS",
      "Generic greeting — doesn't use your real name",
    ],
    time: "10:32 AM",
  },
  {
    id: 2,
    sender: "SingPost",
    preview: "Your parcel is ready for collection",
    body: "Your parcel (tracking: SP1234567890) is ready for collection at Jurong East Post Office. Collection hours: Mon-Fri 9am-6pm, Sat 9am-1pm. Bring your IC for verification.\n\nSingPost",
    isScam: false,
    scamClues: [],
    time: "11:15 AM",
  },
  {
    id: 3,
    sender: "+1 (555) 012-3456",
    preview: "Congratulations! You won $50,000 in our lucky draw",
    body: "CONGRATULATIONS!!! You have been selected as our LUCKY WINNER of $50,000! To claim your prize, please provide your bank account number, NRIC, and a $200 processing fee. Reply NOW before the offer expires!\n\nInternational Prize Commission",
    isScam: true,
    scamClues: [
      "Too good to be true — you didn't enter any lucky draw",
      "Foreign phone number (+1 area code)",
      "Asks for money ($200 processing fee) to claim a prize",
      "Requests sensitive info (bank account, NRIC)",
      "Excessive punctuation and capitals to create excitement",
    ],
    time: "2:48 PM",
  },
  {
    id: 4,
    sender: "MOH",
    preview: "COVID-19 vaccination reminder",
    body: "Dear resident, this is a reminder that your next COVID-19 vaccination booster is due. Please book your appointment at https://vaccine.gov.sg or call 1800-333-9999.\n\nMinistry of Health Singapore",
    isScam: false,
    scamClues: [],
    time: "3:30 PM",
  },
  {
    id: 5,
    sender: "+65 9876 5432",
    preview: "Hi Mom, I lost my phone. Send me $500 to this new number",
    body: "Hi Mom/Dad, I lost my phone and this is my temporary number. I'm in trouble and need $500 urgently. Please transfer to this PayNow number: 9876 5432. Don't call my old number, it's been stolen. I'll explain later. Love you!",
    isScam: true,
    scamClues: [
      "Impersonates a family member without using a name",
      "Creates urgency — 'in trouble', 'urgently'",
      "Asks for money transfer to unknown number",
      "Tells you NOT to call the real number to verify",
      "Common 'impersonation scam' technique targeting parents",
    ],
    time: "5:12 PM",
  },
  {
    id: 6,
    sender: "NTUC",
    preview: "Your FairPrice receipt - $45.30",
    body: "Thank you for shopping at NTUC FairPrice Jurong East. Your receipt for $45.30 has been saved to your LinkPoints account. You earned 45 LinkPoints today!\n\nView at: https://fairprice.com.sg/receipt",
    isScam: false,
    scamClues: [],
    time: "6:00 PM",
  },
];

export default function ScamSim({ isGuided, onComplete, onSpeak }: Props) {
  const [step, setStep] = useState<Step>("landing");
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [currentMsg, setCurrentMsg] = useState<Message | null>(null);
  const [answered, setAnswered] = useState<Record<number, "correct" | "wrong">>({});
  const [showExplanation, setShowExplanation] = useState(false);

  const addScore = (pts: number) => setScore(s => s + pts);
  const addError = () => setErrors(e => e + 1);

  const totalAnswered = Object.keys(answered).length;

  const handleAnswer = (userSaysScam: boolean) => {
    if (!currentMsg) return;
    const correct = userSaysScam === currentMsg.isScam;
    if (correct) {
      addScore(15);
      setAnswered(prev => ({ ...prev, [currentMsg.id]: "correct" }));
    } else {
      addError();
      setAnswered(prev => ({ ...prev, [currentMsg.id]: "wrong" }));
    }
    setShowExplanation(true);
    onSpeak(correct
      ? "Correct! " + (currentMsg.isScam ? "That was indeed a scam." : "That was a legitimate message.")
      : "Not quite. " + (currentMsg.isScam ? "That was actually a scam. Look at the clues." : "That was actually a real message."));
  };

  if (step === "landing") {
    return (
      <div className="w-full">
        <div className="bg-gradient-to-b from-[#d32f2f] to-[#e53935] rounded-t-xl p-6 text-white text-center">
          <div className="flex items-center justify-center gap-3 mb-1">
            <span className="text-4xl">🕵️</span>
            <div>
              <h2 className="text-2xl font-bold">Scam Detector</h2>
              <p className="text-red-200 text-sm">Spot the Scam Messages</p>
            </div>
          </div>
          <div className="bg-yellow-400/20 text-yellow-200 text-xs px-4 py-1.5 rounded-full inline-block mt-2">
            🛡️ SAFE PRACTICE MODE — These are example messages
          </div>
        </div>
        <div className="bg-white rounded-b-xl p-8 border border-t-0 border-gray-200 text-center">
          <p className="text-gray-500 mb-2">Read SMS messages and decide: is it real or a scam?</p>
          <p className="text-sm text-gray-400 mb-6">6 messages to review — 3 scams, 3 legitimate</p>
          <button
            onClick={() => { setStep("inbox"); addScore(5); onSpeak("Read each message carefully and decide if it's a scam or not."); }}
            className={`btn-primary text-lg px-10 ${isGuided ? "ring-4 ring-cool-sky/40 relative" : ""}`}
          >
            {isGuided && <span className="absolute -top-3 -right-3 text-2xl hand-pointer">👆</span>}
            📱 Open Message Inbox
          </button>
          {isGuided && (
            <div className="mt-6 bg-honeydew rounded-xl p-4 text-left text-sm">
              <p className="font-bold text-french-blue mb-1">📝 What you&#39;ll learn:</p>
              <ul className="list-disc ml-5 text-gray-700 space-y-1">
                <li>How to identify common scam patterns</li>
                <li>Red flags in suspicious messages</li>
                <li>The difference between real and fake messages</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (step === "inbox" && !currentMsg) {
    const allDone = totalAnswered === MESSAGES.length;
    return (
      <div className="w-full">
        <div className="bg-[#e53935] rounded-t-xl p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2"><span className="text-xl">📱</span><span className="font-bold">SMS Inbox</span></div>
          <span className="text-sm bg-white/20 px-3 py-1 rounded-full">{totalAnswered}/{MESSAGES.length} checked</span>
        </div>
        <div className="bg-white rounded-b-xl border border-t-0 border-gray-200">
          <div className="divide-y">
            {MESSAGES.map((msg) => {
              const status = answered[msg.id];
              return (
                <button key={msg.id}
                  onClick={() => { setCurrentMsg(msg); setShowExplanation(!!status); }}
                  className={`w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 min-h-[60px]
                    ${status ? "opacity-80" : ""}`}>
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                    {status === "correct" ? "✅" : status === "wrong" ? "❌" : "💬"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-800 text-sm">{msg.sender}</span>
                      <span className="text-xs text-gray-400">{msg.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{msg.preview}</p>
                  </div>
                  {!status && isGuided && (
                    <span className="text-xl hand-pointer flex-shrink-0">👆</span>
                  )}
                </button>
              );
            })}
          </div>

          {allDone && (
            <div className="p-6 text-center border-t">
              <p className="text-lg font-bold text-green-600 mb-2">🎉 All messages reviewed!</p>
              <p className="text-sm text-gray-500 mb-4">
                You got {Object.values(answered).filter(v => v === "correct").length}/{MESSAGES.length} correct
              </p>
              <button onClick={() => onComplete(score, errors)}
                className={`btn-primary text-lg px-10 ${isGuided ? "ring-4 ring-cool-sky/40 relative" : ""}`}>
                {isGuided && <span className="absolute -top-3 -right-3 text-2xl hand-pointer">👆</span>}
                ✅ Complete Module
              </button>
            </div>
          )}

          {isGuided && !allDone && (
            <div className="p-4 bg-honeydew border-t">
              <p className="text-sm text-gray-700">📝 <strong>Tap each message</strong> to read it and decide if it&apos;s a scam.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Detail view
  if (currentMsg) {
    const status = answered[currentMsg.id];
    return (
      <div className="w-full">
        <div className="bg-[#e53935] rounded-t-xl p-4 text-white flex items-center gap-2">
          <button onClick={() => { setCurrentMsg(null); setShowExplanation(false); }}
            className="text-white hover:bg-white/20 rounded-lg px-2 py-1 text-sm">← Back</button>
          <span className="font-bold">Message from {currentMsg.sender}</span>
        </div>
        <div className="bg-white rounded-b-xl border border-t-0 border-gray-200">
          {/* Message bubble */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">💬</div>
              <div>
                <p className="font-bold text-gray-800">{currentMsg.sender}</p>
                <p className="text-xs text-gray-400">{currentMsg.time}</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 text-gray-800 whitespace-pre-line text-sm leading-relaxed">
              {currentMsg.body}
            </div>
          </div>

          {/* Answer buttons */}
          {!status && (
            <div className="px-6 pb-4">
              <p className="text-center font-bold text-gray-800 mb-3">Is this message a scam?</p>
              <div className="flex gap-3">
                <button onClick={() => handleAnswer(true)}
                  className={`flex-1 py-4 px-6 rounded-xl border-2 border-red-300 text-red-700 font-bold text-lg
                    hover:bg-red-50 transition-colors min-h-[48px]
                    ${isGuided && currentMsg.isScam ? "ring-4 ring-red-300/40 relative" : ""}`}>
                  {isGuided && currentMsg.isScam && <span className="absolute -top-2 -right-2 text-xl hand-pointer">👆</span>}
                  🚨 SCAM
                </button>
                <button onClick={() => handleAnswer(false)}
                  className={`flex-1 py-4 px-6 rounded-xl border-2 border-green-300 text-green-700 font-bold text-lg
                    hover:bg-green-50 transition-colors min-h-[48px]
                    ${isGuided && !currentMsg.isScam ? "ring-4 ring-green-300/40 relative" : ""}`}>
                  {isGuided && !currentMsg.isScam && <span className="absolute -top-2 -right-2 text-xl hand-pointer">👆</span>}
                  ✅ REAL
                </button>
              </div>
            </div>
          )}

          {/* Explanation */}
          {showExplanation && (
            <div className={`mx-6 mb-6 rounded-xl p-5 ${status === "correct" ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
              <p className={`font-bold mb-2 ${status === "correct" ? "text-green-700" : "text-red-700"}`}>
                {status === "correct" ? "✅ Correct!" : "❌ Not quite!"}
                {" "}This message is {currentMsg.isScam ? "a SCAM 🚨" : "LEGITIMATE ✅"}
              </p>
              {currentMsg.isScam && currentMsg.scamClues.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">Red flags to watch for:</p>
                  <ul className="list-disc ml-5 text-sm text-gray-600 space-y-1">
                    {currentMsg.scamClues.map((clue, i) => (
                      <li key={i}>{clue}</li>
                    ))}
                  </ul>
                </div>
              )}
              {!currentMsg.isScam && (
                <p className="text-sm text-gray-600">This is from a known organization. It doesn&apos;t ask for money, passwords, or personal information, and uses official channels.</p>
              )}
              <button onClick={() => { setCurrentMsg(null); setShowExplanation(false); }}
                className="btn-primary mt-4 text-sm px-6">← Back to Inbox</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
