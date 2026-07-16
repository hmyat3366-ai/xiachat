import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Integrations — Connect Your Favorite Tools",
  description: "Connect Xia Chat with Slack, HubSpot, Zapier, WordPress, Shopify, and 50+ more tools your team already uses.",
};

const categories = ["All", "CRM", "CMS", "Automation", "Messaging", "E-commerce", "Analytics", "Developer"];

const integrations = [
  { name: "Slack", category: "Messaging", desc: "Get notifications and reply to messages directly from Slack.", icon: "🔵" },
  { name: "HubSpot", category: "CRM", desc: "Sync contacts, companies, and conversation data with HubSpot CRM.", icon: "🟠" },
  { name: "Zapier", category: "Automation", desc: "Connect Xia Chat to 5,000+ apps with no-code automations.", icon: "🟡" },
  { name: "WordPress", category: "CMS", desc: "Install the chat widget on your WordPress site with one click.", icon: "🔷" },
  { name: "Shopify", category: "E-commerce", desc: "See customer order details alongside conversations.", icon: "🟢" },
  { name: "Salesforce", category: "CRM", desc: "Bi-directional sync with Salesforce contacts and opportunities.", icon: "☁️" },
  { name: "Google Analytics", category: "Analytics", desc: "Track chat events and conversions in Google Analytics.", icon: "📊" },
  { name: "n8n", category: "Automation", desc: "Build custom workflows with the open-source automation platform.", icon: "⚡" },
  { name: "Webhooks", category: "Developer", desc: "Send real-time events to any URL. Build custom integrations.", icon: "🔗" },
  { name: "REST API", category: "Developer", desc: "Full API access to conversations, contacts, and settings.", icon: "🛠️" },
  { name: "WooCommerce", category: "E-commerce", desc: "View WooCommerce order history directly in the conversation panel.", icon: "🛒" },
  { name: "Telegram", category: "Messaging", desc: "Receive and reply to Telegram messages from your Xia inbox.", icon: "✈️" },
  { name: "WhatsApp", category: "Messaging", desc: "Manage WhatsApp conversations alongside your other channels.", icon: "📱" },
  { name: "Notion", category: "CMS", desc: "Create Notion pages from conversations. Sync knowledge base content.", icon: "📝" },
  { name: "Stripe", category: "E-commerce", desc: "See customer subscription and payment info in the conversation panel.", icon: "💳" },
];

export default function IntegrationsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#09090B]">
        <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#4F46E5] opacity-[0.08] rounded-full blur-[120px]" />
          </div>

          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <p className="text-sm font-semibold text-[#4F46E5] tracking-wide uppercase mb-3">Integrations</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#FAFAFA] tracking-tight leading-[1.1] mb-5">
              Works with the tools<br /><span className="text-[#71717A]">you already use.</span>
            </h1>
            <p className="text-lg text-[#A1A1AA] max-w-2xl mx-auto">Connect Xia Chat with your CRM, CMS, e-commerce, and automation tools in just a few clicks.</p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="pb-8">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button 
                  key={cat} 
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                    cat === "All" 
                      ? "bg-[#4F46E5] text-white" 
                      : "bg-[rgba(255,255,255,0.05)] text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.08)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Cards */}
        <section className="py-12 pb-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {integrations.map((int) => (
                <div key={int.name} className="group p-6 bg-[rgba(255,255,255,0.02)] rounded-2xl border border-[rgba(255,255,255,0.06)] hover:border-[rgba(79,70,229,0.3)] hover:bg-[rgba(255,255,255,0.04)] hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{int.icon}</span>
                    <div>
                      <h3 className="text-base font-semibold text-[#FAFAFA] mb-1 group-hover:text-[#818CF8] transition-colors">{int.name}</h3>
                      <p className="text-xs text-[#818CF8] font-medium mb-2">{int.category}</p>
                      <p className="text-sm text-[#71717A] leading-relaxed">{int.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Call to Action */}
        <section className="py-20 border-y border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.01)] relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#4F46E5] opacity-[0.07] rounded-full blur-[100px]" />
          </div>
          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-[#FAFAFA] tracking-tight mb-4">Don&apos;t see your tool?</h2>
            <p className="text-[#A1A1AA] mb-8">Use our API or Zapier to connect with virtually anything.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/pricing" className="inline-flex items-center px-7 py-3.5 bg-[#4F46E5] text-white text-base font-semibold rounded-full hover:bg-[#4338CA] transition-all shadow-[0_4px_24px_rgba(79,70,229,0.4)]">
                Get Started
              </Link>
              <Link href="/contact" className="inline-flex items-center px-7 py-3.5 bg-[rgba(255,255,255,0.05)] text-[#E4E4E7] text-base font-semibold rounded-full border border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.08)] transition-all">
                Request Integration
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
