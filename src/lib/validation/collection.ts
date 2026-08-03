// Collection types for the Shopify data layer.
// When switching to real Shopify API, add Zod schemas back for runtime validation.

import type { Product } from "./product";

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image?: { url: string; altText: string | null } | null;
  products?: Product[];
}
