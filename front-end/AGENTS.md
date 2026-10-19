# AGENTS.md

Next.js 16 (App Router) front-end for a user CRUD demo. The API is a **separate
Express + MongoDB server in `../server`** (outside this workspace), listening on
`:5000`. Every fetch hardcodes `http://localhost:5000/...` — there is no API base
env var. Start that server yourself or pages and mutations will fail.

## Commands

- `npm run dev` — dev server on `:3000`
- `npm run build` — production build; **also runs the TypeScript typecheck**
- `npx tsc --noEmit` — typecheck only (no dedicated script exists)
- `npm run lint` — runs bare `eslint` (v9 flat config, no path arg)
- No test runner, test script, formatter config, CI, or git repo. Don't go looking.

## Backend API (`../server/index.js`)

Express routes are mounted at the **root**, not under `/users`:

- `GET /` list · `GET /:id` · `POST /` · `PATCH /:id` · `DELETE /:id`

Mutations return raw Mongo result shapes. UI code checks `insertedId`,
`modifiedCount`, or `deletedCount`, then calls `router.refresh()` (or
`router.push` + `refresh`) to re-fetch. Follow this pattern; `_id` is an ObjectId
string.

## Non-obvious conventions

- `src/components/ui/` primitives are generated from **Base UI** (`@base-ui/react`), **not Radix**. That's why triggers use the `render={<Button .../>}` prop instead of `asChild`. Don't paste Radix/`asChild` shadcn snippets.
- `cn` comes from the **`"cn"` npm package**; `src/lib/utils.ts` only re-exports it. Import `{ cn } from "cn"` (as the ui components do), not from `@/lib/utils`.
- HeroUI (`@heroui/react`) is still a dependency and `@heroui/styles` is imported in `globals.css`, but no source file imports HeroUI components anymore (`users/add` was migrated to shadcn). Prefer shadcn for new UI.
- Styling uses CSS-var design tokens from `src/app/globals.css` (light + `.dark`). Use tokens (`bg-card`, `text-muted-foreground`, `border`) so dark mode keeps working; the app already supports it.
- Next 16 dynamic routes: `params` is a Promise — `const { id } = await params`, typed `Promise<{ id: string }>`.
- `next.config.ts` enables `cacheComponents` (PPR), `partialPrefetching`, and `reactCompiler`. Server components fetching mutable data pass `{ cache: "no-store" }`.

## Layout

- `src/app/page.tsx` home · `src/app/users/page.tsx` list (server component, fetches) · `src/app/users/add/page.tsx` (client form) · `src/app/users/[id]/page.tsx` detail
- `src/components/` domain components (`UserCart`, `UserEditDiaglog`, `DeleteConfirmDialog`) · `src/components/ui/` shadcn primitives
- `src/types/userData.ts` — `userSingleData` / `userData`
- `components.json`: shadcn style `base-nova`, aliases `@/components`, `@/components/ui`, `@/lib`, `@/hooks`; icon library `lucide-react`
