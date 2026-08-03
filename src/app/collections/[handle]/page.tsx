import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCollectionByHandle, getCollections } from "@/lib/shopify";
import {
  CollectionJsonLd,
  BreadcrumbJsonLd,
} from "@/components/seo/json-ld";
import { ProductCard } from "@/components/shared/product-card";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// ─── Static params ──────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const collections = await getCollections();
  return collections.map((c) => ({ handle: c.handle }));
}

// ─── Dynamic Metadata ───────────────────────────────────────────────────────

type Props = {
  params: Promise<{ handle: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollectionByHandle(handle);

  if (!collection) {
    return { title: "Collection Not Found" };
  }

  return {
    title: collection.title,
    description: collection.description,
    alternates: {
      canonical: `/collections/${collection.handle}`,
    },
    openGraph: {
      title: `${collection.title} — Dainty Dazzle`,
      description: collection.description,
      url: `${siteUrl}/collections/${collection.handle}`,
      type: "website",
      ...(collection.image && {
        images: [
          {
            url: collection.image.url,
            alt: collection.image.altText || collection.title,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${collection.title} — Dainty Dazzle`,
      description: collection.description,
      ...(collection.image && { images: [collection.image.url] }),
    },
  };
}

// ─── Page Component ─────────────────────────────────────────────────────────

export default async function CollectionPage({ params }: Props) {
  const { handle } = await params;
  const collection = await getCollectionByHandle(handle);

  if (!collection) notFound();

  return (
    <>
      {/* Structured data */}
      <CollectionJsonLd collection={collection} siteUrl={siteUrl} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteUrl },
          {
            name: collection.title,
            url: `${siteUrl}/collections/${collection.handle}`,
          },
        ]}
      />

      <section className="py-12 md:py-20 bg-sage-canvas">
        <div className="w-full px-4 sm:px-8 lg:px-12">
          {/* Collection Header */}
          <div className="mb-10 md:mb-14">
            <h1 className="font-secondary text-4xl md:text-5xl lg:text-6xl text-charcoal tracking-tight font-normal">
              {collection.title}
            </h1>
            <p className="mt-3 text-sm font-primary text-sage-muted leading-relaxed max-w-2xl">
              {collection.description}
            </p>
          </div>

          {/* Product Grid */}
          {collection.products && collection.products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {collection.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-sm font-primary text-sage-muted">
              No products in this collection yet.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
