# Component Gallery — Nuxt 4

Nuxt 4 rebuild of the original React/Next.js design-system reference app.
Every UI primitive is a single-file Vue component (`app/components/gallery/*.vue`)
with a **Copy** button that copies its own `.vue` source (via Vite's `?raw`
import) — handy for pasting straight into future projects.

## Pages

- `/` — landing page
- `/design` — the full component gallery (19 components across 5 categories),
  ported from the original `app/page.tsx`

## Stack

- Nuxt 4 + Vue 3 (`<script setup>`)
- Tailwind CSS v4 (via `@tailwindcss/vite`) — available project-wide; the
  gallery components themselves use the original hand-written CSS
  (`app/assets/css/main.css`) rather than utility classes, matching the
  source design
- `@lucide/vue` for icons

## Setup

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Notes on the port

- The original `components/ui/button.tsx` (shadcn/Base UI button) wasn't
  actually used anywhere in the gallery page, so it wasn't ported —
  every demo relies only on the plain custom CSS classes in `main.css`.
- Modal/Dialog/BottomSheet/Toast use Vue's built-in `<Teleport to="body">`
  instead of the manual `createPortal` + `mounted` check the React version
  needed to dodge SSR — Nuxt handles teleport during SSR natively.
- The sidebar filter now has a working "Navigation & selection" entry
  (Datepicker, Dropdown Menu, Popover, Select) — the original React version
  defined that section but had no sidebar button wired up for it.
