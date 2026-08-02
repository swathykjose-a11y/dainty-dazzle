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
  const itemsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion || !itemsRef.current) return;

      const items = itemsRef.current.querySelectorAll("[data-product-card]");

      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-sage-canvas">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        {/* Bestsellers (01) Header row */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <div className="flex items-baseline gap-2">
            <h2 className="font-secondary text-3xl md:text-4xl text-charcoal tracking-tight font-normal">
              Bestsellers
            </h2>
            <span className="text-xs font-primary text-sage-muted tracking-wider">
              (01)
            </span>
          </div>

          <Link href="/collections/new-arrivals">
            <Button variant="outline" size="md">
              VIEW ALL ↗
            </Button>
          </Link>
        </div>

        {/* 4 Product Cards Grid */}
        <div
          ref={itemsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5"
        >
          {products.slice(0, 4).map((product) => (
            <div key={product.id} data-product-card>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Bottom Progress / Slider Bar */}
        <div className="mt-10 md:mt-12 w-full h-0.5 bg-sage-border/60 relative rounded-full overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-1/4 bg-charcoal rounded-full" />
        </div>
      </div>
    </section>
  );
}
