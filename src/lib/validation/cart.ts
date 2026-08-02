import { z } from "zod/v4";

export const cartLineSchema = z.object({
  id: z.string(),
  quantity: z.number().int().min(1),
  merchandise: z.object({
    id: z.string(),
    title: z.string(),
    product: z.object({
      handle: z.string(),
      title: z.string(),
      images: z.array(
        z.object({
          url: z.url(),
          altText: z.string().nullable(),
        }),
      ),
    }),
    price: z.object({
      amount: z.string(),
      currencyCode: z.string(),
    }),
  }),
});

export const cartSchema = z.object({
  id: z.string(),
  checkoutUrl: z.string(),
  lines: z.array(cartLineSchema),
  totalQuantity: z.number().int(),
  cost: z.object({
    subtotalAmount: z.object({
      amount: z.string(),
      currencyCode: z.string(),
    }),
    totalAmount: z.object({
      amount: z.string(),
      currencyCode: z.string(),
    }),
  }),
});

export type Cart = z.infer<typeof cartSchema>;
export type CartLine = z.infer<typeof cartLineSchema>;
