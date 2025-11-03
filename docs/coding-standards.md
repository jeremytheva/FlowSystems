# Coding Standards

These guidelines keep the Flow Systems codebase consistent while modules evolve.

## TypeScript Practices
- Prefer explicit interfaces and types exported from module roots (`modules/<Name>/index.ts`).
- Avoid `any`; when stubbing features use `unknown` or discriminated unions to preserve type safety.
- Keep module APIs synchronous in `init` and asynchronous in `loadData`/`runAction` to simplify orchestration.

## Module Structure
- Every module maintains `components/`, `hooks/`, `utils/`, and `api/` subdirectories. Use `.gitkeep` or README stubs until concrete implementations land.
- Shared helpers across modules should live in `modules/utils/` or `/lib` to prevent duplication.

## Styling & UI
- Reuse existing design tokens from `styles/` and component primitives under `app/components`.
- Stick to Tailwind utility conventions already present in the Next.js app.

## Documentation
- Update `/docs` alongside significant module changes so planning artifacts stay current.
- Document complex flows with comments using the `/** ... */` convention for easy discovery.
