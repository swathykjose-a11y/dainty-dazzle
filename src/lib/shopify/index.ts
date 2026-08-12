import type { Product, ProductImage, ProductVariant } from "@/types/product";
import type { Collection } from "@/types/collection";

// ─── Env ─────────────────────────────────────────────────────────────────────

const SHOPIFY_STORE_DOMAIN =
  process.env.SHOPIFY_STORE_DOMAIN ||
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
  process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const SHOPIFY_GRAPHQL_URL = SHOPIFY_STORE_DOMAIN
  ? `https://${SHOPIFY_STORE_DOMAIN}/api/2024-04/graphql.json`
  : null;

// ─── Core Fetch Helper ──────────────────────────────────────────────────────

async function shopifyFetch<T>({
  query,
  variables,
  tags,
}: {
  query: string;
  variables?: Record<string, unknown>;
  tags?: string[];
}): Promise<T> {
  if (!SHOPIFY_GRAPHQL_URL || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    throw new Error(
      "Missing Shopify credentials. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN.",
    );
  }

  const res = await fetch(SHOPIFY_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600, tags },
  });

  const json = await res.json();

  if (json.errors) {
    console.error("Shopify GraphQL errors:", json.errors);
    throw new Error(json.errors[0]?.message || "Shopify API error");
  }

  return json.data;
}

// ─── GraphQL Fragments ──────────────────────────────────────────────────────

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    handle
    title
    descriptionHtml
    availableForSale
    tags
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 10) {
      edges {
        node {
          url
          altText
        }
      }
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

// ─── Reshaping Helpers ──────────────────────────────────────────────────────

interface ShopifyEdge<T> {
  node: T;
}

interface ShopifyImage {
  url: string;
  altText: string | null;
}

interface ShopifyVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: { amount: string; currencyCode: string };
  compareAtPrice: { amount: string; currencyCode: string } | null;
}

interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  descriptionHtml: string;
  availableForSale: boolean;
  tags: string[];
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
  compareAtPriceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
  images: { edges: ShopifyEdge<ShopifyImage>[] };
  variants: { edges: ShopifyEdge<ShopifyVariant>[] };
}

function reshapeProduct(raw: ShopifyProduct): Product {
  const images: ProductImage[] = raw.images.edges.map((e) => ({
    url: e.node.url,
    altText: e.node.altText,
  }));

  const variants: ProductVariant[] = raw.variants.edges.map((e) => ({
    id: e.node.id,
    title: e.node.title,
    availableForSale: e.node.availableForSale,
    price: e.node.price,
    compareAtPrice: e.node.compareAtPrice ?? undefined,
  }));

  return {
    id: raw.id,
    handle: raw.handle,
    title: raw.title,
    descriptionHtml: raw.descriptionHtml,
    availableForSale: raw.availableForSale,
    tags: raw.tags,
    priceRange: raw.priceRange,
    compareAtPriceRange: raw.compareAtPriceRange,
    images,
    variants,
  };
}

// ─── Products ────────────────────────────────────────────────────────────────

export async function getProducts(): Promise<Product[]> {
  const data = await shopifyFetch<{
    products: { edges: ShopifyEdge<ShopifyProduct>[] };
  }>({
    query: `
      query GetProducts {
        products(first: 50, sortKey: CREATED_AT, reverse: true) {
          edges {
            node {
              ...ProductFields
            }
          }
        }
      }
      ${PRODUCT_FRAGMENT}
    `,
    tags: ["products"],
  });

  return data.products.edges.map((e) => reshapeProduct(e.node));
}

export async function getProductByHandle(
  handle: string,
): Promise<Product | null> {
  const data = await shopifyFetch<{
    productByHandle: ShopifyProduct | null;
  }>({
    query: `
      query GetProductByHandle($handle: String!) {
        productByHandle(handle: $handle) {
          ...ProductFields
        }
      }
      ${PRODUCT_FRAGMENT}
    `,
    variables: { handle },
    tags: ["products"],
  });

  return data.productByHandle ? reshapeProduct(data.productByHandle) : null;
}

export async function getProductRecommendations(
  productId: string,
): Promise<Product[]> {
  const data = await shopifyFetch<{
    productRecommendations: ShopifyProduct[];
  }>({
    query: `
      query GetProductRecommendations($productId: ID!) {
        productRecommendations(productId: $productId) {
          ...ProductFields
        }
      }
      ${PRODUCT_FRAGMENT}
    `,
    variables: { productId },
    tags: ["products"],
  });

  return (data.productRecommendations || [])
    .slice(0, 4)
    .map(reshapeProduct);
}

// ─── Collections ─────────────────────────────────────────────────────────────

export async function getCollections(): Promise<Collection[]> {
  const data = await shopifyFetch<{
    collections: {
      edges: ShopifyEdge<{
        id: string;
        handle: string;
        title: string;
        description: string;
        image: { url: string; altText: string | null } | null;
      }>[];
    };
  }>({
    query: `
      query GetCollections {
        collections(first: 20) {
          edges {
            node {
              id
              handle
              title
              description
              image {
                url
                altText
              }
            }
          }
        }
      }
    `,
    tags: ["collections"],
  });

  return data.collections.edges.map((e) => ({
    id: e.node.id,
    handle: e.node.handle,
    title: e.node.title,
    description: e.node.description,
    image: e.node.image ?? undefined,
  }));
}

export async function getCollectionByHandle(
  handle: string,
): Promise<Collection | null> {
  const data = await shopifyFetch<{
    collectionByHandle: {
      id: string;
      handle: string;
      title: string;
      description: string;
      image: { url: string; altText: string | null } | null;
      products: { edges: ShopifyEdge<ShopifyProduct>[] };
    } | null;
  }>({
    query: `
      query GetCollectionByHandle($handle: String!) {
        collectionByHandle(handle: $handle) {
          id
          handle
          title
          description
          image {
            url
            altText
          }
          products(first: 50) {
            edges {
              node {
                ...ProductFields
              }
            }
          }
        }
      }
      ${PRODUCT_FRAGMENT}
    `,
    variables: { handle },
    tags: ["collections", "products"],
  });

  if (!data.collectionByHandle) return null;

  const raw = data.collectionByHandle;
  return {
    id: raw.id,
    handle: raw.handle,
    title: raw.title,
    description: raw.description,
    image: raw.image ?? undefined,
    products: raw.products.edges.map((e) => reshapeProduct(e.node)),
  };
}

// ─── Policies (placeholder — wired in next commit) ──────────────────────────

export interface PolicyData {
  slug: string;
  title: string;
  contentHtml: string;
}

export async function getPolicies(): Promise<PolicyData[]> {
  return [];
}

export async function getPolicyBySlug(
  slug: string,
): Promise<PolicyData | null> {
  return null;
}

// ─── Checkout & Cart ─────────────────────────────────────────────────────────

export interface CheckoutItem {
  variantId: string;
  quantity: number;
}

export async function createShopifyCheckout(
  lines: CheckoutItem[],
): Promise<{ checkoutUrl: string }> {
  if (!SHOPIFY_GRAPHQL_URL || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    return {
      checkoutUrl: `https://${SHOPIFY_STORE_DOMAIN || "dainty-dazzle.myshopify.com"}/checkout`,
    };
  }

  const res = await fetch(SHOPIFY_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query: `
        mutation cartCreate($input: CartInput!) {
          cartCreate(input: $input) {
            cart {
              checkoutUrl
            }
            userErrors {
              field
              message
            }
          }
        }
      `,
      variables: {
        input: {
          lines: lines.map((item) => ({
            merchandiseId: item.variantId,
            quantity: item.quantity,
          })),
        },
      },
    }),
  });

  const json = await res.json();

  if (json.data?.cartCreate?.cart?.checkoutUrl) {
    return { checkoutUrl: json.data.cartCreate.cart.checkoutUrl };
  }

  if (json.data?.cartCreate?.userErrors?.length) {
    console.error("Cart user errors:", json.data.cartCreate.userErrors);
  }

  // Fallback
  return {
    checkoutUrl: `https://${SHOPIFY_STORE_DOMAIN}/checkout`,
  };
}
