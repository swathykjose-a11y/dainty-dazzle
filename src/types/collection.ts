import type { Product } from "./product";

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image?: { url: string; altText: string | null } | null;
  products?: Product[];
}
