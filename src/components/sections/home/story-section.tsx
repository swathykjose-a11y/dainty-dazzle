"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function StorySection() {
  return (
    <section className="py-16 md:py-24 bg-sage-canvas border-t border-sage-border/40">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* Left Feature Image */}
          <div className="lg:col-span-6">
            <div className="relative aspect-4/5 sm:aspect-4/3 lg:aspect-4/3 w-full rounded-sm overflow-hidden bg-sage-border/30">
              <Image
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=85&auto=format&fit=crop"
                alt="Dainty Dazzle craftsmanship and lifestyle"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Right Brand Quote & CTA */}
          <div className="lg:col-span-6 flex flex-col justify-between items-start lg:items-end text-left lg:text-right py-4 lg:py-6">
            <p className="text-sm md:text-base font-primary text-charcoal/85 leading-relaxed max-w-lg mb-8">
              We believe true splendor comes from within. Our pieces are crafted for
              those who want to shine — not just on the outside, but in spirit. Every
              jewel is created with attention to detail to bring you an enduring
              sense of lightness, beauty, and harmony!
            </p>

            <Link href="/policies/shipping">
              <Button variant="outline" size="md">
                LEARN MORE ABOUT US ↗
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
