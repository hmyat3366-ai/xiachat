"use client";

import Link from "next/link";
import { useState } from "react";

const featureLinks = [
  {
    href: "/features/widget",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    title: "Live Chat Widget",
    desc: "Embed on any website in 1 line",
  },
  {
    href: "/features/inbox",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
      </svg>
    ),
    title: "Shared Inbox",
    desc: "All customer conversations, one place",
  },
  {
    href: "/features/ai",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    title: "AI Agent",
    desc: "Auto-reply with GPT-powered AI",
  },
  {
    href: "/features/analytics",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: "Analytics",
    desc: "Real-time conversation insights",
  },
  {
    href: "/features/campaigns",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
      </svg>
    ),
    title: "Campaigns",
    desc: "Send targeted messages to contacts",
  },
  {
    href: "/features/contacts",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    title: "Contacts & CRM",
    desc: "Manage leads and customer data",
  },
];

export default function Navbar() {
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#09090B]/90 backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)]">
      <div className="w-full px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Xia Chat Logo" className="w-8 h-8" />
          <span className="text-lg font-semibold text-[#FAFAFA] tracking-tight">Xia Chat</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-7">
          {/* Features Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setFeaturesOpen(true)}
            onMouseLeave={() => setFeaturesOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors">
              Features
              <svg className={`w-3.5 h-3.5 transition-transform ${featuresOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            {featuresOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                <div className="w-[560px] bg-[#18181B] border border-[rgba(255,255,255,0.08)] rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.6)] p-5 grid grid-cols-2 gap-1">
                  {featureLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-[rgba(255,255,255,0.05)] transition-colors group"
                    >
                      <div className="w-9 h-9 bg-[rgba(79,70,229,0.15)] rounded-lg flex items-center justify-center text-[#818CF8] shrink-0 group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#FAFAFA]">{item.title}</p>
                        <p className="text-xs text-[#71717A] mt-0.5">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/#pricing" className="text-sm text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors">Pricing</Link>
          <Link href="/#integrations" className="text-sm text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors">Integrations</Link>
          <Link href="/#blog" className="text-sm text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors">Blog</Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden lg:inline-flex text-sm text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors font-medium">
            Log In
          </Link>
          <Link href="/signup" className="hidden lg:inline-flex items-center px-4 py-2 bg-[#4F46E5] text-white text-sm font-semibold rounded-full hover:bg-[#4338CA] transition-colors shadow-[0_2px_12px_rgba(79,70,229,0.4)]">
            Start Free Trial
          </Link>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-[#A1A1AA] hover:text-[#FAFAFA]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[rgba(255,255,255,0.08)] bg-[#09090B]">
          <div className="w-full px-6 py-4 space-y-1">
            <p className="text-xs font-semibold text-[#52525B] uppercase tracking-wider px-3 pb-2">Features</p>
            {featureLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[rgba(255,255,255,0.05)] text-sm text-[#A1A1AA]"
                onClick={() => setMobileOpen(false)}
              >
                <span className="text-[#818CF8]">{item.icon}</span>
                {item.title}
              </Link>
            ))}
            <div className="border-t border-[rgba(255,255,255,0.06)] pt-2 mt-2 space-y-1">
              <Link href="/#pricing" className="block px-3 py-2.5 rounded-lg hover:bg-[rgba(255,255,255,0.05)] text-sm text-[#A1A1AA]" onClick={() => setMobileOpen(false)}>Pricing</Link>
              <Link href="/#integrations" className="block px-3 py-2.5 rounded-lg hover:bg-[rgba(255,255,255,0.05)] text-sm text-[#A1A1AA]" onClick={() => setMobileOpen(false)}>Integrations</Link>
              <Link href="/#blog" className="block px-3 py-2.5 rounded-lg hover:bg-[rgba(255,255,255,0.05)] text-sm text-[#A1A1AA]" onClick={() => setMobileOpen(false)}>Blog</Link>
            </div>
            <div className="border-t border-[rgba(255,255,255,0.06)] pt-3 mt-2 space-y-3">
              <Link href="/login" className="block w-full text-center px-4 py-2.5 text-[#A1A1AA] text-sm font-medium rounded-full hover:bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)]" onClick={() => setMobileOpen(false)}>Log In</Link>
              <Link href="/signup" className="block w-full text-center px-4 py-2.5 bg-[#4F46E5] text-white text-sm font-semibold rounded-full hover:bg-[#4338CA]" onClick={() => setMobileOpen(false)}>Start Free Trial</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
