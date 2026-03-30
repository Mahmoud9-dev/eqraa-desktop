import { getDb, uuid } from "../db";
import { PaginationParams, paginationClause, computeTotalPages } from "@/lib/database/pagination";
import type { PaginatedResponse } from "@/types";

export interface EducationalSession {
  id: string;
  student_id: string;
  teacher_id: string | null;
  topic: string;
  description: string;
  session_date: string;
  performance_rating: number | null;
  attendance: number;
  notes: string | null;
  created_at: string;
}

export interface EducationalSessionWithNames extends EducationalSession {
  student_name: string | null;
  teacher_name: string | null;
}

export async function getEducationalSessions(): Promise<EducationalSessionWithNames[]> {
  const db = await getDb();
  return db.select<EducationalSessionWithNames[]>(
    `SELECT es.*, s.name as student_name, t.name as teacher_name
     FROM educational_sessions es
     LEFT JOIN students s ON es.student_id = s.id
     LEFT JOIN teachers t ON es.teacher_id = t.id
     ORDER BY es.session_date DESC`
  );
}

export async function addEducationalSession(session: {
  student_id: string;
  teacher_id?: string | null;
  topic: string;
  description: string;
  performance_rating?: number;
}): Promise<void> {
  const db = await getDb();
  const id = uuid();
  await db.execute(
    "INSERT INTO educational_sessions (id, student_id, teacher_id, topic, description, performance_rating) VALUES ($1, $2, $3, $4, $5, $6)",
    [
      id,
      session.student_id,
      session.teacher_id ?? null,
      session.topic,
      session.description,
      session.performance_rating ?? null,
    ]
  );
}

export async function getEducationalSessionsPaginated(
  params: PaginationParams
): Promise<PaginatedResponse<EducationalSessionWithNames>> {
  const db = await getDb();
  const { clause } = paginationClause(params);

  const countResult = await db.select<[{ count: number }]>(
    "SELECT COUNT(*) as count FROM educational_sessions"
  );
  const total = countResult[0].count;

  const data = await db.select<EducationalSessionWithNames[]>(
    `SELECT es.*, s.name as student_name, t.name as teacher_name
     FROM educational_sessions es
     LEFT JOIN students s ON es.student_id = s.id
     LEFT JOIN teachers t ON es.teacher_id = t.id
     ORDER BY es.session_date DESC ${clause}`
  );

  return {
    data,
    total,
    page: params.page,
    pageSize: params.pageSize,
    totalPages: computeTotalPages(total, params.pageSize),
  };
}
