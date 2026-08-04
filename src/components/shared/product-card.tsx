import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { PriceDisplay } from "@/components/ui/price-display";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className = "" }: ProductCardProps) {
  const image = product.images[0];

  return (
    <Link
      href={`/products/${product.handle}`}
      className={`group flex flex-col bg-card-white border border-sage-border/50 rounded-xs overflow-hidden transition-all duration-300 hover:border-charcoal/40 ${className}`}
    >
      {/* Product Image Container */}
      <div className="relative aspect-square w-full bg-[#f6f8f5] overflow-hidden">
        {image && (
          <Image
            src={image.url}
            alt={image.altText || product.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        )}
      </div>

      {/* Product Information Bar (Reference Style) */}
      <div className="p-3 sm:p-4 flex items-center justify-between gap-2 border-t border-sage-border/40 bg-card-white">
        <div className="flex flex-col min-w-0">
          <h3 className="text-[11px] font-primary font-medium uppercase tracking-[0.12em] text-charcoal truncate group-hover:text-charcoal transition-colors">
            {product.title}
          </h3>
          <PriceDisplay
            amount={product.priceRange.minVariantPrice.amount}
            currencyCode={product.priceRange.minVariantPrice.currencyCode}
            compareAtAmount={product.compareAtPriceRange?.minVariantPrice.amount}
            className="text-[11px] text-sage-muted mt-0.5"
          />
        </div>

        {/* Small Arrow indicator ↗ */}
        <span className="text-xs text-charcoal/70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0">
          ↗
        </span>
      </div>
    </Link>
  );
}
