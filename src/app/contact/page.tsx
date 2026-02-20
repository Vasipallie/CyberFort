"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="py-20 px-4">
        <div className="max-w-xl mx-auto text-center card">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-french-blue mb-3">Message Sent!</h1>
          <p className="text-lg text-gray-600 mb-6">
            Thank you for reaching out. We&apos;ll get back to you as soon as possible.
          </p>
          <button onClick={() => setSubmitted(false)} className="btn-primary">
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-5xl mb-3">📞</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-french-blue mb-3">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions? We&apos;re here to help. Reach out to our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact form */}
          <div className="card">
            <h2 className="text-xl font-bold text-french-blue mb-6">Send Us a Message</h2>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              <div>
                <label className="block font-semibold text-base mb-2" htmlFor="name">Your Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  required
                  className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-cool-sky transition-colors min-h-[48px]"
                />
              </div>
              <div>
                <label className="block font-semibold text-base mb-2" htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-cool-sky transition-colors min-h-[48px]"
                />
              </div>
              <div>
                <label className="block font-semibold text-base mb-2" htmlFor="role">I Am A...</label>
                <select
                  id="role"
                  className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-cool-sky transition-colors min-h-[48px]"
                >
                  <option>Senior Learner</option>
                  <option>Caregiver / Family Member</option>
                  <option>Volunteer</option>
                  <option>Organisation / Partner</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-base mb-2" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="How can we help you?"
                  required
                  className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-cool-sky transition-colors"
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                ✉️ Send Message
              </button>
            </form>
          </div>

          {/* Contact info */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-bold text-french-blue mb-4">Other Ways to Reach Us</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">📧</span>
                  <div>
                    <p className="font-semibold text-french-blue">Email</p>
                    <p className="text-gray-600">hello@safedigital.org</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="font-semibold text-french-blue">Phone</p>
                    <p className="text-gray-600">+65 6123 4567</p>
                    <p className="text-sm text-gray-400">Mon–Fri, 9 AM – 6 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="font-semibold text-french-blue">Address</p>
                    <p className="text-gray-600">SafeDigital Centre<br />Singapore</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-honeydew">
              <h2 className="text-xl font-bold text-french-blue mb-3">For Caregivers</h2>
              <p className="text-gray-600 mb-4">
                Want to set up SafeDigital for a loved one? We can help you get started with a
                personalised training plan.
              </p>
              <p className="text-gray-600">
                You can also share progress reports with family members — your senior&apos;s achievements
                will make you proud! 😊
              </p>
            </div>

            <div className="card bg-cool-sky/5 border-cool-sky/20">
              <h2 className="text-xl font-bold text-french-blue mb-3">Partnership Enquiries</h2>
              <p className="text-gray-600">
                Government agencies, community centres, and organisations — we&apos;d love to partner
                with you to bring SafeDigital to more seniors.
              </p>
              <p className="text-sm text-cool-sky mt-2 font-semibold">
                partnerships@safedigital.org
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
