/*
 * Categories Section — "Bestsellers" grid
 *
 * Displays category cards (Earrings, Necklaces) with representative
 * product images and starting prices, linking to collection pages.
 */

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { PriceDisplay } from "@/components/ui/price-display";

interface CategoriesSectionProps {
  products: Product[];
}

const categories = [
  {
    handle: "earrings",
    title: "Earrings",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80&auto=format&fit=crop",
  },
  {
    handle: "necklaces",
    title: "Necklaces",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80&auto=format&fit=crop",
  },
];

export function CategoriesSection({ products }: CategoriesSectionProps) {
  // Get a representative product for each category for price display
  const getCategoryPrice = (tag: string) => {
    const product = products.find((p) => p.tags?.includes(tag));
    return product?.priceRange.minVariantPrice;
  };

  return (
    <section id="categories" className="py-16 md:py-24 lg:py-32 bg-sage-canvas scroll-mt-16">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10 md:mb-14">
          <div className="flex items-baseline gap-3">
            <h2 className="font-secondary text-3xl md:text-4xl lg:text-5xl text-charcoal tracking-tight font-normal">
              Bestsellers
            </h2>
            <span className="text-xs font-primary text-sage-muted tracking-wider">
              (02)
            </span>
          </div>

          <p className="hidden md:block text-sm font-primary text-sage-muted max-w-xs text-right leading-relaxed">
            Our most-loved pieces, handpicked and cherished by our customers across India.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 animate-fade-in-up">
          {categories.map((cat) => {
            const price = getCategoryPrice(cat.handle);
            return (
              <Link
                key={cat.handle}
                href={`/collections/${cat.handle}`}
                className="group relative block overflow-hidden rounded-xs bg-card-white border border-sage-border/50 transition-all duration-300 hover:border-charcoal/40"
              >
                {/* Image */}
                <div className="relative aspect-4/5 sm:aspect-3/4 w-full overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>

                {/* Info bar */}
                <div className="p-4 sm:p-5 flex items-center justify-between border-t border-sage-border/40">
                  <div>
                    <h3 className="text-sm font-primary font-medium uppercase tracking-[0.12em] text-charcoal">
                      {cat.title}
                    </h3>
                    {price && (
                      <p className="text-[11px] font-primary text-sage-muted mt-1">
                        Starting from{" "}
                        <PriceDisplay
                          amount={price.amount}
                          currencyCode={price.currencyCode}
                          className="text-[11px] text-sage-muted inline"
                        />
                      </p>
                    )}
                  </div>
                  <span className="text-sm text-charcoal/70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
