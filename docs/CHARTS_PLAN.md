# Plan: Add Domain-Specific Charts to Eqraa Desktop Dashboard

## Context
The Eqraa Desktop home page (`src/views/Index.tsx`) currently shows only 4 numeric `StatCard` components. Recharts 3.6.0 and the shadcn/ui `ChartContainer` wrapper (`src/components/ui/chart.tsx`) are installed but unused. The goal is to add 4 domain-specific charts to the home dashboard, with per-page chart integration on Attendance, Students, Quran, and Teachers pages.

## Implementation Steps

### Step 1: Create `src/lib/database/repositories/stats.ts`
All aggregate SQL query functions:
- `getAttendanceTrend(days: number)` — groups `attendance_records` by `record_date` and `status`, returns `{date, present, absent, excused}[]`
- `getStudentsByDepartment()` — groups active `students` by `department`, returns `{department, count}[]`
- `getPerformanceDistribution()` — groups `quran_sessions` by `performance_rating`, returns `{rating, count}[]`
- `getTeacherWorkload()` — joins `students` with `teachers`, groups by `teacher_id`, returns `{teacherName, studentCount}[]`

Follow existing repository pattern: `getDb()` → `db.select()` with parameterized queries. Use Arabic status strings ("حاضر", "غائب", "مأذون") matching DB canonical values.

### Step 2: Create `src/lib/i18n/charts.ts`
New i18n domain with `ChartsTranslations` interface and `charts: Record<Language, ChartsTranslations>` data. Keys:
- `attendance.title`, `attendance.present`, `attendance.absent`, `attendance.excused`, `attendance.last30Days`
- `departments.title`, `departments.quran`, `departments.tajweed`, `departments.tarbawi`
- `performance.title`, `performance.rating`, `performance.sessions`
- `workload.title`, `workload.students`
- `noData` — empty state message

### Step 3: Register `charts` domain in `src/lib/i18n/index.ts`
Following the existing pattern:
1. Add `export { type ChartsTranslations, charts } from './charts';` re-export
2. Add `import type { ChartsTranslations }` and `import { charts }`
3. Add `charts: ChartsTranslations` to `Translations` interface
4. Add `charts: charts.ar` and `charts: charts.en` to translations record

### Step 4: Create `src/components/charts/AttendanceTrendChart.tsx`
- Area chart using `ChartContainer` + Recharts `AreaChart`
- 3 stacked areas: present (green), absent (red), excused (amber)
- X-axis: dates, Y-axis: count
- Uses `ChartTooltip` with `ChartTooltipContent`
- Wrapped in `dir="ltr"` for RTL fix
- Props: `data: {date: string, present: number, absent: number, excused: number}[]`
- Shows translated labels via `ChartConfig` with `t.charts.*` labels
- Empty state when no data

### Step 5: Create `src/components/charts/DepartmentPieChart.tsx`
- Donut chart using `ChartContainer` + Recharts `PieChart` with `Pie` (inner/outer radius)
- 3 segments: quran (emerald), tajweed (red), tarbawi (cyan) — matching nav icon colors
- Uses `ChartTooltip` and `ChartLegend`
- Props: `data: {department: string, count: number}[]`
- Empty state when no data

### Step 6: Create `src/components/charts/PerformanceBarChart.tsx`
- Vertical bar chart using `ChartContainer` + Recharts `BarChart`
- X-axis: ratings 1-10, Y-axis: session count
- Single color (primary/teal)
- Props: `data: {rating: number, count: number}[]`
- Empty state when no data

### Step 7: Create `src/components/charts/TeacherWorkloadChart.tsx`
- Horizontal bar chart using `ChartContainer` + Recharts `BarChart` with `layout="vertical"`
- Y-axis: teacher names, X-axis: student count
- Color: secondary/amber
- Props: `data: {teacherName: string, studentCount: number}[]`
- Empty state when no data

### Step 8: Create `src/hooks/useChartStats.ts`
- Calls all 4 stats functions from `stats.ts` via `Promise.all`
- Returns `{ data, isLoading }` pattern matching `useHomeStats`
- Interface: `ChartStats { attendanceTrend, departmentDistribution, performanceDistribution, teacherWorkload }`

### Step 9: Modify `src/views/Index.tsx` — Add charts section
- Import `useChartStats` hook and 4 chart components
- Add a new section between stat cards and navigation grid
- 2x2 grid layout (`grid grid-cols-1 md:grid-cols-2 gap-4`)
- Each chart wrapped in a `Card` component with `CardHeader` (title) + `CardContent` (chart)
- Loading skeleton while `isLoading`
- Uses `t.charts.*` for section titles

### Step 10: Modify `src/views/Attendance.tsx` — Add AttendanceTrendChart
- Import `getAttendanceTrend` and `AttendanceTrendChart`
- Fetch trend data in existing `useEffect` or separate one
- Add chart in a `Card` above the attendance table
- Collapsible or always visible

### Step 11: Modify `src/views/Students.tsx` — Add DepartmentPieChart
- Import `getStudentsByDepartment` and `DepartmentPieChart`
- Fetch department data alongside existing student data
- Add chart in a `Card` in the summary area

### Step 12: Modify `src/views/Quran.tsx` — Add PerformanceBarChart
- Import `getPerformanceDistribution` and `PerformanceBarChart`
- Fetch performance data alongside existing session data
- Add chart in a `Card` above sessions list

### Step 13: Modify `src/views/Teachers.tsx` — Add TeacherWorkloadChart
- Import `getTeacherWorkload` and `TeacherWorkloadChart`
- Fetch workload data alongside existing teacher data
- Add chart in a `Card` in the summary area

### Step 14: RTL & Polish
- All chart containers use `dir="ltr"` wrapper (numbers are LTR even in Arabic)
- Labels use i18n translations
- Empty state shows `t.charts.noData` message
- Responsive: single column on mobile, 2-column on tablet+

## Key Files
- **New files:** `src/lib/database/repositories/stats.ts`, `src/lib/i18n/charts.ts`, `src/hooks/useChartStats.ts`, `src/components/charts/{AttendanceTrendChart,DepartmentPieChart,PerformanceBarChart,TeacherWorkloadChart}.tsx`
- **Modified files:** `src/lib/i18n/index.ts`, `src/views/Index.tsx`, `src/views/Attendance.tsx`, `src/views/Students.tsx`, `src/views/Quran.tsx`, `src/views/Teachers.tsx`

## Reuse
- `ChartContainer`, `ChartTooltip`, `ChartTooltipContent`, `ChartLegend`, `ChartLegendContent` from `src/components/ui/chart.tsx`
- `Card`, `CardHeader`, `CardTitle`, `CardContent` from `src/components/ui/card.tsx`
- `getDb()` from `src/lib/database/db.ts`
- `useLanguage()` from `src/contexts/LanguageContext.tsx`
- `formatNumber` from `src/lib/i18n/formatters.ts`
- `Skeleton` from `src/components/ui/skeleton.tsx` (for loading states)

## RTL Strategy
- Wrap each chart in `<div dir="ltr">` — chart axes/numbers are inherently LTR
- All text labels (titles, legends, tooltips) use translated i18n strings
- Card titles and section headers remain in document flow (RTL when Arabic)

## Verification
1. `pnpm run type-check` — no TypeScript errors
2. `pnpm run lint --quiet` — no lint errors
3. Visual: charts render in both light/dark mode
4. Visual: charts render with Arabic and English labels
5. Empty database: shows empty state, no errors
