"use client";

import { useState } from "react";
import { FAKE_HEALTHCARE, FAKE_CREDENTIALS } from "@/lib/credentials";

interface Props {
    mode: "guided" | "independent";
    onComplete: (score: number, maxScore: number, errors: number) => void;
    onError: () => void;
}

type Step = "select-doctor" | "select-date" | "confirm" | "success";

export default function HealthcareSim({ mode, onComplete, onError }: Props) {
    const [step, setStep] = useState<Step>("select-doctor");
    const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [score, setScore] = useState(0);
    const [errors, setErrors] = useState(0);
    const isGuided = mode === "guided";
    const user = FAKE_CREDENTIALS.user;
    const { doctors, availableDates, timeSlots } = FAKE_HEALTHCARE;

    const doctor = selectedDoctor !== null ? doctors.find((d) => d.id === selectedDoctor) : null;

    const handleSelectDoctor = (id: number) => {
        setSelectedDoctor(id);
        setScore((s) => s + 25);
        setStep("select-date");
    };

    const handleSelectDate = () => {
        if (!selectedDate || !selectedTime) {
            onError();
            setErrors((e) => e + 1);
            return;
        }
        setScore((s) => s + 25);
        setStep("confirm");
    };

    const handleConfirm = () => {
        setScore((s) => s + 25);
        setStep("success");
    };

    const handleComplete = () => {
        onComplete(score + 25, 100, errors);
    };

    // Select Doctor
    if (step === "select-doctor") {
        return (
            <div className="max-w-3xl mx-auto mt-8 p-4">
                <div className="bg-[#009688] text-white p-6 rounded-t-xl">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">🏥</span>
                        <div>
                            <h2 className="text-2xl font-bold">HealthHub</h2>
                            <p className="text-sm text-green-100">Practice Healthcare Portal</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-b-xl p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">Book an Appointment</h3>
                    <p className="text-gray-600 mb-6 text-sm">Select a doctor to begin</p>

                    {isGuided && (
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
                            <p className="text-sm text-blue-800">
                                📝 <strong>Guided:</strong> Click on any doctor below to select them for your appointment.
                            </p>
                        </div>
                    )}

                    <div className="space-y-3">
                        {doctors.map((doc) => (
                            <button
                                key={doc.id}
                                onClick={() => handleSelectDoctor(doc.id)}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all hover:bg-green-50 hover:border-green-300
                  ${isGuided ? "border-blue-300 ring-2 ring-blue-200" : "border-gray-200"}`}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-bold text-foreground">{doc.name}</div>
                                        <div className="text-sm text-gray-600">{doc.specialty} • {doc.clinic}</div>
                                    </div>
                                    <div className="text-sm text-amber-600">⭐ {doc.rating}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-4 bg-amber-50 border-2 border-amber-200 rounded-xl p-3 text-center">
                    <span className="text-sm font-bold text-amber-800">⚠️ PRACTICE MODE — Not the real HealthHub</span>
                </div>
            </div>
        );
    }

    // Select Date & Time
    if (step === "select-date") {
        return (
            <div className="max-w-3xl mx-auto mt-8 p-4">
                <div className="bg-[#009688] text-white p-4 rounded-t-xl flex items-center gap-3">
                    <span className="text-2xl">🏥</span>
                    <span className="font-bold text-lg">Select Date & Time</span>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-b-xl p-6">
                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                        <p className="text-sm"><strong>Doctor:</strong> {doctor?.name}</p>
                        <p className="text-sm text-gray-600">{doctor?.specialty} • {doctor?.clinic}</p>
                    </div>

                    {isGuided && (
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
                            <p className="text-sm text-blue-800">
                                📝 <strong>Guided:</strong> Select a date and time slot, then click &quot;Continue&quot;.
                            </p>
                        </div>
                    )}

                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">📅 Available Dates</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {availableDates.map((date) => (
                                <button
                                    key={date}
                                    onClick={() => setSelectedDate(date)}
                                    className={`p-3 rounded-xl text-sm font-medium transition-all border-2
                    ${selectedDate === date
                                            ? "bg-[#009688] text-white border-[#009688]"
                                            : "bg-white border-gray-200 hover:border-[#009688]"}`}
                                >
                                    {date}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">🕐 Time Slots</label>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                            {timeSlots.map((time) => (
                                <button
                                    key={time}
                                    onClick={() => setSelectedTime(time)}
                                    className={`p-3 rounded-xl text-sm font-medium transition-all border-2
                    ${selectedTime === time
                                            ? "bg-[#009688] text-white border-[#009688]"
                                            : "bg-white border-gray-200 hover:border-[#009688]"}`}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleSelectDate}
                        className={`w-full bg-[#009688] text-white py-4 rounded-xl font-bold text-lg
                       hover:bg-[#00796b] transition-all
                       ${isGuided && selectedDate && selectedTime ? "ring-4 ring-blue-400 ring-offset-2" : ""}`}
                    >
                        Continue →
                    </button>
                </div>
            </div>
        );
    }

    // Confirm
    if (step === "confirm") {
        return (
            <div className="max-w-lg mx-auto mt-8 p-4">
                <div className="bg-[#009688] text-white p-4 rounded-t-xl flex items-center gap-3">
                    <span className="text-2xl">🏥</span>
                    <span className="font-bold text-lg">Confirm Booking</span>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-b-xl p-6">
                    <h3 className="text-xl font-bold text-foreground mb-6">Review Your Appointment</h3>

                    <div className="space-y-3 mb-6">
                        {[
                            { label: "Patient", value: user.fullName },
                            { label: "NRIC", value: user.nric },
                            { label: "Doctor", value: doctor?.name || "" },
                            { label: "Clinic", value: doctor?.clinic || "" },
                            { label: "Date", value: selectedDate },
                            { label: "Time", value: selectedTime },
                        ].map((item) => (
                            <div key={item.label} className="flex justify-between p-3 bg-gray-50 rounded-xl">
                                <span className="text-sm font-semibold text-gray-600">{item.label}</span>
                                <span className="text-sm text-foreground">{item.value}</span>
                            </div>
                        ))}
                    </div>

                    {isGuided && (
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
                            <p className="text-sm text-blue-800">
                                📝 <strong>Guided:</strong> Review the details. If everything looks correct, click &quot;Confirm Booking&quot;.
                            </p>
                        </div>
                    )}

                    <button
                        onClick={handleConfirm}
                        className={`w-full bg-[#009688] text-white py-4 rounded-xl font-bold text-lg
                       hover:bg-[#00796b] transition-all
                       ${isGuided ? "ring-4 ring-blue-400 ring-offset-2" : ""}`}
                    >
                        ✅ Confirm Booking
                    </button>
                </div>
            </div>
        );
    }

    // Success
    return (
        <div className="max-w-lg mx-auto mt-8 p-4">
            <div className="bg-white border-2 border-green-200 rounded-xl p-8 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h3>
                <p className="text-gray-600 mb-6">
                    Your appointment has been successfully booked.
                </p>
                <div className="bg-green-50 rounded-xl p-4 text-left mb-6 text-sm space-y-1">
                    <p><strong>Reference:</strong> APC-2026-{Math.floor(Math.random() * 9000 + 1000)}</p>
                    <p><strong>Doctor:</strong> {doctor?.name}</p>
                    <p><strong>Date:</strong> {selectedDate} at {selectedTime}</p>
                    <p><strong>Clinic:</strong> {doctor?.clinic}</p>
                </div>
                <button onClick={handleComplete} className="btn-primary">
                    ✅ Complete Module
                </button>
            </div>
        </div>
    );
}
