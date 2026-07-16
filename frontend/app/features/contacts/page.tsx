import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Contacts & CRM — Know Your Customers",
  description:
    "Automatically track every visitor and build rich customer profiles. Manage leads, view conversation history, and export data with one click.",
};

const capabilities = [
  {
    title: "Automatic Visitor Tracking",
    desc: "Every visitor to your website is automatically captured and stored as a contact — no extra setup required.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    title: "Rich Contact Profiles",
    desc: "See a contact's full history — every conversation, page visited, location, device, and custom attributes — in one place.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    title: "Lead Management",
    desc: "Tag contacts, add notes, assign to team members, and move them through a simple sales pipeline to close more deals.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
  },
  {
    title: "Search & Filter",
    desc: "Quickly find any contact by name, email, location, or page they visited. Filter by date range and conversation status.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    title: "Export to Excel",
    desc: "Export your entire contact list or a filtered segment to Excel with one click. Your data is always yours.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    ),
  },
  {
    title: "Real-time Online Status",
    desc: "See which contacts are currently browsing your website in real-time. Reach out to them at exactly the right moment.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
];

export default function ContactsPage() {
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
            <p className="text-sm font-semibold text-[#4F46E5] tracking-wide uppercase mb-3">Contacts & CRM</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FAFAFA] tracking-tight leading-[1.1] mb-6">
              Know every customer
              <br />
              <span className="text-[#71717A]">before they say a word.</span>
            </h1>
            <p className="text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed mb-10">
              Every website visitor is automatically tracked and stored as a contact. Build rich profiles, manage your pipeline, and close more deals — all from one place.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="group inline-flex items-center px-7 py-3.5 bg-[#4F46E5] text-white text-base font-semibold rounded-full hover:bg-[#4338CA] transition-all shadow-[0_4px_24px_rgba(79,70,229,0.4)]"
              >
                Start for Free
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center px-7 py-3.5 bg-[rgba(255,255,255,0.05)] text-[#E4E4E7] text-base font-semibold rounded-full border border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.08)] transition-all"
              >
                See Pricing
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 border-t border-[rgba(255,255,255,0.06)]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-[#FAFAFA] tracking-tight mb-4">
                A CRM built for chat-first teams
              </h2>
              <p className="text-[#A1A1AA] text-lg max-w-2xl">
                Stop switching between tools. Everything you need to understand and manage your customers is right inside Xia Chat.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {capabilities.map((cap) => (
                <div
                  key={cap.title}
                  className="p-7 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.04)] transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-[rgba(79,70,229,0.1)] text-[#818CF8] flex items-center justify-center mb-5">
                    {cap.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#FAFAFA] mb-2">{cap.title}</h3>
                  <p className="text-[#A1A1AA] leading-relaxed text-sm">{cap.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 border-t border-[rgba(255,255,255,0.06)]">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#FAFAFA] tracking-tight mb-4">
              Ready to know your customers better?
            </h2>
            <p className="text-[#A1A1AA] text-lg mb-10">
              Start for free. No credit card required.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center px-8 py-4 bg-[#4F46E5] text-white text-base font-semibold rounded-full hover:bg-[#4338CA] transition-all shadow-[0_4px_24px_rgba(79,70,229,0.4)]"
            >
              Get Started Free
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
