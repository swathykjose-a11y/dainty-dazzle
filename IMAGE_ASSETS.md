# Dainty Dazzle — Required Image Assets

All image assets needed for production SEO, social sharing, and PWA support.  
Drop each file into the specified path and you're done — the code already references these locations.

---

## 1. Open Graph Image (Social Sharing)

| File | Path | Dimensions | Format | Purpose |
|------|------|-----------|--------|---------|
| `og-image.png` | `public/og-image.png` | **1200 × 630 px** | PNG or JPG | Default social share image for Facebook, LinkedIn, Discord, Slack, iMessage previews, etc. |

> **Design guidance**: Use a cinematic jewelry lifestyle photo with the "Lumiere" brand name overlaid. Keep text minimal — the image should look good at small thumbnail sizes too.
>
> **Note**: A dynamic fallback OG image is already auto-generated at `src/app/opengraph-image.tsx`. This static file will take priority if it exists.

---

## 2. Brand Logo

| File | Path | Dimensions | Format | Purpose |
|------|------|-----------|--------|---------|
| `logo.png` | `public/logo.png` | **512 × 512 px** (square) | PNG (transparent bg) | Used in Schema.org Organization markup — appears in Google Knowledge Panels and brand search results. |
| `logo.svg` | `public/logo.svg` | Vector | SVG | Optional higher-quality version for any in-app usage. |

---

## 3. Favicons & App Icons

| File | Path | Dimensions | Format | Purpose |
|------|------|-----------|--------|---------|
| `favicon.ico` | `src/app/favicon.ico` | **32 × 32 px** | ICO | ✅ Already exists. Browser tab icon. |
| `icon.png` | `src/app/icon.png` | **512 × 512 px** | PNG | Modern favicon for browsers that support PNG. Also used by Android "Add to Home Screen". |
| `apple-icon.png` | `src/app/apple-icon.png` | **180 × 180 px** | PNG | iOS "Add to Home Screen" icon. Apple requires this exact size. |

> **Note**: Next.js automatically detects `icon.png` and `apple-icon.png` in the `app/` directory and adds the appropriate `<link>` tags. No code changes needed.

---

## 4. PWA Manifest Icons (optional)

If you want full PWA support (installable app), add these to `public/`:

| File | Path | Dimensions | Format | Purpose |
|------|------|-----------|--------|---------|
| `icon-192.png` | `public/icon-192.png` | **192 × 192 px** | PNG | Android home screen icon (standard) |
| `icon-512.png` | `public/icon-512.png` | **512 × 512 px** | PNG | Android splash screen / store listing |
| `maskable-icon.png` | `public/maskable-icon.png` | **512 × 512 px** | PNG (with safe zone padding) | Adaptive icon for Android — use [Maskable.app](https://maskable.app/) to test |

Then update `src/app/manifest.ts` to reference them:

```ts
icons: [
  { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
  { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
  { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
  { src: "/maskable-icon.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
],
```

---

## 5. Twitter Card Image (optional override)

| File | Path | Dimensions | Format | Purpose |
|------|------|-----------|--------|---------|
| `twitter-image.png` | `src/app/twitter-image.png` | **1200 × 630 px** | PNG or JPG | Twitter/X share card. If not provided, the OG image is used instead. |

> Only needed if you want a different crop or design for Twitter vs other platforms.

---

## Quick Checklist

```
public/
├── og-image.png          ← 1200×630  (social sharing)
├── logo.png              ← 512×512   (Schema.org / Knowledge Panel)
├── logo.svg              ← vector    (optional)
├── icon-192.png          ← 192×192   (optional, PWA)
├── icon-512.png          ← 512×512   (optional, PWA)
└── maskable-icon.png     ← 512×512   (optional, PWA)

src/app/
├── favicon.ico           ← 32×32     ✅ exists
├── icon.png              ← 512×512   (modern favicon)
├── apple-icon.png        ← 180×180   (iOS home screen)
└── twitter-image.png     ← 1200×630  (optional)
```

---

## Social Media Handles (optional)

If you have social accounts, update these two files:

### `src/app/layout.tsx` — Twitter card `site` field
```ts
twitter: {
  card: "summary_large_image",
  site: "@yourtwitterhandle",  // ← add this
  ...
},
```

### `src/components/seo/json-ld.tsx` — Organization `sameAs`
```ts
sameAs: [
  "https://instagram.com/yourbrand",
  "https://twitter.com/yourbrand",
  "https://facebook.com/yourbrand",
  "https://pinterest.com/yourbrand",
],
```
