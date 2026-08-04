/*
 * Featured Products Section — "Creating, Crafting & Wearing" layout
 *
 * Matches Simuero reference: large serif headline on the left,
 * 2×2 product card grid on the right.
 */

"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Product } from "@/lib/validation/product";
import { ProductCard } from "@/components/shared/product-card";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

interface FeaturedProductsSectionProps {
  products: Product[];
}

export function FeaturedCollectionsSection({
  products,
}: FeaturedProductsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) return;

      // Animate headline
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          },
        );
      }

      // Animate product cards
      if (itemsRef.current) {
        const items = itemsRef.current.querySelectorAll("[data-product-card]");
        gsap.fromTo(
          items,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: itemsRef.current,
              start: "top 80%",
              once: true,
            },
          },
        );
      }
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="py-16 md:py-24 lg:py-32 bg-sage-canvas">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column: Headline & Description */}
          <div
            ref={headlineRef}
            className="lg:col-span-4 flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-primary font-medium uppercase tracking-[0.2em] text-sage-muted mb-4 block">
                Our Collection
              </span>
              <h2 className="font-secondary text-4xl md:text-5xl lg:text-6xl text-charcoal tracking-tight font-normal leading-[1.1]">
                Creating,
                <br />
                Crafting
                <br />
                &amp; Wearing.
              </h2>
              <p className="mt-6 text-sm font-primary text-sage-muted leading-relaxed max-w-sm">
                Each piece is designed with care and crafted to celebrate
                everyday elegance. Discover jewelry that feels like it was made just for you.
              </p>
            </div>

            <div className="mt-8">
              <Link href="/collections/new-arrivals">
                <Button variant="outline" size="md">
                  VIEW ALL ↗
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: 2×2 Product Grid */}
          <div className="lg:col-span-8">
            <div
              ref={itemsRef}
              className="grid grid-cols-2 gap-3 sm:gap-5"
            >
              {products.slice(0, 4).map((product) => (
                <div key={product.id} data-product-card>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
