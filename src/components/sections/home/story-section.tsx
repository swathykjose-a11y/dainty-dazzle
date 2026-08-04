/*
 * Brand Story Section — "We believe in our process"
 *
 * Split layout matching Simuero reference:
 * Large image on the left, brand story text + CTA on the right.
 */

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function StorySection() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-sage-canvas">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Feature Image */}
          <div className="relative aspect-4/5 sm:aspect-3/4 lg:aspect-4/5 w-full rounded-xs overflow-hidden bg-sage-border/30">
            <Image
              src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1200&q=85&auto=format&fit=crop"
              alt="Dainty Dazzle craftsmanship — handcrafted jewelry process"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
          </div>

          {/* Right: Brand Story Content */}
          <div className="flex flex-col justify-center py-4 lg:py-8 animate-fade-in-up">
            <span className="text-[10px] font-primary font-medium uppercase tracking-[0.2em] text-sage-muted mb-4 block">
              Our Story
            </span>

            <h2 className="font-secondary text-3xl md:text-4xl lg:text-5xl text-charcoal tracking-tight font-normal leading-[1.1]">
              We believe
              <br />
              in our process.
            </h2>

            <p className="mt-6 text-sm font-primary text-sage-muted leading-relaxed max-w-md">
              Every piece of Dainty Dazzle jewelry is crafted with intention.
              From selecting materials to the final polish, we pour care into every
              step. Our designs are rooted in simplicity and made to be worn
              every day — because true elegance is effortless.
            </p>

            <p className="mt-4 text-sm font-primary text-sage-muted leading-relaxed max-w-md">
              We started with a simple belief: that beautiful jewelry shouldn&apos;t
              cost a fortune. Each piece is designed in India and made to celebrate
              the quiet confidence of the women who wear them.
            </p>

            <div className="mt-8">
              <Link href="/collections/new-arrivals">
                <Button variant="outline" size="md">
                  EXPLORE COLLECTION ↗
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
