import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Chat Widget — Live Chat for Your Website",
  description:
    "Add a beautiful, lightweight live chat widget to any website with a single line of code. Real-time WebSocket messaging, fully customizable to match your brand.",
};

const capabilities = [
  {
    title: "One-line Installation",
    desc: "Copy a single script tag into your site. Works with React, Vue, WordPress, Shopify, and any HTML page.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    title: "Brand Customization",
    desc: "Match your widget colors, position, welcome message, and avatar to your brand identity. No design skills needed.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    title: "Real-time Messaging",
    desc: "Powered by WebSockets for instant, bi-directional communication. Messages arrive in under 50ms.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "File Sharing",
    desc: "Customers can share images, documents, and screenshots directly through the widget. Drag-and-drop supported.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
      </svg>
    ),
  },
  {
    title: "Office Hours",
    desc: "Automatically show or hide the widget based on your team's availability. Display offline messages when you're away.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Lightweight & Fast",
    desc: "Only 12KB gzipped. Loads asynchronously so it never blocks your page render or affects Core Web Vitals.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.841m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
];

export default function WidgetPage() {
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
            <p className="text-sm font-semibold text-[#4F46E5] tracking-wide uppercase mb-3">Chat Widget</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FAFAFA] tracking-tight leading-[1.1] mb-6">
              Live chat that your
              <br />
              <span className="text-[#71717A]">customers will love.</span>
            </h1>
            <p className="text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed mb-10">
              Add a beautiful, real-time chat widget to your website in under 5 minutes. One script tag, zero configuration, instant conversations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/pricing" className="group inline-flex items-center px-7 py-3.5 bg-[#4F46E5] text-white text-base font-semibold rounded-full hover:bg-[#4338CA] transition-all shadow-[0_4px_24px_rgba(79,70,229,0.4)]">
                Try It Free
              </Link>
              <Link href="/blog/embed-chat-widget-in-5-minutes" className="inline-flex items-center px-7 py-3.5 bg-[rgba(255,255,255,0.05)] text-[#E4E4E7] text-base font-semibold rounded-full border border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.08)] transition-all">
                Read Setup Guide
              </Link>
            </div>
          </div>
        </section>

        {/* Code Preview */}
        <section className="pb-20">
          <div className="max-w-3xl mx-auto px-6">
            <div className="bg-[#18181B] rounded-2xl p-6 sm:p-8 shadow-2xl border border-[rgba(255,255,255,0.08)]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
                <span className="text-xs text-[#71717A] ml-2 font-mono">index.html</span>
              </div>
              <pre className="text-sm text-gray-300 font-mono leading-relaxed overflow-x-auto">
                <code>{`<!DOCTYPE html>
<html>
  <body>
    <!-- Your website content -->

    <!-- Xia Chat Widget — just one line -->
    <script
      src="https://cdn.xiachat.com/widget.js"
      data-xia-id="YOUR_PROJECT_ID"
      data-visitor-name="John Doe"
      async
    ></script>
  </body>
</html>`}</code>
              </pre>
            </div>
            <p className="text-center text-sm text-[#71717A] mt-4">That&apos;s it. One script tag and you&apos;re live.</p>
          </div>
        </section>

        {/* Capabilities Grid */}
        <section className="py-24 border-y border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.01)]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#FAFAFA] tracking-tight mb-4">
                Built for simplicity. Designed for delight.
              </h2>
              <p className="text-[#A1A1AA] max-w-xl mx-auto text-lg">
                Every detail is crafted to give your customers a seamless experience.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {capabilities.map((item) => (
                <div key={item.title} className="group p-7 bg-[rgba(255,255,255,0.02)] rounded-2xl border border-[rgba(255,255,255,0.06)] hover:border-[rgba(79,70,229,0.3)] hover:bg-[rgba(255,255,255,0.04)] hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-[rgba(79,70,229,0.12)] rounded-xl flex items-center justify-center text-[#818CF8] mb-5 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-[#FAFAFA] mb-2 group-hover:text-[#818CF8] transition-colors">{item.title}</h3>
                  <p className="text-sm text-[#71717A] leading-relaxed">{item.desc}</p>
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
            <h2 className="text-3xl font-bold text-[#FAFAFA] tracking-tight mb-4">
              Ready to add live chat to your site?
            </h2>
            <p className="text-[#A1A1AA] mb-8">Set up takes less than 5 minutes. No credit card required.</p>
            <Link href="/pricing" className="inline-flex items-center px-7 py-3.5 bg-[#4F46E5] text-white text-base font-semibold rounded-full hover:bg-[#4338CA] transition-all shadow-[0_4px_24px_rgba(79,70,229,0.4)]">
              Get Started for Free
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
