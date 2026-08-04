import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";

import { CartProvider } from "@/components/providers/cart-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  OrganizationJsonLd,
  WebSiteJsonLd,
} from "@/components/seo/json-ld";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});

const overusedGrotesk = localFont({
  src: "../assets/fonts/OverusedGrotesk-VF.woff2",
  variable: "--font-overused-grotesk",
  display: "swap",
  weight: "300 900",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: "Dainty Dazzle Jewelry — Earrings & Necklaces",
    template: "%s | Dainty Dazzle",
  },
  description:
    "True beauty shines from within. Shop handcrafted earrings and necklaces designed for everyday elegance. Free shipping over ₹999.",
  metadataBase: new URL(siteUrl),

  // ─── SEO Keywords ──────────────────────────────────────────────────────────
  keywords: [
    "dainty jewelry",
    "handcrafted jewelry India",
    "earrings online India",
    "necklaces online India",
    "gold earrings",
    "stud earrings",
    "chain necklace",
    "pendant necklace",
    "jhumka earrings",
    "affordable jewelry India",
    "Dainty Dazzle",
    "dainty dazzle jewelry",
  ],

  // ─── Robots ────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ─── Canonical ─────────────────────────────────────────────────────────────
  alternates: {
    canonical: "/",
  },

  // ─── Open Graph ────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    siteName: "Dainty Dazzle Jewelry",
    locale: "en_IN",
    title: "Dainty Dazzle Jewelry — Earrings & Necklaces",
    description:
      "True beauty shines from within. Shop handcrafted earrings and necklaces designed for everyday elegance.",
    url: siteUrl,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dainty Dazzle — Handcrafted Jewelry",
      },
    ],
  },

  // ─── Twitter Card ──────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Dainty Dazzle Jewelry — Earrings & Necklaces",
    description:
      "True beauty shines from within. Shop handcrafted earrings and necklaces designed for everyday elegance.",
    images: ["/og-image.png"],
  },

  // ─── Other ─────────────────────────────────────────────────────────────────
  applicationName: "Dainty Dazzle Jewelry",
  creator: "Kairos Artifex",
  publisher: "Dainty Dazzle Jewelry",
  category: "E-commerce",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geist.variable} ${playfair.variable} ${overusedGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-sage-canvas text-charcoal font-primary">
        {/* Site-wide structured data */}
        <OrganizationJsonLd siteUrl={siteUrl} />
        <WebSiteJsonLd siteUrl={siteUrl} />

        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
