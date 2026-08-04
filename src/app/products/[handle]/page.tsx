import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getProductByHandle, getProducts } from "@/lib/shopify";
import { ProductJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { PriceDisplay } from "@/components/ui/price-display";
import { AddToCartButton } from "./add-to-cart-button";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// ─── Static params (pre-render all products at build time) ──────────────────

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ handle: p.handle }));
}

// ─── Dynamic Metadata ───────────────────────────────────────────────────────

type Props = {
  params: Promise<{ handle: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    return { title: "Product Not Found" };
  }

  const plainDescription = product.descriptionHtml.replace(/<[^>]*>/g, "");

  return {
    title: product.title,
    description: plainDescription,
    alternates: {
      canonical: `/products/${product.handle}`,
    },
    openGraph: {
      title: `${product.title} — Dainty Dazzle`,
      description: plainDescription,
      url: `${siteUrl}/products/${product.handle}`,
      type: "website",
      images: product.images.map((img) => ({
        url: img.url,
        alt: img.altText || product.title,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} — Dainty Dazzle`,
      description: plainDescription,
      images: product.images.map((img) => img.url),
    },
  };
}

// ─── Page Component ─────────────────────────────────────────────────────────

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) notFound();

  const image = product.images[0];
  const price = product.priceRange.minVariantPrice;
  const compareAt = product.compareAtPriceRange?.minVariantPrice;
  const isOnSale = compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount);

  return (
    <>
      {/* Structured data */}
      <ProductJsonLd product={product} siteUrl={siteUrl} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteUrl },
          { name: "Products", url: `${siteUrl}/products` },
          {
            name: product.title,
            url: `${siteUrl}/products/${product.handle}`,
          },
        ]}
      />

      <section className="py-12 md:py-20 bg-sage-canvas">
        <div className="w-full px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Product Image */}
            <div className="relative aspect-square w-full bg-card-white border border-sage-border/50 rounded-xs overflow-hidden">
              {image && (
                <Image
                  src={image.url}
                  alt={image.altText || product.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-center"
                />
              )}
              {isOnSale && (
                <div className="absolute top-4 left-4">
                  <span className="inline-block rounded-full bg-charcoal text-white px-2.5 py-0.5 text-xs font-medium uppercase tracking-widest font-primary">
                    Sale
                  </span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <h1 className="font-secondary text-3xl md:text-4xl lg:text-5xl text-charcoal tracking-tight font-normal">
                {product.title}
              </h1>

              <div className="mt-4">
                <PriceDisplay
                  amount={price.amount}
                  currencyCode={price.currencyCode}
                  compareAtAmount={compareAt?.amount}
                  className="text-lg text-charcoal"
                />
              </div>

              <div
                className="mt-6 text-sm font-primary text-sage-muted leading-relaxed prose prose-sm"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />

              {/* Variants */}
              {product.variants && product.variants.length > 1 && (
                <div className="mt-8">
                  <p className="text-[10px] font-primary font-medium uppercase tracking-[0.2em] text-sage-muted mb-3">
                    Options
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <span
                        key={v.id}
                        className={`inline-flex items-center rounded-full border px-4 py-1.5 text-[11px] font-medium tracking-[0.14em] transition-colors ${
                          v.availableForSale
                            ? "border-charcoal/30 text-charcoal hover:border-charcoal hover:bg-charcoal/5 cursor-pointer"
                            : "border-sage-border text-sage-muted line-through cursor-not-allowed"
                        }`}
                      >
                        {v.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Cart */}
              <div className="mt-8">
                <AddToCartButton product={product} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
