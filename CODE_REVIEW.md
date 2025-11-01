# FlowSystems MVP Review Notes

## 1. Home page composition (app/page.tsx)
- The home page leans entirely on the `Section` component with hard-coded structure. Consider extracting smaller components for repeated card layouts (metrics, categories, programs, value stack) so they can be re-used on category-specific views later. That will also make it easier to keep typography/spacing consistent when the real API ships.
- A few of the long description props (e.g., the Categories and Programs sections) are passed as template literals split across lines. When the JSX is compiled, the hard line breaks introduce stray spaces. Swapping to a single-line string or using `{"\n"}` for intentional breaks will prevent subtle typography issues when copy changes land.
- The roadmap list renders raw `<li>` elements inside a `<ul>` but each item is styled as a card. Extracting a `RoadmapCard` component (or switching to `<div role="listitem">`) would let you add call-to-action buttons or progress indicators without duplicating markup.

## 2. Section component flexibility (app/components/Section.tsx)
- `Section` hardcodes both layout and semantic structure. We’ll probably want to render some sections as ordered lists or grids without the extra `<div className="space-y-4">` wrapper. Accepting an optional `as` prop or exposing a `className`/`contentClassName` override would make the component more adaptable while keeping the default look intact.
- Consider forwarding additional props (e.g., `id`) onto the outer `<section>` so in-page navigation links (table of contents, skip links) can target sections without wrapping them externally.
- The component assumes it always receives children. A guard that returns `null` when `children` is falsy (or typing it as `ReactNode | null`) would prevent runtime issues if a data fetch returns empty collections.

## 3. Dynamic category route (app/category/[slug]/page.tsx)
- The dynamic route currently just echoes the slug. Importing the category data (`app/lib/siteData`) or re-exporting from `/app/data` and deriving the category record would let this view show meaningful content now and mirror the API shape we expect later. It will also let you return `notFound()` when the slug is invalid.
- You may also want to define `generateStaticParams` for the known mock categories so the pages pre-render correctly on Vercel. That keeps the MVP deployable without adding runtime data fetching.

## 4. Platform catalog route (app/platform/[slug]/page.tsx)
- The page fetches from `/api/catalog/platforms`, but there are no route handlers or static JSON fixtures to satisfy that request. Add a mock data module under `app/data/catalog/platforms.ts` and surface it through both the API route (`app/api/catalog/platforms/route.ts`) and direct imports for build-time rendering.
- `headers()` is used to derive the base URL, which will be undefined during static generation. Falling back to `http://localhost:3000` (or better, switching to `fetch` with a relative path when running on the server) will avoid 500s during `next dev` and `next build`.
- Returning `notFound()` inline in `find()` is clever, but it will throw before the function finishes, which makes TypeScript infer `platform` as `never`. Handle the missing case explicitly so TypeScript understands the object shape.

## 5. Review and stack routes (app/review/[slug]/page.tsx, app/stack/[slug]/page.tsx)
- Both routes only echo the slug. The mock builder in `app/lib/content/review-template.ts` is great—wire it into the review page to generate structured content (summary, factor breakdown, markdown body) based on the slug. That will demonstrate the intended UX and exercise the template code.
- For stacks, create a data set describing the weekly stack (platform list, key metrics, recommended flows). Rendering cards/tables here will validate the layout components and give the search page richer targets to link to.

## 6. Dashboard & admin surfaces (app/dashboard/page.tsx, app/admin/*)
- Several admin and dashboard pages are minified JSX strings (e.g., `export default function Page(){/* ... */return(<div>...`) which hurts readability and makes future edits error-prone. Reformat them using standard JSX syntax so contributors can extend them without mental overhead.
- Flesh out the dashboard with mock metric panels: status badges, charts rendered via lightweight components (e.g., Tailwind-styled SVG sparkline), and key actions. Each admin page should list relevant tasks (import queue, publishing workflow, scoring rules) using the same design tokens as the rest of the app.

## 7. Data organization & APIs
- The spec mentions `/app/data/`, but the directory does not exist. Introduce structured JSON/TS fixtures for platforms, categories, reviews, comparisons, and dashboard metrics. Keeping them co-located (e.g., `/app/data/catalog/platforms.ts`) makes it straightforward to reuse between pages and API routes.
- Stub the `/app/api/*` routes so that `fetch` calls in the app can succeed. Even if pages import data directly today, having API handlers returning mock JSON will help when wiring up client components or integrating with the future backend.

## 8. Navigation & layouts
- There is no global navigation or breadcrumb structure yet. Implement a shared layout component (header + sidebar for admin routes, top nav + footer for customer-facing routes) so visitors can move between Platform, Category, Review, Comparison, and Dashboard pages without typing URLs.
- Consider adding loading/error states for routes that will eventually fetch data (e.g., `app/platform/[slug]/loading.tsx`). That will make the transition to real APIs smoother and give designers an early look at the skeleton experience.

## 9. Type safety & utilities
- Centralise shared types (e.g., `Platform`, `Category`, `Review`) in a dedicated module under `app/lib/types.ts` to avoid redefining interfaces per page. When the backend arrives, swapping the import to generated types will be trivial.
- Utility helpers such as `formatCurrency` or `formatPercentage` will tidy up repeated string interpolation and ensure localized formatting once we add i18n.

## 10. Search, newsletter, and comparison flows
- The search (`app/search/page.tsx`), newsletter (`app/newsletter/page.tsx`), and comparison placeholders return only headings. Introduce mock form controls (search input, filter pills, signup form) and sample result lists so stakeholders can click through the intended journeys.
- A comparison experience is entirely missing even though it is a core route. Create `/app/compare/page.tsx` (and, if needed, `/app/compare/[slug]/page.tsx`) that showcases how two platforms line up across metrics, using the same data fixtures as the platform pages.

