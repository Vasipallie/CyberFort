"use client";
import { useState } from "react";
import { FAKE_HEALTHCARE } from "@/lib/credentials";

interface Props {
  isGuided: boolean;
  onComplete: (score: number, errors: number) => void;
  onSpeak: (text: string) => void;
}

type Step = "landing" | "selectDoctor" | "selectDate" | "selectTime" | "review" | "confirmed";

export default function HealthcareSim({ isGuided, onComplete, onSpeak }: Props) {
  const [step, setStep] = useState<Step>("landing");
  const [selectedDoctor, setSelectedDoctor] = useState<typeof FAKE_HEALTHCARE.doctors[0] | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);

  const addScore = (pts: number) => setScore(s => s + pts);

  if (step === "landing") {
    return (
      <div className="w-full">
        <div className="bg-gradient-to-b from-teal-600 to-teal-700 rounded-t-xl p-6 text-white text-center">
          <div className="flex items-center justify-center gap-3 mb-1">
            <span className="text-4xl">🏥</span>
            <div>
              <h2 className="text-2xl font-bold">HealthConnect</h2>
              <p className="text-teal-200 text-sm">Practice Appointment System</p>
            </div>
          </div>
          <div className="bg-yellow-400/20 text-yellow-200 text-xs px-4 py-1.5 rounded-full inline-block mt-2">
            🛡️ SAFE PRACTICE MODE — This is not a real healthcare portal
          </div>
        </div>
        <div className="bg-white rounded-b-xl p-8 border border-t-0 border-gray-200 text-center">
          <p className="text-gray-500 mb-6">Book medical appointments safely in this practice environment</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => { setStep("selectDoctor"); addScore(10); onSpeak("Let's start by choosing your doctor."); }}
              className={`btn-primary text-lg px-8 ${isGuided ? "ring-4 ring-cool-sky/40 relative" : ""}`}
            >
              {isGuided && <span className="absolute -top-3 -right-3 text-2xl hand-pointer">👆</span>}
              📅 Book an Appointment
            </button>
            <button className="btn-secondary text-lg px-8 opacity-60 cursor-not-allowed">
              📋 My Appointments
            </button>
          </div>
          {isGuided && (
            <div className="mt-6 bg-honeydew rounded-xl p-4 text-left text-sm">
              <p className="font-bold text-french-blue mb-1">📝 Guided Instruction:</p>
              <p className="text-gray-700">Click &quot;Book an Appointment&quot; to start the booking process.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (step === "selectDoctor") {
    return (
      <div className="w-full">
        <div className="bg-teal-700 rounded-t-xl p-4 text-white flex items-center gap-2">
          <span className="text-xl">🏥</span>
          <span className="font-bold">HealthConnect</span>
          <span className="text-xs text-teal-200 ml-auto">Step 1 of 4</span>
        </div>
        <div className="bg-white rounded-b-xl p-6 border border-t-0 border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-1">Select a Doctor</h3>
          <p className="text-gray-500 text-sm mb-6">Choose from our available practitioners</p>

          <div className="space-y-3">
            {FAKE_HEALTHCARE.doctors.map((doc) => (
              <button
                key={doc.id}
                onClick={() => {
                  setSelectedDoctor(doc);
                  addScore(10);
                  setStep("selectDate");
                  onSpeak(`You selected ${doc.name}. Now choose an appointment date.`);
                }}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all min-h-[48px] flex items-center gap-4
                  ${isGuided && !selectedDoctor ? "border-cool-sky bg-cool-sky/5 hover:bg-cool-sky/10" : "border-gray-200 hover:border-teal-400 hover:bg-teal-50"}`}
              >
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-xl flex-shrink-0">👨‍⚕️</div>
                <div className="flex-1">
                  <p className="font-bold text-gray-800">{doc.name}</p>
                  <p className="text-sm text-gray-500">{doc.specialty} — {doc.clinic}</p>
                </div>
                <div className="text-sm text-yellow-500 font-bold">⭐ {doc.rating}</div>
              </button>
            ))}
          </div>

          {isGuided && (
            <div className="mt-4 bg-honeydew rounded-xl p-4 text-sm">
              <p className="font-bold text-french-blue mb-1">💡 Hint:</p>
              <p className="text-gray-700">Click on any doctor to select them. This is just practice — any choice works!</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (step === "selectDate") {
    return (
      <div className="w-full">
        <div className="bg-teal-700 rounded-t-xl p-4 text-white flex items-center gap-2">
          <span className="text-xl">🏥</span>
          <span className="font-bold">HealthConnect</span>
          <span className="text-xs text-teal-200 ml-auto">Step 2 of 4</span>
        </div>
        <div className="bg-white rounded-b-xl p-6 border border-t-0 border-gray-200">
          <button onClick={() => setStep("selectDoctor")} className="text-teal-600 hover:underline text-sm mb-3 inline-block">← Change doctor</button>
          <h3 className="text-xl font-bold text-gray-800 mb-1">Select a Date</h3>
          <p className="text-gray-500 text-sm mb-2">Doctor: <strong>{selectedDoctor?.name}</strong></p>
          <p className="text-gray-400 text-xs mb-6">🟢 Green = Available &nbsp; 🔴 Red = Fully booked</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FAKE_HEALTHCARE.availableDates.map((date) => (
              <button
                key={date}
                onClick={() => {
                  setSelectedDate(date);
                  addScore(10);
                  setStep("selectTime");
                  onSpeak(`You picked ${date}. Now select a time slot.`);
                }}
                className={`p-4 rounded-xl border-2 text-left transition-all min-h-[48px]
                  ${isGuided ? "border-green-400 bg-green-50 hover:bg-green-100" : "border-gray-200 hover:border-teal-400"}`}
              >
                <p className="font-bold text-gray-800">📅 {date}</p>
                <p className="text-xs text-green-600">✓ Slots available</p>
              </button>
            ))}
            {/* One unavailable date */}
            <div className="p-4 rounded-xl border-2 border-red-200 bg-red-50 opacity-60 cursor-not-allowed">
              <p className="font-bold text-gray-500">📅 Sat, 1 Mar 2026</p>
              <p className="text-xs text-red-500">✗ Fully booked</p>
            </div>
          </div>

          {isGuided && (
            <div className="mt-4 bg-honeydew rounded-xl p-4 text-sm">
              <p className="font-bold text-french-blue mb-1">💡 Hint:</p>
              <p className="text-gray-700">Click on any green date to select it. The red date is fully booked and can&apos;t be selected.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (step === "selectTime") {
    return (
      <div className="w-full">
        <div className="bg-teal-700 rounded-t-xl p-4 text-white flex items-center gap-2">
          <span className="text-xl">🏥</span>
          <span className="font-bold">HealthConnect</span>
          <span className="text-xs text-teal-200 ml-auto">Step 3 of 4</span>
        </div>
        <div className="bg-white rounded-b-xl p-6 border border-t-0 border-gray-200">
          <button onClick={() => setStep("selectDate")} className="text-teal-600 hover:underline text-sm mb-3 inline-block">← Change date</button>
          <h3 className="text-xl font-bold text-gray-800 mb-1">Select a Time Slot</h3>
          <p className="text-gray-500 text-sm mb-6">{selectedDoctor?.name} — {selectedDate}</p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {FAKE_HEALTHCARE.timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => {
                  setSelectedTime(time);
                  addScore(10);
                  setStep("review");
                  onSpeak(`Time slot ${time} selected. Review your booking details.`);
                }}
                className={`p-3 rounded-xl border-2 text-center font-semibold transition-all min-h-[48px]
                  ${isGuided ? "border-cool-sky bg-cool-sky/5 hover:bg-cool-sky/10 text-french-blue" : "border-gray-200 hover:border-teal-400 text-gray-700"}`}
              >
                {time}
              </button>
            ))}
          </div>

          {isGuided && (
            <div className="mt-4 bg-honeydew rounded-xl p-4 text-sm">
              <p className="font-bold text-french-blue mb-1">💡 Hint:</p>
              <p className="text-gray-700">Pick any time that works for you. All times are available for practice.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (step === "review") {
    return (
      <div className="w-full">
        <div className="bg-teal-700 rounded-t-xl p-4 text-white flex items-center gap-2">
          <span className="text-xl">🏥</span>
          <span className="font-bold">HealthConnect</span>
          <span className="text-xs text-teal-200 ml-auto">Step 4 of 4</span>
        </div>
        <div className="bg-white rounded-b-xl p-6 border border-t-0 border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📋 Confirm Your Appointment</h3>
          <div className="bg-gray-50 rounded-xl p-5 space-y-3 mb-6">
            <div className="flex justify-between"><span className="text-gray-500">Doctor</span><span className="font-bold">{selectedDoctor?.name}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Specialty</span><span className="font-bold">{selectedDoctor?.specialty}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Clinic</span><span className="font-bold">{selectedDoctor?.clinic}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Date</span><span className="font-bold">{selectedDate}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Time</span><span className="font-bold">{selectedTime}</span></div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => { setStep("confirmed"); addScore(10); onSpeak("Appointment confirmed! Well done!"); }}
              className={`btn-primary text-lg flex-1 ${isGuided ? "ring-4 ring-cool-sky/40 relative" : ""}`}
            >
              {isGuided && <span className="absolute -top-3 -right-3 text-2xl hand-pointer">👆</span>}
              ✅ Confirm Booking
            </button>
            <button onClick={() => setStep("selectDoctor")} className="btn-secondary flex-1">
              ✏️ Change Details
            </button>
          </div>

          {isGuided && (
            <div className="mt-4 bg-honeydew rounded-xl p-4 text-sm">
              <p className="font-bold text-french-blue mb-1">📝 Guided Instruction:</p>
              <p className="text-gray-700">Review the details above. If everything looks correct, click &quot;Confirm Booking&quot;.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Confirmed
  return (
    <div className="w-full">
      <div className="bg-teal-700 rounded-t-xl p-4 text-white flex items-center gap-2">
        <span className="text-xl">🏥</span>
        <span className="font-bold">HealthConnect</span>
        <span className="text-xs text-green-200 ml-auto">✓ Booked</span>
      </div>
      <div className="bg-white rounded-b-xl p-8 border border-t-0 border-gray-200 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h3 className="text-2xl font-bold text-green-700 mb-2">Appointment Confirmed!</h3>
        <p className="text-gray-500 mb-6">You will receive an SMS confirmation shortly.</p>

        <div className="bg-green-50 border border-green-200 rounded-xl p-5 max-w-sm mx-auto mb-6 text-left">
          <p className="text-sm"><strong>Doctor:</strong> {selectedDoctor?.name}</p>
          <p className="text-sm"><strong>Date:</strong> {selectedDate}</p>
          <p className="text-sm"><strong>Time:</strong> {selectedTime}</p>
          <p className="text-sm"><strong>Ref:</strong> HC-2026-{Math.floor(Math.random() * 9000 + 1000)}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={() => onComplete(score, errors)} className="btn-primary">
            ✅ Complete Module
          </button>
          <button onClick={() => { setStep("landing"); setScore(0); setErrors(0); }} className="btn-secondary">
            🔁 Practice Again
          </button>
        </div>
      </div>
    </div>
  );
}
