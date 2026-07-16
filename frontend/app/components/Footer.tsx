import Link from "next/link";

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "Live Chat Widget", href: "/features/widget" },
      { label: "Shared Inbox", href: "/features/inbox" },
      { label: "AI Agent", href: "/features/ai" },
      { label: "Analytics", href: "/features/analytics" },
      { label: "Campaigns", href: "/features/campaigns" },
      { label: "Contacts & CRM", href: "/features/crm" },
    ],
  },
  {
    title: "Pricing & Resources",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "Blog", href: "/blog" },
      { label: "Integrations", href: "/integrations" },
      { label: "How It Works", href: "/#how-it-works" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.06)] bg-[#09090B]">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <div className="grid md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <img src="/logo.png" alt="Xia Chat Logo" className="w-7 h-7" />
              <span className="text-base font-semibold text-[#FAFAFA] tracking-tight">
                Xia Chat
              </span>
            </Link>
            <p className="text-sm text-[#52525B] leading-relaxed mb-6">
              Customer messaging,
              <br />
              beautifully simple.
            </p>

            {/* Stats mini */}
            <div className="space-y-2">
              {[
                { val: "2,400+", label: "Teams using Xia Chat" },
                { val: "4.9/5", label: "Customer rating" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#818CF8]">{s.val}</span>
                  <span className="text-xs text-[#52525B]">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-semibold text-[#71717A] uppercase tracking-wider mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#52525B] hover:text-[#A1A1AA] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#3F3F46]">
            &copy; {new Date().getFullYear()} Xia Chat. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-[#3F3F46] hover:text-[#71717A] transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-[#3F3F46] hover:text-[#71717A] transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="text-xs text-[#3F3F46] hover:text-[#71717A] transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
