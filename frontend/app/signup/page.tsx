"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [website, setWebsite] = useState("");

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleFinishSignup = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);

    try {
      const fullName = `${firstName} ${lastName}`.trim();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://xiachat.onrender.com"}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fullName, email, password, website }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setStep(4);
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (err) {
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToDashboard = () => {
    router.push("/dashboard");
  };

  const handleGoogleSignup = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL || "https://xiachat.onrender.com"}/api/auth/google`;
  };

  return (
    <div className="min-h-[100dvh] bg-[#09090B] flex flex-col items-center justify-center p-6 font-sans">

      {/* Brand Logo */}
      <Link href="/" className="flex items-center gap-2.5 mb-8 group">
        <img src="/logo.png" alt="Xia Chat Logo" className="w-9 h-9 group-hover:scale-105 transition-transform duration-300" />
        <span className="text-2xl font-bold text-[#FAFAFA] tracking-tight">Xia Chat</span>
      </Link>

      {/* Progress Bar */}
      {step < 4 && (
        <div className="w-full max-w-[440px] mb-6 flex gap-2">
          <div className={`h-1 flex-1 rounded-full transition-colors duration-500 ${step >= 1 ? 'bg-[#4F46E5]' : 'bg-[rgba(255,255,255,0.08)]'}`}></div>
          <div className={`h-1 flex-1 rounded-full transition-colors duration-500 ${step >= 2 ? 'bg-[#4F46E5]' : 'bg-[rgba(255,255,255,0.08)]'}`}></div>
          <div className={`h-1 flex-1 rounded-full transition-colors duration-500 ${step >= 3 ? 'bg-[#4F46E5]' : 'bg-[rgba(255,255,255,0.08)]'}`}></div>
        </div>
      )}

      {/* Signup Card */}
      <div className={`w-full bg-[rgba(255,255,255,0.03)] rounded-2xl shadow-[0_24px_48px_rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.08)] p-6 sm:p-10 relative overflow-hidden transition-all duration-500 backdrop-blur-xl ${step === 4 ? 'max-w-5xl' : 'max-w-[420px]'}`}>

        {/* Step 1: Account Creation */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-2xl font-bold text-[#FAFAFA] mb-1.5 text-center tracking-tight">Create your account</h1>
            <p className="text-[13px] text-[#A1A1AA] mb-8 text-center font-medium">Start your 14-day free trial. No credit card required.</p>

            <button
              type="button"
              onClick={handleGoogleSignup}
              className="w-full flex items-center justify-center gap-3 px-4 h-12 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-xl hover:bg-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.15)] transition-all text-[14px] font-semibold text-[#FAFAFA]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-4 my-6">
              <div className="h-px bg-[rgba(255,255,255,0.08)] flex-1"></div>
              <span className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">OR</span>
              <div className="h-px bg-[rgba(255,255,255,0.08)] flex-1"></div>
            </div>

            <form onSubmit={handleNextStep} className="space-y-5">
              <div>
                <label className="block text-[13px] font-semibold text-[#FAFAFA] mb-1.5">Work Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-4 h-12 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/50 focus:border-[#4F46E5] transition-all text-[#FAFAFA] placeholder:text-[#A1A1AA] shadow-sm"
                />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-[#FAFAFA] mb-1.5">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full px-4 h-12 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/50 focus:border-[#4F46E5] transition-all text-[#FAFAFA] placeholder:text-[#A1A1AA] shadow-sm"
                />
              </div>

              <button
                type="submit"
                disabled={!email || !password}
                className="w-full h-12 bg-[#4F46E5] text-white text-[14px] font-semibold rounded-xl hover:bg-[#4338CA] transition-all shadow-lg shadow-[rgba(79,70,229,0.3)] mt-6 disabled:opacity-50"
              >
                Continue
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Personal Info */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <button onClick={() => setStep(1)} className="absolute top-6 left-6 text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
            </button>
            <h1 className="text-2xl font-bold text-[#FAFAFA] mb-1.5 text-center mt-2 tracking-tight">Tell us about yourself</h1>
            <p className="text-[13px] text-[#A1A1AA] mb-8 text-center font-medium">We use this to personalize your experience.</p>

            <form onSubmit={handleNextStep} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-[#FAFAFA] mb-1.5">First Name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    className="w-full px-4 h-12 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/50 focus:border-[#4F46E5] transition-all text-[#FAFAFA] placeholder:text-[#A1A1AA] shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-[#FAFAFA] mb-1.5">Last Name</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className="w-full px-4 h-12 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/50 focus:border-[#4F46E5] transition-all text-[#FAFAFA] placeholder:text-[#A1A1AA] shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#FAFAFA] mb-1.5">Role</label>
                <select className="w-full px-4 h-12 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/50 focus:border-[#4F46E5] transition-all text-[#FAFAFA] appearance-none shadow-sm">
                  <option value="" disabled>Select your role...</option>
                  <option>Founder / CEO</option>
                  <option>Customer Support</option>
                  <option>Marketing</option>
                  <option>Sales</option>
                  <option>Other</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={!firstName || !lastName}
                className="w-full h-12 bg-[#4F46E5] text-white text-[14px] font-semibold rounded-xl hover:bg-[#4338CA] transition-all shadow-lg shadow-[rgba(79,70,229,0.3)] mt-6 disabled:opacity-50"
              >
                Continue
              </button>
            </form>
          </div>
        )}

        {/* Step 3: Workspace Setup */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <button onClick={() => setStep(2)} className="absolute top-6 left-6 text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
            </button>
            <h1 className="text-2xl font-bold text-[#FAFAFA] mb-1.5 text-center mt-2 tracking-tight">Setup your workspace</h1>
            <p className="text-[13px] text-[#A1A1AA] mb-8 text-center font-medium">Where will you be installing Xia Chat?</p>

            <form onSubmit={handleFinishSignup} className="space-y-5">
              <div>
                <label className="block text-[13px] font-semibold text-[#FAFAFA] mb-1.5">Website URL</label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-[#A1A1AA] text-[14px] font-medium">https://</span>
                  <input
                    type="text"
                    required
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="yourdomain.com"
                    className="w-full pl-16 pr-4 h-12 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/50 focus:border-[#4F46E5] transition-all text-[#FAFAFA] placeholder:text-[#A1A1AA] shadow-sm"
                  />
                </div>
              </div>

              <div className="bg-[rgba(79,70,229,0.1)] border border-[rgba(79,70,229,0.2)] rounded-xl p-4 flex gap-3 mt-4">
                <svg className="w-5 h-5 text-[#818CF8] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="text-[12px] text-[#A1A1AA] leading-relaxed font-medium">
                  We'll generate an installation script for this website. You can always add more websites later in the settings.
                </p>
              </div>

              <button
                type="submit"
                disabled={!website || isLoading}
                className="w-full h-12 bg-[#4F46E5] text-white text-[14px] font-semibold rounded-xl hover:bg-[#4338CA] transition-all shadow-lg shadow-[rgba(79,70,229,0.3)] flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed mt-6"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : "Create Workspace"}
              </button>

              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => handleFinishSignup()}
                  className="text-[13px] font-medium text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors"
                >
                  Skip for now
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 4: Live Preview */}
        {step === 4 && (
          <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center">
            <h1 className="text-2xl font-bold text-[#FAFAFA] mb-2 text-center">Looking good! 🎉</h1>
            <p className="text-sm text-[#A1A1AA] mb-6 text-center">Here is a live preview of how Xia Chat will look on <strong className="text-[#FAFAFA]">{website || 'your website'}</strong>.</p>

            {/* Iframe Preview Container */}
            <div className="relative w-full h-[500px] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden bg-[rgba(255,255,255,0.02)] shadow-inner mb-8 group">
              <iframe
                src={website ? (website.startsWith('http') ? website : `https://${website}`) : 'https://example.com'}
                className="w-full h-full opacity-50 group-hover:opacity-100 transition-opacity duration-700"
                title="Website Preview"
              />

              {/* Fake Widget Overlay */}
              <div className="absolute bottom-6 right-6 flex flex-col items-end animate-in slide-in-from-bottom-10 fade-in duration-1000 delay-500 fill-mode-both">
                <div className="bg-[#09090B]/95 backdrop-blur-xl w-[280px] sm:w-[340px] h-[400px] rounded-2xl shadow-[0_24px_48px_rgba(0,0,0,0.8)] mb-4 border border-[rgba(255,255,255,0.08)] flex flex-col overflow-hidden origin-bottom-right transform scale-90 sm:scale-100 ring-1 ring-[rgba(255,255,255,0.05)]">
                  <div className="bg-gradient-to-r from-[#4F46E5] to-[#818CF8] px-5 py-6 text-white text-center">
                    <h3 className="font-bold text-lg mb-1">Hi there 👋</h3>
                    <p className="text-xs opacity-90">We typically reply in a few minutes.</p>
                  </div>
                  <div className="flex-1 bg-[rgba(255,255,255,0.02)] p-5 flex flex-col justify-end">
                    <div className="bg-[rgba(255,255,255,0.06)] p-3.5 rounded-2xl rounded-bl-sm text-sm text-[#FAFAFA] self-start mb-2 border border-[rgba(255,255,255,0.08)]">
                      Welcome to {website || 'our website'}! How can we help you today?
                    </div>
                  </div>
                  <div className="p-4 bg-[rgba(255,255,255,0.02)] border-t border-[rgba(255,255,255,0.08)]">
                    <div className="bg-[rgba(255,255,255,0.05)] rounded-full px-4 py-2.5 text-sm text-[#A1A1AA]">Type a message...</div>
                  </div>
                </div>

                {/* Launcher Button */}
                <div className="w-14 h-14 bg-gradient-to-tr from-[#4F46E5] to-[#818CF8] rounded-full shadow-[0_8px_24px_rgba(79,70,229,0.5)] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform ring-2 ring-[rgba(255,255,255,0.1)]">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>
            </div>

            <button
              onClick={handleGoToDashboard}
              className="px-8 py-3 bg-[#4F46E5] text-white text-[14px] font-semibold rounded-xl hover:bg-[#4338CA] transition-all shadow-lg shadow-[rgba(79,70,229,0.3)] flex items-center gap-2"
            >
              Take me to my Dashboard
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </button>
          </div>
        )}

      </div>

      {step === 1 && (
        <p className="mt-8 text-sm font-medium text-[#A1A1AA]">
          Already have an account? <Link href="/login" className="text-[#818CF8] font-bold hover:text-[#FAFAFA] transition-colors">Log in</Link>
        </p>
      )}

    </div>
  );
}
