import { z } from "zod/v4";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: z.string().min(1),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
});

const parsed = clientEnvSchema.safeParse({
  NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN:
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});

if (!parsed.success) {
  console.error(
    "❌ Invalid client environment variables:",
    z.prettifyError(parsed.error),
  );
  throw new Error("Invalid client environment variables");
}

export const clientEnv = parsed.data;
