"use client";

import { useCart } from "@/components/providers/cart-provider";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product";

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();

  const defaultVariant = product.variants?.[0];
  if (!defaultVariant) return null;

  return (
    <Button
      variant="primary"
      size="lg"
      className="w-full sm:w-auto"
      onClick={() =>
        addItem(
          product,
          defaultVariant.id,
          defaultVariant.title,
          defaultVariant.price,
        )
      }
      disabled={!product.availableForSale}
    >
      {product.availableForSale ? "ADD TO CART ↗" : "SOLD OUT"}
    </Button>
  );
}
