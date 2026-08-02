# E-commerce Storefront — Next.js + TypeScript + Tailwind + Shopify

This README defines the **rendering strategy** for every page in this project. Follow these conventions exactly when generating or editing pages — do not default to SSR unless a page is explicitly marked SSR/CSR below.

## Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS
- **Backend:** Shopify (Storefront API + Shop Policies API)
- **Data fetching:** Shopify Storefront API (GraphQL)
- **Cache invalidation:** Shopify webhooks → Next.js route handlers → `revalidatePath` / `revalidateTag`

---

## Rendering Strategy Rules

### Core principle

Default to the **cheapest, most cacheable strategy** that satisfies the page's data needs. Never use SSR (`force-dynamic`) for public, non-user-specific content. Reserve SSR/CSR for user-private or session-specific data only.

### Strategy definitions

- **SSG** — Rendered once at build time. Use for content that almost never changes.
- **ISR** — Rendered at build time, then regenerated in the background every `revalidate` seconds, or on-demand via webhook. Use for content that changes occasionally (prices, stock, catalog).
- **CSR** — Rendered entirely client-side (`'use client'`). Use for user-specific, session-based, or highly interactive data with zero SEO value.
- **Redirect** — Not a rendered Next.js page; hands off to an external URL (Shopify checkout).

---

## Page-by-Page Rules

### 1. Home Page (`app/page.tsx`)

- **Strategy:** SSG + ISR
- **Implementation:** `export const revalidate = 3600;` (or shorter if content changes more often)
- **On-demand revalidation:** trigger `revalidatePath('/')` from a webhook handler on `products/update`, `collections/update`
- **Do not:** use `force-dynamic` or fetch Shopify data in a way that blocks on every request

### 2. Collection Page (`app/collections/[handle]/page.tsx`)

- **Strategy:** SSG + ISR for the base collection URL
- **Implementation:**
  - `generateStaticParams()` to pre-render known collection handles
  - `export const revalidate = 1800;`
  - `dynamicParams = true` so new collections not in the static param list still render on first request and get cached
- **Filters/sort/pagination (query params):** handle client-side (fetch to a route handler) so the outer page shell stays static. Do NOT generate static params per filter combination — this causes combinatorial explosion.
- **Exception:** if a specific filtered view needs to be indexed by Google (e.g. `/collections/mens/red-shirts` as its own canonical path), treat that specific path as its own SSG+ISR page, not a query param.

### 3. Product Page (`app/products/[handle]/page.tsx`)

- **Strategy:** SSG + ISR
- Same pattern as collection page: `generateStaticParams` for top/known products, `revalidate`, webhook-triggered revalidation on price/inventory change via `products/update` webhook.

### 4. Cart Page (`app/cart/page.tsx`)

- **Strategy:** CSR only — mark with `'use client'`
- **Do not:** fetch cart data in a Server Component or use SSR
- Cart state is session-specific (Shopify cart ID stored in a cookie) and mutates on every add/remove/qty change — there is no SEO value and no benefit to server rendering it.
- A Server Component shell around a client-rendered cart island is acceptable, but the actual cart data fetch/mutation logic must be client-side.

### 5. Checkout Page (`app/checkout` or a button/action, not a full route)

- **Strategy:** Redirect (not a rendered page)
- Redirect to `cart.checkoutUrl` returned by the Shopify Storefront API cart mutation:
  ```ts
  window.location.href = cart.checkoutUrl;
  ```
- **Do not** build a custom payment/checkout UI unless the project is explicitly on Shopify Plus with Checkout Extensibility or Hydrogen/Oxygen. Standard headless builds must hand off to Shopify's hosted checkout for PCI-DSS compliance.

### 6. Shipping Policy (`app/policies/shipping/page.tsx`)

- **Strategy:** SSG (or SSG + long ISR if content is pulled live from Shopify's Shop Policies API)
- If hardcoded/MDX: pure SSG, no `revalidate`, rebuild on content change.
- If pulled from Shopify (`shop.shippingPolicy`): `export const revalidate = 86400;` (daily) so admin edits surface without a manual redeploy.

### 7. Return & Refund Policy (`app/policies/returns/page.tsx`)

- **Strategy:** Identical to Shipping Policy above.

### 8. Terms & Conditions (`app/policies/terms/page.tsx`)

- **Strategy:** Identical to Shipping Policy above.

### 9. Privacy Policy (`app/policies/privacy/page.tsx`)

- **Strategy:** Identical to Shipping Policy above.

### 10. `robots.txt` (`app/robots.ts`)

- **Strategy:** Static, build-time generation using Next.js native convention
- Must disallow `/cart`, `/checkout`, `/account`, and reference the sitemap URL.

### 11. `llms.txt` (`public/llms.txt`)

- **Strategy:** Fully static file, no generation logic. Place directly in `public/`.

### 12. `full-llms.txt` (`public/full-llms.txt`)

- **Strategy:** Static output generated by a **build script** run before `next build` in CI/CD.
- The script queries Shopify (products, collections, policies) and writes the compiled markdown/text file to `public/full-llms.txt`.
- **Do not** generate this file at request-time or via a live route — it must not trigger a Shopify API call on every crawler hit.

### 13. `sitemap.xml` (`app/sitemap.ts`)

- **Strategy:** SSG + ISR, using Next.js native `sitemap.ts` convention
- **Implementation:** `export const revalidate = 3600;`
- Must include all product and collection URLs dynamically fetched from Shopify, plus static pages (home, policies).
- **Do not** treat this as a one-time static file — the catalog changes, and stale sitemaps hurt SEO indexing of new products.

---

## Webhook → Revalidation Map

| Shopify Webhook Topic                      | Action                                                                   |
| ------------------------------------------ | ------------------------------------------------------------------------ |
| `products/update`, `products/delete`       | `revalidatePath('/products/[handle]')`, `revalidatePath('/sitemap.xml')` |
| `collections/update`                       | `revalidatePath('/collections/[handle]')`, `revalidatePath('/')`         |
| `inventory_levels/update`                  | `revalidatePath('/products/[handle]')`                                   |
| Shop policy edits (poll or manual trigger) | `revalidatePath('/policies/*')`                                          |

Route handlers for these live under `app/api/revalidate/route.ts`, verified via Shopify's webhook HMAC signature before triggering revalidation.

---

## What NOT to do

- Do not use `export const dynamic = 'force-dynamic'` on any public, cacheable page (home, collections, products, policies).
- Do not fetch Shopify data server-side on every request for cart/account pages — use CSR.
- Do not build a custom checkout payment flow unless explicitly instructed and confirmed to be on Shopify Plus / Hydrogen.
- Do not generate `full-llms.txt` or `sitemap.xml` by calling Shopify's API at request time — both must be build-time or ISR-cached.
- Do not create per-filter-combination static params for collection pages.

## Summary Table (for quick reference)

| Page                               | Strategy                        |
| ---------------------------------- | ------------------------------- |
| Home                               | SSG + ISR                       |
| Collection (base)                  | SSG + ISR                       |
| Collection (filtered/query params) | CSR (client fetch)              |
| Product                            | SSG + ISR                       |
| Cart                               | CSR                             |
| Checkout                           | Redirect                        |
| Shipping Policy                    | SSG (+ ISR if Shopify-sourced)  |
| Return & Refund Policy             | SSG (+ ISR if Shopify-sourced)  |
| Terms & Conditions                 | SSG (+ ISR if Shopify-sourced)  |
| Privacy Policy                     | SSG (+ ISR if Shopify-sourced)  |
| robots.txt                         | Static (build-time)             |
| llms.txt                           | Static file                     |
| full-llms.txt                      | Static (build-script generated) |
| sitemap.xml                        | SSG + ISR                       |
