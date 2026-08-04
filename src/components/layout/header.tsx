"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/providers/cart-provider";
import { ToastContainer } from "@/components/ui/toast";
import { SearchOverlay } from "@/components/shared/search-overlay";

const navLinks = [
  { href: "/collections/new-arrivals", label: "SHOP ALL" },
  { href: "/collections/earrings", label: "EARRINGS" },
  { href: "/collections/necklaces", label: "NECKLACES" },
];

export function Header() {
  const { totalQuantity } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-sage-canvas/90 backdrop-blur-md border-b border-sage-border/60">
        <div className="w-full px-4 sm:px-8 lg:px-12">
          <div className="flex h-14 lg:h-16 items-center justify-between">
            {/* Left: Desktop navigation links */}
            <nav
              className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1"
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

            {/* Center: Brand Name */}
            <Link
              href="/"
              className="font-secondary text-xl lg:text-2xl tracking-tight text-charcoal font-medium shrink-0"
            >
              Dainty Dazzle
            </Link>

            {/* Right: Search + Cart */}
            <div className="flex items-center gap-3 lg:gap-4 flex-1 justify-end">
              {/* Search Button */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-2 text-charcoal/70 hover:text-charcoal transition-colors cursor-pointer"
                aria-label="Search products"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>

              {/* Cart Pill Button */}
              <Link
                href="/cart"
                className="inline-flex items-center gap-2 rounded-full border border-charcoal/30 px-4 py-1.5 text-[11px] font-medium tracking-[0.14em] text-charcoal hover:border-charcoal hover:bg-charcoal/5 transition-all"
              >
                <span>CART</span>
                <span>({totalQuantity})</span>
              </Link>
            </div>
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

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      <ToastContainer />
    </>
  );
}
