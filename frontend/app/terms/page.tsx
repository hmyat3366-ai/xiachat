import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read the terms and conditions for using Xia Chat's platform and services.",
};

const sections = [
  {
    number: "01",
    title: "Acceptance of Terms",
    content: null,
    paragraph: "By accessing or using Xia Chat's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
  },
  {
    number: "02",
    title: "Description of Service",
    content: null,
    paragraph: "Xia Chat provides a customer messaging platform that includes live chat, shared inbox, AI chatbot, knowledge base, analytics, and related services. We reserve the right to modify, suspend, or discontinue any part of the service at any time.",
  },
  {
    number: "03",
    title: "User Accounts",
    content: null,
    paragraph: "You must provide accurate and complete information when creating an account. You are responsible for maintaining the security of your account credentials and for all activities that occur under your account.",
  },
  {
    number: "04",
    title: "Acceptable Use",
    content: [
      "Violate any applicable laws or regulations",
      "Send spam, phishing, or unsolicited messages",
      "Transmit malicious code or interfere with the service",
      "Impersonate any person or entity",
      "Collect user data without consent",
    ],
    paragraph: "You agree not to use Xia Chat to:",
  },
  {
    number: "05",
    title: "Payment Terms",
    content: null,
    paragraph: "Paid plans are billed monthly or annually in advance. All fees are non-refundable except as required by law. We may change our pricing with 30 days' notice.",
  },
  {
    number: "06",
    title: "Intellectual Property",
    content: null,
    paragraph: "Xia Chat and its original content, features, and functionality are owned by Xia Chat and are protected by international copyright, trademark, and other intellectual property laws.",
  },
  {
    number: "07",
    title: "Limitation of Liability",
    content: null,
    paragraph: "Xia Chat shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the service.",
  },
  {
    number: "08",
    title: "Contact",
    content: null,
    paragraph: "For questions about these Terms, contact us at legal@xiachat.com.",
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#09090B]">
        <article className="pt-24 pb-24 sm:pt-32 sm:pb-32">
          <div className="max-w-3xl mx-auto px-6">

            {/* Header */}
            <header className="mb-16 relative">
              <div className="absolute -top-20 -right-20 w-[300px] h-[200px] bg-[#7C3AED] opacity-[0.05] rounded-full blur-[80px] pointer-events-none" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[rgba(79,70,229,0.1)] border border-[rgba(79,70,229,0.2)] rounded-full mb-4">
                  <span className="text-xs font-semibold text-[#818CF8] uppercase tracking-wider">Legal</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-bold text-[#FAFAFA] tracking-tight mb-4">
                  Terms of Service
                </h1>
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-[rgba(255,255,255,0.1)]" />
                  <p className="text-sm text-[#52525B]">Last updated: June 1, 2025</p>
                </div>
              </div>
            </header>

            {/* Sections */}
            <div className="space-y-6">
              {sections.map((s) => (
                <div
                  key={s.number}
                  className="group p-7 rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(79,70,229,0.2)] hover:bg-[rgba(255,255,255,0.03)] transition-all duration-300"
                >
                  <div className="flex items-start gap-5">
                    <span className="text-xs font-bold text-[#3F3F46] font-mono mt-1 shrink-0 group-hover:text-[#818CF8] transition-colors">
                      {s.number}
                    </span>
                    <div className="flex-1">
                      <h2 className="text-base font-semibold text-[#FAFAFA] mb-3">{s.title}</h2>
                      <p className="text-sm text-[#71717A] leading-relaxed mb-3">{s.paragraph}</p>
                      {s.content && (
                        <ul className="space-y-2">
                          {s.content.map((item) => (
                            <li key={item} className="flex items-start gap-2.5 text-sm text-[#71717A]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] shrink-0 mt-1.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom note */}
            <div className="mt-12 p-6 rounded-2xl bg-[rgba(79,70,229,0.06)] border border-[rgba(79,70,229,0.15)] text-center">
              <p className="text-sm text-[#71717A]">
                Legal questions?{" "}
                <a href="mailto:legal@xiachat.com" className="text-[#818CF8] hover:text-[#A5B4FC] transition-colors font-medium">
                  legal@xiachat.com
                </a>
              </p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
