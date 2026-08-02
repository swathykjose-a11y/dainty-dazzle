import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { CartProvider } from "@/components/providers/cart-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
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

export const metadata: Metadata = {
  title: {
    default: "Lumiere | Dainty Dazzle — Fine Jewelry",
    template: "%s | Lumiere",
  },
  description:
    "True beauty shines from within. Discover delicate, handcrafted jewelry designed to reflect it.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${playfair.variable} ${overusedGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-sage-canvas text-charcoal font-primary">
        <SmoothScrollProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
