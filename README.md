# FlowSystems

FlowSystems is a Next.js 14 application that showcases product research, platform evaluations, and automation workflows for modern go-to-market teams. It combines rich marketing pages with stubbed APIs and content templates so designers, engineers, and analysts can collaborate on end-to-end customer journeys before production data arrives. 

## Features
- **Marketing & community pages** – Rich storytelling modules in `/app/page.tsx`, `/app/about`, and `/app/community` demonstrate methodology, rituals, and impact for prospective members.
- **Dynamic research routes** – Parameterized pages under `/app/{category,compare,course,newsletter,platform,review,stack}` illustrate how evaluation content will be surfaced once real data sources are connected.
- **Admin & scoring surfaces** – Early admin workflows in `/app/admin/**` and scoring APIs (e.g., `/app/api/scoring/evaluate`) highlight how teams will tune weights and publish findings.
- **Content templates** – MDX scaffolds in `content/templates` provide reusable story structures for reviews and platform comparisons.
- **Type-safe utilities** – Shared helpers in `app/lib` normalize content, evaluation factors, and catalog metadata for the UI and API routes.

## Tech Stack
- [Next.js 14](https://nextjs.org/) with the App Router
- React 18 with TypeScript
- Tailwind CSS for styling
- Headless UI, Heroicons, Lucide, and Framer Motion for interaction patterns
- Zod-powered validation in API routes

## Getting Started
1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Start the development server**
   ```bash
   npm run dev
   ```
   The app runs at [http://localhost:3000](http://localhost:3000) by default.
3. **Run linting**
   ```bash
   npm run lint
   ```
4. **Create a production build** (optional)
   ```bash
   npm run build
   npm start
   ```

> **Node.js requirements:** The project targets Node.js **18.17.0** or later (see `package.json`).

## Project Structure
- `app/` – App Router pages, API routes, and shared components.
- `content/` – MDX templates for long-form reviews and platform comparisons.
- `apps/web/` – Legacy scaffolding for a separate web target with seed data.
- `app/lib/siteData.ts` – Mock data powering the landing and methodology pages.
- `app/api/**` – REST endpoints that validate requests with Zod and surface placeholder data for experiments.

Consult [`REPO_STRUCTURE.md`](REPO_STRUCTURE.md) for a file-by-file walkthrough, completion status, and follow-up suggestions.
R&D Map [`docs/rnd-map.md`] (rnd-map.md)
## Contributing
1. Fork the repository and create a feature branch.
2. Make your changes and ensure `npm run lint` passes.
3. Submit a pull request describing the motivation, implementation details, and testing strategy.

Issues and feature requests are welcome—open an issue to start the conversation.
