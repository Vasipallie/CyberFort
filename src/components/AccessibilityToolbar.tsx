"use client";

import { useState, useEffect } from "react";

export default function AccessibilityToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(1);
  const [highContrast, setHighContrast] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [narration, setNarration] = useState(false);
  const [simplifiedMode, setSimplifiedMode] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty("--font-scale", String(fontSize));
  }, [fontSize]);

  useEffect(() => {
    document.body.classList.toggle("high-contrast", highContrast);
  }, [highContrast]);

  useEffect(() => {
    document.body.classList.toggle("dyslexia-font", dyslexiaFont);
  }, [dyslexiaFont]);

  useEffect(() => {
    document.body.classList.toggle("simplified-mode", simplifiedMode);
  }, [simplifiedMode]);

  const speak = (text: string) => {
    if (narration && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <>
      {/* Accessibility toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-french-blue text-white 
                   flex items-center justify-center shadow-lg hover:shadow-xl transition-all
                   text-2xl focus-visible:ring-4 focus-visible:ring-cool-sky"
        aria-label="Open accessibility settings"
        title="Accessibility Settings"
      >
        ♿
      </button>

      {/* Accessibility panel */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 bg-white rounded-2xl shadow-2xl p-6 w-80 
                     border-2 border-french-blue max-h-[80vh] overflow-y-auto"
          role="dialog"
          aria-label="Accessibility Settings"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-french-blue">Accessibility</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center
                         hover:bg-gray-200 transition-colors text-lg"
              aria-label="Close accessibility panel"
            >
              ✕
            </button>
          </div>

          <div className="space-y-5">
            {/* Font size slider */}
            <div>
              <label className="block font-semibold text-base mb-2" htmlFor="fontSlider">
                📏 Font Size: {Math.round(fontSize * 100)}%
              </label>
              <input
                id="fontSlider"
                type="range"
                min="0.8"
                max="1.8"
                step="0.1"
                value={fontSize}
                onChange={(e) => setFontSize(parseFloat(e.target.value))}
                className="w-full"
                aria-label="Adjust font size"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>Small</span>
                <span>Large</span>
              </div>
            </div>

            {/* High contrast toggle */}
            <ToggleOption
              label="🔲 High Contrast"
              description="Increases text contrast for better readability"
              checked={highContrast}
              onChange={setHighContrast}
            />

            {/* Dyslexia font */}
            <ToggleOption
              label="🔤 Dyslexia-Friendly Font"
              description="Uses a font designed for easier reading"
              checked={dyslexiaFont}
              onChange={setDyslexiaFont}
            />

            {/* Audio narration */}
            <ToggleOption
              label="🔊 Audio Narration"
              description="Reads content aloud as you navigate"
              checked={narration}
              onChange={(val) => {
                setNarration(val);
                if (val) speak("Audio narration is now enabled.");
              }}
            />

            {/* Simplified mode */}
            <ToggleOption
              label="🔍 Simplified Mode"
              description="Extra large text and simplified layout"
              checked={simplifiedMode}
              onChange={setSimplifiedMode}
            />

            {/* Language switcher */}
            <div>
              <label className="block font-semibold text-base mb-2" htmlFor="langSelect">
                🌐 Language
              </label>
              <select
                id="langSelect"
                className="w-full p-3 rounded-xl border-2 border-gray-200 text-base
                           focus:border-french-blue transition-colors min-h-[48px]"
                aria-label="Select language"
              >
                <option value="en">English</option>
                <option value="zh">中文 (Chinese)</option>
                <option value="ms">Bahasa Melayu</option>
                <option value="ta">தமிழ் (Tamil)</option>
              </select>
            </div>

            {/* Repeat instruction button */}
            <button
              onClick={() => speak("You can use these settings to make the website easier to use. Adjust the font size, turn on high contrast, or enable audio narration.")}
              className="w-full btn-secondary text-base"
            >
              🔁 Repeat Instructions
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function ToggleOption({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <div className="flex items-start gap-3">
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`mt-1 w-12 h-7 rounded-full transition-colors flex-shrink-0 relative
                    ${checked ? "bg-cool-sky" : "bg-gray-300"}`}
        aria-label={label}
      >
        <span
          className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform
                      ${checked ? "translate-x-5" : "translate-x-0.5"}`}
        />
      </button>
      <div>
        <p className="font-semibold text-base">{label}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
