# Codexa

Elite modern programming academy — Angular + Tailwind design system.

## Stack

- Angular 21 (standalone components, signal inputs)
- Tailwind CSS 3
- `@lucide/angular` icons
- Plus Jakarta Sans + JetBrains Mono

## Design tokens

See [`docs/DESIGN_SYSTEM.md`](./docs/DESIGN_SYSTEM.md) for the full style guide.

Runtime tokens live in:

- `tailwind.config.js` → `theme.extend.colors.codexa`
- `src/styles.css` → fonts, body shell, `.glow-*` / `.glass-card`

## UI library

Reusable components in `src/app/shared/ui/`:

| Component | Selector |
|-----------|----------|
| Button | `cx-button` |
| Badge | `cx-badge` |
| Card | `cx-card` |
| Terminal | `cx-terminal-window` |
| Navbar | `cx-navbar` |

```ts
import { ButtonComponent, BadgeComponent } from './shared/ui';
```

## Scripts

```bash
npm start    # ng serve
npm run build
```
