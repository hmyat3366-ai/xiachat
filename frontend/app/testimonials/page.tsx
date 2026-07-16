import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Testimonials — What Our Customers Say",
  description: "Hear from real teams using Xia Chat to deliver better customer support. Case studies and success stories.",
};

const testimonials = [
  {
    quote: "Xia Chat replaced three different tools for us. The shared inbox alone saved our team 10 hours a week. It's incredibly well-designed.",
    name: "Sarah Chen",
    role: "Head of Support",
    company: "TechFlow",
    metric: "10hrs/week saved",
  },
  {
    quote: "We were up and running in under 5 minutes. The widget just works, it's fast, and our customers love the instant response experience.",
    name: "Marcus Rivera",
    role: "CTO",
    company: "DataSync",
    metric: "5min setup",
  },
  {
    quote: "The AI chatbot handles 60% of our incoming questions automatically. Our team can finally focus on complex issues that actually need a human.",
    name: "Priya Sharma",
    role: "Customer Success Lead",
    company: "CloudBase",
    metric: "60% automated",
  },
  {
    quote: "We evaluated Intercom, Zendesk, and Crisp. Xia Chat won because of its simplicity and speed. Less is truly more.",
    name: "James Park",
    role: "Founder",
    company: "NexaPay",
    metric: "Chose over 3 competitors",
  },
  {
    quote: "Our CSAT score went from 4.1 to 4.8 after switching to Xia Chat. The real-time messaging makes customers feel heard immediately.",
    name: "Elena Kowalski",
    role: "VP of Operations",
    company: "Orbitly",
    metric: "4.1 → 4.8 CSAT",
  },
  {
    quote: "The knowledge base reduced our ticket volume by 45%. Customers find answers on their own now, and the search is impressively fast.",
    name: "David Nguyen",
    role: "Support Manager",
    company: "Acme Corp",
    metric: "45% fewer tickets",
  },
];

export default function TestimonialsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="pt-24 pb-8 sm:pt-32 sm:pb-12">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-sm font-semibold text-accent tracking-wide uppercase mb-3">Testimonials</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-5">
              Loved by teams<br /><span className="text-gray-400">around the world.</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">Real stories from real teams who switched to Xia Chat.</p>
          </div>
        </section>

        <section className="py-16 pb-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t.name} className="flex flex-col p-7 bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
                  {/* Metric badge */}
                  <div className="mb-5">
                    <span className="inline-flex items-center px-3 py-1 bg-accent-light text-accent text-xs font-semibold rounded-full">{t.metric}</span>
                  </div>
                  {/* Quote */}
                  <p className="text-gray-600 leading-relaxed text-sm flex-1 mb-6">&ldquo;{t.quote}&rdquo;</p>
                  {/* Author */}
                  <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-gray-500">{t.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{t.name}</p>
                      <p className="text-xs text-gray-400">{t.role}, {t.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">Join 2,400+ happy teams.</h2>
            <p className="text-gray-500 mb-8">Start your free trial today and see the difference.</p>
            <Link href="/pricing" className="inline-flex items-center px-7 py-3.5 bg-accent text-white text-base font-semibold rounded-full hover:bg-accent-hover transition-all shadow-lg shadow-accent/20">Start Free Trial</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
