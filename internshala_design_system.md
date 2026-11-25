---
name: internshala-design-system
description: Design system extracted from the Internshala homepage (internshala.com) — color tokens, typography scale, spacing, radii, and component recipes (buttons, nav, cards). Use when building or reviewing UI that should match Internshala's look and feel.
---

# Internshala Design System

Reverse-engineered from the live homepage (`https://internshala.com/`) on 2026-11-25
via computed-style inspection. Values are the dominant tokens actually used on the page,
not a published spec — treat them as a faithful approximation.

## Brand at a glance
- **Primary brand color:** blue (`#008BDC`), with a lighter CTA blue (`#00A5EC`).
- **Accent / promo:** indigo banner (`#4042AE`) and orange highlight (`#FF8C00`).
- **Typeface:** Inter (`"Inter var", sans-serif`).
- **Feel:** clean, high-contrast, white surfaces, small border radii on controls, rounded cards.

---

## Color tokens

### Primary (blue)
| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--color-primary` | `#008BDC` | `rgb(0,139,220)` | Links, outline-button text/border, active text |
| `--color-primary-cta` | `#00A5EC` | `rgb(0,165,236)` | Filled CTA buttons (Register, Close, Yes) |
| `--color-primary-dark` | `#1757AA` | `rgb(23,87,170)` | Hover / pressed, darker link states |

### Accent
| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--color-indigo` | `#4042AE` | `rgb(64,66,174)` | Top promo banner |
| `--color-orange` | `#FF8C00` | `rgb(255,140,0)` | "OFFER" tags, promo highlights |
| `--color-amber` | `#FFAE00` | `rgb(255,174,0)` | Secondary highlight / ratings |

### Neutrals (text)
| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--text-primary` | `#333333` | `rgb(51,51,51)` | Default body + most headings |
| `--text-heading-alt` | `#484848` | `rgb(72,72,72)` | Large display headings |
| `--text-secondary` | `#666666` | `rgb(102,102,102)` | Secondary copy |
| `--text-muted` | `#8A8A8A` | `rgb(138,138,138)` | Muted / helper text |
| `--text-disabled` | `#808080` | `rgb(128,128,128)` | Disabled |
| `--text-on-dark` | `#FFFFFF` | `rgb(255,255,255)` | Text on blue/indigo surfaces |

### Surfaces & borders
| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--surface` | `#FFFFFF` | `rgb(255,255,255)` | Page + card background |
| `--surface-tint` | `#F3F8FF` | `rgb(243,248,255)` | Soft blue-tinted panels |
| `--surface-cyan` | `#EAFCFF` | `rgb(234,252,255)` | Info / badge backgrounds |
| `--border` | `#EEEEEE` | `rgb(238,238,238)` | Dividers, light borders |
| `--border-strong` | `#DDDDDD` | `rgb(221,221,221)` | Input / card borders |
| `--placeholder` | `#BBBBBB` | `rgb(187,187,187)` | Placeholder / skeleton |

---

## Typography

**Family:** `"Inter var", sans-serif` throughout.

**Weights in use:** 400 (regular, default body), 500 (medium, most-used UI text),
600 (semibold, subheadings & buttons), 700 (bold, headings), 800 (rare, display).

### Type scale
| Role | Size | Line height | Weight | Color |
|------|------|-------------|--------|-------|
| Display / H1 | 32px | 40px | 700 | `#333333` |
| Display alt (H5) | 32px | 40px | 700 | `#484848` |
| Section heading (H2/H3) | 28px | 36px | 600–700 | `#333` / `#FFF` on color |
| Subsection | 24px | — | 600 | `#333333` |
| Large body | 18px | — | 400–500 | `#333333` |
| **Body (default)** | **14px** | 20px | 400–500 | `#333333` |
| Small / meta | 13px | — | 400–500 | `#666666` |
| Caption | 12px | — | 400–500 | `#8A8A8A` |
| Micro | 10px | — | 500 | muted |

> `14px` is the workhorse size — ~70% of text nodes. Design to a 14px base, step up for headings.

---

## Spacing & layout
- **Base unit:** 4px. Common steps: `4 · 8 · 12 · 16 · 20 · 24 · 32`.
- **Header height:** 72px (transparent over hero, sits on white elsewhere).
- Button padding observed: `7px 20px` (outline), `8px 16px` (filled).
- Generous whitespace; content on white surfaces with tinted-blue feature panels.

## Border radius
| Token | Value | Usage |
|-------|-------|-------|
| `--radius-xs` | 3px | Small/legacy buttons (Register, modal actions) |
| `--radius-sm` | 4px | Primary buttons (Login), inputs |
| `--radius-md` | 8px | Inputs, small cards, tab tops (`8px 8px 0 0`) |
| `--radius-lg` | 16px | Cards / content panels (most common card radius) |
| `--radius-xl` | 24–32px | Large feature cards |
| `--radius-pill` | 64px / 99px | Pills, chips, avatars, rounded badges |

> Note the inconsistency: newer buttons use 4px, older modal buttons use 3px.
> Standardize on **4px for controls, 16px for cards, pill for chips**.

---

## Components

### Buttons

**Primary (filled CTA)**
```css
background: #00A5EC;        /* --color-primary-cta */
color: #FFFFFF;
border: 1px solid #00A5EC;
border-radius: 4px;
padding: 8px 16px;
font: 600 14px/20px "Inter var", sans-serif;
```

**Secondary (outline)**
```css
background: transparent;
color: #008BDC;            /* --color-primary */
border: 1px solid #008BDC;
border-radius: 4px;
padding: 7px 20px;
font: 600 14px/20px "Inter var", sans-serif;
```

### Navigation bar
- Height 72px, transparent background over the hero (white further down).
- Logo left; text links (`Jobs`, `Internships`, `Courses`) in `#333` 14px.
- Right cluster: outline **Login** + filled **Register** + `For Employers` link in `#008BDC`.
- `Courses` carries an orange `OFFER` tag (`#FF8C00`).

### Promo banner (top strip)
- Full-width indigo (`#4042AE`) bar, white text, centered, with an underlined inline CTA.

### Cards / feature panels
- White or `#F3F8FF` background, `16px` radius, soft borders (`#EEEEEE`).
- Headings `#333`, body 14px `#666`, blue links `#008BDC`.

### Hero section
- Deep-blue gradient background with white and amber (`#FFAE00`) headline text
  ("India's **leading platform**" — amber emphasis on key phrase).
- Sign-up card: white panel, "Continue with Google" (white, bordered) and
  "Continue with Email" (blue) options.

---

## CSS custom properties (drop-in)

```css
:root {
  /* brand */
  --color-primary: #008BDC;
  --color-primary-cta: #00A5EC;
  --color-primary-dark: #1757AA;
  --color-indigo: #4042AE;
  --color-orange: #FF8C00;
  --color-amber: #FFAE00;

  /* text */
  --text-primary: #333333;
  --text-heading-alt: #484848;
  --text-secondary: #666666;
  --text-muted: #8A8A8A;
  --text-on-dark: #FFFFFF;

  /* surfaces */
  --surface: #FFFFFF;
  --surface-tint: #F3F8FF;
  --surface-cyan: #EAFCFF;
  --border: #EEEEEE;
  --border-strong: #DDDDDD;
  --placeholder: #BBBBBB;

  /* type */
  --font-family: "Inter var", Inter, sans-serif;
  --font-size-base: 14px;
  --line-height-base: 20px;

  /* radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-pill: 999px;

  /* spacing scale (4px base) */
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px;
  --space-4: 16px; --space-5: 20px; --space-6: 24px; --space-8: 32px;
}
```

---

## Usage guidance
- Use **`#008BDC`** for anything interactive/linked; reserve the brighter **`#00A5EC`** for
  filled call-to-action buttons.
- Keep body text at **14px / `#333`**; never go below 12px for readable copy.
- Cards = 16px radius; controls = 4px radius; chips/avatars = pill.
- Indigo and orange are promotional accents — use sparingly, not for primary UI.
