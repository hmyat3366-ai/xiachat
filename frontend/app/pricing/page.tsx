import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Pricing — Plans for Every Team",
  description: "Simple, transparent pricing. Start free, upgrade when you're ready. No hidden fees.",
};

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "For personal projects and testing.",
    features: ["100 conversations/mo", "1 agent seat", "Chat widget", "7-day history", "Community support"],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Starter",
    price: "$19",
    period: "per agent/mo",
    desc: "For small teams getting started.",
    features: ["1,000 conversations/mo", "Up to 5 agents", "Chat widget customization", "30-day history", "Email support", "Basic analytics"],
    cta: "Start Free Trial",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "per agent/mo",
    desc: "For growing teams that need more.",
    features: ["Unlimited conversations", "Unlimited agents", "AI chatbot", "Knowledge base", "Advanced analytics", "Priority support", "API access", "Custom branding"],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    desc: "For large organizations.",
    features: ["Everything in Pro", "SSO / SAML", "Dedicated account manager", "Custom SLA", "On-premises option", "Advanced security", "Custom integrations", "Training & onboarding"],
    cta: "Contact Sales",
    highlight: false,
  },
];

const faqs = [
  { q: "Can I try before I buy?", a: "Yes! All paid plans come with a 14-day free trial. No credit card required." },
  { q: "Can I change plans later?", a: "Absolutely. Upgrade or downgrade at any time. Changes take effect immediately." },
  { q: "What payment methods do you accept?", a: "We accept all major credit cards, PayPal, and wire transfers for Enterprise plans." },
  { q: "Is there a long-term contract?", a: "No. All plans are month-to-month. Cancel anytime with no penalties." },
  { q: "Do you offer discounts for nonprofits?", a: "Yes, we offer 50% off for registered nonprofits and educational institutions." },
];

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-[#818CF8] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#09090B]">
        {/* Header Section */}
        <section className="relative pt-24 pb-8 sm:pt-32 sm:pb-12 overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#4F46E5] opacity-[0.08] rounded-full blur-[120px]" />
          </div>

          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <p className="text-sm font-semibold text-[#4F46E5] tracking-wide uppercase mb-3">Pricing</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#FAFAFA] tracking-tight leading-[1.1] mb-5">
              Plans for every team size.
            </h1>
            <p className="text-lg text-[#A1A1AA] max-w-xl mx-auto">Start free. Upgrade as you grow. No hidden fees, no surprises.</p>
          </div>
        </section>

        {/* Pricing Cards Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan) => (
                <div 
                  key={plan.name} 
                  className={`relative flex flex-col p-7 rounded-2xl border transition-all duration-300 ${
                    plan.highlight 
                      ? "bg-[rgba(79,70,229,0.08)] border-[rgba(79,70,229,0.4)] shadow-[0_0_40px_rgba(79,70,229,0.15)]" 
                      : "bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)]"
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-3.5 py-1 bg-[#4F46E5] text-white text-xs font-bold rounded-full shadow-[0_2px_12px_rgba(79,70,229,0.5)]">Most Popular</span>
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-[#FAFAFA] mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold text-[#FAFAFA] tracking-tight">{plan.price}</span>
                    <span className="text-sm text-[#71717A]">/ {plan.period}</span>
                  </div>
                  <p className="text-sm text-[#71717A] mb-6">{plan.desc}</p>
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <CheckIcon />
                        <span className="text-sm text-[#A1A1AA]">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-2.5 px-5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                    plan.highlight 
                      ? "bg-[#4F46E5] text-white hover:bg-[#4338CA] shadow-[0_2px_12px_rgba(79,70,229,0.4)]" 
                      : "bg-[rgba(255,255,255,0.06)] text-[#E4E4E7] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.08)]"
                  }`}>
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 border-y border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.01)]">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-[#FAFAFA] tracking-tight mb-12 text-center">Frequently asked questions</h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.q} className="bg-[rgba(255,255,255,0.02)] p-6 rounded-2xl border border-[rgba(255,255,255,0.06)]">
                  <h3 className="text-base font-semibold text-[#FAFAFA] mb-2">{faq.q}</h3>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#4F46E5] opacity-[0.07] rounded-full blur-[100px]" />
          </div>
          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-[#FAFAFA] tracking-tight mb-4">Still have questions?</h2>
            <p className="text-[#A1A1AA] mb-8">Our team is here to help you find the right plan.</p>
            <Link href="/contact" className="inline-flex items-center px-7 py-3.5 bg-[#4F46E5] text-white text-base font-semibold rounded-full hover:bg-[#4338CA] transition-all shadow-[0_4px_24px_rgba(79,70,229,0.4)]">
              Contact Sales
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
