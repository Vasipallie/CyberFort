"use client";

import { useState, useEffect, useCallback } from "react";

export default function AccessibilityToolbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [fontScale, setFontScale] = useState(1);
    const [highContrast, setHighContrast] = useState(false);
    const [dyslexiaFont, setDyslexiaFont] = useState(false);
    const [simplified, setSimplified] = useState(false);
    const [audioEnabled, setAudioEnabled] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("cyberfort-accessibility");
        if (saved) {
            try {
                const settings = JSON.parse(saved);
                setFontScale(settings.fontScale ?? 1);
                setHighContrast(settings.highContrast ?? false);
                setDyslexiaFont(settings.dyslexiaFont ?? false);
                setSimplified(settings.simplified ?? false);
                setAudioEnabled(settings.audioEnabled ?? false);
            } catch { /* ignore bad data */ }
        }
    }, []);

    const saveSettings = useCallback((updates: Record<string, unknown>) => {
        const settings = { fontScale, highContrast, dyslexiaFont, simplified, audioEnabled, ...updates };
        localStorage.setItem("cyberfort-accessibility", JSON.stringify(settings));
    }, [fontScale, highContrast, dyslexiaFont, simplified, audioEnabled]);

    useEffect(() => {
        document.documentElement.style.setProperty("--font-scale", String(fontScale));
    }, [fontScale]);

    useEffect(() => {
        document.body.classList.toggle("high-contrast", highContrast);
    }, [highContrast]);

    useEffect(() => {
        document.body.classList.toggle("dyslexia-font", dyslexiaFont);
    }, [dyslexiaFont]);

    useEffect(() => {
        document.body.classList.toggle("simplified-mode", simplified);
    }, [simplified]);

    const handleFontScale = (value: number) => {
        setFontScale(value);
        saveSettings({ fontScale: value });
    };

    const toggle = (key: string, current: boolean, setter: (v: boolean) => void) => {
        setter(!current);
        saveSettings({ [key]: !current });
    };

    const speak = useCallback((text: string) => {
        if (audioEnabled && "speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.85;
            utterance.pitch = 1;
            utterance.lang = "en-SG";
            window.speechSynthesis.speak(utterance);
        }
    }, [audioEnabled]);

    useEffect(() => {
        if (!audioEnabled) return;
        const handleFocus = (e: FocusEvent) => {
            const el = e.target as HTMLElement;
            const label = el.getAttribute("aria-label") || el.textContent || "";
            if (label.trim()) speak(label.trim());
        };
        document.addEventListener("focusin", handleFocus);
        return () => document.removeEventListener("focusin", handleFocus);
    }, [audioEnabled, speak]);

    return (
        <div className="fixed bottom-4 left-4 z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-full bg-velvet-purple text-white shadow-lg
                 hover:bg-velvet-purple/90 transition-all flex items-center justify-center
                 text-2xl"
                aria-label="Accessibility settings"
                title="Accessibility settings"
            >
                ♿
            </button>

            {isOpen && (
                <div className="absolute bottom-16 left-0 bg-white rounded-2xl shadow-2xl p-6 w-80
                      border-2 border-velvet-purple/20 text-foreground">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        ⚙️ Accessibility Settings
                    </h3>

                    {/* Font Size */}
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">
                            📏 Font Size: {Math.round(fontScale * 100)}%
                        </label>
                        <input
                            type="range"
                            min="0.8"
                            max="1.6"
                            step="0.1"
                            value={fontScale}
                            onChange={(e) => handleFontScale(parseFloat(e.target.value))}
                            className="w-full"
                            aria-label={`Font size: ${Math.round(fontScale * 100)} percent`}
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Small</span>
                            <span>Large</span>
                        </div>
                    </div>

                    {/* Toggles */}
                    {[
                        { key: "highContrast", label: "🌗 High Contrast Mode", state: highContrast, setter: setHighContrast },
                        { key: "dyslexiaFont", label: "🔤 Dyslexia-Friendly Font", state: dyslexiaFont, setter: setDyslexiaFont },
                        { key: "simplified", label: "📐 Simplified Mode", state: simplified, setter: setSimplified },
                        { key: "audioEnabled", label: "🔊 Audio Narration", state: audioEnabled, setter: setAudioEnabled },
                    ].map((item) => (
                        <button
                            key={item.key}
                            onClick={() => toggle(item.key, item.state, item.setter)}
                            className={`w-full flex items-center justify-between p-3 rounded-xl mb-2
                       transition-all text-sm font-medium
                       ${item.state
                                    ? "bg-velvet-purple text-white"
                                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                }`}
                            aria-pressed={item.state}
                        >
                            <span>{item.label}</span>
                            <span className="text-lg">{item.state ? "✅" : "⬜"}</span>
                        </button>
                    ))}

                    {/* Reset */}
                    <button
                        onClick={() => {
                            handleFontScale(1);
                            setHighContrast(false);
                            setDyslexiaFont(false);
                            setSimplified(false);
                            setAudioEnabled(false);
                            localStorage.removeItem("cyberfort-accessibility");
                        }}
                        className="w-full mt-2 p-2 text-sm text-gray-500 hover:text-gray-700
                     hover:bg-gray-100 rounded-xl transition-colors"
                    >
                        🔄 Reset All Settings
                    </button>
                </div>
            )}
        </div>
    );
}
