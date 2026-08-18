/*
 * Brand Story Section - "We believe in our process"
 *
 * Split layout matching Simuero reference:
 * Large image on the left, brand story text + CTA on the right.
 */

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { StorySectionData } from "@/lib/shopify";

interface StorySectionProps {
  storyData?: StorySectionData | null;
}

export function StorySection({ storyData }: StorySectionProps) {
  const imageUrl =
    storyData?.imageUrl ||
    "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1200&q=85&auto=format&fit=crop";
  const eyebrow = storyData?.eyebrow || "Our Story";
  const headline = storyData?.headline || "We believe\nin our process.";
  const paragraph1 =
    storyData?.paragraph1 ||
    "Every piece of Dainty Dazzle jewelry is crafted with intention. From selecting materials to the final polish, we pour care into every step. Our designs are rooted in simplicity and made to be worn every day, because true elegance is effortless.";
  const paragraph2 =
    storyData?.paragraph2 ||
    "We started with a simple belief: that beautiful jewelry shouldn't cost a fortune. Each piece is designed in India and made to celebrate the quiet confidence of the women who wear them.";
  const ctaText = storyData?.ctaText || "EXPLORE CATEGORIES ↗";
  const ctaLink = storyData?.ctaLink || "/products";

  const headlineLines = headline.split("\n");

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-sage-canvas">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Feature Image */}
          <div className="relative aspect-4/5 sm:aspect-3/4 lg:aspect-4/5 w-full rounded-xs overflow-hidden bg-sage-border/30">
            <Image
              src={imageUrl}
              alt="Dainty Dazzle craftsmanship - handcrafted jewelry process"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
          </div>

          {/* Right: Brand Story Content */}
          <div className="flex flex-col justify-center py-4 lg:py-8 animate-fade-in-up">
            <span className="text-[10px] font-primary font-medium uppercase tracking-[0.2em] text-sage-muted mb-4 block">
              {eyebrow}
            </span>

            <h2 className="font-secondary text-3xl md:text-4xl lg:text-5xl text-charcoal tracking-tight font-normal leading-[1.1]">
              {headlineLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < headlineLines.length - 1 && <br />}
                </span>
              ))}
            </h2>

            <p className="mt-6 text-sm font-primary text-sage-muted leading-relaxed max-w-md whitespace-pre-line">
              {paragraph1}
            </p>

            {paragraph2 && (
              <p className="mt-4 text-sm font-primary text-sage-muted leading-relaxed max-w-md whitespace-pre-line">
                {paragraph2}
              </p>
            )}

            <div className="mt-8">
              <Link href={ctaLink}>
                <Button variant="outline" size="md">
                  {ctaText}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
