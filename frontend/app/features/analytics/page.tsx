import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Analytics — Real-time Support Metrics",
  description: "Track response times, CSAT, agent performance, and conversation trends with beautiful real-time dashboards.",
};

const metrics = [
  { label: "Avg. Response Time", value: "1m 23s", change: "-18%", positive: true },
  { label: "CSAT Score", value: "4.8 / 5", change: "+0.3", positive: true },
  { label: "Conversations Today", value: "342", change: "+12%", positive: true },
  { label: "Resolution Rate", value: "94%", change: "+5%", positive: true },
];

const features = [
  { title: "Real-time Dashboards", desc: "Live metrics that update every second. See what's happening across your support team right now." },
  { title: "Agent Performance", desc: "Track individual agent metrics — response times, resolution rates, and customer ratings." },
  { title: "Conversation Trends", desc: "Spot patterns in customer inquiries by time, channel, topic, and sentiment." },
  { title: "CSAT & NPS Tracking", desc: "Measure customer satisfaction with automatic post-conversation surveys." },
  { title: "Busiest Hours Analysis", desc: "Identify peak hours and optimize team scheduling for maximum coverage." },
  { title: "Export & API Access", desc: "Export data to CSV or connect via API. Integrate with your BI tools." },
];

export default function AnalyticsPage() {
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
            <p className="text-sm font-semibold text-[#4F46E5] tracking-wide uppercase mb-3">Analytics</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FAFAFA] tracking-tight leading-[1.1] mb-6">
              Measure what matters.<br /><span className="text-[#71717A]">Improve everything.</span>
            </h1>
            <p className="text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed mb-10">
              Real-time analytics that give you complete visibility into your support performance. Make data-driven decisions.
            </p>
            <Link href="/pricing" className="inline-flex items-center px-7 py-3.5 bg-[#4F46E5] text-white text-base font-semibold rounded-full hover:bg-[#4338CA] transition-all shadow-[0_4px_24px_rgba(79,70,229,0.4)]">
              Try It Free
            </Link>
          </div>
        </section>

        {/* Metrics Preview */}
        <section className="pb-24">
          <div className="max-w-4xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {metrics.map((m) => (
                <div key={m.label} className="p-5 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl text-center hover:border-[#818CF8]/30 hover:shadow-lg transition-all duration-300">
                  <p className="text-2xl sm:text-3xl font-bold text-[#FAFAFA] mb-1">{m.value}</p>
                  <p className="text-xs text-[#71717A] mb-2">{m.label}</p>
                  <span className={`text-xs font-semibold ${m.positive ? "text-green-400" : "text-red-400"}`}>{m.change}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 border-y border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.01)]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#FAFAFA] tracking-tight mb-12 text-center">Deep insights, zero complexity</h2>
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
            <h2 className="text-3xl font-bold text-[#FAFAFA] tracking-tight mb-4">Data-driven support starts here.</h2>
            <p className="text-[#A1A1AA] mb-8">Free analytics included with every plan.</p>
            <Link href="/pricing" className="inline-flex items-center px-7 py-3.5 bg-[#4F46E5] text-white text-base font-semibold rounded-full hover:bg-[#4338CA] transition-all shadow-[0_4px_24px_rgba(79,70,229,0.4)]">
              Get Started
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
