// Product types for the Shopify data layer.
// When switching to real Shopify API, add Zod schemas back for runtime validation.

export interface ProductImage {
  url: string;
  altText: string | null;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: { amount: string; currencyCode: string };
  compareAtPrice?: { amount: string; currencyCode: string } | null;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  descriptionHtml: string;
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
  compareAtPriceRange?: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
  images: ProductImage[];
  variants?: ProductVariant[];
  availableForSale: boolean;
  tags?: string[];
}
