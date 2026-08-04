/*
 * Dainty Dazzle Hero Section
 *
 * Full-viewport-height cinematic hero with brand name overlay,
 * subtitle, and "Shop Now" CTA — matching Simuero reference layout.
 */

"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, scale: 0.96, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2 },
      );

      tl.fromTo(
        captionRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6",
      );

      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4",
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-charcoal text-white"
    >
      {/* Hero background photography */}
      <Image
        src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1920&q=85&auto=format&fit=crop"
        alt="Dainty Dazzle fine jewelry hero image"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center brightness-[0.82]"
      />

      {/* Soft gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/35 via-transparent to-black/50 pointer-events-none" />

      {/* Massive Brand Hero Title */}
      <div className="relative z-10 text-center px-4 max-w-5xl my-auto flex flex-col items-center gap-6">
        <h1
          ref={headlineRef}
          className="font-secondary text-6xl sm:text-8xl md:text-[120px] lg:text-[160px] font-normal tracking-tight text-white leading-none drop-shadow-sm select-none"
        >
          Dainty Dazzle
        </h1>

        <p
          ref={captionRef}
          className="text-xs sm:text-sm font-primary text-white/90 font-light tracking-wide leading-relaxed drop-shadow-sm max-w-lg"
        >
          True beauty shines from within, and our jewelry merely reflects it.
        </p>

        <div ref={ctaRef}>
          <Link href="/collections/new-arrivals">
            <Button
              variant="outline"
              size="lg"
              className="border-white/60 text-white hover:bg-white/10 hover:border-white mt-2"
            >
              SHOP NOW ↗
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
