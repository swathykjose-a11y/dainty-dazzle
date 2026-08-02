// TODO: replace with Shopify Storefront API GraphQL calls
// This fetch layer currently reads from local mock data.
// When switching to real Shopify, replace the implementations below
// with GraphQL queries — the function signatures and return types stay the same.

import { mockProducts } from "@/lib/mock-data/products";
import { mockCollections } from "@/lib/mock-data/collections";
import { mockPolicies, type PolicyData } from "@/lib/mock-data/policies";
import type { Product } from "@/lib/validation/product";
import type { Collection } from "@/lib/validation/collection";

// ─── Products ────────────────────────────────────────────────────────────────

export async function getProducts(): Promise<Product[]> {
  return mockProducts;
}

export async function getProductByHandle(
  handle: string,
): Promise<Product | null> {
  return mockProducts.find((p) => p.handle === handle) ?? null;
}

export async function getProductRecommendations(
  productId: string,
): Promise<Product[]> {
  // Return up to 4 products that aren't the given one
  return mockProducts.filter((p) => p.id !== productId).slice(0, 4);
}

// ─── Collections ─────────────────────────────────────────────────────────────

export async function getCollections(): Promise<Collection[]> {
  return mockCollections;
}

export async function getCollectionByHandle(
  handle: string,
): Promise<Collection | null> {
  return mockCollections.find((c) => c.handle === handle) ?? null;
}

// ─── Policies ────────────────────────────────────────────────────────────────

export async function getPolicies(): Promise<PolicyData[]> {
  return mockPolicies;
}

export async function getPolicyBySlug(
  slug: string,
): Promise<PolicyData | null> {
  return mockPolicies.find((p) => p.slug === slug) ?? null;
}
