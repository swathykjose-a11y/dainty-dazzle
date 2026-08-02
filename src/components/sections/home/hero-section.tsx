/*
 * Lumiere Hero Section
 *
 * Full-width cinematic photographic hero with massive elegant serif headline "Lumiere"
 * and bottom caption text matching the reference UI.
 */

"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);

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
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[75vh] min-h-137.5 max-h-200 flex flex-col justify-center items-center overflow-hidden bg-charcoal text-white"
    >
      {/* Hero background photography */}
      <Image
        src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1920&q=85&auto=format&fit=crop"
        alt="Lumiere fine jewelry hero image"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center brightness-[0.88]"
      />

      {/* Soft gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/40 pointer-events-none" />

      {/* Massive Lumiere Hero Title */}
      <div className="relative z-10 text-center px-4 max-w-5xl my-auto">
        <h1
          ref={headlineRef}
          className="font-secondary text-7xl sm:text-9xl md:text-[140px] lg:text-[180px] font-normal tracking-tight text-white leading-none drop-shadow-sm select-none"
        >
          Lumiere
        </h1>
      </div>

      {/* Bottom Subtitle Caption */}
      <div className="relative z-10 text-center pb-8 px-6 max-w-xl">
        <p
          ref={captionRef}
          className="text-xs sm:text-sm font-primary text-white/90 font-light tracking-wide leading-relaxed drop-shadow-sm"
        >
          True beauty shines from within, and our jewelry merely reflects it!
        </p>
      </div>
    </section>
  );
}
