import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "AI Chatbot — Automate Customer Support",
  description: "Automate repetitive questions with AI-powered chatbots. Train on your knowledge base, hand off to humans seamlessly.",
};

const capabilities = [
  { title: "Knowledge Base Training", desc: "AI learns from your help center, docs, and FAQs. Answers questions accurately without manual scripting." },
  { title: "Visual Bot Builder", desc: "Build conversation flows with a drag-and-drop editor. No coding required — just connect blocks and deploy." },
  { title: "Human Handoff", desc: "When the bot can't help, it seamlessly transfers to a human agent with full conversation context." },
  { title: "Multi-language Support", desc: "AI automatically detects and responds in the customer's language. Support 50+ languages out of the box." },
  { title: "Conversation Analytics", desc: "Track bot resolution rates, handoff frequency, and common questions to continuously improve." },
  { title: "Custom Triggers", desc: "Activate bots based on page URL, user behavior, time on page, or custom events." },
];

export default function AIPage() {
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
            <p className="text-sm font-semibold text-[#4F46E5] tracking-wide uppercase mb-3">AI Chatbot</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FAFAFA] tracking-tight leading-[1.1] mb-6">
              Support that scales<br /><span className="text-[#71717A]">with intelligence.</span>
            </h1>
            <p className="text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed mb-10">
              Automate 60% of support conversations with AI that learns from your docs. When it can&apos;t help, it hands off to your team with full context.
            </p>
            <Link href="/pricing" className="inline-flex items-center px-7 py-3.5 bg-[#4F46E5] text-white text-base font-semibold rounded-full hover:bg-[#4338CA] transition-all shadow-[0_4px_24px_rgba(79,70,229,0.4)]">
              Try AI Chatbot Free
            </Link>
          </div>
        </section>

        {/* How it works */}
        <section className="pb-24">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-[#FAFAFA] text-center mb-12">How it works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: "1", title: "Connect your data", desc: "Import your help center, PDFs, or website content." },
                { step: "2", title: "AI learns automatically", desc: "Our AI builds a knowledge model from your content." },
                { step: "3", title: "Deploy & improve", desc: "Go live in minutes. AI gets smarter with every conversation." },
              ].map((s) => (
                <div key={s.step} className="text-center">
                  <div className="w-12 h-12 bg-[#4F46E5] text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4 shadow-[0_2px_12px_rgba(79,70,229,0.3)]">{s.step}</div>
                  <h3 className="text-lg font-semibold text-[#FAFAFA] mb-2">{s.title}</h3>
                  <p className="text-sm text-[#71717A]">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities Grid */}
        <section className="py-24 border-y border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.01)]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#FAFAFA] tracking-tight mb-12 text-center">Powerful capabilities</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {capabilities.map((f) => (
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
            <h2 className="text-3xl font-bold text-[#FAFAFA] tracking-tight mb-4">Let AI handle the routine.</h2>
            <p className="text-[#A1A1AA] mb-8">Your team focuses on conversations that matter.</p>
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
