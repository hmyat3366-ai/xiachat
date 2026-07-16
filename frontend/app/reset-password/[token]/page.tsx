"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Password validation state
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isPasswordValid = hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar;

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!isPasswordValid) {
      setError("Please meet all password requirements.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${"https://xiachat.onrender.com"}/api/auth/reset-password/${token}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Automatically log them in after reset
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/dashboard");
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
    <div className="min-h-[100dvh] bg-[#F7F9FC] flex flex-col items-center justify-center p-6 font-sans">
      <Link href="/" className="flex items-center gap-2 mb-8 group">
        <img src="/logo.png" alt="Xia Chat Logo" className="w-10 h-10 rounded-xl shadow-lg shadow-accent/20 group-hover:scale-105 transition-transform" />
        <span className="text-2xl font-bold text-gray-900 tracking-tight">Xia Chat</span>
      </Link>

      <div className="w-full bg-white rounded-[24px] shadow-xl shadow-gray-200/50 p-6 sm:p-10 max-w-[440px]">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">Set new password</h1>
        <p className="text-sm text-gray-500 mb-8 text-center">Your new password must be different from previous used passwords.</p>

        <form onSubmit={handleReset} className="space-y-5">
          {error && <div className="bg-red-50 text-red-600 text-[13px] font-medium px-4 py-3 rounded-xl border border-red-100">{error}</div>}

          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-2">New Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-white transition-all text-gray-900"
            />
          </div>

          {/* Password Requirements Checklist */}
          {password.length > 0 && (
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 space-y-1.5 mt-2">
              <p className="text-xs font-semibold text-gray-700 mb-2">Password requirements:</p>
              <div className="flex items-center gap-2 text-xs">
                {hasMinLength ? <span className="text-green-500">✓</span> : <span className="text-gray-300">○</span>}
                <span className={hasMinLength ? "text-green-600" : "text-gray-500"}>At least 8 characters</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                {hasUppercase ? <span className="text-green-500">✓</span> : <span className="text-gray-300">○</span>}
                <span className={hasUppercase ? "text-green-600" : "text-gray-500"}>At least one uppercase letter (A-Z)</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                {hasLowercase ? <span className="text-green-500">✓</span> : <span className="text-gray-300">○</span>}
                <span className={hasLowercase ? "text-green-600" : "text-gray-500"}>At least one lowercase letter (a-z)</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                {hasNumber ? <span className="text-green-500">✓</span> : <span className="text-gray-300">○</span>}
                <span className={hasNumber ? "text-green-600" : "text-gray-500"}>At least one number (0-9)</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                {hasSpecialChar ? <span className="text-green-500">✓</span> : <span className="text-gray-300">○</span>}
                <span className={hasSpecialChar ? "text-green-600" : "text-gray-500"}>At least one special character (!@#$%)</span>
              </div>
            </div>
          )}

          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-2">Confirm Password</label>
            <input 
              type="password" 
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-white transition-all text-gray-900"
            />
          </div>

          <button 
            type="submit"
            disabled={!password || !confirmPassword || !isPasswordValid || isLoading}
            className="w-full py-3.5 bg-accent text-white text-sm font-bold rounded-xl hover:bg-accent-hover transition-all shadow-lg shadow-accent/20 mt-4 disabled:opacity-50 flex items-center justify-center"
          >
            {isLoading ? "Resetting..." : "Reset password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ResetPasswordPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  return <ResetPasswordForm token={token} />;
}
