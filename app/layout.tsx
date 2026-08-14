import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";

import { profile } from "@/content/profile";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { Cursor } from "@/components/motion/Cursor";

// Variable display face — the whole type system leans on its optical sizing.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-face",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.short,
  keywords: [
    "Navyashree N",
    "research engineer",
    "machine learning engineer",
    "GPU computing",
    "CUDA",
    "medical imaging",
    "surgical navigation",
    "IIT Madras HTIC",
  ],
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: profile.siteUrl,
    siteName: profile.name,
    title: `${profile.name} — ${profile.role}`,
    description: profile.short,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: profile.short,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

/** JSON-LD Person schema — one source of truth, driven by content/profile.ts. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: profile.email,
  url: profile.siteUrl,
  description: profile.short,
  address: { "@type": "PostalAddress", addressCountry: "IN", addressLocality: "Chennai" },
  sameAs: [profile.links.github, profile.links.linkedin],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "AMC Engineering College, Visvesvaraya Technological University",
  },
  worksFor: {
    "@type": "Organization",
    name: "IITM HTIC MedTech Incubator, IIT Madras",
  },
  knowsAbout: [
    "GPU computing",
    "CUDA",
    "Machine learning",
    "Medical imaging",
    "Surgical navigation",
    "Point-set registration",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${mono.variable}`}>
      <body className="grain antialiased">
        <script
          type="application/ld+json"
          // Static object we control — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <SmoothScroll />
        <ScrollProgress />
        <Cursor />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
