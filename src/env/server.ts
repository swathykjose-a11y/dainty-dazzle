import "server-only";
import { z } from "zod/v4";

const serverEnvSchema = z.object({
  SHOPIFY_STORE_DOMAIN: z.string().min(1),
  SHOPIFY_STOREFRONT_ACCESS_TOKEN: z.string().min(1),
  SHOPIFY_ADMIN_API_TOKEN: z.string().min(1).optional(),
  SHOPIFY_WEBHOOK_SECRET: z.string().min(1),
  NODE_ENV: z.enum(["development", "production", "test"]),
});

const parsed = serverEnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    "❌ Invalid server environment variables:",
    z.prettifyError(parsed.error),
  );
  throw new Error("Invalid server environment variables");
}

export const serverEnv = parsed.data;
