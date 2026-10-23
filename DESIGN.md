# DESIGN SYSTEM SPECIFICATION: MEDIA CHRONICLE

> **Aesthetic Identity**: Gallery-Grade Editorial Minimalist  
> **Inspirations**: Apple Store, MR PORTER, Leica Monographs, Linear & Awwwards Design Benchmarks  
> **Core Ethos**: Museum-grade archival permanence, uncompromising digital craftsmanship, and serious air-gapped privacy.

---

## 1. Design Philosophy

Media Chronicle is a native Windows desktop indexing vault for sacred, multi-decade family memories stored on external USB hard drives and SSDs. 

A product safeguarding private family memories must never look like a toy, a cartoon startup, or a generic SaaS template. It requires a visual identity communicating **timeless permanence, cryptographic reliability, and quiet luxury**:

1. **Quiet Authority Over Loud Marketing**: No cartoon stickers, no aggressive neobrutalist black borders, no neon clashing colors. Clean white spaces and crisp typography allow the family photos and engineering facts to command attention.
2. **Tactile Hardware Precision**: Components mirror high-end industrial audio and camera equipment (Leica, Teenage Engineering, Apple Hardware)—soft matte surfaces, hairline hairline borders (`1px`), and precision micro-readouts.
3. **Transparent Truth in Engineering**: Real metrics ($79 lifetime, sub-50ms query, 0 bytes transmitted), zero corporate buzzwords, and falsifiable claims.

---

## 2. Color Palette & Semantic Tokens

The palette is predominantly monochromatic with a single semantic color—**Whispering Emerald**—used exclusively to denote air-gapped offline security and instantaneous database hits.

| Token | Hex / Value | Semantic Role |
| :--- | :--- | :--- |
| `--bg-canvas` | `#FFFFFF` | Primary viewport and background canvas |
| `--bg-surface` | `#F8F9FA` | Elevated cards, stage backdrops, and interactive panels |
| `--bg-surface-subtle` | `#FAFAFA` | Secondary footer and quiet background areas |
| `--bg-surface-dark` | `#111111` | High-contrast callouts (Pricing banner, terminal viewports) |
| `--bg-glass` | `rgba(255, 255, 255, 0.85)` | Sticky frosted navbar (`backdrop-filter: blur(20px)`) |
| `--text-primary` | `#111111` | Primary editorial headings, titles, and high-contrast labels |
| `--text-secondary` | `#4B5563` | Body copy, descriptive text, and secondary navigation |
| `--text-muted` | `#6B7280` | Metadata labels, timestamps, and secondary captions |
| `--obsidian` | `#111111` | Primary CTA buttons, slider thumbs, and dark containers |
| `--emerald` | `#10B981` | Air-gapped status dot, local index hits, success badges |
| `--emerald-subtle` | `rgba(16, 185, 129, 0.12)` | Subtle emerald badge backgrounds |
| `--emerald-border` | `rgba(16, 185, 129, 0.28)` | Highlight borders for air-gapped status |

---

## 3. Typography Hierarchy

The typographic system pairs an **editorial serif** for distinctive titles with an **ultra-clean sans-serif** for UI clarity, and a **precision monospace** for hardware specs and drive metadata.

```
[ Playfair Display ]  Display Headings, Editorial Titles, & Large Numbers
[ Inter ]             Body Copy, Navigation Links, Form Labels, & Button Labels
[ JetBrains Mono ]    Drive Letters (D:\), EXIF Data, Latency Readouts, & Micro-Pills
```

### Font Stacks
- **Editorial Serif**: `'Playfair Display', Georgia, serif`
- **Interface Sans**: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Monospace Technical**: `'JetBrains Mono', 'SF Mono', monospace`

### Typographic Scale
- **Hero Title**: `clamp(2.8rem, 5.5vw, 4.4rem)`, line-height `1.08`, tracking `-0.025em`, weight `400` with italic accents.
- **Section Titles**: `2.6rem`, line-height `1.15`, tracking `-0.02em`, weight `400`.
- **Card Titles**: `1.4rem – 1.6rem`, line-height `1.2`, weight `400`.
- **Body Text**: `0.95rem – 1.05rem`, line-height `1.65`, color `--text-secondary`.
- **Micro-Badges & Eyebrows**: `10px – 11px`, weight `600`, uppercase, tracking `0.08em` – `0.1em`, monospace.

---

## 4. Hairline Borders, Elevation & Radii

### Hairlines (Never Heavy Borders)
- **`--border-hairline`**: `1px solid rgba(0, 0, 0, 0.08)` (Default card and divider line)
- **`--border-subtle`**: `1px solid rgba(0, 0, 0, 0.12)` (Hover borders and active focus rings)
- **`--border-dark`**: `1px solid rgba(255, 255, 255, 0.12)` (Dividers on obsidian surfaces)

### Ambient Feathered Shadows (Zero Hard Offset)
- **`--shadow-xs`**: `0 1px 2px rgba(0, 0, 0, 0.04)` (Buttons, subtle badges)
- **`--shadow-sm`**: `0 2px 4px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)` (Elevated cards)
- **`--shadow-md`**: `0 4px 16px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.03)` (Card hover states)
- **`--shadow-lg`**: `0 12px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.03)` (Modal overlays, pricing banner)

### Radii Hierarchy
- **Pills**: `9999px` (`--radius-pill`) — All buttons, filter tags, search bars, and status capsules.
- **Large Cards**: `24px` (`--radius-xl`) — Bento cards, feature blocks, terminal viewports.
- **Hero Stage & Pricing**: `32px` (`--radius-2xl`) — Hero animation canvas and primary pricing box.

---

## 5. Component Patterns

### A. Floating Glass Navbar
- Sticky positioning (`top: 0`) with `backdrop-filter: blur(20px)` and hairline bottom border.
- Minimalist camera/vault icon mark with obsidian background and crisp white SVG icon.
- Monospace eyebrow tag: `AIR-GAPPED PHOTO INDEXER`.
- Pill CTAs: Primary black capsule button (`pill-btn-primary`) alongside white hairline capsule button (`pill-btn-secondary`).

### B. Hero Particle & Hard Drive Animation Stage
- **Stage Container**: Rounded `32px` `#F8F9FA` exhibition canvas with subtle border and status bar.
- **Act 1 (Raw Ingest)**: Photo card with EXIF metadata (`D:\Photos\2014_Camping\IMG_4219.CR2 • 24.2 MB`) glides in from left.
- **Act 2 (Particle Dissolution)**: Photo decomposes into 65+ vector particles that follow quadratic bezier curves into the hard drive vault glyph.
- **Act 3 (Air-Gapped Vault)**: Vector hard drive glyph pulses emerald LED with status: `INDEX COMPLETE • ZERO CLOUD BYTES`.
- **Act 4 (Typing Search Bar)**: Minimalist query pill types out natural search terms character-by-character.
- **Act 5 (Sub-50ms Snap-Back)**: Particles reverse-stream from the drive to magnetically reassemble the resolved photo card with `32MS LOCAL MATCH`.

### C. Button & Capsule System
- **Primary Pill (`.pill-btn-primary`)**:
  - Background: `#111111`, Color: `#FFFFFF`, Radius: `9999px`, Padding: `0.65rem 1.4rem`.
  - Hover: Background `#262626`, `transform: translateY(-1px)`, shadow `var(--shadow-sm)`.
- **Secondary Pill (`.pill-btn-secondary`)**:
  - Background: `#FFFFFF`, Border: `var(--border-hairline)`, Color: `#111111`, Radius: `9999px`.
  - Hover: Border color `rgba(0, 0, 0, 0.25)`, `transform: translateY(-1px)`.
- **Status Badge (`.badge-pill`)**:
  - Monospace uppercase readout with a 7px pulsing emerald dot (`animation: pulse-dot 2.5s infinite`).

### D. Bento Feature Cards
- Padding `2.2rem 1.8rem`, surface `#F8F9FA`, hairline border.
- Monospace step indicators (`01 // 02 // 03`) housed in clean rounded obsidian square tags.
- Editorial title with relaxed line-height and monospace pill technology tags at the base.

### E. Range Slider & Comparison Metrics
- Clean track (`6px` height, `#E5E7EB` fill, rounded full).
- Obsidian thumb (`22px` circle with subtle elevation, scaling on hover).
- High-contrast highlight card for Media Chronicle ($79 lifetime) against recurring cloud subscriptions.

### F. Editorial Minimalist Footer
- 4-column layout on `#FAFAFA` with hairline top border.
- Monospace uppercase column headings (`ARCHITECTURE`, `DOWNLOADS & ACCESS`, `ENGINEERING`).
- Clean copyright and air-gapped build badge.

---

## 6. Motion & Interaction Standards

All animations adhere to the official **GSAP Performance & Best Practices** guidelines:
1. **GPU-Accelerated Properties**: Only animate `transform` (`x`, `y`, `scale`) and `opacity`. Never animate `width`, `height`, `top`, or `margin` to prevent layout thrashing.
2. **Cubic-Bezier Easing**: Use natural, deceleration curves (`cubic-bezier(0.16, 1, 0.3, 1)` or `power2.out`).
3. **Accessibility**: All continuous animations respect `prefers-reduced-motion: reduce`.
4. **Interactive Hover Controls**: Complex animations (like the hero particle canvas) pause on mouseenter and resume on mouseleave to respect user focus.

---

## 7. Tone of Voice & Copy Guidelines

- **No AI Tells or Jargon**: Never use reveals like *"It's not X, it's Y"* or bloated hype words like *"revolutionary AI-powered photo synergy"*.
- **Direct & Factual**: State engineering mechanics clearly: *"Indexes in place on external drives. Never copies or moves files. 100% offline."*
- **Quiet Luxury**: Speak like a premium hardware manufacturer (Leica / Apple)—confident, precise, and understated.
