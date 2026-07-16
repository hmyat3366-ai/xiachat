"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function InviteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing invite link.");
    }
  }, [token]);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLoginMode) {
        // Log in first
        const loginRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://xiachat.onrender.com"}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });
        const loginData = await loginRes.json();
        if (!loginRes.ok) throw new Error(loginData.error || "Login failed");

        // Then join workspace
        const joinRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://xiachat.onrender.com"}/api/workspaces/join`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${loginData.token}`
          },
          body: JSON.stringify({ token, userId: loginData.user.id })
        });
        const joinData = await joinRes.json();
        if (!joinRes.ok) throw new Error(joinData.error || "Failed to join workspace.");
        
        // Success
        localStorage.setItem("token", loginData.token);
        localStorage.setItem("user", JSON.stringify(loginData.user));
      } else {
        // Register and join atomically via backend
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://xiachat.onrender.com"}/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, inviteToken: token })
        });
        
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to join workspace.");

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      router.push("/dashboard");

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl shadow-gray-200 border border-gray-100">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">You've been invited!</h2>
        <p className="text-sm text-gray-500 mt-2">
          {isLoginMode ? "Log in to accept the invitation." : "Create an account to join the workspace as a Team Member."}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-semibold text-center">
          {error}
        </div>
      )}

      {token && !error ? (
        <form onSubmit={handleJoin} className="space-y-4">
          {!isLoginMode && (
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1.5">Full Name</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe" 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-gray-900 transition-all"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">Work Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com" 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-gray-900 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-gray-900 transition-all"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 bg-accent text-white text-sm font-bold rounded-xl hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20 disabled:opacity-50 mt-4 flex justify-center items-center gap-2"
          >
            {loading && <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
            {isLoginMode ? "Log In & Accept Invite" : "Create Account & Accept Invite"}
          </button>

          <div className="text-center mt-4">
            <button 
              type="button" 
              onClick={() => setIsLoginMode(!isLoginMode)}
              className="text-sm text-accent hover:underline font-medium"
            >
              {isLoginMode ? "Need an account? Sign up" : "Already have an account? Log in"}
            </button>
          </div>
        </form>
      ) : (
        <button onClick={() => router.push("/")} className="w-full py-3 bg-gray-100 text-gray-900 font-semibold rounded-xl hover:bg-gray-200">
          Return to Home
        </button>
      )}
    </div>
  );
}

export default function InvitePage() {
  return (
    <div className="min-h-[100dvh] bg-gray-50 flex flex-col justify-center items-center p-4">
      <Suspense fallback={<div className="animate-pulse w-96 h-96 bg-gray-200 rounded-2xl"></div>}>
        <InviteContent />
      </Suspense>
    </div>
  );
}
