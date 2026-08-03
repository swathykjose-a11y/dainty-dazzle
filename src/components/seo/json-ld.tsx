// ─── JSON-LD Structured Data Components ────────────────────────────────────
// Server-only components that inject <script type="application/ld+json"> into the page.
// These provide Schema.org markup for SEO (rich results) and AEO (answer engines).

import type { Product } from "@/lib/validation/product";
import type { Collection } from "@/lib/validation/collection";

// ─── Helper ──────────────────────────────────────────────────────────────────

function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ─── Organization ────────────────────────────────────────────────────────────

export function OrganizationJsonLd({ siteUrl }: { siteUrl: string }) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Dainty Dazzle",
        alternateName: "Lumiere",
        url: siteUrl,
        // TODO: Replace with actual logo URL once added to /public
        logo: `${siteUrl}/logo.png`,
        description:
          "True beauty shines from within. Discover delicate, handcrafted jewelry designed to reflect it.",
        contactPoint: {
          "@type": "ContactPoint",
          email: "hello@daintydazzle.com",
          contactType: "customer service",
        },
        // TODO: Add social profile URLs here once available
        sameAs: [],
      }}
    />
  );
}

// ─── WebSite (with SearchAction for sitelinks search box) ────────────────────

export function WebSiteJsonLd({ siteUrl }: { siteUrl: string }) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Dainty Dazzle",
        alternateName: "Lumiere",
        url: siteUrl,
      }}
    />
  );
}

// ─── Product ─────────────────────────────────────────────────────────────────

export function ProductJsonLd({
  product,
  siteUrl,
}: {
  product: Product;
  siteUrl: string;
}) {
  const price = product.priceRange.minVariantPrice;

  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.title,
        description: product.descriptionHtml.replace(/<[^>]*>/g, ""),
        url: `${siteUrl}/products/${product.handle}`,
        image: product.images.map((img) => img.url),
        brand: {
          "@type": "Brand",
          name: "Dainty Dazzle",
        },
        offers: {
          "@type": "Offer",
          url: `${siteUrl}/products/${product.handle}`,
          priceCurrency: price.currencyCode,
          price: price.amount,
          availability: product.availableForSale
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          seller: {
            "@type": "Organization",
            name: "Dainty Dazzle",
          },
        },
      }}
    />
  );
}

// ─── Collection ──────────────────────────────────────────────────────────────

export function CollectionJsonLd({
  collection,
  siteUrl,
}: {
  collection: Collection;
  siteUrl: string;
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: collection.title,
        description: collection.description,
        url: `${siteUrl}/collections/${collection.handle}`,
        ...(collection.image && { image: collection.image.url }),
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: collection.products?.length ?? 0,
          itemListElement:
            collection.products?.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${siteUrl}/products/${p.handle}`,
              name: p.title,
            })) ?? [],
        },
      }}
    />
  );
}

// ─── Breadcrumb ──────────────────────────────────────────────────────────────

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}
