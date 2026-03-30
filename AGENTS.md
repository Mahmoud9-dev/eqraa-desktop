# Eqraa Desktop — Agent Reference

## What This Is

Quran education center management desktop app. Tauri 2.0 + Vite + React + TypeScript.
Arabic-first (RTL default), bilingual AR/EN via custom i18n system.
Single admin user — no authentication, no login, no role system.

## Tech Stack

- **Shell:** Tauri 2.0 (Rust backend, native WebView)
- **Bundler:** Vite
- **Frontend:** React 19 + React Router v7 (client-side SPA)
- **Database:** SQLite via `tauri-plugin-sql` (local, IPC-based `db.select()` / `db.execute()`)
- **UI:** Tailwind CSS + shadcn/ui + Radix primitives
- **Forms:** React Hook Form + Zod
- **Testing:** Vitest (unit) + Playwright (e2e planned)
- **i18n:** Custom system in `src/lib/i18n/` with `useLanguage()` hook
- **Themes:** next-themes (works outside Next.js)

## Quality Gates

| Check         | Command                                | Blocks Commit |
|:--------------|:---------------------------------------|:--------------|
| Lint          | `pnpm run lint`                        | Yes           |
| Type-check    | `pnpm run type-check`                 | Yes           |
| Unit tests    | `pnpm run test:unit`                  | Yes           |
| i18n audit    | `node scripts/check-i18n.js --strict` | No (advisory) |
| Full build    | `pnpm run build`                      | No (CI only)  |

## Architecture Patterns

- **Views:** `src/views/` — page-level components
- **Components:** `src/components/` — reusable UI (`ui/`, domain-specific)
- **Database:** `src/lib/database/db.ts` (init + `getDb()` singleton), `src/lib/database/repositories/*.ts` (one per table)
- **i18n:** `src/lib/i18n/` — domain-split translation files, assembled in `index.ts`
- **Contexts:** `src/contexts/` — React contexts (`LanguageContext`, etc.)
- **Lib:** `src/lib/` — utilities, constants, Zod schemas
- **Tauri Config:** `src-tauri/tauri.conf.json` (app config), `src-tauri/capabilities/default.json` (plugin permissions)

## Database Notes

- DB values use Arabic canonical strings (e.g., status "حاضر", priority "عالي")
- Boolean fields use INTEGER (0/1), not boolean
- UUID generated in JS via `crypto.randomUUID()` before insert
- Arrays/JSON stored as TEXT (JSON.stringify/parse)
- All queries must be parameterized — no string interpolation in SQL

## i18n Rules

- No hardcoded Arabic strings in JSX — use `t.*` or `tFunc()`
- Use Tailwind logical properties (`ms-/me-`, `ps-/pe-`, `start-/end-`) not physical (`ml-/mr-`)
- DB canonical values stay Arabic; only display labels get translated

## Commit Discipline

- One logical change per commit
- Conventional commit format: `type(scope): description`
- Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`
- All quality gates must pass before committing

## File Naming

- Components: `PascalCase.tsx`
- Utilities/lib: `camelCase.ts`
- i18n domains: `camelCase.ts` (e.g., `students.ts`, `common.ts`)
- Tests: `*.test.ts` / `*.test.tsx` colocated in `src/test/`
