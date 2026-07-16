import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Shared Inbox — Unified Team Messaging",
  description: "One inbox for all customer conversations. Email, live chat, social — all in one place.",
};

const channels = [
  { name: "Live Chat", icon: "💬" },
  { name: "Email", icon: "📧" },
  { name: "Facebook", icon: "📘" },
  { name: "Instagram", icon: "📷" },
  { name: "WhatsApp", icon: "📱" },
  { name: "Telegram", icon: "✈️" },
];

const features = [
  { title: "Unified Conversation View", desc: "See every customer message from every channel in one timeline." },
  { title: "Team Collaboration", desc: "Internal notes, @mentions, and conversation assignments keep your team aligned." },
  { title: "Smart Assignments", desc: "Auto-assign conversations based on agent skills or availability." },
  { title: "Canned Responses", desc: "Save time with pre-written replies. Insert with a shortcut, personalize, send." },
  { title: "Tags & Filters", desc: "Organize with tags, priorities, and custom filters. Find anything in seconds." },
  { title: "Keyboard-First", desc: "Every core action via keyboard shortcuts. Navigate without touching a mouse." },
];

export default function InboxPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#09090B]">
        {/* Hero */}
        <section className="relative pt-24 pb-20 sm:pt-32 sm:pb-28 overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#4F46E5] opacity-[0.08] rounded-full blur-[120px]" />
          </div>

          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <p className="text-sm font-semibold text-[#4F46E5] tracking-wide uppercase mb-3">Shared Inbox</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FAFAFA] tracking-tight leading-[1.1] mb-6">
              One inbox for<br /><span className="text-[#71717A]">every conversation.</span>
            </h1>
            <p className="text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed mb-10">
              Stop juggling between email, chat, and social inboxes. Xia Chat brings all your customer messages into one unified workspace.
            </p>
            <Link href="/pricing" className="inline-flex items-center px-7 py-3.5 bg-[#4F46E5] text-white text-base font-semibold rounded-full hover:bg-[#4338CA] transition-all shadow-[0_4px_24px_rgba(79,70,229,0.4)]">
              Try It Free
            </Link>
          </div>
        </section>

        {/* Channels */}
        <section className="pb-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {channels.map((ch) => (
                <div key={ch.name} className="flex items-center gap-2.5 px-5 py-3 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-full text-sm font-medium text-[#FAFAFA] hover:border-[#818CF8]/30 hover:shadow-md transition-all">
                  <span className="text-lg">{ch.icon}</span>{ch.name}
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-[#71717A] mt-5">All channels, one inbox.</p>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 border-y border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.01)]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#FAFAFA] tracking-tight mb-12 text-center">Designed for focus. Built for speed.</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f) => (
                <div key={f.title} className="group p-7 bg-[rgba(255,255,255,0.02)] rounded-2xl border border-[rgba(255,255,255,0.06)] hover:border-[rgba(79,70,229,0.3)] hover:bg-[rgba(255,255,255,0.04)] hover:shadow-lg transition-all duration-300">
                  <h3 className="text-lg font-semibold text-[#FAFAFA] mb-2 group-hover:text-[#818CF8] transition-colors">{f.title}</h3>
                  <p className="text-sm text-[#71717A] leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#4F46E5] opacity-[0.07] rounded-full blur-[100px]" />
          </div>
          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-[#FAFAFA] tracking-tight mb-4">Stop switching tabs.</h2>
            <p className="text-[#A1A1AA] mb-8">Try the shared inbox free for 14 days.</p>
            <Link href="/pricing" className="inline-flex items-center px-7 py-3.5 bg-[#4F46E5] text-white text-base font-semibold rounded-full hover:bg-[#4338CA] transition-all shadow-[0_4px_24px_rgba(79,70,229,0.4)]">
              Start Free Trial
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
