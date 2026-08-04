// TODO: replace with Shopify Storefront API
// This mock data file matches the Product type exactly.
// Swapping to real API responses should require zero component changes.

import type { Product } from "@/types/product";

export const mockProducts: Product[] = [
  {
    id: "gid://shopify/Product/1",
    handle: "whisper-chain-necklace",
    title: "Whisper Chain Necklace",
    descriptionHtml:
      "<p>An impossibly delicate cable chain in gold finish, designed to sit just below the collarbone. The kind of necklace you forget you're wearing — until someone notices.</p>",
    priceRange: {
      minVariantPrice: { amount: "699.00", currencyCode: "INR" },
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80&auto=format&fit=crop",
        altText: "Delicate gold chain necklace on bare skin",
      },
      {
        url: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80&auto=format&fit=crop",
        altText: "Gold chain necklace detail closeup",
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/1-1",
        title: "16 inch",
        availableForSale: true,
        price: { amount: "699.00", currencyCode: "INR" },
      },
      {
        id: "gid://shopify/ProductVariant/1-2",
        title: "18 inch",
        availableForSale: true,
        price: { amount: "799.00", currencyCode: "INR" },
      },
    ],
    availableForSale: true,
    tags: ["necklaces", "new"],
  },
  {
    id: "gid://shopify/Product/2",
    handle: "luna-stud-earrings",
    title: "Luna Stud Earrings",
    descriptionHtml:
      "<p>Tiny crescent moon studs in brushed silver finish. Subtle enough for every day, interesting enough to get compliments.</p>",
    priceRange: {
      minVariantPrice: { amount: "549.00", currencyCode: "INR" },
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80&auto=format&fit=crop",
        altText: "Silver crescent moon stud earrings",
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/2-1",
        title: "Default",
        availableForSale: true,
        price: { amount: "549.00", currencyCode: "INR" },
      },
    ],
    availableForSale: true,
    tags: ["earrings"],
  },
  {
    id: "gid://shopify/Product/3",
    handle: "dewdrop-pendant",
    title: "Dewdrop Pendant",
    descriptionHtml:
      "<p>A single pear-cut stone suspended on a fine chain. Appears to float just below the throat — effortless elegance.</p>",
    priceRange: {
      minVariantPrice: { amount: "799.00", currencyCode: "INR" },
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: "999.00", currencyCode: "INR" },
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80&auto=format&fit=crop",
        altText: "Crystal pendant necklace on bare neck",
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/3-1",
        title: "Default",
        availableForSale: true,
        price: { amount: "799.00", currencyCode: "INR" },
        compareAtPrice: { amount: "999.00", currencyCode: "INR" },
      },
    ],
    availableForSale: true,
    tags: ["necklaces", "sale"],
  },
  {
    id: "gid://shopify/Product/4",
    handle: "halo-huggie-earrings",
    title: "Halo Huggie Earrings",
    descriptionHtml:
      "<p>Small gold huggies that click snugly against the lobe. Set with tiny stones that sparkle when you turn your head.</p>",
    priceRange: {
      minVariantPrice: { amount: "849.00", currencyCode: "INR" },
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80&auto=format&fit=crop",
        altText: "Gold huggie hoop earrings with pavé stones",
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/4-1",
        title: "Default",
        availableForSale: true,
        price: { amount: "849.00", currencyCode: "INR" },
      },
    ],
    availableForSale: true,
    tags: ["earrings", "new"],
  },
  {
    id: "gid://shopify/Product/5",
    handle: "layered-pearl-necklace",
    title: "Layered Pearl Necklace",
    descriptionHtml:
      "<p>Two delicate chains layered together — one plain, one dotted with freshwater pearls. Gives you the layered look without the tangling.</p>",
    priceRange: {
      minVariantPrice: { amount: "949.00", currencyCode: "INR" },
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80&auto=format&fit=crop",
        altText: "Layered pearl necklace on neck",
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/5-1",
        title: "Default",
        availableForSale: true,
        price: { amount: "949.00", currencyCode: "INR" },
      },
    ],
    availableForSale: true,
    tags: ["necklaces", "new"],
  },
  {
    id: "gid://shopify/Product/6",
    handle: "teardrop-drop-earrings",
    title: "Teardrop Drop Earrings",
    descriptionHtml:
      "<p>Elegant teardrop silhouettes that catch light with every movement. The perfect transition from day to evening.</p>",
    priceRange: {
      minVariantPrice: { amount: "749.00", currencyCode: "INR" },
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&q=80&auto=format&fit=crop",
        altText: "Gold teardrop drop earrings",
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/6-1",
        title: "Default",
        availableForSale: true,
        price: { amount: "749.00", currencyCode: "INR" },
      },
    ],
    availableForSale: true,
    tags: ["earrings"],
  },
  {
    id: "gid://shopify/Product/7",
    handle: "celestial-choker",
    title: "Celestial Choker",
    descriptionHtml:
      "<p>A fine gold choker with tiny star charms that sit right at the base of the neck. Bohemian meets minimal.</p>",
    priceRange: {
      minVariantPrice: { amount: "899.00", currencyCode: "INR" },
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80&auto=format&fit=crop",
        altText: "Gold celestial choker necklace",
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/7-1",
        title: "Default",
        availableForSale: true,
        price: { amount: "899.00", currencyCode: "INR" },
      },
    ],
    availableForSale: true,
    tags: ["necklaces"],
  },
  {
    id: "gid://shopify/Product/8",
    handle: "flora-jhumka-earrings",
    title: "Flora Jhumka Earrings",
    descriptionHtml:
      "<p>Traditional jhumka earrings reimagined with a contemporary twist. Lightweight yet striking — heritage craftsmanship meets modern design.</p>",
    priceRange: {
      minVariantPrice: { amount: "999.00", currencyCode: "INR" },
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80&auto=format&fit=crop",
        altText: "Traditional jhumka earrings with contemporary design",
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/8-1",
        title: "Default",
        availableForSale: true,
        price: { amount: "999.00", currencyCode: "INR" },
      },
    ],
    availableForSale: true,
    tags: ["earrings", "new"],
  },
  {
    id: "gid://shopify/Product/9",
    handle: "minimalist-bar-necklace",
    title: "Minimalist Bar Necklace",
    descriptionHtml:
      "<p>A slender horizontal bar pendant on a fine chain. Clean lines, quiet confidence — the everyday necklace you'll never take off.</p>",
    priceRange: {
      minVariantPrice: { amount: "599.00", currencyCode: "INR" },
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80&auto=format&fit=crop",
        altText: "Minimalist gold bar necklace",
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/9-1",
        title: "Default",
        availableForSale: true,
        price: { amount: "599.00", currencyCode: "INR" },
      },
    ],
    availableForSale: true,
    tags: ["necklaces"],
  },
  {
    id: "gid://shopify/Product/10",
    handle: "crystal-cluster-studs",
    title: "Crystal Cluster Studs",
    descriptionHtml:
      "<p>A cluster of tiny crystals arranged like a constellation on your ear. Small but mighty — these catch every beam of light.</p>",
    priceRange: {
      minVariantPrice: { amount: "649.00", currencyCode: "INR" },
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80&auto=format&fit=crop",
        altText: "Crystal cluster stud earrings",
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/10-1",
        title: "Default",
        availableForSale: true,
        price: { amount: "649.00", currencyCode: "INR" },
      },
    ],
    availableForSale: true,
    tags: ["earrings", "sale"],
  },
];
