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
                        <p className="text-gray-600 text-sm">cyberfort.sg@gmail.com</p>
                    </div>
                    <div className="card text-center">
                        <div className="text-3xl mb-3">📱</div>
                        <h3 className="font-bold text-foreground mb-1">Instagram</h3>
                        <p className="text-gray-600 text-sm">@cyberfort.sg</p>
                    </div>
                    <div className="card text-center">
                        <div className="text-3xl mb-3">📞</div>
                        <h3 className="font-bold text-foreground mb-1">Phone</h3>
                        <p className="text-gray-600 text-sm">+65 8802 1247</p>
                    </div>
                </div>

                <div className="card text-center">
                    <h2 className="text-xl font-bold text-foreground mb-4">Contact Info</h2>
                    <p className="text-gray-600 mb-2">For quick questions, email us at <strong>cyberfort.sg@gmail.com</strong>.</p>
                    <p className="text-gray-600 mb-2">Follow us on Instagram: <strong>@cyberfort.sg</strong></p>
                    <p className="text-gray-600">Phone: <strong>+65 8802 1247</strong></p>
                </div>
            </div>
        </div>
    );
}
