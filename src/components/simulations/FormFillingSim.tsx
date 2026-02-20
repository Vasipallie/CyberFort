"use client";
import { useState } from "react";

interface Props {
  isGuided: boolean;
  onComplete: (score: number, errors: number) => void;
  onSpeak: (text: string) => void;
}

type Step = "landing" | "form" | "review" | "submitted";

export default function FormFillingSim({ isGuided, onComplete, onSpeak }: Props) {
  const [step, setStep] = useState<Step>("landing");
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);

  // Form fields
  const [fullName, setFullName] = useState("");
  const [nric, setNric] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [purpose, setPurpose] = useState("");
  const [consent, setConsent] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const addScore = (pts: number) => setScore(s => s + pts);

  const validateForm = (): boolean => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = "Full name is required";
    if (!nric.trim()) errs.nric = "NRIC/FIN is required";
    if (!email.includes("@")) errs.email = "Enter a valid email address";
    if (phone.replace(/\s/g, "").length < 8) errs.phone = "Phone number must be at least 8 digits";
    if (!dob) errs.dob = "Date of birth is required";
    if (!gender) errs.gender = "Select a gender";
    if (!address.trim()) errs.address = "Address is required";
    if (postalCode.length < 5) errs.postalCode = "Postal code must be at least 5 digits";
    if (!purpose) errs.purpose = "Select a purpose";
    if (!consent) errs.consent = "You must agree to continue";
    setFormErrors(errs);
    if (Object.keys(errs).length > 0) {
      setErrors(e => e + 1);
      return false;
    }
    return true;
  };

  if (step === "landing") {
    return (
      <div className="w-full">
        <div className="bg-gradient-to-b from-[#2e7d32] to-[#388e3c] rounded-t-xl p-6 text-white text-center">
          <div className="flex items-center justify-center gap-3 mb-1">
            <span className="text-4xl">📝</span>
            <div>
              <h2 className="text-2xl font-bold">Practice Form</h2>
              <p className="text-green-200 text-sm">Learn to Fill Online Forms</p>
            </div>
          </div>
          <div className="bg-yellow-400/20 text-yellow-200 text-xs px-4 py-1.5 rounded-full inline-block mt-2">
            🛡️ SAFE PRACTICE MODE — Your data is not saved
          </div>
        </div>
        <div className="bg-white rounded-b-xl p-8 border border-t-0 border-gray-200 text-center">
          <p className="text-gray-500 mb-2">Practice filling common government and service forms</p>
          <p className="text-sm text-gray-400 mb-6">Includes text fields, dropdowns, date pickers, radio buttons &amp; checkboxes</p>
          <button
            onClick={() => { setStep("form"); addScore(10); onSpeak("Fill in each field of the practice form. Take your time!"); }}
            className={`btn-primary text-lg px-10 ${isGuided ? "ring-4 ring-cool-sky/40 relative" : ""}`}
          >
            {isGuided && <span className="absolute -top-3 -right-3 text-2xl hand-pointer">👆</span>}
            📝 Start Practice Form
          </button>
          {isGuided && (
            <div className="mt-6 bg-honeydew rounded-xl p-4 text-left text-sm">
              <p className="font-bold text-french-blue mb-1">📝 Guided Instruction:</p>
              <p className="text-gray-700">This form teaches you how to fill different types of fields. Click &quot;Start&quot; to begin.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (step === "form") {
    const fieldClass = (name: string) =>
      `w-full p-4 rounded-xl border-2 text-base min-h-[48px] transition-colors focus:outline-none
       ${formErrors[name] ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-french-blue"}`;

    return (
      <div className="w-full">
        <div className="bg-[#388e3c] rounded-t-xl p-4 text-white flex items-center gap-2">
          <span className="text-xl">📝</span><span className="font-bold">Practice Form — Application</span>
          <span className="text-xs bg-yellow-400/20 text-yellow-200 px-2 py-0.5 rounded-full ml-auto">PRACTICE</span>
        </div>
        <div className="bg-white rounded-b-xl p-6 border border-t-0 border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Community Centre Programme Registration</h3>
          <p className="text-sm text-gray-500 mb-6">Please fill in all required fields (<span className="text-red-500">*</span>)</p>

          <div className="space-y-5">
            {/* Full Name */}
            <div>
              <label htmlFor="ff-name" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input id="ff-name" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Margaret Chen"
                className={`${fieldClass("fullName")} ${isGuided && !fullName ? "!border-cool-sky !bg-cool-sky/5" : ""}`}
              />
              {formErrors.fullName && <p className="text-red-500 text-xs mt-1">⚠️ {formErrors.fullName}</p>}
            </div>

            {/* NRIC */}
            <div>
              <label htmlFor="ff-nric" className="block text-sm font-semibold text-gray-700 mb-1.5">
                NRIC / FIN <span className="text-red-500">*</span>
              </label>
              <input id="ff-nric" type="text" value={nric} onChange={(e) => setNric(e.target.value.toUpperCase())}
                placeholder="e.g. S1234567A"
                className={fieldClass("nric")}
              />
              {formErrors.nric && <p className="text-red-500 text-xs mt-1">⚠️ {formErrors.nric}</p>}
            </div>

            {/* Email & Phone row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="ff-email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <input id="ff-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. margaret@email.com"
                  className={fieldClass("email")}
                />
                {formErrors.email && <p className="text-red-500 text-xs mt-1">⚠️ {formErrors.email}</p>}
              </div>
              <div>
                <label htmlFor="ff-phone" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input id="ff-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9123 4567"
                  className={fieldClass("phone")}
                />
                {formErrors.phone && <p className="text-red-500 text-xs mt-1">⚠️ {formErrors.phone}</p>}
              </div>
            </div>

            {/* Date of Birth & Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="ff-dob" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input id="ff-dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)}
                  className={fieldClass("dob")}
                />
                {formErrors.dob && <p className="text-red-500 text-xs mt-1">⚠️ {formErrors.dob}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4 mt-2">
                  {["Male", "Female", "Other"].map((g) => (
                    <label key={g} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="gender" value={g} checked={gender === g}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-5 h-5 accent-french-blue"
                      />
                      <span className="text-gray-700">{g}</span>
                    </label>
                  ))}
                </div>
                {formErrors.gender && <p className="text-red-500 text-xs mt-1">⚠️ {formErrors.gender}</p>}
              </div>
            </div>

            {/* Address */}
            <div>
              <label htmlFor="ff-addr" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea id="ff-addr" value={address} onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Block 123, Jurong East Ave 1, #08-456"
                rows={2}
                className={fieldClass("address")}
              />
              {formErrors.address && <p className="text-red-500 text-xs mt-1">⚠️ {formErrors.address}</p>}
            </div>

            {/* Postal Code */}
            <div className="max-w-xs">
              <label htmlFor="ff-postal" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Postal Code <span className="text-red-500">*</span>
              </label>
              <input id="ff-postal" type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)}
                placeholder="e.g. 640123"
                className={fieldClass("postalCode")}
              />
              {formErrors.postalCode && <p className="text-red-500 text-xs mt-1">⚠️ {formErrors.postalCode}</p>}
            </div>

            {/* Purpose (dropdown) */}
            <div>
              <label htmlFor="ff-purpose" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Purpose of Registration <span className="text-red-500">*</span>
              </label>
              <select id="ff-purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)}
                className={fieldClass("purpose")}
              >
                <option value="">-- Select purpose --</option>
                <option value="fitness">Fitness & Exercise</option>
                <option value="arts">Arts & Crafts</option>
                <option value="tech">Technology Workshop</option>
                <option value="language">Language Class</option>
                <option value="social">Social Activities</option>
              </select>
              {formErrors.purpose && <p className="text-red-500 text-xs mt-1">⚠️ {formErrors.purpose}</p>}
            </div>

            {/* Consent checkbox */}
            <div className="bg-gray-50 rounded-xl p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)}
                  className="w-5 h-5 mt-0.5 accent-french-blue"
                />
                <span className="text-sm text-gray-700">
                  I confirm that the information above is accurate and I agree to the terms and conditions of the programme. <span className="text-red-500">*</span>
                </span>
              </label>
              {formErrors.consent && <p className="text-red-500 text-xs mt-1 ml-8">⚠️ {formErrors.consent}</p>}
            </div>

            <button onClick={() => {
              if (validateForm()) {
                addScore(30);
                setStep("review");
                onSpeak("Great job! Review your form before submitting.");
              }
            }}
              className={`w-full btn-primary text-lg ${isGuided ? "ring-4 ring-cool-sky/40 relative" : ""}`}>
              {isGuided && <span className="absolute -top-3 -right-3 text-2xl hand-pointer">👆</span>}
              Review Submission →
            </button>
          </div>

          {isGuided && (
            <div className="mt-6 bg-honeydew rounded-xl p-4 text-sm">
              <p className="font-bold text-french-blue mb-2">💡 Tips for filling forms:</p>
              <ul className="list-disc ml-5 text-gray-700 space-y-1">
                <li>Fill in <strong>every</strong> field marked with a red asterisk (*)</li>
                <li>Use the <strong>date picker</strong> for date of birth</li>
                <li>Select a <strong>radio button</strong> for gender</li>
                <li>Choose from the <strong>dropdown</strong> for purpose</li>
                <li>Check the <strong>consent checkbox</strong> at the bottom</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (step === "review") {
    return (
      <div className="w-full">
        <div className="bg-[#388e3c] rounded-t-xl p-4 text-white flex items-center gap-2">
          <span className="text-xl">📝</span><span className="font-bold">Review Submission</span>
        </div>
        <div className="bg-white rounded-b-xl p-6 border border-t-0 border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📋 Review Your Details</h3>
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 space-y-3 text-sm">
            {[
              ["Full Name", fullName],
              ["NRIC/FIN", nric],
              ["Email", email],
              ["Phone", phone],
              ["Date of Birth", dob],
              ["Gender", gender],
              ["Address", address],
              ["Postal Code", postalCode],
              ["Purpose", purpose],
              ["Consent", consent ? "✅ Yes" : "No"],
            ].map(([label, value]) => (
              <div key={label as string} className="flex justify-between border-b border-green-100 pb-2 last:border-0">
                <span className="text-gray-500">{label}:</span>
                <span className="font-semibold text-gray-800 text-right max-w-[60%]">{value}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setStep("form")} className="flex-1 btn-secondary py-4 text-lg">← Edit</button>
            <button onClick={() => { addScore(20); setStep("submitted"); onSpeak("Form submitted successfully! Well done."); }}
              className={`flex-1 btn-primary py-4 text-lg ${isGuided ? "ring-4 ring-cool-sky/40 relative" : ""}`}>
              {isGuided && <span className="absolute -top-3 -right-3 text-2xl hand-pointer">👆</span>}
              ✅ Submit
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Submitted
  return (
    <div className="w-full">
      <div className="bg-[#388e3c] rounded-t-xl p-4 text-white flex items-center gap-2">
        <span className="text-xl">📝</span><span className="font-bold">Form Submitted</span>
      </div>
      <div className="bg-white rounded-b-xl p-8 border border-t-0 border-gray-200 text-center">
        <div className="text-6xl mb-3">🎉</div>
        <h3 className="text-2xl font-bold text-green-600 mb-2">Registration Submitted!</h3>
        <p className="text-gray-500 mb-6">Your practice form has been submitted</p>
        <div className="bg-gray-50 rounded-xl p-6 max-w-sm mx-auto text-left space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-gray-500">Reference:</span><span className="font-mono font-bold">REG-{Math.random().toString(36).substr(2, 8).toUpperCase()}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Name:</span><span>{fullName}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Programme:</span><span className="capitalize">{purpose}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Status:</span><span className="text-green-600 font-bold">✅ Received</span></div>
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
