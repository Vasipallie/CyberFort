"use client";

import { useState } from "react";
import { FAKE_CREDENTIALS } from "@/lib/credentials";

interface Props {
    mode: "guided" | "independent";
    onComplete: (score: number, maxScore: number, errors: number) => void;
    onError: () => void;
}

type Step = "fill" | "review" | "success";

export default function FormFillingSim({ mode, onComplete, onError }: Props) {
    const [step, setStep] = useState<Step>("fill");
    const [formData, setFormData] = useState({
        fullName: "",
        nric: "",
        dob: "",
        phone: "",
        email: "",
        address: "",
        purpose: "",
        agree: false,
    });
    const [score, setScore] = useState(0);
    const [errors, setErrors] = useState(0);
    const isGuided = mode === "guided";
    const user = FAKE_CREDENTIALS.user;

    const updateField = (key: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const validateForm = () => {
        const required = ["fullName", "nric", "dob", "phone", "email", "address", "purpose"];
        const missing = required.filter((k) => !formData[k as keyof typeof formData]);
        if (missing.length > 0 || !formData.agree) {
            setErrors((e) => e + 1);
            onError();
            return false;
        }
        return true;
    };

    // Fill Form
    if (step === "fill") {
        return (
            <div className="max-w-2xl mx-auto mt-8 p-4">
                <div className="bg-[#2c3e50] text-white p-6 rounded-t-xl">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">📝</span>
                        <div>
                            <h2 className="text-2xl font-bold">Government Services</h2>
                            <p className="text-sm text-gray-300">Practice Form Submission</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-b-xl p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">Application Form</h3>
                    <p className="text-sm text-gray-500 mb-6">Fill in your personal details below</p>

                    {isGuided && (
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6 text-sm text-blue-800">
                            📝 <strong>Guided:</strong> Fill in each field using the practice information below:<br />
                            Name: <code>{user.fullName}</code> | NRIC: <code>{user.nric}</code> | DOB: <code>{user.dob}</code><br />
                            Phone: <code>{user.phone}</code> | Email: <code>{user.email}</code>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Full Name (as in NRIC) *</label>
                            <input type="text" value={formData.fullName} onChange={(e) => updateField("fullName", e.target.value)}
                                placeholder="e.g. Margaret Chen Siew Lian"
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-lg focus:border-[#2c3e50] focus:outline-none min-h-[48px]" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2">NRIC Number *</label>
                                <input type="text" value={formData.nric} onChange={(e) => updateField("nric", e.target.value)}
                                    placeholder="e.g. S1234567A"
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-lg focus:border-[#2c3e50] focus:outline-none min-h-[48px]" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Date of Birth *</label>
                                <input type="text" value={formData.dob} onChange={(e) => updateField("dob", e.target.value)}
                                    placeholder="e.g. 15/03/1954"
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-lg focus:border-[#2c3e50] focus:outline-none min-h-[48px]" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                                <input type="text" value={formData.phone} onChange={(e) => updateField("phone", e.target.value)}
                                    placeholder="e.g. 9123 4567"
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-lg focus:border-[#2c3e50] focus:outline-none min-h-[48px]" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Email Address *</label>
                                <input type="email" value={formData.email} onChange={(e) => updateField("email", e.target.value)}
                                    placeholder="e.g. margaret@email.com"
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-lg focus:border-[#2c3e50] focus:outline-none min-h-[48px]" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">Address *</label>
                            <input type="text" value={formData.address} onChange={(e) => updateField("address", e.target.value)}
                                placeholder="e.g. Blk 123 Ang Mo Kio Ave 4, #08-456"
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-lg focus:border-[#2c3e50] focus:outline-none min-h-[48px]" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">Purpose of Application *</label>
                            <select value={formData.purpose} onChange={(e) => updateField("purpose", e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-lg focus:border-[#2c3e50] focus:outline-none min-h-[48px] bg-white">
                                <option value="">— Select —</option>
                                <option value="new">New Application</option>
                                <option value="renewal">Renewal</option>
                                <option value="replacement">Replacement</option>
                                <option value="update">Update of Information</option>
                            </select>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                            <input type="checkbox" id="agree" checked={formData.agree}
                                onChange={(e) => updateField("agree", e.target.checked)}
                                className="w-6 h-6 mt-0.5 rounded border-2 border-gray-300" />
                            <label htmlFor="agree" className="text-sm text-gray-700">
                                I declare that the information provided is true and correct. I understand that this is a practice form
                                and no real application will be submitted. *
                            </label>
                        </div>

                        <button onClick={() => {
                            if (validateForm()) { setScore((s) => s + 50); setStep("review"); }
                        }}
                            className={`w-full bg-[#2c3e50] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#1a252f]
                ${isGuided ? "ring-4 ring-blue-400 ring-offset-2" : ""}`}>
                            Review Form →
                        </button>
                    </div>
                </div>
                <div className="mt-4 bg-amber-50 border-2 border-amber-200 rounded-xl p-3 text-center">
                    <span className="text-sm font-bold text-amber-800">⚠️ PRACTICE MODE — This form will NOT be submitted</span>
                </div>
            </div>
        );
    }

    // Review
    if (step === "review") {
        const fields = [
            { label: "Full Name", value: formData.fullName },
            { label: "NRIC", value: formData.nric },
            { label: "Date of Birth", value: formData.dob },
            { label: "Phone", value: formData.phone },
            { label: "Email", value: formData.email },
            { label: "Address", value: formData.address },
            { label: "Purpose", value: formData.purpose },
        ];

        return (
            <div className="max-w-2xl mx-auto mt-8 p-4">
                <div className="bg-[#2c3e50] text-white p-4 rounded-t-xl flex items-center gap-3">
                    <button onClick={() => setStep("fill")} className="bg-white/20 px-3 py-1 rounded-lg text-sm">← Edit</button>
                    <span className="font-bold">Review Your Form</span>
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-b-xl p-6">
                    <h3 className="text-lg font-bold text-foreground mb-4">Please review before submitting</h3>
                    <div className="space-y-3 mb-6">
                        {fields.map((f) => (
                            <div key={f.label} className="flex justify-between p-3 bg-gray-50 rounded-xl">
                                <span className="text-sm font-semibold text-gray-600">{f.label}</span>
                                <span className="text-sm text-foreground">{f.value}</span>
                            </div>
                        ))}
                    </div>

                    {isGuided && (
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-4 text-sm text-blue-800">
                            📝 Check all details are correct. If yes, click &quot;Submit Form&quot;. If not, click &quot;← Edit&quot; above.
                        </div>
                    )}

                    <button onClick={() => { setScore((s) => s + 50); setStep("success"); }}
                        className={`w-full bg-[#2c3e50] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#1a252f]
              ${isGuided ? "ring-4 ring-blue-400 ring-offset-2" : ""}`}>
                        ✅ Submit Form
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
                <h3 className="text-2xl font-bold text-foreground mb-2">Form Submitted!</h3>
                <p className="text-gray-600 mb-4">(Practice only — no real form was submitted)</p>
                <div className="bg-green-50 rounded-xl p-4 text-left text-sm mb-6">
                    <p><strong>Reference:</strong> GOV-{Math.floor(Math.random() * 900000 + 100000)}</p>
                    <p><strong>Applicant:</strong> {formData.fullName}</p>
                    <p><strong>Status:</strong> Submitted (Practice)</p>
                </div>
                <button onClick={() => onComplete(score, 100, errors)} className="btn-primary">
                    ✅ Complete Module
                </button>
            </div>
        </div>
    );
}
