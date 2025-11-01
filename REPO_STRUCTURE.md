# Repository Structure Overview

This document lists every tracked file in the repository, highlights whether it is complete or a placeholder, and calls out blank or incomplete areas that may need follow-up work.

## Legend
- ✅ &ndash; Implemented / meaningfully populated
- ⚠️ &ndash; Placeholder, stub, or still missing core behaviour
- 📄 &ndash; Documentation or template content
- 📦 &ndash; Data/configuration scaffold

## Root
| Path | Status | Notes |
| --- | --- | --- |
| `README.md` | ⚠️ | Minimal placeholder repeating the project name; lacks setup, contribution, or architecture guidance. |
| `REPO_STRUCTURE.md` | 📄 | This structure reference. |
| `app/` | — | Next.js application tree containing UI routes, APIs, components, and shared libraries. |
| `apps/` | — | Legacy/ancillary assets for a `web` target with seed data. |
| `content/` | — | MDX templates for reviews and comparisons. |

## `app/`
### Top-level files & shared utilities
| Path | Status | Notes |
| --- | --- | --- |
| `app/page.tsx` | ✅ | Primary marketing homepage rendering multiple sections powered by `siteData`. |
| `app/components/Section.tsx` | ✅ | Reusable section wrapper exposing eyebrow, title, description, and body slots. |
| `app/lib/siteData.ts` | ✅ | Rich mock dataset containing metrics, value stack, research streams, etc., for marketing pages. |
| `app/lib/content/review-template.ts` | ✅ | Utilities/types for producing review payloads from MDX templates with slug normalisation. |

### Static marketing routes
| Path | Status | Notes |
| --- | --- | --- |
| `app/about/page.tsx` | ✅ | Detailed methodology page composed of multiple `Section` components. |
| `app/community/page.tsx` | ✅ | Community overview with spotlight, rituals, collaboration, and impact sections. |
| `app/dashboard/page.tsx` | ⚠️ | Placeholder dashboard showing only headings and comment markers; no actionable UI. |
| `app/newsletter/page.tsx` | ⚠️ | Newsletter landing stub with minimal copy and `newsletter_signup` marker. |
| `app/search/page.tsx` | ⚠️ | Basic search placeholder with headings and instrumentation comments. |

### Dynamic marketing routes
| Path | Status | Notes |
| --- | --- | --- |
| `app/category/[slug]/page.tsx` | ⚠️ | Echoes the slug; lacks category lookup and curated content. |
| `app/compare/[a]/vs/[b]/page.tsx` | ⚠️ | Displays decoded platform slugs without comparison details. |
| `app/course/[slug]/page.tsx` | ⚠️ | Lesson stub with heading and `lesson_complete` marker; no curriculum data. |
| `app/newsletter/[slug]/page.tsx` | ⚠️ | Shows decoded issue slug only; article body is absent. |
| `app/platform/[slug]/page.tsx` | ⚠️ | Platform detail placeholder that prints the slug and nothing else. |
| `app/review/[slug]/page.tsx` | ⚠️ | Review stub not yet wired to content templates or API data. |
| `app/stack/[slug]/page.tsx` | ⚠️ | "Stack of the Week" placeholder showing the slug only. |

### Admin area (`app/admin`)
| Path | Status | Notes |
| --- | --- | --- |
| `app/admin/backlog/page.tsx` | ⚠️ | Skeleton backlog page with heading and `backlog_updated` comment. |
| `app/admin/import/page.tsx` | ⚠️ | Bare import placeholder containing a heading and `import_completed` marker. |
| `app/admin/publishing/page.tsx` | ⚠️ | Publishing stub with heading but no workflow controls. |
| `app/admin/scoring/page.tsx` | ⚠️ | Minimal scoring admin view with heading and `weights_published` comment. |

### API routes (`app/api`)
| Path | Status | Notes |
| --- | --- | --- |
| `app/api/admin/backlog/route.ts` | ✅ | Bearer-protected backlog handler supporting GET/POST/PATCH with structured errors. |
| `app/api/ai/flowbot/chat/route.ts` | ⚠️ | Echo-style POST endpoint returning a stub chat payload. |
| `app/api/catalog/platforms/route.ts` | ⚠️ | Returns an empty catalog array; no real data integration. |
| `app/api/community/comments/route.ts` | ⚠️ | Placeholder GET (empty list) and POST acknowledgement. |
| `app/api/content/reviews/[slug]/route.ts` | ✅ | Generates review responses from templates with validation and error handling. |
| `app/api/education/courses/route.ts` | ⚠️ | Responds with an empty course list; awaiting real catalog data. |
| `app/api/scoring/evaluate/route.ts` | ✅ | Normalises factor inputs, validates weights, and returns totals + breakdown. |
| `app/api/scoring/weights/[stage]/route.ts` | ⚠️ | Stage weights endpoint echoing payloads; persists no data. |

## `apps/web`
| Path | Status | Notes |
| --- | --- | --- |
| `apps/web/lib/.gitkeep` | 📄 | Empty marker keeping the `lib` directory under version control. |
| `apps/web/public/data/weights.json` | 📦 | Empty JSON object placeholder for public scoring weights. |
| `apps/web/seeds/weights.json` | 📦 | Empty seed data mirror of the public weights file. |

## `content/templates`
| Path | Status | Notes |
| --- | --- | --- |
| `content/templates/comparison.template.mdx` | 📄 | Structured MDX comparison template with sections for pricing, migration, evaluation, etc. |
| `content/templates/review.template.mdx` | 📄 | Review MDX template defining defaults, factor lists, and storytelling scaffolding. |

## Follow-up Suggestions
1. Flesh out the numerous ⚠️ dynamic and admin routes with real data fetching, form handling, or at least TODO comments that outline the intended experience.
2. Populate the scoring weight JSON stubs and connect them to the scoring API so evaluation endpoints and admin views share consistent sample data.
3. Replace the placeholder `README.md` with setup instructions, architectural overview, and contribution guidelines to help new collaborators get started.
