"use client";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { WavyBackground } from "@/components/ui/wavy-background";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

// Reusable scroll-triggered fade-in section wrapper
function FadeInSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.21, 0.45, 0.27, 0.9] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}


function ArrowRightIcon() {
  return (
    <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-[#818CF8] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    title: "Live Chat Widget",
    description: "Embed a beautiful, fully customizable chat widget on your website with a single line of code. Real-time conversations, instant notifications.",
    badge: "Most Used",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
      </svg>
    ),
    title: "Shared Inbox",
    description: "All customer conversations in one unified inbox. Assign chats to team members, leave internal notes, and never miss a message.",
    badge: null,
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    title: "AI Agent",
    description: "Train a GPT-powered AI agent with your knowledge base. It auto-replies to common questions 24/7, freeing your team for complex issues.",
    badge: "Pro",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: "Analytics",
    description: "Track conversation volume, response times, and visitor behavior with real-time dashboards. Make data-driven decisions to improve support.",
    badge: null,
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
      </svg>
    ),
    title: "Campaigns",
    description: "Send targeted email or in-app messages to your contacts. Create drip campaigns, segment your audience, and track delivery results.",
    badge: null,
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    title: "Contacts & CRM",
    description: "Every website visitor is automatically tracked. Build rich contact profiles, manage leads, and export to Excel with one click.",
    badge: null,
  },
];

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for personal projects and solo operators.",
    features: [
      "Up to 1,000 conversations / month",
      "2 team members",
      "Live chat widget",
      "Shared inbox",
      "Contacts & visitor tracking",
      "7-day conversation history",
    ],
    cta: "Start for Free",
    href: "/signup",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "per workspace / month",
    description: "For growing teams that need powerful tools.",
    features: [
      "Unlimited conversations",
      "Up to 20 team members",
      "AI Agent (GPT-4o powered)",
      "Campaigns & bulk messaging",
      "Advanced analytics",
      "Remove Xia Chat branding",
    ],
    cta: "Start 14-day Free Trial",
    href: "/signup",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "tailored for you",
    description: "For large organizations with custom requirements.",
    features: [
      "Custom API & integrations",
      "Dedicated account manager",
      "Custom AI model fine-tuning",
      "SLA & uptime guarantee",
      "White-glove onboarding",
    ],
    cta: "Contact Sales",
    href: "mailto:sales@xiachat.com",
    highlight: false,
  },
];

const integrations = [
  {
    name: "Slack",
    description: "Get notified and reply to chats without leaving Slack.",
    icon: (
      <svg className="w-8 h-8 text-[#E4E4E7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
  {
    name: "Shopify",
    description: "View customer orders right next to their chat conversation.",
    icon: (
      <svg className="w-8 h-8 text-[#E4E4E7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
  },
  {
    name: "Zapier",
    description: "Connect Xia Chat to 5,000+ apps and automate workflows.",
    icon: (
      <svg className="w-8 h-8 text-[#E4E4E7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    name: "WordPress",
    description: "Add live chat to your WP site with our official plugin.",
    icon: (
      <svg className="w-8 h-8 text-[#E4E4E7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
];

const blogPosts = [
  {
    title: "How to reduce customer support response times by 50%",
    excerpt: "Learn the proven strategies and tools that top-performing support teams use to slash their response times and increase customer satisfaction.",
    date: "Jul 10, 2026",
    category: "Support",
    href: "#",
  },
  {
    title: "Announcing AI Agents: Let GPT handle your support queue",
    excerpt: "Today we are excited to launch AI Agents. Train your own GPT-4 powered assistant on your knowledge base to resolve common queries 24/7.",
    date: "Jun 28, 2026",
    category: "Product",
    href: "#",
  },
  {
    title: "Best practices for proactive customer engagement",
    excerpt: "Don't wait for your customers to come to you with problems. Discover how to use proactive messaging to guide them to success.",
    date: "Jun 15, 2026",
    category: "Growth",
    href: "#",
  },
];

export default function LandingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#09090B]">

        {/* ─── HERO ─── */}
        <section ref={heroRef} className="relative overflow-hidden">
          <WavyBackground
            containerClassName="min-h-screen pt-16"
            backgroundFill="#09090B"
            colors={["#4F46E5", "#818CF8", "#6366f1", "#a855f7", "#3b82f6"]}
            blur={8}
            speed="slow"
            waveOpacity={0.4}
            waveWidth={60}
            className="max-w-4xl mx-auto px-6 text-center"
          >

            <motion.div style={{ y: heroY, opacity: heroOpacity }}>
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.21, 0.45, 0.27, 0.9] }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[rgba(79,70,229,0.15)] border border-[rgba(79,70,229,0.3)] rounded-full mb-8">
                  <span className="w-2 h-2 bg-[#818CF8] rounded-full animate-pulse" />
                  <span className="text-xs font-medium text-[#818CF8] tracking-wide">Now in Public Beta · Free to start</span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.21, 0.45, 0.27, 0.9] }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#FAFAFA] tracking-tight leading-[1.08] mb-6"
              >
                Customer messaging,
                <br />
                <span className="bg-gradient-to-r from-[#818CF8] to-[#c084fc] bg-clip-text text-transparent">beautifully simple.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.45, 0.27, 0.9] }}
                className="text-lg sm:text-xl text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed mb-10"
              >
                Xia Chat gives your team a live chat widget, shared inbox, AI agent, campaigns, and CRM — all in one clean dashboard. No clutter. No complexity.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease: [0.21, 0.45, 0.27, 0.9] }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link
                  href="/signup"
                  className="group inline-flex items-center px-7 py-3.5 bg-[#4F46E5] text-white text-base font-semibold rounded-full hover:bg-[#4338CA] transition-all shadow-[0_4px_24px_rgba(79,70,229,0.5)] hover:shadow-[0_8px_32px_rgba(79,70,229,0.6)]"
                >
                  Get Started for Free
                  <ArrowRightIcon />
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center px-7 py-3.5 bg-[rgba(255,255,255,0.07)] text-[#E4E4E7] text-base font-semibold rounded-full border border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,0.12)] transition-all backdrop-blur-sm"
                >
                  See All Features
                </a>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.21, 0.45, 0.27, 0.9] }}
                className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto"
              >
                {[
                  { val: "2,400+", label: "Teams using Xia Chat" },
                  { val: "4.9/5", label: "Customer rating" },
                  { val: "<50ms", label: "Message latency" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl sm:text-3xl font-bold text-[#FAFAFA]">{s.val}</p>
                    <p className="text-xs text-[#71717A] mt-1">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </WavyBackground>
        </section>

        {/* ─── FEATURES ─── */}
        <section id="features" className="py-24 sm:py-32">
          <div className="max-w-6xl mx-auto px-6">
            <FadeInSection className="text-center mb-16">
              <p className="text-sm font-semibold text-[#4F46E5] tracking-wide uppercase mb-3">Features</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#FAFAFA] tracking-tight mb-4">
                Everything your support team needs.
              </h2>
              <p className="text-[#A1A1AA] max-w-xl mx-auto text-lg">
                6 powerful tools — all in one dashboard. No separate subscriptions.
              </p>
            </FadeInSection>

            <FadeInSection delay={0.1}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group p-7 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(79,70,229,0.3)] transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 bg-[rgba(79,70,229,0.12)] rounded-xl flex items-center justify-center text-[#818CF8] group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    {feature.badge && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${feature.badge === "Pro" ? "bg-[rgba(79,70,229,0.15)] text-[#818CF8]" : "bg-[rgba(34,197,94,0.1)] text-green-400"}`}>
                        {feature.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-[#FAFAFA] mb-2 group-hover:text-[#818CF8] transition-colors">{feature.title}</h3>
                  <p className="text-[#71717A] leading-relaxed text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
            </FadeInSection>
          </div>
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section className="py-20 border-y border-[rgba(255,255,255,0.06)]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <FadeInSection>
            <p className="text-sm font-semibold text-[#4F46E5] tracking-wide uppercase mb-3">How It Works</p>
            <h2 className="text-3xl font-bold text-[#FAFAFA] mb-12">Up and running in 3 steps</h2>
            <div className="grid sm:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Create your workspace", desc: "Sign up free and set up your workspace in under 2 minutes." },
                { step: "02", title: "Install the widget", desc: "Copy one line of code and paste it into your website's HTML." },
                { step: "03", title: "Start chatting", desc: "Receive messages in your inbox instantly. Reply, assign, and resolve." },
              ].map((s) => (
                <div key={s.step} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[rgba(79,70,229,0.15)] border border-[rgba(79,70,229,0.3)] flex items-center justify-center text-[#818CF8] font-bold text-sm mb-4">{s.step}</div>
                  <h3 className="text-base font-semibold text-[#FAFAFA] mb-2">{s.title}</h3>
                  <p className="text-sm text-[#71717A] leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
            </FadeInSection>
          </div>
        </section>

        {/* ─── PRICING ─── */}
        <section id="pricing" className="py-24 sm:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <FadeInSection className="text-center mb-16">
              <p className="text-sm font-semibold text-[#4F46E5] tracking-wide uppercase mb-3">Pricing</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#FAFAFA] tracking-tight mb-4">
                Simple, transparent pricing.
              </h2>
              <p className="text-[#A1A1AA] max-w-xl mx-auto text-lg">Start free. Upgrade when you&apos;re ready.</p>
            </FadeInSection>

            <FadeInSection delay={0.1}>
            <div className="grid md:grid-cols-3 gap-6">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative p-8 rounded-2xl border transition-all duration-300 ${
                    plan.highlight
                      ? "bg-[rgba(79,70,229,0.08)] border-[rgba(79,70,229,0.4)] shadow-[0_0_40px_rgba(79,70,229,0.15)]"
                      : "bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)]"
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center px-4 py-1 bg-[#4F46E5] text-white text-xs font-bold rounded-full shadow-[0_2px_12px_rgba(79,70,229,0.5)]">Most Popular</span>
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-[#FAFAFA] mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-4xl font-bold text-[#FAFAFA] tracking-tight">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-[#71717A] text-sm">/ {plan.period}</span>}
                  </div>
                  <p className="text-[#71717A] text-sm mb-7">{plan.description}</p>
                  <ul className="space-y-2.5 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <CheckIcon />
                        <span className="text-sm text-[#A1A1AA]">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={plan.href}
                    className={`block w-full text-center py-3 px-6 rounded-full text-sm font-semibold transition-all ${
                      plan.highlight
                        ? "bg-[#4F46E5] text-white hover:bg-[#4338CA] shadow-[0_2px_12px_rgba(79,70,229,0.4)]"
                        : "bg-[rgba(255,255,255,0.06)] text-[#E4E4E7] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.08)]"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
            </FadeInSection>
          </div>
        </section>

        {/* ─── INTEGRATIONS ─── */}
        <section id="integrations" className="py-24 border-t border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.01)]">
          <div className="max-w-6xl mx-auto px-6">
            <FadeInSection className="text-center mb-16">
              <p className="text-sm font-semibold text-[#4F46E5] tracking-wide uppercase mb-3">Integrations</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#FAFAFA] tracking-tight mb-4">
                Plays well with your favorite tools.
              </h2>
              <p className="text-[#A1A1AA] max-w-xl mx-auto text-lg">
                Connect Xia Chat with the apps you already use to keep your team productive.
              </p>
            </FadeInSection>

            <FadeInSection delay={0.1}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {integrations.map((integration) => (
                <div
                  key={integration.name}
                  className="p-6 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.04)] transition-colors"
                >
                  <div className="w-14 h-14 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl flex items-center justify-center mb-5">
                    {integration.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-[#FAFAFA] mb-2">{integration.name}</h3>
                  <p className="text-sm text-[#71717A] leading-relaxed">{integration.description}</p>
                </div>
              ))}
            </div>
            </FadeInSection>
            
            <div className="mt-12 text-center">
              <a href="#" className="inline-flex items-center text-[#818CF8] hover:text-[#A5B4FC] font-medium transition-colors">
                View all integrations <ArrowRightIcon />
              </a>
            </div>
          </div>
        </section>

        {/* ─── BLOG / RESOURCES ─── */}
        <section id="blog" className="py-24 border-t border-[rgba(255,255,255,0.06)]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <p className="text-sm font-semibold text-[#4F46E5] tracking-wide uppercase mb-3">Resources</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#FAFAFA] tracking-tight">
                  Latest from the blog.
                </h2>
              </div>
              <Link href="#" className="inline-flex items-center px-5 py-2.5 bg-[rgba(255,255,255,0.05)] text-[#E4E4E7] text-sm font-medium rounded-full border border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.1)] transition-all">
                Read all articles
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Link key={post.title} href={post.href} className="group block">
                  <div className="relative aspect-[16/9] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-2xl overflow-hidden mb-5">
                    {/* Placeholder for blog image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[rgba(79,70,229,0.1)] to-[rgba(0,0,0,0)]" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[rgba(0,0,0,0.2)] backdrop-blur-sm">
                      <span className="px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium border border-white/20">Read Article</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold px-2.5 py-1 bg-[rgba(79,70,229,0.1)] text-[#818CF8] rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-[#71717A]">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#FAFAFA] mb-3 group-hover:text-[#4F46E5] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#4F46E5] opacity-[0.07] rounded-full blur-[100px]" />
          </div>
          <FadeInSection className="relative max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#FAFAFA] tracking-tight mb-4">
              Ready to transform your customer support?
            </h2>
            <p className="text-[#A1A1AA] text-lg mb-8 max-w-xl mx-auto">
              Join 2,400+ teams delivering faster, more personal support with Xia Chat.
            </p>
            <Link
              href="/signup"
              className="group inline-flex items-center px-8 py-4 bg-[#4F46E5] text-white text-base font-semibold rounded-full hover:bg-[#4338CA] transition-all shadow-[0_4px_24px_rgba(79,70,229,0.4)]"
            >
              Start Your Free Trial
              <ArrowRightIcon />
            </Link>
            <p className="mt-4 text-sm text-[#52525B]">No credit card required · 14-day free trial</p>
          </FadeInSection>
        </section>

      </main>
      <Footer />
    </>
  );
}
