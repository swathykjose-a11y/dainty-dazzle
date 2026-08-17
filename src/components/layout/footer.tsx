import Link from "next/link";

const footerNav = [
  {
    heading: "SHOP",
    links: [
      { href: "/collections/earrings", label: "EARRINGS" },
      { href: "/collections/necklaces", label: "NECKLACES" },
    ],
  },
  {
    heading: "INFO",
    links: [
      { href: "/policies/shipping", label: "SHIPPING & DELIVERY" },
      { href: "/policies/returns", label: "RETURNS & REFUNDS" },
      { href: "/policies/terms", label: "TERMS & CONDITIONS" },
      { href: "/policies/privacy", label: "PRIVACY POLICY" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-sage-canvas py-16 md:py-20 border-t border-charcoal">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <Link
                href="/"
                className="font-secondary text-4xl tracking-tight text-white font-normal"
              >
                Dainty Dazzle
              </Link>
              <p className="mt-4 text-xs font-primary text-sage-canvas/70 leading-relaxed max-w-sm">
                Handcrafted jewelry designed to celebrate everyday elegance.
                True beauty shines from within.
              </p>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/dainty_dazzle__"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 text-[11px] font-primary tracking-[0.14em] text-sage-canvas/70 hover:text-white transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
                @DAINTY_DAZZLE__
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-7 grid grid-cols-2 gap-8">
            {footerNav.map((group) => (
              <div key={group.heading}>
                <h3 className="text-[10px] font-primary font-medium uppercase tracking-[0.2em] text-sage-canvas/40 mb-4">
                  {group.heading}
                </h3>
                <ul className="flex flex-col gap-3">
                  {group.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-[11px] font-primary tracking-[0.14em] text-sage-canvas/80 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-6 border-t border-sage-canvas/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-primary tracking-wider text-sage-canvas/40">
          <p>© {new Date().getFullYear()} DAINTY DAZZLE JEWELRY. ALL RIGHTS RESERVED.</p>
          <p>
            DESIGNED & DEVELOPED BY{" "}
            <a
              href="https://kairosartifex.site"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sage-canvas/70 hover:text-white transition-colors underline underline-offset-4"
            >
              KAIROS ARTIFEX
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
