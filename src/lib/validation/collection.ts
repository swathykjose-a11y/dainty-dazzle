import { z } from "zod/v4";
import { productSchema } from "./product";

export const collectionSchema = z.object({
  id: z.string(),
  handle: z.string(),
  title: z.string(),
  description: z.string(),
  image: z
    .object({
      url: z.url(),
      altText: z.string().nullable(),
    })
    .nullable()
    .optional(),
  products: z.array(productSchema).optional(),
});

export type Collection = z.infer<typeof collectionSchema>;
