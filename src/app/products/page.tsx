import type { Metadata } from "next";
import Link from "next/link";
import { getProductsPaginated } from "@/lib/shopify";
import { ProductCard } from "@/components/shared/product-card";
import { Button } from "@/components/ui/button";

const PRODUCTS_PER_PAGE = 12;

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "All Products",
  description:
    "Browse our full collection of handcrafted earrings and necklaces. Designed for everyday elegance.",
  alternates: {
    canonical: "/products",
  },
};

type Props = {
  searchParams: Promise<{ after?: string }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const { after } = await searchParams;

  const { products, pageInfo } = await getProductsPaginated({
    first: PRODUCTS_PER_PAGE,
    after: after || null,
  });

  return (
    <section className="py-12 md:py-20 lg:py-28 bg-sage-canvas">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-10 md:mb-14 animate-fade-in-up">
          <span className="text-[10px] font-primary font-medium uppercase tracking-[0.25em] text-sage-muted mb-3 block">
            Shop
          </span>
          <h1 className="font-secondary text-3xl md:text-4xl lg:text-5xl text-charcoal tracking-tight font-normal">
            All Products
          </h1>
          <p className="mt-4 text-sm font-primary text-sage-muted leading-relaxed max-w-lg">
            Every piece in our collection, handcrafted with care, designed to
            be worn every single day.
          </p>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 animate-fade-in-up">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-sm font-primary text-sage-muted text-center py-20">
            No products available at the moment. Check back soon.
          </p>
        )}

        {/* Pagination Controls */}
        {(pageInfo.hasPreviousPage || pageInfo.hasNextPage) && (
          <div className="flex items-center justify-center gap-4 mt-12 md:mt-16">
            {pageInfo.hasPreviousPage ? (
              <Link href="/products">
                <Button variant="outline" size="md">
                  ← BACK TO FIRST
                </Button>
              </Link>
            ) : (
              <Button variant="outline" size="md" disabled>
                ← BACK TO FIRST
              </Button>
            )}

            {pageInfo.hasNextPage ? (
              <Link
                href={`/products?after=${encodeURIComponent(pageInfo.endCursor || "")}`}
              >
                <Button variant="outline" size="md">
                  NEXT PAGE →
                </Button>
              </Link>
            ) : (
              <Button variant="outline" size="md" disabled>
                NEXT PAGE →
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
