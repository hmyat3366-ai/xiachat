"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [resetUrl, setResetUrl] = useState(""); // For dev testing

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");
    setResetUrl("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://xiachat.onrender.com"}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Password reset link has been sent to your email!");
        if (data.resetUrl) {
          setResetUrl(data.resetUrl);
        }
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#09090B] flex flex-col items-center justify-center p-6 font-sans">
      <Link href="/" className="flex items-center gap-3 mb-8 group">
        <div className="w-10 h-10 bg-gradient-to-tr from-[#4F46E5] to-[#818CF8] rounded-xl shadow-[0_4px_16px_rgba(79,70,229,0.4)] flex items-center justify-center group-hover:scale-105 transition-transform duration-300 ring-1 ring-[rgba(255,255,255,0.1)]">
          <span className="text-white font-bold text-lg tracking-tight">X</span>
        </div>
        <span className="text-2xl font-bold text-[#FAFAFA] tracking-tight">Xia Chat</span>
      </Link>

      <div className="w-full bg-[rgba(255,255,255,0.03)] rounded-2xl shadow-[0_24px_48px_rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.08)] p-6 sm:p-10 max-w-[440px] backdrop-blur-xl">
        <h1 className="text-2xl font-bold text-[#FAFAFA] mb-2 text-center tracking-tight">Reset your password</h1>
        <p className="text-sm text-[#A1A1AA] mb-8 text-center">Enter your email and we'll send you a link to reset your password.</p>

        <form onSubmit={handleForgot} className="space-y-5">
          {error && (
            <div className="bg-[rgba(239,68,68,0.1)] text-[#FCA5A5] text-[13px] font-medium px-4 py-3 rounded-xl border border-[rgba(239,68,68,0.2)]">
              {error}
            </div>
          )}
          {message && (
            <div className="bg-[rgba(34,197,94,0.1)] text-green-400 text-[13px] font-medium px-4 py-3 rounded-xl border border-[rgba(34,197,94,0.2)]">
              {message}
              {resetUrl && (
                <div className="mt-3 p-3 bg-[rgba(255,255,255,0.04)] rounded-lg border border-[rgba(255,255,255,0.08)] overflow-hidden break-all">
                  <p className="text-xs text-[#A1A1AA] mb-1">Developer Test Link:</p>
                  <a href={resetUrl} className="text-[#818CF8] underline">{resetUrl}</a>
                </div>
              )}
            </div>
          )}

          <div>
            <label className="block text-[13px] font-bold text-[#FAFAFA] mb-2">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full px-4 py-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/50 focus:border-[#4F46E5] transition-all text-[#FAFAFA] placeholder:text-[#A1A1AA]"
            />
          </div>

          <button
            type="submit"
            disabled={!email || isLoading}
            className="w-full py-3.5 bg-[#4F46E5] text-white text-sm font-bold rounded-xl hover:bg-[#4338CA] transition-all shadow-lg shadow-[rgba(79,70,229,0.3)] mt-4 disabled:opacity-50 flex items-center justify-center"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : "Send reset link"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/login" className="text-sm font-semibold text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors">
            ← Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
