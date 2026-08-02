// TODO: replace with Shopify Storefront API
// This mock data file matches the Zod productSchema exactly.
// Swapping to real API responses should require zero component changes.

import type { Product } from "@/lib/validation/product";

export const mockProducts: Product[] = [
  {
    id: "gid://shopify/Product/1",
    handle: "whisper-chain-necklace",
    title: "Whisper Chain Necklace",
    descriptionHtml:
      "<p>An impossibly delicate cable chain in 14k gold, designed to sit just below the collarbone. The kind of necklace you forget you're wearing — until someone notices.</p>",
    priceRange: {
      minVariantPrice: { amount: "128.00", currencyCode: "USD" },
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
        price: { amount: "128.00", currencyCode: "USD" },
      },
      {
        id: "gid://shopify/ProductVariant/1-2",
        title: "18 inch",
        availableForSale: true,
        price: { amount: "138.00", currencyCode: "USD" },
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
      "<p>Tiny crescent moon studs in brushed sterling silver. Subtle enough for every day, interesting enough to get compliments.</p>",
    priceRange: {
      minVariantPrice: { amount: "64.00", currencyCode: "USD" },
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
        price: { amount: "64.00", currencyCode: "USD" },
      },
    ],
    availableForSale: true,
    tags: ["earrings"],
  },
  {
    id: "gid://shopify/Product/3",
    handle: "eternity-thin-ring",
    title: "Eternity Thin Ring",
    descriptionHtml:
      "<p>A thread-thin band in 14k rose gold, set with micro pavé diamonds that catch light from every angle. Stackable, of course.</p>",
    priceRange: {
      minVariantPrice: { amount: "245.00", currencyCode: "USD" },
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80&auto=format&fit=crop",
        altText: "Thin rose gold ring with diamonds",
      },
      {
        url: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&q=80&auto=format&fit=crop",
        altText: "Stacked thin gold rings on finger",
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/3-1",
        title: "Size 5",
        availableForSale: true,
        price: { amount: "245.00", currencyCode: "USD" },
      },
      {
        id: "gid://shopify/ProductVariant/3-2",
        title: "Size 6",
        availableForSale: true,
        price: { amount: "245.00", currencyCode: "USD" },
      },
      {
        id: "gid://shopify/ProductVariant/3-3",
        title: "Size 7",
        availableForSale: true,
        price: { amount: "245.00", currencyCode: "USD" },
      },
    ],
    availableForSale: true,
    tags: ["rings", "new"],
  },
  {
    id: "gid://shopify/Product/4",
    handle: "silk-bar-bracelet",
    title: "Silk Bar Bracelet",
    descriptionHtml:
      "<p>A curved gold bar on a silk cord. Adjustable, weightless, and the perfect quiet luxury accent for any wrist.</p>",
    priceRange: {
      minVariantPrice: { amount: "86.00", currencyCode: "USD" },
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80&auto=format&fit=crop",
        altText: "Gold bar bracelet on wrist",
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/4-1",
        title: "Default",
        availableForSale: true,
        price: { amount: "86.00", currencyCode: "USD" },
      },
    ],
    availableForSale: true,
    tags: ["bracelets"],
  },
  {
    id: "gid://shopify/Product/5",
    handle: "dewdrop-pendant",
    title: "Dewdrop Pendant",
    descriptionHtml:
      "<p>A single pear-cut cubic zirconia suspended on an invisible nylon thread. Appears to float just below the throat.</p>",
    priceRange: {
      minVariantPrice: { amount: "92.00", currencyCode: "USD" },
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: "115.00", currencyCode: "USD" },
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1515562141589-67f0d569b6cf?w=800&q=80&auto=format&fit=crop",
        altText: "Crystal pendant necklace on bare neck",
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/5-1",
        title: "Default",
        availableForSale: true,
        price: { amount: "92.00", currencyCode: "USD" },
        compareAtPrice: { amount: "115.00", currencyCode: "USD" },
      },
    ],
    availableForSale: true,
    tags: ["necklaces", "sale"],
  },
  {
    id: "gid://shopify/Product/6",
    handle: "halo-huggie-earrings",
    title: "Halo Huggie Earrings",
    descriptionHtml:
      "<p>Small gold huggies that click snugly against the lobe. Pavé-set with tiny stones that sparkle when you turn your head.</p>",
    priceRange: {
      minVariantPrice: { amount: "156.00", currencyCode: "USD" },
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80&auto=format&fit=crop",
        altText: "Gold huggie hoop earrings with pavé stones",
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/6-1",
        title: "Default",
        availableForSale: true,
        price: { amount: "156.00", currencyCode: "USD" },
      },
    ],
    availableForSale: true,
    tags: ["earrings", "new"],
  },
  {
    id: "gid://shopify/Product/7",
    handle: "signet-pinky-ring",
    title: "Signet Pinky Ring",
    descriptionHtml:
      "<p>A miniature oval signet in polished gold, sized for the pinky. Engravable on request — your initial, a date, a tiny symbol.</p>",
    priceRange: {
      minVariantPrice: { amount: "178.00", currencyCode: "USD" },
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80&auto=format&fit=crop",
        altText: "Gold signet ring on pinky finger",
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/7-1",
        title: "Size 4",
        availableForSale: true,
        price: { amount: "178.00", currencyCode: "USD" },
      },
      {
        id: "gid://shopify/ProductVariant/7-2",
        title: "Size 5",
        availableForSale: false,
        price: { amount: "178.00", currencyCode: "USD" },
      },
    ],
    availableForSale: true,
    tags: ["rings"],
  },
  {
    id: "gid://shopify/Product/8",
    handle: "woven-chain-bracelet",
    title: "Woven Chain Bracelet",
    descriptionHtml:
      "<p>Interlocking flat links in 14k gold that drape like fabric around the wrist. Lobster clasp with 1-inch extender.</p>",
    priceRange: {
      minVariantPrice: { amount: "210.00", currencyCode: "USD" },
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80&auto=format&fit=crop",
        altText: "Gold woven chain bracelet on wrist",
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/8-1",
        title: "Default",
        availableForSale: true,
        price: { amount: "210.00", currencyCode: "USD" },
      },
    ],
    availableForSale: true,
    tags: ["bracelets"],
  },
];
