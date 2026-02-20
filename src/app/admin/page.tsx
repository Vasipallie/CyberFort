"use client";

import { adminStats } from "@/lib/data";

export default function AdminPage() {
  const { totalUsers, totalSessions, certificatesIssued, avgImprovement, mostDifficultModule, mostCommonMistake, scamAwarenessAccuracy, monthlyData } = adminStats;

  const maxSessions = Math.max(...monthlyData.map((d) => d.sessions));

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-french-blue">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Platform analytics and performance overview</p>
          </div>
          <span className="bg-french-blue text-white px-4 py-2 rounded-full text-sm font-semibold">
            🔒 Admin View
          </span>
        </div>

        {/* Top-level stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard icon="👥" label="Total Users" value={totalUsers.toLocaleString()} />
          <StatsCard icon="📊" label="Total Sessions" value={totalSessions.toLocaleString()} />
          <StatsCard icon="🎓" label="Certificates Issued" value={certificatesIssued.toLocaleString()} />
          <StatsCard icon="📈" label="Avg Improvement" value={`${avgImprovement}%`} color="text-green-600" />
        </div>

        {/* Key insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">⚠️ Most Difficult Module</h3>
            <p className="text-lg font-bold text-french-blue">{mostDifficultModule}</p>
            <p className="text-sm text-gray-500 mt-1">Highest error rate among all modules</p>
          </div>
          <div className="card">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">🐛 Most Common Mistake</h3>
            <p className="text-lg font-bold text-french-blue">{mostCommonMistake}</p>
            <p className="text-sm text-gray-500 mt-1">Identified across all user sessions</p>
          </div>
          <div className="card">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">🛡️ Scam Awareness Accuracy</h3>
            <div className="flex items-center gap-3">
              <p className="text-3xl font-bold text-green-600">{scamAwarenessAccuracy}%</p>
              <div className="flex-1 bg-gray-200 rounded-full h-4">
                <div
                  className="h-full bg-gradient-to-r from-cool-sky to-green-400 rounded-full"
                  style={{ width: `${scamAwarenessAccuracy}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Monthly bar chart */}
        <div className="card mb-8">
          <h2 className="text-xl font-bold text-french-blue mb-6">📊 Monthly Growth</h2>
          <div className="overflow-x-auto">
            <div className="flex items-end gap-4 h-64 min-w-[500px]">
              {monthlyData.map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex gap-1 justify-center" style={{ height: `${(d.sessions / maxSessions) * 200}px` }}>
                    <div className="w-1/3 bg-cool-sky rounded-t-md" style={{ height: `${(d.users / (maxSessions / 2)) * 100}%` }} title={`Users: ${d.users}`} />
                    <div className="w-1/3 bg-french-blue rounded-t-md h-full" title={`Sessions: ${d.sessions}`} />
                    <div className="w-1/3 bg-velvet-purple rounded-t-md" style={{ height: `${(d.certificates / (maxSessions / 3)) * 100}%` }} title={`Certs: ${d.certificates}`} />
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-sm font-semibold text-gray-700">{d.month}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-6 mt-4 text-sm text-gray-500">
            <span className="flex items-center gap-1"><span className="w-4 h-4 bg-cool-sky rounded" /> New Users</span>
            <span className="flex items-center gap-1"><span className="w-4 h-4 bg-french-blue rounded" /> Sessions</span>
            <span className="flex items-center gap-1"><span className="w-4 h-4 bg-velvet-purple rounded" /> Certificates</span>
          </div>
        </div>

        {/* Line chart - Sessions trend */}
        <div className="card mb-8">
          <h2 className="text-xl font-bold text-french-blue mb-6">📈 Sessions Trend</h2>
          <div className="relative h-48">
            <svg viewBox="0 0 600 200" className="w-full h-full" preserveAspectRatio="none">
              {/* Grid lines */}
              {[0, 50, 100, 150, 200].map((y) => (
                <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="#e5e7eb" strokeWidth="1" />
              ))}

              {/* Line */}
              <polyline
                fill="none"
                stroke="#5da9e9"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={monthlyData.map((d, i) => `${(i / (monthlyData.length - 1)) * 580 + 10},${200 - (d.sessions / maxSessions) * 180}`).join(" ")}
              />

              {/* Area fill */}
              <polygon
                fill="url(#areaGradient)"
                opacity="0.2"
                points={`10,200 ${monthlyData.map((d, i) => `${(i / (monthlyData.length - 1)) * 580 + 10},${200 - (d.sessions / maxSessions) * 180}`).join(" ")} 590,200`}
              />

              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5da9e9" />
                  <stop offset="100%" stopColor="#e5f4e3" />
                </linearGradient>
              </defs>

              {/* Data points */}
              {monthlyData.map((d, i) => (
                <circle
                  key={d.month}
                  cx={(i / (monthlyData.length - 1)) * 580 + 10}
                  cy={200 - (d.sessions / maxSessions) * 180}
                  r="5"
                  fill="#003f91"
                  stroke="white"
                  strokeWidth="2"
                />
              ))}
            </svg>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            {monthlyData.map((d) => (
              <span key={d.month}>{d.month}</span>
            ))}
          </div>
        </div>

        {/* User table */}
        <div className="card">
          <h2 className="text-xl font-bold text-french-blue mb-6">📋 Monthly Summary</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="py-3 px-4 text-sm font-semibold text-gray-500">Month</th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-500">New Users</th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-500">Sessions</th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-500">Certificates</th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-500">User Growth</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((d, i) => {
                  const prevUsers = i > 0 ? monthlyData[i - 1].users : 0;
                  const growth = prevUsers > 0 ? Math.round(((d.users - prevUsers) / prevUsers) * 100) : 0;
                  return (
                    <tr key={d.month} className="border-b border-gray-100 hover:bg-honeydew transition-colors">
                      <td className="py-3 px-4 font-semibold text-french-blue">{d.month} 2026</td>
                      <td className="py-3 px-4">{d.users.toLocaleString()}</td>
                      <td className="py-3 px-4">{d.sessions.toLocaleString()}</td>
                      <td className="py-3 px-4">{d.certificates.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        {i > 0 && (
                          <span className="text-green-600 font-semibold">+{growth}%</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatsCard({ icon, label, value, color }: { icon: string; label: string; value: string; color?: string }) {
  return (
    <div className="card text-center">
      <div className="text-3xl mb-2">{icon}</div>
      <div className={`text-2xl font-bold mb-1 ${color || "text-french-blue"}`}>{value}</div>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}
