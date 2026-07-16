import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { blogPosts } from "../data";

/* ─── Static Params for SSG ─── */
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

/* ─── Dynamic Metadata ─── */
type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Xia Chat Blog`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

/* ─── Simple Markdown-like Renderer ─── */
function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Horizontal rule
    if (line.trim() === "---") {
      elements.push(
        <hr key={key++} className="my-10 border-[rgba(255,255,255,0.06)]" />
      );
      i++;
      continue;
    }

    // H2
    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={key++}
          className="text-2xl font-bold text-[#FAFAFA] tracking-tight mt-12 mb-4"
        >
          {line.replace("## ", "")}
        </h2>
      );
      i++;
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={key++}
          className="text-xl font-semibold text-[#FAFAFA] tracking-tight mt-8 mb-3"
        >
          {line.replace("### ", "")}
        </h3>
      );
      i++;
      continue;
    }

    // Code block
    if (line.trim().startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <pre
          key={key++}
          className="my-6 p-5 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-xl overflow-x-auto text-sm leading-relaxed"
        >
          <code className="font-mono text-[#FAFAFA]">
            {codeLines.join("\n")}
          </code>
        </pre>
      );
      continue;
    }

    // Table
    if (line.includes("|") && line.trim().startsWith("|")) {
      const tableLines: string[] = [];
      while (
        i < lines.length &&
        lines[i].includes("|") &&
        lines[i].trim().startsWith("|")
      ) {
        tableLines.push(lines[i]);
        i++;
      }

      // Parse table
      const headerCells = tableLines[0]
        .split("|")
        .filter((c) => c.trim() !== "")
        .map((c) => c.trim());

      const dataRows = tableLines.slice(2).map((row) =>
        row
          .split("|")
          .filter((c) => c.trim() !== "")
          .map((c) => c.trim())
      );

      elements.push(
        <div key={key++} className="my-8 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.08)]">
                {headerCells.map((cell, ci) => (
                  <th
                    key={ci}
                    className="text-left py-3 px-4 font-semibold text-[#FAFAFA]"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataRows.map((row, ri) => (
                <tr key={ri} className="border-b border-[rgba(255,255,255,0.04)]">
                  {row.map((cell, ci) => (
                    <td key={ci} className="py-3 px-4 text-[#A1A1AA]">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Unordered list item
    if (line.trim().startsWith("- ")) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        listItems.push(lines[i].trim().replace(/^- /, ""));
        i++;
      }
      elements.push(
        <ul key={key++} className="my-4 space-y-2.5">
          {listItems.map((item, li) => (
            <li key={li} className="flex items-start gap-3 text-[#A1A1AA] leading-relaxed">
              <span className="w-1.5 h-1.5 bg-[#818CF8] rounded-full mt-2 shrink-0" />
              <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Paragraph
    const paragraphLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !lines[i].startsWith("```") &&
      !lines[i].trim().startsWith("- ") &&
      !lines[i].trim().startsWith("|") &&
      lines[i].trim() !== "---"
    ) {
      paragraphLines.push(lines[i]);
      i++;
    }

    if (paragraphLines.length > 0) {
      const text = paragraphLines.join(" ");
      elements.push(
        <p
          key={key++}
          className="text-[#A1A1AA] leading-[1.8] my-4"
          dangerouslySetInnerHTML={{ __html: formatInline(text) }}
        />
      );
    }
  }

  return elements;
}

function formatInline(text: string): string {
  // Bold
  let result = text.replace(
    /\*\*(.*?)\*\*/g,
    '<strong class="font-semibold text-[#FAFAFA]">$1</strong>'
  );
  // Inline code
  result = result.replace(
    /`([^`]+)`/g,
    '<code class="px-1.5 py-0.5 bg-[rgba(255,255,255,0.04)] text-[#FAFAFA] text-[0.875em] rounded font-mono border border-[rgba(255,255,255,0.06)]">$1</code>'
  );
  return result;
}

/* ─── Page Component ─── */
export default async function BlogPostPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-[#09090B]">
        <article className="relative pt-16 pb-24 sm:pt-24 sm:pb-32 overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#4F46E5] opacity-[0.08] rounded-full blur-[120px]" />
          </div>

          <div className="relative max-w-[680px] mx-auto px-6">
            {/* Breadcrumb */}
            <div className="mb-10">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm text-[#71717A] hover:text-[#818CF8] transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
                Back to Blog
              </Link>
            </div>

            {/* Article Header */}
            <header className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-semibold text-[#818CF8] bg-[rgba(79,70,229,0.15)] px-2.5 py-1 rounded-full tracking-wide">
                  {post.category}
                </span>
                <span className="text-xs text-[#71717A]">{post.date}</span>
                <span className="text-xs text-[#52525B]">·</span>
                <span className="text-xs text-[#71717A]">{post.readTime}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#FAFAFA] tracking-tight leading-[1.15] mb-6">
                {post.title}
              </h1>

              <p className="text-lg text-[#A1A1AA] leading-relaxed">
                {post.excerpt}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-8 pt-8 border-t border-[rgba(255,255,255,0.06)]">
                <div className="w-10 h-10 bg-[rgba(255,255,255,0.04)] rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-[#A1A1AA]">
                    {post.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#FAFAFA]">
                    {post.author}
                  </p>
                  <p className="text-xs text-[#71717A]">{post.date}</p>
                </div>
              </div>
            </header>

            {/* Article Body */}
            <div className="prose-xia">{renderContent(post.content)}</div>

            {/* Bottom CTA */}
            <div className="mt-16 p-8 sm:p-10 bg-[rgba(255,255,255,0.02)] rounded-2xl border border-[rgba(255,255,255,0.06)] text-center relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-[#4F46E5] opacity-[0.05] rounded-full blur-[80px]" />
              </div>
              <h3 className="relative z-10 text-xl font-bold text-[#FAFAFA] mb-2">
                Ready to try Xia Chat?
              </h3>
              <p className="relative z-10 text-[#A1A1AA] text-sm mb-6 max-w-md mx-auto">
                Start connecting with your customers in real-time. Free forever
                for small teams.
              </p>
              <Link
                href="/#pricing"
                className="relative z-10 inline-flex items-center px-6 py-3 bg-[#4F46E5] text-white text-sm font-semibold rounded-full hover:bg-[#4338CA] transition-colors shadow-lg shadow-[rgba(79,70,229,0.3)]"
              >
                Get Started for Free
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
