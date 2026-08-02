import { z } from "zod/v4";

export const productImageSchema = z.object({
  url: z.url(),
  altText: z.string().nullable(),
});

export const productVariantSchema = z.object({
  id: z.string(),
  title: z.string(),
  availableForSale: z.boolean(),
  price: z.object({
    amount: z.string(),
    currencyCode: z.string(),
  }),
  compareAtPrice: z
    .object({
      amount: z.string(),
      currencyCode: z.string(),
    })
    .nullable()
    .optional(),
});

export const productSchema = z.object({
  id: z.string(),
  handle: z.string(),
  title: z.string(),
  descriptionHtml: z.string(),
  priceRange: z.object({
    minVariantPrice: z.object({
      amount: z.string(),
      currencyCode: z.string(),
    }),
  }),
  compareAtPriceRange: z
    .object({
      minVariantPrice: z.object({
        amount: z.string(),
        currencyCode: z.string(),
      }),
    })
    .optional(),
  images: z.array(productImageSchema),
  variants: z.array(productVariantSchema).optional(),
  availableForSale: z.boolean(),
  tags: z.array(z.string()).optional(),
});

export type Product = z.infer<typeof productSchema>;
export type ProductImage = z.infer<typeof productImageSchema>;
export type ProductVariant = z.infer<typeof productVariantSchema>;
