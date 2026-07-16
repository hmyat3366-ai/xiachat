import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Xia Chat — Modern Customer Messaging Platform",
    template: "%s | Xia Chat",
  },
  description:
    "Xia Chat is a modern, real-time customer messaging platform built for speed. Connect with your customers through a beautiful, minimal dashboard powered by WebSockets.",
  keywords: [
    "customer chat",
    "live chat",
    "real-time messaging",
    "customer support",
    "chat widget",
    "websocket chat",
    "SaaS",
    "Xia Chat",
  ],
  openGraph: {
    title: "Xia Chat — Modern Customer Messaging Platform",
    description:
      "Connect with your customers in real-time through a beautifully minimal dashboard.",
    type: "website",
    locale: "en_US",
    siteName: "Xia Chat",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xia Chat — Modern Customer Messaging Platform",
    description:
      "Connect with your customers in real-time through a beautifully minimal dashboard.",
  },
  appleWebApp: {
    capable: true,
    title: "Xia Chat",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Prevents input zoom on iOS Safari
  userScalable: false,
  viewportFit: "cover", // Essential for iPhone Notch and Dynamic Island support
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-[100dvh] flex flex-col font-sans pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">{children}</body>
    </html>
  );
}
