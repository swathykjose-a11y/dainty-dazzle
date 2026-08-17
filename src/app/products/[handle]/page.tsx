import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getProductByHandle, getProducts } from "@/lib/shopify";
import { ProductJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
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

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Extract a collection / category label from tags */
function getCollectionLabel(tags?: string[]): string {
  if (!tags || tags.length === 0) return "Dainty Dazzle";

  const nice: Record<string, string> = {
    necklaces: "Necklace Collection",
    earrings: "Earring Collection",
    new: "New Arrival",
    sale: "Limited Edition",
  };

  for (const tag of tags) {
    if (nice[tag.toLowerCase()]) return nice[tag.toLowerCase()];
  }

  return "Dainty Dazzle";
}

/** Strip HTML and split into sentences for the description body */
function getPlainDescription(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

// ─── Page Component ─────────────────────────────────────────────────────────

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) notFound();

  const image = product.images[0];
  const price = product.priceRange.minVariantPrice;
  const compareAt = product.compareAtPriceRange?.minVariantPrice;
  const isOnSale =
    compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount);
  const collectionLabel = getCollectionLabel(product.tags);
  const plainDesc = getPlainDescription(product.descriptionHtml);

  const formatPrice = (amount: string, currency: string) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(parseFloat(amount));

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

      <section className="min-h-[calc(100vh-80px)] bg-sage-canvas">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-80px)]">
          {/* ─── Left: Product Image ─────────────────────────────────── */}
          <div className="relative bg-[#E8E4DF]">
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

            {/* Sale badge */}
            {isOnSale && (
              <div className="absolute top-6 left-6">
                <span className="inline-block rounded-full bg-charcoal text-white px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] font-primary">
                  Sale
                </span>
              </div>
            )}
          </div>

          {/* ─── Right: Product Details ──────────────────────────────── */}
          <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-20 py-12 lg:py-16">
            {/* Collection label */}
            <p className="text-[10px] font-primary font-medium uppercase tracking-[0.25em] text-sage-muted mb-4">
              {collectionLabel}
            </p>

            {/* Product title */}
            <h1 className="font-secondary text-3xl sm:text-4xl lg:text-[42px] text-charcoal tracking-tight font-normal leading-[1.15]">
              {product.title}
            </h1>

            {/* Description */}
            <p className="mt-5 text-[13px] font-primary text-sage-muted leading-[1.7] max-w-md">
              {plainDesc}
            </p>

            {/* Divider */}
            <div className="w-full h-px bg-sage-border/60 my-7" />

            {/* Details / Notes section */}
            <div className="mb-7">
              <p className="text-[10px] font-primary font-medium uppercase tracking-[0.2em] text-sage-muted mb-2">
                Details
              </p>
              <p className="text-[13px] font-primary text-charcoal/80 leading-[1.6]">
                Handcrafted with care. Designed for everyday elegance.
              </p>
            </div>

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-secondary font-normal text-charcoal tracking-tight">
                  {formatPrice(price.amount, price.currencyCode)}
                </span>
                {isOnSale && compareAt && (
                  <span className="text-base font-primary text-sage-muted line-through">
                    {formatPrice(compareAt.amount, compareAt.currencyCode)}
                  </span>
                )}
              </div>
            </div>

            {/* Variant selector + Add to Cart */}
            <AddToCartButton product={product} />
          </div>
        </div>
      </section>
    </>
  );
}
