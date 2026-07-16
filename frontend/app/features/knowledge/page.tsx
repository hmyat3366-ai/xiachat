import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Knowledge Base — Self-Service Help Center",
  description: "Create a beautiful, searchable help center your customers will love. Multilingual, SEO-friendly, and easy to manage.",
};

const features = [
  { title: "Visual Editor", desc: "Write and format articles with a rich text editor. No HTML needed — just write, style, and publish." },
  { title: "Instant Search", desc: "Customers find answers instantly with fast, fuzzy search across all your articles and categories." },
  { title: "Multilingual", desc: "Publish articles in multiple languages. Auto-detect visitor language and show the right version." },
  { title: "Custom Domain", desc: "Host your help center on your own domain (help.yourdomain.com) for a seamless brand experience." },
  { title: "SEO Optimized", desc: "Articles are automatically optimized for search engines with proper meta tags, sitemaps, and structured data." },
  { title: "In-Widget Access", desc: "Customers can search your knowledge base directly from the chat widget — before starting a conversation." },
];

export default function KnowledgePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#09090B]">
        <section className="relative pt-24 pb-20 sm:pt-32 sm:pb-28 overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#4F46E5] opacity-[0.08] rounded-full blur-[120px]" />
          </div>

          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <p className="text-sm font-semibold text-[#4F46E5] tracking-wide uppercase mb-3">Knowledge Base</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FAFAFA] tracking-tight leading-[1.1] mb-6">
              Help customers<br /><span className="text-[#71717A]">help themselves.</span>
            </h1>
            <p className="text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed mb-10">
              Build a beautiful help center that reduces support tickets by up to 50%. Customers find answers before they even need to ask.
            </p>
            <Link href="/pricing" className="inline-flex items-center px-7 py-3.5 bg-[#4F46E5] text-white text-base font-semibold rounded-full hover:bg-[#4338CA] transition-all shadow-[0_4px_24px_rgba(79,70,229,0.4)]">
              Try It Free
            </Link>
          </div>
        </section>

        {/* Help Center Mock */}
        <section className="pb-24">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl shadow-xl overflow-hidden p-8 sm:p-10">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[#FAFAFA] mb-3">How can we help?</h2>
                <div className="max-w-md mx-auto h-12 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl flex items-center px-4">
                  <svg className="w-5 h-5 text-[#71717A] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                  <span className="text-sm text-[#71717A]">Search for articles...</span>
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {["Getting Started", "Account & Billing", "Integrations"].map((cat) => (
                  <div key={cat} className="p-5 bg-[rgba(255,255,255,0.02)] rounded-xl border border-[rgba(255,255,255,0.06)] text-center hover:border-[#818CF8]/30 transition-all">
                    <p className="text-sm font-semibold text-[#FAFAFA] mb-1">{cat}</p>
                    <p className="text-xs text-[#71717A]">{Math.floor(Math.random() * 12) + 5} articles</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities grid */}
        <section className="py-24 border-y border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.01)]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#FAFAFA] tracking-tight mb-12 text-center">Everything you need to empower customers</h2>
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
            <h2 className="text-3xl font-bold text-[#FAFAFA] tracking-tight mb-4">Reduce tickets. Empower customers.</h2>
            <p className="text-[#A1A1AA] mb-8">Launch your help center in minutes, not weeks.</p>
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
