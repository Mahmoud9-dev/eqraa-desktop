# PRD: Eqraa Desktop - Code Quality & Stability Initiative

**Author:** Code Analysis (automated)
**Date:** 2026-03-24
**Version:** 1.0
**Status:** Draft
**App Version:** 0.2.0

---

## 1. Problem Statement

An exhaustive static analysis of Eqraa Desktop v0.2.0 surfaced systemic quality gaps that, if left unaddressed, will degrade stability, performance, and maintainability as the codebase and user data grow. The three most urgent risks are:

1. **No crash recovery** - Zero error boundaries means any component exception kills the entire app with no user-facing fallback.
2. **Unbounded data loading** - 12 database queries fetch all rows without pagination. Attendance records, which grow daily, are loaded entirely into memory then filtered in JavaScript.
3. **Eroding type safety** - 41 `any` types and 89 lint warnings signal increasing deviation from the project's strict TypeScript standard.

### Current Metrics Baseline

| Metric | Current | Target |
|--------|---------|--------|
| TypeScript errors | 0 | 0 |
| ESLint errors | 0 | 0 |
| ESLint warnings | 89 | < 10 |
| `any` type usages | 41 | 0 |
| `console.*` in production | 40+ | 0 |
| Unused imports/variables | 29 | 0 |
| Error boundaries | 0 | 1 per route group |
| Unbounded SELECT queries | 12 | 0 |
| React.memo wrappers | 0 | Key list/card components |
| Test files | 2 | 15+ |
| Test cases | 46 | 200+ |
| View/hook/repo test coverage | 0% | 80% |
| Largest single file | 2,068 LOC | < 500 LOC |

---

## 2. Goals

1. **Stability**: Prevent full-app crashes from component errors.
2. **Scalability**: Ensure performance holds as student/attendance data grows across academic years.
3. **Maintainability**: Reduce file complexity, eliminate dead code, and enforce strict typing.
4. **Confidence**: Establish test coverage sufficient to catch regressions before release.

### Non-Goals

- Feature additions or UI redesign.
- Backend/server migration (app remains local SQLite).
- Changing the core architecture (repository pattern, custom i18n, etc.).
- Achieving 100% test coverage.

---

## 3. Success Criteria

| Criterion | Measurement |
|-----------|-------------|
| Zero full-app crashes from component errors | Error boundary catches and displays fallback UI |
| Attendance page loads in < 200ms with 10,000 records | Paginated query returns max 100 rows per page |
| `pnpm run lint --quiet` exits with 0 warnings | CI enforces `--max-warnings 0` |
| `pnpm run type-check` passes with 0 `any` types | ESLint rule `@typescript-eslint/no-explicit-any: error` |
| All new/modified code has tests | Coverage gate at 80% for changed files |
| No view file exceeds 500 LOC | Enforced by review checklist |

---

## 4. Requirements

### 4.1 P0 - Critical (Must ship before v0.3.0)

#### REQ-01: Error Boundaries

**What:** Add React error boundary components that catch rendering errors and display a localized fallback UI instead of crashing the app.

**Where:**
- `src/components/ErrorBoundary.tsx` (new)
- `src/router.tsx` (wrap route groups)

**Acceptance Criteria:**
- [ ] ErrorBoundary component created with `componentDidCatch` lifecycle
- [ ] Fallback UI shows localized error message (AR/EN) with "retry" action
- [ ] Each top-level route wrapped in an ErrorBoundary
- [ ] Throwing an error in any view renders the fallback, not a white screen
- [ ] Error details logged (not to console - see REQ-05)

#### REQ-02: Content Security Policy

**What:** Enable CSP in Tauri configuration to restrict script/style sources.

**Where:**
- `src-tauri/tauri.conf.json` (security.csp field)

**Acceptance Criteria:**
- [ ] CSP set to allow only `self` and required inline styles (Tailwind)
- [ ] App loads and functions normally with CSP enabled
- [ ] No CSP violations in dev console during full feature walkthrough

#### REQ-03: Query Pagination

**What:** Add LIMIT/OFFSET support to all unbounded SELECT queries. Views must support paginated data loading.

**Where:**
- `src/lib/database/repositories/attendance.ts`
- `src/lib/database/repositories/students.ts`
- `src/lib/database/repositories/student-notes.ts`
- `src/lib/database/repositories/meetings.ts`
- `src/lib/database/repositories/suggestions.ts`
- `src/lib/database/repositories/tajweed.ts`
- Corresponding view files that call these repositories

**Acceptance Criteria:**
- [ ] All `SELECT *` queries accept optional `limit` and `offset` parameters
- [ ] Default limit of 100 rows when no explicit limit provided
- [ ] `getAttendanceRecords()` returns paginated results with total count
- [ ] Attendance view implements "load more" or page-based navigation
- [ ] Students view implements pagination for the student list
- [ ] Performance test: 10,000 attendance records load < 200ms

---

### 4.2 P1 - High (Ship within 2 sprints of v0.3.0)

#### REQ-04: Eliminate `any` Types

**What:** Replace all 41 `any` type annotations with proper TypeScript types.

**Where:**
- `src/views/Tarbiwi.tsx` (6 instances)
- `src/views/Educational*.tsx` (22 instances across 6 files)
- `src/views/Schedule.tsx` (3 instances)
- `src/views/Subjects.tsx` (1 instance)

**Acceptance Criteria:**
- [ ] Zero `any` types in codebase
- [ ] ESLint rule `@typescript-eslint/no-explicit-any` set to `error`
- [ ] CI fails on any new `any` introduction
- [ ] All replaced types are meaningful (no `unknown` without narrowing)

#### REQ-05: Remove Console Statements

**What:** Remove all `console.log`, `console.error`, `console.warn` calls from production code. Replace with appropriate error handling (toast notifications for user-facing errors, silent catch for expected failures).

**Where:**
- `src/views/Students.tsx` (11 calls)
- `src/views/Attendance.tsx` (8 calls)
- `src/views/Teachers.tsx` (5 calls)
- `src/views/Educational.tsx` (3 calls)
- `src/contexts/LanguageContext.tsx` (2 calls)
- `src/hooks/useHomeStats.ts`, `useChartStats.ts` (2 calls)
- `src/main.tsx` (1 call)
- `src/views/NotFound.tsx` (1 call)
- `src/views/Quran.tsx` (2 calls)
- `src/lib/database/seed.ts` (1 call)

**Acceptance Criteria:**
- [ ] Zero `console.*` calls in `src/` (excluding test files)
- [ ] ESLint rule `no-console: error` enabled
- [ ] User-facing errors show toast via Sonner
- [ ] Database/system errors caught silently or shown as toast
- [ ] CI fails on any new console statement

#### REQ-06: Fix React Hook Warnings

**What:** Resolve missing dependency warnings in useEffect hooks.

**Where:**
- `src/views/Suggestions.tsx:45` - Missing `loadSuggestions` dependency
- `src/views/Admin.tsx:55` - Missing `loadData` dependency

**Acceptance Criteria:**
- [ ] Both hooks include correct dependency arrays
- [ ] No infinite render loops introduced
- [ ] `react-hooks/exhaustive-deps` reports 0 warnings

#### REQ-07: Batch Database Inserts

**What:** Replace loop-based individual INSERT calls with batched multi-row INSERT for attendance records.

**Where:**
- `src/lib/database/repositories/attendance.ts:28-51`

**Acceptance Criteria:**
- [ ] `insertAttendanceRecords()` uses a single multi-row INSERT statement
- [ ] Transaction wraps the batch insert for atomicity
- [ ] Inserting 50 attendance records completes in < 100ms (currently N * IPC roundtrip)
- [ ] Existing callers unchanged (same function signature)

---

### 4.3 P2 - Medium (Ship within v0.4.0)

#### REQ-08: Decompose Monolithic Views

**What:** Extract large view files into custom hooks (data/logic) and sub-components (UI). Target: no file exceeds 500 LOC.

**Priority order by file size:**
1. `src/views/Students.tsx` (2,068 LOC) -> `useStudents()` hook + `StudentTable`, `StudentDialog`, `StudentFilters`, `StudentNotes` components
2. `src/views/Tarbiwi.tsx` (1,581 LOC) -> Similar decomposition
3. `src/views/Exams.tsx` (1,559 LOC) -> `useExams()` hook + sub-components
4. `src/views/QuranCircles.tsx` (1,333 LOC) -> `useQuranCircles()` hook + sub-components

**Acceptance Criteria:**
- [ ] Top 4 largest views decomposed into hook + sub-components
- [ ] No new file exceeds 500 LOC
- [ ] All existing functionality preserved (no regressions)
- [ ] Custom hooks are independently testable
- [ ] Sub-components accept clear prop interfaces

#### REQ-09: Clean Unused Code

**What:** Remove all unused imports, variables, and dead code flagged by ESLint.

**Where:** 29 warnings across:
- `src/views/Quran.tsx` (10 unused vars - audio recording code)
- `src/views/Students.tsx` (4 unused vars - note dialog)
- `src/views/Tarbiwi.tsx` (3 unused Avatar imports)
- `src/views/QuranCircles.tsx` (3 unused vars)
- `src/views/Educational.tsx` (5 unused Select imports)
- `src/views/Subjects.tsx` (3 unused vars)
- `src/views/Schedule.tsx` (1 unused var)
- `src/views/Exams.tsx` (1 unused var)

**Acceptance Criteria:**
- [ ] `pnpm run lint --quiet` returns 0 warnings related to unused code
- [ ] Dead audio recording code in Quran.tsx either removed or feature-completed
- [ ] Unused note dialog code in Students.tsx either removed or feature-completed

#### REQ-10: Extract Duplicate Code

**What:** Centralize repeated patterns into shared utilities.

**Duplications identified:**
1. **Type transformations** (snake_case -> camelCase mapping) - repeated in every view
2. **Status/department label maps** - duplicated across Students, Attendance, Quran views
3. **Export report headers** - copy-pasted per view
4. **Educational sub-views** (6 files) - nearly identical structure

**Where (new files):**
- `src/lib/transformers.ts` - DB row to frontend model mappers
- `src/lib/labels.ts` - Shared status/department/priority display labels
- `src/lib/export-helpers.ts` - Common report header construction

**Acceptance Criteria:**
- [ ] Type transformation logic exists in one place
- [ ] Status/department labels defined once, imported everywhere
- [ ] Export header construction shared across all views that export
- [ ] No duplicate label map definitions across views

#### REQ-11: Add React Memoization

**What:** Apply `useMemo` for expensive filter operations and `React.memo` for frequently re-rendered components.

**Where:**
- `src/views/Students.tsx:269` - `filteredStudents` needs `useMemo`
- `src/views/Attendance.tsx:280` - `filteredAttendanceRecords` needs `useMemo`
- `src/components/StatCard.tsx` - Wrap with `React.memo`
- `src/components/IconButton.tsx` - Wrap with `React.memo`
- `src/components/charts/*.tsx` - Wrap chart components with `React.memo`

**Acceptance Criteria:**
- [ ] Filter operations wrapped in `useMemo` with correct dependencies
- [ ] StatCard, IconButton, and chart components wrapped in `React.memo`
- [ ] No unnecessary re-renders when parent state changes (verified with React DevTools)
- [ ] Color mapping functions moved outside component or wrapped in `useCallback`

---

### 4.4 P3 - Low (Backlog / v0.5.0+)

#### REQ-12: Lazy Load Routes

**What:** Convert eager imports in `src/router.tsx` to `React.lazy()` for large views.

**Where:**
- `src/router.tsx` - Replace static imports with dynamic for views > 500 LOC

**Acceptance Criteria:**
- [ ] Views > 500 LOC loaded via `React.lazy()` + `<Suspense>`
- [ ] Loading skeleton shown during chunk load
- [ ] No visible flicker on fast connections

#### REQ-13: Consolidate Date Libraries

**What:** Remove `date-fns` dependency; use `Intl` API (already implemented in `src/lib/i18n/formatters.ts`) for all date formatting.

**Acceptance Criteria:**
- [ ] `date-fns` removed from `package.json`
- [ ] All date formatting uses `Intl.DateTimeFormat` via existing formatters
- [ ] Bundle size reduced by date-fns removal

#### REQ-14: Test Coverage Expansion

**What:** Expand test suite to cover repositories, hooks, and critical view interactions.

**New test files:**
- `src/test/repositories/*.test.ts` - One per repository (10 files)
- `src/test/hooks/*.test.ts` - `useHomeStats`, `useChartStats`
- `src/test/contexts/LanguageContext.test.tsx` - i18n provider
- `src/test/components/*.test.tsx` - Key reusable components

**Acceptance Criteria:**
- [ ] 15+ test files (up from 2)
- [ ] 200+ test cases (up from 46)
- [ ] 80%+ coverage on repositories and hooks
- [ ] Database repositories tested with mock SQLite
- [ ] i18n context tested for both AR and EN locales

#### REQ-15: E2E Test Suite

**What:** Add Playwright E2E tests for critical user flows.

**Flows to cover:**
1. App startup and dashboard loads
2. Add/edit/delete student
3. Record attendance for a class
4. Create and grade an exam
5. Language toggle (AR <-> EN)
6. Theme toggle (light <-> dark)
7. Database export/import

**Acceptance Criteria:**
- [ ] Playwright configured with `playwright.config.ts`
- [ ] 7 critical flow tests passing
- [ ] CI runs E2E tests on PR to main
- [ ] Screenshots captured on failure

---

## 5. Technical Constraints

- **No Node.js backend** - All logic must remain client-side (Tauri + SQLite)
- **Single admin user** - No auth system needed
- **RTL-first** - All UI changes must work in Arabic RTL and English LTR
- **i18n compliance** - No hardcoded Arabic strings in JSX; use `t.*` or `tFunc()`
- **Tailwind logical properties** - Use `ms-/me-/ps-/pe-/start-/end-`, not `ml-/mr-/pl-/pr-/left-/right-`
- **Parameterized queries only** - No string interpolation in SQL
- **Existing shadcn/ui** - Use existing UI primitives; no new component libraries

---

## 6. Out of Scope

- New features (CRUD, reporting, notifications)
- Mobile app development
- Cloud/server migration
- User authentication or role system
- Database schema changes (beyond adding indexes)
- UI/UX redesign

---

## 7. Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| View decomposition introduces regressions | HIGH | MEDIUM | Add component tests before splitting; snapshot tests for UI |
| Pagination breaks existing workflows | MEDIUM | LOW | Default limit high enough (100) to cover typical use; "load all" escape hatch |
| Removing console.error hides real bugs | MEDIUM | LOW | Replace with toast notifications; add error boundary logging |
| Batch INSERT changes data integrity | HIGH | LOW | Wrap in transaction; test with concurrent writes |
| CSP blocks legitimate app resources | MEDIUM | MEDIUM | Test full feature walkthrough with CSP enabled before merge |

---

## 8. Implementation Order

```
Phase 1 (P0): Error Boundaries -> CSP -> Query Pagination
Phase 2 (P1): any types -> Console removal -> Hook fixes -> Batch inserts
Phase 3 (P2): View decomposition -> Unused code -> Deduplication -> Memoization
Phase 4 (P3): Lazy loading -> date-fns removal -> Test coverage -> E2E tests
```

Each phase should be a separate PR (or PR chain) with its own test verification before merge.

---

## 9. Appendix: Files by Priority

### P0 Files (Must Touch)
- `src/components/ErrorBoundary.tsx` (NEW)
- `src/router.tsx`
- `src-tauri/tauri.conf.json`
- `src/lib/database/repositories/attendance.ts`
- `src/lib/database/repositories/students.ts`
- `src/lib/database/repositories/student-notes.ts`
- `src/lib/database/repositories/meetings.ts`
- `src/lib/database/repositories/suggestions.ts`
- `src/lib/database/repositories/tajweed.ts`
- `src/views/Attendance.tsx`
- `src/views/Students.tsx`

### P1 Files (Should Touch)
- `src/views/Tarbiwi.tsx`
- `src/views/Educational*.tsx` (6 files)
- `src/views/Schedule.tsx`
- `src/views/Subjects.tsx`
- `src/views/Teachers.tsx`
- `src/views/Quran.tsx`
- `src/contexts/LanguageContext.tsx`
- `src/hooks/useHomeStats.ts`
- `src/hooks/useChartStats.ts`
- `src/main.tsx`
- `src/views/Suggestions.tsx`
- `src/views/Admin.tsx`

### P2 Files (Could Touch)
- `src/lib/transformers.ts` (NEW)
- `src/lib/labels.ts` (NEW)
- `src/lib/export-helpers.ts` (NEW)
- `src/components/StatCard.tsx`
- `src/components/IconButton.tsx`
- `src/components/charts/*.tsx`
- All views > 500 LOC (decomposition)
