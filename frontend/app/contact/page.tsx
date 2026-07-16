"use client";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

const contactCards = [
  {
    emoji: "✉️",
    title: "Email",
    desc: "hello@xiachat.com",
    sub: "support@xiachat.com",
    color: "from-[#4F46E5] to-[#818CF8]",
  },
  {
    emoji: "💬",
    title: "Live Chat",
    desc: "Chat with our team right now using the widget in the bottom-right corner.",
    sub: null,
    color: "from-[#7C3AED] to-[#A78BFA]",
  },
  {
    emoji: "⚡",
    title: "Response Time",
    desc: "Within 2 hours during business hours.",
    sub: "9am – 6pm UTC",
    color: "from-[#0891B2] to-[#67E8F9]",
  },
  {
    emoji: "🤝",
    title: "Partnerships",
    desc: "Interested in partnering with us?",
    sub: "partners@xiachat.com",
    color: "from-[#059669] to-[#6EE7B7]",
  },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#09090B]">
        {/* Hero */}
        <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 overflow-hidden">
          {/* Glow blobs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#4F46E5] opacity-[0.06] rounded-full blur-[120px] pointer-events-none" />
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[rgba(79,70,229,0.12)] border border-[rgba(79,70,229,0.25)] rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-[#818CF8] rounded-full animate-pulse" />
              <span className="text-xs font-medium text-[#818CF8] tracking-wide">We reply fast</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FAFAFA] tracking-tight leading-[1.08] mb-5">
              Get in{" "}
              <span className="bg-gradient-to-r from-[#818CF8] to-[#c084fc] bg-clip-text text-transparent">
                touch.
              </span>
            </h1>
            <p className="text-lg text-[#A1A1AA] max-w-xl mx-auto leading-relaxed">
              Have a question, need a demo, or want to discuss a partnership?{" "}
              <span className="text-[#818CF8]">We&apos;d love to hear from you.</span>
            </p>
          </div>
        </section>

        {/* Main content */}
        <section className="pb-28">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid lg:grid-cols-5 gap-10">

              {/* Form — 3 cols */}
              <div className="lg:col-span-3">
                <div className="p-8 rounded-3xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] backdrop-blur-sm">
                  {sent ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="w-16 h-16 rounded-full bg-[rgba(79,70,229,0.15)] border border-[rgba(79,70,229,0.3)] flex items-center justify-center mb-5 text-2xl">
                        ✓
                      </div>
                      <h3 className="text-xl font-semibold text-[#FAFAFA] mb-2">Message sent!</h3>
                      <p className="text-[#71717A] text-sm">We&apos;ll get back to you within 2 hours.</p>
                      <button
                        onClick={() => setSent(false)}
                        className="mt-6 text-sm text-[#818CF8] hover:text-[#A5B4FC] transition-colors"
                      >
                        Send another →
                      </button>
                    </div>
                  ) : (
                    <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="contact-name" className="block text-xs font-semibold text-[#71717A] uppercase tracking-wider mb-2">
                            Name
                          </label>
                          <input
                            id="contact-name"
                            type="text"
                            placeholder="Your name"
                            required
                            className="w-full px-4 py-3 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-xl text-sm text-[#FAFAFA] placeholder-[#3F3F46] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/40 focus:border-[#4F46E5]/50 transition-all"
                          />
                        </div>
                        <div>
                          <label htmlFor="contact-email" className="block text-xs font-semibold text-[#71717A] uppercase tracking-wider mb-2">
                            Email
                          </label>
                          <input
                            id="contact-email"
                            type="email"
                            placeholder="you@company.com"
                            required
                            className="w-full px-4 py-3 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-xl text-sm text-[#FAFAFA] placeholder-[#3F3F46] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/40 focus:border-[#4F46E5]/50 transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="contact-subject" className="block text-xs font-semibold text-[#71717A] uppercase tracking-wider mb-2">
                          Subject
                        </label>
                        <select
                          id="contact-subject"
                          className="w-full px-4 py-3 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-xl text-sm text-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/40 focus:border-[#4F46E5]/50 transition-all appearance-none"
                        >
                          <option value="" className="bg-[#18181B]">Sales inquiry</option>
                          <option value="" className="bg-[#18181B]">Technical support</option>
                          <option value="" className="bg-[#18181B]">Partnership</option>
                          <option value="" className="bg-[#18181B]">Press & media</option>
                          <option value="" className="bg-[#18181B]">Other</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="contact-message" className="block text-xs font-semibold text-[#71717A] uppercase tracking-wider mb-2">
                          Message
                        </label>
                        <textarea
                          id="contact-message"
                          rows={5}
                          placeholder="Tell us how we can help..."
                          required
                          className="w-full px-4 py-3 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-xl text-sm text-[#FAFAFA] placeholder-[#3F3F46] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/40 focus:border-[#4F46E5]/50 transition-all resize-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-3.5 bg-[#4F46E5] text-white text-sm font-semibold rounded-full hover:bg-[#4338CA] transition-all shadow-[0_4px_20px_rgba(79,70,229,0.4)] hover:shadow-[0_8px_30px_rgba(79,70,229,0.5)] active:scale-[0.98]"
                      >
                        Send Message →
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* Contact cards — 2 cols */}
              <div className="lg:col-span-2 space-y-4">
                {contactCards.map((card) => (
                  <div
                    key={card.title}
                    className="group p-5 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(79,70,229,0.25)] hover:bg-[rgba(255,255,255,0.04)] transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-lg shrink-0 opacity-90`}>
                        {card.emoji}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-[#FAFAFA] mb-1">{card.title}</h3>
                        <p className="text-xs text-[#71717A] leading-relaxed">{card.desc}</p>
                        {card.sub && <p className="text-xs text-[#52525B] mt-0.5">{card.sub}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
