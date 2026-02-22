"use client";

import { useState } from "react";

interface Session {
    id: string;
    date: string;
    time: string;
    venue: string;
    capacity: number;
    attendees: number;
    status: "upcoming" | "completed";
}

interface FeedbackEntry {
    sessionId: string;
    rating: number;
    comment: string;
    date: string;
}

export default function VolunteerPage() {
    const [activeTab, setActiveTab] = useState<"schedule" | "log" | "history">("schedule");
    const [sessions, setSessions] = useState<Session[]>([
        { id: "s1", date: "2026-02-24", time: "10:00 AM", venue: "AMK Community Centre", capacity: 20, attendees: 15, status: "upcoming" },
        { id: "s2", date: "2026-02-26", time: "2:00 PM", venue: "Bedok Public Library", capacity: 15, attendees: 0, status: "upcoming" },
        { id: "s3", date: "2026-02-19", time: "10:00 AM", venue: "Tampines Hub", capacity: 25, attendees: 22, status: "completed" },
    ]);
    const [feedback, setFeedback] = useState<FeedbackEntry[]>([]);
    const [newSession, setNewSession] = useState({ date: "", time: "", venue: "", capacity: "" });
    const [logSessionId, setLogSessionId] = useState("");
    const [logAttendees, setLogAttendees] = useState("");
    const [feedbackRating, setFeedbackRating] = useState(4);
    const [feedbackComment, setFeedbackComment] = useState("");
    const [showSuccess, setShowSuccess] = useState("");

    const handleSchedule = (e: React.FormEvent) => {
        e.preventDefault();
        const session: Session = {
            id: `s${Date.now()}`,
            date: newSession.date,
            time: newSession.time,
            venue: newSession.venue,
            capacity: parseInt(newSession.capacity) || 20,
            attendees: 0,
            status: "upcoming",
        };
        setSessions([session, ...sessions]);
        setNewSession({ date: "", time: "", venue: "", capacity: "" });
        setShowSuccess("Session scheduled successfully!");
        setTimeout(() => setShowSuccess(""), 3000);
    };

    const handleLog = (e: React.FormEvent) => {
        e.preventDefault();
        setSessions(sessions.map((s) =>
            s.id === logSessionId
                ? { ...s, attendees: parseInt(logAttendees) || 0, status: "completed" as const }
                : s
        ));
        if (feedbackComment) {
            setFeedback([
                ...feedback,
                { sessionId: logSessionId, rating: feedbackRating, comment: feedbackComment, date: new Date().toISOString() },
            ]);
        }
        setLogSessionId("");
        setLogAttendees("");
        setFeedbackComment("");
        setShowSuccess("Attendance logged successfully!");
        setTimeout(() => setShowSuccess(""), 3000);
    };

    return (
        <div className="min-h-screen bg-honeydew py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-4">
                    🤝 Volunteer Portal
                </h1>
                <p className="text-center text-gray-600 mb-8 text-lg">
                    Help seniors build digital confidence. Schedule sessions, log attendance, and share feedback.
                </p>

                {showSuccess && (
                    <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center mb-6 text-green-800 font-semibold">
                        ✅ {showSuccess}
                    </div>
                )}

                {/* Tabs */}
                <div className="flex gap-2 mb-8 justify-center flex-wrap">
                    {[
                        { key: "schedule", label: "📅 Schedule Session" },
                        { key: "log", label: "📋 Log Attendance" },
                        { key: "history", label: "📊 Session History" },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key as typeof activeTab)}
                            className={`px-6 py-3 rounded-xl font-semibold transition-all min-h-[48px]
                ${activeTab === tab.key
                                    ? "bg-french-blue text-white shadow-lg"
                                    : "bg-white text-gray-600 hover:bg-gray-100"}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Schedule Form */}
                {activeTab === "schedule" && (
                    <div className="card">
                        <h2 className="text-xl font-bold text-foreground mb-6">📅 Schedule a New Session</h2>
                        <form onSubmit={handleSchedule} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Date</label>
                                    <input
                                        type="date"
                                        value={newSession.date}
                                        onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-lg focus:border-cool-sky focus:outline-none min-h-[48px]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Time</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 10:00 AM"
                                        value={newSession.time}
                                        onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-lg focus:border-cool-sky focus:outline-none min-h-[48px]"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Venue</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Ang Mo Kio Community Centre"
                                    value={newSession.venue}
                                    onChange={(e) => setNewSession({ ...newSession, venue: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-lg focus:border-cool-sky focus:outline-none min-h-[48px]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Capacity</label>
                                <input
                                    type="number"
                                    placeholder="e.g. 20"
                                    value={newSession.capacity}
                                    onChange={(e) => setNewSession({ ...newSession, capacity: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-lg focus:border-cool-sky focus:outline-none min-h-[48px]"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn-primary w-full">
                                ✅ Schedule Session
                            </button>
                        </form>
                    </div>
                )}

                {/* Log Attendance */}
                {activeTab === "log" && (
                    <div className="card">
                        <h2 className="text-xl font-bold text-foreground mb-6">📋 Log Attendance & Feedback</h2>
                        <form onSubmit={handleLog} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Select Session</label>
                                <select
                                    value={logSessionId}
                                    onChange={(e) => setLogSessionId(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-lg focus:border-cool-sky focus:outline-none min-h-[48px] bg-white"
                                    required
                                >
                                    <option value="">Choose a session...</option>
                                    {sessions.filter((s) => s.status === "upcoming").map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.date} — {s.time} — {s.venue}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Number of Attendees</label>
                                <input
                                    type="number"
                                    value={logAttendees}
                                    onChange={(e) => setLogAttendees(e.target.value)}
                                    placeholder="e.g. 18"
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-lg focus:border-cool-sky focus:outline-none min-h-[48px]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">
                                    Session Rating: {feedbackRating}/5
                                </label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((n) => (
                                        <button
                                            key={n}
                                            type="button"
                                            onClick={() => setFeedbackRating(n)}
                                            className={`w-12 h-12 rounded-xl text-lg font-bold transition-all
                        ${feedbackRating === n
                                                    ? "bg-french-blue text-white scale-110"
                                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                                        >
                                            {n}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Feedback (optional)</label>
                                <textarea
                                    value={feedbackComment}
                                    onChange={(e) => setFeedbackComment(e.target.value)}
                                    rows={3}
                                    placeholder="How did the session go? Any observations?"
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-lg focus:border-cool-sky focus:outline-none"
                                />
                            </div>
                            <button type="submit" className="btn-primary w-full">
                                ✅ Log Attendance
                            </button>
                        </form>
                    </div>
                )}

                {/* Session History */}
                {activeTab === "history" && (
                    <div className="card">
                        <h2 className="text-xl font-bold text-foreground mb-6">📊 Session History</h2>
                        <div className="space-y-4">
                            {sessions.map((s) => (
                                <div
                                    key={s.id}
                                    className={`p-4 rounded-xl border-2 flex items-center justify-between
                    ${s.status === "completed" ? "border-green-200 bg-green-50" : "border-blue-200 bg-blue-50"}`}
                                >
                                    <div>
                                        <div className="font-bold text-foreground">{s.venue}</div>
                                        <div className="text-sm text-gray-600">{s.date} at {s.time}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-semibold">
                                            {s.attendees}/{s.capacity} attendees
                                        </div>
                                        <div className={`text-xs font-bold px-3 py-1 rounded-full inline-block
                      ${s.status === "completed" ? "bg-green-200 text-green-800" : "bg-blue-200 text-blue-800"}`}>
                                            {s.status === "completed" ? "✅ Completed" : "📅 Upcoming"}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {feedback.length > 0 && (
                            <div className="mt-8">
                                <h3 className="font-bold text-lg mb-4">📝 Feedback Log</h3>
                                {feedback.map((f, i) => (
                                    <div key={i} className="p-4 bg-gray-50 rounded-xl mb-2">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-semibold text-sm">Rating: {"⭐".repeat(f.rating)}</span>
                                        </div>
                                        <p className="text-sm text-gray-600">{f.comment}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
