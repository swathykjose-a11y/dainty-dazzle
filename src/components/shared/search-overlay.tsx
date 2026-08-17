"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { PriceDisplay } from "@/components/ui/price-display";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce search query input (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Fetch real search results from API
  useEffect(() => {
    const trimmed = debouncedQuery.trim();
    if (!trimmed) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    setIsLoading(true);

    fetch(`/api/search?q=${encodeURIComponent(trimmed)}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setResults(data.products || []);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Failed to search products:", err);
          setResults([]);
          setIsLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [debouncedQuery]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setDebouncedQuery("");
      setResults([]);
      setIsLoading(false);
    }
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const popularSearches = ["Choker", "Jhumkas", "Temple", "Filigree", "Gold"];

  return (
    <div className="fixed inset-0 z-100 bg-sage-canvas/98 backdrop-blur-sm flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 sm:px-8 lg:px-12 h-16 border-b border-sage-border/60">
        <span className="text-[11px] font-primary font-medium tracking-[0.14em] text-sage-muted uppercase">
          Search
        </span>
        <button
          type="button"
          onClick={onClose}
          className="p-2 text-charcoal hover:bg-sage-border/40 rounded-full transition-colors cursor-pointer"
          aria-label="Close search"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 4l12 12M16 4L4 16"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </button>
      </div>

      {/* Search input */}
      <div className="px-4 sm:px-8 lg:px-12 py-8">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search necklaces, chokers, jhumkas..."
            className="w-full bg-transparent border-b-2 border-b-charcoal/20 focus:border-b-charcoal text-2xl sm:text-3xl md:text-4xl font-secondary text-charcoal caret-charcoal placeholder:text-sage-muted/50 outline-none py-4 pr-12 transition-colors"
          />
          {isLoading && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <div className="w-6 h-6 border-2 border-charcoal/20 border-t-charcoal rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Quick tags */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <span className="text-[10px] font-primary tracking-[0.12em] uppercase text-sage-muted mr-1">
            Popular:
          </span>
          {popularSearches.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => setQuery(term)}
              className="text-xs px-2.5 py-1 rounded-full border border-sage-border/80 bg-card-white/60 text-charcoal/80 hover:bg-card-white hover:text-charcoal hover:border-charcoal/30 transition-all cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 lg:px-12 pb-12">
        {debouncedQuery.trim().length > 0 && !isLoading && (
          <>
            <p className="text-[11px] font-primary font-medium tracking-[0.14em] text-sage-muted uppercase mb-6">
              {results.length} {results.length === 1 ? "result" : "results"}
            </p>

            {results.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
                {results.map((product) => {
                  const image = product.images?.[0];
                  return (
                    <Link
                      key={product.id}
                      href={`/products/${product.handle}`}
                      onClick={onClose}
                      className="group flex flex-col bg-card-white border border-sage-border/50 rounded-xs overflow-hidden transition-all duration-300 hover:border-charcoal/40"
                    >
                      <div className="relative aspect-square w-full bg-[#f6f8f5] overflow-hidden">
                        {image ? (
                          <Image
                            src={image.url}
                            alt={image.altText || product.title}
                            fill
                            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-sage-muted text-xs">
                            No image
                          </div>
                        )}
                      </div>
                      <div className="p-3 sm:p-4 flex items-center justify-between gap-2 border-t border-sage-border/40 bg-card-white">
                        <div className="flex flex-col min-w-0">
                          <h3 className="text-[11px] font-primary font-medium uppercase tracking-[0.12em] text-charcoal truncate">
                            {product.title}
                          </h3>
                          <PriceDisplay
                            amount={product.priceRange.minVariantPrice.amount}
                            currencyCode={product.priceRange.minVariantPrice.currencyCode}
                            className="text-[11px] text-sage-muted mt-0.5"
                          />
                        </div>
                        <span className="text-xs text-charcoal/70 shrink-0">↗</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="font-secondary text-xl text-charcoal/60">
                  No products found for &ldquo;{debouncedQuery}&rdquo;
                </p>
                <p className="text-sm font-primary text-sage-muted mt-2">
                  Try searching for &ldquo;choker&rdquo;, &ldquo;jhumkas&rdquo;, or &ldquo;filigree&rdquo;
                </p>
              </div>
            )}
          </>
        )}

        {isLoading && debouncedQuery.trim().length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex flex-col bg-card-white border border-sage-border/40 rounded-xs overflow-hidden"
              >
                <div className="aspect-square w-full bg-sage-border/30" />
                <div className="p-3 sm:p-4 space-y-2">
                  <div className="h-3 bg-sage-border/40 rounded w-3/4" />
                  <div className="h-2.5 bg-sage-border/30 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {debouncedQuery.trim().length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm font-primary text-sage-muted">
              Start typing to search our collection
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
