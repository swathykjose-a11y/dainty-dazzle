"use client";

import { useState } from "react";
import { useCart } from "@/components/providers/cart-provider";
import type { Product, ProductVariant } from "@/types/product";

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const variants = product.variants || [];
  const [selectedVariant, setSelectedVariant] = useState<
    ProductVariant | undefined
  >(variants[0]);
  const [quantity, setQuantity] = useState(1);

  if (!selectedVariant) return null;

  const isAvailable =
    selectedVariant.availableForSale && product.availableForSale;
  const stockCount =
    selectedVariant.quantityAvailable ?? product.totalInventory;
  const maxQty =
    typeof stockCount === "number" && stockCount > 0 ? stockCount : undefined;

  const handleAddToCart = () => {
    if (!isAvailable) return;
    addItem(
      product,
      selectedVariant.id,
      selectedVariant.title,
      selectedVariant.price,
      quantity,
    );
  };

  const handleVariantChange = (v: ProductVariant) => {
    setSelectedVariant(v);
    setQuantity(1);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Variant Selector (size/option pills) */}
      {variants.length > 1 && (
        <div>
          <label className="text-[10px] font-primary font-medium uppercase tracking-[0.2em] text-sage-muted mb-3 block">
            Select Option
          </label>
          <div className="flex flex-wrap gap-2">
            {variants.map((v) => {
              const isSelected = v.id === selectedVariant.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() =>
                    v.availableForSale && handleVariantChange(v)
                  }
                  disabled={!v.availableForSale}
                  className={`
                    relative inline-flex items-center justify-center
                    min-w-[72px] px-5 py-2.5
                    text-[11px] font-primary font-medium tracking-[0.12em]
                    transition-all duration-200 ease-out cursor-pointer
                    rounded-sm border
                    ${
                      isSelected
                        ? "bg-charcoal text-white border-charcoal shadow-sm"
                        : v.availableForSale
                          ? "border-sage-border text-charcoal hover:border-charcoal/60 bg-card-white"
                          : "border-sage-border/50 text-sage-muted/50 line-through cursor-not-allowed bg-sage-canvas"
                    }
                  `}
                >
                  {v.title}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Add to Cart row: [Add to Cart button] [Quantity controls] */}
      <div className="flex items-stretch gap-3">
        {/* Add to Cart CTA — dark filled, takes majority of width */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!isAvailable}
          className={`
            flex-1 h-[52px]
            inline-flex items-center justify-center gap-2
            text-[11px] font-primary font-medium uppercase tracking-[0.18em]
            transition-all duration-200 ease-out
            rounded-sm cursor-pointer
            disabled:opacity-40 disabled:pointer-events-none
            ${
              isAvailable
                ? "bg-charcoal text-sage-canvas hover:bg-charcoal/90 active:scale-[0.98]"
                : "bg-sage-border text-sage-muted"
            }
          `}
        >
          {isAvailable ? "Add to Cart" : "Sold Out"}
        </button>

        {/* Quantity stepper — compact, bordered */}
        <div className="flex items-center border border-sage-border rounded-sm bg-card-white h-[52px] shrink-0">
          <button
            type="button"
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            disabled={quantity <= 1 || !isAvailable}
            className="w-11 h-full flex items-center justify-center text-charcoal/60 hover:text-charcoal hover:bg-sage-canvas/60 transition-colors text-sm font-light disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-9 text-center font-primary text-xs font-medium text-charcoal select-none tracking-wider">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() =>
              setQuantity((prev) =>
                maxQty ? Math.min(maxQty, prev + 1) : prev + 1,
              )
            }
            disabled={
              !isAvailable ||
              (typeof maxQty === "number" && quantity >= maxQty)
            }
            className="w-11 h-full flex items-center justify-center text-charcoal/60 hover:text-charcoal hover:bg-sage-canvas/60 transition-colors text-sm font-light disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Subtle stock indicator */}
      {isAvailable && typeof stockCount === "number" && stockCount <= 5 && (
        <p className="text-[11px] font-primary text-sage-muted">
          Only{" "}
          <span className="font-medium text-charcoal/80">{stockCount}</span>{" "}
          left in stock
        </p>
      )}
    </div>
  );
}
