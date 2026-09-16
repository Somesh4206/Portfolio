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
    "Somesh M is a Computer Science student, AI developer and full stack engineer building AI-powered intelligent software systems, RAG applications and full-stack products in India.",
  keywords: [
    "Somesh M",
    "Somesh M developer",
    "Somesh M AI developer",
    "Somesh M full stack engineer",
    "Somesh M portfolio",
    "Somesh M software engineer",
    "Somesh M India",
    "AI Developer",
    "Full Stack Engineer",
    "Computer Science student",
    "RAG systems",
    "Generative AI",
    "Intelligent software systems",
  ],
  authors: [{ name: "Somesh M", url: SITE.url }],
  creator: "Somesh M",
  publisher: "Somesh M",
  alternates: { canonical: SITE.url },
  applicationName: "Somesh M Portfolio",
  verification: {
    google: "googleaee54bf2d5a00ed1",
  },
  openGraph: {
    type: "website",
    url: SITE.url,
    locale: "en_US",
    siteName: "Somesh M — Portfolio",
    title: "Somesh M — AI Developer & Full Stack Engineer",
    description:
      "Somesh M is a Computer Science student, AI developer and full stack engineer building AI-powered intelligent software systems, RAG applications and full-stack products in India.",
    images: [
      {
        url: `${SITE.url}opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Somesh M — AI Developer & Full Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Somesh M — AI Developer & Full Stack Engineer",
    description:
      "Somesh M is a Computer Science student, AI developer and full stack engineer building AI-powered intelligent software systems, RAG applications and full-stack products in India.",
    images: [`${SITE.url}opengraph-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
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
      "@id": `${SITE.url}#person`,
      name: "Somesh M",
      url: SITE.url,
      image: `${SITE.url}opengraph-image.png`,
      jobTitle: "AI Developer, Full Stack Engineer",
      description:
        "Computer Science & Business Systems student, AI developer and full stack engineer building AI-powered intelligent software systems.",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
      },
      knowsAbout: [
        "Artificial Intelligence",
        "Machine Learning",
        "Generative AI",
        "RAG systems",
        "Full-stack development",
        "Cybersecurity",
        "React",
        "Python",
        "Flutter",
      ],
      sameAs: [SITE.github, SITE.linkedin, SITE.leetcode, SITE.hackerrank],
      alumniof: [
        {
          "@type": "Organization",
          name: "Brainery Spot Technologies",
        },
        {
          "@type": "Organization",
          name: "Nandha Info Tech",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}#website`,
      name: "Somesh M — Portfolio",
      url: SITE.url,
      inLanguage: "en",
      publisher: {
        "@id": `${SITE.url}#person`,
      },
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
