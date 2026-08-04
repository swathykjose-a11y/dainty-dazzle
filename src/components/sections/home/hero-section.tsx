/*
 * Dainty Dazzle Hero Section
 *
 * Full-viewport-height cinematic hero with brand name overlay,
 * subtitle, and "Shop Now" CTA — matching Simuero reference layout.
 */

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-charcoal text-white">
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
      <div className="relative z-10 text-center px-4 max-w-5xl my-auto flex flex-col items-center gap-6 animate-fade-in-up">
        <h1 className="font-secondary text-6xl sm:text-8xl md:text-[120px] lg:text-[160px] font-normal tracking-tight text-white leading-none drop-shadow-sm select-none">
          Dainty Dazzle
        </h1>

        <p className="text-xs sm:text-sm font-primary text-white/90 font-light tracking-wide leading-relaxed drop-shadow-sm max-w-lg">
          True beauty shines from within, and our jewelry merely reflects it.
        </p>

        <div>
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
