# Shopify Backend Integration Guide — Dainty Dazzle (Lumiere)

This guide walks through setting up your Shopify store, obtaining credentials, connecting the Next.js Storefront API data layer, and deploying to production.

---

## 1. Shopify Admin Configuration

### 1.1 Create a Headless Storefront API App

1. Log in to your **Shopify Admin** (`https://admin.shopify.com/store/YOUR-STORE`).
2. Go to **Settings** → **Apps and sales channels** → **Develop apps**.
3. Click **Allow custom app development** (if prompted) and then click **Create an app**.
4. App name: `Lumiere Headless Storefront`.
5. Under **Configuration**, click **Configure Storefront API scopes**.
6. Enable the following permissions:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_product_tags`
   - `unauthenticated_read_checkouts`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_content` (for policies & pages)
   - `unauthenticated_read_customer_tags`
7. Click **Save** and then **Install app**.
8. Under **API credentials**, copy the **Storefront API access token**.
9. Note your Shopify domain (e.g. `your-store.myshopify.com`).

---

## 2. Catalog & Policy Setup in Shopify

### 2.1 Collections

Create collections with handles matching your navigation routes:

| Collection Title | Handle         | Description                            |
| ---------------- | -------------- | -------------------------------------- |
| New Arrivals     | `new-arrivals` | Featured new pieces                    |
| Necklaces        | `necklaces`    | Chains, pendants, and chokers          |
| Earrings         | `earrings`     | Studs, huggies, and drop earrings      |
| Rings            | `rings`        | Bands, signets, and stackable rings    |
| Bracelets        | `bracelets`    | Gold chains, cuffs, and cord bracelets |

### 2.2 Store Policies

Populate policy content in **Settings** → **Policies**:
- Shipping Policy
- Refund Policy
- Terms of Service
- Privacy Policy

---

## 3. Environment Variables Setup

Create or update `.env.local` (and add to your hosting platform, e.g. Vercel):

```env
# Server-side (never exposed to browser)
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_public_storefront_access_token
SHOPIFY_WEBHOOK_SECRET=your_secret_hmac_key
NODE_ENV=production

# Client-side
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SITE_URL=https://lumierejewelry.com
```

---

## 4. Connecting Live Shopify Data Layer

Replace the mock fetch calls in `src/lib/shopify/index.ts` with GraphQL requests to Shopify Storefront API:

```typescript
import { serverEnv } from "@/env/server";

const SHOPIFY_GRAPHQL_URL = `https://${serverEnv.SHOPIFY_STORE_DOMAIN}/api/2024-04/graphql.json`;

export async function shopifyFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<T> {
  const res = await fetch(SHOPIFY_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": serverEnv.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
  });

  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors[0].message);
  }
  return json.data;
}
```

---

## 5. Cart & Checkout Flow

1. **Cart Creation & Updates**: Use Storefront API GraphQL mutations:
   - `cartCreate`
   - `cartLinesAdd`
   - `cartLinesUpdate`
   - `cartLinesRemove`
2. **Checkout Hand-off**:
   When the user clicks the checkout button, redirect them to the Shopify-hosted checkout URL returned by the cart object:
   ```typescript
   window.location.href = cart.checkoutUrl;
   ```
   *Shopify handles PCI-DSS compliant payment processing, taxes, and shipping calculation.*

---

## 6. On-Demand ISR Webhooks Setup

To trigger instant Next.js cache revalidation when products or collections change in Shopify:

1. In Shopify Admin, go to **Settings** → **Notifications** → **Webhooks**.
2. Create webhooks for:
   - `Product update` → `https://yourdomain.com/api/revalidate`
   - `Product deletion` → `https://yourdomain.com/api/revalidate`
   - `Collection update` → `https://yourdomain.com/api/revalidate`
3. Copy your shared Webhook HMAC secret into `SHOPIFY_WEBHOOK_SECRET`.

---

## 7. Production Deployment Checklist

- [ ] Verify `npx tsc --noEmit` passes with 0 errors.
- [ ] Verify production build completes cleanly (`bun run build`).
- [ ] Add all environment variables in Vercel / hosting provider settings.
- [ ] Connect custom domain and configure DNS records.
- [ ] Perform a test transaction end-to-end on Shopify checkout.
