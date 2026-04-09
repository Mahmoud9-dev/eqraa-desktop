# Workflow: Eqraa Desktop Code Quality & Stability Initiative

> Generated from `docs/PRD-code-quality.md`
> Target release: v0.3.0

---

## Overview

Implements all 15 requirements across 4 phases (P0–P3) to harden stability, scalability, maintainability, and test confidence.

**Quality gates (run after each phase):**
```bash
pnpm run lint --quiet
pnpm run type-check
pnpm run test:unit
```

---

## Phase 1 (P0) — Critical

### Step 1: Create logger utility
**Files:** `src/lib/logger.ts` (NEW)
- Dev-only logger using `import.meta.env.DEV` (Vite compile-time constant; tree-shaken in production)
- Exports `logger.error()`, `logger.warn()`, `logger.info()`
- **Must be first:** REQ-01, REQ-05, REQ-06 all depend on it

### Step 2: Error Boundaries (REQ-01)
**Files:**
- `src/components/ErrorBoundary.tsx` (NEW) — class component with `componentDidCatch`
- `src/lib/i18n/errors.ts` — add `errorBoundaryRetry` key (AR: "حاول مرة أخرى" / EN: "Try Again")
- `src/App.tsx` — add `ErrorBoundaryWrapper` between `<Providers>` and `<AppRouter>`

**Design:**
- Class component (React 19 still requires it for error boundaries; no external library)
- Thin `ErrorBoundaryWrapper` function component reads `useLanguage()` and passes `language` prop to class
- Fallback UI: shadcn `Card` with `unknownError` i18n key, "Try Again" button (resets state), "Back Home" link
- Tailwind logical properties (`ps-/pe-/ms-/me-`) for RTL correctness
- `logger.error()` in dev only inside `componentDidCatch`

**Placement in `App.tsx`:**
```
BrowserRouter > Providers > ErrorBoundaryWrapper > AppRouter
```

### Step 3: Content Security Policy (REQ-02)
**Files:** `src-tauri/tauri.conf.json`

Change `"csp": null` to:
```
"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src ipc: http://ipc.localhost"
```

- `unsafe-inline` required for styles: Radix UI inline positioning, next-themes `<html>` style attribute
- `blob:` required for student images
- `data:` for font-src: Amiri font embedded as base64 in `src/lib/export/fonts/amiri-font.ts`
- **Verify:** Run `pnpm tauri:dev`, check DevTools console for CSP violations after change

### Step 4: Pagination infrastructure (REQ-03)
**New files:**
- `src/lib/database/pagination.ts` — `PaginationParams`, `paginationClause()` helper; extend existing `PaginatedResponse` from `src/types/index.ts:399` with `totalPages`
- `src/hooks/usePagination.ts` — reusable hook exposing `page`, `pageSize`, `nextPage`, `prevPage`, `goToPage`

**Two-tier strategy:**

*Time-series tables (add full pagination):*
| Repository | New function |
|---|---|
| `attendance.ts` | `getAttendanceRecordsPaginated()` |
| `educational-sessions.ts` | `getEducationalSessionsPaginated()` |
| `quran-sessions.ts` | `getQuranSessionsPaginated()` |
| `student-notes.ts` | `getAllStudentNotesPaginated()` |
| `tajweed.ts` | `getTajweedLessonsPaginated()` |
| `meetings.ts` | `getMeetingsPaginated()` |
| `suggestions.ts` | `getSuggestionsPaginated()` |

*Entity tables (safety LIMIT only, no UI change):*
- `students.ts` — append `LIMIT 500` to `getStudents()`, `getActiveStudents()`, `getStudentsWithTeachers()`
- `teachers.ts` — append `LIMIT 200` to `getTeachers()`, `getActiveTeachers()`

**View changes:**
- Wire `usePagination` + existing `src/components/ui/pagination.tsx` (shadcn, installed but unused) into: `Attendance.tsx` (exemplar), `Quran.tsx`, `Educational.tsx`, `Tajweed.tsx`, `Meetings.tsx`, `Suggestions.tsx`
- Move date-period filtering server-side with `WHERE record_date >= $N` in paginated query

### Step 5: Batch inserts (REQ-07)
**Files:** `src/lib/database/repositories/attendance.ts`, `src/lib/database/seed.ts`

Rewrite `insertAttendanceRecords()`:
- Multi-row `VALUES ($1,$2,$3), ($4,$5,$6), ...` instead of loop with one `db.execute()` per record
- Chunk at 100 records (SQLite 999-variable limit / 6 columns = 166 max)
- API surface unchanged — callers in `Attendance.tsx:313-331` need no edits
- Apply same batch pattern to seed inserts in `seed.ts`

---

## Phase 2 (P1) — Quality Hardening

### Step 6: Fix React Hook warnings (REQ-06)
**7 files** with `eslint-disable-next-line react-hooks/set-state-in-effect`:
- `Suggestions.tsx:42`, `Admin.tsx:52`, `Educational.tsx:91`, `Meetings.tsx:75`, `Quran.tsx:161`, `Tajweed.tsx:30`, `Teachers.tsx:91`

Fix: wrap each `loadData` function in `useCallback(async () => { ... }, [])`, add it to `useEffect` deps, remove all disable comments. Follows existing pattern in `Students.tsx:132`.

### Step 7: Eliminate `any` types (REQ-04)
**36 instances across 3 patterns:**

*Pattern A — `useState<any>(null)` (28 instances):* Extract concrete interfaces from mock data shapes:
- `Tarbiwi.tsx:63-64` — `TarbiwiProgram`, `TarbiwiAssignment`
- `EducationalEthicsBehavior.tsx:74` — `EthicsLesson`
- `EducationalFamilyPrograms.tsx:73` — `FamilyProgram`
- `EducationalGuidanceCounseling.tsx:74` — `CounselingSession`
- `EducationalIslamicLessons.tsx:72` — `IslamicLesson`
- `EducationalLifeSkills.tsx:72` — `LifeSkillsLesson`
- `EducationalStudentActivities.tsx:72` — `StudentActivity`
- `Schedule.tsx:37` — `ScheduleSession`
- `Subjects.tsx:58` — use existing `Lesson | Assignment | null`

*Pattern B — handler params `any` (7 instances):* Fix using interfaces from Pattern A

*Pattern C — `as any` cast (1 instance):*
- `Admin.tsx:186` — `setDepartment(v as any)` → `setDepartment(v as Department)` (type exists at `src/types/index.ts:7`)

**ESLint escalation:** `eslint.config.js:40` change `"warn"` → `"error"` for `@typescript-eslint/no-explicit-any`

### Step 8: Remove console statements (REQ-05)
**35 replacements** (39 total − 4 intentional in test files):

Replace with `logger.error()` / `logger.warn()`:
- `Students.tsx` (11 instances), `Attendance.tsx` (8), `Teachers.tsx` (5), `Quran.tsx` (2), `Educational.tsx` (3), `NotFound.tsx` (1), `main.tsx` (1), `LanguageContext.tsx` (2), `seed.ts` (1), `useHomeStats.ts` (1), `useChartStats.ts` (1)

Keep unchanged: `src/test/utils/test-utils.tsx:107,119`

**ESLint rule additions to `eslint.config.js`:**
```js
// In TS/TSX rules block:
"no-console": ["error", { allow: [] }],

// New override block:
{ files: ["**/*.test.ts", "**/*.test.tsx", "**/test/**"], rules: { "no-console": "off" } }
```

---

## Phase 3 (P2) — Internal Quality

### Step 9: Clean unused code (REQ-09)
- **`Students.tsx`** — Remove unused note dialog state (`_isAddNoteDialogOpen`, `_isEditNoteDialogOpen`) and handlers (`_handleAddNote`, `_handleEditNote`, `openAddNoteDialog`, `openEditNoteDialog`)
- **`Quran.tsx`** — Remove dead audio recording code: state vars (`isRecording`, `audioBlob`, `audioUrl`, `isPlaying`) and functions (`startRecording`, `stopRecording`, `playAudio`, `pauseAudio`, `handleFileUpload`)

### Step 10: Extract duplicate code (REQ-10)
- Rename `src/lib/supabaseTransformers.ts` → `src/lib/transformers.ts` (no Supabase in project)
- Add generic `snakeToCamel<T>()` utility; wire entity transformers into `Students.tsx:138-158` and `Attendance.tsx:243-249`
- Create `src/lib/labels.ts` (NEW) — extract `getDepartmentLabel()` from 4 duplicated locations (`Students:280`, `Teachers:145`, `Attendance:287`, `Admin:104`)
- Create `src/views/educational/EducationalSubPage.tsx` (NEW) — generic component replacing 6 near-identical Educational sub-views (~2,400 LOC eliminated); each sub-page becomes a ~10-line thin wrapper passing a config

### Step 11: Decompose monolithic views (REQ-08)
Directory-per-view pattern; barrel `index.tsx` keeps router imports unchanged.

**`src/views/students/`** (from 2,068 LOC):
```
index.tsx             -- barrel export
StudentsView.tsx      -- thin shell
useStudents.ts        -- all state, data fetching, CRUD, filter logic
StudentTable.tsx      -- "all students" table tab
StudentFormDialog.tsx -- add/edit dialog (mode: "add" | "edit")
StudentDeleteDialog.tsx
StudentNotesTab.tsx
StudentImagesTab.tsx
```

**`src/views/tarbiwi/`** (from 1,581 LOC):
```
index.tsx, TarbiwiView.tsx, useTarbiwi.ts
ProgramsTab.tsx, AssignmentsTab.tsx, AssessmentsTab.tsx
ProgramFormDialog.tsx, AssignmentFormDialog.tsx
```

**`src/views/exams/`** (from 1,559 LOC):
```
index.tsx, ExamsView.tsx, useExams.ts
ExamListTab.tsx, ExamResultsTab.tsx
ExamFormDialog.tsx, ResultFormDialog.tsx
```

**`src/views/quran-circles/`** (from 1,333 LOC):
```
index.tsx, QuranCirclesView.tsx, useQuranCircles.ts
CirclesTab.tsx, MembersTab.tsx, RecordsTab.tsx
```

Target: no file exceeds 500 LOC.

### Step 12: Add memoization (REQ-11)
- Wrap `StatCard` and `IconButton` with `React.memo` (pure presentational, stable props)
- Wrap all `src/components/charts/*.tsx` with `React.memo`
- Inside extracted hooks (from Step 11): `useMemo` for filtered/derived data, `useCallback` for all handlers
- Extract memoized `EducationalCard` from generic sub-page component

---

## Phase 4 (P3) — Performance & Testing

### Step 13: Lazy load routes (REQ-12)
- Create `src/components/LoadingFallback.tsx` (NEW) — reuse spinner from `Students.tsx:757-770`
- Convert all imports in `src/router.tsx` to `React.lazy()` except `Index` and `NotFound`
- Wrap `<Routes>` in `<Suspense fallback={<LoadingFallback />}>`

### Step 14: Remove date-fns (REQ-13)
- Add `formatDateISO(date: Date): string` to `src/lib/i18n/formatters.ts` — `d.toISOString().split("T")[0]`
- Replace single usage in `Attendance.tsx:283`: `format(cutoff, "yyyy-MM-dd")` → `formatDateISO(cutoff)`
- Remove `date-fns` from `package.json` and update lock file

### Step 15: Test coverage expansion (REQ-14)
**Fix first:** Add `LanguageProvider` to `AllTheProviders` in `src/test/utils/test-utils.tsx`

**Mock strategy:** `vi.mock("@/lib/database/repositories/...")` directly (not Supabase query chains)

**Priority order:**
1. Unit tests: `src/test/lib/transformers.test.ts`, `labels.test.ts`, `formatters.test.ts`
2. Hook tests via `renderHook`: `useStudents`, `useHomeStats`, `useChartStats`
3. Component tests: `StatCard`, `IconButton`, `PageHeader`
4. Integration tests: `StudentsView`, `Index`

Target: 80%+ coverage on all changed/new files.

### Step 16: E2E test suite (REQ-15)
- Install Playwright; configure `playwright.config.ts` with `webServer: { command: "pnpm dev" }`
- Page Object Model in `e2e/pages/`
- Priority tests:
  1. `navigation.spec.ts` — load app, visit each page
  2. `students-crud.spec.ts` — add, edit, delete student
  3. `attendance.spec.ts` — record attendance, save
  4. `language-toggle.spec.ts` — switch language, verify RTL layout
- Add `"test:e2e": "playwright test"` to `package.json`

---

## Execution Strategy

### Within-phase parallelism

| Phase | Sequence |
|---|---|
| P0 | Step 1 → (Steps 2 + 3 + 5 in parallel) → Step 4 |
| P1 | Steps 6 + 7 + 8 in parallel |
| P2 | Step 9 → Step 10 → Step 11 → Step 12 (sequential — each shrinks code the next refactors) |
| P3 | (Steps 13 + 14 in parallel) → Step 15 → Step 16 |

### PR strategy (one PR per phase)
```
PR 1: feat: add error boundaries, CSP, pagination, and batch inserts
PR 2: refactor: eliminate any types, console statements, and hook warnings
PR 3: refactor: decompose monolithic views and extract shared utilities
PR 4: perf: lazy routes, remove date-fns, expand tests, add E2E suite
```

---

## Reusable Assets Already in Codebase

| Asset | Path | Status |
|---|---|---|
| `PaginatedResponse<T>` type | `src/types/index.ts:399-404` | Exists — extend with `totalPages` |
| Pagination UI component | `src/components/ui/pagination.tsx` | Installed, never wired up |
| Snake-to-camel transformers | `src/lib/supabaseTransformers.ts` | Exists, completely unused — rename + wire |
| `Department` type | `src/types/index.ts:7` | Use for `Admin.tsx` `as any` fix |
| i18n error keys (`unknownError`, `backHome`) | `src/lib/i18n/errors.ts` | Add `errorBoundaryRetry` only |
| Test providers wrapper | `src/test/utils/test-utils.tsx` | Add `LanguageProvider` before writing tests |
