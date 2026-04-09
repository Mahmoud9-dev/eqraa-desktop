import { getDb, uuid } from "../db";
import { PaginationParams, paginationClause, computeTotalPages } from "@/lib/database/pagination";
import type { PaginatedResponse } from "@/types";

export interface TajweedLesson {
  id: string;
  teacher_id: string | null;
  lesson_date: string;
  topic: string;
  description: string;
  attendees: string;
  resources: string;
  created_at: string;
}

export async function getTajweedLessons(): Promise<TajweedLesson[]> {
  const db = await getDb();
  return db.select<TajweedLesson[]>(
    "SELECT * FROM tajweed_lessons ORDER BY lesson_date DESC"
  );
}

export async function addTajweedLesson(lesson: {
  topic: string;
  description: string;
  teacher_id?: string | null;
}): Promise<void> {
  const db = await getDb();
  const id = uuid();
  await db.execute(
    "INSERT INTO tajweed_lessons (id, topic, description, teacher_id) VALUES ($1, $2, $3, $4)",
    [id, lesson.topic, lesson.description, lesson.teacher_id ?? null]
  );
}

export async function getTajweedLessonsPaginated(
  params: PaginationParams
): Promise<PaginatedResponse<TajweedLesson>> {
  const db = await getDb();
  const { clause } = paginationClause(params);

  const countResult = await db.select<[{ count: number }]>(
    "SELECT COUNT(*) as count FROM tajweed_lessons"
  );
  const total = countResult[0].count;

  const data = await db.select<TajweedLesson[]>(
    `SELECT * FROM tajweed_lessons ORDER BY lesson_date DESC ${clause}`
  );

  return {
    data,
    total,
    page: params.page,
    pageSize: params.pageSize,
    totalPages: computeTotalPages(total, params.pageSize),
  };
}
