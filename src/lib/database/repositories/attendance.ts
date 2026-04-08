import { getDb, uuid } from "../db";
import { PaginationParams, paginationClause, computeTotalPages } from "@/lib/database/pagination";
import type { PaginatedResponse } from "@/types";

export interface AttendanceRecord {
  id: string;
  student_id: string | null;
  teacher_id: string | null;
  record_date: string;
  status: string;
  notes: string | null;
  created_at: string;
}

export async function getAttendanceRecords(): Promise<AttendanceRecord[]> {
  const db = await getDb();
  return db.select<AttendanceRecord[]>(
    "SELECT * FROM attendance_records ORDER BY record_date DESC"
  );
}

export async function getAttendanceByDate(date: string): Promise<AttendanceRecord[]> {
  const db = await getDb();
  return db.select<AttendanceRecord[]>(
    "SELECT * FROM attendance_records WHERE record_date = $1",
    [date]
  );
}

// Max records per INSERT chunk: 100 rows * 6 columns = 600 variables (SQLite limit: 999).
const ATTENDANCE_CHUNK_SIZE = 100;

export async function insertAttendanceRecords(
  records: Array<{
    student_id?: string | null;
    teacher_id?: string | null;
    record_date: string;
    status: string;
    notes?: string | null;
  }>
): Promise<void> {
  if (records.length === 0) return;

  const db = await getDb();

  // Wrap the chunked inserts in a transaction so a late-chunk failure
  // cannot leave partially written batches behind. Callers expect
  // all-or-nothing semantics for bulk inserts.
  await db.execute("BEGIN");
  try {
    for (let chunkStart = 0; chunkStart < records.length; chunkStart += ATTENDANCE_CHUNK_SIZE) {
      const chunk = records.slice(chunkStart, chunkStart + ATTENDANCE_CHUNK_SIZE);

      const valuePlaceholders: string[] = [];
      const params: (string | null)[] = [];

      chunk.forEach((record, index) => {
        const base = index * 6;
        valuePlaceholders.push(
          `($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4}, $${base + 5}, $${base + 6})`
        );
        params.push(
          uuid(),
          record.student_id ?? null,
          record.teacher_id ?? null,
          record.record_date,
          record.status,
          record.notes ?? null
        );
      });

      await db.execute(
        `INSERT INTO attendance_records (id, student_id, teacher_id, record_date, status, notes) VALUES ${valuePlaceholders.join(", ")}`,
        params
      );
    }
    await db.execute("COMMIT");
  } catch (error) {
    await db.execute("ROLLBACK");
    throw error;
  }
}

export async function getAttendanceRecordsPaginated(
  params: PaginationParams & { startDate?: string }
): Promise<PaginatedResponse<AttendanceRecord>> {
  const db = await getDb();
  const { clause } = paginationClause(params);

  const whereClause = params.startDate ? "WHERE record_date >= $1" : "";
  const whereArgs: string[] = params.startDate ? [params.startDate] : [];

  const countResult = await db.select<[{ count: number }]>(
    `SELECT COUNT(*) as count FROM attendance_records ${whereClause}`,
    whereArgs
  );
  const total = countResult[0].count;

  // record_date alone is not unique, so add a stable tie-breaker to
  // keep page boundaries deterministic across queries.
  const data = await db.select<AttendanceRecord[]>(
    `SELECT * FROM attendance_records ${whereClause} ORDER BY record_date DESC, created_at DESC, id DESC ${clause}`,
    whereArgs
  );

  return {
    data,
    total,
    page: params.page,
    pageSize: params.pageSize,
    totalPages: computeTotalPages(total, params.pageSize),
  };
}
