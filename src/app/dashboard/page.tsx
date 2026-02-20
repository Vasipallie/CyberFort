import Link from "next/link";
import { modules } from "@/lib/data";

export default function DashboardPage() {
  const getDifficultyColor = (d: string) => {
    if (d === "Beginner") return "bg-green-100 text-green-700";
    if (d === "Intermediate") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-cool-sky/10 text-cool-sky px-5 py-2 rounded-full text-sm font-semibold mb-4">
            🛡️ Practice Mode — Not a Real Website
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-french-blue mb-3">
            Simulation Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose a module below to start practising. Each module is completely safe — no real
            accounts, no real data, no real risk.
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {modules.map((mod) => (
            <Link
              key={mod.id}
              href={`/module?id=${mod.id}`}
              className="card group hover:border-cool-sky flex flex-col"
            >
              {/* Practice mode label */}
              <div className="text-xs font-semibold text-cool-sky bg-cool-sky/10 px-3 py-1 rounded-full self-start mb-4">
                Practice Mode — Not a Real Website
              </div>

              {/* Icon & Title */}
              <div className="text-5xl mb-3">{mod.icon}</div>
              <h2 className="text-xl font-bold text-french-blue mb-2 group-hover:text-cool-sky transition-colors">
                {mod.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4 flex-1">{mod.description}</p>

              {/* Meta info */}
              <div className="space-y-2 border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">⏱️ {mod.estimatedTime}</span>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getDifficultyColor(mod.difficulty)}`}>
                    {mod.difficulty}
                  </span>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1">
                  {mod.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="text-xs bg-honeydew text-french-blue px-2 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Confidence rating */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Confidence Builder:</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-lg ${star <= Math.round(mod.confidenceRating) ? "text-yellow-400" : "text-gray-300"}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom encouragement */}
        <div className="mt-12 text-center bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <p className="text-2xl mb-2">🌟</p>
          <p className="text-xl text-french-blue font-semibold mb-2">
            Remember — this is just practice!
          </p>
          <p className="text-gray-600 max-w-xl mx-auto">
            You can try any module as many times as you like. There are no penalties for mistakes.
            Every error is a learning opportunity. You&apos;re doing great!
          </p>
        </div>
      </div>
    </div>
  );
}
