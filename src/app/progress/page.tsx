"use client";

import { useState } from "react";
import Link from "next/link";
import { mockUserProgress, mockCertificates, modules } from "@/lib/data";

export default function ProgressPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "certificates">("overview");

  const completedModules = mockUserProgress.filter((p) => p.completed);
  const totalHours = mockUserProgress.reduce((sum, p) => sum + p.timeSpent, 0);
  const avgConfidenceBefore = Math.round(mockUserProgress.reduce((sum, p) => sum + p.confidenceBefore, 0) / mockUserProgress.length);
  const avgConfidenceAfter = Math.round(mockUserProgress.reduce((sum, p) => sum + p.confidenceAfter, 0) / mockUserProgress.length);
  const avgErrorReduction = Math.round(mockUserProgress.reduce((sum, p) => sum + p.errorsReduced, 0) / mockUserProgress.length);
  const scamModule = mockUserProgress.find((p) => p.moduleId === "scam-awareness");
  const scamAccuracy = scamModule ? scamModule.score : 0;

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-french-blue mb-3">My Progress</h1>
        <p className="text-lg text-gray-600 mb-8">Track your learning journey and earn certificates</p>

        {/* Tab switcher */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-3 rounded-xl font-semibold min-h-[48px] transition-colors ${
              activeTab === "overview" ? "bg-french-blue text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            📊 Overview
          </button>
          <button
            onClick={() => setActiveTab("certificates")}
            className={`px-6 py-3 rounded-xl font-semibold min-h-[48px] transition-colors ${
              activeTab === "certificates" ? "bg-velvet-purple text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            🎓 Certificates
          </button>
        </div>

        {activeTab === "overview" && (
          <>
            {/* Summary stats */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <StatCard icon="📚" label="Modules Completed" value={`${completedModules.length}/${modules.length}`} />
              <StatCard icon="⏱️" label="Total Practice Time" value={`${totalHours} min`} />
              <StatCard icon="📉" label="Errors Reduced" value={`${avgErrorReduction}%`} />
              <StatCard icon="😊" label="Confidence Before" value={`${avgConfidenceBefore}%`} color="text-orange-500" />
              <StatCard icon="🌟" label="Confidence After" value={`${avgConfidenceAfter}%`} color="text-green-600" />
              <StatCard icon="🛡️" label="Scam Detection" value={`${scamAccuracy}%`} />
            </div>

            {/* Improvement chart (visual bar chart) */}
            <div className="card mb-8">
              <h2 className="text-xl font-bold text-french-blue mb-6">📈 Improvement Over Time</h2>
              <div className="space-y-4">
                {mockUserProgress.map((p) => {
                  const mod = modules.find((m) => m.id === p.moduleId);
                  return (
                    <div key={p.moduleId}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          {mod?.icon} {mod?.title}
                        </span>
                        <span className="text-sm text-gray-500">
                          {p.confidenceBefore}% → {p.confidenceAfter}%
                        </span>
                      </div>
                      <div className="flex gap-1 h-6">
                        <div
                          className="bg-orange-300 rounded-l-full h-full transition-all"
                          style={{ width: `${p.confidenceBefore}%` }}
                          title={`Before: ${p.confidenceBefore}%`}
                        />
                        <div
                          className="bg-green-400 rounded-r-full h-full transition-all"
                          style={{ width: `${p.confidenceAfter - p.confidenceBefore}%` }}
                          title={`Improvement: +${p.confidenceAfter - p.confidenceBefore}%`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                <span className="flex items-center gap-1"><span className="w-4 h-4 bg-orange-300 rounded-full inline-block" /> Before</span>
                <span className="flex items-center gap-1"><span className="w-4 h-4 bg-green-400 rounded-full inline-block" /> Improvement</span>
              </div>
            </div>

            {/* Error reduction trend */}
            <div className="card mb-8">
              <h2 className="text-xl font-bold text-french-blue mb-6">📉 Error Reduction Trend</h2>
              <div className="flex items-end gap-4 h-48">
                {mockUserProgress.map((p) => {
                  const mod = modules.find((m) => m.id === p.moduleId);
                  return (
                    <div key={p.moduleId} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-gradient-to-t from-cool-sky to-french-blue rounded-t-lg transition-all"
                        style={{ height: `${p.errorsReduced}%` }}
                        title={`${p.errorsReduced}% errors reduced`}
                      />
                      <p className="text-xs text-gray-500 mt-2 text-center truncate w-full">{mod?.icon}</p>
                      <p className="text-xs font-bold text-french-blue">{p.errorsReduced}%</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Confidence growth chart */}
            <div className="card">
              <h2 className="text-xl font-bold text-french-blue mb-6">🌱 Confidence Growth</h2>
              <div className="relative h-48 flex items-end gap-2">
                {mockUserProgress.map((p) => {
                  const mod = modules.find((m) => m.id === p.moduleId);
                  return (
                    <div key={p.moduleId} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex flex-col items-center">
                        <span className="text-xs text-green-600 font-bold">{p.confidenceAfter}%</span>
                        <div
                          className="w-full bg-gradient-to-t from-green-400 to-green-300 rounded-t-lg"
                          style={{ height: `${(p.confidenceAfter / 100) * 150}px` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500">{mod?.icon}</p>
                    </div>
                  );
                })}
              </div>
              <p className="text-sm text-gray-500 text-center mt-4">
                Your confidence is growing! Independence score: <strong className="text-french-blue">{Math.round(avgConfidenceAfter * 0.9)}%</strong>
              </p>
            </div>
          </>
        )}

        {activeTab === "certificates" && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {mockCertificates.map((cert) => (
                <div key={cert.id} className="certificate-border rounded-2xl p-8 shadow-lg">
                  <div className="text-center">
                    <div className="text-5xl mb-3">🎓</div>
                    <h2 className="text-sm font-bold text-velvet-purple tracking-widest uppercase mb-4">
                      Certificate of Completion
                    </h2>
                    <h3 className="text-2xl font-bold text-french-blue mb-1">
                      {cert.userName}
                    </h3>
                    <p className="text-gray-600 mb-4">has successfully completed</p>
                    <h4 className="text-xl font-bold text-velvet-purple mb-6">
                      {cert.moduleTitle}
                    </h4>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-honeydew rounded-xl p-3">
                        <p className="text-xs text-gray-500">Date</p>
                        <p className="font-bold text-french-blue text-sm">{cert.completedDate}</p>
                      </div>
                      <div className="bg-honeydew rounded-xl p-3">
                        <p className="text-xs text-gray-500">Practice Hours</p>
                        <p className="font-bold text-french-blue text-sm">{cert.practiceHours}h</p>
                      </div>
                      <div className="bg-honeydew rounded-xl p-3">
                        <p className="text-xs text-gray-500">Confidence Improvement</p>
                        <p className="font-bold text-green-600 text-sm">+{cert.confidenceImprovement}%</p>
                      </div>
                      <div className="bg-honeydew rounded-xl p-3">
                        <p className="text-xs text-gray-500">Certificate ID</p>
                        <p className="font-bold text-velvet-purple text-xs">{cert.certificateId}</p>
                      </div>
                    </div>

                    <div className="border-t border-velvet-purple/20 pt-4">
                      <p className="text-xs text-gray-400 mb-3">Issued by SafeDigital • Risk-Free Digital Training</p>
                      <button
                        onClick={() => {
                          // Simple print-to-PDF simulation
                          if (typeof window !== "undefined") window.print();
                        }}
                        className="btn-accent text-sm py-2 px-6"
                      >
                        📥 Download as PDF
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {mockCertificates.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📋</div>
                <h2 className="text-2xl font-bold text-french-blue mb-2">No Certificates Yet</h2>
                <p className="text-gray-600 mb-6">Complete a module to earn your first certificate!</p>
                <Link href="/dashboard" className="btn-primary">▶️ Start Practising</Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: string; label: string; value: string; color?: string }) {
  return (
    <div className="card text-center">
      <div className="text-3xl mb-2">{icon}</div>
      <div className={`text-2xl font-bold mb-1 ${color || "text-french-blue"}`}>{value}</div>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}
