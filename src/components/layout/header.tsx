"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/providers/cart-provider";
import { ToastContainer } from "@/components/ui/toast";

const navLinks = [
  { href: "/collections/new-arrivals", label: "NEW COLLECTION" },
  { href: "/collections/necklaces", label: "CATALOG" },
  { href: "/collections/rings", label: "GIFT CARDS" },
  { href: "/policies/shipping", label: "ABOUT US" },
  { href: "/policies/shipping", label: "DELIVERY" },
  { href: "/policies/privacy", label: "CONTACTS" },
  { href: "/policies/terms", label: "FAQ" },
];

export function Header() {
  const { totalQuantity } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-sage-canvas/90 backdrop-blur-md border-b border-sage-border/60">
        <div className="w-full px-4 sm:px-8 lg:px-12">
          <div className="flex h-14 items-center justify-between">
            {/* Desktop navigation links */}
            <nav
              className="hidden lg:flex items-center gap-6 xl:gap-8"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="text-[11px] font-primary font-medium tracking-[0.14em] text-charcoal/80 hover:text-charcoal transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="lg:hidden p-2 -ml-2 text-charcoal hover:bg-sage-border/40 rounded-full transition-colors cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                {mobileMenuOpen ? (
                  <path
                    d="M4 4l12 12M16 4L4 16"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                ) : (
                  <path
                    d="M2 5h16M2 10h16M2 15h16"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                )}
              </svg>
            </button>

            {/* Mobile brand title */}
            <Link
              href="/"
              className="lg:hidden font-secondary text-lg tracking-tight text-charcoal font-medium"
            >
              Lumiere
            </Link>

            {/* Cart Pill Button (Right side) */}
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 rounded-full border border-charcoal/30 px-4 py-1.5 text-[11px] font-medium tracking-[0.14em] text-charcoal hover:border-charcoal hover:bg-charcoal/5 transition-all"
            >
              <span>CART</span>
              <span>({totalQuantity})</span>
            </Link>
          </div>
        </div>

        {/* Mobile nav drawer */}
        {mobileMenuOpen && (
          <nav
            className="lg:hidden border-t border-sage-border bg-sage-canvas"
            aria-label="Mobile navigation"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="block text-xs font-primary font-medium tracking-[0.14em] text-charcoal/80 hover:text-charcoal transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      <ToastContainer />
    </>
  );
}
