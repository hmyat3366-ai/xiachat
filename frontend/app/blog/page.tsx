import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { blogPosts } from "./data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on customer messaging, real-time chat, product design, and building better support experiences. Written by the Xia Chat team.",
  openGraph: {
    title: "Blog | Xia Chat",
    description:
      "Insights on customer messaging, real-time chat, and building better support experiences.",
  },
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#09090B]">
        {/* Header */}
        <section className="relative pt-20 pb-12 sm:pt-28 sm:pb-16 overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#4F46E5] opacity-[0.08] rounded-full blur-[120px]" />
          </div>

          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <p className="text-sm font-semibold text-[#4F46E5] tracking-wide uppercase mb-3">Blog</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#FAFAFA] tracking-tight mb-5">Insights & Updates</h1>
            <p className="text-lg text-[#A1A1AA] max-w-xl mx-auto leading-relaxed">
              Thoughts on customer messaging, product design, engineering, and building a better support experience.
            </p>
          </div>
        </section>

        {/* Article Grid */}
        <section className="pb-24 sm:pb-32">
          <div className="max-w-4xl mx-auto px-6">
            <div className="grid gap-0 divide-y divide-[rgba(255,255,255,0.06)]">
              {blogPosts.map((post) => (
                <article key={post.slug} className="group py-10 first:pt-0">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-semibold text-[#818CF8] bg-[rgba(79,70,229,0.15)] px-2.5 py-1 rounded-full tracking-wide">{post.category}</span>
                      <span className="text-xs text-[#71717A]">{post.date}</span>
                      <span className="text-xs text-[#52525B]">·</span>
                      <span className="text-xs text-[#71717A]">{post.readTime}</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-[#FAFAFA] tracking-tight mb-3 group-hover:text-[#818CF8] transition-colors duration-200">{post.title}</h2>
                    <p className="text-[#A1A1AA] leading-relaxed mb-4 max-w-2xl">{post.excerpt}</p>
                    <span className="inline-flex items-center text-sm font-medium text-[#818CF8] group-hover:gap-2 gap-1 transition-all duration-200">
                      Read article
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
