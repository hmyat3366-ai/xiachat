import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "About Us — Our Story",
  description: "Learn about the team behind Xia Chat. We're building the simplest, fastest customer messaging platform.",
};

const values = [
  { title: "Simplicity First", desc: "We remove everything that isn't essential. Great software is defined by what it leaves out." },
  { title: "Speed Matters", desc: "Every millisecond counts. We obsess over performance because your customers' time is valuable." },
  { title: "Transparent by Default", desc: "Open pricing, honest communication, and no hidden agendas. Trust is earned through transparency." },
  { title: "Customer Obsessed", desc: "We use Xia Chat to support our own customers. We eat our own cooking, every single day." },
];

const milestones = [
  { year: "2024", event: "Xia Chat founded with a simple idea: customer messaging should be simple." },
  { year: "2024", event: "Launched public beta. First 100 teams onboarded in 30 days." },
  { year: "2025", event: "Released AI chatbot, knowledge base, and 50+ integrations." },
  { year: "2025", event: "Passed 2,400 teams. Processing 1M+ messages per month." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#09090B]">
        {/* Hero */}
        <section className="pt-24 pb-20 sm:pt-32 sm:pb-28">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-sm font-semibold text-[#4F46E5] tracking-wide uppercase mb-3">About Us</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#FAFAFA] tracking-tight leading-[1.1] mb-6">
              We believe support<br />
              <span className="bg-gradient-to-r from-[#818CF8] to-[#c084fc] bg-clip-text text-transparent">
                should be simple.
              </span>
            </h1>
            <p className="text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
              Xia Chat was born from frustration with bloated, complex support tools. We&apos;re building the customer messaging platform we wished existed — fast, minimal, and affordable.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="pb-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "2,400+", label: "Teams" },
                { value: "1M+", label: "Messages/month" },
                { value: "50+", label: "Integrations" },
                { value: "<50ms", label: "Avg. latency" },
              ].map((s) => (
                <div key={s.label} className="text-center p-5 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-2xl hover:border-[rgba(79,70,229,0.3)] transition-colors">
                  <p className="text-3xl font-bold text-[#FAFAFA] mb-1">{s.value}</p>
                  <p className="text-sm text-[#71717A]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 border-t border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.01)]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-[#FAFAFA] tracking-tight mb-12 text-center">Our values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="p-7 bg-[rgba(255,255,255,0.02)] rounded-2xl border border-[rgba(255,255,255,0.06)] hover:border-[rgba(79,70,229,0.3)] hover:bg-[rgba(255,255,255,0.04)] transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-[rgba(79,70,229,0.15)] rounded-lg flex items-center justify-center mb-4">
                    <div className="w-2 h-2 bg-[#818CF8] rounded-full" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#FAFAFA] mb-2">{v.title}</h3>
                  <p className="text-sm text-[#71717A] leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 border-t border-[rgba(255,255,255,0.06)]">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-[#FAFAFA] tracking-tight mb-12 text-center">Our journey</h2>
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-[#818CF8] rounded-full shadow-[0_0_8px_rgba(129,140,248,0.6)]" />
                    {i < milestones.length - 1 && <div className="w-px flex-1 bg-[rgba(255,255,255,0.08)] mt-2" />}
                  </div>
                  <div className="pb-8">
                    <p className="text-xs font-semibold text-[#818CF8] mb-1">{m.year}</p>
                    <p className="text-sm text-[#A1A1AA]">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-[rgba(255,255,255,0.06)] relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#4F46E5] opacity-[0.07] rounded-full blur-[100px]" />
          </div>
          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-[#FAFAFA] tracking-tight mb-4">Want to join us?</h2>
            <p className="text-[#A1A1AA] mb-8">We&apos;re always looking for talented people who care about simplicity.</p>
            <Link
              href="/contact"
              className="inline-flex items-center px-7 py-3.5 bg-[#4F46E5] text-white text-base font-semibold rounded-full hover:bg-[#4338CA] transition-all shadow-[0_4px_24px_rgba(79,70,229,0.4)]"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
