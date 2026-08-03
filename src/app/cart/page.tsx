"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/providers/cart-provider";
import { PriceDisplay } from "@/components/ui/price-display";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { items, totalQuantity, subtotal, updateQuantity, removeItem } =
    useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setIsCheckingOut(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            variantId: item.variantId,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert("Failed to initiate Shopify checkout. Please try again.");
        setIsCheckingOut(false);
      }
    } catch {
      alert("An error occurred during checkout. Please try again.");
      setIsCheckingOut(false);
    }
  };

  const freeShippingThreshold = 150;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(
    100,
    (subtotal / freeShippingThreshold) * 100,
  );

  return (
    <section className="py-12 md:py-20 bg-sage-canvas min-h-[75vh]">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-8 border-b border-sage-border/60 mb-8 md:mb-12">
          <div className="flex items-baseline gap-3">
            <h1 className="font-secondary text-3xl md:text-4xl text-charcoal tracking-tight font-normal">
              Shopping Bag
            </h1>
            <span className="text-xs font-primary text-sage-muted tracking-wider">
              ({totalQuantity.toString().padStart(2, "0")})
            </span>
          </div>

          <Link
            href="/collections/new-arrivals"
            className="text-[11px] font-primary font-medium tracking-[0.14em] text-charcoal/80 hover:text-charcoal transition-colors uppercase"
          >
            ← Continue Shopping
          </Link>
        </div>

        {items.length === 0 ? (
          /* Empty Cart View */
          <div className="py-16 md:py-24 text-center max-w-md mx-auto">
            <h2 className="font-secondary text-2xl md:text-3xl text-charcoal mb-4">
              Your bag is empty
            </h2>
            <p className="text-xs sm:text-sm font-primary text-sage-muted leading-relaxed mb-8">
              Discover our delicate, handcrafted collections designed to celebrate
              everyday elegance.
            </p>
            <Link href="/collections/new-arrivals">
              <Button variant="primary" size="lg">
                EXPLORE NEW ARRIVALS ↗
              </Button>
            </Link>
          </div>
        ) : (
          /* Cart Content Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
              {/* Free Shipping Progress Indicator */}
              <div className="bg-card-white border border-sage-border/50 p-4 rounded-xs">
                <p className="text-[11px] font-primary tracking-widest text-charcoal mb-2">
                  {amountToFreeShipping > 0 ? (
                    <>
                      Add{" "}
                      <span className="font-medium">
                        ${amountToFreeShipping.toFixed(2)}
                      </span>{" "}
                      more for <span className="font-medium">Complimentary Shipping</span>
                    </>
                  ) : (
                    <span className="text-charcoal font-medium">
                      You've unlocked Complimentary Shipping!
                    </span>
                  )}
                </p>
                <div className="w-full h-1 bg-sage-canvas rounded-full overflow-hidden">
                  <div
                    className="h-full bg-charcoal transition-all duration-500 rounded-full"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="divide-y border-y border-sage-border/50">
                {items.map((item) => {
                  const image = item.product.images[0];
                  return (
                    <div
                      key={item.variantId}
                      className="py-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between"
                    >
                      {/* Product Thumbnail & Details */}
                      <div className="flex gap-4 sm:gap-6 items-center">
                        <Link
                          href={`/products/${item.product.handle}`}
                          className="relative aspect-square w-20 sm:w-24 shrink-0 bg-[#f6f8f5] border border-sage-border/40 rounded-xs overflow-hidden"
                        >
                          {image && (
                            <Image
                              src={image.url}
                              alt={image.altText || item.product.title}
                              fill
                              sizes="96px"
                              className="object-cover object-center"
                            />
                          )}
                        </Link>

                        <div className="flex flex-col">
                          <Link
                            href={`/products/${item.product.handle}`}
                            className="text-xs font-primary font-medium uppercase tracking-[0.12em] text-charcoal hover:underline"
                          >
                            {item.product.title}
                          </Link>

                          {item.variantTitle &&
                            item.variantTitle !== "Default" && (
                              <span className="text-[11px] font-primary text-sage-muted mt-1">
                                Option: {item.variantTitle}
                              </span>
                            )}

                          <PriceDisplay
                            amount={item.price.amount}
                            currencyCode={item.price.currencyCode}
                            className="text-[11px] text-sage-muted mt-1"
                          />
                        </div>
                      </div>

                      {/* Quantity Controls & Line Item Total */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-sage-border/60 rounded-full px-2 py-0.5 bg-card-white">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.variantId, item.quantity - 1)
                            }
                            className="px-2 text-charcoal/70 hover:text-charcoal text-xs font-medium cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="px-2 text-xs font-primary font-medium text-charcoal">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.variantId, item.quantity + 1)
                            }
                            className="px-2 text-charcoal/70 hover:text-charcoal text-xs font-medium cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* Line Item Total */}
                        <div className="text-right">
                          <PriceDisplay
                            amount={(
                              parseFloat(item.price.amount) * item.quantity
                            ).toFixed(2)}
                            currencyCode={item.price.currencyCode}
                            className="text-xs font-medium text-charcoal"
                          />
                        </div>

                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() => removeItem(item.variantId)}
                          className="text-[10px] font-primary uppercase tracking-[0.14em] text-sage-muted hover:text-charcoal transition-colors cursor-pointer ml-2"
                          aria-label={`Remove ${item.product.title}`}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Order Summary Card */}
            <div className="lg:col-span-5 xl:col-span-4 sticky top-20">
              <div className="bg-card-white border border-sage-border/50 p-6 sm:p-8 rounded-xs">
                <h2 className="text-xs font-primary font-medium uppercase tracking-[0.15em] text-charcoal pb-4 border-b border-sage-border/40 mb-6">
                  Order Summary
                </h2>

                <div className="flex flex-col gap-4 text-xs font-primary mb-6">
                  <div className="flex justify-between text-charcoal/80">
                    <span>Subtotal</span>
                    <PriceDisplay
                      amount={subtotal.toFixed(2)}
                      currencyCode="USD"
                      className="font-medium text-charcoal"
                    />
                  </div>

                  <div className="flex justify-between text-sage-muted">
                    <span>Shipping & Taxes</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-sage-border/40 mb-6 flex justify-between items-baseline">
                  <span className="text-xs font-primary font-medium uppercase tracking-[0.14em] text-charcoal">
                    Estimated Total
                  </span>
                  <PriceDisplay
                    amount={subtotal.toFixed(2)}
                    currencyCode="USD"
                    className="text-base font-medium text-charcoal"
                  />
                </div>

                {/* Checkout CTA Button */}
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? "REDIRECTING..." : "PROCEED TO CHECKOUT ↗"}
                </Button>

                <p className="text-[10px] font-primary text-center text-sage-muted tracking-wider uppercase mt-4">
                  Secure checkout processed by Shopify
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
