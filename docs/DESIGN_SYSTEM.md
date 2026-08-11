# Codexa Design System

**Version:** 1.0.0  
**Default theme:** Dark  
**Aesthetic:** Tech-forward · High-contrast · Developer-centric · Student-welcoming

Inspired by Vercel, Linear, and Supabase — refined for an elite programming academy: precise, modern, and approachable.

---

## 1. Brand Identity & Aesthetic Direction

### Positioning

Codexa is an elite modern programming academy. The visual language should feel like a premium developer tool (sharp contrast, monospace accents, subtle glows) while remaining warm enough for students taking their first steps into software engineering.

### Principles

| Principle | Guidance |
|-----------|----------|
| **Clarity first** | High contrast text, generous whitespace, one focal CTA per section |
| **Code as craft** | Monospace for tags, snippets, and terminal moments — never decorative noise |
| **Glow with restraint** | Soft accent glows on primary actions and focus rings only |
| **Dark by default** | Deep neutrals; light mode is a supported fallback, not the brand hero |
| **8pt rhythm** | All spacing and sizing snap to the 8pt grid |

### Mood Keywords

`precise` · `electric` · `structured` · `confident` · `welcoming` · `nocturnal`

### Do / Don't

| Do | Don't |
|----|-------|
| Use near-black canvases with luminous accent CTAs | Flat gray-on-gray low-contrast panels |
| Pair geometric sans headings with monospace micro-labels | Mix more than two display fonts |
| Subtle border gradients and glass overlays on cards | Heavy drop shadows, neon rainbow glows |
| One dominant accent (Codexa Blue) + one secondary (Syntax Cyan) | Purple-gradient “AI default” palettes |
| Terminal/code preview as a hero visual device | Stock “laptop on desk” photography as the brand |

---

## 2. Design Tokens

### 2.1 Color Palette

#### Primary Base / Dark Neutrals

| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| `bg-canvas` | `#050507` | `bg-canvas` | Page background |
| `bg-surface` | `#0B0B0F` | `bg-surface` | Primary surface / sections |
| `bg-elevated` | `#121218` | `bg-elevated` | Cards, modals, dropdowns |
| `bg-muted` | `#1A1A22` | `bg-muted` | Hover fills, inset wells |
| `border-subtle` | `#1E1E28` | `border-subtle` | Dividers, quiet borders |
| `border-default` | `#2A2A36` | `border-default` | Card / input borders |
| `border-strong` | `#3D3D4D` | `border-strong` | Emphasized borders, focus fallback |

#### Primary Accent — Codexa Blue (Electric)

| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| `accent` | `#4C6FFF` | `bg-accent` / `text-accent` | Primary CTAs, links, key icons |
| `accent-hover` | `#6B88FF` | `bg-accent-hover` | Hover state |
| `accent-pressed` | `#3A58E6` | `bg-accent-pressed` | Active / pressed |
| `accent-muted` | `#4C6FFF26` | `bg-accent-muted` | Soft fills, selected rows (~15% α) |
| `accent-glow` | `#4C6FFF66` | `shadow-glow-accent` | Button / focus glow (~40% α) |

#### Secondary Accent — Syntax Cyan

| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| `secondary` | `#22D3EE` | `bg-secondary` / `text-secondary` | Badges, highlights, live indicators |
| `secondary-hover` | `#67E8F9` | `bg-secondary-hover` | Hover |
| `secondary-muted` | `#22D3EE1F` | `bg-secondary-muted` | Soft badge backgrounds (~12% α) |

#### Text Tokens

| Token | Hex (Dark) | Hex (Light) | Tailwind | Usage |
|-------|------------|-------------|----------|-------|
| `text-primary` | `#F4F4F5` | `#09090B` | `text-fg` | Headings, body |
| `text-secondary` | `#A1A1AA` | `#52525B` | `text-fg-muted` | Supporting copy |
| `text-tertiary` | `#71717A` | `#71717A` | `text-fg-subtle` | Captions, meta |
| `text-accent` | `#6B88FF` | `#3A58E6` | `text-fg-accent` | Inline links, emphasis |
| `text-inverse` | `#050507` | `#FAFAFA` | `text-fg-inverse` | Text on accent fills |

#### Functional Colors

| Role | Hex | Soft fill | Tailwind | Usage |
|------|-----|-----------|----------|-------|
| Success | `#34D399` | `#34D3991F` | `success` / `success-muted` | Completed lessons, pass states |
| Warning | `#FBBF24` | `#FBBF241F` | `warning` / `warning-muted` | Deadlines, caution |
| Error | `#F87171` | `#F871711F` | `danger` / `danger-muted` | Errors, destructive |
| Info | `#60A5FA` | `#60A5FA1F` | `info` / `info-muted` | Tips, system messages |

#### Light Mode Fallback

| Token | Hex | Notes |
|-------|-----|-------|
| `bg-canvas` | `#FAFAFA` | Soft off-white, not pure white |
| `bg-surface` | `#FFFFFF` | Cards on canvas |
| `bg-elevated` | `#FFFFFF` | Modals; use stronger shadow |
| `bg-muted` | `#F4F4F5` | Inset / hover |
| `border-subtle` | `#E4E4E7` | Quiet rules |
| `border-default` | `#D4D4D8` | Inputs / cards |
| `accent` | `#3A58E6` | Slightly deeper blue for WCAG on light |
| `secondary` | `#0891B2` | Darker cyan for readability |

**Light-mode rules:** Prefer stronger borders over glows; reduce glow opacity by ~50%; keep monospace accents and the same type scale.

---

### 2.2 Typography System

#### Font Families

| Role | Family | Tailwind | Load |
|------|--------|----------|------|
| Heading | **Outfit** | `font-display` | Google Fonts / `next/font` |
| Body | **Plus Jakarta Sans** | `font-sans` | Google Fonts / `next/font` |
| Code | **JetBrains Mono** | `font-mono` | Google Fonts / `next/font` |

```html
<!-- Example next/font setup -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
```

#### Type Scale

| Token | Size | Line height | Weight | Letter-spacing | Usage |
|-------|------|-------------|--------|----------------|-------|
| `display` | 72px / 4.5rem | 1.05 (76px) | 700 | -0.03em | Marketing hero only |
| `h1` | 48px / 3rem | 1.15 (56px) | 700 | -0.025em | Page titles |
| `h2` | 36px / 2.25rem | 1.2 (44px) | 650–700 | -0.02em | Section titles |
| `h3` | 28px / 1.75rem | 1.25 (36px) | 600 | -0.015em | Subsections |
| `h4` | 20px / 1.25rem | 1.35 (28px) | 600 | -0.01em | Card titles |
| `body-lg` | 18px / 1.125rem | 1.6 (28px) | 400–500 | 0 | Lead paragraphs |
| `body` | 16px / 1rem | 1.6 (26px) | 400 | 0 | Default body |
| `body-sm` | 14px / 0.875rem | 1.5 (21px) | 400–500 | 0.01em | Secondary copy, nav |
| `caption` | 12px / 0.75rem | 1.4 (17px) | 500 | 0.02em | Meta, timestamps |
| `code` | 13–14px | 1.55 | 400–500 | 0 | Inline code, tags |
| `code-sm` | 12px | 1.4 | 500 | 0.02em | Badge labels, terminal chrome |

**Rules**

- Headings use `font-display` (Outfit); body uses `font-sans` (Plus Jakarta Sans).
- Never set body copy below 14px for long reading.
- Inline code: `font-mono` + `bg-muted` + `px-1.5 py-0.5` + `rounded-md` + `text-secondary` (cyan) or `text-fg`.
- Max line length for body: ~65–75 characters (`max-w-prose` / ~680px).

---

### 2.3 Spacing & Layout Grid

#### 8pt Grid

Base unit: **4px** (half-step). Preferred steps: **8 / 16 / 24 / 32 / 40 / 48 / 64 / 80 / 96**.

| Token | Value | Tailwind |
|-------|-------|----------|
| `space-1` | 4px | `p-1` / `gap-1` |
| `space-2` | 8px | `p-2` |
| `space-3` | 12px | `p-3` |
| `space-4` | 16px | `p-4` |
| `space-5` | 20px | `p-5` |
| `space-6` | 24px | `p-6` |
| `space-8` | 32px | `p-8` |
| `space-10` | 40px | `p-10` |
| `space-12` | 48px | `p-12` |
| `space-16` | 64px | `p-16` |
| `space-20` | 80px | `p-20` |
| `space-24` | 96px | `p-24` |

**Section vertical rhythm:** `py-16` (mobile) → `py-24` (desktop).  
**Component internal padding:** cards `p-6`–`p-8`; inputs `px-4 py-2.5`.

#### Containers

| Breakpoint | Max width | Horizontal padding |
|------------|-----------|--------------------|
| Mobile (`<640`) | 100% | 16px (`px-4`) |
| Tablet (`sm`–`lg`) | 720–960px | 24px (`px-6`) |
| Desktop (`lg+`) | **1120px** (`max-w-content`) | 32px (`px-8`) |
| Wide marketing | **1280px** (`max-w-wide`) | 32–48px |

Grid: **12 columns**, gutter **24px** desktop / **16px** mobile.

#### Border Radii

| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| `radius-sm` | 6px | `rounded-md` | Badges, chips, small controls |
| `radius-md` | 8px | `rounded-lg` | Inputs, small buttons |
| `radius-lg` | 12px | `rounded-xl` | Cards, terminal windows |
| `radius-xl` | 16px | `rounded-2xl` | Feature panels, hero media |
| `radius-full` | 9999px | `rounded-full` | Avatars, status dots only |

Avoid pill-shaped primary buttons; prefer `rounded-lg` / `rounded-xl`.

#### Shadows & Glows

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-card` | `0 1px 0 0 rgba(255,255,255,0.04) inset, 0 8px 24px -12px rgba(0,0,0,0.6)` | Elevated cards (dark) |
| `shadow-glow-accent` | `0 0 0 1px rgba(76,111,255,0.35), 0 0 24px -4px rgba(76,111,255,0.45)` | Primary button / focus |
| `shadow-glow-secondary` | `0 0 0 1px rgba(34,211,238,0.3), 0 0 20px -4px rgba(34,211,238,0.35)` | Live / secondary emphasis |
| `shadow-terminal` | `0 24px 48px -16px rgba(0,0,0,0.75)` | Floating code preview |

**Glassmorphism overlay**

```css
background: rgba(18, 18, 24, 0.72);
backdrop-filter: blur(12px) saturate(140%);
border: 1px solid rgba(255, 255, 255, 0.06);
```

Light mode: `rgba(255,255,255,0.8)` + `blur(12px)` + `border zinc-200`.

---

## 3. Core Component Library Specifications

### 3.1 Buttons

#### Variants

| Variant | Visual | When to use |
|---------|--------|-------------|
| **Primary Glowing** | Solid `accent`, white text, soft blue glow | Primary CTA (Enroll, Start learning) |
| **Secondary Outline** | Transparent, `border-default`, `text-fg` | Secondary actions |
| **Ghost** | No border, muted text | Tertiary / nav actions |
| **Terminal / Mono** | `font-mono`, `bg-muted`, cyan text or green prompt feel | Dev-flavored actions (`npm install`, “Open playground”) |
| **Destructive** | `danger` fill or outline | Delete / leave course |

#### Sizes

| Size | Height | Padding | Type |
|------|--------|---------|------|
| `sm` | 32px | `px-3` | `body-sm` / 14px |
| `md` | 40px | `px-4` | `body-sm` medium |
| `lg` | 48px | `px-6` | `body` medium |

#### States

| State | Primary | Outline | Mono |
|-------|---------|---------|------|
| Default | `bg-accent` + glow | `border-default` | `bg-muted` + mono |
| Hover | `bg-accent-hover`, glow ↑ | `border-strong` + `bg-muted/50` | `bg-elevated`, border cyan soft |
| Active | `bg-accent-pressed`, scale `0.98` | Border stronger | Pressed inset |
| Focus | `ring-2 ring-accent/50` + glow | Same ring | Cyan ring |
| Disabled | opacity 40%, no glow, `cursor-not-allowed` | Same | Same |

**Focus:** Always visible keyboard focus (`:focus-visible`), never remove outlines without a replacement ring.

---

### 3.2 Cards

#### Shared anatomy

- Background: `bg-elevated`
- Border: `1px solid border-default` or **border gradient** (see below)
- Radius: `rounded-xl` (12px)
- Padding: `p-6`–`p-8`
- Hover (interactive): lift 2px + brighter border; transition `150–200ms`

#### Border gradient (feature cards)

```css
/* Pseudo-border via mask or wrapper */
background:
  linear-gradient(#121218, #121218) padding-box,
  linear-gradient(135deg, rgba(76,111,255,0.45), rgba(34,211,238,0.15), rgba(255,255,255,0.06)) border-box;
border: 1px solid transparent;
```

#### Variants

| Card | Content pattern | Notes |
|------|-----------------|-------|
| **Feature** | Icon + title + 1–2 lines | Gradient border optional; no heavy shadow |
| **Course** | Thumbnail / track color · title · level badge · meta (hours, modules) · progress bar | Image `rounded-lg` inside; CTA ghost or outline |
| **Testimonial** | Quote · avatar · name · role/cohort | Softer border; optional glass; quote in `body-lg` |

---

### 3.3 Badges & Tags

| Type | Style | Example |
|------|-------|---------|
| **Syntax badge** | `font-mono text-xs`, `bg-secondary-muted`, `text-secondary`, `rounded-md`, `px-2 py-0.5` | `TypeScript`, `React` |
| **Accent badge** | `bg-accent-muted`, `text-fg-accent` | `New`, `Elite Track` |
| **Neutral tag** | `bg-muted`, `text-fg-muted` | `12 weeks` |
| **Live status** | Dot `bg-secondary` + pulse + `text-secondary` mono label | `● live` |
| **Success / Warning / Danger** | Soft fill + solid text of functional color | `Passed`, `Due soon` |

Live pulse: `animate-pulse` on a 6–8px circle, or a soft `box-shadow` pulse on the secondary glow.

---

### 3.4 Navigation Header & Footer

#### Header

- Height: **64px** desktop / **56px** mobile
- Background: glass (`bg-elevated/72` + `backdrop-blur-md`) or solid `bg-canvas/80`
- Border bottom: `border-subtle`
- Layout: Logo (wordmark) · Nav links (`body-sm`, muted → primary on hover) · Auth / CTA cluster
- Active link: `text-fg` + optional 1px accent underline or soft `accent-muted` pill (not full pill cluster spam — one indicator only)
- Mobile: hamburger → sheet/drawer with same tokens

**Logo treatment:** Wordmark “Codexa” in Outfit Bold; optional monospace `/` or `<>` mark in accent blue.

#### Footer

- Background: `bg-surface` or slightly darker than canvas
- Top border: `border-subtle`
- Columns: Product · Learn · Company · Legal
- Type: `body-sm` / `caption` for copyright
- Social icons: muted → accent on hover
- Optional thin terminal-style status line: `font-mono text-caption text-fg-subtle` e.g. `codexa@academy:~$ ready to ship`

---

### 3.5 Terminal / Code Preview Snippet

A signature Codexa component: floating mock terminal for hero and feature storytelling.

#### Structure

1. **Chrome bar** — `h-10`, `bg-muted`, traffic lights (12px circles: `#FF5F57` / `#FEBC2E` / `#28C840`), title `font-mono text-caption text-fg-subtle` (e.g. `codexa — bash`)
2. **Body** — `bg-canvas` or `#0A0A0C`, `p-4`–`p-6`, `font-mono text-sm` / `leading-relaxed`
3. **Syntax colors (preview only)**  
   - Prompt / success: `#34D399`  
   - Command: `#F4F4F5`  
   - Flag / string: `#22D3EE`  
   - Comment: `#71717A`  
   - Keyword: `#4C6FFF`  
   - Error: `#F87171`
4. **Container** — `rounded-xl`, `shadow-terminal`, optional accent glow ring
5. **Cursor** — blinking block `w-2 h-4 bg-secondary/80`

#### States

- Default: static snippet  
- Animated: typewriter or line-reveal (respect `prefers-reduced-motion`)  
- Floating: slight CSS transform / parallax in hero — keep subtle (2–4° max tilt)

---

## 4. Motion Guidelines

| Token | Duration | Easing | Use |
|-------|----------|--------|-----|
| `fast` | 120ms | `cubic-bezier(0.2, 0, 0, 1)` | Hover color, opacity |
| `base` | 200ms | same | Buttons, borders |
| `slow` | 400ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Page section reveals |

Ship 2–3 intentional motions on marketing pages: e.g. hero fade-up, terminal type-in, CTA glow breathe (very subtle). Honor `prefers-reduced-motion: reduce`.

---

## 5. Accessibility

- Body text contrast ≥ **4.5:1** on canvas/surface; large text ≥ **3:1**
- Focus rings never rely on color alone
- Interactive targets ≥ **40×40px** (prefer 44px on mobile)
- Don’t convey meaning with color only — pair with icon or label
- Live regions for status toasts; respect reduced motion

---

## 6. Implementation Map

| Artifact | Path |
|----------|------|
| Style guide (this doc) | `docs/DESIGN_SYSTEM.md` |
| Tailwind config | `tailwind.config.js` |
| CSS variables | `src/styles/tokens.css` |

Use CSS variables as the source of truth; map them into Tailwind theme keys so components stay token-driven in both dark (default) and light modes via `html.dark` / `html.light` or `class` strategy.
