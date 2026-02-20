import Link from "next/link";
import { impactStats, testimonials } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      {/* ========== HERO SECTION ========== */}
      <section className="animated-gradient py-16 sm:py-24 px-4" aria-label="Hero">
        <div className="max-w-6xl mx-auto text-center">
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {["100% Practice Mode", "No Real Accounts Used", "Mistakes Are Welcome"].map((badge) => (
              <span
                key={badge}
                className="bg-white/80 text-french-blue px-5 py-2 rounded-full text-sm font-semibold shadow-sm border border-cool-sky/30"
              >
                ✅ {badge}
              </span>
            ))}
          </div>

          {/* Illustration */}
          <div className="text-8xl mb-6 gentle-pulse" aria-hidden="true">
            👵🏽📱
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-french-blue mb-6 text-balance">
            Learn Digital Skills Safely.<br />
            No Risk. No Pressure.
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-10 text-balance">
            SafeDigital is a guided simulator that helps seniors practise essential online
            services in a completely safe, non-real environment.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/dashboard" className="btn-primary text-xl px-10 py-5">
              ▶️ Start Practice
            </Link>
            <Link href="#how-it-works" className="btn-secondary text-xl px-10 py-5">
              ❓ How It Works
            </Link>
            <Link href="/volunteer" className="btn-secondary text-xl px-10 py-5">
              🤝 Volunteer With Us
            </Link>
            <Link href="/contact" className="btn-secondary text-xl px-10 py-5">
              📞 Contact
            </Link>
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section id="how-it-works" className="py-16 sm:py-20 px-4 bg-white" aria-label="How It Works">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-french-blue text-center mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Three simple steps to build your digital confidence
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", icon: "📋", title: "Choose a Module", description: "Pick any skill you want to practise — from government logins to scam detection. All sorted by difficulty." },
              { step: "2", icon: "👆", title: "Practise Step-by-Step", description: "Follow guided instructions at your own pace. Make mistakes freely — it's all just practice!" },
              { step: "3", icon: "🎓", title: "Earn a Confidence Certificate", description: "Complete the module and receive a personalised certificate showing your achievement and growth." },
            ].map((item) => (
              <div key={item.step} className="card text-center group">
                <div className="w-16 h-16 rounded-full bg-cool-sky/10 text-cool-sky text-2xl flex items-center justify-center mx-auto mb-4 font-bold group-hover:bg-cool-sky group-hover:text-white transition-colors">
                  {item.step}
                </div>
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-french-blue mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Animated progress demo */}
          <div className="mt-12 max-w-xl mx-auto">
            <p className="text-center text-sm font-semibold text-gray-500 mb-3">YOUR LEARNING JOURNEY</p>
            <div className="bg-gray-100 rounded-full h-6 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cool-sky to-french-blue rounded-full progress-animate" style={{ width: "75%" }} />
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>Start</span>
              <span>75% Confident!</span>
              <span>Expert</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========== IMPACT SECTION ========== */}
      <section className="py-16 sm:py-20 px-4 bg-honeydew" aria-label="Impact Statistics">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-french-blue text-center mb-4">
            Measuring Real Confidence Growth
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Real results from real seniors — building independence every day
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "👥", value: impactStats.totalSeniorsTrained.toLocaleString(), label: "Seniors Trained" },
              { icon: "📈", value: `${impactStats.avgConfidenceImprovement}%`, label: "Avg Confidence Growth" },
              { icon: "🛡️", value: `${impactStats.scamDetectionImprovement}%`, label: "Scam Detection Improvement" },
              { icon: "🤝", value: impactStats.volunteerHours.toLocaleString(), label: "Volunteer Hours" },
              { icon: "🎓", value: impactStats.certificatesIssued.toLocaleString(), label: "Certificates Issued" },
              { icon: "🌏", value: impactStats.countriesReached.toString(), label: "Countries Reached" },
            ].map((stat) => (
              <div key={stat.label} className="card text-center">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl sm:text-4xl font-bold text-french-blue mb-1">{stat.value}</div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="py-16 sm:py-20 px-4 bg-white" aria-label="Testimonials">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-french-blue text-center mb-12">
            Hear From Our Learners
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="card">
                <div className="text-4xl mb-4">💬</div>
                <p className="text-gray-700 italic mb-4 text-lg leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="border-t pt-4">
                  <p className="font-bold text-french-blue">{t.name}, {t.age}</p>
                  <p className="text-cool-sky font-semibold text-sm">{t.improvement}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TRUST & SAFETY ========== */}
      <section className="py-16 sm:py-20 px-4 bg-honeydew" aria-label="Trust and Safety">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-french-blue mb-4">
            🔐 Your Safety Is Our Priority
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            We designed SafeDigital with trust at its core
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🚫", title: "No Real Accounts", desc: "Every simulation uses fake data. Your real accounts are never touched." },
              { icon: "🔒", title: "Data Encrypted", desc: "All practice data is encrypted and stored securely on your device." },
              { icon: "👤", title: "Privacy-First", desc: "We never share your data with anyone. Your practice remains private." },
              { icon: "🏠", title: "Practice Only", desc: "This is a training environment. No real transactions ever occur." },
              { icon: "🛡️", title: "No External Sharing", desc: "Your progress and data never leave the SafeDigital platform." },
              { icon: "❤️", title: "Built for You", desc: "Designed with care, specifically for senior learners." },
            ].map((item) => (
              <div key={item.title} className="card text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-french-blue text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="py-16 sm:py-20 px-4 animated-gradient" aria-label="Call to action">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-french-blue mb-4">
            Ready to Start?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            It&apos;s free, safe, and you can learn at your own pace.<br />
            Remember — this is just practice! 😊
          </p>
          <Link href="/dashboard" className="btn-primary text-xl px-12 py-6">
            ▶️ Begin Practice Now
          </Link>
        </div>
      </section>
    </>
  );
}
