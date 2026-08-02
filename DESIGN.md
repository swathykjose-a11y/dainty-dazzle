# Dainty Dazzle — Design System (Lumiere Reference)

## §1. Brand & Reference Vision

Derived strictly from the reference interface ("Lumiere"):
- Editorial, cinematic, high-fashion jewelry storefront.
- Pale mint-tinted sage canvas background paired with crisp white product cards and deep forest charcoal typography.
- High-contrast hero header with full-bleed photographic background and massive elegant serif headline ("Lumiere" style).
- Pill-shaped CTAs (`rounded-full`), micro-uppercase navigation labels with wide tracking, and subtle arrow indicators (`↗`).

---

## §2. Color Palette

| Token          | Hex       | CSS Variable          | Role                                                |
| -------------- | --------- | --------------------- | --------------------------------------------------- |
| `sage-canvas`  | `#F2F5EF` | `--color-sage-canvas` | Primary page background — pale mint-foam cream       |
| `card-white`   | `#FFFFFF` | `--color-card-white`  | Product card & elevated surface background           |
| `charcoal`     | `#1A211D` | `--color-charcoal`    | Primary text & deep accents — forest charcoal black |
| `sage-border`  | `#D5DDD6` | `--color-sage-border` | Subtle section dividers & pill button borders        |
| `sage-muted`   | `#737F76` | `--color-sage-muted`  | Subtitles, index numbers `(01)`, caption copy       |
| `gilt-accent`  | `#C4A265` | `--color-gilt-accent` | Secondary highlight / gold accent                   |

---

## §3. Typography

| Role      | Family                                      | Weight(s)   | Usage                                                     |
| --------- | ------------------------------------------- | ----------- | --------------------------------------------------------- |
| Display   | Playfair Display / Overused Grotesk         | 400, 500    | Main Hero Logo ("Lumiere"), Section Headings ("Bestsellers (01)") |
| Micro / UI| Geist (clean sans)                          | 400, 500    | Navigation items, product titles, pill buttons, prices    |

### Micro-Typography Rules

- Header navigation links: `text-[11px] uppercase tracking-[0.15em] text-charcoal/90`
- Pill buttons: `rounded-full border border-charcoal/30 px-5 py-2 text-[11px] uppercase tracking-[0.15em]`
- Product card labels: `text-[11px] uppercase tracking-[0.12em] text-charcoal` with right arrow `↗`

---

## §4. Border Radius & Spacing

| Element                 | Radius         | Padding / Margin                             |
| ----------------------- | -------------- | -------------------------------------------- |
| Buttons & Pills         | `rounded-full` | `px-5 py-2`, `h-9` or `h-10`                 |
| Product Cards & Images  | `rounded-none` or `rounded-xs` (2px - 4px) | Crisp, precise border edges |
| Page Container          | Full width     | `px-6 md:px-12 lg:px-16`                     |
| Hero Section            | `rounded-none` | Full bleed `min-h-[85vh]`                    |

---

## §5. Component Layout Specifications

1. **Header**:
   - Transparent or white-glass top bar.
   - Micro uppercase links: `NEW COLLECTION`, `CATALOG`, `GIFT CARDS`, `ABOUT US`, `SHIPPING`, `CONTACTS`, `FAQ`.
   - Right side: Pill cart button `CART (0)` (`rounded-full border border-current px-4 py-1.5 text-xs`).

2. **Hero Section**:
   - Full bleed height (`min-h-[85vh]`).
   - Cinematic background image with dark overlay.
   - Centered giant white serif headline ("Lumiere" / "Dainty Dazzle").
   - Bottom centered light caption: *"True beauty shines from within, and our jewelry merely reflects it!"*

3. **Bestsellers Section**:
   - Section header: `Bestsellers` with index `(01)` on the left, pill button `VIEW ALL ↗` on the right.
   - 4-column horizontal card layout with subtle gap (`gap-4`).
   - Each card: White background (`bg-card-white`), square/tall photo, uppercase product title + price + `↗` arrow below.
   - Subtle scroll/progress bar indicator below the grid.

4. **Brand Quote / Story Section**:
   - 2-column layout:
     - Left: Medium feature photo with rounded image container (`rounded-sm`).
     - Right: Bottom-aligned editorial block with brand statement + pill CTA `LEARN MORE ABOUT US ↗`.
