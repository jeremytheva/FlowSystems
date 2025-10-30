# FlowSystems

FlowSystems is a Next.js application that curates operator-grade research on revenue and operations platforms. Reviews are authored in MDX, enriched with reusable UI components, and rendered with the App Router.

## Getting started

```bash
pnpm install
pnpm dev
```

You can also use `npm` or `yarn`; scripts are defined in `package.json`.

## Content model

- Reviews live in `content/reviews/*.mdx`. Each file includes front matter with factor scoring, verdict summaries, and evidence. The body can use FlowSystems UI components such as `FactorTable`, `ChooseIf`, and `SetupEstimator`.
- Platform metadata is stored in `data/platforms.ts`. This powers platform profiles, category listings, and featured cards on the home page.
- Comparison guides live in `data/comparisons.ts`. They render into the comparison routes with reusable tables.
- Admin, scoring, and course planning data is collocated in `data/admin.ts` and `data/scoring.ts` so the UI and API responses stay in sync.

## Key routes

- `/` — Landing page highlighting the latest review and featured platforms.
- `/review` and `/review/[slug]` — Review index and individual MDX-powered reviews.
- `/platform` and `/platform/[slug]` — Platform directory and profiles with factor weight visualizations.
- `/compare` and `/compare/[slug]` — Side-by-side comparison narratives with trade-offs.
- `/admin/*` — Internal planning views for backlog, scoring, publishing, and import templates.
- `/api/*` — JSON endpoints that surface platform, review, comparison, scoring, and admin backlog data for integrations.

## Styling

Tailwind CSS powers the design system. The configuration lives in `tailwind.config.ts`, and global styles are defined in `app/globals.css`.
