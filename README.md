
# LULA Portfolio

A responsive React + Vite landing page for LULA, a community development initiative supporting children, women, and sustainable progress in Eastern DR Congo.

## What this project includes

- Responsive landing page built with React, Vite, and Tailwind CSS
- SEO-ready metadata in `index.html` (description, keywords, Open Graph, Twitter card, robots, theme color)
- Full-height hero experience for modern displays
- Clean structure for homepage, sections, and reusable components

## Local setup

1. Install dependencies:
   - `corepack enable`
   - `pnpm install`

2. Run the development server:
   - `pnpm dev`

3. Build for production:
   - `pnpm build`

## Project structure

- `src/app/pages/` — page entry points like `HomePage.tsx`
- `src/app/components/` — reusable UI sections and components
- `src/app/context/` — localization and content providers
- `index.html` — SEO metadata and app shell

## Notes

- `index.html` now includes improved SEO metadata for better search engine visibility.
- `.gitignore` has been added to exclude local build artifacts and Node dependencies.
- The hero section spans the full viewport height for a stronger first impression.

## Build output

Built files are written to `dist/`.

## Deployment

Deploy the `dist/` folder to any static hosting service such as Netlify, Vercel, or GitHub Pages.
  