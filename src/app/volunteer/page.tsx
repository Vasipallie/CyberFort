"use client";

import { useState } from "react";

const mockSessions = [
  { id: 1, date: "2026-02-20", time: "10:00 AM", senior: "Mdm Tan Siew Lian", module: "Government Login", status: "Upcoming", confidenceBefore: 25, confidenceAfter: null, notes: "" },
  { id: 2, date: "2026-02-19", time: "2:00 PM", senior: "Mr. Robert Lim", module: "Scam Awareness", status: "Completed", confidenceBefore: 30, confidenceAfter: 72, notes: "Very engaged. Struggled with URL checking but improved quickly." },
  { id: 3, date: "2026-02-18", time: "11:00 AM", senior: "Mrs. Kamala Devi", module: "Healthcare Booking", status: "Completed", confidenceBefore: 15, confidenceAfter: 68, notes: "Needed extra time with date pickers. Very motivated." },
  { id: 4, date: "2026-02-17", time: "3:00 PM", senior: "Mr. Wong Ah Kow", module: "Online Banking", status: "Completed", confidenceBefore: 20, confidenceAfter: 55, notes: "First time using a computer. Made great progress!" },
  { id: 5, date: "2026-02-21", time: "10:30 AM", senior: "Mdm Siti Aminah", module: "Form Filling", status: "Upcoming", confidenceBefore: 35, confidenceAfter: null, notes: "" },
];

export default function VolunteerPage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "schedule" | "stats">("dashboard");
  const [sessions] = useState(mockSessions);

  const completedSessions = sessions.filter((s) => s.status === "Completed");
  const totalHours = completedSessions.length * 1.5;
  const avgImprovement = completedSessions.length > 0
    ? Math.round(completedSessions.reduce((sum, s) => sum + ((s.confidenceAfter || 0) - s.confidenceBefore), 0) / completedSessions.length)
    : 0;

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-5xl mb-3">🤝</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-french-blue mb-3">
            Volunteer Portal
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Help seniors build digital confidence. Track your sessions, measure impact,
            and make a difference.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { key: "dashboard", label: "📋 My Sessions", icon: "" },
            { key: "schedule", label: "📅 Schedule", icon: "" },
            { key: "stats", label: "📊 My Impact", icon: "" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`px-6 py-3 rounded-xl font-semibold min-h-[48px] transition-colors ${
                activeTab === tab.key ? "bg-french-blue text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "dashboard" && (
          <>
            <div className="space-y-4">
              {sessions.map((session) => (
                <div key={session.id} className="card flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        session.status === "Completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {session.status}
                      </span>
                      <span className="text-sm text-gray-500">{session.date} • {session.time}</span>
                    </div>
                    <h3 className="text-lg font-bold text-french-blue">{session.senior}</h3>
                    <p className="text-gray-600">Module: {session.module}</p>
                    {session.notes && (
                      <p className="text-sm text-gray-500 mt-1 italic">📝 {session.notes}</p>
                    )}
                  </div>

                  {session.status === "Completed" && (
                    <div className="flex gap-3">
                      <div className="bg-honeydew rounded-xl p-3 text-center min-w-[80px]">
                        <p className="text-xs text-gray-500">Before</p>
                        <p className="font-bold text-orange-500">{session.confidenceBefore}%</p>
                      </div>
                      <div className="bg-honeydew rounded-xl p-3 text-center min-w-[80px]">
                        <p className="text-xs text-gray-500">After</p>
                        <p className="font-bold text-green-600">{session.confidenceAfter}%</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "schedule" && (
          <div className="card">
            <h2 className="text-xl font-bold text-french-blue mb-6">Schedule a New Session</h2>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); }}>
              <div>
                <label className="block font-semibold text-base mb-2" htmlFor="seniorName">Senior&apos;s Name</label>
                <input id="seniorName" type="text" placeholder="Enter the senior's name" className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-cool-sky transition-colors min-h-[48px]" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-base mb-2" htmlFor="sessionDate">Date</label>
                  <input id="sessionDate" type="date" className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-cool-sky transition-colors min-h-[48px]" />
                </div>
                <div>
                  <label className="block font-semibold text-base mb-2" htmlFor="sessionTime">Time</label>
                  <input id="sessionTime" type="time" className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-cool-sky transition-colors min-h-[48px]" />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-base mb-2" htmlFor="moduleSelect">Module</label>
                <select id="moduleSelect" className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-cool-sky transition-colors min-h-[48px]">
                  <option>Government Login Practice</option>
                  <option>Healthcare Appointment Booking</option>
                  <option>Scam Awareness Training</option>
                  <option>Online Banking Basics</option>
                  <option>Form Filling Practice</option>
                  <option>Digital Payment Practice</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-base mb-2" htmlFor="initialConfidence">Initial Confidence Level (%)</label>
                <input id="initialConfidence" type="number" min="0" max="100" placeholder="e.g. 25" className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-cool-sky transition-colors min-h-[48px]" />
              </div>
              <div>
                <label className="block font-semibold text-base mb-2" htmlFor="sessionNotes">Notes</label>
                <textarea id="sessionNotes" rows={3} placeholder="Any notes about the session..." className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-cool-sky transition-colors" />
              </div>
              <button type="submit" className="btn-primary">📅 Schedule Session</button>
            </form>

            <div className="mt-8">
              <h3 className="font-bold text-french-blue mb-4">Upload Feedback</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-cool-sky transition-colors cursor-pointer">
                <div className="text-4xl mb-2">📎</div>
                <p className="text-gray-500">Click or drag to upload session feedback</p>
                <p className="text-sm text-gray-400">.pdf, .doc, .txt files accepted</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "stats" && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="card text-center">
                <div className="text-3xl mb-2">⏱️</div>
                <div className="text-2xl font-bold text-french-blue">{totalHours}h</div>
                <p className="text-sm text-gray-500">Hours Contributed</p>
              </div>
              <div className="card text-center">
                <div className="text-3xl mb-2">🎓</div>
                <div className="text-2xl font-bold text-french-blue">{completedSessions.length}</div>
                <p className="text-sm text-gray-500">Certificates Issued</p>
              </div>
              <div className="card text-center">
                <div className="text-3xl mb-2">📈</div>
                <div className="text-2xl font-bold text-green-600">+{avgImprovement}%</div>
                <p className="text-sm text-gray-500">Avg Confidence Improvement</p>
              </div>
              <div className="card text-center">
                <div className="text-3xl mb-2">👥</div>
                <div className="text-2xl font-bold text-french-blue">{new Set(sessions.map((s) => s.senior)).size}</div>
                <p className="text-sm text-gray-500">Seniors Helped</p>
              </div>
            </div>

            {/* Visual impact chart */}
            <div className="card">
              <h2 className="text-xl font-bold text-french-blue mb-6">Your Impact Over Time</h2>
              <div className="flex items-end gap-4 h-48">
                {completedSessions.map((s) => (
                  <div key={s.id} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex gap-1 justify-center" style={{ height: `${((s.confidenceAfter || 0) / 100) * 150}px` }}>
                      <div className="w-1/2 bg-orange-300 rounded-t-lg" style={{ height: `${(s.confidenceBefore / (s.confidenceAfter || 1)) * 100}%` }} />
                      <div className="w-1/2 bg-green-400 rounded-t-lg h-full" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center truncate w-full">{s.senior.split(" ")[0]}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                <span className="flex items-center gap-1"><span className="w-4 h-4 bg-orange-300 rounded-full" /> Before</span>
                <span className="flex items-center gap-1"><span className="w-4 h-4 bg-green-400 rounded-full" /> After</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
