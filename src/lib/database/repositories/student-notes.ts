import { getDb, uuid } from "../db";
import { PaginationParams, paginationClause, computeTotalPages } from "@/lib/database/pagination";
import type { PaginatedResponse } from "@/types";

export interface StudentNote {
  id: string;
  student_id: string;
  type: string;
  content: string;
  note_date: string;
  teacher_name: string;
  created_at: string;
}

export async function getStudentNotes(studentId: string): Promise<StudentNote[]> {
  const db = await getDb();
  return db.select<StudentNote[]>(
    "SELECT * FROM student_notes WHERE student_id = $1 ORDER BY note_date DESC",
    [studentId]
  );
}

export async function addStudentNote(note: {
  student_id: string;
  type: string;
  content: string;
  note_date?: string;
  teacher_name: string;
}): Promise<void> {
  const db = await getDb();
  const id = uuid();
  await db.execute(
    "INSERT INTO student_notes (id, student_id, type, content, note_date, teacher_name) VALUES ($1, $2, $3, $4, $5, $6)",
    [
      id,
      note.student_id,
      note.type,
      note.content,
      note.note_date ?? new Date().toISOString().split("T")[0],
      note.teacher_name,
    ]
  );
}

export async function updateStudentNote(
  id: string,
  data: { type?: string; content?: string; note_date?: string; teacher_name?: string }
): Promise<void> {
  const db = await getDb();
  const fields: string[] = [];
  const values: unknown[] = [];
  let idx = 1;

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      fields.push(`${key} = $${idx}`);
      values.push(value);
      idx++;
    }
  }

  if (fields.length === 0) return;
  values.push(id);
  await db.execute(
    `UPDATE student_notes SET ${fields.join(", ")} WHERE id = $${idx}`,
    values
  );
}

export async function deleteStudentNote(id: string): Promise<void> {
  const db = await getDb();
  await db.execute("DELETE FROM student_notes WHERE id = $1", [id]);
}

export async function getAllStudentNotes(): Promise<StudentNote[]> {
  const db = await getDb();
  return db.select<StudentNote[]>(
    "SELECT * FROM student_notes ORDER BY note_date DESC"
  );
}

export async function getAllStudentNotesPaginated(
  params: PaginationParams
): Promise<PaginatedResponse<StudentNote>> {
  const db = await getDb();
  const { clause } = paginationClause(params);

  const countResult = await db.select<[{ count: number }]>(
    "SELECT COUNT(*) as count FROM student_notes"
  );
  const total = countResult[0].count;

  const data = await db.select<StudentNote[]>(
    `SELECT * FROM student_notes ORDER BY note_date DESC ${clause}`
  );

  return {
    data,
    total,
    page: params.page,
    pageSize: params.pageSize,
    totalPages: computeTotalPages(total, params.pageSize),
  };
}
