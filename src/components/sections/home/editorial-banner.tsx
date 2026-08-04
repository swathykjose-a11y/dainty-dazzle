/*
 * Editorial Banner — Full-bleed section
 *
 * Full-width, full-viewport-height image with text overlay.
 * Reusable for multiple placements on the homepage.
 */

import Image from "next/image";

interface EditorialBannerProps {
  imageUrl: string;
  imageAlt: string;
  headline: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
}

export function EditorialBanner({
  imageUrl,
  imageAlt,
  headline,
  subtitle,
  align = "left",
}: EditorialBannerProps) {
  const alignmentClasses = {
    left: "items-start text-left pl-6 sm:pl-12 lg:pl-20",
    center: "items-center text-center px-6",
    right: "items-end text-right pr-6 sm:pr-12 lg:pr-20",
  };

  return (
    <section className="relative w-full h-screen min-h-150 flex overflow-hidden">
      {/* Background image */}
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        sizes="100vw"
        className="object-cover object-center brightness-[0.75]"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

      {/* Text content */}
      <div
        className={`relative z-10 flex flex-col justify-end pb-16 sm:pb-20 lg:pb-24 max-w-3xl animate-fade-in-up ${alignmentClasses[align]}`}
      >
        <h2 className="font-secondary text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight font-normal leading-[1.05]">
          {headline}
        </h2>
        {subtitle && (
          <p className="mt-4 text-sm sm:text-base font-primary text-white/80 font-light leading-relaxed max-w-md">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
