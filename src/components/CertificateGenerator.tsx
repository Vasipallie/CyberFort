"use client";

import { useRef, useState } from "react";

export default function CertificateGenerator() {
    const [name, setName] = useState("");
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const generate = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const w = 1200;
        const h = 800;
        canvas.width = w;
        canvas.height = h;

        // background
        const g = ctx.createLinearGradient(0, 0, w, h);
        g.addColorStop(0, "#f8fafc");
        g.addColorStop(1, "#eef2ff");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);

        // border
        ctx.strokeStyle = "#94a3b8";
        ctx.lineWidth = 8;
        ctx.strokeRect(30, 30, w - 60, h - 60);

        // title
        ctx.fillStyle = "#0f172a";
        ctx.font = "48px serif";
        ctx.textAlign = "center";
        ctx.fillText("Certificate of Completion", w / 2, 200);

        // name
        ctx.font = "bold 64px serif";
        ctx.fillText(name || "Learner Name", w / 2, 380);

        // meta
        ctx.font = "20px serif";
        ctx.fillText(`Awarded on ${new Date().toLocaleDateString()}`, w / 2, 460);

        // signature line
        ctx.beginPath();
        ctx.moveTo(w / 2 - 180, 540);
        ctx.lineTo(w / 2 + 180, 540);
        ctx.strokeStyle = "#334155";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.font = "16px serif";
        ctx.fillText("Program Coordinator", w / 2, 580);

        // trigger download
        const link = document.createElement("a");
        link.download = `${(name || "learner").replace(/\s+/g, "_")}_certificate.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    return (
        <div className="card mt-8 p-6 text-center">
            <h3 className="text-lg font-bold mb-3">🎓 Generate Certificate</h3>
            <p className="text-sm text-gray-600 mb-4">Enter the learner&apos;s name to create a printable certificate.</p>
            <div className="max-w-md mx-auto flex gap-3">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Learner Full Name"
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none" />
                <button onClick={generate} className="btn-primary px-4 py-3 rounded-xl">Generate</button>
            </div>
            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
}
