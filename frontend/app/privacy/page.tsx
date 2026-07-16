import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how Xia Chat collects, uses, and protects your personal data. GDPR compliant.",
};

const sections = [
  {
    number: "01",
    title: "Introduction",
    content: null,
    paragraph: `Xia Chat ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform and services.`,
  },
  {
    number: "02",
    title: "Information We Collect",
    content: [
      "Account registration details (name, email, password)",
      "Profile information and preferences",
      "Conversation and messaging data",
      "Payment and billing information",
      "Support inquiries and feedback",
    ],
    paragraph: "We collect information you provide directly to us, including:",
  },
  {
    number: "03",
    title: "How We Use Your Information",
    content: [
      "Provide, maintain, and improve our services",
      "Process transactions and send related information",
      "Send technical notices, updates, and support messages",
      "Respond to your comments, questions, and requests",
      "Monitor and analyze trends, usage, and activities",
    ],
    paragraph: "We use the information we collect to:",
  },
  {
    number: "04",
    title: "Data Security",
    content: null,
    paragraph: "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. All data is encrypted in transit (TLS 1.3) and at rest (AES-256).",
  },
  {
    number: "05",
    title: "Data Retention",
    content: null,
    paragraph: "We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy. You can request deletion of your data at any time by contacting us at privacy@xiachat.com.",
  },
  {
    number: "06",
    title: "Your Rights (GDPR)",
    content: [
      "Access your personal data",
      "Rectify inaccurate data",
      "Request erasure of your data",
      "Restrict or object to processing",
      "Data portability",
      "Withdraw consent at any time",
    ],
    paragraph: "If you are located in the European Economic Area, you have the right to:",
  },
  {
    number: "07",
    title: "Contact Us",
    content: null,
    paragraph: "If you have any questions about this Privacy Policy, please contact us at privacy@xiachat.com.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#09090B]">
        <article className="pt-24 pb-24 sm:pt-32 sm:pb-32">
          <div className="max-w-3xl mx-auto px-6">

            {/* Header */}
            <header className="mb-16 relative">
              <div className="absolute -top-20 -left-20 w-[300px] h-[200px] bg-[#4F46E5] opacity-[0.05] rounded-full blur-[80px] pointer-events-none" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[rgba(79,70,229,0.1)] border border-[rgba(79,70,229,0.2)] rounded-full mb-4">
                  <span className="text-xs font-semibold text-[#818CF8] uppercase tracking-wider">Legal</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-bold text-[#FAFAFA] tracking-tight mb-4">
                  Privacy Policy
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
                Questions about privacy?{" "}
                <a href="mailto:privacy@xiachat.com" className="text-[#818CF8] hover:text-[#A5B4FC] transition-colors font-medium">
                  privacy@xiachat.com
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
