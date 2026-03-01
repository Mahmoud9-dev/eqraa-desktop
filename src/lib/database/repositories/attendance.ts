import { getDb, uuid } from "../db";

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

export async function insertAttendanceRecords(
  records: Array<{
    student_id?: string | null;
    teacher_id?: string | null;
    record_date: string;
    status: string;
    notes?: string | null;
  }>
): Promise<void> {
  const db = await getDb();
  for (const record of records) {
    const id = uuid();
    await db.execute(
      "INSERT INTO attendance_records (id, student_id, teacher_id, record_date, status, notes) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        id,
        record.student_id ?? null,
        record.teacher_id ?? null,
        record.record_date,
        record.status,
        record.notes ?? null,
      ]
    );
  }
}
