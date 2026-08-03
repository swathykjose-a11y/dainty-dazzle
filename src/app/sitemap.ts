import type { MetadataRoute } from "next";
import { getProducts, getCollections } from "@/lib/shopify";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // ─── Static pages ────────────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  // ─── Policy pages ────────────────────────────────────────────────────────────
  const policySlugs = ["shipping", "returns", "terms", "privacy"];
  const policyPages: MetadataRoute.Sitemap = policySlugs.map((slug) => ({
    url: `${siteUrl}/policies/${slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  // ─── Collection pages ────────────────────────────────────────────────────────
  const collections = await getCollections();
  const collectionPages: MetadataRoute.Sitemap = collections.map((c) => ({
    url: `${siteUrl}/collections/${c.handle}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // ─── Product pages ──────────────────────────────────────────────────────────
  const products = await getProducts();
  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${siteUrl}/products/${p.handle}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
    images: p.images.map((img) => img.url),
  }));

  return [
    ...staticPages,
    ...collectionPages,
    ...productPages,
    ...policyPages,
  ];
}
