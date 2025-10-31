# Flow Systems

Flow Systems is a Next.js 14 application that publishes platform reviews, comparisons, and scoring data for small teams.

## Getting started

```bash
pnpm install
pnpm run dev
```

## Available scripts

- `pnpm run dev` – start the development server
- `pnpm run build` – create a production build
- `pnpm run start` – run the built app
- `pnpm run lint` – run ESLint
- `pnpm run seed` – copy seed data into the public data directory

## API endpoints

- `GET /api/catalog/platforms` – returns catalog metadata seeded from `seeds/platforms.csv`
- `GET /api/scoring/weights/[stage]` – returns scoring weights sourced from `public/data/weights.json`

## Content

Platform reviews live in `content/reviews`, comparisons in `content/comparisons`, and shared templates in `content/templates`.
