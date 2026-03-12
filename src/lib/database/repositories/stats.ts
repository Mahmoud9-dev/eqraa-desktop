import { getDb } from "../db";

export interface AttendanceTrendRow {
  date: string;
  present: number;
  absent: number;
  excused: number;
}

export interface DepartmentCountRow {
  department: string;
  count: number;
}

export interface PerformanceDistributionRow {
  rating: number;
  count: number;
}

export interface TeacherWorkloadRow {
  teacherName: string;
  studentCount: number;
}

export async function getAttendanceTrend(days: number = 30): Promise<AttendanceTrendRow[]> {
  const db = await getDb();
  const rows = await db.select<{ record_date: string; status: string; cnt: number }[]>(
    `SELECT record_date, status, COUNT(*) as cnt
     FROM attendance_records
     WHERE record_date >= date('now', $1)
     GROUP BY record_date, status
     ORDER BY record_date ASC`,
    [`-${days} days`]
  );

  const grouped = new Map<string, AttendanceTrendRow>();
  for (const row of rows) {
    if (!grouped.has(row.record_date)) {
      grouped.set(row.record_date, { date: row.record_date, present: 0, absent: 0, excused: 0 });
    }
    const entry = grouped.get(row.record_date)!;
    if (row.status === "حاضر") entry.present = row.cnt;
    else if (row.status === "غائب") entry.absent = row.cnt;
    else if (row.status === "مأذون") entry.excused = row.cnt;
  }

  return Array.from(grouped.values());
}

export async function getStudentsByDepartment(): Promise<DepartmentCountRow[]> {
  const db = await getDb();
  return db.select<DepartmentCountRow[]>(
    `SELECT department, COUNT(*) as count
     FROM students
     WHERE is_active = 1
     GROUP BY department
     ORDER BY count DESC`
  );
}

export async function getPerformanceDistribution(): Promise<PerformanceDistributionRow[]> {
  const db = await getDb();
  return db.select<PerformanceDistributionRow[]>(
    `SELECT performance_rating as rating, COUNT(*) as count
     FROM quran_sessions
     WHERE performance_rating IS NOT NULL
     GROUP BY performance_rating
     ORDER BY performance_rating ASC`
  );
}

export async function getTeacherWorkload(): Promise<TeacherWorkloadRow[]> {
  const db = await getDb();
  return db.select<TeacherWorkloadRow[]>(
    `SELECT t.name as teacherName, COUNT(s.id) as studentCount
     FROM teachers t
     LEFT JOIN students s ON s.teacher_id = t.id AND s.is_active = 1
     WHERE t.is_active = 1
     GROUP BY t.id, t.name
     ORDER BY studentCount DESC`
  );
}
