"use client";

import { useState } from "react";

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    return (
        <div className="min-h-screen bg-honeydew py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-4">
                    📞 Contact Us
                </h1>
                <p className="text-center text-gray-600 mb-12 text-lg">
                    Have questions? Need help? We&apos;re here for you.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="card text-center">
                        <div className="text-3xl mb-3">📧</div>
                        <h3 className="font-bold text-foreground mb-1">Email</h3>
                        <p className="text-gray-600 text-sm">hello@cyberfort.org</p>
                    </div>
                    <div className="card text-center">
                        <div className="text-3xl mb-3">📞</div>
                        <h3 className="font-bold text-foreground mb-1">Phone</h3>
                        <p className="text-gray-600 text-sm">+65 6123 4567</p>
                    </div>
                    <div className="card text-center">
                        <div className="text-3xl mb-3">📍</div>
                        <h3 className="font-bold text-foreground mb-1">Location</h3>
                        <p className="text-gray-600 text-sm">Singapore</p>
                    </div>
                </div>

                {!submitted ? (
                    <div className="card">
                        <h2 className="text-xl font-bold text-foreground mb-6">Send Us a Message</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                setSubmitted(true);
                            }}
                            className="space-y-6"
                        >
                            <div>
                                <label className="block text-sm font-semibold text-foreground mb-2" htmlFor="name">
                                    Your Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="e.g. Margaret Chen"
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-lg
                           focus:border-cool-sky focus:outline-none min-h-[48px]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-foreground mb-2" htmlFor="email">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="e.g. margaret@email.com"
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-lg
                           focus:border-cool-sky focus:outline-none min-h-[48px]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-foreground mb-2" htmlFor="role">
                                    I am a...
                                </label>
                                <select
                                    id="role"
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-lg
                           focus:border-cool-sky focus:outline-none min-h-[48px] bg-white"
                                >
                                    <option>Senior / Learner</option>
                                    <option>Caregiver / Family Member</option>
                                    <option>Volunteer</option>
                                    <option>Organisation / Partner</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-foreground mb-2" htmlFor="message">
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    placeholder="How can we help you?"
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-lg
                           focus:border-cool-sky focus:outline-none"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn-primary w-full">
                                📨 Send Message
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="card text-center">
                        <div className="text-5xl mb-4">✅</div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h2>
                        <p className="text-gray-600">
                            Thank you for reaching out. We&apos;ll get back to you as soon as possible.
                        </p>
                        <button
                            onClick={() => setSubmitted(false)}
                            className="btn-secondary mt-4"
                        >
                            Send Another Message
                        </button>
                    </div>
                )}

                {/* For Caregivers */}
                <div className="card mt-8">
                    <h2 className="text-xl font-bold text-foreground mb-4">👨‍👩‍👧 For Caregivers & Family Members</h2>
                    <p className="text-gray-600 mb-4">
                        CyberFort is designed to help your loved ones gain digital independence. Here&apos;s how you can help:
                    </p>
                    <ul className="space-y-2 text-gray-600">
                        <li>✅ Sit with them during their first module — encouragement matters!</li>
                        <li>✅ Let them try the Guided Mode first, then graduate to Independent Mode</li>
                        <li>✅ Celebrate each completed module — even small wins build confidence</li>
                        <li>✅ Check their Progress page to see how they&apos;re improving</li>
                        <li>✅ Consider volunteering to help other seniors in your community</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
