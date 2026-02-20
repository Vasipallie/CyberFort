"use client";

import { useState } from "react";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "bot" | "user"; text: string }[]>([
    { role: "bot", text: "Hello! 👋 I'm your SafeDigital assistant. I'm here to help you navigate the platform. What would you like to do today?" },
  ]);
  const [input, setInput] = useState("");

  const quickReplies = [
    "How do I start practising?",
    "What modules are available?",
    "I need help with scams",
    "How do I get a certificate?",
  ];

  const getResponse = (msg: string): string => {
    const lower = msg.toLowerCase();
    if (lower.includes("start") || lower.includes("practis") || lower.includes("begin")) {
      return "Great! To start practising, click 'Practice' in the top menu. You'll see all available modules. I recommend starting with 'Form Filling Practice' — it's the easiest one! 😊";
    }
    if (lower.includes("module") || lower.includes("available") || lower.includes("what can")) {
      return "We have 8 practice modules: Government Login, Healthcare Booking, Pension Checking, Scam Awareness, Online Banking, Digital Payments, SMS Scam Detection, and Form Filling. Each one is completely safe — no real accounts are used! 🛡️";
    }
    if (lower.includes("scam") || lower.includes("phish") || lower.includes("fraud")) {
      return "Our Scam Awareness module teaches you to spot fake emails, SMS messages, and suspicious popups. Remember: real banks never ask for your password via email or SMS. Want to try the Scam Awareness module? Go to Practice → Scam Awareness Training. 🔒";
    }
    if (lower.includes("certificate") || lower.includes("cert")) {
      return "When you complete a module, you'll earn a digital Confidence Certificate! It shows your name, the module completed, practice hours, and your confidence improvement. You can download it as a PDF. Check your certificates in 'My Progress'. 🎓";
    }
    if (lower.includes("help") || lower.includes("confused") || lower.includes("don't understand")) {
      return "Don't worry! This is just practice — there's no way to make a real mistake here. Take your time and try any module. If you get stuck, each module has a 'Guided Mode' that shows you exactly what to do step by step. You're doing great! 💪";
    }
    if (lower.includes("thank")) {
      return "You're very welcome! Remember, learning is a journey and you're doing wonderfully. Feel free to ask me anything anytime. 😊";
    }
    return "That's a great question! Here's what I suggest: visit the 'Practice' page to explore all our modules. Each module has a Guided Mode that walks you through every step. Remember, this is all just practice — you can't make any real mistakes here. You're doing great! 💪";
  };

  const handleSend = (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: getResponse(msg) }]);
    }, 800);
  };

  return (
    <>
      {/* Chat toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-cool-sky text-white 
                   flex items-center justify-center shadow-lg hover:shadow-xl transition-all
                   text-2xl focus-visible:ring-4 focus-visible:ring-french-blue"
        aria-label="Open AI assistant chat"
        title="Chat with Assistant"
      >
        💬
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div
          className="fixed bottom-24 left-6 z-50 bg-white rounded-2xl shadow-2xl 
                     w-[350px] max-h-[500px] flex flex-col border-2 border-cool-sky overflow-hidden"
          role="dialog"
          aria-label="AI Assistant Chat"
        >
          {/* Header */}
          <div className="bg-cool-sky text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤖</span>
              <div>
                <p className="font-bold text-base">SafeDigital Assistant</p>
                <p className="text-xs text-blue-100">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center
                         hover:bg-white/30 transition-colors"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px] max-h-[300px]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-cool-sky text-white rounded-br-md"
                      : "bg-gray-100 text-gray-800 rounded-bl-md"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick replies */}
          <div className="px-4 pb-2 flex flex-wrap gap-1">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => handleSend(reply)}
                className="text-xs bg-honeydew text-french-blue px-3 py-1.5 rounded-full
                         hover:bg-cool-sky hover:text-white transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your question..."
              className="flex-1 p-3 rounded-xl border-2 border-gray-200 text-sm
                       focus:border-cool-sky transition-colors min-h-[44px]"
              aria-label="Type a message to the assistant"
            />
            <button
              onClick={() => handleSend()}
              className="w-11 h-11 rounded-xl bg-cool-sky text-white flex items-center 
                       justify-center hover:bg-french-blue transition-colors"
              aria-label="Send message"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
