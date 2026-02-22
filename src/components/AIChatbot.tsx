"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
    role: "user" | "bot";
    text: string;
}

const FAQ: Record<string, string> = {
    "how do i log in": "To log in, use the practice credentials:\n\n👤 Username: margaret.chen\n🔑 Password: Safe2026!\n\nRemember — these are practice credentials, not your real ones!",
    "what is 2fa": "2FA (Two-Factor Authentication) adds an extra layer of security. After entering your password, you'll receive a 6-digit code.\n\n🔢 Practice Code: 482916\n\nIn real life, this code comes to your phone. Here, we give it to you!",
    "what is singpass": "SingPass is Singapore's national digital identity. It lets you access government services online.\n\nHere in CyberFort, we simulate a SingPass login so you can practise safely! 🏛️",
    "i made a mistake": "Don't worry! That's exactly why we're here. 💚\n\nEvery mistake in CyberFort is a learning opportunity. Nothing real happens — no real money moves, no real accounts are affected.\n\nTry again whenever you're ready!",
    "is this real": "No — this is 100% practice! 🛡️\n\nNothing you do here affects any real accounts. All the data is fake, all the money is pretend, and all the websites are simulations.\n\nYou're completely safe to explore and make mistakes!",
    "how do i get a certificate": "Complete any module to earn a certificate! 🎓\n\nGo to Practice → Choose a module → Complete all steps → Your certificate will appear on the Progress page.\n\nYou can download it as a PDF!",
    "help": "I can help you with:\n\n📝 How to log in\n🔐 What is 2FA\n🏛️ What is SingPass\n😰 I made a mistake\n🛡️ Is this real?\n🎓 How do I get a certificate\n\nJust type your question or click the suggestions below!",
};

const SUGGESTIONS = [
    "How do I log in?",
    "What is 2FA?",
    "I made a mistake",
    "Is this real?",
    "Help",
];

export default function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "bot", text: "Hello! 👋 I'm your CyberFort helper.\n\nI'm here to answer your questions about using this practice platform. How can I help you today?" },
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const findAnswer = (query: string): string => {
        const q = query.toLowerCase().trim();
        for (const [key, answer] of Object.entries(FAQ)) {
            if (q.includes(key) || key.includes(q)) {
                return answer;
            }
        }
        // Fuzzy match
        if (q.includes("log") || q.includes("sign") || q.includes("password")) return FAQ["how do i log in"];
        if (q.includes("2fa") || q.includes("code") || q.includes("verify")) return FAQ["what is 2fa"];
        if (q.includes("singpass") || q.includes("government")) return FAQ["what is singpass"];
        if (q.includes("mistake") || q.includes("wrong") || q.includes("error")) return FAQ["i made a mistake"];
        if (q.includes("real") || q.includes("safe") || q.includes("fake")) return FAQ["is this real"];
        if (q.includes("certificate") || q.includes("cert")) return FAQ["how do i get a certificate"];
        return "I'm not sure about that, but don't worry! 😊\n\nTry asking about:\n• How to log in\n• What is 2FA\n• Is this real?\n• How to get a certificate\n\nOr type 'help' for more options!";
    };

    const handleSend = (text?: string) => {
        const query = text || input.trim();
        if (!query) return;

        setMessages((prev) => [...prev, { role: "user", text: query }]);
        setInput("");

        setTimeout(() => {
            setMessages((prev) => [...prev, { role: "bot", text: findAnswer(query) }]);
        }, 500);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {isOpen && (
                <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl
                      border-2 border-cool-sky/20 overflow-hidden flex flex-col"
                    style={{ height: "480px" }}>
                    {/* Header */}
                    <div className="bg-french-blue text-white p-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-xl">🤖</span>
                            <div>
                                <div className="font-bold text-sm">CyberFort Helper</div>
                                <div className="text-xs text-cool-sky">Always here to help!</div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center
                       hover:bg-white/20 transition-colors text-sm"
                            aria-label="Close chat"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-line
                    ${msg.role === "user"
                                            ? "bg-french-blue text-white rounded-br-none"
                                            : "bg-gray-100 text-gray-800 rounded-bl-none"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Suggestions */}
                    <div className="px-4 py-2 flex gap-2 overflow-x-auto">
                        {SUGGESTIONS.map((s) => (
                            <button
                                key={s}
                                onClick={() => handleSend(s)}
                                className="whitespace-nowrap px-3 py-1 bg-cool-sky/10 text-cool-sky rounded-full
                         text-xs font-medium hover:bg-cool-sky/20 transition-colors flex-shrink-0"
                            >
                                {s}
                            </button>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t border-gray-200">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                placeholder="Type your question..."
                                className="flex-1 px-4 py-2 rounded-xl border-2 border-gray-200 text-sm
                         focus:border-cool-sky focus:outline-none text-gray-800"
                                aria-label="Type your question"
                            />
                            <button
                                onClick={() => handleSend()}
                                className="px-4 py-2 bg-french-blue text-white rounded-xl font-semibold
                         text-sm hover:bg-french-blue/90 transition-colors min-w-[48px]"
                                aria-label="Send message"
                            >
                                ➤
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-full bg-cool-sky text-white shadow-lg
                 hover:bg-french-blue transition-all flex items-center justify-center
                 text-2xl gentle-pulse"
                aria-label={isOpen ? "Close help chat" : "Open help chat"}
                title="Need help? Chat with us!"
            >
                {isOpen ? "✕" : "💬"}
            </button>
        </div>
    );
}
