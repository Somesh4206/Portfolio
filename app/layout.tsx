import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Caveat } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/data";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const script = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Somesh M — AI Developer & Full Stack Engineer",
    template: "%s · Somesh M",
  },
  description:
    "Portfolio of Somesh M, a Computer Science student and developer building AI-powered, full-stack and intelligent software systems.",
  keywords: [
    "Somesh M",
    "Somesh M developer",
    "Somesh M AI developer",
    "Somesh M portfolio",
    "AI Developer",
    "Full Stack Engineer",
    "RAG systems",
    "Generative AI",
  ],
  authors: [{ name: "Somesh M", url: SITE.url }],
  creator: "Somesh M",
  alternates: { canonical: SITE.url },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: "Somesh M — Portfolio",
    title: "Somesh M — AI Developer & Full Stack Engineer",
    description:
      "Portfolio of Somesh M, a Computer Science student and developer building AI-powered, full-stack and intelligent software systems.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Somesh M — AI Developer & Full Stack Engineer",
    description:
      "Portfolio of Somesh M, a Computer Science student and developer building AI-powered, full-stack and intelligent software systems.",
  },
  robots: { index: true, follow: true },
  category: "portfolio",
};

export const viewport: Viewport = {
  themeColor: "#F3EDE2",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Somesh M",
      url: SITE.url,
      jobTitle: "AI Developer, Full Stack Engineer",
      sameAs: [SITE.github, SITE.linkedin, SITE.leetcode, SITE.hackerrank],
      knowsAbout: [
        "Artificial Intelligence",
        "Machine Learning",
        "Generative AI",
        "RAG systems",
        "Full-stack development",
        "Cybersecurity",
      ],
    },
    {
      "@type": "WebSite",
      name: "Somesh M — Portfolio",
      url: SITE.url,
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${script.variable} h-full`}
    >
      <body className="min-h-full bg-cream text-choco antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-choco focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-cream"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
