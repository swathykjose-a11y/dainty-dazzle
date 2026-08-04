// TODO: replace with Shopify Storefront API
// Mock collections matching the Collection type.

import type { Collection } from "@/lib/validation/collection";
import { mockProducts } from "./products";

export const mockCollections: Collection[] = [
  {
    id: "gid://shopify/Collection/1",
    handle: "earrings",
    title: "Earrings",
    description:
      "Studs, huggies, jhumkas, and drops — small enough to wear every day, detailed enough to notice.",
    image: {
      url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&q=80&auto=format&fit=crop",
      altText: "Earring collection display",
    },
    products: mockProducts.filter((p) => p.tags?.includes("earrings")),
  },
  {
    id: "gid://shopify/Collection/2",
    handle: "necklaces",
    title: "Necklaces",
    description:
      "Chains, pendants, and chokers designed to sit beautifully on bare skin. From everyday delicates to statement pieces.",
    image: {
      url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=80&auto=format&fit=crop",
      altText: "Gold necklace collection",
    },
    products: mockProducts.filter((p) => p.tags?.includes("necklaces")),
  },
  {
    id: "gid://shopify/Collection/3",
    handle: "new-arrivals",
    title: "New Arrivals",
    description:
      "The latest additions to our collection — just landed.",
    image: {
      url: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1200&q=80&auto=format&fit=crop",
      altText: "New jewelry arrivals",
    },
    products: mockProducts.filter((p) => p.tags?.includes("new")),
  },
];
